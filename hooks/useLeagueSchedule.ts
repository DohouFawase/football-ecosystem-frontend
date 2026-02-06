// hooks/useLeagueSchedule.ts
import { useState, useCallback } from 'react';
import { Match, SchedulingMode } from '../types/tournament.types';
import { useMatchScheduler } from './useMatchScheduler';

interface UseLeagueScheduleProps {
  schedulingMode: SchedulingMode;
  scheduleConfig: any;
  venue: string;
}

export const useLeagueSchedule = ({ schedulingMode, scheduleConfig, venue }: UseLeagueScheduleProps) => {
  const [schedule, setSchedule] = useState<Match[]>([]);
  const { getMatchScheduleInfo } = useMatchScheduler(scheduleConfig);

  const generateLeagueSchedule = useCallback((validTeams: string[]): Match[] => {
    const matches: Match[] = [];
    let matchId = 0;

    for (let i = 0; i < validTeams.length; i++) {
      for (let j = i + 1; j < validTeams.length; j++) {
        let matchInfo: Match = {
          id: matchId + 1,
          matchNumber: matchId + 1,
          round: Math.floor(matchId / (validTeams.length / 2)) + 1,
          homeTeam: validTeams[i],
          awayTeam: validTeams[j],
          venue: venue || 'À définir',
          homeScore: null,
          awayScore: null,
          played: false
        };

        if (schedulingMode === 'auto') {
          const scheduleInfo = getMatchScheduleInfo(matchId);
          matchInfo = { ...matchInfo, ...scheduleInfo };
        }
        
        matches.push(matchInfo);
        matchId++;
      }
    }

    return matches;
  }, [schedulingMode, getMatchScheduleInfo, venue]);

  const updateMatchScore = useCallback((matchId: string | number, homeScore: string, awayScore: string) => {
    setSchedule(prev => prev.map(match => {
      if (match.id === matchId) {
        return {
          ...match,
          homeScore: homeScore === '' ? null : parseInt(homeScore),
          awayScore: awayScore === '' ? null : parseInt(awayScore),
          played: homeScore !== '' && awayScore !== ''
        };
      }
      return match;
    }));
  }, []);

  return { schedule, setSchedule, generateLeagueSchedule, updateMatchScore };
};