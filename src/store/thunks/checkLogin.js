import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const checkLogin = createAsyncThunk("auth", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${BASE_URL}/verify`, {
      withCredentials: true,
    });
    return response.data.data;
  }
  catch (err) {
    return rejectWithValue(err.response.data);
  }

  
});

export { checkLogin };
