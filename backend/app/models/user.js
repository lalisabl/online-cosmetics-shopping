const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");

const ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "please tell us your name!"],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  photo: {
    type: String,
    default: "default.jpg",
    select: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.CUSTOMER, // Set a default role
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockedUntil: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  address: String,
  phoneNumber: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const saltRounds = 10; // Number of salt rounds for bcrypt
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});
userSchema.methods.validatePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// userSchema.pre(/^find/, function (next) {
//   const Fields = ["_id", "fullName", "email", "role", "phoneNumber"];
//   this.selectFields(Fields);
//   next();
// });
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
