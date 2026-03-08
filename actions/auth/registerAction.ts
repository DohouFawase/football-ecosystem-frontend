import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const RegisterUserAction = createAsyncThunk(
  'auth/registerUser',
  async (registerData: { email: string; password: string }, thunkAPI) => {
    const response = await ApiClient.post(`auth/signup/form`, registerData);
    return response.data
  },
)