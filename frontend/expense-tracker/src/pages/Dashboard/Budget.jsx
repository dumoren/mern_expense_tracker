import React, { useState, useContext } from "react";
import CategoryContext from "../../context/CategoryContext";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Budget = () => {
  const { categories, isLoading, error, addCategory, deleteCategory } = useContext(CategoryContext);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory(newCategory);
      setNewCategory({ name: "" });
      setIsAddingCategory(false);
      toast.success("Category added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async (categoryId, isDefault) => {
    if (isDefault) {
      toast.error("Cannot delete default categories");
      return;
    }
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Budget Categories</h2>
          <p className="text-gray-600">Manage your expense categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{category.name}</span>
                </div>
                {!category.isDefault && (
                  <button
                    onClick={() => handleDeleteCategory(category._id, category.isDefault)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            {isAddingCategory ? (
              <form onSubmit={handleAddCategory} className="space-y-3">
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-500"
              >
                <LuPlus className="text-xl" />
                <span>Add Category</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budget; 