import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../constants';

const login = createAsyncThunk('login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
        responseType: 'json',
      },
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export { login };
