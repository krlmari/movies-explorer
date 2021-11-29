const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMain = require('./middlewares/errors');

const auth = require('./middlewares/auth');

const users = require('./routes/users');
const movies = require('./routes/movies');

const { createUser, login } = require('./controllers/users');

const { PORT, MONGO_URL, DATABASE_URL } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', users);
app.use('/', movies);

app.use(errorLogger);
app.use(limiter);

app.use(errors());

app.use(errorMain);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
