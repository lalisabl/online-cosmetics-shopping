const express = require("express");
const router = express.Router();
const middleWare = require("../../config/middleware");
const userController = require("../controllers/userController");
const authoController = require("../controllers/authControler");
router
  .route("/")
  .get(
    // authoController.protect,
    // authoController.restrictsto("admin"),
    userController.getAllUsers
  );
router.delete("/:userId", userController.deleteUser);
router.post("/register", authoController.createNewAccount);
router.post("/login", authoController.loginUsers);
router.post("/forgotPassword", authoController.forgotPassword);
router.patch("/resetPassword/:token", authoController.resetPassword);
router.patch(
  "/updatePassword",
  authoController.protect,
  authoController.updatePassword
);
module.exports = router;
