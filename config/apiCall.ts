import axios from "axios";

export const ApiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000, // Augmenté à 5s pour plus de stabilité
});

// Intercepteur de requête : Le "cerveau" qui choisit l'authentification
ApiClient.interceptors.request.use(
  function (config) {
    // 1. On récupère les clés (depuis le localStorage ou une variable d'état)
    const token = localStorage.getItem('user_token');
    const apiKey = localStorage.getItem('app_api_key');

    // 2. Logique de priorité : Priorité au Token, sinon l'API Key
    if (token) {
      // Format standard : "Bearer <token>"
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authentification par Token appliquée");
    } 
    else if (apiKey) {
      // On utilise un header personnalisé pour l'API Key
      config.headers['X-API-Key'] = apiKey;
      console.log("Authentification par API Key appliquée");
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse (pour gérer les erreurs d'auth)
ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Erreur 401 : Authentification invalide ou expirée.");
      // Optionnel : Rediriger vers la page de login ou vider le storage
    }
    return Promise.reject(error);
  }
);