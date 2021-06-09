require('dotenv').config();

const express = require('express');

require('express-async-errors');

const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const usersRouter = require('./routes/users');

const app = express();

app.use(helmet());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error: ', error));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

app.use(morgan('dev'));
app.use(express.json());
app.use(compression());

app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
