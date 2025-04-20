import { Request, Response } from "express";
import Category from "../schema/categorySchema";

//create
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      success: true,
      message: ` "${newCategory.categoryName.toUpperCase()}" has been added to the Category.`,
    });
  } catch (error: any) {
    console.error("Category error", error),
      res.status(400).json({
        success: false,
        message: error.message || "Failed to create category",
      });
  }
};
//get by id
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getCategory = await Category.findById(id);
    if (!getCategory) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: getCategory,
      message: `${getCategory.categoryName} successfully fetched`,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: `Server error ${error.message}` });
  }
};
//get all
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const allCategory = await Category.find();
    if (allCategory.length === 0) {
      res.status(404).json({
        success: false,
        message: "Any category not found",
      });
      return;
    }
    res.status(200).json({ success: true, data: allCategory });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      succes: false,
      message: `Server error ${error.message}`,
    });
  }
};
//update
export const updateCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newCategory = req.body;
  try {
    if (Object.keys(newCategory).length === 0) {
      res
        .status(400)
        .json({ success: false, message: "No update data provided" });
      return;
    }

    const oldCategory = await Category.findById(id);
    if (!oldCategory) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, newCategory, {
      new: false,
    });
    if (!updatedCategory) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Category ${oldCategory.categoryName.toUpperCase()} with ID ${id} successfully updated`,
      oldData: updatedCategory,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` });
  }
};

//delete
export const deleteCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletingCategory = await Category.findOneAndDelete({ _id: id });
    if (!deletingCategory) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: `${deletingCategory.categoryName} successfully deleted`,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: `Server error ${error.message}` });
  }
};

// get 2 collection together (FOOD in Category)
export const getAllCategoriesWithFoods = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
    ]);
    if (categories.length === 0) {
      res.status(404).json({
        success: false,
        message: "No categories found or no foods available in categories.",
      });
      return;
    }
    res.status(200).json({ success: true, categories });
  } catch (error: any) {
    console.error("Error fetching categories with foods:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching categories and foods. Please try again later.",
      error: error.message || error,
    });
  }
};
