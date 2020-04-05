const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db');
const postRoute = require('./post.route');

const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected.');
  },
  err => {
    console.log('Cannot connect to the database', err);
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/posts', postRoute);

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});
