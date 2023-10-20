const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
const authorizationController = require("../controllers/authControler");
const reviewRouter = require("./reviewRoutes");
router.use("/:productId/reviews", reviewRouter);

router
  .route("/top-3-cheap")
  .get(productController.aliasTopProducts, productController.getAllProducts);
router.route("/Stats").get(productController.getProductStat);
router.route("/category/:category").get(productController.productsCategories);
router.route("/subcategory/:subcategory").get(productController.subcategories);
router
  .route("/:id")
  .get(productController.getEachProduct)
  .patch(
    authorizationController.protect,
    // authorizationController.restrictsto("admin"),
    productController.updateProduct
  )
  .delete(
    authorizationController.protect,
    // authorizationController.restrictsto("admin"),
    productController.deleteProduct
  );
router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.createNewProduct
  );
module.exports = router;
