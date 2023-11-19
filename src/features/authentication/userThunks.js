import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

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

const signUp = createAsyncThunk('login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
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

const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/logout`, {
      withCredentials: true,
      responseType: 'json',
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export { checkLogin, login, signUp, logout };
