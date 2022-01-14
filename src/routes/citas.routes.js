const citasRouter = require('express').Router();
const citasController = require('../controllers/citas.controller.js');
const auth = require('../middlewares/auth.js');

const { verifyToken } = auth;

citasRouter.get('/', verifyToken, citasController.getAppointments)

citasRouter.post('/', verifyToken, citasController.createAppointment);

citasRouter.put('/', verifyToken, citasController.editAppointment);

citasRouter.delete('/cancel/:id', verifyToken, citasController.cancelAppointment);

module.exports = citasRouter;