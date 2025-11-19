import jwt from "jsonwebtoken";

/**
 * Generate JWT token and set it as an HTTP-only cookie
 * @param {Object} res - Express response object
 * @param {String} userId - User's unique ID
 * @returns {String} token - The generated JWT token
 */
export const generateTokenAndSetCookie = (res, userId) => {
  // Generate JWT token with user ID as payload
  const token = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' } // Token expires in 7 days
  );

  // Set token as HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Cookie cannot be accessed via JavaScript (this prevents XSS attacks)
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  return token;
};