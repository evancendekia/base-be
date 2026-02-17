import express from "express";
import {
  getTopics,
} from "./topic.controller.js";

const router = express.Router();

router.get("/getAll", getTopics);


export default router;
