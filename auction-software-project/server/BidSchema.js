const { Int32 } = require('mongodb');
const mongoose = require('mongoose');


//Schema for bid board info
const BidBoardSchema = new mongoose.Schema({
  AuctionNumber: Number,
  Bidder: Number,
  BidAmount: Number,
  ToLead: Number,
  PerAcre: Number,
  AcreCount: Number,
  High: Boolean,
  Tract: [Number],
  BidType: String,
  Disabled: { type: Boolean, default: false }  // New field to handle disabling bids
});

const BidBoard = mongoose.model('BidBoard', BidBoardSchema);

module.exports = BidBoard;