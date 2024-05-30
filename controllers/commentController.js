const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.create_comment = [
  body("text", "Comment must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const post = Post.findById(req.params.id);
    if (post === null) {
      return res.status(400).json({ error: "Post not found" });
    }
    const errors = validationResult(req);

    const comment = new Comment({
      text: req.body.text,
      post: req.params.id,
      user: req.user,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Promise.all([
      comment.save(),
      Post.findByIdAndUpdate(req.params.id, {
        $push: { comments: comment._id },
      }),
    ]);

    res.status(201).json(comment);
  }),
];
