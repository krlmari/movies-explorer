const usersRouter = require("express").Router();

const { getUserId, updateUser } = require("../controllers/users");

usersRouter.get("/users/me", getUserId);
usersRouter.patch("/users/me", updateUser);

module.exports = usersRouter;
