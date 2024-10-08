import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //saçma karakterler girilmesin diye

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be  at least 6 characters",
      });
    }
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ succes: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ succes: false, message: "Username already exists" });
    }
    const salt = await bcryptjs.genSalt(10); //şifreyi hashlemek
    const hashedPassword = await bcryptjs.hash(password, salt);
    // 123456 ==> 123lsladfşl"1_w29
    const PROFILE_PICS = [
      "netflixavatar1.png",
      "netflixavatar2.png",
      "netflixavatar3.png",
    ];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      image: image,
    });
    //JWT WEB TOKEN
    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();
    res
      .status(201)
      .json({ succes: true, user: { ...newUser._doc, password: "" } });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ succes: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ succes: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ succes: false, message: "Invalid credentials" });
    }

    //bcrypt ile pass kontrol
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ succes: false, message: "Invalid credentials" });
    }
    // added JWT funck here
    generateTokenAndSetCookie(user._id, res);

    res
      .status(200)
      .json({ succes: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    console.log("Error in login controller");
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ succes: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ succes: false, message: "Internal Server Error" });
  }
}
