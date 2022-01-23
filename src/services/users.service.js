const connection = require("../config/connection.js");

const checkUsername = (username) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT username FROM 
			users WHERE username = ?`,
			[username],
			(error, results) => {
				if (error) reject(error);

				if (results.length === 0) {
					return resolve(false);
				} else {
					return resolve(true);
				}
			}
		);
	});
};

const findUserById = (id) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM users WHERE id = ?`,
			[id],
			(error, results) => {
				if (error) reject(error);
				else return resolve(results);
			}
		);
	});
};

module.exports = {
	checkUsername,
	findUserById,
};
