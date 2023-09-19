const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
router
  .route("/top-3-cheap")
  .get(productController.aliasTopProducts, productController.getAllProducts);
router.route("/Stats").get(productController.getProductStat);
router.route("/busyMonth/:year").get(productController.busytMonth);
router.route("/category/:category").get(productController.productsCategories);
router.route("/subcategory/:subcategory").get(productController.subcategories);
router
  .route("/:id")
  .get(productController.getEachProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createNewProduct);
module.exports = router;
