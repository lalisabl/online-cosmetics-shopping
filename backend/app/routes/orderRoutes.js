const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authController = require("../controllers/authControler");
router.use(authController.protect);
router.route("/busyMonth/:year").get(OrderController.busyMonth);
router.get("/checkout-session", OrderController.getCheckoutSessios);
router.route("/").get(OrderController.getAllOrders);
router.route("/OrderHistory/:userId").get(OrderController.getUserOrderHistory);
module.exports = router;
