// Clés pour le stockage
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'user'

// ✅ Sauvegarder les tokens
export const saveTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

// ✅ Récupérer l'access token
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// ✅ Récupérer le refresh token
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

// ✅ Sauvegarder l'utilisateur
export const saveUser = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// ✅ Récupérer l'utilisateur
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

// ✅ Supprimer tous les tokens (déconnexion)
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// ✅ Vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  return !!getAccessToken()
}