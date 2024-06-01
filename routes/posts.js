const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const passport = require("passport");
// Get All Posts
router.get("/", post_controller.public_posts_list);

// Get Single Post
router.get("/:id", post_controller.post_detail);

// Create New Post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  post_controller.create_post
);

// Update Post
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.update_post
);

// Delete Post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.delete_post
);

// Post Comment
router.post(
  "/:id/comments",
  passport.authenticate("jwt", { session: false }),
  comment_controller.create_comment
);

// Delete Comment
router.delete(
  "/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  comment_controller.delete_comment
);
module.exports = router;
