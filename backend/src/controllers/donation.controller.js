import axios from "axios";
import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";

// Initialize donation
export const initializeDonation = async (req, res) => {
  try {
    //   Get data from the form
    const { donorName, donorEmail, amount, campaignId } = req.body;

    // Get the campaign data
    const campaign = await Campaign.findById(campaignId);

    // Generate a unique transaction reference
    const txRef = `donation-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create a pending donation entry
    const donation = await Donation.create({
      donorName,
      donorEmail,
      amount,
      campaign: campaignId,
      paymentStatus: "pending",
      txRef,
    });

    // Initialize payment with Flutterwave v3
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: txRef,
        amount,
        currency: "NGN",
        redirect_url: `${process.env.BACKEND_URL}/api/donations/verify?donationId=${donation._id}`,
        customer: {
          email: donorEmail,
          name: donorName,
        },
        customizations: {
          title: campaign.title,
          description: campaign.description,
        },
        meta: {
          campaignId,
          donorName,
          donorEmail,
          amount,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the payment link to frontend
    res.json({ success: true, paymentLink: response.data.data.link });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.response?.data || "Payment initialization failed",
    });
  }
};

// Verifying payment
export const verifyPayment = async (req, res) => {};

/**
 * Cron job helper:
 * To mark old pending donations without transactionId  as "cancelled" periodically (automatically).
 */
export const cleanPendingDonations = async () => {};

// To manually mark old pending donations without transactionId  as "cancelled"
export const cleanPendingDonationsManual = async (req, res) => {};
