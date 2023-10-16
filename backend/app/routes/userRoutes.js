const express = require("express");
const router = express.Router();
const middleWare = require("../../config/middleware");
const userController = require("../controllers/userController");
const authoController = require("../controllers/authControler");
router
  .route("/")
  .get(
    authoController.protect,
    authoController.restrictsto("admin"),
    userController.getAllUsers
  );
router.post("/register", userController.createNewAccount);
router.post("/login", userController.loginUsers);
router.post("/forgotPassword", authoController.forgotPassword);
router.patch("/resetPassword/:token", authoController.resetPassword);
router.patch(
  "/updatePassword",
  authoController.protect,
  authoController.updatePassword
);
router.post("/myprofile", middleWare.authenticateJWT, userController.myProfile);
module.exports = router;
