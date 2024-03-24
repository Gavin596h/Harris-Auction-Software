const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  AuctionName: String,
  AuctionDate: Date,
  AuctionNumber: Number,
  TractQuantity: Number,
  UnitOfMeasurement: String,
  NumOfDecPlaces: Number,
  CollectiveUnitOfMeasurement: String,
  BidMethod: String,
  NumberOfLeaderBoards: Number,
  HighColumn: String,
  PrintOrNot: Boolean,
  WarnOnCombination: Boolean,
  BidQueryCombination: Boolean,
  BuyersPrem: Boolean,
  BuyersPremPercent: Number,
  DepositType: String,
  DepositAmount: Number,
  PercentOrAmount: Number,
  completed: Boolean
});

const Auction = mongoose.model('Auction', AuctionSchema);

module.exports = Auction;