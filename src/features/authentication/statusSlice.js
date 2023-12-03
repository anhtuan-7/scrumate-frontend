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
    if (err.response) return rejectWithValue(err.response.data);
    return rejectWithValue({
      message: err.message,
    });
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
    doLogin: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
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
export const { doLogin, doLogout, setUser } = statusSlice.actions;
export default statusSlice.reducer;
