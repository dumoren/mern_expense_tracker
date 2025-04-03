import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { useSelector } from "react-redux";

const AddExpenseForm = ({ onAddExpense, onClose }) => {
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
    onClose();
  };

  return (
    <div className="bg-white/95 rounded-2xl w-full">
      {/* Form Content */}
      <div className="space-y-5">
        {/* Emoji Picker */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Pick Icon
          </label>
          <div className="inline-block">
            <EmojiPickerPopup
              icon={expense.icon}
              onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <Input
            value={expense.category}
            onChange={({ target }) => handleChange("category", target.value)}
            label="Category"
            placeholder="Rent, Groceries, etc"
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
          />

          <Input
            value={expense.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            placeholder="Enter amount"
            type="number"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
          />

          <Input
            value={expense.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date"
            type="date"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
          />

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Budget (Optional)
            </label>
            <select
              value={expense.budgetId}
              onChange={({ target }) => handleChange("budgetId", target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
            >
              <option value="">No Budget</option>
              {budgets.map((budget) => (
                <option key={budget._id} value={budget._id}>
                  {budget.name} (Remaining: ${budget.remainingAmount})
                </option>
              ))}
            </select>
            {selectedBudget && (
              <p className="mt-2 text-sm text-gray-500">
                Remaining in {selectedBudget.name}: ${selectedBudget.remainingAmount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-6 py-2.5 rounded-xl bg-[#FFD166] text-gray-800 hover:bg-[#FFD166]/90 transition-colors"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
