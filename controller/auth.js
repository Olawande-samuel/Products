const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/mailer");
const nodemailer = require("nodemailer");

const login = async (req, res) => {
	const { email, password } = req.body;
	const ver = await sendMail({
		from: "samueldacoal@gmail.com",
		to: "olawandesamuel@gmail.com",
		subject: "Hello from nodemailer",
		text: "Signed by graphics designers",
	});
	console.log({ ver });
	res.json({ message: "here we go again" });

	// if (!email || !password) {
	// 	throw new CustomError(
	// 		"Invalid email and password",
	// 		StatusCodes.BAD_REQUEST
	// 	);
	// }
	// const user = await User.findOne({ email });
	// if (!user || !bcrypt.compare(password, user.password)) {
	// 	throw new CustomError("Invalid password", StatusCodes.BAD_REQUEST);
	// }
	// const token = user.createJWT();
	// res.status(StatusCodes.OK).send({
	// 	message: "User login successful",
	// 	success: true,
	// 	data: { ...user._doc, token },
	// });
};

const signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	if (!firstName || !email || !password) {
		throw new CustomError("All fields bar last name are required");
	}
	const newUser = await User.create({ ...req.body });
	const token = newUser.createJWT();
	const userInfo = { ...newUser };
	userInfo._doc.token = token;

	res.status(StatusCodes.CREATED).send({
		message: "User account created successfully",
		success: true,
		data: userInfo._doc,
	});
};

module.exports = { signup, login };
