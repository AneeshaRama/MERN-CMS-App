var { expressjwt: jwt } = require("express-jwt");
const { default: user } = require("../models/user");
require("dotenv").config();

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

module.exports = { requireLogin, adminCheck };
