const mongoose = require("mongoose");

const Store = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	logo: String,
	contactEmail: String,
	ownerId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
	createdAt: { type: Date, immutable: true, default: Date.now },
	updatedAt: { type: Date },
});

const StoreModel = mongoose.model("Store", Store);

module.exports = StoreModel;
