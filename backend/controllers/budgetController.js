import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

// Create a new budget
export const createBudget = async (req, res) => {
  try {
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const { name, totalAmount, description } = req.body;
    const userId = req.user._id;

    if (!name || !totalAmount) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: { name, totalAmount }
      });
    }

    console.log("Creating budget with data:", {
      name,
      totalAmount,
      description,
      userId
    });

    const budget = await Budget.create({
      name,
      totalAmount,
      description,
      userId
    });

    console.log("Budget created successfully:", budget);
    res.status(201).json(budget);
  } catch (error) {
    console.error("Error creating budget:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get all budgets for a user
export const getAllBudgets = async (req, res) => {
  try {
    const userId = req.user._id;
    const budgets = await Budget.find({ userId }).sort({ createdAt: -1 });

    // Get expenses for each budget
    const budgetsWithExpenses = await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await Expense.find({ 
          budgetId: budget._id, 
          userId 
        }).sort({ date: -1 });
        
        return {
          ...budget.toObject(),
          expenses
        };
      })
    );

    res.status(200).json(budgetsWithExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single budget with its expenses
export const getBudgetDetails = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const userId = req.user._id;

    const budget = await Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const expenses = await Expense.find({ budgetId, userId }).sort({ date: -1 });

    res.status(200).json({
      budget,
      expenses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a budget
export const updateBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const { name, totalAmount, description } = req.body;
    const userId = req.user._id;

    const budget = await Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Calculate the difference in total amount
    const amountDiff = totalAmount - budget.totalAmount;
    
    // Update the budget
    budget.name = name || budget.name;
    budget.totalAmount = totalAmount || budget.totalAmount;
    budget.description = description || budget.description;
    budget.remainingAmount += amountDiff;

    await budget.save();

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a budget
export const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const userId = req.user._id;

    const budget = await Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    await budget.deleteOne();

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 