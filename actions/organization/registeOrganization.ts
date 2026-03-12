import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const RegisterUserOrganization = createAsyncThunk(
  'org/registerOrganization',
  async (registerOrga, thunkAPI) => {
    try {
      const response = await ApiClient.post(`organizations`, registerOrga);
      return response.data;
    } catch (error) {
      // Erreur avec réponse du backend (4xx, 5xx)
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            return thunkAPI.rejectWithValue({
              status,
              message: data?.message || "Données invalides. Vérifiez les champs.",
              errors: data?.errors || null,
            });

          case 401:
            return thunkAPI.rejectWithValue({
              status,
              message: data?.message || "Non autorisé. Veuillez vous reconnecter.",
            });

          case 403:
            return thunkAPI.rejectWithValue({
              status,
              message: data?.message || "Accès refusé.",
            });

          case 409:
            return thunkAPI.rejectWithValue({
              status,
              message: data?.message || "Cette organisation existe déjà.",
            });

          case 422:
            return thunkAPI.rejectWithValue({
              status,
              message: data?.message || "Données non traitables.",
              errors: data?.errors || null,
            });

          case 500:
            return thunkAPI.rejectWithValue({
              status,
              message: "Erreur serveur. Veuillez réessayer plus tard.",
            });

          default:
            return thunkAPI.rejectWithValue({
              status,
              message: data?.message || `Erreur inattendue (${status}).`,
            });
        }
      }

      // Pas de réponse (timeout, réseau coupé)
      if (error && typeof error === 'object' && 'request' in error) {
        return thunkAPI.rejectWithValue({
          status: null,
          message: "Impossible de joindre le serveur. Vérifiez votre connexion.",
        });
      }

      // Erreur JS / config axios
      return thunkAPI.rejectWithValue({
        status: null,
        message: (error instanceof Error ? error.message : "Une erreur inattendue s'est produite.") || "Une erreur inattendue s'est produite.",
      });
    }
  }
);