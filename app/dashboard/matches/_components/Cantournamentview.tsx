import React, { useMemo } from 'react';
import { Trophy, Download, RefreshCw, MapPin, Star, Target, Award, Users, Calendar, Clock, Check, AlertCircle, Play, ChevronRight, TrendingUp, Shield } from 'lucide-react';
import { Group, GroupMatch, CanPhase, TeamStanding, KnockoutMatch } from '@/types/tournament.types';

interface CanTournamentViewProps {
  tournamentName: string;
  venue: string;
  canGroups: Group[];
  canPhase: CanPhase;
  updateCanGroupScore: (groupName: string, matchId: string, homeScore: string, awayScore: string) => void;
  teamsPerGroupToQualify: number;
  onReset: () => void;
  canKnockoutBracket?: KnockoutMatch[][];
  updateKnockoutScore?: (roundIndex: number, matchIndex: number, score1: string, score2: string) => void;
  onAdvanceToKnockout?: () => void;
  onRegenerateGroups?: () => void;
}

const CanTournamentView: React.FC<CanTournamentViewProps> = ({
  tournamentName,
  venue,
  canGroups,
  canPhase,
  updateCanGroupScore,
  teamsPerGroupToQualify,
  onReset,
  canKnockoutBracket = [],
  updateKnockoutScore,
  onAdvanceToKnockout,
  onRegenerateGroups
}) => {
  const calculateCanGroupStandings = useMemo(() => {
    const standings: Record<string, TeamStanding[]> = {};
    
    canGroups.forEach(group => {
      const teamStats: Record<string, TeamStanding> = {};
      
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
      
      standings[group.name] = Object.values(teamStats).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });
    });
    
    return standings;
  }, [canGroups]);

  const getGroupProgress = (group: Group) => {
    const totalMatches = group.matches.length;
    const playedMatches = group.matches.filter(m => m.played).length;
    return { 
      total: totalMatches, 
      played: playedMatches, 
      percentage: (playedMatches / totalMatches) * 100 
    };
  };

  const canAdvanceToKnockout = () => {
    let allMatchesPlayed = true;
    canGroups.forEach(group => {
      group.matches.forEach(match => {
        if (!match.played) {
          allMatchesPlayed = false;
        }
      });
    });
    return allMatchesPlayed;
  };

  const getChampion = (): string | null => {
    if (canKnockoutBracket.length === 0) return null;
    
    const finalRound = canKnockoutBracket[canKnockoutBracket.length - 1];
    if (finalRound && finalRound.length > 0) {
      const finalMatch = finalRound[0];
      if (finalMatch.played && finalMatch.winner) {
        return finalMatch.winner;
      }
    }
    return null;
  };

  const champion = getChampion();

  const exportToPDF = () => {
    alert('Fonctionnalité d\'export PDF à venir !');
  };

  // Design tokens
  const cardBase = "bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100";
  const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600";

  return (
    <div className="space-y-6">
      {/* Champion Banner - Modern Gold */}
      {champion && canPhase === 'knockout' && (
        <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-3xl shadow-2xl shadow-amber-200 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 animate-[fadeInUp_0.6s_ease-out]">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl" />
              <Trophy className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg relative" />
            </div>
            <div className="text-center">
              <p className="text-white/80 font-semibold tracking-widest uppercase text-sm mb-2">Champion du Tournoi</p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-sm">
                {champion}
              </h2>
            </div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="w-6 h-6 md:w-8 md:h-8 text-white fill-white animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header - Clean White */}
      <div className={`${cardBase} p-6 md:p-8`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">{tournamentName}</h2>
              <span className={`
                px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${canPhase === 'groups' 
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}
              `}>
                {canPhase === 'groups' ? 'Phase de Groupes' : 'Phase Finale'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Format CAN</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{venue || 'Lieux variés'}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span className="text-sm">{canGroups.length} groupes</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportToPDF}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-sm border border-slate-200 hover:border-slate-300"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-sm border border-rose-200 hover:border-rose-300"
            >
              <RefreshCw className="w-4 h-4" />
              Nouveau
            </button>
          </div>
        </div>
      </div>

      {/* Groups Phase */}
      {canPhase === 'groups' && (
        <div className="space-y-6">
          {/* Regenerate Groups Button */}
          {onRegenerateGroups && (
            <div className={`${cardBase} p-6 md:p-8`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-indigo-500" />
                    Composition des Groupes
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Les équipes ont été réparties aléatoirement. Vous pouvez régénérer le tirage si nécessaire.
                  </p>
                </div>
                <button
                  onClick={onRegenerateGroups}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg shadow-indigo-200 whitespace-nowrap"
                >
                  <RefreshCw className="w-5 h-5" />
                  Régénérer les Groupes
                </button>
              </div>
            </div>
          )}

          {/* Groups */}
          {canGroups.map((group) => {
            const progress = getGroupProgress(group);
            const standings = calculateCanGroupStandings[group.name] || [];

            return (
              <div key={group.name} className={`${cardBase} overflow-hidden`}>
                {/* Group Header */}
                <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Award className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Groupe {group.name}</h3>
                    </div>
                    <div className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {progress.played}/{progress.total} matchs
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="p-6">
                  {/* Teams in Group */}
                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-500" />
                      Équipes du groupe ({group.teams.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {group.teams.map((team, idx) => (
                        <div key={idx} className="px-3 py-2.5 bg-white border border-indigo-200 text-slate-700 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                          <span className="font-bold text-indigo-500 w-5">{idx + 1}.</span>
                          <span className="truncate">{team}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Matches */}
                    <div className="lg:col-span-2">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        Matchs du Groupe {group.name}
                      </h4>
                      <div className="space-y-3">
                        {group.matches.map((match) => (
                          <div
                            key={match.id}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              match.played 
                                ? 'bg-emerald-50/50 border-emerald-200' 
                                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-4 mb-3">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                {match.time ? (
                                  <>
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="font-medium">{match.dayName} {match.date} • {match.time}</span>
                                  </>
                                ) : (
                                  <span className="text-amber-600 font-medium flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Non programmé
                                  </span>
                                )}
                                {match.venue && (
                                  <>
                                    <span className="text-slate-300">•</span>
                                    <MapPin className="w-3 h-3" />
                                    <span>{match.venue}</span>
                                  </>
                                )}
                              </div>
                              {match.played && (
                                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full text-xs font-bold">
                                  <Check className="w-3.5 h-3.5" />
                                  Terminé
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-slate-800">{match.homeTeam}</span>
                                </div>
                                <div className="text-xs text-slate-400 text-center font-medium">VS</div>
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-slate-800">{match.awayTeam}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 items-center bg-white p-2 rounded-lg border border-slate-200">
                                <input
                                  type="number"
                                  min="0"
                                  value={match.homeScore ?? ''}
                                  onChange={(e) => updateCanGroupScore(group.name, match.id, e.target.value, match.awayScore?.toString() ?? '')}
                                  placeholder="-"
                                  className="w-14 h-12 px-2 border-2 border-slate-200 rounded-lg text-center font-bold text-lg text-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
                                />
                                <span className="font-bold text-slate-400 text-xl">:</span>
                                <input
                                  type="number"
                                  min="0"
                                  value={match.awayScore ?? ''}
                                  onChange={(e) => updateCanGroupScore(group.name, match.id, match.homeScore?.toString() ?? '', e.target.value)}
                                  placeholder="-"
                                  className="w-14 h-12 px-2 border-2 border-slate-200 rounded-lg text-center font-bold text-lg text-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Group Standings */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-slate-400" />
                        Classement
                      </h4>
                      <div className="space-y-2">
                        {standings.map((team, index) => (
                          <div
                            key={team.name}
                            className={`p-3 rounded-xl transition-all duration-300 border-2 ${
                              index < teamsPerGroupToQualify
                                ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`
                                  w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                                  ${index === 0 ? 'bg-amber-100 text-amber-700' :
                                    index === 1 ? 'bg-slate-200 text-slate-700' :
                                    index === 2 ? 'bg-orange-100 text-orange-700' :
                                    'bg-slate-100 text-slate-600'}
                                `}>
                                  {index + 1}
                                </span>
                                <span className="font-semibold text-sm text-slate-800">{team.name}</span>
                                {index < teamsPerGroupToQualify && (
                                  <Award className="w-4 h-4 text-emerald-500" />
                                )}
                              </div>
                              <span className="font-bold text-indigo-600 text-lg">{team.points}</span>
                            </div>
                            <div className="text-xs text-slate-500 ml-8 grid grid-cols-3 gap-2">
                              <span>J: {team.played}</span>
                              <span className="text-center">{team.won}V {team.drawn}N {team.lost}D</span>
                              <span className="text-right">Diff: {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {standings.length > 0 && (
                        <div className="mt-4 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-lg flex items-center gap-2 border border-emerald-200">
                          <Check className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">
                            {teamsPerGroupToQualify === 1 ? 'Le 1er se qualifie' : `Les ${teamsPerGroupToQualify} premiers se qualifient`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Advance to Knockout Button */}
          {onAdvanceToKnockout && (
            <div className={`${cardBase} p-6`}>
              {!canAdvanceToKnockout() && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">Matchs en attente</p>
                    <p className="text-amber-700/80">Terminez tous les matchs de groupes avant de passer à la phase éliminatoire.</p>
                  </div>
                </div>
              )}
              <button
                onClick={onAdvanceToKnockout}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
                  canAdvanceToKnockout()
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                disabled={!canAdvanceToKnockout()}
              >
                <Play className="w-6 h-6 fill-current" />
                Passer à la Phase Éliminatoire
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Knockout Phase */}
      {canPhase === 'knockout' && updateKnockoutScore && (
        <div className={`${cardBase} p-6 md:p-8`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Phase à Élimination Directe</h3>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-8 min-w-max">
              {canKnockoutBracket.map((round, roundIndex) => (
                <div key={roundIndex} className="flex flex-col gap-4 w-[320px]">
                  <h4 className="font-bold text-center text-slate-700 mb-2 bg-slate-100 py-2 rounded-lg">
                    {round[0]?.roundName}
                  </h4>
                  {round.map((match, matchIndex) => (
                    <div
                      key={match.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        match.played
                          ? 'bg-emerald-50 border-emerald-200'
                          : match.team1 && match.team2
                          ? 'bg-white border-indigo-200 shadow-sm'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                      style={{ marginTop: roundIndex > 0 ? `${Math.pow(2, roundIndex - 1) * 40}px` : '0' }}
                    >
                      {match.date && (
                        <div className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium">{match.dayName} {match.date} • {match.time}</span>
                        </div>
                      )}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {match.winner === match.team1 && (
                              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                              </div>
                            )}
                            <span className={`font-semibold ${match.winner === match.team1 ? 'text-emerald-700' : 'text-slate-700'}`}>
                              {match.team1 || <span className="text-slate-400 italic">...</span>}
                            </span>
                          </div>
                          {match.team1 && match.team1 !== 'BYE' && match.team2 && match.team2 !== 'BYE' && (
                            <input
                              type="number"
                              min="0"
                              value={match.score1 ?? ''}
                              onChange={(e) => updateKnockoutScore(roundIndex, matchIndex, e.target.value, match.score2?.toString() ?? '')}
                              placeholder="-"
                              className="w-12 h-10 px-2 border-2 border-slate-200 rounded-lg text-center font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                            />
                          )}
                        </div>
                        <div className="h-px bg-slate-200" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {match.winner === match.team2 && (
                              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                              </div>
                            )}
                            <span className={`font-semibold ${match.winner === match.team2 ? 'text-emerald-700' : 'text-slate-700'}`}>
                              {match.team2 || <span className="text-slate-400 italic">...</span>}
                            </span>
                          </div>
                          {match.team1 && match.team1 !== 'BYE' && match.team2 && match.team2 !== 'BYE' && (
                            <input
                              type="number"
                              min="0"
                              value={match.score2 ?? ''}
                              onChange={(e) => updateKnockoutScore(roundIndex, matchIndex, match.score1?.toString() ?? '', e.target.value)}
                              placeholder="-"
                              className="w-12 h-10 px-2 border-2 border-slate-200 rounded-lg text-center font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanTournamentView;