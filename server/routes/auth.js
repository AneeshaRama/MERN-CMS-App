import express from "express";

const router = express.Router();

// controllers
const {
  signup,
  signin,
  currentUser,
  createUser,
} = require("../controllers/auth");
const { requireLogin, adminCheck } = require("../middlewares");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/current-user", requireLogin, adminCheck, currentUser);

//create new user by admin
router.post("/create-user", requireLogin, adminCheck, createUser);

export default router;
