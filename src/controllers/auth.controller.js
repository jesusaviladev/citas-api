const bcrypt = require('bcrypt');
const connection = require('../config/connection.js');
const jwt = require('jsonwebtoken');

const authController = {}

authController.signup = (request, response, next) => {
	
	//extraemos datos de la solicitud

	const {
		username,
		password,
		name,
		lastName,
		ci,
		email,
		birthday
	} = request.body

	//validamos

	if(!username || !password || !ci || !name || !lastName || !email || !birthday){
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

		try {

				//hasheamos contraseña y guardamos en la base de datos

				const hashedPassword = await bcrypt.hash(password, 10)

				//siempre se registra un usuario con permisos normales en este endpoint 
				const newUser = {
					username,
					password: hashedPassword,
					name,
					lastname: lastName,
					ci,
					email,
					birthday,
					created_at: new Date(),
					role: 3
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
					})
				});

			}

			catch(error){
				next(error)
			}

	})

}

authController.login = (request, response, next) => {
	
	//capturamos los datos de login

	const { username, password } = request.body

	//validamos

	if(!username || !password){

		return response.status(400).json({
			error: 'Bad Request, missing data'
		})
	}
	//comprobamos el usuario en la BD
	connection.query('SELECT username, password, id, role FROM users WHERE username = ?', [username], async (error, results, fields) =>{
		if(error){
			console.log(error)

			return response.status(400).json({
				errorMsg: error.sqlMessage
				})
		}

		//si no existe el usuario o la contraseña es incorrecta devolvemos un error

		if(results.length === 0 || !await bcrypt.compare(password, results[0].password)){

			return response.status(401).json({
				error: `User or password are invalid`
			})

		}

		const userBD = results[0]

		const userToSign = {
			id: userBD.id,
			username: userBD.username,
			role: userBD.role
		}

		const token = jwt.sign(userToSign, process.env.SECRET);

		return response.status(202).json({
			username: userBD.username,
			userId: userBD.id,
			token: token
		})
	})

}


module.exports = authController;