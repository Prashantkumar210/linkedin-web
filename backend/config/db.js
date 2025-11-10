import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log("✅ Database is connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

export default connectDb;
