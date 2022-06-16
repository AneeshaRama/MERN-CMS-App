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
  postCount,
  loadPosts,
  createComment,
  adminComments,
  commentCount,
  removeComment,
  updateComment,
  userComments,
} from "../controllers/blogPosts";
import {
  requireLogin,
  adminCheck,
  canUpdateAndDeletePost,
  adminAndAuthor,
  canUpdateAndDeleteComment,
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
router.get("/post-count", postCount);
router.get("/load-posts/:page", loadPosts);

//comments
router.post("/comment/:id", requireLogin, createComment);
router.get("/comments/:page", requireLogin, adminCheck, adminComments);
router.get("/user-comments", requireLogin, userComments);
router.get("/comments-count", commentCount);
router.delete(
  "/comment/:id",
  requireLogin,
  canUpdateAndDeleteComment,
  removeComment
);
router.put(
  "/comment/:id",
  requireLogin,
  canUpdateAndDeleteComment,
  updateComment
);

export default router;
