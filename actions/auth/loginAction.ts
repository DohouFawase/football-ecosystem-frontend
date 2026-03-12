import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginUserAction = createAsyncThunk(
  "auth/loginUser",
  async (loginData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await ApiClient.post("auth/login", loginData);
      return response.data; // { success, message, data: { user, credentials: { apiKey } } }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        return thunkAPI.rejectWithValue({
          status,
          message: data?.message || "Erreur de connexion",
        });
      }
      if (error.request) {
        return thunkAPI.rejectWithValue({
          status: null,
          message: "Impossible de joindre le serveur. Vérifiez votre connexion.",
        });
      }
      return thunkAPI.rejectWithValue({
        status: null,
        message: error.message || "Une erreur inattendue s'est produite.",
      });
    }
  }
);