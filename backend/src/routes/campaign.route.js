import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  myCampaigns,
} from "../controllers/campaign.controller.js";
import { isCreator, verifyToken } from "../middlewares/authMiddleware.js";
import {
    uploadCampaignImages,
    handleUploadError,
} from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Campaign routes
router.post(
    "/create",
    verifyToken,
    isCreator,
    uploadCampaignImages,
    handleUploadError,
    createCampaign
);
router.get("/my-campaigns", verifyToken, isCreator, myCampaigns);
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.put(
    "/:id",
    verifyToken,
    isCreator,
    uploadCampaignImages,
    handleUploadError,
    updateCampaign
);

export default router;
