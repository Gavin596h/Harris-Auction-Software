const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BidBoard = require('./BidSchema');



// Create a new bid and update all the previous bids
router.post('/bids', async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const { Tract: inputTracts, BidAmount, AuctionNumber } = req.body;

        // Normalize the input tracts to ensure consistency
        const normalizedInputTracts = inputTracts.map(Number).sort((a, b) => a - b);

        // Fetch all high bids for the auction number and tracts involved
        const existingHighBids = await BidBoard.find({
            AuctionNumber,
            Tract: { $in: normalizedInputTracts },
            High: true
        }).session(session);

        let sumOfHighBids = 0;

        existingHighBids.forEach(bid => {
            if (normalizedInputTracts.some(tract => bid.Tract.includes(tract))) {
                sumOfHighBids += bid.BidAmount;
            }
        });

        // The new bid must be higher than the sum of highest bid amounts on all involved tracts plus 50
        if (BidAmount <= sumOfHighBids + 49) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Bid not high enough. Must be at least $50 higher than the sum of highest bids on the involved tracts.",
                requiredMinimumBid: sumOfHighBids + 50,
                yourBid: BidAmount
            });
        }

        // Update the 'High' status of all previously highest bids for the involved tracts
        await BidBoard.updateMany(
            { AuctionNumber, Tract: { $in: normalizedInputTracts }, High: true },
            { $set: { High: false } },
            { session }
        );

        // Insert the new bid as high within the current AuctionNumber and involved tracts
        const newBid = new BidBoard({
            AuctionNumber,
            Bidder: parseInt(req.body.Bidder, 10),
            Tract: normalizedInputTracts,
            BidAmount,
            High: true,
            ToLead: sumOfHighBids + 100
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