import { createContext, useState, useEffect } from "react";
import categoryService from "../services/categoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    return token;
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = getToken();
      const data = await categoryService.getCategories(token);
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      if (err.message === "No authentication token found. Please log in.") {
        setError("Please log in to view categories");
      } else if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else if (err.message === "Network Error") {
        setError("Unable to connect to the server. Please check if the backend is running.");
      } else {
        setError(err.response?.data?.message || "Failed to fetch categories");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new category
  const addCategory = async (categoryData) => {
    try {
      const token = getToken();
      const newCategory = await categoryService.createCategory(categoryData, token);
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      return newCategory;
    } catch (err) {
      console.error("Error adding category:", err);
      throw new Error(err.response?.data?.message || "Failed to create category");
    }
  };

  // Update a category
  const updateCategory = async (categoryId, categoryData) => {
    try {
      const token = getToken();
      const updatedCategory = await categoryService.updateCategory(
        categoryId,
        categoryData,
        token
      );
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId ? updatedCategory : category
        )
      );
      return updatedCategory;
    } catch (err) {
      console.error("Error updating category:", err);
      throw new Error(err.response?.data?.message || "Failed to update category");
    }
  };

  // Delete a category
  const deleteCategory = async (categoryId) => {
    try {
      const token = getToken();
      await categoryService.deleteCategory(categoryId, token);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
      throw new Error(err.response?.data?.message || "Failed to delete category");
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        isLoading,
        error,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext; 