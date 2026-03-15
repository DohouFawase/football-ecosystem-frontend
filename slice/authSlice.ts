// slice/authSlice.ts
import { LoginUserAction } from "@/actions/auth/loginAction";
import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string; // ✅ AJOUTÉ
  createdAt: string;
}

interface AuthState {
  user: User | null;
  apiKey: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  apiKey: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.apiKey = null;
      state.status = "idle";
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("app_api_key");
        localStorage.removeItem("user");
        document.cookie = "app_api_key=; path=/; max-age=0";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUserAction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(LoginUserAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { user, credentials } = action.payload.data;
        // ✅ user contient déjà role depuis l'API
        state.user = user;
        state.apiKey = credentials.apiKey;
        if (typeof window !== "undefined") {
          localStorage.setItem("app_api_key", credentials.apiKey);
          localStorage.setItem("user", JSON.stringify(user));
          document.cookie = `app_api_key=${credentials.apiKey}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
      })
      .addCase(LoginUserAction.rejected, (state, action) => {
        state.status = "failed";
        const payload = action.payload as { message?: string } | undefined;
        state.error =
          payload?.message || action.error.message || "Une erreur est survenue";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;