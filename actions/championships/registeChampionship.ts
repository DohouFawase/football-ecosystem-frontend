import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ChampionshipPayload {
  name: string;
  description?: string;
  format?: string;
  tier: string;
  category?: string;
  sportId: string;
  regionId: string;
  startDate: string;
  endDate: string;
  maxTeams?: number;
  minTeams?: number;
  registrationFee?: number;
  totalPrizePool?: number;
  firstPlacePrize?: number;
  secondPlacePrize?: number;
  thirdPlacePrize?: number;
  prizeDistribution?: Record<string, any>;
  individualPrizes?: Record<string, any>;
  rules?: Record<string, any>;
  knockoutFormat?: string;
  hasThirdPlaceMatch?: boolean;
  isPublic?: boolean;
}

export interface UpdateChampionshipPayload extends ChampionshipPayload {
  id: string;
}

// ─── Create Championship ───────────────────────────────────────────────────────
export const CreateChampionship = createAsyncThunk<
  any,
  ChampionshipPayload,
  { rejectValue: string }
>(
  "championship/createChampionship",
  async (create, { rejectWithValue }) => {
    try {
      const payload: ChampionshipPayload = {
        ...create,
        startDate: new Date(create.startDate).toISOString(),
        endDate: new Date(create.endDate).toISOString(),
      };

      console.group("📤 CreateChampionship — payload envoyé");
      console.log(JSON.stringify(payload, null, 2));
      console.groupEnd();

      const response = await ApiClient.post("league", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.group("❌ API Error - CreateChampionship");
      console.error("Status Code:", axiosError.response?.status);
      console.error("Data:", axiosError.response?.data);
      console.groupEnd();
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        "Échec de la création de la compétition.";
      return rejectWithValue(errorMessage);
    }
  }
);

// ─── Fetch Championships ───────────────────────────────────────────────────────
export const fetchChampionships = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>(
  "championship/fetchChampionships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get("/league");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.group("❌ API Error - fetchChampionships");
      console.error("Status Code:", axiosError.response?.status);
      console.error("Data:", axiosError.response?.data);
      console.groupEnd();
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        "Échec de la récupération des compétitions.";
      return rejectWithValue(errorMessage);
    }
  }
);

// ─── Update Championship ───────────────────────────────────────────────────────
export const UpdateChampionship = createAsyncThunk<
  any,
  UpdateChampionshipPayload,
  { rejectValue: string }
>(
  "championship/updateChampionship",
  async ({ id, ...update }, { rejectWithValue }) => {
    try {
      const payload: ChampionshipPayload = {
        ...update,
        startDate: new Date(update.startDate).toISOString(),
        endDate: new Date(update.endDate).toISOString(),
      };

      console.group("📤 UpdateChampionship — payload envoyé");
      console.log("ID:", id);
      console.log(JSON.stringify(payload, null, 2));
      console.groupEnd();

      const response = await ApiClient.patch(`/league/${id}`, payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.group("❌ API Error - UpdateChampionship");
      console.error("Status Code:", axiosError.response?.status);
      console.error("Data:", axiosError.response?.data);
      console.groupEnd();
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        "Échec de la mise à jour de la compétition.";
      return rejectWithValue(errorMessage);
    }
  }
);

// ─── Delete Championship ───────────────────────────────────────────────────────
export const DeleteChampionship = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "championship/deleteChampionship",
  async (id, { rejectWithValue }) => {
    try {
      console.group("🗑️ DeleteChampionship — ID envoyé");
      console.log("ID:", id);
      console.groupEnd();

      await ApiClient.delete(`/league/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.group("❌ API Error - DeleteChampionship");
      console.error("Status Code:", axiosError.response?.status);
      console.error("Data:", axiosError.response?.data);
      console.groupEnd();
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        "Échec de la suppression de la compétition.";
      return rejectWithValue(errorMessage);
    }
  }
);