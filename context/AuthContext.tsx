"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id?: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void; // On accepte maintenant des données
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Fonction de connexion/inscription
  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    // Optionnel: Sauvegarder dans le localStorage pour rester connecté au rafraîchissement
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user_session');
  };

  // Récupérer la session au chargement de la page
  useEffect(() => {
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};