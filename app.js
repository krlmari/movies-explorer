const express = require("express");
const mongoose = require("mongoose");

const { errors } = require("celebrate");

const auth = require("./middlewares/auth");

const users = require("./routes/users");
const movies = require("./routes/movies");

const { createUser, login } = require("./controllers/users");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bitfilmsdb", {
  useNewUrlParser: true,
});

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", users);
app.use("/", movies);

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

app.listen(PORT, () => {});
