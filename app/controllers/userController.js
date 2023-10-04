// createNewProduct
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "key";
exports.createNewAccount = async (req, res) => {
  try {
    const { username, email, password, fullName, phoneNumber } = req.body;
    const user = new User({ username, email, password, fullName, phoneNumber });
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
    res.status(200).json({
      status: "success",
      totalUser: users.length,
      data: {
        users: users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
exports.loginUsers = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.myProfile = async (req, res) => {
  let data = req.userData;
  res.status(201).json({ data });
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