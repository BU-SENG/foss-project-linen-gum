import Admin from "../models/Admin.js";
import Creator from "../models/Creator.js";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "../mail/emailService.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {generateVerificationCode} from "../utils/generateVerificationCode.js"

const DUMMY_PASSWORD_HASH =
  "$2a$10$CwTycUXWue0Thq9StjUM0uJ8axFzjcxgXmjKPqExE7hFl/jfD2N.G";

const ONE_HOUR = 60 * 60 * 1000;

// To register admin
export const registerAdmin = async (req, res) => {
  try {
    //  To get the data from the form body
    const { fullName, email, password } = req.body;

    //  To validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //   Check if email already exists in Admin collection
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Check if email already exists in Creator collection
    const existingCreator = await Creator.findOne({ email });
    if (existingCreator) {
      return res.status(409).json({ message: "Email already in use" });
    }

    //  Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //   Create new admin
    const admin = new Admin({
      fullName,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    await admin.save();

    // try {
    //   await sendVerificationCodeEmail(email, verificationToken);
    // } catch (error) {
    //   console.error(error);
    // }

    //   Sending response
    res.status(201).json({
      message: "Admin registered successfully.",
      success: true,
      data: {
        ...admin._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// To register campaign creators
export const registerCreator = async (req, res) => {
  try {
    //  To get the data from the form body
    const { fullName, email, password } = req.body;

    //  To validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //   Check if email already exists in Creator collection
    const existingCreator = await Creator.findOne({ email });
    if (existingCreator) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Check if email already exists in Admin collection
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already in use" });
    }

    //  Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //   Store verification token (OTP)
    const verificationToken = generateVerificationCode();
    //   Hashing the stored verification token
    const hashedVerificationToken = await bcryptjs.hash(
      verificationToken,
      salt
    );
    const verificationTokenExpiresAt = Date.now() + ONE_HOUR; // 1 hour from current time

    //   Create new creator
    const creator = new Creator({
      fullName,
      email,
      password: hashedPassword,
      verificationToken: hashedVerificationToken,
      verificationTokenExpiresAt,
    });

    await creator.save();

    try {
      await sendVerificationEmail(email, fullName, verificationToken);
    } catch (error) {
      console.error("Error sending code:", error);
    }

    console.log(verificationToken);

    //   Sending response
    res.status(201).json({
      message: "Creator registered successfully. Please verify your email.",
      success: true,
      data: {
        ...creator._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// To login all users (campaign creators and admins)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validating Input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check if user exists in creator collection
    let user = await Creator.findOne({ email });

    // If not found in creator collection, check in admin collection
    if (!user) {
      user = await Admin.findOne({ email });
    }

    //   If user not found in both collections, do dummy password compare to prevent timing attacks
    if (!user) {
      await bcryptjs.compare(password || "", DUMMY_PASSWORD_HASH);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //   Compare passwords from input field with the one in database.
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    // To check if the user is verified
    if (user.role !== "admin" && !user.isVerified) {
      // To generate a new OTP and hash it before storing in the database
      const verificationToken = generateVerificationCode();
      const hashedVerificationToken = await bcryptjs.hash(
        verificationToken,
        10
      );

      user.verificationToken = hashedVerificationToken;
      user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
      await user.save();

      try {
        await sendVerificationEmail(
          user.email,
          user.fullName,
          verificationToken
        );
      } catch (error) {
        console.error("Failed to send verification email:", error);
      }

      return res.status(403).json({
        success: false,
        message:
          "Email not verified. Check your email or spam folder for the verification code.",
        needVerification: true,
      });
    }

    //   Generating JWT token and setting it in HTTP-only cookie
    generateTokenAndSetCookie(res, user._id, user.role);

    //   Sending response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        ...user._doc,
        password: undefined,
        isVerified: user.isVerified,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// To logout all users
export const logout = async (req, res) => {};

// To verify email addresses of campaign creators
export const verifyEmail = async (req, res) => {};

// To handle forgot password requests
export const forgotPassword = async (req, res) => {};

// Logic to reset password
export const resetPassword = async (req, res) => {};

// To check authentication status
export const checkAuth = async (req, res) => {};
