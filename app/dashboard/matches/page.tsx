"use client"
import React, { useState } from 'react';
import { Trophy, Calendar, Users, MapPin, Settings, RotateCcw, ChevronRight, Sparkles, Zap } from 'lucide-react';
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

    const qualifiedTeams: string[] = [];
    Object.values(standings).forEach(groupStanding => {
      qualifiedTeams.push(...groupStanding.slice(0, teamsPerGroupToQualify).map((t: any) => t.name));
    });

    const startingMatchIndex = canTournament.canGroups.reduce((sum, g) => sum + g.matches.length, 0);
    const bracket = knockoutBracket.generateKnockoutBracket(qualifiedTeams, startingMatchIndex);
    knockoutBracket.setKnockoutBracket(bracket);
    canTournament.setCanPhase('knockout');
  };

  const fadeInUp = "animate-[fadeInUp_0.5s_ease-out]";
  const cardBase = "bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,_rgba(99,102,241,0.15)_1px,_transparent_0)] bg-[length:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Clean White Style */}
        <div className={`${cardBase} p-8 md:p-10 mb-6 ${fadeInUp}`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-4 rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
                Générateur de Calendrier
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> de Tournoi</span>
              </h1>
              <p className="text-slate-500 text-lg">
                Créez le calendrier avec programmation automatique ou manuelle
              </p>
            </div>
            {generated && (
              <button
                onClick={reset}
                className="group flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
              >
                <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                <span className="font-semibold">Nouveau tournoi</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        {!generated && (
          <div className={`${cardBase} p-4 mb-6 ${fadeInUp}`} style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200">
                <Settings className="w-4 h-4 text-indigo-600" />
                <span className="text-indigo-900 font-semibold text-sm">Configuration</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 hidden md:block" />
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 opacity-60">
                <Sparkles className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 font-medium text-sm">Génération</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 hidden md:block" />
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 opacity-60">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 font-medium text-sm">Calendrier</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`${fadeInUp}`} style={{ animationDelay: '0.2s' }}>
          {!generated ? (
            <div className={cardBase + " overflow-hidden"}>
              <div className="bg-gradient-to-r from-slate-50 to-white p-6 md:p-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Configuration du Tournoi</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Personnalisez les paramètres de votre compétition</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
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
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Tournament Info Bar */}
              <div className={`${cardBase} p-6 flex flex-wrap items-center justify-between gap-4`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg shadow-emerald-200">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{tournamentName || "Tournoi sans nom"}</h2>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{venue || "Lieu non défini"}</span>
                      <span className="mx-1">•</span>
                      <span className={`
                        px-2.5 py-0.5 rounded-full text-xs font-semibold
                        ${mode === 'league' ? 'bg-blue-100 text-blue-700' : 
                          mode === 'knockout' ? 'bg-rose-100 text-rose-700' : 
                          'bg-amber-100 text-amber-700'}
                      `}>
                        {mode === 'league' ? 'Championnat' : mode === 'knockout' ? 'Élimination directe' : 'CAN'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-all duration-300 border border-rose-200 hover:border-rose-300 font-medium text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Recommencer</span>
                </button>
              </div>

              {/* Views */}
              <div className={cardBase + " p-6 md:p-8"}>
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
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TournamentScheduler;