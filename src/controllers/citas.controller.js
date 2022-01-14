const connection = require('../config/connection.js');

const citasController = {}


citasController.getAppointments = (request, response) => {
	
} 

citasController.createAppointment = (request, response) => {

	//extraemos datos de la cita desde la solicitud
	const { date, userId, status } = request.body

	//validamos

	if(!date || !userId || !status){
		return response.status(400).json({
			error: 'Bad request, missing data'
		})
	}

	const newAppointment = {
		date,
		user_id: userId,
		status
	}

	//insertamos en la base de datos

	connection.query(`INSERT INTO appointments set ?`, newAppointment, (error, results, fields) => {
		
		if(error){
			console.log(error)

			return response.status(400).json({
				errorMsg: error.sqlMessage
			})
		}

		response.status(201).json({
			message: 'Succesfully created appointment'
		})
	})

}


citasController.editAppointment = (request, response, next) => {
	response.send('EDITAR CITA')
}


citasController.cancelAppointment = (request, response, next) => {
	response.send('CANCELAR CITA')
}


module.exports = citasController