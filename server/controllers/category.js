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
    res.status(500).send(error.message);
  }
};
