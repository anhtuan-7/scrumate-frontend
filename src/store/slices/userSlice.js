/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

import { checkLogin } from '../thunks/checkLogin';
import { login } from '../thunks/login';
import { logout } from '../thunks/logout';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
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
