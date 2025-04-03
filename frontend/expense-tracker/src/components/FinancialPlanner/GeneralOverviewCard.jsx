import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const GeneralOverviewCard = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const dispatch = useDispatch();

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      // Fetch income data
      const incomeResponse = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      const incomes = incomeResponse.data;

      // Fetch expense data
      const expenseResponse = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      const expenses = expenseResponse.data;

      // Calculate total income
      const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

      // Calculate total expenses
      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

      // Calculate savings rate
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;

      // Group expenses by category
      const expensesByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {});

      // Prepare data for AI analysis
      const financialData = {
        totalIncome,
        totalExpenses,
        savingsRate,
        expensesByCategory,
        monthlyIncome: incomes.filter(income => {
          const date = new Date(income.date);
          const now = new Date();
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).reduce((sum, income) => sum + income.amount, 0),
        monthlyExpenses: expenses.filter(expense => {
          const date = new Date(expense.date);
          const now = new Date();
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).reduce((sum, expense) => sum + expense.amount, 0)
      };

      // Get AI insights
      const response = await axiosInstance.post("/api/v1/financial-planner/analyze", financialData);
      setInsights(response.data.insights);
    } catch (error) {
      console.error("Error fetching financial data:", error);
      toast.error("Failed to get financial insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">General Overview</h3>
        <button
          onClick={fetchFinancialData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Get Insights"}
        </button>
      </div>
      
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : insights ? (
        <div className="flex-1 overflow-y-auto">
          <h4 className="font-semibold mb-2">AI Insights:</h4>
          <div className="prose max-w-none">
            {insights.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-2">{paragraph}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-center">
            Click "Get Insights" to analyze your financial data and receive personalized recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default GeneralOverviewCard; 