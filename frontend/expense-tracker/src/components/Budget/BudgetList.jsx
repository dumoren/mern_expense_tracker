import React from "react";
import { formatCurrency } from "../../utils/format";

const BudgetList = ({ budgets, onSelectBudget, onDeleteBudget, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!budgets || budgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center">No budgets created yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="divide-y">
        {budgets.map((budget) => (
          <div
            key={budget._id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectBudget(budget)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{budget.name}</h3>
                {budget.description && (
                  <p className="text-sm text-gray-500 mt-1">{budget.description}</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  {formatCurrency(budget.totalAmount)}
                </p>
                <p className="text-sm text-gray-500">
                  Remaining: {formatCurrency(budget.remainingAmount)}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(budget.remainingAmount / budget.totalAmount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetList; 