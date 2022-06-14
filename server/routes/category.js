import express from "express";

const router = express.Router();
import { requireLogin, adminCheck } from "../middlewares";

// controllers
import { createCategory } from "../controllers/category";

router.post("/category", requireLogin, adminCheck, createCategory);

export default router;
