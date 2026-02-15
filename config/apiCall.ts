import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Api = axios.create({
    baseURL: 'https://api.kurascouting.mkrouma.com/v1',
    timeout: 5000, 
    headers: { 'Content-Type': 'application/json' }
});

Api.interceptors.request.use(
    (config) => {
        // Ajout du jeton d'authentification
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Dans ton fichier API.js
Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refreshToken'); // Supposons que tu stockes aussi le refreshToken

            if (refreshToken) {
                try {
                    // 2. Appeler ton API pour obtenir un nouveau token d'accès
                    const newTokensResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {
                        refreshToken: refreshToken,
                    });

                    const newAccessToken = newTokensResponse.data.accessToken;

                    // 3. Mettre à jour le cookie avec le nouveau token
                    Cookies.set('accessToken', newAccessToken, { expires: 7 });

                    // 4. Mettre à jour l'en-tête de la requête d'origine avec le nouveau token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // 5. Relancer la requête d'origine qui a échoué
                    return Api(originalRequest);
                } catch (refreshError) {
                    // Si le rafraîchissement échoue, cela signifie que le refreshToken est invalide ou expiré
                    // Il faut déconnecter l'utilisateur
                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');
                    window.location.href = '/'; // Redirection vers la page de connexion
                    return Promise.reject(refreshError);
                }
            } else {
                // S'il n'y a pas de refreshToken, déconnecter l'utilisateur
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export default Api;