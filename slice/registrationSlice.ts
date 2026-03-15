/* eslint-disable @typescript-eslint/no-explicit-any */
import { approveRegistration, fetchRegistrations, Registration, rejectRegistration } from "@/actions/leagueParticipants/leagueParticipants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface pour les erreurs structurées
interface BackendError {
  status: number | null;
  message: string;
  errors?: Record<string, string[]> | null;
}

interface RegistrationState {
  items: Registration[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  // États spécifiques pour les actions unitaires
  actionStatus: "idle" | "loading" | "succeeded" | "failed";
  actionError: string | null;
}

const initialState: RegistrationState = {
  items: [],
  status: "idle",
  error: null,
  actionStatus: "idle",
  actionError: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    // Utile pour vider les erreurs après avoir fermé une notification ou un modal
    resetActionStatus(state) {
      state.actionStatus = "idle";
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    // ─── FETCH REGISTRATIONS ───────────────────────────────────────
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action: PayloadAction<Registration[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // ─── APPROVE REGISTRATION ──────────────────────────────────────
    builder
      .addCase(approveRegistration.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(approveRegistration.fulfilled, (state, action: PayloadAction<string>) => {
        state.actionStatus = "succeeded";
        // On met à jour localement le statut de la participation
        const index = state.items.findIndex(item => item.id === action.payload);
        if (index !== -1) {
          state.items[index].status = "approved";
        }
      })
      .addCase(approveRegistration.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.actionError = action.payload as string;
      });

    // ─── REJECT REGISTRATION ───────────────────────────────────────
    builder
      .addCase(rejectRegistration.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(rejectRegistration.fulfilled, (state, action: PayloadAction<string>) => {
        state.actionStatus = "succeeded";
        const index = state.items.findIndex(item => item.id === action.payload);
        if (index !== -1) {
          state.items[index].status = "rejected";
        }
      })
      .addCase(rejectRegistration.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.actionError = action.payload as string;
      });
  },
});

export const { resetActionStatus } = registrationSlice.actions;
export default registrationSlice.reducer;