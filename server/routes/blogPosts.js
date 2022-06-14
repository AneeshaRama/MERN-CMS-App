import express from "express";
const router = express.Router();

import { uploadImage } from "../controllers/blogPosts";
import { requireLogin, adminCheck } from "../middlewares";

router.post("/upload-image", requireLogin, adminCheck, uploadImage);

export default router;
