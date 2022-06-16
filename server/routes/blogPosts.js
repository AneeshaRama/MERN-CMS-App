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
  postsByAuthor,
} from "../controllers/blogPosts";
import {
  requireLogin,
  adminCheck,
  canUpdateAndDeletePost,
  adminAndAuthor,
  authorCheck,
} from "../middlewares";

router.post("/upload-image", requireLogin, adminAndAuthor, uploadImage);
router.post(
  "/upload-image-file",
  formidable(),
  requireLogin,
  adminAndAuthor,
  uploadImageFile
);
router.post("/post/new", requireLogin, adminAndAuthor, createPost);
router.get("/posts", listAllPosts);
router.get("/media", requireLogin, adminCheck, allMedia);
router.get("/post/:slug", getPostDetails);
router.delete("/post/:id", requireLogin, canUpdateAndDeletePost, deletePost);
router.put("/edit-post/:id", requireLogin, canUpdateAndDeletePost, editPost);
router.get("/posts-by-author", postsByAuthor);

export default router;
