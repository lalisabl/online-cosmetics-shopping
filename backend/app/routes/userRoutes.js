const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
});
const userController = require("../controllers/userController");
const authoController = require("../controllers/authControler");
router.post("/register", authoController.createNewAccount);
router.post("/login", authoController.loginUsers);
router.get("/logout", authoController.logoutUser);
router.route("/").get(
  authoController.protect,
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
router.post("/forgotPassword", authoController.forgotPassword);
router.patch("/resetPassword/:token", authoController.resetPassword);

router.patch(
  "/updateMe",
  authoController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch("/giveRole/:id", authoController.protect, authoController.restrictsto("admin"), userController.updateOne);
router.patch(
  "/updatePassword",
  authoController.protect,
  authoController.updatePassword
);

module.exports = router;
