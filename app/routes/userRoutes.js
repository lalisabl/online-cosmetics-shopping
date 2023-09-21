const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const secretKey = process.env.SECRET_KEY;
const userController = require("../controllers/userController");
router.route("/").get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);
//user
router.post("/login", userController.loginUsers);

module.exports = router;
