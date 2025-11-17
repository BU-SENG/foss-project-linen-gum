// Importing required modules
import express from "express"; // Express framework for building the server
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import cookieParser from "cookie-parser"; // Middleware for parsing cookies

// Importing Routes
import authRoutes from "./routes/auth.route.js"; // Authentication routes
import campaignRoutes from "./routes/campaign.route.js"; // Campaign routes
import donationRoutes from "./routes/donation.route.js"

const app = express(); // Creating an instance of an Express application

const allowedOrigins = ["http://localhost:5173"];

// Middleware to enable CORS to allow requests from different origins
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Parse incoming JSON requests and make the data available in req.body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Basic test route to confirm the API is running
app.get("/", (req, res) => {
  res.send("Hello from Aidly API!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/donations", donationRoutes);

// 404 Handler for unknown API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return res
      .status(404)
      .json({ message: "The specified API route does not exist" });
  }
  next();
});

export default app;
