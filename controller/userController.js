const User = require("../model/User");
const Store = require("../model/Store");
const Product = require("../model/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../customError");
const { StatusCodes } = require("http-status-codes");

const getUsers = async (req, res) => {
	const data = await User.find({});
	res
		.status(201)
		.send({ success: true, message: "Users fetched Successfully", data });
};

const getUser = async (req, res) => {
	const { id } = req.user;
	const user = await User.findOne({ _id: id }).select("-password");
	res
		.status(201)
		.send({ success: true, message: "User fetched successfully", data: user });
};

const updateUserProfile = async (req, res) => {
	const { id } = req.user;
	await User.findOneAndUpdate(
		{ _id: id },
		{ ...req.body },
		{ runValidators: true }
	);
	res
		.status(StatusCodes.OK)
		.send({ message: "User updated successfully", success: true });
};




module.exports = {
	getUsers,
	getUser,
	updateUserProfile,

};
