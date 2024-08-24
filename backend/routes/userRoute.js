const express = require("express");
const validateNewUser = require("../middleware/validateNewUser");
const validateLogin = require("../middleware/validateLogin");
const { createUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", validateNewUser, createUser);

userRouter.post("/login", validateLogin, loginUser);

module.exports = userRouter;
