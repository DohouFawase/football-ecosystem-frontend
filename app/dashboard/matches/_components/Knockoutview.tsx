import React, { useMemo } from 'react';
import { Trophy, Download, RefreshCw, MapPin, Clock, Award, Medal, Star, Swords, TrendingUp, ChevronRight, Target } from 'lucide-react';
import { KnockoutMatch, KnockoutStanding } from '@/types/tournament.types';

interface KnockoutViewProps {
  tournamentName: string;
  venue: string;
  knockoutBracket: KnockoutMatch[][];
  updateKnockoutScore: (roundIndex: number, matchIndex: number, score1: string, score2: string) => void;
  onReset: () => void;
}

const KnockoutView: React.FC<KnockoutViewProps> = ({
  tournamentName,
  venue,
  knockoutBracket,
  updateKnockoutScore,
  onReset
}) => {
  const getChampion = (): string | null => {
    if (knockoutBracket.length === 0) return null;
    
    const finalRound = knockoutBracket[knockoutBracket.length - 1];
    if (finalRound && finalRound.length > 0) {
      const finalMatch = finalRound[0];
      if (finalMatch.played && finalMatch.winner) {
        return finalMatch.winner;
      }
    }
    return null;
  };

  const calculateKnockoutStandings = useMemo((): KnockoutStanding[] => {
    const teamStats: Record<string, KnockoutStanding> = {};
    
    knockoutBracket.forEach((round) => {
      round.forEach(match => {
        if (match.team1 && match.team1 !== 'BYE' && !teamStats[match.team1]) {
          teamStats[match.team1] = {
            name: match.team1,
            played: 0,
            won: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            highestRound: 'Non qualifié',
            roundNumber: 0,
            status: 'En cours'
          };
        }
        if (match.team2 && match.team2 !== 'BYE' && !teamStats[match.team2]) {
          teamStats[match.team2] = {
            name: match.team2,
            played: 0,
            won: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            highestRound: 'Non qualifié',
            roundNumber: 0,
            status: 'En cours'
          };
        }
      });
    });

    knockoutBracket.forEach((round, roundIndex) => {
      round.forEach(match => {
        if (match.team1 && match.team1 !== 'BYE') {
          const team1Stats = teamStats[match.team1];
          if (team1Stats) {
            if (roundIndex + 1 > team1Stats.roundNumber) {
              team1Stats.roundNumber = roundIndex + 1;
              team1Stats.highestRound = match.roundName;
            }

            if (match.played && match.score1 !== null && match.score2 !== null) {
              team1Stats.played++;
              team1Stats.goalsFor += match.score1;
              team1Stats.goalsAgainst += match.score2;
              team1Stats.goalDifference = team1Stats.goalsFor - team1Stats.goalsAgainst;

              if (match.winner === match.team1) {
                team1Stats.won++;
                if (match.roundName === 'Finale') {
                  team1Stats.status = '🏆 Champion';
                }
              } else {
                team1Stats.lost++;
                team1Stats.status = `Éliminé en ${match.roundName}`;
              }
            }
          }
        }

        if (match.team2 && match.team2 !== 'BYE') {
          const team2Stats = teamStats[match.team2];
          if (team2Stats) {
            if (roundIndex + 1 > team2Stats.roundNumber) {
              team2Stats.roundNumber = roundIndex + 1;
              team2Stats.highestRound = match.roundName;
            }

            if (match.played && match.score1 !== null && match.score2 !== null) {
              team2Stats.played++;
              team2Stats.goalsFor += match.score2;
              team2Stats.goalsAgainst += match.score1;
              team2Stats.goalDifference = team2Stats.goalsFor - team2Stats.goalsAgainst;

              if (match.winner === match.team2) {
                team2Stats.won++;
                if (match.roundName === 'Finale') {
                  team2Stats.status = '🏆 Champion';
                }
              } else {
                team2Stats.lost++;
                team2Stats.status = `Éliminé en ${match.roundName}`;
              }
            }
          }
        }
      });
    });

    return Object.values(teamStats).sort((a, b) => {
      if (b.roundNumber !== a.roundNumber) return b.roundNumber - a.roundNumber;
      if (b.won !== a.won) return b.won - a.won;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  }, [knockoutBracket]);

  const champion = getChampion();

  const exportToPDF = () => {
    alert('Fonctionnalité d\'export PDF à venir !');
  };

  // Design tokens
  const cardBase = "bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100";

  return (
    <div className="space-y-6">
      {/* Champion Banner - Modern Gold */}
      {champion && (
        <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-3xl shadow-2xl shadow-amber-200 p-8 md:p-12 relative overflow-hidden animate-[fadeInUp_0.6s_ease-out]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
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
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                Coupe
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-500">
              <div className="flex items-center gap-1.5">
                <Swords className="w-4 h-4" />
                <span className="text-sm font-medium">Format Élimination Directe</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{venue || 'Lieux variés'}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span className="text-sm">{knockoutBracket.length} tours</span>
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Bracket */}
        <div className={`${cardBase} lg:col-span-3 p-6 md:p-8`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg">
              <Swords className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">Arbre de Compétition</h3>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-8 min-w-max">
              {knockoutBracket.map((round, roundIndex) => (
                <div key={roundIndex} className="flex flex-col gap-4 w-[280px]">
                  <h4 className="font-bold text-center text-slate-700 mb-2 bg-slate-100 py-2.5 rounded-xl text-sm uppercase tracking-wider">
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
                        {/* Team 1 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {match.winner === match.team1 && (
                              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                              </div>
                            )}
                            <span className={`font-semibold text-sm ${match.winner === match.team1 ? 'text-emerald-700' : 'text-slate-700'}`}>
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
                              className="w-12 h-10 px-2 border-2 border-slate-200 rounded-lg text-center font-bold text-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
                            />
                          )}
                        </div>
                        
                        <div className="h-px bg-slate-200" />
                        
                        {/* Team 2 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {match.winner === match.team2 && (
                              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                              </div>
                            )}
                            <span className={`font-semibold text-sm ${match.winner === match.team2 ? 'text-emerald-700' : 'text-slate-700'}`}>
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
                              className="w-12 h-10 px-2 border-2 border-slate-200 rounded-lg text-center font-bold text-slate-800 focus:border-indigo-500 focus:outline-none transition-colors"
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

        {/* Standings */}
        <div className={`${cardBase} p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Classement</h3>
          </div>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {calculateKnockoutStandings.map((team, index) => (
              <div
                key={team.name}
                className={`p-3 rounded-xl transition-all duration-300 border-2 ${
                  team.status.includes('Champion')
                    ? 'bg-amber-50 border-amber-300 shadow-sm'
                    : index === 1
                    ? 'bg-slate-100 border-slate-300'
                    : index === 2
                    ? 'bg-orange-50 border-orange-300'
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
                    {team.status.includes('Champion') && <Trophy className="w-4 h-4 text-amber-500" />}
                    {index === 1 && <Medal className="w-4 h-4 text-slate-500" />}
                    {index === 2 && <Medal className="w-4 h-4 text-orange-500" />}
                    <span className="font-semibold text-sm text-slate-800">{team.name}</span>
                  </div>
                </div>
                
                <div className="text-xs font-semibold text-slate-600 ml-8 mb-1">
                  {team.status}
                </div>
                
                <div className="text-xs text-slate-500 ml-8 grid grid-cols-2 gap-1">
                  <span>J: {team.played} | V: {team.won} | D: {team.lost}</span>
                  <span className="text-right">Diff: {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnockoutView;