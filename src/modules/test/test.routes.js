import express from "express";
import { triggerTestEmail } from "./test.controller.js";

const router = express.Router();

router.post("/send-email", triggerTestEmail);

export default router;
