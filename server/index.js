require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import postRoutes from "./routes/blogPosts";

const morgan = require("morgan");

const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", postRoutes);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Please login to continue." });
  } else {
    next(err);
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));
