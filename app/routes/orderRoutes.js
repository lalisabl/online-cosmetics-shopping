const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
router.route("/busyMonth/:year").get(OrderController.busyMonth);
router
  .route("/:userId")
  .get(OrderController.getYourOrders)
  .post(OrderController.createOrder);
router.route("/").get(OrderController.getAllOrders);
router.route("/OrderHistory/:userId").get(OrderController.getUserOrderHistory);
router.route("/:Productid").get(OrderController.getDetailOfOrder);
module.exports = router;
