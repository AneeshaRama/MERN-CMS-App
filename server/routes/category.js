import express from "express";

const router = express.Router();
import { requireLogin, adminCheck } from "../middlewares";

// controllers
import {
  createCategory,
  listAllCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/category";

router.post("/category", requireLogin, adminCheck, createCategory);
router.get("/categories", listAllCategories);
router.delete("/category/:slug", requireLogin, adminCheck, deleteCategory);
router.put("/category/:slug", requireLogin, adminCheck, updateCategory);

export default router;
