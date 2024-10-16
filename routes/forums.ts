import express from "express";
import invalidParams from "../middleware/invalidParams";
import {
  createForum,
  deleteForum,
  getForumById,
  getForumByName,
  getForums,
  getForumUsersByForumId,
  getForumUsersByUserId,
  getSubscriberByIds,
  getSubscribers,
  subscribeToForum,
  unsubscribeFromForum,
  updateForum,
} from "../controllers/forumController";

const router = express.Router();

// Get all forums
router.get("/", getForums);

// Get forum by id
router.get("/id/:id", getForumById);

// Get forum by name
router.get("/name/:name", getForumByName);

// Get all forum_user relations (forum subscribers)
router.get("/subscribers", getSubscribers);

// Get all forum_user relations (forum subscribers) by forum id
router.get("/subscribers/forum/:forumId", getForumUsersByForumId);

// Get all forum_user relations (forum subscribers) by user id
router.get("/subscribers/user/:userId", getForumUsersByUserId);

// Get one forum_user relation (forum subscriber) by forum and user id
router.get("/subscribers/forum/:forumId/:userId", getSubscriberByIds);

// Create new forum
router.post("/", createForum);

// Create forum_user relation (forum subscriber)
router.post("/subscribe", subscribeToForum);

// Update forum
router.put("/:id", invalidParams, updateForum);

// Delete forum
router.delete("/name/:id", invalidParams, deleteForum);

// Delete forum_user relation (forum subscriber)
router.delete("/unsubscribe", unsubscribeFromForum);

export default router;
