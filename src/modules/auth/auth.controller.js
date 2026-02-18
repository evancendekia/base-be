import { registerUser, loginUser } from "./auth.service.js";
import prisma from "../../config/prisma.js";
import jwt from "jsonwebtoken";
import { buildUserResponse } from "../user/user.service.js";
import { sendWelcomeEmail } from "../../shared/services/notificationService.js";


export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await registerUser({ email, password, name });

    // Generate JWT immediately (AUTO LOGIN)
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Get full profile
    const userProfile = await buildUserResponse(user.id);
    sendWelcomeEmail(email, name);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userProfile,
    });

  } catch (error) {
    console.log("Registration Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser({ email, password });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userProfile = await buildUserResponse(decoded.userId);

     res.json({
      message: "Login successful",
      token,
      user: userProfile,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(401).json({ message: error.message });
  }
};


