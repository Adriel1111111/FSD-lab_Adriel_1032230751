const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

// routes
const studentroutes = require('./routes/studentroutes');
app.use('/student', studentroutes);

// server
app.listen(3000, () => {
  console.log('server running on port 3000');
});