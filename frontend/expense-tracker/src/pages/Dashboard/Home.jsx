import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import { LuWallet, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="min-h-screen bg-white text-gray-800">
        {/* Header Section */}
        <div className="relative w-full bg-[#FFD166] bg-opacity-20 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              D.E.M Finance
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Personal Finance Tracker
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Stats Cards */}
            <div className="space-y-6">
              {/* Total Balance Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:border-[#FFD166] transition-all duration-300">
                <h3 className="text-gray-600 text-sm font-medium mb-2">Total Balance</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-gray-800">
                    ${addThousandsSeparator(dashboardData?.totalIncome - dashboardData?.totalExpenses || 0)}
                  </p>
                  <div className="w-10 h-10 rounded-full bg-[#FFD166] bg-opacity-20 flex items-center justify-center">
                    <LuWallet className="text-gray-800 text-xl" />
                  </div>
                </div>
              </div>

              {/* Total Income Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:border-[#FFD166] transition-all duration-300">
                <h3 className="text-gray-600 text-sm font-medium mb-2">Total Income</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-gray-800">
                    ${addThousandsSeparator(dashboardData?.totalIncome || 0)}
                  </p>
                  <div className="w-10 h-10 rounded-full bg-[#FFD166] bg-opacity-20 flex items-center justify-center">
                    <LuTrendingUp className="text-gray-800 text-xl" />
                  </div>
                </div>
              </div>

              {/* Total Expenses Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:border-[#FFD166] transition-all duration-300">
                <h3 className="text-gray-600 text-sm font-medium mb-2">Total Expenses</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-gray-800">
                    ${addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                  </p>
                  <div className="w-10 h-10 rounded-full bg-[#FFD166] bg-opacity-20 flex items-center justify-center">
                    <LuTrendingDown className="text-gray-800 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area - Spans 3 Columns */}
            <div className="lg:col-span-3 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Financial Overview</h2>
                    <FinanceOverview
                      totalBalance={dashboardData?.totalBalance || 0}
                      totalIncome={dashboardData?.totalIncome || 0}
                      totalExpense={dashboardData?.totalExpenses || 0}
                    />
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Transactions</h2>
                    <RecentTransactions
                      transactions={dashboardData?.recentTransactions}
                      onSeeMore={() => navigate("/expense")}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Expense Breakdown</h2>
                    <Last30DaysExpenses
                      data={dashboardData?.last30DaysExpenses?.transactions || []}
                    />
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Income</h2>
                    <RecentIncome
                      transactions={dashboardData?.last60DaysIncome?.transactions || []}
                      onSeeMore={() => navigate("/income")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
