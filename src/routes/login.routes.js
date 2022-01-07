const loginRouter = require('express').Router();
const loginController = require('../controllers/login.controller.js')

loginRouter.post('/', loginController.login)

module.exports = loginRouter;