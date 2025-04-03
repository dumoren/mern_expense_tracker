const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date, budgetId } = req.body;

    // Validation: Check for required fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All required fields are missing" });
    }

    // If budgetId is provided, validate it exists
    if (budgetId) {
      const Budget = require("../models/Budget");
      const budget = await Budget.findById(budgetId);
      if (!budget) {
        return res.status(400).json({ message: "Invalid budget selected" });
      }
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
      budgetId: budgetId || undefined
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    if (error.message.includes('exceeds budget remaining amount')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Expenses (For Logged-in User)
exports.getAllExpenses = async (req, res) => {
  const userId = req.user.id;
  const { budgetId } = req.query;

  try {
    // Build query object
    const query = { userId };
    
    // Add budgetId to query if provided
    if (budgetId) {
      query.budgetId = budgetId;
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Expense Details in Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));
    
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, 'expense_details.xlsx');
    res.download('expense_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
