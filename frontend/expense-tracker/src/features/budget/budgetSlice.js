import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createBudget = createAsyncThunk(
  "budget/createBudget",
  async (budgetData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/budget/add", budgetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create budget");
    }
  }
);

export const getAllBudgets = createAsyncThunk(
  "budget/getAllBudgets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/budget/get");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch budgets");
    }
  }
);

export const getBudgetDetails = createAsyncThunk(
  "budget/getBudgetDetails",
  async (budgetId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/budget/${budgetId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch budget details");
    }
  }
);

export const updateBudget = createAsyncThunk(
  "budget/updateBudget",
  async ({ budgetId, budgetData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/budget/${budgetId}`,
        budgetData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update budget");
    }
  }
);

export const deleteBudget = createAsyncThunk(
  "budget/deleteBudget",
  async (budgetId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/v1/budget/${budgetId}`);
      return budgetId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete budget");
    }
  }
);

const initialState = {
  budgets: [],
  selectedBudget: null,
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Budget
      .addCase(createBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets.push(action.payload);
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Budgets
      .addCase(getAllBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload;
      })
      .addCase(getAllBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Budget Details
      .addCase(getBudgetDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBudgetDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBudget = action.payload;
      })
      .addCase(getBudgetDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Budget
      .addCase(updateBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.budgets.findIndex(
          (budget) => budget._id === action.payload._id
        );
        if (index !== -1) {
          state.budgets[index] = action.payload;
        }
        if (state.selectedBudget?._id === action.payload._id) {
          state.selectedBudget = action.payload;
        }
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Budget
      .addCase(deleteBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.filter(
          (budget) => budget._id !== action.payload
        );
        if (state.selectedBudget?._id === action.payload) {
          state.selectedBudget = null;
        }
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = budgetSlice.actions;
export default budgetSlice.reducer; 