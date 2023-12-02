import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

const verify = createAsyncThunk('check', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/verify`, {
      withCredentials: true,
      responseType: 'json',
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    user: null,
    isLoading: true,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    doLogout: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    doLogin: (state) => {
      state.isLoggedIn = true;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(verify.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export { verify };
export const { doLogin, doLogout } = statusSlice.actions;
export default statusSlice.reducer;
