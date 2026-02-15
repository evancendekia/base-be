import { registerUser, loginUser } from "./auth.service.js";
import prisma from "../../config/prisma.js";

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await registerUser({ email, password, name });

    res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser({ email, password });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPremiumActive =
        user.subscription &&
        user.subscription.status === "ACTIVE" &&
        new Date(user.subscription.endDate) > new Date();

    const response = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      subscription: null,
      isPremiumActive: isPremiumActive
    };

    if (user.subscription) {
        response.subscription = {
            planType: user.subscription.planType,
            status: user.subscription.status,
            startDate: user.subscription.startDate,
            endDate: user.subscription.endDate,

        };
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};