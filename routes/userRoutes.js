const router = require("express").Router();
const { getUser, updateUserProfile } = require("../controller/userController");
const {
	createStore,
	fetchUserStores,
	getUserStore,
	deleteStore,
	updateStore,
	fetchUserStoreProducts,
} = require("../controller/store");
const {
	fetchStoreProducts,
	fetchStoreProduct,
	addProduct,
	deleteProduct,
	updateProduct,
} = require("../controller/product");

router.route("/profile").get(getUser).patch(updateUserProfile);
router.route("/store").get(fetchUserStores).post(createStore);
router
	.route("/store/:storeId")
	.get(getUserStore)
	.patch(updateStore)
	.delete(deleteStore);
router
	.route("/store/:storeId/products")
	.get(fetchStoreProducts)
	.post(addProduct);
router
	.route("/store/:storeId/products/:productId")
	.get(fetchStoreProduct)
	.patch(updateProduct)
	.delete(deleteProduct);

module.exports = router;
