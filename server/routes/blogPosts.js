import express from "express";
const router = express.Router();

import {
  uploadImage,
  createPost,
  listAllPosts,
} from "../controllers/blogPosts";
import { requireLogin, adminCheck } from "../middlewares";

router.post("/upload-image", requireLogin, adminCheck, uploadImage);
router.post("/post/new", requireLogin, adminCheck, createPost);
router.get("/posts", listAllPosts);

export default router;
