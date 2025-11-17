import Campaign from "../models/Campaign.js";

// Creating a new campaign by a creator
export const createCampaign = async (req, res) => {};

// Fetching all approved campaigns
export const getAllCampaigns = async (req, res) => { };

// Get campaigns created by the logged-in creator
export const myCampaigns = async (req, res) => { }

// Fetching a single campaign by ID
export const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find campaign by ID and populate creator details
    const campaign = await Campaign.findById(id).populate(
      "createdBy",
      "fullName email"
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Campaign fetched successfully",
      data: campaign,
    });
  } catch (error) {
    console.error("Error fetching campaign by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching campaign",
      error: error.message,
    });
  }
};

// Updating a creator's campaign
export const updateCampaign = async (req, res) => {};
