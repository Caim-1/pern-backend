import express from "express";
import invalidParams from "../middleware/invalidParams";
import {
  createUser,
  createUserDislikedPostRelationship,
  createUserLikedPostRelationship,
  deleteUser,
  deleteUserDislikedPostRelationship,
  deleteUserLikedPostRelationship,
  getUser,
  getUsers,
  getUsersDislikedPosts,
  getUsersDislikedPostsById,
  getUsersLikedPosts,
  getUsersLikedPostsById,
  updateUser,
} from "../controllers/userController";
import authenticateToken from "../middleware/authorization";

const router = express.Router();

// Get all users
router.get("/", /*authenticateToken,*/ getUsers);

// Get single user
router.get("/:id", invalidParams, getUser);

// Get userLikedPosts realtionship
router.get("/post/likes", getUsersLikedPosts);

// Get userLikedPosts realtions by id
router.get("/post/likes/:userId/:postId", getUsersLikedPostsById);

//  Get userDislikedPosts realtionship
router.get("/post/dislikes", getUsersDislikedPosts);

// Get userDislikedPosts realtions by id
router.get("/post/dislikes/:userId/:postId", getUsersDislikedPostsById);

// Create new user
router.post("/", createUser);

// Create userLikedPost relationship
router.post("/post/like", createUserLikedPostRelationship);

// Delete userLikedPost relationship
router.delete("/post/removelike", deleteUserLikedPostRelationship);

// Create userDislikedPost relationship
router.post("/post/dislike", createUserDislikedPostRelationship);

// Delete userLikedPost relationship
router.delete("/post/removedislike", deleteUserDislikedPostRelationship);

// Update user
router.put("/:id", invalidParams, updateUser);

// Delete user
router.delete("/:id", invalidParams, deleteUser);

export default router;
