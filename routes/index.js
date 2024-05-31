const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");

// Sign Up
router.post("/sign-up", user_controller.sign_up);

// Log In
router.post("/log-in", user_controller.log_in);
module.exports = router;
