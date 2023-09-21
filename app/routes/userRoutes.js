const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const secretKey = process.env.SECRET_KEY;
const userController = require("../controllers/userController");
router.route("/").get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);
//user 
router.post("/login", async (req, res) => {
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
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
