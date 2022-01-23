const httpError = (response, error) => {
	console.log(error);

	return response.status(500).json({
		error: error,
	});
};

module.exports = {
	httpError,
};
