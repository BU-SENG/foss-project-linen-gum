// Importing required modules
import express from "express"; // Express framework for building the server
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)

const app = express(); // Create an instance of an Express application

// Parse incoming JSON requests and make the data available in req.body
app.use(express.json());

// Enable CORS to allow requests from different origins (e.g., frontend URL)
app.use(cors());

// Basic test route to confirm the API is running
app.get("/", (req, res) => {
  res.send("Hello from Aidly API!");
});

export default app;
