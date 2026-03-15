/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RegisterUserOrganization,
  FetchMyOrganization,
  FetchOrganizationTeams,
} from "@/actions/organization/registeOrganization";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackendError {
  status: number | null;
  message: string;
  errors?: Record<string, string[]> | null;
}

interface OrgState {
  items: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  errorStatus: number | null;
  fieldErrors: Record<string, string[]> | null;
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteError: string | null;

  // Mon organisation
  myOrg: any | null;
  myOrgStatus: "idle" | "loading" | "succeeded" | "failed";
  myOrgError: string | null;

  // Teams de l'organisation
  orgTeams: any | null;
  orgTeamsStatus: "idle" | "loading" | "succeeded" | "failed";
  orgTeamsError: string | null;
}

const initialState: OrgState = {
  items: [],
  status: "idle",
  createStatus: "idle",
  error: null,
  errorStatus: null,
  fieldErrors: null,
  deleteStatus: "idle",
  deleteError: null,

  myOrg: null,
  myOrgStatus: "idle",
  myOrgError: null,

  orgTeams: null,
  orgTeamsStatus: "idle",
  orgTeamsError: null,
};

const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    resetCreateStatus(state) {
      state.createStatus = "idle";
      state.error = null;
      state.errorStatus = null;
      state.fieldErrors = null;
    },
    resetOrgTeams(state) {
      state.orgTeams = null;
      state.orgTeamsStatus = "idle";
      state.orgTeamsError = null;
    },
  },
  extraReducers: (builder) => {
    // ─── Création d'une organisation ───────────────────────────────
    builder.addCase(RegisterUserOrganization.pending, (state) => {
      state.createStatus = "loading";
      state.error = null;
      state.errorStatus = null;
      state.fieldErrors = null;
    });
    builder.addCase(
      RegisterUserOrganization.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload);
        state.myOrg = action.payload; // on met à jour myOrg directement
      }
    );
    builder.addCase(RegisterUserOrganization.rejected, (state, action) => {
      state.createStatus = "failed";
      const payload = action.payload as BackendError | undefined;
      state.error = payload?.message ?? "Une erreur inattendue s'est produite.";
      state.errorStatus = payload?.status ?? null;
      state.fieldErrors = payload?.errors ?? null;
    });

    // ─── Mon organisation ──────────────────────────────────────────
    builder.addCase(FetchMyOrganization.pending, (state) => {
      state.myOrgStatus = "loading";
      state.myOrgError = null;
    });
    builder.addCase(
      FetchMyOrganization.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.myOrgStatus = "succeeded";
        state.myOrg = action.payload;
      }
    );
    builder.addCase(FetchMyOrganization.rejected, (state, action) => {
      state.myOrgStatus = "failed";
      const payload = action.payload as BackendError | undefined;
      state.myOrgError =
        payload?.message ?? "Une erreur inattendue s'est produite.";
    });

    // ─── Teams de l'organisation ───────────────────────────────────
    builder.addCase(FetchOrganizationTeams.pending, (state) => {
      state.orgTeamsStatus = "loading";
      state.orgTeamsError = null;
    });
    builder.addCase(
      FetchOrganizationTeams.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.orgTeamsStatus = "succeeded";
        state.orgTeams = action.payload;
      }
    );
    builder.addCase(FetchOrganizationTeams.rejected, (state, action) => {
      state.orgTeamsStatus = "failed";
      const payload = action.payload as BackendError | undefined;
      state.orgTeamsError =
        payload?.message ?? "Une erreur inattendue s'est produite.";
    });
  },
});

export const { resetCreateStatus, resetOrgTeams } = orgSlice.actions;
export default orgSlice.reducer;