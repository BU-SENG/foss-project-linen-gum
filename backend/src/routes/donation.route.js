import express from "express";
import {
  initializeDonation,
  verifyPayment,
  cleanPendingDonationsManual,
} from "../controllers/donation.controller.js";

const router = express.Router();

router.get("/verify", verifyPayment);
router.post("/initialize", initializeDonation);
router.post("/clean-pending", cleanPendingDonationsManual);

export default router;
