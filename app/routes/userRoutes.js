const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router
  .route("/")
  .get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);

module.exports = router;
