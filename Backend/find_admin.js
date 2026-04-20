import mongoose from "mongoose";

const checkAdmin = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/canteenDB");

    // Define user schema since we just need to read
    const UserSchema = new mongoose.Schema({
      username: String,
      email: String,
      role: String
    });
    
    // Model
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const admins = await User.find({ role: 'admin' });
    
    if (admins.length > 0) {
      console.log("----- CURRENT ADMINS -----");
      admins.forEach(a => console.log(`Name: ${a.username} | Email: ${a.email}`));
    } else {
      console.log("NO ADMINS FOUND IN THE DATABASE.");
      
      console.log("...I will create a default admin for you: admin@canteen.com (password: admin123)");
      const bcrypt = await import("bcrypt");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
         username: "Super Admin",
         email: "admin@canteen.com",
         password: hashedPassword,
         role: 'admin'
      });
      console.log("✅ Default admin created successfully!");
    }

  } catch (error) {
    console.error("Error querying db:", error.message);
  } finally {
    process.exit(0);
  }
};

checkAdmin();
