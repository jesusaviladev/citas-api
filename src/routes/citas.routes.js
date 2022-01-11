const citasRouter = require('express').Router();
const citasController = require('../controllers/citas.controller.js');
const auth = require('../middlewares/auth.js');

citasRouter.post('/', auth.authenticateUser, citasController.create);

module.exports = citasRouter;