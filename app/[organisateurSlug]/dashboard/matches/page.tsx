"use client"
import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { ScheduleConfig, SchedulingMode, TournamentMode } from '@/types/tournament.types';
import { useLeagueSchedule } from '@/hooks/useLeagueSchedule';
import { useKnockoutBracket } from '@/hooks/useKnockoutBracket';
import { useCanTournament } from '@/hooks/useCanTournament';
import { useStandings } from '@/hooks/useStandings';
import { useTournamentGenerator } from '@/hooks/useTournamentGenerator';
import TournamentConfig from './_components/Tournamentconfig';
import LeagueView from './_components/Leagueview';
import CanTournamentView from './_components/Cantournamentview';
import KnockoutView from './_components/Knockoutview';

const TournamentScheduler: React.FC = () => {
  const [teams, setTeams] = useState<string[]>(['']);
  const [tournamentName, setTournamentName] = useState<string>('');
  const [mode, setMode] = useState<TournamentMode>('league');
  const [venue, setVenue] = useState<string>('');
  const [generated, setGenerated] = useState<boolean>(false);
  const [schedulingMode, setSchedulingMode] = useState<SchedulingMode>('auto');
  const [numberOfGroups, setNumberOfGroups] = useState<number>(4);
  const [teamsPerGroupToQualify, setTeamsPerGroupToQualify] = useState<number>(2);
  
  const [scheduleConfig, setScheduleConfig] = useState<ScheduleConfig>({
    startDate: '',
    startTime: '09:00',
    matchDuration: 90,
    breakBetweenMatches: 30,
    matchesPerDay: 4
  });

  const leagueSchedule = useLeagueSchedule({ schedulingMode, scheduleConfig, venue });
  const knockoutBracket = useKnockoutBracket({ schedulingMode, scheduleConfig, venue });
  const canTournament = useCanTournament({ schedulingMode, scheduleConfig, venue, numberOfGroups });
  
  const standings = useStandings(leagueSchedule.schedule, teams);

  const { generateSchedule } = useTournamentGenerator({
    teams,
    tournamentName,
    schedulingMode,
    startDate: scheduleConfig.startDate,
    mode,
    generateLeagueSchedule: (validTeams) => {
      const matches = leagueSchedule.generateLeagueSchedule(validTeams);
      leagueSchedule.setSchedule(matches);
    },
    generateKnockoutBracket: (validTeams) => {
      const bracket = knockoutBracket.generateKnockoutBracket(validTeams);
      knockoutBracket.setKnockoutBracket(bracket);
    },
    generateCanGroups: (validTeams) => {
      const groups = canTournament.generateCanGroups(validTeams);
      canTournament.setCanGroups(groups);
      canTournament.setCanPhase('groups');
    },
    setGenerated
  });

  const reset = () => {
    setTeams(['']);
    setTournamentName('');
    setScheduleConfig({
      startDate: '',
      startTime: '09:00',
      matchDuration: 90,
      breakBetweenMatches: 30,
      matchesPerDay: 4
    });
    setVenue('');
    leagueSchedule.setSchedule([]);
    knockoutBracket.setKnockoutBracket([]);
    canTournament.setCanGroups([]);
    canTournament.setCanPhase('groups');
    setGenerated(false);
  };

  const handleRegenerateGroups = () => {
    const validTeams = teams.filter(t => t.trim() !== '');
    const newGroups = canTournament.generateCanGroups(validTeams);
    canTournament.setCanGroups(newGroups);
  };

  const handleAdvanceToKnockout = () => {
    let allMatchesPlayed = true;
    canTournament.canGroups.forEach(group => {
      group.matches.forEach(match => {
        if (!match.played) {
          allMatchesPlayed = false;
        }
      });
    });

    if (!allMatchesPlayed) {
      alert('⚠️ Attention : Tous les matchs de groupes ne sont pas encore terminés. Veuillez terminer tous les matchs avant de passer à la phase éliminatoire.');
      return;
    }

    // Calculer les classements des groupes
    const standings: Record<string, any[]> = {};
    canTournament.canGroups.forEach(group => {
      const teamStats: Record<string, any> = {};
      
      group.teams.forEach(team => {
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
      
      group.matches.forEach(match => {
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
      
      standings[group.name] = Object.values(teamStats).sort((a: any, b: any) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });
    });

    // Obtenir les équipes qualifiées
    const qualifiedTeams: string[] = [];
    Object.values(standings).forEach(groupStanding => {
      qualifiedTeams.push(...groupStanding.slice(0, teamsPerGroupToQualify).map((t: any) => t.name));
    });

    // Générer le bracket de knockout
    const startingMatchIndex = canTournament.canGroups.reduce((sum, g) => sum + g.matches.length, 0);
    const bracket = knockoutBracket.generateKnockoutBracket(qualifiedTeams, startingMatchIndex);
    knockoutBracket.setKnockoutBracket(bracket);
    canTournament.setCanPhase('knockout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Générateur de Calendrier de Tournoi
            </h1>
          </div>
          <p className="text-gray-600">
            Créez le calendrier avec programmation automatique ou manuelle
          </p>
        </div>

        {!generated ? (
          <TournamentConfig
            teams={teams}
            setTeams={setTeams}
            tournamentName={tournamentName}
            setTournamentName={setTournamentName}
            mode={mode}
            setMode={setMode}
            venue={venue}
            setVenue={setVenue}
            schedulingMode={schedulingMode}
            setSchedulingMode={setSchedulingMode}
            scheduleConfig={scheduleConfig}
            setScheduleConfig={setScheduleConfig}
            numberOfGroups={numberOfGroups}
            setNumberOfGroups={setNumberOfGroups}
            teamsPerGroupToQualify={teamsPerGroupToQualify}
            setTeamsPerGroupToQualify={setTeamsPerGroupToQualify}
            onGenerate={generateSchedule}
          />
        ) : (
          <>
            {mode === 'league' && (
              <LeagueView
                tournamentName={tournamentName}
                venue={venue}
                schedule={leagueSchedule.schedule}
                standings={standings}
                updateMatchScore={leagueSchedule.updateMatchScore}
                onReset={reset}
              />
            )}
            
            {mode === 'knockout' && (
              <KnockoutView
                tournamentName={tournamentName}
                venue={venue}
                knockoutBracket={knockoutBracket.knockoutBracket}
                updateKnockoutScore={knockoutBracket.updateKnockoutScore}
                onReset={reset}
              />
            )}
            
            {mode === 'can' && (
              <CanTournamentView
                tournamentName={tournamentName}
                venue={venue}
                canGroups={canTournament.canGroups}
                canPhase={canTournament.canPhase}
                updateCanGroupScore={canTournament.updateCanGroupScore}
                teamsPerGroupToQualify={teamsPerGroupToQualify}
                onReset={reset}
                canKnockoutBracket={knockoutBracket.knockoutBracket}
                updateKnockoutScore={knockoutBracket.updateKnockoutScore}
                onAdvanceToKnockout={handleAdvanceToKnockout}
                onRegenerateGroups={handleRegenerateGroups}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TournamentScheduler;