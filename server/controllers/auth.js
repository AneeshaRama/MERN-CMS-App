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

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      role,
    }).save();
    user.password = undefined;
    return res
      .status(200)
      .json({ message: "Successfully created new user", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to list all users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user.remove();
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Successfully updated user info", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "This email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await hashPassword(password);

    let user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        name,
        email,
        password: hashedPassword,
      },
      { new: true }
    );
    console.log(user);
    res.json({
      message: "Successfully updated your profile. Please login to continue",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const becomeAuthor = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.auth._id,
      { role: "author" },
      { new: true }
    );
    res.status(200).json({ message: "Success! Please login to start writing" });
  } catch (error) {
    res.status(500).json({ message: "Failed to become author" });
  }
};
