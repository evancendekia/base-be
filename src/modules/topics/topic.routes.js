import express from "express";
import {
  getTopics,
  getTopicsDetails
} from "./topic.controller.js";

const router = express.Router();

router.get("/getAll", getTopics);
router.get("/:slug", getTopicsDetails);


export default router;
