const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const auctionRoutes = require('./AuctionCRUD')

const app = express();

const port = 3001

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://semerson5:auctionsetup32@auction-cluster.supuo6g.mongodb.net/', { useNewUrlParser: true,
useUnifiedTopology: true,})

app.use('/', auctionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});