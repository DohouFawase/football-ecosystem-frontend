// hooks/useTournamentGenerator.ts
import { useCallback } from 'react';
import { TournamentMode } from '../types/tournament.types';

interface UseTournamentGeneratorProps {
  teams: string[];
  tournamentName: string;
  schedulingMode: 'auto' | 'manual';
  startDate: string;
  mode: TournamentMode;
  generateLeagueSchedule: (teams: string[]) => void;
  generateKnockoutBracket: (teams: string[]) => void;
  generateCanGroups: (teams: string[]) => void;
  setGenerated: (value: boolean) => void;
}

export const useTournamentGenerator = ({
  teams,
  tournamentName,
  schedulingMode,
  startDate,
  mode,
  generateLeagueSchedule,
  generateKnockoutBracket,
  generateCanGroups,
  setGenerated
}: UseTournamentGeneratorProps) => {
  
  const generateSchedule = useCallback(() => {
    const validTeams = teams.filter(t => t.trim() !== '');
    
    if (validTeams.length < 2) {
      alert('Veuillez ajouter au moins 2 équipes');
      return;
    }

    if (!tournamentName.trim()) {
      alert('Veuillez donner un nom au tournoi');
      return;
    }

    if (schedulingMode === 'auto' && !startDate) {
      alert('Veuillez définir une date de début pour la programmation automatique');
      return;
    }

    if (mode === 'league') {
      generateLeagueSchedule(validTeams);
    } else if (mode === 'knockout') {
      const shuffled = [...validTeams].sort(() => Math.random() - 0.5);
      generateKnockoutBracket(shuffled);
    } else if (mode === 'can') {
      generateCanGroups(validTeams);
    }

    setGenerated(true);
  }, [teams, tournamentName, schedulingMode, startDate, mode, generateLeagueSchedule, generateKnockoutBracket, generateCanGroups, setGenerated]);

  return { generateSchedule };
};