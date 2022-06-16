const cloudinary = require("cloudinary").v2;
import Posts from "../models/blogPostModel";
import slugify from "slugify";
import Category from "../models/category";
import Media from "../models/mediaModel";
import Users from "../models/user";
import Comments from "../models/comments";

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
    const comments = await Comments.find({ postId: post._id })
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ post, comments });
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

export const postCount = async (req, res) => {
  try {
    const count = await Posts.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post count" });
  }
};

export const loadPosts = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page || 1;
    const posts = await Posts.find()
      .skip((page - 1) * perPage)
      .populate("featuredImage")
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to list all posts" });
  }
};

//comments
export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    let comment = await new Comments({
      content,
      postedBy: req.auth._id,
      postId: req.params.id,
    }).save();
    comment = await comment.populate("postedBy", "name");
    res.status(200).json({ message: "Successfully added comment", comment });
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment" });
  }
};

export const adminComments = async (req, res) => {
  try {
    const perPage = 10;
    const page = req.params.page || 1;
    const allComments = await Comments.find()
      .skip((page - 1) * perPage)
      .populate("postedBy", "name")
      .populate("postId", "title slug")
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.status(200).json({ allComments });
  } catch (error) {
    res.status(500).json({ message: "failed to fetch all comments" });
  }
};
export const commentCount = async (req, res) => {
  try {
    const count = await Comments.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "failed to fetch count" });
  }
};
export const removeComment = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    comment.remove();
    res.status(200).json({ message: "Successfully deleted comment", comment });
  } catch (error) {
    res.status(500).json({ message: "failed to remove comment" });
  }
};
export const updateComment = async (req, res) => {
  try {
    const comment = await Comments.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "successfully updated comment", comment });
  } catch (error) {
    res.status(500).json({ message: "failed to update comment" });
  }
};
export const userComments = async (req, res) => {
  try {
    const allComments = await Comments.find({ postedBy: req.auth._id })
      .populate("postedBy", "name")
      .populate("postId", "title slug")
      .sort({ createdAt: -1 });
    res.status(200).json({ allComments });
  } catch (error) {
    res.status(500).json({ message: "failed to update comment" });
  }
};

export const userPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ postedBy: req.auth._id });
    console.log(posts);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

export const getNumbers = async (req, res) => {
  try {
    const posts = await Posts.countDocuments();
    const users = await Users.countDocuments();
    const categories = await Category.countDocuments();
    const comments = await Comments.countDocuments();
    res.status(200).json({ posts, users, categories, comments });
  } catch (error) {
    res.status(500).json({ message: "Failed to get numbers" });
  }
};
