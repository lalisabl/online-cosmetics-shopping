const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router
  .route("/")
  .post(userController.createNewAccount)
  .get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);

module.exports = router;
