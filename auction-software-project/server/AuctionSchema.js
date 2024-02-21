const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  AuctionName: String,
  AuctionDate: Date,
  AuctionNumber: Number,
  TractAmount: Number,
  UnitofMeasure: String,
  NumofDecPlace: Number,
  ColofMeasure: String,
  BidMethod: String,
  NumofLeadBoard: Number,
  HighColDesc: String,
  PrintAfterBid: Boolean,
  WarnOnNewComb: Boolean,
  BidQueryCon: Boolean,
  BuyersPremium: Boolean,
  BuyersPremiumAmount: Number,
  DepositType: String,
  DepositAmount: Number,
  completed: Boolean
});

const Auction = mongoose.model('Auction', AuctionSchema);

module.exports = Auction;