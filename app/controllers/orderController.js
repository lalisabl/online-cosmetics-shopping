const Order = require("../models/order");
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get a list of all orders
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

// Update a specific order by ID
exports.UpdateOrders = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated order
        runValidators: true, // Run validators to ensure data validity
      }
    );
    if (!updatedOrder) {
      res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        order: updatedOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete a specific order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
      return;
    }
    res.status(204).json({
      status: "success",
      data: null,
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
