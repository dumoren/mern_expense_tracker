import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Budget = () => {
  useUserAuth();

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Budget Management</h1>
          <p className="mt-1 text-sm text-gray-500 tracking-wide">Manage and track your budgets</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budget; 