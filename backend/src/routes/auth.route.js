import express from "express";
import {
  registerAdmin,
  registerCreator,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  logout,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin registration
router.post("/admin/register", registerAdmin);

// Creator registration & verification
router.post("/register", registerCreator);
router.post("/verify-email", verifyEmail);

// Shared for both Admin and Creator
router.post("/login", loginUser);
router.post("/logout", logout)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/check-auth", verifyToken, checkAuth);
export default router;
