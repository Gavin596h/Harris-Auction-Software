const express = require('express');
const router = express.Router();
const BidBoard = require('./BidSchema'); // Update the path as necessary

// Create a new bid
router.post('/bids', async (req, res) => {
    try {
        const newBid = new BidBoard(req.body);
        await newBid.save();
        
        // Determine if this is now the highest bid for the tract
        const bidsForTract = await BidBoard.find({ Tract: newBid.Tract });
        let highestBidAmount = newBid.BidAmount;
        let highestBidId = newBid._id;

        bidsForTract.forEach((bid) => {
            if (bid.BidAmount > highestBidAmount) {
                highestBidAmount = bid.BidAmount;
                highestBidId = bid._id;
            }
        });

        // Set all bids' High value to false for cleanup
        await BidBoard.updateMany({ Tract: newBid.Tract }, { $set: { High: false } });

        // Then, set the highest bid's High value to true
        await BidBoard.findByIdAndUpdate(highestBidId, { $set: { High: true } });

        res.status(201).json(newBid);
    } catch (error) {
        res.status(400).json({ message: error.message });
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