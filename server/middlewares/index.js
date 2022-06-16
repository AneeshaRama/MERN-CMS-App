var { expressjwt: jwt } = require("express-jwt");
const { default: user } = require("../models/user");
require("dotenv").config();
const { default: post } = require("../models/blogPostModel");

const requireLogin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const adminCheck = async (req, res, next) => {
  const IsAdmin = await user.findById(req.auth._id);
  if (IsAdmin.role !== "admin") {
    res.status(401).json({ message: "Admin resource. Access denied." });
  }
  next();
};
const authorCheck = async (req, res, next) => {
  const isAuthor = await user.findById(req.auth._id);
  if (isAuthor.role !== "author") {
    res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const adminAndAuthor = async (req, res, next) => {
  try {
    const userDetail = await user.findById(req.auth._id);
    switch (userDetail.role) {
      case "admin":
        next();
        break;
      case "author":
        next();
        break;
      default:
        res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const canUpdateAndDeletePost = async (req, res, next) => {
  try {
    const userDetail = await user.findById(req.auth._id);
    const blogPost = await post.findById(req.params.id);
    console.log(blogPost);
    switch (userDetail.role) {
      case "admin":
        next();
        break;
      case "author":
        if (blogPost.postedBy.toString() !== userDetail._id.toString()) {
          res.status(401).json({ message: "Unauthorized" });
        } else {
          next();
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  requireLogin,
  adminCheck,
  authorCheck,
  canUpdateAndDeletePost,
  adminAndAuthor,
};
