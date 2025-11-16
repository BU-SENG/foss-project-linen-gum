import axios from "axios";
import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";

// Initialize donation
export const initializeDonation = async (req, res) => {};

// Verifying payment
export const verifyPayment = async (req, res) => {};

/**
 * Cron job helper:
 * To mark old pending donations without transactionId  as "cancelled" periodically (automatically).
 */
export const cleanPendingDonations = async () => {};

// To manually mark old pending donations without transactionId  as "cancelled"  
export const cleanPendingDonationsManual = async (req, res) => {};
