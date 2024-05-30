const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = Schema({
  text: { type: String, minLength: 1, maxLength: 140, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Comment", CommentSchema);
