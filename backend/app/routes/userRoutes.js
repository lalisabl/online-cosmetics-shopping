const express = require("express");
const router = express.Router();
// const middleWare = require("../../config/middleware");
const userController = require("../controllers/userController");
const authoController = require("../controllers/authControler");
router.route("/").get(
  // authoController.protect,
  // authoController.restrictsto("admin"),
  userController.getAllUsers
);
router
  .route("/me")
  .get(
    authoController.protect,
    userController.getMe,
    userController.getOneUser
  );
router
  .route("/:userId")
  .get(userController.getOneUser)
  .delete(userController.deleteUser);
router.post("/register", authoController.createNewAccount);
router.post("/login", authoController.loginUsers);
router.post("/forgotPassword", authoController.forgotPassword);
router.patch("/resetPassword/:token", authoController.resetPassword);
router.patch(
  "/updateMe",
  authoController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch(
  "/updatePassword",
  authoController.protect,
  authoController.updatePassword
);
module.exports = router;
