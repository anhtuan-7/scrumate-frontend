import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const logout = createAsyncThunk("auth", async () => {
  const response = await axios.post(`${BASE_URL}/logout`, {
    withCredentials: true,
  });
  return response.data.data;
});

export { logout };
