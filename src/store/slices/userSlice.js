import { createSlice } from "@reduxjs/toolkit";
import { checkLogin } from "../thunks/checkLogin";

const initialState = {
  info: {},
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setLogout(state) {
      state.user = {};
      state.loggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.info = action.payload;
    });
    builder.addCase(checkLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const userReducer = userSlice.reducer;
