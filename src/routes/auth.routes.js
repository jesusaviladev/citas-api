const authRouter = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const { validateUser } = require("../middlewares/validation.js");

const { signup, login } = authController;

authRouter.post("/signup", validateUser, signup);

authRouter.post("/login", login);

module.exports = authRouter;
