// createNewProduct
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../../utils/email");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

// token expired after a given minute
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.createNewAccount = catchAsync(async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
  });
  createSendToken(newUser, 201, res);
});
exports.loginUsers = catchAsync(async (req, res, next) => {
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 5 * 60 * 1000; // 15 minutes in milliseconds
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  let user = await User.findOne({ email }).select(
    "isLocked loginAttempts lockedUntil"
  );
  //1 check is user with this email exists
  if (!user) {
    return next(new AppError("Invalid email.", 401));
  }
  // check if the account is locked
  if (user.isLocked) {
    // Check if the lockout period has passed
    if (user.lockedUntil > Date.now()) {
      return next(
        new AppError("Account is locked. Please try again later!", 401)
      );
    } else {
      // If the lockout period has passed, reset the login attempts and unlock the account
      user.loginAttempts = 0;
      user.isLocked = false;
      user.lockedUntil = null;
      await user.save();
    }
  }
  // check if user try up to max login attempts
  if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    user.isLocked = true;
    user.lockedUntil = Date.now() + LOCKOUT_DURATION;
    await user.save();
    return next(
      new AppError("Account is locked. Please try again later!", 401)
    );
  }
  // Check if password is correct
  user = await User.findOne({ email })
    .select("+password")
    .select("loginAttempts");
  if (!(await user.validatePassword(password, user.password))) {
    user.loginAttempts++;
    await user.save();
    return next(new AppError("Incorrect password", 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  //Getting token and check if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.validatePassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
});
// logout the user
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
exports.resetPassword = async (req, res, next) => {};
