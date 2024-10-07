import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtTokens from "../utils/jwt-helpers";
import pool from "../dbConfig";

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Invalid or missing parameters." });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Email does not exist." });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: "Password is incorrect." });
    }

    const tokens = jwtTokens(user.rows[0].id, user.rows[0].username, user.rows[0].email);

    if (!tokens) {
      return res.status(500).json({ message: "There was a problem generating tokens." });
    }

    res.cookie("refresh_token", tokens?.refreshToken, { httpOnly: true });
    res.status(200).json({ message: "Successfully logged in.", tokens });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const register: RequestHandler = async (req, res, next) => {
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

    const tokens = jwtTokens(newUser.rows[0].id, newUser.rows[0].username, newUser.rows[0].email);

    if (!tokens) {
      return res.status(500).json({ message: "There was a problem generating tokens." });
    }

    console.log(newUser);
    res.cookie("refresh_token", tokens?.refreshToken, { httpOnly: true });
    res.status(200).json({ message: "Successfully registered.", tokens });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true, // Ensure this is only for HTTPS in production
    });
    return res.status(200).json({ message: "User logged out successfully." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    const secretKey = process.env.REFRESH_TOKEN_SECRET ?? "";

    if (refreshToken === null) {
      return res.status(401).json({ message: "The refresh token is null." });
    }

    jwt.verify(refreshToken, secretKey, (error: any, user: any) => {
      if (error) {
        return res.status(403).json({ message: error.message });
      }

      const tokens = jwtTokens(user.id, user.username, user.email);
      res.cookie("refresh_token", tokens?.refreshToken, { httpOnly: true });
      // res.cookie("refresh_token", tokens?.refreshToken);
      res.json(tokens);
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Refresh token deleted." });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
