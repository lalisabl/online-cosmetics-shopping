const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
router.route("/").get(userController.getAllUsers);
router.post("/register", userController.createNewAccount);
router.get("/u");
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login-failure" }),
  (req, res) => {
    // Successful login
    const token = generateJwtToken(req.user);
    res.json({ token });
  }
);

module.exports = router;
