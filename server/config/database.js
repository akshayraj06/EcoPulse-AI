import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn("MongoDB URI missing. Server will run with local development fallback data.");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || "ecopulse",
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error("Message:", error.message);
    console.error("Name:", error.name);
    console.warn("Server will continue with local development fallback data.");
  }
};

export default connectDB;
