// Import required modules
import dotenv from "dotenv"; // Loads environment variables from a .env file
import app from "./app.js"; // Import the Express app instance

// Initialize environment variables
dotenv.config();

// Define the server port from environment variables
const PORT = process.env.PORT;

// Start the Express server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
