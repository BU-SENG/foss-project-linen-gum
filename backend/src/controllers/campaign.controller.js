import Campaign from "../models/Campaign.js";

// Creating a new campaign by a creator
export const createCampaign = async (req, res) => {};

// Fetching all approved campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        // Extract query parameters for filtering, pagination, and sorting
        const {
            category,
            location,
            search,
            page = 1,
            limit = 10,
            sortBy = "dateCreated",
            order = "desc",
        } = req.query;

        // Build filter object - only show approved campaigns
        const filter = { isApproved: true };

        // Add category filter if provided
        if (category) {
            filter.category = category;
        }

        // Add location filter if provided
        if (location) {
            filter.location = { $regex: location, $options: "i" }; // case-insensitive search
        }

        // Add search filter for title and description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Determine sort order
        const sortOrder = order === "asc" ? 1 : -1;
        const sortOptions = { [sortBy]: sortOrder };

        // Fetch campaigns with filters, pagination, and sorting
        const campaigns = await Campaign.find(filter)
            .populate("createdBy", "username email") // Populate creator details
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination metadata
        const totalCampaigns = await Campaign.countDocuments(filter);

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCampaigns / parseInt(limit));
        const hasNextPage = parseInt(page) < totalPages;
        const hasPrevPage = parseInt(page) > 1;

        // Return response with campaigns and pagination data
        res.status(200).json({
            success: true,
            data: campaigns,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalCampaigns,
                limit: parseInt(limit),
                hasNextPage,
                hasPrevPage,
            },
        });
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch campaigns",
            error: error.message,
        });
    }
};

// Get campaigns created by the logged-in creator
export const myCampaigns = async (req, res) => { }

// Fetching a single campaign by ID
export const getCampaignById = async (req, res) => {};

// Updating a creator's campaign
export const updateCampaign = async (req, res) => {};
