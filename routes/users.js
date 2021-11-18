const usersRouter = require("express").Router();

const { createUser, getUser, updateUser } = require("../controllers/users");

const {
  validateCreateUser,
  validateGetUserId,
  validateUpdateUser,
} = require("../middlewares/validations");

usersRouter.post("/users", validateCreateUser, createUser);
usersRouter.get("/users/me", validateGetUserId, getUser);
usersRouter.patch("/users/me", validateUpdateUser, updateUser);

module.exports = usersRouter;
