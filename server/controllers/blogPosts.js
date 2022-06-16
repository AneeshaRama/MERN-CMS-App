const cloudinary = require("cloudinary").v2;
import Posts from "../models/blogPostModel";
import slugify from "slugify";
import Category from "../models/category";
import Media from "../models/mediaModel";
import Users from "../models/user";

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
    const { title, content, categories, featuredImage } = req.body;

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
        featuredImage,
      }).save();
      //save  users post in post arrray
      await Users.findByIdAndUpdate(req.auth._id, {
        $addToSet: { posts: post._id },
      });
      res.status(201).json({ message: "Successfully created new post", post });
    }, 2000);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const listAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find()
      .populate("featuredImage")
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to list all posts" });
  }
};

export const uploadImageFile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.file.path, {
      folder: "BLOGGER",
    });
    const media = await new Media({
      url: result.secure_url,
      public_id: result.public_id,
      postedBy: req.auth._id,
    }).save();
    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload" });
  }
};

export const allMedia = async (req, res) => {
  try {
    const media = await Media.find()
      .populate("postedBy", "_id")
      .sort({ createdAt: -1 });
    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch media" });
  }
};

export const getPostDetails = async (req, res) => {
  try {
    const post = await Posts.findOne({ slug: req.params.slug })
      .populate("featuredImage")
      .populate("postedBy", "name")
      .populate("categories", "name slug");
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post details" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    console.log(post);
    await post.remove();
    res.status(200).json({ message: "Successfully deleted", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, featuredImage, categories } = req.body;
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
    setTimeout(async () => {
      const post = await Posts.findByIdAndUpdate(
        id,
        {
          title,
          slug: slugify(title),
          content,
          featuredImage,
          categories: categoryIds,
        },
        { new: true }
      )
        .populate("featuredImage", "url")
        .populate("postedBy", "name")
        .populate("categories", "name slug");
      res.status(200).json({ message: "Successfully updated the Post", post });
    }, 2000);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const postsByAuthor = async (req, res) => {
  try {
    console.log(req.auth._id);
    const posts = await Posts.findOne({ postedBy: req.auth._id })
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .populate("featuredImage", "url")
      .sort({ createdAt: -1 });

    console.log(posts);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
