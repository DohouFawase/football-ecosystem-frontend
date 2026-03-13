import React from 'react';
import { Users, Calendar, MapPin, Plus, Trash2, Play, Target, Edit2, Star, Medal, Trophy, Clock, ChevronRight, Sparkles, Shield } from 'lucide-react';
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

  // Design tokens
  const cardBase = "bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100";
  const inputBase = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400";
  const sectionHeader = "text-lg font-bold text-slate-900 mb-4 flex items-center gap-2";

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className={`${cardBase} p-6 md:p-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nom du Tournoi *
            </label>
            <div className="relative">
              <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="Ex: Tournoi d'Été 2024"
                className={`${inputBase} pl-12`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Lieu Principal
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Ex: Stade Municipal"
                className={`${inputBase} pl-12`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mode de Programmation */}
      <div className={`${cardBase} overflow-hidden`}>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-slate-100">
          <h3 className={sectionHeader}>
            <Calendar className="w-5 h-5 text-indigo-600" />
            Mode de Programmation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setSchedulingMode('auto')}
              className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                schedulingMode === 'auto'
                  ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-100'
                  : 'border-slate-200 bg-white/50 hover:border-indigo-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${schedulingMode === 'auto' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800">Automatique</span>
                {schedulingMode === 'auto' && <Sparkles className="w-4 h-4 text-indigo-500" />}
              </div>
              <p className="text-sm text-slate-500">Dates et heures calculées automatiquement selon vos paramètres</p>
            </button>
            
            <button
              onClick={() => setSchedulingMode('manual')}
              className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                schedulingMode === 'manual'
                  ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-100'
                  : 'border-slate-200 bg-white/50 hover:border-indigo-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${schedulingMode === 'manual' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                  <Edit2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800">Manuel</span>
                {schedulingMode === 'manual' && <Sparkles className="w-4 h-4 text-indigo-500" />}
              </div>
              <p className="text-sm text-slate-500">Vous programmez chaque match individuellement après génération</p>
            </button>
          </div>

          {schedulingMode === 'auto' && (
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Paramètres de Planification
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Date de début *</label>
                  <input
                    type="date"
                    value={scheduleConfig.startDate}
                    onChange={(e) => updateScheduleConfig('startDate', e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Heure 1er match</label>
                  <input
                    type="time"
                    value={scheduleConfig.startTime}
                    onChange={(e) => updateScheduleConfig('startTime', e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Durée (min)</label>
                  <input
                    type="number"
                    value={scheduleConfig.matchDuration}
                    onChange={(e) => updateScheduleConfig('matchDuration', parseInt(e.target.value))}
                    min="30"
                    max="120"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Pause (min)</label>
                  <input
                    type="number"
                    value={scheduleConfig.breakBetweenMatches}
                    onChange={(e) => updateScheduleConfig('breakBetweenMatches', parseInt(e.target.value))}
                    min="10"
                    max="60"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Matchs/jour</label>
                  <input
                    type="number"
                    value={scheduleConfig.matchesPerDay}
                    onChange={(e) => updateScheduleConfig('matchesPerDay', parseInt(e.target.value))}
                    min="1"
                    max="20"
                    className={inputBase}
                  />
                </div>
              </div>
            </div>
          )}

          {schedulingMode === 'manual' && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
              <div className="p-1 bg-amber-100 rounded">
                <Edit2 className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-amber-800">
                En mode manuel, vous pourrez définir la date, l'heure et le lieu de chaque match individuellement après la génération du calendrier.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Format du Tournoi */}
      <div className={cardBase + " p-6 md:p-8"}>
        <h3 className={sectionHeader}>
          <Shield className="w-5 h-5 text-indigo-600" />
          Format du Tournoi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setMode('league')}
            className={`p-5 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
              mode === 'league' 
                ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-100' 
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            {mode === 'league' && <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full" />}
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${mode === 'league' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                <Medal className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800">Championnat</span>
            </div>
            <p className="text-sm text-slate-500">Tous les équipes se rencontrent</p>
          </button>
          
          <button
            onClick={() => setMode('knockout')}
            className={`p-5 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
              mode === 'knockout' 
                ? 'border-rose-500 bg-rose-50/50 shadow-lg shadow-rose-100' 
                : 'border-slate-200 hover:border-rose-300 hover:bg-slate-50'
            }`}
          >
            {mode === 'knockout' && <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full" />}
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${mode === 'knockout' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800">Coupe</span>
            </div>
            <p className="text-sm text-slate-500">Élimination directe</p>
          </button>
          
          <button
            onClick={() => setMode('can')}
            className={`p-5 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
              mode === 'can' 
                ? 'border-amber-500 bg-amber-50/50 shadow-lg shadow-amber-100' 
                : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
            }`}
          >
            {mode === 'can' && <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full" />}
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${mode === 'can' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                <Star className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800">Format CAN</span>
            </div>
            <p className="text-sm text-slate-500">Groupes puis élimination</p>
          </button>
        </div>
      </div>

      {/* Configuration CAN */}
      {mode === 'can' && (
        <div className={`${cardBase} overflow-hidden`}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-slate-100">
            <h3 className={sectionHeader}>
              <Star className="w-5 h-5 text-amber-600" />
              Configuration Format CAN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre de groupes</label>
                <input
                  type="number"
                  value={numberOfGroups}
                  onChange={(e) => setNumberOfGroups(parseInt(e.target.value))}
                  min="2"
                  max="8"
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Qualifiés par groupe</label>
                <input
                  type="number"
                  value={teamsPerGroupToQualify}
                  onChange={(e) => setTeamsPerGroupToQualify(parseInt(e.target.value))}
                  min="1"
                  max="4"
                  className={inputBase}
                />
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600 bg-white/70 p-4 rounded-xl border border-amber-200/50 flex items-start gap-3">
              <div className="p-1 bg-amber-100 rounded mt-0.5">
                <Star className="w-4 h-4 text-amber-600" />
              </div>
              <p>Le tournoi se déroulera en 2 phases : phase de groupes puis phase à élimination directe avec les équipes qualifiées.</p>
            </div>
          </div>
        </div>
      )}

      {/* Équipes */}
      <div className={cardBase + " p-6 md:p-8"}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={sectionHeader + " mb-0"}>
            <Users className="w-5 h-5 text-indigo-600" />
            Équipes Participantes *
          </h3>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {teams.filter(t => t.trim()).length} équipe{teams.filter(t => t.trim()).length > 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="space-y-3">
          {teams.map((team, index) => (
            <div key={index} className="flex gap-3 group">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={team}
                  onChange={(e) => updateTeam(index, e.target.value)}
                  placeholder={`Nom de l'équipe ${index + 1}`}
                  className={`${inputBase} pl-10`}
                />
              </div>
              {teams.length > 1 && (
                <button
                  onClick={() => removeTeam(index)}
                  className="px-4 py-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors border border-rose-200 hover:border-rose-300"
                  title="Supprimer cette équipe"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={addTeam}
          className="mt-4 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold border-2 border-dashed border-slate-300 hover:border-slate-400"
        >
          <Plus className="w-5 h-5" />
          Ajouter une Équipe
        </button>
      </div>

      {/* Bouton Générer */}
      <button
        onClick={onGenerate}
        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-0.5"
      >
        <Play className="w-6 h-6 fill-current" />
        Générer le Calendrier
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TournamentConfig;