const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
router.route("/busyMonth/:year").get(OrderController.busyMonth);
router
  .route("/:userId")
  .get(OrderController.getAllOrders)
  .post(OrderController.createOrder);
router.route("/OrderHistory/:userId").get(OrderController.getUserOrderHistory);
router.route("/:Productid").get(OrderController.getDetailOfOrder);
module.exports = router;
