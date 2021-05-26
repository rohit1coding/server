import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

const addCategory = asyncHandler(async (req, res) => {
  const { categoryName, subCategoryName } = req.body;
  const subCat = {
    subCategoryName,
  };
  let subCategories = [];
  subCategories.push(subCat);
  const newCategory = new Category({
    categoryName: categoryName,
    subCategories: subCategories,
  });
  const createdCategory = await newCategory.save();
  res.status(201).json(createdCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryName, subCategoryName } = req.body;
  const category = await Category.findById(req.params.id);
  const subCat = {
    subCategoryName,
  };
  if (category) {
    category.categoryName = categoryName;
    category.subCategories.push(subCat);
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found!');
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: 'Category removed from the server!' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
