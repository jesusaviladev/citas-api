const citasRouter = require('express').Router();
const citasController = require('../controllers/citas.controller.js');
const auth = require('../middlewares/auth.js');

const { checkAuth, checkUserRoles } = auth;

citasRouter.get('/', checkAuth, citasController.getAppointments)

citasRouter.post('/', checkAuth, citasController.createAppointment);

citasRouter.put('/', checkAuth, citasController.editAppointment);

citasRouter.delete('/cancel/:id', checkAuth, citasController.cancelAppointment);

module.exports = citasRouter;