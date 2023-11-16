import { createSlice } from "@reduxjs/toolkit";
import { checkLogin } from "../thunks/checkLogin";

const initialState = {
  data: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setLogout(state) {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line no-unused-vars
      .addCase(checkLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const userReducer = userSlice.reducer;
