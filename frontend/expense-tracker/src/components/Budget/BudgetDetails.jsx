import React from "react";
import { formatCurrency } from "../../utils/format";

const BudgetDetails = ({ budget, onEdit }) => {
  const spentAmount = budget.totalAmount - budget.remainingAmount;
  const spentPercentage = (spentAmount / budget.totalAmount) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{budget.name}</h2>
          {budget.description && (
            <p className="text-gray-500 mt-1">{budget.description}</p>
          )}
        </div>
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Edit
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Budget</span>
            <span className="font-semibold">{formatCurrency(budget.totalAmount)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Spent</span>
            <span className="font-semibold">{formatCurrency(spentAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Remaining</span>
            <span className="font-semibold">{formatCurrency(budget.remainingAmount)}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">{spentPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
        </div>

        {budget.expenses && budget.expenses.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Recent Expenses</h3>
            <div className="space-y-3">
              {budget.expenses.slice(0, 5).map((expense) => (
                <div
                  key={expense._id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{expense.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetDetails; 