import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginUserAction = createAsyncThunk(
  'auth/loginUser',
  async (loginData: { email: string; password: string }, thunkAPI) => {
    const response = await ApiClient.post(`auth/login`, loginData);
    return response.data
  },
)