const router = require("express").Router();
const {
	fetchProduct,
	fetchProducts,
	addProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/product");
const isAuthorized = require("../middleware/authorization");

router.route("/").get(fetchProducts).post(isAuthorized, addProduct);
router
	.route("/:productId")
	.get(fetchProduct)
	.patch(isAuthorized, updateProduct)
	.delete(isAuthorized, deleteProduct);

module.exports = router;
