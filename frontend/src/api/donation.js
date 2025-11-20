// Handles all donation-related API calls
import axios from "../utils/axios";
import { handleApiError } from "./handleError";

// Initialize a donation
export const initializeDonation = async (donationData) => {
  try {
    const res = await axios.post("/donations/initialize", donationData);
    return res.data; // { success: true, paymentLink }
  } catch (error) {
    handleApiError(error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Donation initialization failed",
    };
  }
};

// Clean pending donations (admin/manual)
export const cleanPendingDonations = async () => {
  try {
    const res = await axios.post("/donations/clean-pending");
    return res.data;
  } catch (error) {
    handleApiError(error);
    return { success: false, message: "Failed to clean pending donations" };
  }
};
