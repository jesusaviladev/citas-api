const jwt = require('jsonwebtoken');
const connection = require('../config/connection.js');

const auth = {}
//función para autenticar un usuario y permitir acceso a rutas
auth.checkAuth = (request, response, next) => {

	const authorization = request.get('authorization');

	let token = null

	if(authorization && authorization.toLowerCase().startsWith('bearer')){

		token = authorization.slice(7)

	} else {

		return response.status(401).json({
			error: 'Missing or invalid token'
		})
	}

	try {

		const decodedToken = jwt.verify(token, process.env.SECRET)

		if(!token || !decodedToken) return response.status(401).json({
				error: 'Unauthorized'
			})

		else {

			request.body.userId = decodedToken.id
			request.body.userRole = decodedToken.role

			next()

		}

	}

	catch (error){

		return response.status(401).json({
			error: 'Unauthorized'
		})

	}

}
//función para determinar rol de un usuario y otorgar permisos
auth.checkUserRoles = (acceptedRoles = ['user', 'admin', 'worker']) => async (request, response, next) => {
	
	const { userId } = request.body

	if(!userId) return response.status(400).json({
		error: 'Missing or invalid id'
	})

	connection.query(`SELECT roles.description 
		FROM users INNER JOIN roles 
		ON users.role = roles.id WHERE users.id = ${userId}`, (error, results) => {
			
			if(error){
				next(error)
				return;
			}

			const userRole = results[0].description

			if(acceptedRoles.includes(userRole)){
				next()
			}

			else {

				return response.status(401).json({
					error: 'Not allowed'
				})
			}
		})
}

module.exports = auth;