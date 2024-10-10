import express from "express";
import invalidParams from "../middleware/invalidParams";
import {
  createForum,
  deleteForum,
  getForum,
  getForums,
  getSubscriberByIds,
  getSubscribers,
  subscribeToForum,
  unsubscribeFromForum,
  updateForum,
} from "../controllers/forumController";

const router = express.Router();

// Get all forums
router.get("/", getForums);

// Get single forum
router.get("/name/:id", getForum);

// Get all forum subscribers
router.get("/subscribers", getSubscribers);

// Get forum subscriber by id
router.get("/subscribers/forum/:forumId/:userId", getSubscriberByIds);

// Create new forum
router.post("/", createForum);

// Create forumUser relationship (Forum subscriber)
router.post("/subscribe", subscribeToForum);

// Update forum
router.put("/:id", invalidParams, updateForum);

// Delete forum
router.delete("/name/:id", invalidParams, deleteForum);

// Delete forumUser relationship (Forum subscriber)
router.delete("/unsubscribe", unsubscribeFromForum);

export default router;
