const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	store: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Store",
		required: [true, "Could not find store id"],
		immutable: true,
	},
	price: { type: Number, required: true },
	category: { type: String, required: true },
	published: { type: Boolean, default: false },
	quantity: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now, required: true },
	updatedAt: { type: Date },
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
