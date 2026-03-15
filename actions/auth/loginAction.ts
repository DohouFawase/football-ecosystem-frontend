// actions/auth/loginAction.ts
import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Map rôle → route dashboard
export const ROLE_REDIRECT_MAP: Record<string, string> = {
  SUPER_ADMIN: '/dashboard',
  ADMIN: '/dashboard',
  ORGANIZATION_OWNER: '/dashboard',
  MANAGER: '/dashboard',
  COACH: '/dashboard',
  PLAYER: '/dashboard',
  BETTOR: '/dashboard',
  MATCH_OPERATOR: '/dashboard',
  AGENT: '/dashboard',
  SCOUT: '/dashboard',
  ANALYST: '/dashboard',
  SUPPORT_AGENT: '/dashboard',
};

export const getRedirectByRole = (role: string): string => {
  return ROLE_REDIRECT_MAP[role] ?? '/dashboard';
};

export const LoginUserAction = createAsyncThunk(
  "auth/loginUser",
  async (loginData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await ApiClient.post("auth/login", loginData);
      return response.data;
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