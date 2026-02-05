"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optionnel : pour les icônes

interface Team {
  id: number;
  name: string;
  competitionId: string;
  stadium: string;
}

interface Competition {
  id: string;
  name: string;
}

const TournamentAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(null); 
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Liste des ligues / coupes
  const competitions: Competition[] = [
    { id: 'ligue-pro', name: 'Ligue Pro Bénin' },
    { id: 'ligue-na', name: 'Ligue Nationale (NA)' },
    { id: 'coupe-benin', name: 'Coupe du Bénin' },
  ];

  const fetchTeams = async (compId: string) => {
    setLoading(true);
    // Simulation API
    setTimeout(() => {
      const db: Team[] = [
        { id: 1, name: "Coton FC", competitionId: "ligue-pro", stadium: "Ouidah" },
        { id: 2, name: "Loto-Popo", competitionId: "ligue-pro", stadium: "Grand-Popo" },
        { id: 3, name: "Requins FC", competitionId: "ligue-na", stadium: "Cotonou" },
        { id: 4, name: "AS Cotonou", competitionId: "coupe-benin", stadium: "Cotonou" },
        { id: 5, name: "Buffles du Borgou", competitionId: "ligue-pro", stadium: "Parakou" },
      ];
      const filtered = db.filter(t => t.competitionId === compId);
      setTeams(filtered);
      setLoading(false);
    }, 400);
  };

  const toggleAccordion = (id: string) => {
    if (openId === id) {
      setOpenId(null); // Ferme si on reclique sur le même
    } else {
      setOpenId(id);
      fetchTeams(id); // Récupère les données à l'ouverture
    }
  };

  return (
    <div className=" p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Compétitions</h2>

      {competitions.map((comp) => (
        <div key={comp.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          {/* Entête de l'accordéon */}
          <button
            onClick={() => toggleAccordion(comp.id)}
            className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-lg text-indigo-900">{comp.name}</span>
            {openId === comp.id ? <ChevronUp /> : <ChevronDown />}
          </button>

          {/* Contenu (visible uniquement si ouvert) */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openId === comp.id ? "max-h-[1000px] border-t" : "max-h-0"
            }`}
          >
            <div className="p-5 bg-gray-50">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500 italic">
                  <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  Chargement des équipes...
                </div>
              ) : (
                <ul className="space-y-3">
                  {teams.length > 0 ? (
                    teams.map((team) => (
                      <li key={team.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <span className="font-medium text-gray-700">{team.name}</span>
                        <span className="text-xs text-gray-400">📍 {team.stadium}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">Aucun participant enregistré.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentAccordion;