const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BidBoard = require('./BidSchema');

// Create a new bid and update all the previous bids
router.post('/bids', async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const { Tract, BidAmount } = req.body;
        const tractNumbers = Tract.split(',').map(t => t.trim());

        // Initialize variables to hold the sum of the highest bids and their IDs
        let sumHighestBids = 0;
        let highestBidsInfo = [];

        // Iterate over each tract to find the highest bid
        for (let tract of tractNumbers) {
            let highestBidForTract = await BidBoard.findOne({ Tract: { $regex: `\\b${tract}\\b`, $options: 'i' } })
                                                    .sort('-BidAmount')
                                                    .session(session);

            if (highestBidForTract) {
                sumHighestBids += highestBidForTract.BidAmount;
                highestBidsInfo.push({ tract: tract, amount: highestBidForTract.BidAmount, id: highestBidForTract._id });
            }
        }

        // Determine the minimum required bid amount to become the new highest bid
        let requiredMinimumBid = sumHighestBids + 50; // Sum of highest bids + $50

        if (BidAmount <= requiredMinimumBid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ 
                message: "Bid not high enough.", 
                requiredMinimumBid: requiredMinimumBid, 
                yourBid: BidAmount 
            });
        }

        // Before marking the new bid as 'High', reset 'High' status for the previously highest bids
        await Promise.all(highestBidsInfo.map(async (bidInfo) => {
            await BidBoard.findByIdAndUpdate(bidInfo.id, { $set: { High: false } }, { session });
        }));

        // Save the new highest bid
        const newBid = new BidBoard({ ...req.body, High: true });
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

// Get all bids
router.get('/bids', async (req, res) => {
    try {
        const bids = await BidBoard.find();
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
    try {
        const bid = await BidBoard.findById(req.params.id);
        if (bid == null) {
            return res.status(404).json({ message: 'Cannot find bid' });
        }
        await bid.remove();
        res.json({ message: 'Deleted Bid' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;