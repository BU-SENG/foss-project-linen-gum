// Handles all campaign-related API calls
import axios from "../utils/axios";
import { handleApiError } from "./handleError";

// Fetch all approved campaigns
export const fetchAllCampaigns = async () => {
  try {
    const res = await axios.get("/campaign");
    return res.data.campaigns || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Fetch single campaign by ID
export const fetchCampaignById = async (id) => {
  try {
    const res = await axios.get(`/campaign/${id}`);
    return res.data.campaign || null;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};