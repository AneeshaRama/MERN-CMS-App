import Category from "../models/category";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.status(201).json({ message: "Added new category", category });
  } catch (error) {
    res.status(500).json({ message: "Failed to add category" });
  }
};

export const listAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Failed to list all categories" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOneAndDelete({ slug });
    res.status(200).json({ message: "Successfully deleted", category });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;
    const category = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json({ message: "Successfully updated", category });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
};
