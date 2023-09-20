const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router
  .route("/")
  .get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);
router.get('/u')
module.exports = router;
