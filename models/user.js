const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, minLength: 2, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  author: { type: Boolean, default: false },
});

mongoose.exports = mongoose.model("User", UserSchema);
