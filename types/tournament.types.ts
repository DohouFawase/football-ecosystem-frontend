// types/tournament.types.ts
export type TournamentMode = 'league' | 'knockout' | 'can';
export type SchedulingMode = 'auto' | 'manual';
export type CanPhase = 'groups' | 'knockout';

export interface Match {
  id: string | number;
  matchNumber: number;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  homeScore: number | null;
  awayScore: number | null;
  played: boolean;
  date?: string;
  time?: string;
  dayName?: string;
  fullDate?: string;
  dateTime?: Date | null;
  round?: number;
}

export interface KnockoutMatch {
  id: string;
  matchNumber: number;
  round: number;
  roundName: string;
  team1: string | null;
  team2: string | null;
  venue: string;
  score1: number | null;
  score2: number | null;
  winner: string | null;
  played: boolean;
  date?: string;
  time?: string;
  dayName?: string;
  fullDate?: string;
  dateTime?: Date | null;
}

export interface GroupMatch extends Omit<Match, 'round'> {
  group: string;
}

export interface Group {
  name: string;
  teams: string[];
  matches: GroupMatch[];
}

export interface TeamStanding {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface KnockoutStanding {
  name: string;
  played: number;
  won: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  highestRound: string;
  roundNumber: number;
  status: string;
}

export interface ScheduleConfig {
  startDate: string;
  startTime: string;
  matchDuration: number;
  breakBetweenMatches: number;
  matchesPerDay: number;
}

export interface EditingMatch {
  id: string | number;
  date: string;
  time: string;
  venue: string;
}