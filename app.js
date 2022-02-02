require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const allErrors = require('./middlewares/errors');

const { PORT = 3000, NODE_ENV, BASE_ADDR } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? BASE_ADDR : 'mongodb://localhost:27017/filmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/signin', require('./routes/signin'));
app.use('/signup', require('./routes/signup'));

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.all('*', (req, res, next) => {
  next(new Error('RouteError'));
});

app.use(errorLogger);

app.use(errors());

app.use(allErrors);

app.listen(PORT);
