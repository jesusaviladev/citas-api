const citasRouter = require("express").Router();
const citasController = require("../controllers/citas.controller.js");
const auth = require("../middlewares/auth.js");
const { validateAppointment } = require("../middlewares/validation.js");

const { checkAuth, checkUserRoles } = auth;

const {
	getAppointments,
	getAppointmentById,
	getAppointmentByUserId,
	createAppointment,
	editAppointment,
	cancelAppointment,
	deleteAppointment,
} = citasController;

citasRouter.get("/", checkAuth, getAppointments);

citasRouter.get("/:id", checkAuth, getAppointmentById);

citasRouter.get("/user/:userId", checkAuth, getAppointmentByUserId);

citasRouter.post("/", checkAuth, validateAppointment, createAppointment);

citasRouter.put(
	"/:appointmentId",
	checkAuth,
	validateAppointment,
	editAppointment
);

citasRouter.put("/cancel/:appointmentId", checkAuth, cancelAppointment);

citasRouter.delete(
	"/:id",
	checkAuth,
	checkUserRoles(["admin"]),
	deleteAppointment
);

module.exports = citasRouter;
