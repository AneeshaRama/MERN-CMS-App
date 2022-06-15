import express from "express";
const router = express.Router();
import formidable from "express-formidable";

import {
  uploadImage,
  createPost,
  listAllPosts,
  uploadImageFile,
  allMedia,
} from "../controllers/blogPosts";
import { requireLogin, adminCheck } from "../middlewares";

router.post("/upload-image", requireLogin, adminCheck, uploadImage);
router.post(
  "/upload-image-file",
  formidable(),
  requireLogin,
  adminCheck,
  uploadImageFile
);
router.post("/post/new", requireLogin, adminCheck, createPost);
router.get("/posts", listAllPosts);
router.get("/media", requireLogin, adminCheck, allMedia);

export default router;
