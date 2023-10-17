const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const mongoose = require("mongoose");
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { quantity } = req.body;
    const productId = req.params.cartItemId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const existingCartItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    await cart.save();

    res.status(201).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.viewCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name category price",
    });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        cart: userCart,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.cartItemId;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const updatedCartItem = cart.items.find((item) =>
      item.product.equals(productId)
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    Object.assign(updatedCartItem, req.body);
    await cart.save();
    if (!updatedCartItem) {
      res.status(404).json({
        status: "fail",
        message: "Cart Item not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        CartItem: updatedCartItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.cartItemId;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for This User" });
    }
    const indexToRemove = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (indexToRemove === -1) {
      return res
        .status(404)
        .json({ message: "Cart item not found in the Cart" });
    }
    cart.items.splice(indexToRemove, 1);
    await cart.save();
    return res.status(404).json({
      status: "success",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
