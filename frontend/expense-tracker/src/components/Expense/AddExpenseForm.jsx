import React, { useState, useEffect } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { useSelector } from "react-redux";

const AddExpenseForm = ({ onAddExpense }) => {
  const { budgets } = useSelector((state) => state.budget);
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
    budgetId: "",
  });

  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
    
    if (key === "budgetId") {
      const budget = budgets.find(b => b._id === value);
      setSelectedBudget(budget);
    }
  };

  const validateBudget = () => {
    if (selectedBudget && expense.amount) {
      const amount = parseFloat(expense.amount);
      const remaining = parseFloat(selectedBudget.remainingAmount);
      return amount <= remaining;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateBudget()) {
      alert("Expense amount exceeds budget remaining amount!");
      return;
    }
    onAddExpense(expense);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Budget (Optional)
        </label>
        <select
          value={expense.budgetId}
          onChange={({ target }) => handleChange("budgetId", target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">No Budget</option>
          {budgets.map((budget) => (
            <option key={budget._id} value={budget._id}>
              {budget.name} (Remaining: ${budget.remainingAmount})
            </option>
          ))}
        </select>
        {selectedBudget && (
          <p className="mt-2 text-sm text-gray-600">
            Remaining in {selectedBudget.name}: ${selectedBudget.remainingAmount}
          </p>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
