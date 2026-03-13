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

// ─── Create Championship ───────────────────────────────────────────────────────

export const CreateChampionship = createAsyncThunk<
  any,
  ChampionshipPayload,
  { rejectValue: string }
>(
  "championship/createChampionship",
  async (create, { rejectWithValue }) => {
    try {
      // Transforme les dates en ISO 8601 complet avant envoi
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