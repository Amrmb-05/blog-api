const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.sign_up = [
  body("username", "Username must be atleast 2 characters long")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        // Will use the below as the error message
        throw new Error("Username already exists");
      }
    }),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .escape()
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        // Will use the below as the error message
        throw new Error("A user already exists with this e-mail address");
      }
    }),
  body("password")
    .isLength({ min: 7 })
    .withMessage("Password must contain atleast 7 characters.")
    .escape(),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .withMessage("Passwords must match"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await user.save();
    res.status(200).json({ user });
  }),
];

exports.log_in = [body("username")];
