import express from "express";
import { triggerTestEmail } from "../controllers/testController.js";

const router = express.Router();

router.post("/send-email", triggerTestEmail);

export default router;
