const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
router.route("/busyMonth/:year").get(OrderController.busyMonth);
router
  .route("/")
  .get(OrderController.getAllOrders)
  .post(OrderController.createOrder);
router
  .route("/:id")
  .get(OrderController.getDetailOfOrder)
  .patch(OrderController.UpdateOrders);
module.exports = router;
