const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, minLength: 2, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  author: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
