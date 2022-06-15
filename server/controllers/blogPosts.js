const cloudinary = require("cloudinary").v2;
import Posts from "../models/blogPostModel";
import slugify from "slugify";
import Category from "../models/category";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      folder: "BLOGGER",
    });
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, categories } = req.body;

    const alreadyExists = await Posts.findOne({
      slug: slugify(title).toLowerCase(),
    });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Post with this title already exists" });
    }

    //get the category based on name
    let categoryIds = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({
        name: categories[i],
      }).exec((err, category) => {
        if (err) {
          console.log(err);
        }
        categoryIds.push(category._id);
      });
    }
    //save posts
    setTimeout(async () => {
      const post = await new Posts({
        title,
        slug: slugify(title),
        content,
        categories: categoryIds,
        postedBy: req.auth._id,
      }).save();
      res.status(201).json({ message: "Successfully created new post", post });
    }, 2000);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const listAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find()
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to list all posts" });
  }
};
