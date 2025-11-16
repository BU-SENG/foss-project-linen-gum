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
export const verifyPayment = async (req, res) => {
  let donation = null;
  try {
    // Get donation ID from query
    const { donationId, transaction_id, status } = req.query;

    // Check if the donation exists
    donation = await Donation.findById(donationId).populate("campaign");

    // If it dosen't exists
    if (!donation) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/donation-result?status=failed`
      );
    }

    // Handle cancelled payments immediately
    if (status === "cancelled" || !transaction_id) {
      donation.paymentStatus = "failed";
      await donation.save();
      return res.redirect(
        `${process.env.FRONTEND_URL}/donation-result?status=failed`
      );
    }

    // Verify transaction with Flutterwave
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const { status: paymentStatus, amount } = response.data.data;

    if (paymentStatus === "successful") {
      // update donation
      donation.paymentStatus = "successful";
      donation.transactionId = transaction_id;
      await donation.save();

      // Check if this donor has already donated successfully to this campaign
      const previousDonation = await Donation.findOne({
        campaign: donation.campaign,
        donorEmail: donation.donorEmail,
        paymentStatus: "successful",
        _id: { $ne: donation._id }, // exclude current donation
      });

      // Increment numberOfDonors only if this is the donor's first successful donation
      const incrementDonors = previousDonation ? 0 : 1;

      // Update the campaign
      await Campaign.findByIdAndUpdate(donation.campaign, {
        $inc: {
          amountRaised: amount,
          numberOfDonors: incrementDonors,
        },
      });

      return res.redirect(
        `${
          process.env.FRONTEND_URL
        }/donation-result?status=success&campaignTitle=${encodeURIComponent(
          donation.campaign.title
        )}&amount=${donation.amount}`
      );
    } else {
      donation.paymentStatus = "failed";
      await donation.save();

      return res.redirect(
        `${process.env.FRONTEND_URL}/donation-result?status=failed`
      );
    }
  } catch (error) {
    console.error(error);
    // If donation exists, mark it as failed
    if (donation) {
      donation.paymentStatus = "failed";
      await donation.save();
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/donation-result?status=failed`
    );
  }
};

/**
 * Cron job helper:
 * To mark old pending donations without transactionId  as "cancelled" periodically (automatically).
 */
export const cleanPendingDonations = async () => {};

// To manually mark old pending donations without transactionId  as "cancelled"
export const cleanPendingDonationsManual = async (req, res) => {};
