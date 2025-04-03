const Category = require("../models/categoryModel");

// Get all categories for a user
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    // Check if category already exists for this user
    const existingCategory = await Category.findOne({
      user: req.user._id,
      name: name,
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      icon,
      user: req.user._id,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Don't allow updating default categories
    if (category.isDefault) {
      return res.status(400).json({ message: "Cannot modify default categories" });
    }

    category.name = name || category.name;
    category.icon = icon || category.icon;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Don't allow deleting default categories
    if (category.isDefault) {
      return res.status(400).json({ message: "Cannot delete default categories" });
    }

    await category.remove();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create default categories for a new user
const createDefaultCategories = async (userId) => {
  const defaultCategories = [
    { name: "Food & Dining", icon: "🍽️" },
    { name: "Transportation", icon: "🚗" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Bills & Utilities", icon: "📱" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Education", icon: "📚" },
    { name: "Other", icon: "📌" },
  ];

  try {
    const categories = defaultCategories.map((category) => ({
      ...category,
      user: userId,
      isDefault: true,
    }));

    await Category.insertMany(categories);
  } catch (error) {
    console.error("Error creating default categories:", error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createDefaultCategories,
}; 