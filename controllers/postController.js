const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.public_posts_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ public: true }).exec();
  res.json(posts);
});

exports.all_posts = asyncHandler(async (req, res, next) => {
  if (!req.user.author) {
    return res
      .status(401)
      .json({ message: "Only authors are allowed to view all posts" });
  }
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
  body("text", "Post must not be empty").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // check if user is an author
    if (!req.user.author) {
      return res
        .status(401)
        .json({ message: "Only blog authors are allowed to post" });
    }
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      user: req.user,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await post.save();
    res.status(201).json(post);
  }),
];

exports.update_post = [
  body("title", "title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("text", "Post must not be empty").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!post.user.equals(req.user._id) && !req.user.author) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await Post.findByIdAndUpdate(req.params.id, post, {});
    res.status(200).json(post);
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();
  if (post === null) {
    return res.status(404).json({ error: "Resource not found" });
  }

  if (!post.user.equals(req.user._id) && !req.user.author) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedPost);
});
