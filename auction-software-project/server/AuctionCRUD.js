const express = require('express');
const router = express.Router();
const Auction = require('../server/AuctionSchema');
const routes = express.Router();

router.post('/AuctionCRUD', async (req, res) => {
    const { AuctionNumber } = req.body;
    const existingAuction = await Auction.findOne({ AuctionNumber });

    if (existingAuction) {
      return res.status(400).json({ error: 'Auction number already exists' });
    }

    try {
      const auctionInstance = new Auction(req.body);
      await auctionInstance.save();
      res.status(201).json(auctionInstance);
    } catch (error) {
      console.error('Error saving Auction:', error);
      res.status(400).json({ error: error.message });
    }
});

router.get('/pastAuctions', async (req, res) => {
  try {
      const auctions = await Auction.find();
      if (auctions.length > 0) {
          res.json(auctions);
      } else {
          console.log('No auctions found');
          res.status(404).json({ message: 'No auctions found' });
      }
  } catch (error) {
      console.error('Error fetching past auctions:', error);
      res.status(500).json({ error: error.message });
  }
});

router.get('/getAuction/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (auction) {
      res.json(auction);
    } else {
      console.log('No auction found with that ID');
      res.status(404).json({ message: 'No auction found' });
    }
  } catch (error) {
    console.error('Error fetching auction:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports=router;