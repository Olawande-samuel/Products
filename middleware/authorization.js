const CustomError = require("../customError");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
	const auth = req.headers.authorization;
	if (!auth || !auth.startsWith("Bearer")) {
		throw new CustomError("Access denied", StatusCodes.FORBIDDEN);
	} else {
		const token = auth.split(" ")[1];
		jwt.verify(token, process.env.SECRET, (err, result) => {
			if (err) {
				throw new CustomError("Invalid token", StatusCodes.UNAUTHORIZED);
			}
			req.user = result;
			next();
		});
	}
};

module.exports = isAuthorized;
