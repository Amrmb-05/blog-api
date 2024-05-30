const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/postController");

// Get All Posts
router.get("/", post_controller.posts_list);

// Get Single Post
router.get("/:id", post_controller.post_detail);
