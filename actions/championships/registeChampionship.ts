import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const CreateChampionship = createAsyncThunk(
  'auth/createChampionship',
  async (create, thunkAPI) => {
    const response = await ApiClient.post(`auth/signup/form`, create);
    return response.data
  },
)

export const fetchChampionships = createAsyncThunk<
  void,
                  
  { rejectValue: string }
>(
  "championship/fetchChampionships", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await  ApiClient.get("/league");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      console.group("❌ API Error - fetchChampionships");
      console.error("Status Code:", axiosError.response?.status);
      console.error("Data:", axiosError.response?.data);
      console.groupEnd();

      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        "Échec de la récupération des véhicules.";

      return rejectWithValue(errorMessage);
    }
  }
);