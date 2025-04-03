import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import GeneralOverviewCard from "../../components/FinancialPlanner/GeneralOverviewCard";
import BudgetRuleCard from "../../components/FinancialPlanner/BudgetRuleCard";

const FinancialPlanner = () => {
  return (
    <DashboardLayout activeMenu="Financial Planner">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Financial Planner</h1>
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