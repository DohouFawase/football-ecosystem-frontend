/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateChampionship, fetchChampionships } from "@/actions/championships/registeChampionship";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type pour les erreurs structurées du backend
interface BackendError {
  status: number | null;
  message: string;
  errors?: Record<string, string[]> | null; // erreurs par champ (ex: { email: ["déjà pris"] })
}

interface ShampionState {
  items: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  errorStatus: number | null;
  fieldErrors: Record<string, string[]> | null;
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteError: string | null;
}

const initialState: ShampionState = {
  items: [],
  status: "idle",
  createStatus: "idle",
  error: null,
  errorStatus: null,
  fieldErrors: null,
  deleteStatus: "idle",
  deleteError: null,
};

const shampionSlice = createSlice({
  name: "shampion",
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

      // Lecture des véhicules
    builder.addCase(fetchChampionships.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchChampionships.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    
    // Création d'une organisation
    builder.addCase(CreateChampionship.pending, (state) => {
      state.createStatus = "loading";
      state.error = null;
      state.errorStatus = null;
      state.fieldErrors = null;
    });

    builder.addCase(
      CreateChampionship.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload);
      }
    );

    builder.addCase(CreateChampionship.rejected, (state, action) => {
      state.createStatus = "failed";

      const payload = action.payload as BackendError | undefined;

      state.error = payload?.message ?? "Une erreur inattendue s'est produite.";
      state.errorStatus = payload?.status ?? null;
      state.fieldErrors = payload?.errors ?? null;
    });
  },
});

export const { resetCreateStatus } = shampionSlice.actions;
export default shampionSlice.reducer;