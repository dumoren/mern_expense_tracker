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

    // Log the data being sent
    console.log("Submitting budget data:", submitData);

    // Call the onSubmit handler with the correct data
    if (budget?._id) {
      onSubmit(budget._id, submitData);
    } else {
      onSubmit(submitData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {budget ? "Edit Budget" : "Create Budget"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Budget Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total Amount
            </label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {budget ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm; 