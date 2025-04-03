import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";

const BudgetRuleCard = () => {
  const [loading, setLoading] = useState(true);
  const [budgetRule, setBudgetRule] = useState({
    needs: { amount: 0, percentage: 50 },
    wants: { amount: 0, percentage: 30 },
    savings: { amount: 0, percentage: 20 }
  });
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      // Fetch income data
      const incomeResponse = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      const incomes = incomeResponse.data;

      // Calculate total income
      const total = incomes.reduce((sum, income) => sum + income.amount, 0);
      setTotalIncome(total);

      // Calculate budget rule amounts
      setBudgetRule({
        needs: {
          amount: total * 0.5,
          percentage: 50
        },
        wants: {
          amount: total * 0.3,
          percentage: 30
        },
        savings: {
          amount: total * 0.2,
          percentage: 20
        }
      });
    } catch (error) {
      console.error("Error fetching financial data:", error);
      toast.error("Failed to load budget rule calculations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">50/30/20 Budget Rule</h2>
        <button
          onClick={fetchFinancialData}
          disabled={loading}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          {loading ? "Calculating..." : "Refresh"}
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-blue-600 font-bold">{budgetRule.needs.percentage}%</span>
            </div>
            <div>
              <h3 className="font-medium">Needs</h3>
              <p className="text-gray-600 text-sm">
                {formatCurrency(budgetRule.needs.amount)} for essential expenses
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <span className="text-green-600 font-bold">{budgetRule.wants.percentage}%</span>
            </div>
            <div>
              <h3 className="font-medium">Wants</h3>
              <p className="text-gray-600 text-sm">
                {formatCurrency(budgetRule.wants.amount)} for non-essential expenses
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <span className="text-purple-600 font-bold">{budgetRule.savings.percentage}%</span>
            </div>
            <div>
              <h3 className="font-medium">Savings</h3>
              <p className="text-gray-600 text-sm">
                {formatCurrency(budgetRule.savings.amount)} for savings and investments
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Based on your total income: {formatCurrency(totalIncome)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetRuleCard; 