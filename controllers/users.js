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

module.exports = {
  getUserId,
  updateUser,
};
