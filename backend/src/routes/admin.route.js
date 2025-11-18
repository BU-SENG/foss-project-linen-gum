import express from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js"; // middleware to check if user is admin
import {
  getDashboardStats,
  getAdminCampaigns,
  approveCampaign,
  rejectCampaign,
  suspendCampaign,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(verifyToken, isAdmin);

router.get("/dashboard", getDashboardStats);
router.get("/campaigns", getAdminCampaigns);
router.patch("/campaigns/:id/approve", approveCampaign);
router.patch("/campaigns/:id/reject", rejectCampaign);
router.patch("/campaigns/:id/suspend", suspendCampaign);

export default router;
