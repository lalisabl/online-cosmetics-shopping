const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
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
  },
  
  photo: String,
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.CUSTOMER, // Set a default role
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
    return next(); // If password is not modified, move to the next middleware
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

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
