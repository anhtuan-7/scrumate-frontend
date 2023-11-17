import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const logout = createAsyncThunk("logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/logout`, {
      withCredentials: true,
      responseType: "json",
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export { logout };
