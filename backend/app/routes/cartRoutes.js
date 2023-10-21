const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authorizationController = require("../controllers/authControler");
router.post("/addProducts/:cartItemId", cartController.addToCart);
router.route("/").get(authorizationController.protect, cartController.viewCart);
router
  .route("/:cartItemId")
  .patch(authorizationController.protect, cartController.updateCartItem)
  .delete(authorizationController.protect, cartController.deleteCartItem);
module.exports = router;
