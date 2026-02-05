import { useState, useCallback } from 'react';
import { Group, GroupMatch, CanPhase } from '../types/tournament.types';
import { useMatchScheduler } from './useMatchScheduler';

interface UseCanTournamentProps {
  schedulingMode: 'auto' | 'manual';
  scheduleConfig: any;
  venue: string;
  numberOfGroups: number;
}

export const useCanTournament = ({ schedulingMode, scheduleConfig, venue, numberOfGroups }: UseCanTournamentProps) => {
  const [canGroups, setCanGroups] = useState<Group[]>([]);
  const [canPhase, setCanPhase] = useState<CanPhase>('groups');
  const { getMatchScheduleInfo } = useMatchScheduler(scheduleConfig);

  const generateCanGroups = useCallback((validTeams: string[]): Group[] => {
    const shuffled = [...validTeams].sort(() => Math.random() - 0.5);
    const groups: Group[] = [];
    const teamsPerGroup = Math.ceil(shuffled.length / numberOfGroups);
    
    for (let i = 0; i < numberOfGroups; i++) {
      const groupTeams = shuffled.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup);
      if (groupTeams.length > 0) {
        const groupName = String.fromCharCode(65 + i);
        const groupMatches: GroupMatch[] = [];
        let matchId = 0;
        
        for (let j = 0; j < groupTeams.length; j++) {
          for (let k = j + 1; k < groupTeams.length; k++) {
            let matchInfo: GroupMatch = {
              id: `G${groupName}-M${matchId + 1}`,
              matchNumber: matchId + 1,
              group: groupName,
              homeTeam: groupTeams[j],
              awayTeam: groupTeams[k],
              venue: venue || 'À définir',
              homeScore: null,
              awayScore: null,
              played: false
            };

            if (schedulingMode === 'auto') {
              const totalMatches = groups.reduce((sum, g) => sum + g.matches.length, 0);
              const scheduleInfo = getMatchScheduleInfo(totalMatches + matchId);
              matchInfo = { ...matchInfo, ...scheduleInfo };
            }
            
            groupMatches.push(matchInfo);
            matchId++;
          }
        }
        
        groups.push({
          name: groupName,
          teams: groupTeams,
          matches: groupMatches
        });
      }
    }
    
    return groups;
  }, [numberOfGroups, schedulingMode, getMatchScheduleInfo, venue]);

  const updateCanGroupScore = useCallback((groupName: string, matchId: string, homeScore: string, awayScore: string) => {
    setCanGroups(prev => prev.map(group => {
      if (group.name === groupName) {
        const updatedMatches = group.matches.map(match => {
          if (match.id === matchId) {
            return {
              ...match,
              homeScore: homeScore === '' ? null : parseInt(homeScore),
              awayScore: awayScore === '' ? null : parseInt(awayScore),
              played: homeScore !== '' && awayScore !== ''
            };
          }
          return match;
        });
        return { ...group, matches: updatedMatches };
      }
      return group;
    }));
  }, []);

  return { canGroups, setCanGroups, canPhase, setCanPhase, generateCanGroups, updateCanGroupScore };
};