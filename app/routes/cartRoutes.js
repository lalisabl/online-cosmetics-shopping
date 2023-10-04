const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
router.post("/addProducts", cartController.addToCart);
router.route("/").get(cartController.viewCart);
module.exports = router;
