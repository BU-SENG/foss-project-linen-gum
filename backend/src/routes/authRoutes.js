import express from "express";
import {
  register,
  login,
  verifyOTP,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
