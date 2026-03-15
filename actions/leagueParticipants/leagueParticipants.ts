import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Registration {
  id: string;
  teamId: string;
  leagueId: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  appliedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  paymentAmount?: number;
  paymentDate?: string;
  paymentMethod?: string;
  paymentProof?: string;
  rejectionReason?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  transactionRef?: string;
  updatedAt: string;
  ownerId: string;
  teamName: string;
}

interface ApiError {
  message?: string;
}

// ─── Fetch registrations (avec filtre leagueId + status optionnel) ────────────
// Endpoint : GET /league-registered?leagueId=xxx&status=yyy
export const fetchRegistrations = createAsyncThunk<
  Registration[],
  { leagueId?: string; status?: string },
  { rejectValue: string }
>(
  "registration/fetchByLeague",
  async ({ leagueId, status }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (leagueId) params.append("leagueId", leagueId);
      if (status) params.append("status", status);

      const response = await ApiClient.get<Registration[]>(
        `/league-registered?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Échec de la récupération des participations."
      );
    }
  }
);

// ─── Approuver une participation ───────────────────────────────────────────────
// Endpoint : PATCH /league-registered/:id/approve
export const approveRegistration = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "registration/approve",
  async (id, { rejectWithValue }) => {
    try {
      await ApiClient.patch(`/league-registered/${id}/approve`);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Échec de l'approbation."
      );
    }
  }
);

// ─── Rejeter une participation ─────────────────────────────────────────────────
// Endpoint : PATCH /league-registered/:id/reject  + body { reason }
export const rejectRegistration = createAsyncThunk<
  string,
  { id: string; reason: string },
  { rejectValue: string }
>(
  "registration/reject",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      await ApiClient.patch(`/league-registered/${id}/reject`, { reason });
      return id;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Échec du rejet."
      );
    }
  }
);

// ─── Supprimer une participation ───────────────────────────────────────────────
// Endpoint : DELETE /league-registered/:id
export const deleteRegistration = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "registration/delete",
  async (id, { rejectWithValue }) => {
    try {
      await ApiClient.delete(`/league-registered/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Échec de la suppression."
      );
    }
  }
);