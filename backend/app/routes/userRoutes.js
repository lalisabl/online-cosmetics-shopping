const express = require("express");
const router = express.Router();
const middleWare = require("../../config/middleware");
const userController = require("../controllers/userController");
const authorizationController = require("../controllers/authControler");
router
  .route("/")
  .get(
    authorizationController.protect,
    authorizationController.restrictsto("admin"),
    userController.getAllUsers
  );
router.post("/register", userController.createNewAccount);
//user
router.post("/login", userController.loginUsers);
router.post("/myprofile", middleWare.authenticateJWT, userController.myProfile);
module.exports = router;
