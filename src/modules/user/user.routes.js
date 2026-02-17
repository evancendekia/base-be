// routes/user.routes.js
import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getMe, updatePreferences } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.post("/updatePreferences", authenticate, updatePreferences);

export default router;
