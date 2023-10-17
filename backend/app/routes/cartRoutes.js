const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authorizationController = require("../controllers/authControler");
router.post(
  "/addProducts/:cartItemId",
  authorizationController.protect,
  cartController.addToCart
);
router.route("/:userId").get(cartController.viewCart);
router
  .route("/:cartItemId")
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);
module.exports = router;
