const express = require("express");
const router = express.Router();
const middleWare = require("../../config/middleware");
const userController = require("../controllers/userController");
router.route("/").get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);
//user
router.post("/login", userController.loginUsers);
router.post("/myprofile", middleWare.authenticateJWT, userController.myProfile);
module.exports = router; 
