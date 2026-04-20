import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const isAuthenticated = async (req,res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if(!token){
    return res.status(401).json({message: "No Token Provided"})
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // JWT was signed with userId, not id
    req.user = await User.findById(decoded.userId).select("-password");
    
    if(!req.user) {
      return res.status(401).json({message: "User not found"});
    }
    
    next();
  }catch(err){
    return res.status(401).json({message: "Invalid or expired token"})
  }
}

export default isAuthenticated;