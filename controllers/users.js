const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Запрашиваемый пользователь не найден.");
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name })
    .then((newUser) => res.send({ data: newUser }))
    .catch(() => {
      throw new IncorrectError(
        "Некорректные данные для обновления пользователя."
      );
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email,
        name,
        password: hash,
      })
    )
    .then((user) => res.send({ data: user }))
    .catch(() => {
      throw new IncorrectError(
        "Некорректные данные для создания нового пользователя."
      );
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      throw new AuthError("Некорректные почта и/или пароль.");
    })
    .catch(next);
};

module.exports = {
  getUserId,
  updateUser,
  createUser,
  login,
};
