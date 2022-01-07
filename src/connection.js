//importamos modulo driver mysql
const mysql = require('mysql');

//creamos conexion
const connection = mysql.createConnection({
		'host': 'localhost',
		'user': 'root',
		'password': '',
		'database': 'citas-bd'
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