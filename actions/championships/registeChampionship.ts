import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const RegisterUserChampionship = createAsyncThunk(
  'auth/registerChampionship',
  async (registerchamp, thunkAPI) => {
    const response = await ApiClient.post(`auth/signup/form`, registerchamp);
    return response.data
  },
)