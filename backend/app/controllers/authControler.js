// createNewProduct
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};
exports.createNewAccount = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
    });
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token: token,
      message: "Registration successful",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
};
exports.loginUsers = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.validatePassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.protect = catchAsync(async (req, res, next) => {
  //Getting token and check if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("No user is belongs to this token", 401));
  }
  req.user = currentUser;
  next();
});
exports.restrictsto = (role) => {
  return (req, res, next) => {
    if (!(role === req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to this perform this action!",
          403
        )
      );
    }
    next();
  };
};
exports.forgetPassword = async (req, res, next) => {
  const user = User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with this eamil address", 404));
  }
  next();
};
