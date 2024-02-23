const router = require("express").Router();
const {
	getStores,
	getStore,
	getStoreProducts,
} = require("../controller/store");

router.route("/").get(getStores);
router.route("/:storeId").get(getStore);
router.route("/:storeId/products").get(getStoreProducts);

module.exports = router;
