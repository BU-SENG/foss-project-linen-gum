import express from "express";
import {
  initializeDonation,
  verifyPayment,
  cleanPendingDonationsManual,
} from "../controllers/donation.controller.js";

const router = express.Router();

// Verify payment callback route
router.get("/verify", verifyPayment);

// Initialize donation payment route
router.post("/initialize", initializeDonation);

// Manually clean pending donations that have no transactionId
router.post("/clean-pending", cleanPendingDonationsManual);

export default router;
