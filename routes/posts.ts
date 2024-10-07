import express from "express";
import invalidParams from "../middleware/invalidParams";
import {
  createPost,
  deletePost,
  dislikePost,
  getPost,
  getPosts,
  getPostsByForumName,
  getPostsByUserId,
  likePost,
  removeDislikefromPost,
  removeLikefromPost,
  updatePost,
} from "../controllers/postController";

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:id", invalidParams, getPost);

// Get posts by forum name
router.get("/forum/:id", getPostsByForumName);

// Get posts by user id
router.get("/user/:id", invalidParams, getPostsByUserId);

// Create new post
router.post("/", createPost);

// Update post
router.put("/:id", invalidParams, updatePost);

// Update post when liked
router.put("/:id/like", invalidParams, likePost);

// Update post when like is removed
router.put("/:id/removelike", invalidParams, removeLikefromPost);

// Update post when disliked
router.put("/:id/dislike", invalidParams, dislikePost);

// Update post when dislike is removed
router.put("/:id/removedislike", invalidParams, removeDislikefromPost);

// Delete post
router.delete("/:id", invalidParams, deletePost);

export default router;
