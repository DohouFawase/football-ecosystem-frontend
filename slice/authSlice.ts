"use client";

import { LoginUserAction } from "@/actions/auth/loginAction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.status = "idle";
      state.error = null;
      
      // ✅ Remplacement des Cookies par LocalStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
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
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.error = null;

        // ✅ Sauvegarde dans LocalStorage après un login réussi
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.access_token);
          localStorage.setItem("refreshToken", action.payload.refresh_token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(LoginUserAction.rejected, (state, action) => {
        state.status = "failed";
        const payload = action.payload as { message?: string } | undefined;
        state.error = payload?.message || action.error.message || "Une erreur est survenue";
      });
  },
});

export const { logout, updateToken } = authSlice.actions;
export default authSlice.reducer;