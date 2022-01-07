const registerRouter = require('express').Router();
const registerController = require('../controllers/register.controller.js')

registerRouter.post('/', registerController.signup)

module.exports = registerRouter