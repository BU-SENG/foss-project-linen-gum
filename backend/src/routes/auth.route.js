import express from "express";
import {
  registerCreator,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Creator registration & verification
router.post("/register", registerCreator);
router.get("/verify/:token", verifyEmail);

// Shared for both Admin and Creator
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
