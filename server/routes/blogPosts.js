import express from "express";
const router = express.Router();
import formidable from "express-formidable";

import {
  uploadImage,
  createPost,
  listAllPosts,
  uploadImageFile,
  allMedia,
  getPostDetails,
  deletePost,
  editPost,
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
router.get("/post/:slug", getPostDetails);
router.delete("/post/:slug", requireLogin, adminCheck, deletePost);
router.put("/edit-post/:id", requireLogin, adminCheck, editPost);

export default router;
