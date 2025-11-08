import Admin from "../models/Admin.js";
import Creator from "../models/Creator.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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

    //   Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already in use" });
    }

    //  Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   Store verification token (OTP)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    //   Hashing the stored verification token
    const hashedVerificationToken = await bcryptjs.hash(
      verificationToken,
      salt
    );
    const verificationTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour from now

    //   Create new admin
    const admin = new Admin({
      fullName,
      email,
      password: hashedPassword,
      verificationToken: hashedVerificationToken,
      verificationTokenExpiry,
    });

    await admin.save();

    //   Sending response
    res.status(201).json({
      message: "Admin registered successfully. Please verify your email.",
      success: true,
      data: {
        ...admin._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiry: undefined,
      },
      adminId: admin._id,
      verificationToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
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

    //   Check if email already exists
    const existingCreator = await Creator.findOne({ email });
    if (existingCreator) {
      return res.status(409).json({ message: "Email already in use" });
    }

    //  Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //   Store verification token (OTP)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    //   Hashing the stored verification token
    const hashedVerificationToken = await bcryptjs.hash(
      verificationToken,
      salt
    );
    const verificationTokenExpiry = Date.now() + ONE_HOUR; // 1 hour from now

    //   Create new creator
    const creator = new Creator({
      fullName,
      email,
      password: hashedPassword,
      verificationToken: hashedVerificationToken,
      verificationTokenExpiry,
    });

    await creator.save();

    // //   Send verification email link
    // const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;
    // await sendEmail(
    //   email,
    //   "Verify your email",
    //   `Click the link to verify your email: ${verificationLink}`
    // );

    // //   Sending verification code (OTP)
    // await sendEmail(
    //   email,
    //   "Email Verification Code",
    //   `Your email verification code is: ${verificationToken}`
    // );

    //   Sending response
    res.status(201).json({
      message: "Creator registered successfully. Please verify your email.",
      success: true,
      creatorId: creator._id,
      verificationToken,
      data: {
        ...creator._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiry: undefined,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// To login all users (campaign creators and admins)
export const loginUser = async (req, res) => {};

// To logout all users
export const logout = async (req, res) => {};

// To verify email addresses of campaign creators
export const verifyEmail = async (req, res) => {};

// To handle forgot password requests
export const forgotPassword = async (req, res) => {};

// Logic to reset password
export const resetPassword = async (req, res) => {};
