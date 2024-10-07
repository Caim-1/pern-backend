import express from "express";
import invalidParams from "../middleware/invalidParams";
import {
  createForum,
  deleteForum,
  getForum,
  getForums,
  subscribeToForum,
  updateForum,
} from "../controllers/forumController";

const router = express.Router();

// Get all forums
router.get("/", getForums);

// Get single forum
router.get("/:id", getForum);

// Create new forum
router.post("/", createForum);

// Create forumUser relationship (Forum subscriber)
router.post("/user/subscribe", subscribeToForum);

// Update forum
router.put("/:id", invalidParams, updateForum);

// Delete forum
router.delete("/:id", invalidParams, deleteForum);

export default router;
