import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer, TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  const secretKey = process.env.ACCESS_TOKEN_SECRET ?? "";

  if (token === null || !token) {
    return res.status(401).json({ message: "The token is null." });
  }

  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      return res.status(403).json({ message: error.message });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
