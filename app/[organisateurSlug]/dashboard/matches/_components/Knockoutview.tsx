import React, { useMemo } from 'react';
import { Trophy, Download, RefreshCw, MapPin, Clock, Award, Medal, Star } from 'lucide-react';
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
    
    // Collecter toutes les équipes
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

  return (
    <div className="space-y-6">
      {/* Champion Banner */}
      {champion && (
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
              <Trophy className="w-5 h-5" />
              Format Coupe
              <span>•</span>
              <MapPin className="w-4 h-4" />
              {venue || 'Lieux variés'}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Bracket */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Arbre de Compétition
          </h3>
          <div className="overflow-x-auto">
            <div className="flex gap-8 pb-4">
              {knockoutBracket.map((round, roundIndex) => (
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

        {/* Standings */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Classement
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {calculateKnockoutStandings.map((team, index) => (
              <div
                key={team.name}
                className={`p-3 rounded-lg ${
                  team.status.includes('Champion')
                    ? 'bg-yellow-100 border-2 border-yellow-400'
                    : index === 1
                    ? 'bg-gray-100 border-2 border-gray-400'
                    : index === 2
                    ? 'bg-orange-100 border-2 border-orange-400'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{index + 1}.</span>
                    {team.status.includes('Champion') && <Trophy className="w-5 h-5 text-yellow-600" />}
                    {index === 1 && <Medal className="w-5 h-5 text-gray-600" />}
                    {index === 2 && <Medal className="w-5 h-5 text-orange-600" />}
                    <span className="font-semibold text-sm">{team.name}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-700 font-semibold ml-5">
                  {team.status}
                </div>
                <div className="text-xs text-gray-600 mt-1 ml-5">
                  J: {team.played} | V: {team.won} | D: {team.lost}
                </div>
                <div className="text-xs text-gray-600 ml-5">
                  Buts: {team.goalsFor}-{team.goalsAgainst} ({team.goalDifference > 0 ? '+' : ''}{team.goalDifference})
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