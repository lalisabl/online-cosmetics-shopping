const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

// Define a pre-save middleware to calculate the total price
cartSchema.pre("save", function (next) {
  const cart = this;
  let total = 0;
  cart.items.forEach((item) => {
    total += item.price * item.quantity;
  });
  cart.totalPrice = total;
  next();
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
