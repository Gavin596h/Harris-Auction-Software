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

module.exports=router;