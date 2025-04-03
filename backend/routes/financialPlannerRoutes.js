import express from "express";
import { analyzeFinancialData } from "../controllers/financialPlannerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze", protect, analyzeFinancialData);

export default router; 