const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: [true, "First name is required"] },
	lastName: String,
	email: {
		type: String,
		required: [true, "eMail is required"],
		minLength: 10,
		unique: true,
	},
	password: String,
});

UserSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

UserSchema.method("createJWT", function () {
	return jwt.sign(
		{ firstName: this.firstName, id: this._id },
		process.env.SECRET,
		{ expiresIn: "30d" }
	);
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
