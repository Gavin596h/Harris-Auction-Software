const express = require('express');
const router = express.Router();
const Auction = require('../server/AuctionSchema');
const routes = express.Router();

router.post('/AuctionCRUD', async (req, res) => {
    console.log('Received data on server:', req.body);
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

module.exports=router;