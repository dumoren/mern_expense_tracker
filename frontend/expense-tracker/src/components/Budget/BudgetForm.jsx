import React, { useState, useEffect } from "react";

const BudgetForm = ({ budget, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    totalAmount: "",
    description: "",
  });

  useEffect(() => {
    if (budget) {
      setFormData({
        name: budget.name,
        totalAmount: budget.totalAmount,
        description: budget.description || "",
      });
    }
  }, [budget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.totalAmount) {
      console.error("Name and total amount are required");
      return;
    }

    // Convert totalAmount to a number and create the submission data
    const submitData = {
      name: formData.name.trim(),
      totalAmount: parseFloat(formData.totalAmount),
      description: formData.description.trim(),
    };

    // Call the onSubmit handler with the correct data
    if (budget?._id) {
      onSubmit(budget._id, submitData);
    } else {
      onSubmit(submitData);
    }
  };

  return (
    <div className="bg-white/95 rounded-2xl w-full p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Budget Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
              required
              placeholder="Monthly Budget, Project Budget, etc"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Total Amount
            </label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors"
              required
              min="0"
              step="0.01"
              placeholder="Enter budget amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#FFD166] focus:ring-2 focus:ring-[#FFD166] focus:ring-opacity-20 transition-colors resize-none"
              rows="3"
              placeholder="Add a description for your budget"
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
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#FFD166] text-gray-800 hover:bg-[#FFD166]/90 transition-colors"
          >
            {budget ? "Update Budget" : "Create Budget"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm; 