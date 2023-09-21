const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const secretKey = process.env.SECRET_KEY;
const userController = require("../controllers/userController");
router.route("/").get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);

router.post('/login', async (req, res) => {
  // Extract user credentials from the request body
  const { email, password } = req.body;

  try {
    // Find the user based on the provided email
    const user = await User.findOne({ email });

    // Check if the user exists and validate the password
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });

    // Send the token back to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
