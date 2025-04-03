import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BudgetForm from "../../components/Budget/BudgetForm";
import BudgetList from "../../components/Budget/BudgetList";
import BudgetDetails from "../../components/Budget/BudgetDetails";
import { createBudget, getAllBudgets, updateBudget, deleteBudget } from "../../features/budget/budgetSlice";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Budget = () => {
  useUserAuth();
  const dispatch = useDispatch();
  const { budgets, loading, error } = useSelector((state) => state.budget);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBudgets());
  }, [dispatch]);

  const handleCreateBudget = async (budgetData) => {
    try {
      await dispatch(createBudget(budgetData)).unwrap();
      toast.success("Budget created successfully");
      setIsFormOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to create budget");
    }
  };

  const handleUpdateBudget = async (budgetId, budgetData) => {
    try {
      await dispatch(updateBudget({ budgetId, budgetData })).unwrap();
      toast.success("Budget updated successfully");
      setIsFormOpen(false);
      setSelectedBudget(null);
    } catch (error) {
      toast.error(error.message || "Failed to update budget");
    }
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      await dispatch(deleteBudget(budgetId)).unwrap();
      toast.success("Budget deleted successfully");
      setSelectedBudget(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete budget");
    }
  };

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Budgets</h1>
          <button
            onClick={() => {
              setSelectedBudget(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Budget
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BudgetList
              budgets={budgets}
              onSelectBudget={setSelectedBudget}
              onDeleteBudget={handleDeleteBudget}
              loading={loading}
            />
          </div>
          <div>
            {selectedBudget ? (
              <BudgetDetails
                budget={selectedBudget}
                onEdit={() => {
                  setIsFormOpen(true);
                }}
              />
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-center">Select a budget to view details</p>
              </div>
            )}
          </div>
        </div>

        {isFormOpen && (
          <BudgetForm
            budget={selectedBudget}
            onSubmit={selectedBudget ? handleUpdateBudget : handleCreateBudget}
            onClose={() => {
              setIsFormOpen(false);
              setSelectedBudget(null);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Budget; 