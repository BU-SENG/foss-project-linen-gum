import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
} from "../controllers/campaign.controller.js";
import { isCreator, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Campaign routes
router.post("/create", verifyToken, isCreator, createCampaign);
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.put("/:id", updateCampaign);

export default router;
