import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    // validation
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "Email is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const { password, ...rest } = user._doc;

      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  try {
    // check if our db has user with that email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    // check password
    const match = await comparePassword(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password, ...rest } = user._doc;
    res.json({
      token,
      user: rest,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const currentUser = async (req, res) => {
  try {
    res.json({ ok: true });
  } catch (error) {
    console.log(error.message);
  }
};
