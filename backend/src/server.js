// Import required modules
import dotenv from "dotenv"; // Loads environment variables from a .env file
import express from "express"; 
import app from "./app.js"; // Import the Express app instance
import { connectDB } from "./config/connectDB.js";
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());

// Initialize environment variables
dotenv.config();

// Define the server port from environment variables
const PORT = process.env.PORT;

// Connect to the database, start the Express server and listen for incoming requests
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

