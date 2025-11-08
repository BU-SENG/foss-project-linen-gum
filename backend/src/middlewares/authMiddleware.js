import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Creator from "../models/Creator.js";

export const verifyToken = async (req, res, next) => {
  // Check for token in cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Kindly login",
    });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Invalid token",
      });
    }

    //   Finding the user in the creator collection first
    let user = await Creator.findById(decoded.userId).select("-password");

    // If not found in creator collection, check in admin collection
    if (!user) {
      user = await Admin.findById(decoded.userId).select("-password");
    }

    //   If user not found in both collections
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! User not found",
      });
    }

    //   Attach the info to the request object so it can be used in the next middleware
    req.user = user;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Checking if user is an admin
export const isAdmin = (req, res, next) => {
  if (!req.userRole || req.userRole !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "You can not perfom this action" });
  }
};

export const isCreator = (req, res, next) => {
  try {
    // req.userRole from the verifyToken middleware
    if (req.userRole !== "creator") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Only creators can perform this action.",
      });
    }

    next(); // Proceed if user is a creator
  } catch (error) {
    console.error("Error in isCreator middleware:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
