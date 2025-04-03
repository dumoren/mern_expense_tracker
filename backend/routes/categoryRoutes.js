const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router.use(protect);

// Get all categories and create new category
router.route("/")
  .get(getCategories)
  .post(createCategory);

// Update and delete category
router.route("/:id")
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router; 