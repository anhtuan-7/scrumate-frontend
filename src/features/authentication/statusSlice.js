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
    isLoading: false,
    error: null,
    isLoggedIn: JSON.parse(sessionStorage.getItem('user')) != null,
  },
  reducers: {
    doLogout: (state) => {
      state.isLoggedIn = false;
    },
    doLogin: (state) => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export { verify };
export const { doLogin, doLogout } = statusSlice.actions;
export default statusSlice.reducer;
