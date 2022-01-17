const userRouter = require('express').Router()
const userController = require('../controllers/users.controller.js')
const auth = require('../middlewares/auth.js');

const { checkAuth, checkUserRoles } = auth;

userRouter.get('/', checkAuth, checkUserRoles(['admin']), userController.getUsers)

userRouter.post('/', checkAuth, checkUserRoles(['admin']), userController.createUser)

userRouter.put('/:userId', checkAuth, userController.editUser)

userRouter.delete('/:userId', checkAuth, checkUserRoles(['admin']), userController.deleteUser)

module.exports = userRouter;