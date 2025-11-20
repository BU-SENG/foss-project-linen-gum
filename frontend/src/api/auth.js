// Handles all authentication-related API calls
import axios from "../utils/axios";
import { handleApiError } from "./handleError";

export const loginUser = async (data) => {
  try {
    const res = await axios.post("/auth/login", data);
    return res.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const registerCreator = async (data) => {
  try {
    const res = await axios.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


// Verify email
export const verifyEmailAPI = async (data) => {
  try {
    const res = await axios.post("/auth/verify-email", data);
    return res.data; // { success, message }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post("/auth/logout");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
