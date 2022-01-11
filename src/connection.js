//importamos modulo driver mysql
const mysql = require('mysql');

//creamos conexion
const connection = mysql.createConnection({
		'host': process.env.DB_HOST,
		'user': process.env.DB_USER,
		'password': process.env.DB_PASS,
		'database': process.env.DB_NAME
	})

	connection.connect((error) => {
		if(error){
			console.error(error)
			connection.end()
			return;
		}
		
		console.log('Succesfully connected to Database')
	})


//exportamos el objeto de la conexión para usarlo en otras partes del programa
module.exports = connection;