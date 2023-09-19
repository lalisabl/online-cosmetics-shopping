// createNewProduct
const User = require("../models/user");



exports.createNewAccount = async (req, res) => {
  try {
    const { username, email, password, fullName, } = req.body;
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
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
