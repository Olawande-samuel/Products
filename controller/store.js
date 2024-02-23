const Store = require("../model/Store");
const Product = require("../model/Product");
const { StatusCodes } = require("http-status-codes");
// create store is protected. Only authorized users can access it

const getStores = async (req, res) => {
	const stores = await Store.find(req.query);
	res.status(201).send({
		success: true,
		message: "Stores fetched successfully",
		data: stores,
	});
};

const getStore = async (req, res) => {
	const { storeId } = req.params;
	const store = await Store.findOne({ _id: storeId });
	res.status(200).send({
		success: true,
		message: "Store fetched successfully",
		data: store,
	});
};
const getStoreProducts = async (req, res) => {
	const { storeId } = req.params;
	const store = await Product.find({ store: storeId });
	res.status(200).send({
		success: true,
		message: "Store Inventory fetched successfully",
		data: store,
	});
};

// user store
const createStore = async (req, res) => {
	const { name, contactEmail, logo } = req.body;
	const userdata = req.user;
	const store = await Store.create({
		name,
		contactEmail,
		logo,
		ownerId: userdata.id,
	});
	res.status(201).send({
		success: true,
		message: "Store created successfully",
		data: store,
	});
};

const fetchUserStores = async (req, res) => {
	const userInfo = req.user;
	const userStore = await Store.find({ ownerId: userInfo.id });
	res.status(201).send({
		success: true,
		message: "User's store fetched successfully",
		data: userStore,
	});
};

const getUserStore = async (req, res) => {
	const { storeId } = req.params;
	const { id } = req.user;
	const data = await Store.findOne({ _id: storeId, ownerId: id });
	if (data) {
		res
			.status(201)
			.send({ success: true, message: "Store fetched successfully", data });
	}
	throw new CustomError("User's store not found", StatusCodes.NOT_FOUND);
};

const updateStore = async (req, res) => {
	const { storeId } = req.params;
	const { id } = req.user;

	const resp = await Store.findOneAndUpdate(
		{ _id: storeId, ownerId: id },
		{ ...req.body },
		{
			runValidators: true,
			new: true,
		}
	);
	if (!resp) {
		throw new CustomError("Could not update store", StatusCodes.BAD_REQUEST);
	}
	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Store updated successfully" });
};

const deleteStore = async (req, res) => {
	const { storeId } = req.params;
	const { id } = req.user;
	const response = await Store.findOneAndDelete({
		_id: storeId,
		ownerId: id,
	});
	if (response === null) {
		throw new CustomError(
			"Failed to delete an invalid store",
			StatusCodes.BAD_REQUEST
		);
	}
	res
		.status(201)
		.send({ success: true, message: "Store deleted successfully" });
};

const fetchUserStoreProducts = async (req, res) => {
	const userId = req.user.id;
	const storeId = req.params.storeId;
	const isUserStore = await Store.findOne({ ownerId: userId });
	if (isUserStore?._id) {
		const products = await Product.find({ store: storeId });
		res.status(StatusCodes.OK).send({
			success: true,
			message: "Products fetched successfully",
			data: products,
		});
	}
	throw new CustomError("Invalid store owner", StatusCodes.BAD_REQUEST);
};

const fetchStoreProduct = async (req, res) => {
	const userId = req.user.id;
	const { productId, storeId } = req.params;
	const product = await Product.findOne({
		_id: productId,
	});
	if (!product) {
		throw new CustomError("Product not found", StatusCodes.NOT_FOUND);
	}
	const productStore = await Store.findOne({
		_id: product._id,
		ownerId: userId,
	});
	if (!productStore) {
		throw new CustomError("Could not find store", StatusCodes.BAD_REQUEST);
	}
	res.status(StatusCodes.OK).send({
		message: "Product fetched successfully",
		success: true,
		data: product,
	});
};

const updateStoreProduct = async (req, res) => {
	const userId = req.user.id;
	const { productId, storeId } = req.params;
	const product = await Product.findOne({
		_id: productId,
	});
	if (!product) {
		throw new CustomError("Product not found", StatusCodes.NOT_FOUND);
	}
	const productStore = await Store.findOne({
		_id: product._id,
		ownerId: userId,
	});
	if (!productStore) {
		throw new CustomError("Could not find store", StatusCodes.BAD_REQUEST);
	}
	await Product.findOneAndUpdate();
	res.status(StatusCodes.OK).send({
		message: "Product fetched successfully",
		success: true,
		data: product,
	});
};
module.exports = {
	getStore,
	getStores,
	getStoreProducts,
	createStore,
	fetchUserStores,
	getUserStore,
	deleteStore,
	updateStore,
	fetchUserStoreProducts,
};
