import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
  try {
    // Use the DATABASE_URL from the .env file
    const dbUri = process.env.DATABASE_URL;
    await mongoose.connect(dbUri);
    console.log("DB Connected");
  } catch (error) {
    console.error("Could not connect to DB: ", error);
  }
};
