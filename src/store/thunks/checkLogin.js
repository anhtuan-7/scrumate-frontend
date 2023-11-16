import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const checkLogin = createAsyncThunk("auth", async () => {
  const response = await axios.get(`${BASE_URL}/verify`, {
    withCredentials: true,
  });
  return response.data.data;
});

export { checkLogin };
