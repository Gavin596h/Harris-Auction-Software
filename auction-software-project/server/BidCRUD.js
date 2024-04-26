const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BidBoard = require('./BidSchema');
const Auction = require('./AuctionSchema');



// Create a new bid and update all the previous bids
router.post('/bids', async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const { Tract: inputTracts, BidAmount, AuctionNumber } = req.body;

        const auction = await Auction.findOne({ AuctionNumber }).session(session);
        if (!auction || !auction.TractAcres) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Auction or tract acreage information not found." });
        }

        const normalizedInputTracts = inputTracts.map(Number).sort((a, b) => a - b);

        let totalAcreage = normalizedInputTracts.reduce((acc, tractIndex) => acc + auction.TractAcres[tractIndex - 1], 0);

        // Fetch all high bids to determine the current highest bids and sum of high bids
        const existingHighBids = await BidBoard.find({
            AuctionNumber,
            High: true,
            Disabled: false
        }).session(session);

        let highestIndividualBids = new Map();

        existingHighBids.forEach(bid => {
            bid.Tract.forEach(tract => {
                let currentBid = highestIndividualBids.get(tract) || { bidAmount: 0 };
                if (currentBid.bidAmount < bid.BidAmount) {
                    highestIndividualBids.set(tract, { bidAmount: bid.BidAmount, shared: bid.Tract.length > 1 });
                }
            });
        });

        let requiredMinimumBid = 0;
        normalizedInputTracts.forEach(tract => {
            let bidInfo = highestIndividualBids.get(tract);
            if (bidInfo && bidInfo.shared) {
                // Divide the bid amount by the number of tracts in the combination to calculate the contribution per tract
                requiredMinimumBid += (bidInfo.bidAmount / bidInfo.tractCount) + 25;
            } else if (bidInfo) {
                requiredMinimumBid += bidInfo.bidAmount;
            }
        });

        requiredMinimumBid += 49; // Minimum $50 over the sum of the highest individual bids for these tracts

        if (BidAmount <= requiredMinimumBid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Bid not high enough. Must be at least $50 higher than the sum of highest bids on the involved tracts.",
                requiredMinimumBid: requiredMinimumBid,
                yourBid: BidAmount
            });
        }

        if (normalizedInputTracts.length === 1) {
            const singleTract = normalizedInputTracts[0];
            // Find all combination bids where the single tract is involved and the bid is high
            const combinationBids = await BidBoard.find({
                AuctionNumber,
                Tract: singleTract,
                High: true,
                Disabled: false,
                'Tract.1': { $exists: true }  // Filters for combination bids
            }).session(session);
        
            // Process each combination bid found
            for (let combinationBid of combinationBids) {
                // Mark the combination bid as not high
                combinationBid.High = false;
                combinationBid.Disabled = true;
                await combinationBid.save({ session });
        
                // Re-evaluate the high status for each tract in the combination
                for (let tract of combinationBid.Tract) {
                    // Get all bids for this tract excluding the current combination bid
                    const bidsForTract = await BidBoard.find({
                        AuctionNumber,
                        Tract: tract,
                        _id: { $ne: combinationBid._id }
                    }).sort({ BidAmount: -1 }).session(session);
        
                    // Set the highest bid for this tract as high, if it exists
                    if (bidsForTract.length > 0) {
                        const highestBid = bidsForTract[0];
                        highestBid.High = true;
                        await highestBid.save({ session });
                    }
                }
            }
        }

        // Set all bids involving the tracts to not high
        await BidBoard.updateMany(
            { AuctionNumber, Tract: { $in: normalizedInputTracts }, High: true },
            { $set: { High: false } },
            { session }
        );

        const perAcreValue = totalAcreage > 0 ? (BidAmount / totalAcreage) : 0;

        // Insert the new high bid
        const newBid = new BidBoard({
            AuctionNumber,
            Bidder: parseInt(req.body.Bidder, 10),
            Tract: normalizedInputTracts,
            BidAmount,
            High: true,
            ToLead: BidAmount + 50,
            PerAcre: perAcreValue
        });
        await newBid.save({ session });

        await session.commitTransaction();
        session.endSession();
        res.status(201).json(newBid);
    } catch (error) {
        if (session.inTransaction()) await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
});

// Get all bids with the right AuctionNumber
router.get('/bids', async (req, res) => {
    const { auctionNumber } = req.query; // Accept auctionNumber as a query param
    try {
        let query = {};
        if (auctionNumber) {
            query.AuctionNumber = auctionNumber; // Filter bids by auction number
        }
        const bids = await BidBoard.find(query);
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single bid by id
router.get('/bids/:id', async (req, res) => {
    try {
        const bid = await BidBoard.findById(req.params.id);
        if (bid == null) {
            return res.status(404).json({ message: 'Cannot find bid' });
        }
        res.json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a bid
router.patch('/bids/:id', async (req, res) => {
    try {
        const bid = await BidBoard.findById(req.params.id);
        if (bid == null) {
            return res.status(404).json({ message: 'Cannot find bid' });
        }
        
        if (req.body.AuctionNumber != null) {
            bid.AuctionNumber = req.body.AuctionNumber;
        }
        // Update other fields as necessary
        const updatedBid = await bid.save();
        res.json(updatedBid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a bid
router.delete('/bids/:id', async (req, res) => {
    let session;
    try {
        session = await mongoose.startSession();
        await session.startTransaction();
        
        const bidToDelete = await BidBoard.findById(req.params.id).session(session);
        if (!bidToDelete) {
            await session.abortTransaction();
            return res.status(404).json({ message: 'Cannot find bid' });
        }

        // Remember the AuctionNumber and Tract of the deleted bid
        const { AuctionNumber, Tract } = bidToDelete;
        
        // Proceed to delete the bid
        await BidBoard.deleteOne({ _id: req.params.id }).session(session);

        // Find the next highest bid for the same AuctionNumber and Tract
        const nextHighestBids = await BidBoard.find({ AuctionNumber, Tract })
            .sort({ BidAmount: -1 })
            .session(session);

        // If there are remaining bids, update the highest bid flag
        if (nextHighestBids.length > 0) {
            // Ensure all bids are marked as not high first to avoid multiple high flags
            await BidBoard.updateMany({ AuctionNumber, Tract }, { $set: { High: false } }).session(session);
            
            // Mark the highest bid as such
            await BidBoard.findByIdAndUpdate(nextHighestBids[0]._id, { $set: { High: true } }).session(session);
        }

        await session.commitTransaction();
        res.json({ message: 'Deleted Bid and updated highest bid' });
    } catch (error) {
        if (session && session.inTransaction()) await session.abortTransaction();
        console.error(error); // For debugging
        res.status(500).json({ message: error.message });
    } finally {
        if (session) session.endSession();
    }
});

module.exports = router;