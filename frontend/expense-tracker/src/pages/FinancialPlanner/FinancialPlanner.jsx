import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import GeneralOverviewCard from "../../components/FinancialPlanner/GeneralOverviewCard";
import BudgetRuleCard from "../../components/FinancialPlanner/BudgetRuleCard";

const FinancialPlanner = () => {
  return (
    <DashboardLayout activeMenu="Financial Planner">
      <div className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Financial Planner</h1>
          <p className="text-gray-500 mt-2">Get AI-powered insights for your finances</p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <GeneralOverviewCard />
          <BudgetRuleCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialPlanner; 