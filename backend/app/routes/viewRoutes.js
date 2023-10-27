const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const OrderController = require("../controllers/orderController");
const authControler = require("../controllers/authControler");
router.use(authControler.protect);
router.get(
  "/",
  OrderController.createBookingCheckout,
  viewController.OverviewPage
);
module.exports = router;
