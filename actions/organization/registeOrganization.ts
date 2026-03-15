import { ApiClient } from "@/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper pour éviter la répétition de la gestion d'erreurs
const handleApiError = (error: unknown, thunkAPI: any) => {
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
      case 404:
        return thunkAPI.rejectWithValue({
          status,
          message: data?.message || "Ressource introuvable.",
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

  if (error && typeof error === "object" && "request" in error) {
    return thunkAPI.rejectWithValue({
      status: null,
      message: "Impossible de joindre le serveur. Vérifiez votre connexion.",
    });
  }

  return thunkAPI.rejectWithValue({
    status: null,
    message:
      error instanceof Error
        ? error.message
        : "Une erreur inattendue s'est produite.",
  });
};

/**
 * Créer une organisation
 */
export const RegisterUserOrganization = createAsyncThunk(
  "org/registerOrganization",
  async (registerOrga: any, thunkAPI) => {
    try {
      const response = await ApiClient.post(`organizations`, registerOrga);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

/**
 * Récupérer l'organisation de l'utilisateur connecté
 */
export const FetchMyOrganization = createAsyncThunk(
  "org/fetchMyOrganization",
  async (_, thunkAPI) => {
    try {
      const response = await ApiClient.get(`organizations/my`);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

/**
 * Récupérer toutes les teams d'une organisation groupées par league
 */
export const FetchOrganizationTeams = createAsyncThunk(
  "org/fetchOrganizationTeams",
  async (organizationId: string, thunkAPI) => {
    try {
      const response = await ApiClient.get(`organizations/${organizationId}/teams`);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);