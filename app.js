const express = require("express");
const mongoose = require("mongoose");

const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorMain = require("./middlewares/errors");

const auth = require("./middlewares/auth");

const users = require("./routes/users");
const movies = require("./routes/movies");

const { createUser, login } = require("./controllers/users");

const { PORT = 3000 } = process.env;
const app = express();
const rateLimit = require("express-rate-limit");

app.use(helmet());

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(limiter);

mongoose.connect("mongodb://localhost:27017/bitfilmsdb", {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", users);
app.use("/", movies);

app.use(errorLogger);

app.use(errors);
app.use(errorMain);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res
    .status(500)
    .send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
