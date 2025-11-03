import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    // Get the MongoDB URI from environment variables (.env file)
    const mongoURI = process.env.MONGO_LOCAL_URI;

    // Connect to MongoDB using mongoose
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    // Exit the process with failure code
    process.exit(1);
  }
};
