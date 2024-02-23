const Product = require("../model/Product");
const Store = require("../model/Store");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../customError");

//FREE ACCESS

const fetchProducts = async (req, res) => {
	const data = await Product.find({});
	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Products fetched successfully", data });
};

const fetchProduct = async (req, res) => {
	const { productId } = req.params;
	const data = Product.findOne(productId);
	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Product fetched successfully", data });
};

// LOGGED IN USERS ONLY
const fetchStoreProducts = async (req, res) => {
	const { id } = req.user;
	const { storeId } = req.params;
	const store = await Store.findOne({ ownerId: id, _id: storeId });
	if (!store) {
		throw new CustomError("Invalid user", StatusCodes.BAD_REQUEST);
	}
	const data = await Product.find({ store: store._id });
	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Products fetched successfully", data });
};
const fetchStoreProduct = async (req, res) => {
	const { id } = req.user;
	const { storeId } = req.params;
	const store = await Store.findOne({ ownerId: id, _id: storeId });
	if (!store) {
		throw new CustomError("Invalid user", StatusCodes.BAD_REQUEST);
	}
	const data = await Product.findOne({ store: store._id });
	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Products fetched successfully", data });
};

const addProduct = async (req, res) => {
	const { name, category, quantity, price } = req.body;
	const { id } = req.user;
	const { storeId } = req.params;
	const userStoreExist = await Store.findOne({ ownerId: id, _id: storeId });
	if (userStoreExist) {
		const product = await Product.create({
			name,
			store: storeId,
			category,
			quantity,
			price,
		});
		res.status(StatusCodes.CREATED).send({
			success: true,
			message: "Product created successfully",
			data: product,
		});
	} else {
		throw new CustomError(
			"the provided store owner does not exist",
			StatusCodes.BAD_REQUEST
		);
	}
};

const updateProduct = async (req, res) => {
	const { id } = req.user;
	const { productId, storeId } = req.params;
	const productStore = await Store.findOne({ _id: storeId, ownerId: id });
	if (productStore) {
		const updated = await Product.findOneAndUpdate(
			{ _id: productId },
			{ ...req.body },
			{ runValidators: true, new: true }
		);
		if (updated) {
			res.status(StatusCodes.OK).send({
				success: true,
				message: "Product updated successfully",
				data: updated,
			});
			return;
		}
		throw new CustomError("Failed to update product", StatusCodes.BAD_REQUEST);
	} else {
		throw new CustomError(
			"Could not find product owner",
			StatusCodes.BAD_REQUEST
		);
	}
};
const deleteProduct = async (req, res) => {
	const { id } = req.user;
	const { productId, storeId } = req.params;
	const productStore = await Store.findOne({ _id: storeId, ownerId: id });
	if (productStore) {
		const deleted = await Product.findOneAndDelete({
			_id: productId,
			store: productStore._id,
		});
		if (deleted) {
			res.status(StatusCodes.OK).send({
				success: true,
				message: "Product deleted successfully",
			});
			return;
		}
		throw new CustomError("Failed to delete product", StatusCodes.BAD_REQUEST);
	} else {
		throw new CustomError(
			"Could not find product owner",
			StatusCodes.BAD_REQUEST
		);
	}
};

module.exports = {
	fetchProducts,
	fetchProduct,
	addProduct,
	updateProduct,
	deleteProduct,
	fetchStoreProducts,
	fetchStoreProduct,
};
