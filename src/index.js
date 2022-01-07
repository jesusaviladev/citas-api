//importamos modulos para el servidor
const express = require('express');
const pkg = require('../package.json');

//importamos rutas de express
const registerRouter = require('./routes/register.routes.js')
const loginRouter = require('./routes/login.routes.js')


//importamos conexion a la BD
const connection = require('./connection.js');

const app = express();

//configuracion del servidor
app.set('port', process.env.PORT || 3000)

//middlewares 

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get('/', (request, response) => {

	response.status(200).json({
		message: 'API started',
		name: pkg.name,
		version: pkg.version,
		description: pkg.description
	})
})

//rutas

app.use('/signup', registerRouter)

app.use('/login', loginRouter)

//manejadores de errores

app.use((request, response, next) => {

	response.status(404).json({
		error: 'Bad Request'
	})
})

app.use((error, request, response, next) => {

	if(error){

		console.error(error)

		response.status(500).json({
			error: error.message
		})
	}
})


//inicializamos el servidor
const PORT = app.get('port')

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})

