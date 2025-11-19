// Importing required modules
import express from "express"; // Express framework for building the server
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import path from "path"; // Path module for file paths
import { fileURLToPath } from "url"; // URL module for ES modules

// Importing Routes
import authRoutes from "./routes/auth.route.js"; // Authentication routes
import campaignRoutes from "./routes/campaign.route.js"; // Campaign routes
import donationRoutes from "./routes/donation.route.js";
import adminRoutes from "./routes/admin.route.js"; // Admin routes

const app = express(); // Creating an instance of an Express application

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Basic test route to confirm the API is running
app.get("/", (req, res) => {
  res.send("Hello from Aidly API!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);

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
