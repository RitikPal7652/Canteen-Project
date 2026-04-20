import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body ;

    //check whether the data is empty or not
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //check whether email already exists or not
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return res.status(400).json({
        message: "Email aready exists, Signup with different email",
      });
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds
    
    //it creates and save it
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'customer'
    });

    //Generate token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
  
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "User registered successfully",
        data: {
          id: newUser._id,
          token: token,
          name: newUser.username,
        },
      });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }
};

export const authLogin = async (req, res) => {
  const { email, password: plainPassword } = req.body;

  //return object of user otherwise null
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials , User doen't exits" });
  }

  //bcrypt returns true or false
  const isPasswordMatch = await bcrypt.compare(plainPassword, user.password); //user that we found from DB

  if (!isPasswordMatch) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials, Password doesn't exist" });
  }

  //Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  const { password: hashedPassword, ...userWithoutPassword } = user._doc;
  //Send token back
  res
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 2 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "Login Successfully",
      token: token,
      user: userWithoutPassword,
    });
};

export const authCheckLogin = async (req, res) => {
  try {
    const token = req.cookies.accessToken; 
    if (!token) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log("Error while checking authentication", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const authLogout = (req, res) => {
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,  
    });
    return res.status(200).json({ message: 'Logged out successfully' });
}

export const authGoogle = async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await User.findOne({ email });

    // If user doesn't exist, create an account
    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      
      user = await User.create({
        username: name,
        email: email,
        password: hashedPassword,
        role: 'customer'
      });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const { password: hashedPassword, ...userWithoutPassword } = user._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Google Login Successfully",
        token: token,
        user: userWithoutPassword,
      });

  } catch (error) {
    console.error("Google Auth error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};