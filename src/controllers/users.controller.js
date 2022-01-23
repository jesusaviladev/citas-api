const bcrypt = require("bcrypt");
const connection = require("../config/connection.js");
const { checkUsername, findUserById } = require("../services/users.service.js");
const { httpError } = require("../helpers/handleError.js");
const userController = {};

userController.getUsers = (request, response) => {
	connection.query(
		`SELECT id, username, name, 
		lastname, email, ci, role, 
		birthday, created_at FROM users`,
		(error, results) => {
			if (error) {
				return httpError(response, error);
			}

			return response.status(200).json({
				data: results,
			});
		}
	);
};

userController.createUser = async (request, response) => {
	//extraemos datos de la solicitud
	const { username, password, name, lastname, ci, email, birthday, role } =
		request.body;

	try {
		//validamos si el usuario existe

		const userExists = await checkUsername(username);

		if (userExists) {
			return response.status(400).json({
				error: "Username already exists",
			});
		}

		//hasheamos contraseña y guardamos en la base de datos

		const hashedPassword = await bcrypt.hash(password, 10);

		//siempre se registra un usuario con permisos normales en este endpoint
		const newUser = {
			username,
			password: hashedPassword,
			name,
			lastname,
			ci,
			email,
			birthday,
			created_at: new Date(),
			role,
		};

		connection.query(
			`INSERT INTO users set ?`,
			[newUser],
			(error, results, fields) => {
				if (error) {
					return httpError(response, error);
				}

				delete newUser.password;

				return response.status(201).json({
					message: "Successfully created user",
					content: newUser,
				});
			}
		);
	} catch (error) {
		httpError(response, error);
	}
};

userController.editUser = async (request, response) => {
	const { id } = request.params;

	const { username, password, name, lastname, ci, email, birthday } =
		request.body;

	if (!id)
		return response.status(400).json({
			error: "Bad Request",
		});

	try {
		//buscamos usuario en la BD

		const userDB = await findUserById(id);

		if (userDB.length === 0) {
			return response.status(404).json({
				error: "No user found",
			});
		}

		//validar usuario en base de datos

		if (username && (await checkUsername(username))) {
			return response.status(400).json({
				error: "Username is already taken",
			});
		}
		//hashear contraseña
		if (password) {
			request.body.password = await bcrypt.hash(password, 10);
		}

		//insertar usuario editado
		const editedUser = request.body;

		connection.query(
			"UPDATE users SET ? WHERE id = ?",
			[editedUser, id],
			(error, results) => {
				if (error) return httpError(response, error);

				return response.status(201).json({
					msg: "Updated user",
				});
			}
		);
	} catch (error) {
		httpError(response, error);
	}
};

userController.deleteUser = (request, response) => {
	const { userId } = request.params;

	if (!userId) return response.json({ error: "Missing data" });

	connection.query(
		"DELETE FROM users WHERE id = ?",
		[userId],
		(error, results, fields) => {
			if (error) {
				return httpError(response, error);
			}

			if (results.affectedRows === 0) {
				return response.status(404).json({
					error: "No results found",
				});
			}

			return response.status(202).json({
				message: "Deleted user data",
			});
		}
	);
};

module.exports = userController;
