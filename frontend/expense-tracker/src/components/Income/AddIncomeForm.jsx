import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome, onClose }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="bg-white/95 rounded-2xl w-full p-6">
      {/* Form Content */}
      <div className="space-y-5">
        {/* Emoji Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Pick Icon
          </label>
          <div className="inline-block">
            <EmojiPickerPopup
              icon={income.icon}
              onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <Input
            value={income.source}
            onChange={({ target }) => handleChange("source", target.value)}
            label="Income Source"
            placeholder="Freelance, Salary, etc"
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
          />

          <Input
            value={income.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            placeholder="Enter amount"
            type="number"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
          />

          <Input
            value={income.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date"
            type="date"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
          />
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
          onClick={() => {
            onAddIncome(income);
            onClose();
          }}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
