import express from "express";
import {
  getArticles,
  getArticlesGrouped,
  getBySlug,
} from "./article.controller.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/grouped", getArticlesGrouped);
router.get("/:slug", getBySlug);

export default router;
