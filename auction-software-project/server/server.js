const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 3001

app.use(express.json());
app.use(cors());

//mongoose.connect('mongodb://localhost')

//app.use('/api', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});