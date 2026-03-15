import React, { useMemo } from 'react';
import { Trophy, Download, RefreshCw, MapPin, Star, Target, Award, Users, Calendar, Clock, Check, AlertCircle, Play } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      {/* Champion Banner */}
      {champion && canPhase === 'knockout' && (
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-8 animate-pulse">
          <div className="flex flex-col items-center justify-center gap-4">
            <Trophy className="w-20 h-20 text-white drop-shadow-lg" />
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
                🏆 CHAMPION 🏆
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                {champion}
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <Star className="w-8 h-8 text-white fill-white" />
              <Star className="w-8 h-8 text-white fill-white" />
              <Star className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{tournamentName}</h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Format CAN
              <span>•</span>
              <MapPin className="w-4 h-4" />
              {venue || 'Lieux variés'}
            </p>
            <p className="text-sm text-blue-600 mt-1 font-semibold flex items-center gap-2">
              <Target className="w-4 h-4" />
              {canPhase === 'groups' ? 'Phase de Groupes' : 'Phase à Élimination Directe'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
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
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Composition des Groupes</h3>
                  <p className="text-sm text-gray-600">
                    Les équipes ont été réparties aléatoirement. Vous pouvez régénérer le tirage si nécessaire.
                  </p>
                </div>
                <button
                  onClick={onRegenerateGroups}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 whitespace-nowrap"
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
              <div key={group.name} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <Award className="w-6 h-6 text-blue-500" />
                      Groupe {group.name}
                    </h3>
                    <div className="text-sm font-semibold text-gray-600">
                      {progress.played}/{progress.total} matchs terminés
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Teams in Group */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Équipes du groupe ({group.teams.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {group.teams.map((team, idx) => (
                        <div key={idx} className="px-3 py-2 bg-white border-2 border-blue-300 text-blue-800 rounded-lg font-semibold text-sm flex items-center gap-2">
                          <span className="font-bold text-blue-600">{idx + 1}.</span>
                          <span className="truncate">{team}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Matches */}
                  <div className="lg:col-span-2">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      Matchs du Groupe {group.name}
                    </h4>
                    <div className="space-y-3">
                      {group.matches.map((match) => (
                        <div
                          key={match.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            match.played ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {match.time ? (
                                <>
                                  <Clock className="w-4 h-4" />
                                  <span className="font-semibold">{match.dayName} {match.date} • {match.time}</span>
                                </>
                              ) : (
                                <span className="text-orange-600 font-semibold">⚠️ Non programmé</span>
                              )}
                              {match.venue && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <MapPin className="w-3 h-3" />
                                  <span className="text-xs">{match.venue}</span>
                                </>
                              )}
                            </div>
                            {match.played && (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 mb-1">{match.homeTeam}</div>
                              <div className="text-sm text-gray-500 my-1">vs</div>
                              <div className="font-semibold text-gray-800">{match.awayTeam}</div>
                            </div>
                            <div className="flex gap-2 items-center">
                              <div className="text-center">
                                <input
                                  type="number"
                                  min="0"
                                  value={match.homeScore ?? ''}
                                  onChange={(e) => updateCanGroupScore(group.name, match.id, e.target.value, match.awayScore?.toString() ?? '')}
                                  placeholder="0"
                                  className="w-16 px-2 py-2 border-2 border-gray-300 rounded text-center font-bold focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                              <span className="font-bold text-gray-600 text-xl">-</span>
                              <div className="text-center">
                                <input
                                  type="number"
                                  min="0"
                                  value={match.awayScore ?? ''}
                                  onChange={(e) => updateCanGroupScore(group.name, match.id, match.homeScore?.toString() ?? '', e.target.value)}
                                  placeholder="0"
                                  className="w-16 px-2 py-2 border-2 border-gray-300 rounded text-center font-bold focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Group Standings */}
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-gray-600" />
                      Classement Groupe {group.name}
                    </h4>
                    <div className="space-y-2">
                      {standings.map((team, index) => (
                        <div
                          key={team.name}
                          className={`p-3 rounded-lg transition-all ${
                            index < teamsPerGroupToQualify
                              ? 'bg-green-100 border-2 border-green-400'
                              : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">{index + 1}.</span>
                              <span className="font-semibold text-sm">{team.name}</span>
                              {index < teamsPerGroupToQualify && (
                                <Award className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <span className="font-bold text-blue-600 text-lg">{team.points} pts</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1 ml-7">
                            J:{team.played} V:{team.won} N:{team.drawn} D:{team.lost} | Buts: {team.goalsFor}-{team.goalsAgainst} ({team.goalDifference > 0 ? '+' : ''}{team.goalDifference})
                          </div>
                        </div>
                      ))}
                    </div>
                    {standings.length > 0 && (
                      <div className="mt-3 text-xs text-green-700 bg-green-50 p-2 rounded flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        {teamsPerGroupToQualify === 1 ? 'Le 1er se qualifie' : `Les ${teamsPerGroupToQualify} premiers se qualifient`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Advance to Knockout Button */}
          {onAdvanceToKnockout && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {!canAdvanceToKnockout() && (
                <div className="mb-4 p-4 bg-orange-50 border-2 border-orange-300 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-800">
                    <p className="font-semibold mb-1">⚠️ Attention</p>
                    <p>Tous les matchs de groupes ne sont pas encore terminés. Terminez tous les matchs avant de passer à la phase éliminatoire.</p>
                  </div>
                </div>
              )}
              <button
                onClick={onAdvanceToKnockout}
                className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                  canAdvanceToKnockout()
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!canAdvanceToKnockout()}
              >
                <Play className="w-6 h-6" />
                Passer à la Phase à Élimination Directe
              </button>
            </div>
          )}
        </div>
      )}

      {/* Knockout Phase */}
      {canPhase === 'knockout' && updateKnockoutScore && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Phase à Élimination Directe
          </h3>
          <div className="overflow-x-auto">
            <div className="flex gap-8 pb-4">
              {canKnockoutBracket.map((round, roundIndex) => (
                <div key={roundIndex} className="flex flex-col gap-4 min-w-[300px]">
                  <h4 className="font-bold text-lg text-center text-gray-700 mb-2">
                    {round[0]?.roundName}
                  </h4>
                  {round.map((match, matchIndex) => (
                    <div
                      key={match.id}
                      className={`p-4 rounded-lg border-2 ${
                        match.played
                          ? 'bg-green-50 border-green-300'
                          : match.team1 && match.team2
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-gray-100 border-gray-300'
                      }`}
                      style={{ marginTop: roundIndex > 0 ? `${Math.pow(2, roundIndex - 1) * 40}px` : '0' }}
                    >
                      {match.date && (
                        <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {match.dayName} {match.date} • {match.time}
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${match.winner === match.team1 ? 'text-green-600 flex items-center gap-1' : ''}`}>
                            {match.team1 || '...'}
                            {match.winner === match.team1 && <Trophy className="w-4 h-4" />}
                          </span>
                          {match.team1 && match.team1 !== 'BYE' && match.team2 && match.team2 !== 'BYE' && (
                            <input
                              type="number"
                              min="0"
                              value={match.score1 ?? ''}
                              onChange={(e) => updateKnockoutScore(roundIndex, matchIndex, e.target.value, match.score2?.toString() ?? '')}
                              placeholder="0"
                              className="w-12 px-2 py-1 border-2 border-gray-300 rounded text-center font-bold"
                            />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${match.winner === match.team2 ? 'text-green-600 flex items-center gap-1' : ''}`}>
                            {match.team2 || '...'}
                            {match.winner === match.team2 && <Trophy className="w-4 h-4" />}
                          </span>
                          {match.team1 && match.team1 !== 'BYE' && match.team2 && match.team2 !== 'BYE' && (
                            <input
                              type="number"
                              min="0"
                              value={match.score2 ?? ''}
                              onChange={(e) => updateKnockoutScore(roundIndex, matchIndex, match.score1?.toString() ?? '', e.target.value)}
                              placeholder="0"
                              className="w-12 px-2 py-1 border-2 border-gray-300 rounded text-center font-bold"
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