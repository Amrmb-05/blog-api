const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
// Get All Posts
router.get("/", post_controller.posts_list);

// Get Single Post
router.get("/:id", post_controller.post_detail);

// Create New Post
router.post("/", post_controller.create_post);

// Update Post
router.put("/:id", post_controller.update_post);

// Delete Post
router.delete("/:id", post_controller.delete_post);

// Post Comment
router.post("/:id/comments", comment_controller.create_comment);

module.exports = router;
