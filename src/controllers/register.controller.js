const bcrypt = require('bcrypt');
const connection = require('../connection.js');
const registerController = {}

registerController.signup = (request, response, next) => {
	
	//extraemos datos de la solicitud

	const {
		username,
		password,
		name,
		lastName,
		ci,
		role
	} = request.body

	//validamos

	if(!username || !password || !role){
		return response.status(400).json({
			error: 'Bad Request, missing data'
		})
	}

	//validamos si el usuario existe
	connection.query(`SELECT * FROM users WHERE username = ?`, [username], async (error, results, fields) =>{
		if(error){
			next(error)
		}

		if(results.length > 0){
			return response.status(400).json({
				error: 'Username already exists'
			})
		}

		else {

			try {

				//hasheamos contraseña y guardamos en la base de datos

				const hashedPassword = await bcrypt.hash(password, 10)

				const newUser = {
					username,
					password: hashedPassword,
					name,
					lastname: lastName,
					ci,
					role
				}

				connection.query(`INSERT INTO users set ?`, [newUser], (error, results, fields) => {
					
					if(error){
						console.log(error)

						return response.status(400).json({
							errorMsg: error.sqlMessage
						})
					}

					delete newUser.password;

					response.status(201).json({
						message: 'Successfully created user',
						content: newUser
					}).end()
				});

			}

			catch(error){
				next(error)
			}

		}
	})

}

module.exports = registerController;