const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");

// Controller function to add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    // Validate the request data (e.g., productId and quantity)
    const { productId, quantity, userId } = req.body;
    // Retrieve the product information based on the product ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    // Create or update the user's cart with the selected product and quantity
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if one doesn't exist for the user
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingCartItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingCartItem) {
      // If the product exists in the cart, update its quantity
      existingCartItem.quantity += quantity;
    } else {
      // If the product doesn't exist in the cart, add it
      cart.items.push({ product: productId, quantity });
    }

    // Save the updated cart
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
// Controller to view the user's shopping cart
exports.viewCart = async (req, res) => {
  try {
    // Retrieve the user's cart based on their user ID (assuming you're associating carts with users)
    const userId = "6509c35832f37f55702e6f43"; // Use the authenticated user's ID
    console.log(userId);
    const userCart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name category price",
    });

    if (!userCart) {
      // If the user has no cart, you can handle it as needed (e.g., create a new cart)
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
