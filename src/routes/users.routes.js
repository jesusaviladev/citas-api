const userRouter = require("express").Router();
const userController = require("../controllers/users.controller.js");
const auth = require("../middlewares/auth.js");
const {
	validateSpecialUser,
	validateEditedUser,
} = require("../middlewares/validation.js");

const { checkAuth, checkUserRoles } = auth;

const { getUsers, createUser, editUser, deleteUser } = userController;

userRouter.get("/", checkAuth, checkUserRoles(["admin"]), getUsers);

userRouter.post(
	"/",
	checkAuth,
	checkUserRoles(["admin"]),
	validateSpecialUser,
	createUser
);

userRouter.put("/:id", checkAuth, validateEditedUser, editUser);

userRouter.delete("/:userId", checkAuth, checkUserRoles(["admin"]), deleteUser);

module.exports = userRouter;
