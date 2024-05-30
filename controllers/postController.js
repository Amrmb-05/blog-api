const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.posts_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}).exec();
  res.json(posts);
});

exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (post === null) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});
