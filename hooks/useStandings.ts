// hooks/useStandings.ts
import { useMemo } from 'react';
import { Match, TeamStanding } from '../types/tournament.types';

export const useStandings = (schedule: Match[], teams: string[]) => {
  const standings = useMemo((): TeamStanding[] => {
    const teamStats: Record<string, TeamStanding> = {};
    
    teams.filter(t => t.trim()).forEach(team => {
      teamStats[team] = {
        name: team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      };
    });

    schedule.forEach(match => {
      if (match.played && match.homeScore !== null && match.awayScore !== null) {
        const home = teamStats[match.homeTeam];
        const away = teamStats[match.awayTeam];
        
        home.played++;
        away.played++;
        
        home.goalsFor += match.homeScore;
        home.goalsAgainst += match.awayScore;
        away.goalsFor += match.awayScore;
        away.goalsAgainst += match.homeScore;

        if (match.homeScore > match.awayScore) {
          home.won++;
          home.points += 3;
          away.lost++;
        } else if (match.homeScore < match.awayScore) {
          away.won++;
          away.points += 3;
          home.lost++;
        } else {
          home.drawn++;
          away.drawn++;
          home.points += 1;
          away.points += 1;
        }

        home.goalDifference = home.goalsFor - home.goalsAgainst;
        away.goalDifference = away.goalsFor - away.goalsAgainst;
      }
    });

    return Object.values(teamStats).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  }, [schedule, teams]);

  return standings;
};