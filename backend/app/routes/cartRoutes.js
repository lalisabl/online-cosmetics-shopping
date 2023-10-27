const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authControler");
router.use(authController.protect);
router.post("/addProducts/:cartItemId", cartController.addToCart);
router.route("/").get(cartController.viewCart);
router
  .route("/:cartItemId")
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);
module.exports = router;
