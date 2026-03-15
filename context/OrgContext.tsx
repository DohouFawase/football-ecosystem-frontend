"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const OrgContext = createContext<any>(undefined);

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Enlève les caractères spéciaux
    .replace(/[\s_-]+/g, '-') // Remplace les espaces et underscores par des tirets
    .replace(/^-+|-+$/g, ''); // Enlève les tirets au début et à la fin
};
export const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. CHARGEMENT au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('user_orgs');
    if (saved) {
      try {
        setOrganizations(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur de lecture localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. SAUVEGARDE automatique dès que la liste change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('user_orgs', JSON.stringify(organizations));
    }
  }, [organizations, isInitialized]);

  const addOrganization = (data: any) => {
    const slug = generateSlug(data.name);
    const newOrg = {
      ...data,
      id: `org_${Date.now()}`, // ID unique basé sur le temps
      logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200",
      status: "ACTIVE",
      owner: { email: data.email, kycStatus: "PENDING" },
      _count: { leagues: 0 },
      documents: [{ type: "Statuts", url: "#" }]
    };
    
    // On met à jour l'état (le 2ème useEffect s'occupera du localStorage)
    setOrganizations((prev) => [newOrg, ...prev]);
  };

  return (
    <OrgContext.Provider value={{ 
      organizations, 
      addOrganization, 
      currentOrg: organizations[0] || null,
      isInitialized 
    }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrgs = () => {
  const context = useContext(OrgContext);
  if (!context) throw new Error("useOrgs doit être utilisé dans un OrgProvider");
  return context;
};