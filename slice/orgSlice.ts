/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterUserOrganization } from "@/actions/organization/registeOrganization";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type pour les erreurs structurées du backend
interface BackendError {
  status: number | null;
  message: string;
  errors?: Record<string, string[]> | null; // erreurs par champ (ex: { email: ["déjà pris"] })
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
};

const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    // Reset les erreurs manuellement (utile à la fermeture d'un modal par ex.)
    resetCreateStatus(state) {
      state.createStatus = "idle";
      state.error = null;
      state.errorStatus = null;
      state.fieldErrors = null;
    },
  },
  extraReducers: (builder) => {
    // Création d'une organisation
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
      }
    );

    builder.addCase(RegisterUserOrganization.rejected, (state, action) => {
      state.createStatus = "failed";

      const payload = action.payload as BackendError | undefined;

      state.error = payload?.message ?? "Une erreur inattendue s'est produite.";
      state.errorStatus = payload?.status ?? null;
      state.fieldErrors = payload?.errors ?? null;
    });
  },
});

export const { resetCreateStatus } = orgSlice.actions;
export default orgSlice.reducer;