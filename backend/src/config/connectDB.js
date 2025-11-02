import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_LOCAL_URI
        : process.env.MONGO_ATLAS_URI;

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
