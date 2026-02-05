import React from 'react';
import { Users, Calendar, MapPin, Plus, Trash2, Play, Target, Edit2, Star, Medal, Trophy } from 'lucide-react';
import { TournamentMode, SchedulingMode, ScheduleConfig } from '@/types/tournament.types';

interface TournamentConfigProps {
  teams: string[];
  setTeams: (teams: string[]) => void;
  tournamentName: string;
  setTournamentName: (name: string) => void;
  mode: TournamentMode;
  setMode: (mode: TournamentMode) => void;
  venue: string;
  setVenue: (venue: string) => void;
  schedulingMode: SchedulingMode;
  setSchedulingMode: (mode: SchedulingMode) => void;
  scheduleConfig: ScheduleConfig;
  setScheduleConfig: (config: ScheduleConfig) => void;
  numberOfGroups: number;
  setNumberOfGroups: (num: number) => void;
  teamsPerGroupToQualify: number;
  setTeamsPerGroupToQualify: (num: number) => void;
  onGenerate: () => void;
}

const TournamentConfig: React.FC<TournamentConfigProps> = ({
  teams,
  setTeams,
  tournamentName,
  setTournamentName,
  mode,
  setMode,
  venue,
  setVenue,
  schedulingMode,
  setSchedulingMode,
  scheduleConfig,
  setScheduleConfig,
  numberOfGroups,
  setNumberOfGroups,
  teamsPerGroupToQualify,
  setTeamsPerGroupToQualify,
  onGenerate
}) => {
  const addTeam = () => setTeams([...teams, '']);
  
  const removeTeam = (index: number) => setTeams(teams.filter((_, i) => i !== index));
  
  const updateTeam = (index: number, value: string) => {
    const newTeams = [...teams];
    newTeams[index] = value;
    setTeams(newTeams);
  };

  const updateScheduleConfig = (field: keyof ScheduleConfig, value: string | number) => {
    setScheduleConfig({ ...scheduleConfig, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-blue-500" />
        Configuration du Tournoi
      </h2>

      {/* Nom et Lieu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom du Tournoi *
          </label>
          <input
            type="text"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            placeholder="Ex: Tournoi d'Été 2024"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Lieu Principal
          </label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Ex: Stade Municipal"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Mode de Programmation */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Mode de Programmation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setSchedulingMode('auto')}
            className={`p-4 rounded-lg border-2 transition-all ${
              schedulingMode === 'auto'
                ? 'border-purple-500 bg-purple-100'
                : 'border-gray-300 hover:border-purple-300'
            }`}
          >
            <div className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              Automatique
            </div>
            <div className="text-sm text-gray-600">Dates/heures calculées automatiquement</div>
          </button>
          
          <button
            onClick={() => setSchedulingMode('manual')}
            className={`p-4 rounded-lg border-2 transition-all ${
              schedulingMode === 'manual'
                ? 'border-purple-500 bg-purple-100'
                : 'border-gray-300 hover:border-purple-300'
            }`}
          >
            <div className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
              <Edit2 className="w-5 h-5" />
              Manuel
            </div>
            <div className="text-sm text-gray-600">Vous programmez chaque match</div>
          </button>
        </div>

        {schedulingMode === 'auto' && (
          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <h4 className="font-semibold mb-3 text-gray-700">Paramètres Automatiques</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date de début *</label>
                <input
                  type="date"
                  value={scheduleConfig.startDate}
                  onChange={(e) => updateScheduleConfig('startDate', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Heure 1er match</label>
                <input
                  type="time"
                  value={scheduleConfig.startTime}
                  onChange={(e) => updateScheduleConfig('startTime', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Durée match (min)</label>
                <input
                  type="number"
                  value={scheduleConfig.matchDuration}
                  onChange={(e) => updateScheduleConfig('matchDuration', parseInt(e.target.value))}
                  min="30"
                  max="120"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pause (min)</label>
                <input
                  type="number"
                  value={scheduleConfig.breakBetweenMatches}
                  onChange={(e) => updateScheduleConfig('breakBetweenMatches', parseInt(e.target.value))}
                  min="10"
                  max="60"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Matchs/jour</label>
                <input
                  type="number"
                  value={scheduleConfig.matchesPerDay}
                  onChange={(e) => updateScheduleConfig('matchesPerDay', parseInt(e.target.value))}
                  min="1"
                  max="20"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {schedulingMode === 'manual' && (
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-700">
              ℹ️ Après génération, vous pourrez définir la date, l'heure et le lieu de chaque match individuellement.
            </p>
          </div>
        )}
      </div>

      {/* Format du Tournoi */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Format du Tournoi</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setMode('league')}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === 'league' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
              <Medal className="w-5 h-5" />
              Championnat
            </div>
            <div className="text-sm text-gray-600">Tous contre tous</div>
          </button>
          
          <button
            onClick={() => setMode('knockout')}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === 'knockout' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              Coupe
            </div>
            <div className="text-sm text-gray-600">Élimination directe</div>
          </button>
          
          <button
            onClick={() => setMode('can')}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === 'can' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
              <Star className="w-5 h-5" />
              Format CAN
            </div>
            <div className="text-sm text-gray-600">Groupes + Élimination</div>
          </button>
        </div>
      </div>

      {/* Configuration CAN */}
      {mode === 'can' && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-green-600" />
            Configuration Format CAN
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de groupes
              </label>
              <input
                type="number"
                value={numberOfGroups}
                onChange={(e) => setNumberOfGroups(parseInt(e.target.value))}
                min="2"
                max="8"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Équipes qualifiées par groupe
              </label>
              <input
                type="number"
                value={teamsPerGroupToQualify}
                onChange={(e) => setTeamsPerGroupToQualify(parseInt(e.target.value))}
                min="1"
                max="4"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600 bg-white p-3 rounded">
            ℹ️ Le tournoi se déroulera en 2 phases : d'abord la phase de groupes, puis la phase à élimination directe avec les équipes qualifiées.
          </div>
        </div>
      )}

      {/* Équipes */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Équipes Participantes *</label>
        <div className="space-y-3">
          {teams.map((team, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={team}
                onChange={(e) => updateTeam(index, e.target.value)}
                placeholder={`Équipe ${index + 1}`}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              {teams.length > 1 && (
                <button
                  onClick={() => removeTeam(index)}
                  className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addTeam}
          className="mt-3 w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Ajouter une Équipe
        </button>
      </div>

      {/* Bouton Générer */}
      <button
        onClick={onGenerate}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
      >
        <Play className="w-6 h-6" />
        Générer le Calendrier
      </button>
    </div>
  );
};

export default TournamentConfig;