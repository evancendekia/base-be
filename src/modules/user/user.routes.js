// routes/user.routes.js
import express from "express";
import { authenticate } from "../../middleware/authMiddleware.js";
import { getMe, updatePreferences } from "./user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.post("/updatePreferences", authenticate, updatePreferences);

export default router;
