// hooks/useKnockoutBracket.ts
import { useState, useCallback } from 'react';
import { KnockoutMatch, SchedulingMode } from '../types/tournament.types';
import { useMatchScheduler } from './useMatchScheduler';

interface UseKnockoutBracketProps {
  schedulingMode: SchedulingMode;
  scheduleConfig: any;
  venue: string;
}

export const useKnockoutBracket = ({ schedulingMode, scheduleConfig, venue }: UseKnockoutBracketProps) => {
  const [knockoutBracket, setKnockoutBracket] = useState<KnockoutMatch[][]>([]);
  const { getMatchScheduleInfo } = useMatchScheduler(scheduleConfig);

  const generateKnockoutBracket = useCallback((teams: string[], startingMatchIndex: number = 0): KnockoutMatch[][] => {
    const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(teams.length)));
    const filledTeams = [...teams];
    
    while (filledTeams.length < nextPowerOf2) {
      filledTeams.push('BYE');
    }

    const rounds: KnockoutMatch[][] = [];
    let matchCounter = startingMatchIndex;
    
    // Première ronde
    const firstRound: KnockoutMatch[] = [];
    for (let i = 0; i < filledTeams.length; i += 2) {
      const roundNames: Record<number, string> = {
        2: 'Finale',
        4: 'Demi-Finales',
        8: 'Quarts de Finale',
        16: '8èmes de Finale'
      };

      let matchInfo: KnockoutMatch = {
        id: `K-R1-M${i / 2 + 1}`,
        matchNumber: matchCounter + 1,
        round: 1,
        roundName: roundNames[nextPowerOf2] || `1/${nextPowerOf2}èmes`,
        team1: filledTeams[i],
        team2: filledTeams[i + 1],
        venue: venue || 'À définir',
        score1: null,
        score2: null,
        winner: null,
        played: false
      };

      if (schedulingMode === 'auto') {
        const scheduleInfo = getMatchScheduleInfo(matchCounter);
        matchInfo = { ...matchInfo, ...scheduleInfo };
      }
      
      firstRound.push(matchInfo);
      matchCounter++;
    }
    rounds.push(firstRound);

    // Rondes suivantes
    const numRounds = Math.log2(nextPowerOf2);
    for (let r = 2; r <= numRounds; r++) {
      const nextRound: KnockoutMatch[] = [];
      const numMatches = Math.pow(2, numRounds - r);
      const roundNames: Record<number, string> = {
        2: 'Finale',
        4: 'Demi-Finales',
        8: 'Quarts de Finale',
        16: '8èmes de Finale'
      };
      
      for (let m = 0; m < numMatches; m++) {
        let matchInfo: KnockoutMatch = {
          id: `K-R${r}-M${m + 1}`,
          matchNumber: matchCounter + 1,
          round: r,
          roundName: roundNames[numMatches * 2] || `Tour ${r}`,
          team1: null,
          team2: null,
          venue: venue || 'À définir',
          score1: null,
          score2: null,
          winner: null,
          played: false
        };

        if (schedulingMode === 'auto') {
          const scheduleInfo = getMatchScheduleInfo(matchCounter);
          matchInfo = { ...matchInfo, ...scheduleInfo };
        }
        
        nextRound.push(matchInfo);
        matchCounter++;
      }
      rounds.push(nextRound);
    }

    return rounds;
  }, [schedulingMode, getMatchScheduleInfo, venue]);

  const updateKnockoutScore = useCallback((roundIndex: number, matchIndex: number, score1: string, score2: string) => {
    setKnockoutBracket(prev => {
      const updated = [...prev];
      const match = updated[roundIndex][matchIndex];
      
      match.score1 = score1 === '' ? null : parseInt(score1);
      match.score2 = score2 === '' ? null : parseInt(score2);
      match.played = score1 !== '' && score2 !== '';
      
      if (match.played && match.score1 !== null && match.score2 !== null) {
        if (match.score1 > match.score2) {
          match.winner = match.team1;
        } else if (match.score2 > match.score1) {
          match.winner = match.team2;
        } else {
          match.winner = null;
        }

        if (match.winner && roundIndex < updated.length - 1) {
          const nextRoundMatchIndex = Math.floor(matchIndex / 2);
          const isTeam1 = matchIndex % 2 === 0;
          
          if (isTeam1) {
            updated[roundIndex + 1][nextRoundMatchIndex].team1 = match.winner;
          } else {
            updated[roundIndex + 1][nextRoundMatchIndex].team2 = match.winner;
          }
        }
      }
      
      return updated;
    });
  }, []);

  return { knockoutBracket, setKnockoutBracket, generateKnockoutBracket, updateKnockoutScore };
};