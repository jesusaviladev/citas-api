const Joi = require("joi");
const validation = {};

validation.validateUser = (request, response, next) => {
	//creamos esquema del objeto
	const userSchema = Joi.object({
		username: Joi.string().alphanum().required().lowercase(),
		password: Joi.string().min(3).required(),
		name: Joi.string().required().lowercase(),
		lastname: Joi.string().required().lowercase(),
		email: Joi.string().email().required(),
		birthday: Joi.date().required(),
		ci: Joi.string().alphanum().required(),
	});
	//validamos
	const { error, value } = userSchema.validate(request.body, {
		allowUnknown: true,
		abortEarly: false,
		stripUnknown: true,
		dateFormat: "date",
	});

	if (error) {
		const details = error.details.map((err) => err.message).join(", ");

		return response.status(400).json({
			error: "Missing or wrong data in payload",
			details: details,
		});
	} else {
		request.body = value;
		next();
	}
};

validation.validateAppointment = (request, response, next) => {
	//TODO: crear funciones para fechas
	const today = new Date().toISOString().substring(0, 10);

	//creamos esquema del objeto
	const appointmentSchema = Joi.object({
		date: Joi.date().min(today).required(),
		userId: Joi.number().required(),
	});
	//validamos
	const { error, value } = appointmentSchema.validate(request.body, {
		allowUnknown: true,
		abortEarly: false,
		stripUnknown: true,
		dateFormat: "date",
	});

	if (error) {
		const details = error.details.map((err) => err.message).join(", ");

		return response.status(400).json({
			error: "Missing or wrong data in payload",
			details: details,
		});
	} else {
		next();
	}
};

validation.validateSpecialUser = (request, response, next) => {
	//creamos esquema del objeto
	const userSchema = Joi.object({
		username: Joi.string().alphanum().required().lowercase(),
		password: Joi.string().min(3).required(),
		name: Joi.string().required().lowercase(),
		lastname: Joi.string().required().lowercase(),
		email: Joi.string().email().required(),
		birthday: Joi.date().required(),
		ci: Joi.string().alphanum().required(),
		role: Joi.number().max(3).min(1).required(),
	});
	//validamos
	const { error, value } = userSchema.validate(request.body, {
		allowUnknown: true,
		abortEarly: false,
		stripUnknown: true,
		dateFormat: "date",
	});

	if (error) {
		const details = error.details.map((err) => err.message).join(", ");

		return response.status(400).json({
			error: "Missing or wrong data in payload",
			details: details,
		});
	} else {
		request.body = value;
		next();
	}
};

validation.validateEditedUser = (request, response, next) => {
	//creamos esquema del objeto
	const userSchema = Joi.object({
		username: Joi.string().alphanum().lowercase(),
		password: Joi.string().min(3),
		name: Joi.string().lowercase(),
		lastname: Joi.string().lowercase(),
		email: Joi.string().email(),
		birthday: Joi.date(),
		ci: Joi.string().alphanum(),
	});
	//validamos
	const { error, value } = userSchema.validate(request.body, {
		allowUnknown: true,
		abortEarly: false,
		stripUnknown: true,
		dateFormat: "date",
	});

	if (error) {
		const details = error.details.map((err) => err.message).join(", ");

		return response.status(400).json({
			error: "Missing or wrong data in payload",
			details: details,
		});
	} else {
		request.body = value;
		next();
	}
};

module.exports = validation;
