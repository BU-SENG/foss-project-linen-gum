// Handles all admin-related API calls
import axios from "../utils/axios";
import { handleApiError } from "./handleError";

//  Fetch admin dashboard stats
export const fetchDashboardStats = async () => {
  try {
    const res = await axios.get("/admin/dashboard");
    return res.data.stats;
  } catch (error) {
    throw handleApiError(error);
  }
};

//  Fetch all campaigns for admin dashboard
export const fetchCampaigns = async (status) => {
  try {
    const res = await axios.get(`/admin/campaigns?status=${status}`);
    return res.data.campaigns; // backend returns campaigns array
  } catch (error) {
    throw handleApiError(error);
  }
};
