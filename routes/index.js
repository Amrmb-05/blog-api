const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.post("/sign-up", user_controller.sign_up);

module.exports = router;
