const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.getCheckoutSessios = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user.id }).populate(
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
    const items = products.map((cartProduct) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: cartProduct.product.name,
            description: cartProduct.product.description,
          },
          unit_amount: cartProduct.product.price * 100,
        },
        quantity: cartProduct.quantity,
      };
    });
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    const testProducts = products.map((item) => item._id);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: `http://127.0.0.1:3000/api/v1/Overview?products=${testProducts.join(
        ","
      )}&user=${req.user.id}&totalPrice=${userCart.totalPrice}`,
      cancel_url: `http://127.0.0.1:3000/api/v1/Products`,
      customer_email: req.user.email,
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createBookingCheckout = async (req, res, next) => {
  let { products, user, totalPrice } = req.query;
  if (!products || !user || !totalPrice) next();
  console.log(products, user, totalPrice);
  const cart = await Cart.findOne({ user: user });
  const product = cart.items.map((cartProduct) => {
    return {
      product: cartProduct.product,
    };
  });
  totalPrice = cart.totalPrice;
  const order = new Order({
    user: user,
    products: product,
    totalPrice: totalPrice,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Pending",
  });
  await order.save();
  await Cart.findByIdAndUpdate(cart._id, { items: [], totalPrice: 0 });
  res.redirect(req.originalUrl.split("?")[0]);
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
exports.getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Use the authenticated user's ID
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
//this fucntion is used to identify busiest month
exports.busyMonth = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Order.aggregate([
      //{ $unwind: "$products" },
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
          // orders: { $push: "$orderNumber" },
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
