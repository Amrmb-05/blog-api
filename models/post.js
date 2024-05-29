const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minLength: 1, required: true },
  text: { type: String, minLength: 1, maxLength: 280, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", PostSchema);
