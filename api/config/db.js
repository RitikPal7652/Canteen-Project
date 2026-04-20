import mongoose from "mongoose";

const connectDB = async () => {
  // Use MONGO_URI from environment, otherwise default to localhost
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/canteenDB";

  const db = mongoose.connection;
  
  db.on('connected', () => {
    console.log(`✅ Mongodb connected successfully!`);
  });
  
  db.on('error', (err) => {
    console.log('❌ Mongodb connection error:', err.message);
  });
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (err) {
    console.log('⚠️ MongoDB connection failed:', err.message);
    console.log('📌 On Render: Set MONGO_URI environment variable');
    console.log('📌 Locally: Make sure MongoDB is running on localhost:27017');
    // Don't exit - let the app start anyway and handle DB errors at runtime
  }
}

export default connectDB;