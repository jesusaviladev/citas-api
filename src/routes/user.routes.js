const userRouter = require('express').Router()
const userController = require('../controllers/users.controller.js')

userRouter.post('/', userController.createUser)

module.exports = userRouter;