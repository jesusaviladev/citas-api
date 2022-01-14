const jwt = require('jsonwebtoken');
const auth = {}

auth.verifyToken = (request, response, next) => {

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

auth.verifyUser = () => {
	
}

module.exports = auth;