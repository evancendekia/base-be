import express from "express";
import {
  getAllContents,
  getContentById
} from "../controllers/externalController.js";

import { verifyBearerToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Apply bearer auth to all external APIs
 */
router.use(verifyBearerToken);

router.get("/contents", getAllContents);
router.get("/contents/:id", getContentById);

export default router;
