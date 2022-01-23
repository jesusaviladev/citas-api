const connection = require("../config/connection.js");
const { httpError } = require("../helpers/handleError.js");

const citasController = {};
//Busca citas con paginacion
citasController.getAppointments = (request, response) => {
	const { page = 1, limit = 10 } = request.query;

	if (page <= 0 || limit <= 0) {
		return response.status(400).json({
			error: "Bad request, pagination must be greater than zero.",
		});
	}

	//TODO: METER EXPRESION REGULAR

	connection.query(
		`SELECT a.*, u.name, u.lastname, u.ci FROM appointments as a 
		LEFT JOIN users as u ON a.user_id = u.id 
		LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
		(error, results, fields) => {
			if (error) {
				return httpError(response, error);
			}

			return response.status(200).json({
				data: results,
			});
		}
	);
};

//busca citas por id
citasController.getAppointmentById = (request, response) => {
	const { id } = request.params;

	if (!id) return response.status(400).json({ error: "Bad request" });

	connection.query(
		`SELECT a.*, u.name, u.lastname, u.ci FROM appointments as a
		INNER JOIN users as u ON a.user_id = u.id  
		WHERE a.id = ?`,
		[id],
		(error, results, fields) => {
			if (error) {
				return httpError(response, error);
			}

			if (results.length === 0) {
				return response.status(404).json({
					error: "No results found",
				});
			}

			return response.status(200).json({
				data: results,
			});
		}
	);
};

//busca citas por id de usuario
citasController.getAppointmentByUserId = (request, response) => {
	const { userId } = request.params;

	const { page = 1, limit = 10 } = request.query;

	if (page <= 0 || limit <= 0) {
		return response.status(400).json({
			error: "Bad request, pagination must be greater than zero.",
		});
	}

	if (!userId) return response.status(400).json({ error: "Bad request" });

	connection.query(
		`SELECT a.*, u.name, u.lastname, u.ci FROM appointments as a
		INNER JOIN users as u ON a.user_id = u.id  
		WHERE u.id = ? LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
		[userId],
		(error, results, fields) => {
			if (error) {
				return httpError(response, error);
			}

			if (results.length === 0) {
				return response.status(404).json({
					error: "No results found",
				});
			}

			return response.status(200).json({
				data: results,
			});
		}
	);
};

//crear nueva cita
citasController.createAppointment = (request, response) => {
	//extraemos datos de la cita desde la solicitud
	const { date, userId } = request.body;

	const newAppointment = {
		date,
		user_id: userId,
		status: "pending",
		is_active: true,
	};

	//insertamos en la base de datos
	connection.query(
		`INSERT INTO appointments set ?`,
		newAppointment,
		(error, results, fields) => {
			if (error) {
				return httpError(response, error);
			}

			response.status(201).json({
				message: "Succesfully created appointment",
			});
		}
	);
};

//Reasginar cita
citasController.editAppointment = (request, response) => {
	const { appointmentId } = request.params;
	const { date } = request.body;

	if (!appointmentId) {
		return response.status(400).json({
			error: "Bad request, missing data",
		});
	}

	connection.query(
		`UPDATE appointments SET date = ? WHERE id = ?`,
		[date, appointmentId],
		(error, results, fields) => {
			if (error) {
				return httpError(response, error);
			}

			if (results.affectedRows === 0) {
				return response.status(404).json({
					error: "No results found",
				});
			}

			return response.status(202).json({
				message: "Succesfully updated",
			});
		}
	);
};

citasController.cancelAppointment = (request, response) => {
	const { appointmentId } = request.params;

	if (!appointmentId)
		return response.status(400).json({
			error: "Bad request, missing data",
		});

	connection.query(
		`UPDATE appointments 
		SET is_active = false, status = 'cancelled' WHERE id = ?`,
		[appointmentId],
		(error, results) => {
			if (error) {
				return httpError(response, error);
			}

			if (results.affectedRows === 0) {
				return response.status(404).json({
					error: "No results found",
				});
			}

			return response.status(202).json({
				message: "Cancelled appointment",
			});
		}
	);
};

citasController.deleteAppointment = (request, response) => {
	const { id } = request.params;

	if (!id)
		return response.status(400).json({
			error: "Missing data",
		});

	connection.query(
		`DELETE FROM appointments WHERE id = ?`,
		[id],
		(error, results) => {
			if (error) {
				return httpError(response, error);
			}

			if (results.affectedRows === 0) {
				return response.status(404).json({
					error: "No results found",
				});
			}

			return response.status(202).json({
				message: "Deleted appointment data",
			});
		}
	);
};

module.exports = citasController;
