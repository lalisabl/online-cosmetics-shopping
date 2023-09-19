// createNewProduct
const User = require("../models/user");
exports.createNewAccount = async (req, res) => {
  try {
    const newUser = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        Products: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    req.status(200).json({
      status: "success",
      totalUser: users.length,
      data: {
        users: users,
      },
    });
  } catch (error) {
    req.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getEachUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        product: user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
