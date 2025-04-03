const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const { name, totalAmount, description } = req.body;
    const userId = req.user._id;

    const budget = await Budget.create({
      name,
      totalAmount,
      remainingAmount: totalAmount,
      description,
      userId
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all budgets for a user
exports.getAllBudgets = async (req, res) => {
  try {
    const userId = req.user._id;
    const budgets = await Budget.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single budget with its expenses
exports.getBudgetDetails = async (req, res) => {
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
exports.updateBudget = async (req, res) => {
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
    
    // Update remaining amount proportionally
    const newRemainingAmount = budget.remainingAmount + amountDiff;
    if (newRemainingAmount < 0) {
      return res.status(400).json({ message: "Cannot reduce budget below spent amount" });
    }

    budget.name = name;
    budget.totalAmount = totalAmount;
    budget.remainingAmount = newRemainingAmount;
    budget.description = description;

    await budget.save();

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const userId = req.user._id;

    // Check if there are any expenses associated with this budget
    const hasExpenses = await Expense.exists({ budgetId });
    if (hasExpenses) {
      return res.status(400).json({ 
        message: "Cannot delete budget with associated expenses. Please remove or reassign expenses first." 
      });
    }

    const budget = await Budget.findOneAndDelete({ _id: budgetId, userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 