import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/canteenDB";

  try {
    const db = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log(`✅ Mongodb connected successfully!`);
  } catch (err) {
    console.log('⚠️ MongoDB connection failed:', err.message);
    console.log('📌 On Vercel/Render: Set MONGO_URI environment variable in dashboard');
    console.log('📌 Locally: Make sure MongoDB is running on localhost:27017');
  }
}

export default connectDB;