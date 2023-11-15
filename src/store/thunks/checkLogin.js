import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../constants";

const checkLogin = createAsyncThunk("check", async () => {
  const response = await axios.get(`${url}/verify`, {
    withCredentials: true,
  });
  return response.data;
});

export { checkLogin };
