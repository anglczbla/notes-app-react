import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI, getLoggedUser, logout as logoutAPI, isAuthenticated } from "../utils/index.js";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    await loginAPI(email, password);
    const userResponse = await getLoggedUser();
    return userResponse.data;
  }
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    if (!isAuthenticated()) throw new Error("Not authenticated");
    const userResponse = await getLoggedUser();
    return userResponse.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      logoutAPI();
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
