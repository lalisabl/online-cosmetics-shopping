const Cart = require("../models/cart");
const Product = require("../models/product");

// Controller function to add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    // Validate the request data (e.g., productId and quantity)
    const { productId, quantity } = req.body;

    // Ensure the user is authenticated and retrieve the user's ID
    const userId = req.user._id; // Adjust this based on your authentication strategy

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
