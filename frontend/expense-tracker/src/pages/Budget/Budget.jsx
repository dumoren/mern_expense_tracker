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
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { formatCurrency } from "../../utils/format";
import Modal from "../../components/Modal";

const Budget = () => {
  useUserAuth();
  const dispatch = useDispatch();
  const { budgets, loading, error } = useSelector((state) => state.budget);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBudgets());
  }, [dispatch]);

  const handleBudgetSelect = (budget) => {
    setSelectedBudget(budget);
  };

  const handleAddBudget = (budgetData) => {
    dispatch(createBudget(budgetData));
    setIsFormOpen(false);
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
            onClick={() => setIsFormOpen(true)}
            className="bg-[#FFD166] text-gray-800 px-4 py-2 rounded-xl hover:bg-[#FFD166]/90 transition-colors"
          >
            Create Budget
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD166]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {budgets.map((budget) => (
                <div
                  key={budget._id}
                  onClick={() => handleBudgetSelect(budget)}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedBudget?._id === budget._id
                      ? "bg-[#FFD166]/10 border-2 border-[#FFD166]"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold">{budget.name}</h3>
                  <p className="text-gray-600">
                    Total: {formatCurrency(budget.totalAmount)}
                  </p>
                  <p className="text-gray-600">
                    Remaining: {formatCurrency(budget.remainingAmount)}
                  </p>
                </div>
              ))}
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
                <div className="text-center text-gray-500">
                  Select a budget to view details
                </div>
              )}
            </div>
          </div>
        )}

        <Modal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedBudget(null);
          }}
          title={selectedBudget ? "Edit Budget" : "Create Budget"}
        >
          <BudgetForm
            budget={selectedBudget}
            onSubmit={selectedBudget ? handleUpdateBudget : handleAddBudget}
            onClose={() => {
              setIsFormOpen(false);
              setSelectedBudget(null);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Budget; 