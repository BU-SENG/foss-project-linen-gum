import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true, // It cannot be accessible by javascript and it prevents XSS attacks
    // secure: process.env.NODE_ENV === "production",
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax", //Prevents an attack called csrf
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};