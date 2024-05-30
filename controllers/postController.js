const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
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

exports.create_post = [
  body("title", "title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("text", "Post must not be empty").trim.isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      user: req.user,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await Post.save(post);
    res.status(201).json(post);
  }),
];
