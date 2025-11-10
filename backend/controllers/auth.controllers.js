import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    let { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    let existUsername = await User.findOne({ userName });
    if (existUsername) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json(user)
  } catch (error) {
    console.error("❌ Signup error:", error); // log full error
    return res.status(500).json({ message: "signup error" }); // return actual error message
}
};

export const login = async(req, res)=>{
    try {
        const {email, password } = req.body;
        let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email does not exists!" });
      }

      const isMatch = bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({message:"incorrect Password"});
      }

      let token = await genToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(201).json(user)
    } catch (error) {
        console.error("❌ Signin error:", error); 
      return res.status(500).json({ message: "signin error" });
  }
};

export const logOut = async(req, res)=>{
  try {
      res.clearCookie("token");
      return res.status(200).json({message:"log out successfully"});
  } catch (error) {
      console.error("❌ logout error:", error); 
      return res.status(500).json({ message: "logout error" });
  }
}
