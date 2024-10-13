import { RequestHandler } from "express";
import pool from "../dbConfig";
import bcrypt from "bcrypt";

// @desc  Get single user
// @route GET /api/users/:id
export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (user.rows.length > 0) {
      return res.status(200).json(user.rows[0]);
    }

    res.status(404).json({ message: "User not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all users
// @route GET /api/users
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");

    if (allUsers.rows.length > 0) {
      return res.status(200).json(allUsers.rows);
    }

    res.status(404).json({ message: "No users were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get userLikedPosts realtionship
// @route GET /api/users/post/likes
export const getUsersLikedPosts: RequestHandler = async (req, res, next) => {
  try {
    const allRelations = await pool.query("SELECT * FROM user_liked_posts");

    if (allRelations.rows.length > 0) {
      return res.status(200).json(allRelations.rows);
    }

    res.status(404).json({ message: "No relations were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get userLikedPosts realtionship
// @route GET /api/users/post/likes/:userId/:postId
export const getUsersLikedPostsById: RequestHandler = async (req, res, next) => {
  const { userId, postId } = req.params;

  try {
    const allRelations = await pool.query("SELECT * FROM user_liked_posts WHERE user_id = $1 AND post_id = $2", [
      userId,
      postId,
    ]);

    if (allRelations.rows.length > 0) {
      return res.status(200).json(allRelations.rows);
    }

    res.status(200).json([]);
    // res.status(404).json({ message: "No relations were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get userDislikedPosts realtionship
// @route GET /api/users/post/dislikes
export const getUsersDislikedPosts: RequestHandler = async (req, res, next) => {
  try {
    const allRelations = await pool.query("SELECT * FROM user_disliked_posts");

    if (allRelations.rows.length > 0) {
      return res.status(200).json(allRelations.rows);
    }

    res.status(404).json({ message: "No relations were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get userDisikedPosts realtionship
// @route GET /api/users/post/dislikes/:userId/:postId
export const getUsersDislikedPostsById: RequestHandler = async (req, res, next) => {
  const { userId, postId } = req.params;

  try {
    const allRelations = await pool.query("SELECT * FROM user_disliked_posts WHERE user_id = $1 AND post_id = $2", [
      userId,
      postId,
    ]);

    if (allRelations.rows.length > 0) {
      return res.status(200).json(allRelations.rows);
    }

    res.status(200).json([]);
    // res.status(404).json({ message: "No relations were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Create new user
// @route POST /api/users
export const createUser: RequestHandler = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(422).json({ message: "Invalid or missing parameters." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query("INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *", [
      email,
      username,
      hashedPassword,
    ]);

    res.status(200).json(newUser.rows[0]);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Create userLikedPost relationship
// @route POST /api/users/post/like
export const createUserLikedPostRelationship: RequestHandler = async (req, res, next) => {
  const { userId, postId } = req.body;

  try {
    const newRelation = await pool.query("INSERT INTO user_liked_posts(user_id, post_id) VALUES($1, $2) RETURNING *", [
      userId,
      postId,
    ]);

    res.status(200).json(newRelation.rows[0]);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Delete userLikedPost relationship
// @route DELETE /api/users/post/removelike
export const deleteUserLikedPostRelationship: RequestHandler = async (req, res, next) => {
  const { userId, postId } = req.body;

  try {
    const newRelation = await pool.query(
      "DELETE FROM user_liked_posts WHERE user_id = $1 AND post_id = $2 RETURNING *",
      [userId, postId]
    );

    if (newRelation.rows.length > 0) {
      return res.status(200).json(newRelation.rows[0]);
    }

    res.status(404).json({ message: "Relation not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Create userDisikedPost relationship
// @route POST /api/users/post/dislike
export const createUserDislikedPostRelationship: RequestHandler = async (req, res, next) => {
  const { userId, postId } = req.body;

  try {
    const newRelation = await pool.query(
      "INSERT INTO user_disliked_posts(user_id, post_id) VALUES($1, $2) RETURNING *",
      [userId, postId]
    );

    res.status(200).json(newRelation.rows[0]);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Delete userLikedPost relationship
// @route DELETE /api/users/post/removedislike
export const deleteUserDislikedPostRelationship: RequestHandler = async (req, res, next) => {
  const { userId, postId } = req.body;

  try {
    const newRelation = await pool.query(
      "DELETE FROM user_disliked_posts WHERE user_id = $1 AND post_id = $2 RETURNING *",
      [userId, postId]
    );

    if (newRelation.rows.length > 0) {
      return res.status(200).json(newRelation.rows[0]);
    }

    res.status(404).json({ message: "Relation not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Update user
// @route PUT /api/users/:id
export const updateUser: RequestHandler = async (req, res, next) => {};

// @desc  Delete user
// @route DELETE /api/users/:id
export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

    if (deletedUser.rows.length > 0) {
      return res.status(200).json({ message: "The user was successfully deleted." });
    }

    res.status(404).json({ message: "User not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
