import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../constants';

const checkLogin = createAsyncThunk('check', async (_, { rejectWithValue }) => {
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

export { checkLogin };
