const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBudget,
  getAllBudgets,
  getBudgetDetails,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

// All routes are prefixed with /api/v1/budget
router.use(protect);

router.post("/add", createBudget);
router.get("/get", getAllBudgets);
router.get("/:budgetId", getBudgetDetails);
router.put("/:budgetId", updateBudget);
router.delete("/:budgetId", deleteBudget);

module.exports = router; 