const express = require('express');
const pkg = require('../package.json');



//inicializamos la aplicacion

const app = express();

app.use(express.json())

app.get('/', (request, response) => {

	response.status(200).json({
		message: 'API started',
		name: pkg.name,
		version: pkg.version,
		description: pkg.description
	})
})


const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})