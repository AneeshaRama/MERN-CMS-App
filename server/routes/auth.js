import express from "express";

const router = express.Router();

// controllers
const {
  signup,
  signin,
  currentUser,
  createUser,
  listAllUsers,
  deleteUser,
  updateUserByAdmin,
  getUser,
} = require("../controllers/auth");
const { requireLogin, adminCheck, authorCheck } = require("../middlewares");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/current-admin", requireLogin, adminCheck, currentUser);
router.get("/current-author", requireLogin, authorCheck, currentUser);
router.get("/current-user", requireLogin, currentUser);
router.get("/users", requireLogin, adminCheck, listAllUsers);
router.delete("/user/:id", requireLogin, adminCheck, deleteUser);
router.get("/user/:id", requireLogin, getUser);

//create new user by admin
router.post("/create-user", requireLogin, adminCheck, createUser);
router.put(
  "/update-user-by-admin/:id",
  requireLogin,
  adminCheck,
  updateUserByAdmin
);

export default router;
