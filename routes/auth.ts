import express from "express";
import { deleteRefreshToken, getRefreshToken, login, logout, register } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/refresh_token", getRefreshToken);

router.delete("/refresh_token", deleteRefreshToken);

export default router;
