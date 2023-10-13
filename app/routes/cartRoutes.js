const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
router.post("/addProducts/:cartItemId", cartController.addToCart);
router.route("/:userId").get(cartController.viewCart);
router
  .route("/:cartItemId")
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);
module.exports = router;
