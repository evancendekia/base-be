import express from "express";
import {
  getArticles,
  getArticlesGrouped,
  getBySlug,
} from "./article.controller.js";

const router = express.Router();

router.get("/", getArticles);
router.post("/grouped", getArticlesGrouped);
router.get("/:slug", getBySlug);


export default router;
