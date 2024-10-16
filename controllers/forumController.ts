import { RequestHandler } from "express";
import pool from "../dbConfig";

// @desc  Get forum by id
// @route GET /api/forums/id/:id
export const getForumById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const forum = await pool.query("SELECT * FROM forums WHERE id = $1", [id]);

    if (forum.rows.length > 0) {
      return res.status(200).json(forum.rows[0]);
    }

    res.status(404).json({ message: "Forum not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get forum by name
// @route GET /api/forums/name/:name
export const getForumByName: RequestHandler = async (req, res, next) => {
  const { name } = req.params;

  try {
    const forum = await pool.query("SELECT * FROM forums WHERE name = $1", [name]);

    if (forum.rows.length > 0) {
      return res.status(200).json(forum.rows[0]);
    }

    res.status(404).json({ message: "Forum not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all forums
// @route GET /api/forums
export const getForums: RequestHandler = async (req, res, next) => {
  try {
    const allForums = await pool.query("SELECT * FROM forums");

    if (allForums.rows.length > 0) {
      return res.status(200).json(allForums.rows);
    }

    res.status(404).json({ message: "No forums were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all forum_user relations (forum subscribers)
// @route GET /api/forums/subscribers
export const getSubscribers: RequestHandler = async (req, res, next) => {
  try {
    const allSubscribers = await pool.query("SELECT * FROM forum_user");

    if (allSubscribers.rows.length > 0) {
      return res.status(200).json(allSubscribers.rows);
    }

    res.status(404).json({ message: "No subscribers were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all forum_user relations (forum subscribers) by forum id
// @route GET /api/forums/subscribers/forum/:forumId
export const getForumUsersByForumId: RequestHandler = async (req, res, next) => {
  const { forumId } = req.params;

  try {
    const relations = await pool.query("SELECT * FROM forum_user WHERE forum_id = $1", [forumId]);

    if (relations.rows.length > 0) {
      return res.status(200).json(relations.rows);
    }

    res.status(404).json({ message: "No relations found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all forum_user relations (forum subscribers) by user id
// @route GET /api/forums/subscribers/user/:userId
export const getForumUsersByUserId: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const relations = await pool.query("SELECT * FROM forum_user WHERE user_id = $1", [userId]);

    if (relations.rows.length > 0) {
      return res.status(200).json(relations.rows);
    }

    res.status(404).json({ message: "No relations found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get one forum_user relation (forum subscriber) by forum and user id
// @route GET /api/forums/subscribers/:forumId/:userId
export const getSubscriberByIds: RequestHandler = async (req, res, next) => {
  const { forumId, userId } = req.params;

  try {
    const allSubscribers = await pool.query("SELECT * FROM forum_user WHERE forum_id = $1 AND user_id = $2", [
      forumId,
      userId,
    ]);

    if (allSubscribers.rows.length > 0) {
      return res.status(200).json(allSubscribers.rows[0]);
    }

    res.status(404).json({ message: "No subscriber was found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Create new forum
// @route POST /api/forums
export const createForum: RequestHandler = async (req, res, next) => {
  const { name, description, created_at, icon = "", banner = "" } = req.body;

  if (!name && !description) {
    return res.status(422).json({ message: "A name and a description must be provided in order to create a forum." });
  }

  try {
    const newForum = await pool.query(
      "INSERT INTO forums(name, description, created_at, icon, banner) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, description, created_at, icon, banner]
    );

    res.status(200).json(newForum.rows[0]);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Create forum_user relation (forum subscriber)
// @route POST /api/forums/user/subscribe
export const subscribeToForum: RequestHandler = async (req, res, next) => {
  const { forumId, userId } = req.body;

  if (!forumId && !userId) {
    return res.status(422).json({ message: "Missing parameters." });
  }

  try {
    const newForum = await pool.query("INSERT INTO forum_user(forum_id, user_id) VALUES($1, $2) RETURNING *", [
      forumId,
      userId,
    ]);

    res.status(200).json(newForum.rows[0]);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Update forum
// @route PUT /api/forums/:id
export const updateForum: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title) {
    return res.status(422).json({ message: "A title must be provided in order to update a forum." });
  }

  try {
    const updatedForum = await pool.query("UPDATE forums SET title = $1, description = $2 WHERE id = $3 RETURNING *", [
      title,
      description,
      id,
    ]);

    if (updatedForum.rows.length > 0) {
      return res.status(200).json({ message: "The forum was successfully updated." });
    }

    res.status(404).json({ message: "Forum not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Delete forum
// @route DELETE /api/forums/name/:id
export const deleteForum: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedForum = await pool.query("DELETE FROM forums WHERE id = $1 RETURNING *", [id]);

    if (deletedForum.rows.length > 0) {
      return res.status(200).json({ message: "The forum was successfully deleted." });
    }

    res.status(404).json({ message: "Forum not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Delete forum_user relation (forum subscriber)
// @route DELETE /api/forums/user/unsubscribe
export const unsubscribeFromForum: RequestHandler = async (req, res, next) => {
  const { forumId, userId } = req.body;

  try {
    const deletedForum = await pool.query("DELETE FROM forum_user WHERE forum_id = $1 AND user_id = $2 RETURNING *", [
      forumId,
      userId,
    ]);

    if (deletedForum.rows.length > 0) {
      return res.status(200).json({ message: "The relation was successfully deleted." });
    }

    res.status(404).json({ message: "Relation not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
