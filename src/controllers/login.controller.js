const bcrypt = require('bcrypt');
const connection = require('../connection.js');
const jwt = require('jsonwebtoken');

const loginController = {}

loginController.login = (request, response, next) => {
	
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

module.exports = loginController