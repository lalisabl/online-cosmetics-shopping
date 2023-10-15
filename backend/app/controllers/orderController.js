const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );
    if (!userCart) {
      return res.status(400).json({
        status: "fail",
        message: "Cart not found for this user.",
      });
    }
    const products = userCart.items;
    if (!products) {
      return res.status(400).json({
        status: "fail",
        message: "Product not found in the Cart.",
      });
    }
    const totalAmount = products.reduce((total, cartProduct) => {
      return total + cartProduct.quantity * cartProduct.product.price;
    }, 0);
    const { orderNumber, shippingAddress, paymentMethod } = req.body;
    const newOrder = new Order({
      orderNumber,
      totalAmount,
      products,
      shippingAddress,
      paymentMethod,
      user: userId,
    });
    const savedOrder = await newOrder.save();
    await Cart.findByIdAndUpdate(userCart._id, { items: [] });

    res.status(201).json({
      status: "success",
      data: {
        order: savedOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
//get all Orders in a database
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
// Get details of a specific order by ID
exports.getDetailOfOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.params.userId; // Use the authenticated user's ID
    let orders = await Order.find({ user: userId });
    orders = await Order.find({ user: userId }).populate({
      path: "products.product",
      model: Product,
      select: "name category",
    });

    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }
    // Respond with the order history
    return res.status(200).json({
      status: "success",
      result: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// this fucntion is used to identify busiest month
exports.busyMonth = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Order.aggregate([
      //   { $unwind: "$products" },
      {
        $match: {
          orderDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },

      {
        $group: {
          _id: { $month: "$orderDate" },
          numOrders: { $sum: 1 },
          orders: { $push: "$orderNumber" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({
      status: "success",
      message: "Order is  destructed successfully by thier products",
      data: {
        plan,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};
