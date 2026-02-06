import React, { useState } from 'react';
import { Calendar, Trophy, Download, RefreshCw, Medal, MapPin, Clock, Edit2, Check, X } from 'lucide-react';
import { Match, TeamStanding, EditingMatch } from '@/types/tournament.types';

interface LeagueViewProps {
  tournamentName: string;
  venue: string;
  schedule: Match[];
  standings: TeamStanding[];
  updateMatchScore: (matchId: string | number, homeScore: string, awayScore: string) => void;
  onReset: () => void;
}

const LeagueView: React.FC<LeagueViewProps> = ({
  tournamentName,
  venue,
  schedule,
  standings,
  updateMatchScore,
  onReset
}) => {
  const [editingMatch, setEditingMatch] = useState<EditingMatch | null>(null);

  const groupMatchesByDay = (matches: Match[]) => {
    const grouped: Record<string, Match[]> = {};
    matches.forEach(match => {
      if (match.date) {
        const key = `${match.dayName} ${match.date}`;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(match);
      } else {
        if (!grouped['Non programmés']) {
          grouped['Non programmés'] = [];
        }
        grouped['Non programmés'].push(match);
      }
    });
    return grouped;
  };

  const startEditingMatch = (matchId: string | number) => {
    const match = schedule.find(m => m.id === matchId);
    if (match) {
      setEditingMatch({
        id: matchId,
        date: match.fullDate || '',
        time: match.time || '',
        venue: match.venue || ''
      });
    }
  };

  const saveMatchSchedule = () => {
    if (!editingMatch) return;
    // Logic to save match schedule would be handled by parent component
    setEditingMatch(null);
  };

  const exportToPDF = () => {
    alert('Fonctionnalité d\'export PDF à venir !');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{tournamentName}</h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Medal className="w-5 h-5" />
              Format Championnat
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Calendrier des Matchs
          </h3>
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {Object.entries(groupMatchesByDay(schedule)).map(([day, dayMatches]) => (
              <div key={day} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-lg text-blue-600 mb-3">{day}</h4>
                <div className="space-y-3">
                  {dayMatches.map((match) => (
                    <div
                      key={match.id}
                      className={`p-4 rounded-lg border-2 ${
                        match.played ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      {editingMatch && editingMatch.id === match.id ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs font-semibold text-gray-600">Date</label>
                              <input
                                type="date"
                                value={editingMatch.date}
                                onChange={(e) => setEditingMatch({...editingMatch, date: e.target.value})}
                                className="w-full px-2 py-1 border rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600">Heure</label>
                              <input
                                type="time"
                                value={editingMatch.time}
                                onChange={(e) => setEditingMatch({...editingMatch, time: e.target.value})}
                                className="w-full px-2 py-1 border rounded text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-600">Lieu</label>
                            <input
                              type="text"
                              value={editingMatch.venue}
                              onChange={(e) => setEditingMatch({...editingMatch, venue: e.target.value})}
                              className="w-full px-2 py-1 border rounded text-sm"
                              placeholder="Lieu du match"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={saveMatchSchedule}
                              className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-1"
                            >
                              <Check className="w-4 h-4" />
                              Sauvegarder
                            </button>
                            <button
                              onClick={() => setEditingMatch(null)}
                              className="flex-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center justify-center gap-1"
                            >
                              <X className="w-4 h-4" />
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {match.time ? (
                                <>
                                  <Clock className="w-4 h-4" />
                                  <span className="font-semibold">{match.time}</span>
                                  <span className="text-gray-400">•</span>
                                </>
                              ) : (
                                <span className="text-orange-600 font-semibold">⚠️ Non programmé</span>
                              )}
                              <span>Match #{match.matchNumber}</span>
                              {match.venue && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <MapPin className="w-3 h-3" />
                                  <span className="text-xs">{match.venue}</span>
                                </>
                              )}
                            </div>
                            <button
                              onClick={() => startEditingMatch(match.id)}
                              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">{match.homeTeam}</div>
                              <div className="text-sm text-gray-500">vs</div>
                              <div className="font-semibold text-gray-800">{match.awayTeam}</div>
                            </div>
                            <div className="flex gap-2 items-center">
                              <input
                                type="number"
                                min="0"
                                value={match.homeScore ?? ''}
                                onChange={(e) => updateMatchScore(match.id, e.target.value, match.awayScore?.toString() ?? '')}
                                placeholder="0"
                                className="w-16 px-2 py-2 border-2 border-gray-300 rounded text-center font-bold"
                              />
                              <span className="font-bold text-gray-600">-</span>
                              <input
                                type="number"
                                min="0"
                                value={match.awayScore ?? ''}
                                onChange={(e) => updateMatchScore(match.id, match.homeScore?.toString() ?? '', e.target.value)}
                                placeholder="0"
                                className="w-16 px-2 py-2 border-2 border-gray-300 rounded text-center font-bold"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Standings */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Classement
          </h3>
          <div className="space-y-2">
            {standings.map((team, index) => (
              <div
                key={team.name}
                className={`p-3 rounded-lg ${
                  index === 0
                    ? 'bg-yellow-100 border-2 border-yellow-400'
                    : index === 1
                    ? 'bg-gray-100 border-2 border-gray-400'
                    : index === 2
                    ? 'bg-orange-100 border-2 border-orange-400'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{index + 1}.</span>
                    {index === 0 && <Trophy className="w-5 h-5 text-yellow-600" />}
                    {index === 1 && <Medal className="w-5 h-5 text-gray-600" />}
                    {index === 2 && <Medal className="w-5 h-5 text-orange-600" />}
                    <span className="font-semibold">{team.name}</span>
                  </div>
                  <span className="font-bold text-blue-600">{team.points} pts</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 ml-7">
                  J: {team.played} | V: {team.won} | N: {team.drawn} | D: {team.lost} | +/-: {team.goalDifference}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueView;