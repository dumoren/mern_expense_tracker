import xlsx from 'xlsx';
import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

// Add Expense
export const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date, budgetId } = req.body;

    // Validation: Check for required fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All required fields are missing" });
    }

    // If budgetId is provided, validate it exists
    if (budgetId) {
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
export const getAllExpenses = async (req, res) => {
  const userId = req.user.id;
  const { budgetId } = req.query;

  try {
    const query = { userId };
    if (budgetId) {
      query.budgetId = budgetId;
    }
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Expense Excel
export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    
    // Convert expense data to worksheet
    const worksheet = xlsx.utils.json_to_sheet(expenses.map(item => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0],
      Icon: item.icon || '',
      Budget: item.budgetId ? 'Yes' : 'No'
    })));

    // Create workbook and add worksheet
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Expenses');

    // Generate Excel file
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=expenses.xlsx');

    // Send the Excel file
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
