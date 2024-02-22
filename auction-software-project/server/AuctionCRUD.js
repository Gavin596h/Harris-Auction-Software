const express = require('express');
const router = express.Router();
const Auction = require('../server/AuctionSchema');

router.post('/AuctionCRUD', async (req, res) => {
    console.log('Received data on server:', req.body);
    try {
      const { AuctionName } = req.body;
      const Auction = new Auction({
        AuctionName
      });
      await Auction.save();
      res.status(201).json(Auction);
    } catch (error) {
      console.error('Error saving Auction:', error);
      res.status(400).json({ error: error.message });
    }
  });