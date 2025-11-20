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

// Fetch campaigns created by the logged-in creator
export const fetchMyCampaigns = async () => {
    try {
        const res = await axios.get("/campaign/my-campaigns");
        return res.data.campaigns || [];
    } catch (error) {
        handleApiError(error);
        return [];
    }
};

// Create a new campaign
export const createCampaign = async (formData) => {
    try {
        const res = await axios.post("/campaign/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Update an existing campaign
export const updateCampaign = async (id, formData) => {
    try {
        const res = await axios.put(`/campaign/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};