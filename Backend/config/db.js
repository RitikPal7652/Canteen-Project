import mongoose from "mongoose";

const connectDB = async () => {
  // Point to persistent MongoDB storage server
  // Defaults to localhost port 27017 for MongoDB installation
  const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('admin123@cluster0')
    ? process.env.MONGO_URI
    : "mongodb://127.0.0.1:27017/canteenDB";

  const db = mongoose.connection;
  
  db.on('connected', () => {
    console.log(`✅ Mongodb connected successfully to Persistent Storage!`);
  });
  
  db.on('error', (err) => {
    console.log('❌ Mongodb connection failed', err.message);
    console.log('----------------------------------------------------');
    console.log('💡 PLEASE START YOUR LOCAL MONGODB SERVER!');
    console.log('   Since you wanted data to be stored persistently,');
    console.log('   make sure MongoDB is running on your machine.');
    console.log('----------------------------------------------------');
  });
  
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.log('❌ Mongodb connection crashed:', err.message);
    process.exit(1);
  }
}

export default connectDB;