const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
  },
  fullName: {
    type: String,
    required: [true, "please tell us your name!"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
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

const User = mongoose.model("User", userSchema);

module.exports = User;
