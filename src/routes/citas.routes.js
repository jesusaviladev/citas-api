const citasRouter = require('express').Router();
const citasController = require('../controllers/citas.controller.js');
const auth = require('../middlewares/auth.js');

const { checkAuth, checkUserRoles } = auth;

citasRouter.get('/', checkAuth, citasController.getAppointments);

citasRouter.get('/:id', checkAuth, citasController.getAppointmentById);

citasRouter.get('/user/:userId', checkAuth, citasController.getAppointmentByUserId);

citasRouter.post('/', checkAuth, citasController.createAppointment);

citasRouter.put('/', checkAuth, citasController.editAppointment);

citasRouter.put('/cancel/:id', checkAuth, citasController.cancelAppointment);

module.exports = citasRouter;