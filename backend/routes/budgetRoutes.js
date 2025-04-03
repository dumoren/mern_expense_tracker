import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBudget,
  getAllBudgets,
  getBudgetDetails,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

// All routes are prefixed with /api/v1/budget
router.use(protect);

router.post("/add", createBudget);
router.get("/get", getAllBudgets);
router.get("/:budgetId", getBudgetDetails);
router.put("/:budgetId", updateBudget);
router.delete("/:budgetId", deleteBudget);

export default router; 