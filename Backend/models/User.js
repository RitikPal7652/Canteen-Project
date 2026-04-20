import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true    //it removes extra space
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  }
},
{
  timestamps: true
})

//model
const User = new mongoose.model('User', UserSchema);
export default User;