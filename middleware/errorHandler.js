const CustomError = require("../customError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomError) {
		res.status(err.statusCode).json({ success: false, message: err.message });
		return;
	}
	res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ success: false, message: err.message ?? "something went wrong" });
};

module.exports = errorHandler;
