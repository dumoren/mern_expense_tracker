import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
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
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 tracking-wide">Overview of your financial status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-blue-500"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />

            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions || []}
              onSeeMore={() => navigate("/expense")}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />

            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
