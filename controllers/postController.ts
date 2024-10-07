import { RequestHandler } from "express";
import pool from "../dbConfig";

// @desc  Get single post
// @route GET /api/posts/:id
export const getPost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

    if (post.rows.length > 0) {
      return res.status(200).json(post.rows[0]);
    }

    res.status(404).json({ message: "Post not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all posts
// @route GET /api/posts
export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");

    if (allPosts.rows.length > 0) {
      return res.status(200).json(allPosts.rows);
    }

    res.status(404).json({ message: "No posts were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all posts by forum name
// @route GET /api/posts/forum/:id
export const getPostsByForumName: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const posts = await pool.query("SELECT * FROM posts WHERE forum_name = $1", [id]);

    if (posts.rows.length > 0) {
      return res.status(200).json(posts.rows);
    }

    res.status(404).json({ message: "No posts were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Get all posts by user id
// @route GET /api/posts/user/:id
export const getPostsByUserId: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const posts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [id]);

    if (posts.rows.length > 0) {
      return res.status(200).json(posts.rows);
    }

    res.status(404).json({ message: "No posts were found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Create new post
// @route POST /api/posts
export const createPost: RequestHandler = async (req, res, next) => {
  const { title, body = "", image = "", created_at, user_id, forum_name, likes = 0, dislikes = 0 } = req.body;

  if (!title) {
    return res.status(422).json({ message: "A title must be provided in order to create a post." });
  }

  try {
    const newPost = await pool.query(
      "INSERT INTO posts(title, body, image, created_at, user_id, forum_name, likes, dislikes) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, body, image, created_at, user_id, forum_name, likes, dislikes]
    );

    res.status(200).json(newPost.rows[0]);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Update post
// @route PUT /api/posts/:id
export const updatePost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title) {
    return res.status(422).json({ message: "A title must be provided in order to update a post." });
  }

  try {
    const updatedPost = await pool.query("UPDATE posts SET title = $1, description = $2 WHERE id = $3 RETURNING *", [
      title,
      description,
      id,
    ]);

    if (updatedPost.rows.length > 0) {
      return res.status(200).json({ message: "The post was successfully updated." });
    }

    res.status(404).json({ message: "Post not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Update post when it becomes liked
// @route PUT /api/posts/:id/like
export const likePost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedPost = await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *", [id]);

    if (updatedPost.rows.length > 0) {
      return res.status(200).json(updatedPost.rows[0]);
    }

    res.status(404).json({ message: "Post not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Update post when like is removed
// @route PUT /api/posts/:id/removelike
export const removeLikefromPost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedPost = await pool.query("UPDATE posts SET likes = likes - 1 WHERE id = $1 RETURNING *", [id]);

    if (updatedPost.rows.length > 0) {
      return res.status(200).json(updatedPost.rows[0]);
    }

    res.status(404).json({ message: "Post not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Update post when it becomes disliked
// @route PUT /api/posts/:id/dislike
export const dislikePost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedPost = await pool.query("UPDATE posts SET dislikes = dislikes + 1 WHERE id = $1 RETURNING *", [id]);

    if (updatedPost.rows.length > 0) {
      return res.status(200).json(updatedPost.rows[0]);
    }

    res.status(404).json({ message: "Post not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Update post when dislike is removed
// @route PUT /api/posts/:id/removedislike
export const removeDislikefromPost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedPost = await pool.query("UPDATE posts SET dislikes = dislikes - 1 WHERE id = $1 RETURNING *", [id]);

    if (updatedPost.rows.length > 0) {
      return res.status(200).json(updatedPost.rows[0]);
    }

    res.status(404).json({ message: "Post not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc  Delete post
// @route DELETE /api/posts/:id
export const deletePost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);

    if (deletedPost.rows.length > 0) {
      return res.status(200).json({ message: "The post was successfully deleted." });
    }

    res.status(404).json({ message: "Post not found." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
