
import prisma from "../../config/prisma.js";
import { 
    buildUserResponse, 
    updatePreferencesUser 
} from "../user/user.service.js";



export const getMe = async (req, res) => {
  try {

    const userProfile = await buildUserResponse(req.user.userId);

    if (!userProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(userProfile);

  } catch (error) {
    console.log("GetMe Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch user profile",
    });
  }
};


export const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.userId;
    const selectedTopics = req.body.topics;

    // validate input
    if (!Array.isArray(selectedTopics)) {
      return res.status(400).json({
        message: "Body must be an array of topic slugs",
      });
    }

    if (selectedTopics.length === 0) {
      return res.status(400).json({
        message: "At least one topic must be selected",
      });
    }

    const updatedUser = await updatePreferencesUser(userId, selectedTopics);

    return res.json({
        status: "success",
        message: "Preferences updated successfully",
        user: updatedUser,
    });

  } catch (err) {
    console.error("updatePreferences error:", err);

    return res.status(500).json({
      message: err.message || "Failed to update preferences",
    });
  }
};