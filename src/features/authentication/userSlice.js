/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

import { checkLogin, login, logout } from './userThunks';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 503;
      });

    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 503;
      });

    builder
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 503;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { clearError } = userSlice.actions;
