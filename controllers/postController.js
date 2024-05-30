const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.posts_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}).exec();
  res.json(posts);
});
