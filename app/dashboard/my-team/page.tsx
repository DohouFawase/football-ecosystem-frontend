'use client';
import React, { useState, useMemo } from 'react';
import { 
  Trophy, Users, Calendar, MapPin, TrendingUp, Star, 
  Shield, Activity, ChevronRight, Award, Target, Zap,
  ArrowUpRight, BarChart3, X, Play, ArrowLeft, ArrowRight
} from 'lucide-react';

const TeamProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [positionFilter, setPositionFilter] = useState('Tous');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [activeStatTab, setActiveStatTab] = useState('offensive');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const team = {
    name: "TODAGBA FC",
    shortName: "RD",
    founded: 2020,
    stadium: "Parc des Lumières",
    capacity: "42,500",
    location: "Cotonou, Bénin",
    league: "Jurasse League",
    position: 2,
    points: 61,
    description: "Un club ambitieux alliant tradition et innovation.",
    manager: "OLAIDE Rachard"
  };

  const players = [
    { id: 1, name: "DOHOU Fawase", position: "Gardien", number: 1, age: 37, nationality: "France", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", stats: { matches: 28, cleanSheets: 14, saves: 94, rating: 7.8 }, bio: "Capitaine emblématique.", joined: "2023" },
    { id: 2, name: "ABOU Malick", position: "Défenseur", number: 2, age: 23, nationality: "France", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", stats: { matches: 30, goals: 3, assists: 1, rating: 7.5 }, bio: "Défenseur solide.", joined: "2022" },
    { id: 3, name: "ODOULAMI James", position: "Milieu", number: 33, age: 18, nationality: "France", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", stats: { matches: 29, goals: 6, assists: 9, rating: 7.9 }, bio: "Jeune prodige.", joined: "2022" },
    { id: 4, name: "OLAITAN ALIM", position: "Milieu", number: 7, age: 26, nationality: "Bénin", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop", stats: { matches: 28, goals: 26, assists: 7, rating: 8.4 }, bio: "Meilleur buteur.", joined: "2024" },
    { id: 5, name: "OYELANKAN Loïc", position: "Attaquant", number: 10, age: 27, nationality: "France", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop", stats: { matches: 27, goals: 12, assists: 11, rating: 7.7 }, bio: "Ailier rapide.", joined: "2023" },
    { id: 6, name: "ADJIBI Mouizou", position: "Gardien", number: 16, age: 29, nationality: "France", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", stats: { matches: 2, cleanSheets: 1, saves: 8, rating: 7.2 }, bio: "Gardien de classe.", joined: "2024" },
    { id: 7, name: "Dayot Upamecano", position: "Défenseur", number: 4, age: 26, nationality: "France", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", stats: { matches: 25, goals: 1, assists: 0, rating: 7.3 }, bio: "Défenseur central.", joined: "2023" },
    { id: 8, name: "Eduardo Camavinga", position: "Milieu", number: 6, age: 22, nationality: "France", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", stats: { matches: 26, goals: 2, assists: 4, rating: 7.4 }, bio: "Milieu polyvalent.", joined: "2023" },
    { id: 9, name: "Randal Kolo Muani", position: "Attaquant", number: 9, age: 26, nationality: "France", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop", stats: { matches: 24, goals: 8, assists: 5, rating: 7.1 }, bio: "Attaquant complet.", joined: "2024" },
  ];

  const matches = [
    { id: 1, opponent: "Paris Saint-Germain", date: "15 Mars 2026", result: "W", score: "2-1", venue: "Domicile", competition: "Ligue 1", scorers: ["DOHOU JEAN 23'", "Dembélé 67'"], possession: { home: 48, away: 52 }, shots: { home: 14, away: 12 } },
    { id: 2, opponent: "Olympique de Marseille", date: "09 Mars 2026", result: "W", score: "3-0", venue: "Extérieur", competition: "Ligue 1", scorers: ["DOHOU JEAN 12'", "DOHOU JEAN 45'", "Zaïre-Emery 78'"], possession: { home: 45, away: 55 }, shots: { home: 8, away: 18 } },
    { id: 3, opponent: "AS Monaco", date: "02 Mars 2026", result: "D", score: "1-1", venue: "Domicile", competition: "Ligue 1", scorers: ["Saliba 34'"], possession: { home: 58, away: 42 }, shots: { home: 16, away: 9 } },
    { id: 4, opponent: "Lille OSC", date: "23 Fév 2026", result: "W", score: "2-0", venue: "Extérieur", competition: "Ligue 1", scorers: ["DOHOU JEAN 56'", "Kolo Muani 89'"], possession: { home: 50, away: 50 }, shots: { home: 10, away: 13 } },
    { id: 5, opponent: "Stade Rennais", date: "16 Fév 2026", result: "L", score: "0-1", venue: "Domicile", competition: "Ligue 1", scorers: [], possession: { home: 62, away: 38 }, shots: { home: 20, away: 7 } },
  ];

  const achievements = [
    { year: "2025", title: "Champion de France", icon: Trophy },
    { year: "2024", title: "Coupe de la Ligue", icon: Award },
    { year: "2023", title: "Trophée des Champions", icon: Star },
    { year: "2019", title: "Ligue Europa", icon: Shield },
  ];

  const statsData = {
    offensive: [
      { label: "Buts marqués", value: 58, max: 80, color: "from-orange-400 to-red-500" },
      { label: "Tirs par match", value: 15.2, max: 20, color: "from-blue-400 to-blue-600" },
      { label: "Possession", value: 62, max: 100, suffix: "%", color: "from-green-400 to-emerald-600" },
      { label: "Passes réussies", value: 89, max: 100, suffix: "%", color: "from-purple-400 to-purple-600" },
    ],
    defensive: [
      { label: "Buts encaissés", value: 24, max: 60, color: "from-green-400 to-emerald-600" },
      { label: "Clean sheets", value: 14, max: 30, color: "from-blue-400 to-blue-600" },
      { label: "Interceptions", value: 245, max: 300, color: "from-orange-400 to-red-500" },
      { label: "Duels gagnés", value: 52, max: 100, suffix: "%", color: "from-purple-400 to-purple-600" },
    ],
    individual: [
      { player: "DOHOU JEAN", stat: "Buts", value: 26 },
      { player: "Dembélé", stat: "Passes D", value: 11 },
      { player: "Zaïre-Emery", stat: "Note", value: 7.9 },
      { player: "Lloris", stat: "Arrêts", value: 94 },
    ]
  };

  const filteredPlayers = useMemo(() => {
    if (positionFilter === 'Tous') return players;
    return players.filter(p => p.position === positionFilter.slice(0, -1));
  }, [positionFilter]);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player.id);
    setShowPlayerModal(true);
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setShowMatchDetails(true);
  };

  const handleVideoClick = (match) => {
    setCurrentVideo(match);
    setShowVideoModal(true);
  };

  const getResultColor = (result) => {
    switch(result) {
      case 'W': return 'bg-emerald-500 text-white';
      case 'D': return 'bg-amber-400 text-white';
      case 'L': return 'bg-rose-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getResultText = (result) => {
    switch(result) {
      case 'W': return 'Victoire';
      case 'D': return 'Nul';
      case 'L': return 'Défaite';
      default: return result;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
              {team.shortName}
            </div>
            <span className="font-bold text-xl tracking-tight">{team.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <button onClick={() => setActiveTab('squad')} className={`hover:text-orange-500 transition-colors ${activeTab === 'squad' ? 'text-orange-500' : ''}`}>Effectif</button>
            <button onClick={() => setActiveTab('matches')} className={`hover:text-orange-500 transition-colors ${activeTab === 'matches' ? 'text-orange-500' : ''}`}>Calendrier</button>
            <button onClick={() => setActiveTab('stats')} className={`hover:text-orange-500 transition-colors ${activeTab === 'stats' ? 'text-orange-500' : ''}`}>Statistiques</button>
          </nav>
          <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Espace Fan</button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">{team.league}</span>
                <span className="flex items-center gap-2 text-gray-500 text-sm"><MapPin size={16} />{team.location}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                Stade<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">MELBECK</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">{team.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                  <Calendar className="text-orange-500" size={20} />
                  <div><p className="text-gray-400 text-xs uppercase font-semibold">Fondé en</p><p className="font-bold text-gray-900">{team.founded}</p></div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                  <Users className="text-orange-500" size={20} />
                  <div><p className="text-gray-400 text-xs uppercase font-semibold">Stade</p><p className="font-bold text-gray-900">{team.capacity}</p></div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                  <Shield className="text-orange-500" size={20} />
                  <div><p className="text-gray-400 text-xs uppercase font-semibold">Entraîneur</p><p className="font-bold text-gray-900">{team.manager}</p></div>
                </div>
              </div>
            </div>

            <div className="lg:w-80 w-full">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl shadow-gray-900/20">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-gray-400 text-sm font-medium">Classement Actuel</span>
                  <TrendingUp className="text-emerald-400" size={24} />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-7xl font-black">#{team.position}</span>
                  <span className="text-emerald-400 font-bold text-lg">↑2</span>
                </div>
                <p className="text-gray-400 mb-8">sur 20 équipes</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-t border-gray-700">
                    <span className="text-gray-400">Points</span>
                    <span className="text-2xl font-bold">{team.points}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-700">
                    <span className="text-gray-400">Forme</span>
                    <div className="flex gap-1">
                      {['W', 'W', 'D', 'W', 'L'].map((r, i) => (
                        <span key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold cursor-pointer hover:scale-110 transition-transform ${r === 'W' ? 'bg-emerald-500' : r === 'D' ? 'bg-amber-400' : 'bg-rose-500'}`}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-orange-50 rounded-2xl p-6 border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => setActiveTab('matches')}>
                <p className="text-orange-600 text-xs font-bold uppercase mb-3">Prochain Match</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-2 font-bold text-gray-900">TD</div>
                    <span className="text-xs font-medium">TODAGBA</span>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-2xl font-black text-gray-400">VS</p>
                    <p className="text-xs text-gray-500 mt-1">Dim 22 Mars</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-900 rounded-xl shadow-sm flex items-center justify-center mb-2 text-white font-bold text-xs">ADG</div>
                    <span className="text-xs font-medium">ADIEME SG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'overview', label: "Vue d'ensemble", icon: Activity },
              { id: 'squad', label: 'Effectif', icon: Users },
              { id: 'matches', label: 'Matchs', icon: Calendar },
              { id: 'stats', label: 'Statistiques', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-all font-medium text-sm ${activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Matchs", value: "30", sub: "18V 8N 4D", icon: Activity, color: "blue", onClick: () => setActiveTab('matches') },
                { label: "Buts", value: "58", sub: "1.93/match", icon: Target, color: "orange", onClick: () => setActiveTab('stats') },
                { label: "Clean Sheets", value: "14", sub: "47%", icon: Shield, color: "emerald", onClick: () => setActiveTab('stats') },
                { label: "Meilleur Buteur", value: "JEAN", sub: "26 buts", icon: Trophy, color: "purple", onClick: () => { setActiveTab('squad'); setPositionFilter('Milieux'); }},
              ].map((stat, idx) => (
                <div key={idx} onClick={stat.onClick} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : stat.color === 'orange' ? 'bg-orange-50 text-orange-600' : stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-900">Derniers Résultats</h3>
                  <button onClick={() => setActiveTab('matches')} className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Voir tout <ChevronRight size={16} /></button>
                </div>
                <div className="space-y-4">
                  {matches.slice(0, 3).map((match, idx) => (
                    <div key={idx} onClick={() => handleMatchClick(match)} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${getResultColor(match.result)}`}>{match.result}</span>
                        <div>
                          <p className="font-bold text-gray-900">vs {match.opponent}</p>
                          <p className="text-sm text-gray-500">{match.date} • {match.competition}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-black text-gray-900">{match.score}</span>
                        <ArrowUpRight className="text-gray-400 group-hover:text-orange-500 transition-colors" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <Trophy className="text-orange-500" size={24} /> Palmarès
                </h3>
                <div className="space-y-6">
                  {achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <achievement.icon className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{achievement.title}</p>
                        <p className="text-sm text-gray-500">{achievement.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'squad' && (
          <div className="space-y-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Tous', 'Gardiens', 'Défenseurs', 'Milieux', 'Attaquants'].map((pos, idx) => (
                <button
                  key={pos}
                  onClick={() => setPositionFilter(pos)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${positionFilter === pos ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  {pos}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player) => (
                <div key={player.id} onClick={() => handlePlayerClick(player)} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="relative h-64 overflow-hidden bg-gradient-to-b from-gray-100 to-white">
                    <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-black text-gray-900">{player.number}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent p-6 pt-12">
                      <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">{player.position}</p>
                      <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-500">{player.nationality} • {player.age} ans</p>
                    </div>
                  </div>
                  <div className="p-6 pt-2">
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
                      <span>Cliquez pour voir les stats</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlayers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucun joueur trouvé pour cette position</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tous les matchs</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">Saison 2025-2026</button>
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Saison 2024-2025</button>
              </div>
            </div>

            {matches.map((match, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleMatchClick(match)}>
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold transition-transform hover:scale-105 ${getResultColor(match.result)}`}>
                      <span className="text-lg">{match.result}</span>
                      <span className="text-[10px] uppercase font-medium opacity-80">{getResultText(match.result)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">{match.competition}</span>
                        <span className="text-sm text-gray-400">{match.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">vs {match.opponent}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1"><MapPin size={14} />{match.venue === 'Domicile' ? 'Parc des Lumières' : 'Stade extérieur'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900">{match.score}</p>
                    <p className="text-sm text-gray-400 mt-1">Score final</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
                  <button onClick={() => handleVideoClick(match)} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                    <Play size={16} fill="currentColor" />Résumé vidéo
                  </button>
                  <button onClick={() => handleMatchClick(match)} className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    <BarChart3 size={16} />Statistiques
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">
                    <Users size={16} />Compo équipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="flex gap-4 border-b border-gray-200">
              {[
                { id: 'offensive', label: 'Offensif', icon: Zap },
                { id: 'defensive', label: 'Défensif', icon: Shield },
                { id: 'individual', label: 'Individuel', icon: Trophy },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveStatTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 border-b-2 transition-all font-medium ${activeStatTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                >
                  <tab.icon size={18} />{tab.label}
                </button>
              ))}
            </div>

            {activeStatTab === 'offensive' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center"><Zap className="text-orange-600" size={24} /></div>
                    <div><h3 className="text-xl font-bold text-gray-900">Performance Offensive</h3><p className="text-sm text-gray-500">Saison 2025-2026</p></div>
                  </div>
                  <div className="space-y-6">
                    {statsData.offensive.map((stat, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 font-medium">{stat.label}</span>
                          <span className="font-bold text-gray-900 text-lg">{stat.value}{stat.suffix || ''}</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`} style={{ width: `${(stat.value / stat.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Buts par compétition</h3>
                  <div className="space-y-4">
                    {[{ comp: 'Ligue 1', goals: 45, color: 'bg-blue-500' }, { comp: 'Coupe de France', goals: 8, color: 'bg-orange-500' }, { comp: 'Ligue des Champions', goals: 5, color: 'bg-purple-500' }].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <span className="w-32 text-sm font-medium text-gray-600">{item.comp}</span>
                        <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} flex items-center justify-end px-3 text-white text-sm font-bold`} style={{ width: `${(item.goals / 50) * 100}%` }}>{item.goals}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeStatTab === 'defensive' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center"><Shield className="text-blue-600" size={24} /></div>
                    <div><h3 className="text-xl font-bold text-gray-900">Performance Défensive</h3><p className="text-sm text-gray-500">Saison 2025-2026</p></div>
                  </div>
                  <div className="space-y-6">
                    {statsData.defensive.map((stat, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 font-medium">{stat.label}</span>
                          <span className="font-bold text-gray-900 text-lg">{stat.value}{stat.suffix || ''}</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`} style={{ width: `${(stat.value / stat.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Comparaison Ligue 1</h3>
                  <div className="space-y-6">
                    {[{ label: 'Buts encaissés', team: 0.8, avg: 1.2 }, { label: 'Clean sheets', team: 47, avg: 32 }, { label: 'Duels défensifs', team: 52, avg: 48 }].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-gray-600">{item.label}</span><span className="font-medium text-gray-900">{item.team} vs {item.avg} (moy)</span></div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-2 bg-orange-500 rounded-full" style={{ width: `${(item.team / (item.team + item.avg)) * 100}%` }} />
                          <div className="flex-1 h-2 bg-gray-300 rounded-full" style={{ width: `${(item.avg / (item.team + item.avg)) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeStatTab === 'individual' && (
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8">Leaders statistiques</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsData.individual.map((item, idx) => (
                    <div key={idx} onClick={() => setActiveTab('squad')} className="bg-gray-50 rounded-2xl p-6 text-center cursor-pointer hover:bg-gray-100 transition-colors group">
                      <p className="text-sm text-gray-500 mb-2">{item.stat}</p>
                      <p className="text-3xl font-black text-orange-600 mb-2">{item.value}</p>
                      <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.player}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Player Modal */}
      {showPlayerModal && selectedPlayer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPlayerModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {players.filter(p => p.id === selectedPlayer).map(player => (
              <div key={player.id}>
                <div className="relative h-64 bg-gradient-to-b from-gray-100 to-white">
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
                  <button onClick={() => setShowPlayerModal(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"><X size={20} /></button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-8 pt-20">
                    <p className="text-orange-600 text-sm font-bold uppercase tracking-wider">{player.position}</p>
                    <h2 className="text-3xl font-black text-gray-900">{player.name}</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                      <p className="text-2xl font-bold text-gray-900">{player.stats.matches}</p>
                      <p className="text-xs text-gray-500 uppercase">Matchs</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                      <p className="text-2xl font-bold text-orange-600">{player.stats.goals !== undefined ? player.stats.goals : player.stats.cleanSheets}</p>
                      <p className="text-xs text-gray-500 uppercase">{player.stats.goals !== undefined ? 'Buts' : 'CS'}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                      <p className="text-2xl font-bold text-gray-900">{player.stats.assists !== undefined ? player.stats.assists : player.stats.saves}</p>
                      <p className="text-xs text-gray-500 uppercase">{player.stats.assists !== undefined ? 'Passes D' : 'Arrêts'}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                      <p className="text-2xl font-bold text-gray-900">{player.stats.rating}</p>
                      <p className="text-xs text-gray-500 uppercase">Note</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Nationalité</span><span className="font-medium">{player.nationality}</span></div>
                    <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Âge</span><span className="font-medium">{player.age} ans</span></div>
                    <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Numéro</span><span className="font-medium">{player.number}</span></div>
                    <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Arrivée</span><span className="font-medium">{player.joined}</span></div>
                  </div>
                  <div className="mt-6 p-4 bg-orange-50 rounded-2xl"><p className="text-sm text-gray-700">{player.bio}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Match Details Modal */}
      {showMatchDetails && selectedMatch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMatchDetails(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{selectedMatch.competition}</span>
                <button onClick={() => setShowMatchDetails(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="text-center flex-1">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-3 flex items-center justify-center font-bold text-2xl">SE</div>
                  <p className="font-bold">Stade Éclatant</p>
                </div>
                <div className="text-center px-8">
                  <p className="text-4xl font-black text-gray-900">{selectedMatch.score}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedMatch.date}</p>
                </div>
                <div className="text-center flex-1">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-3 flex items-center justify-center font-bold text-xl">{selectedMatch.opponent.substring(0, 2).toUpperCase()}</div>
                  <p className="font-bold">{selectedMatch.opponent}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 mb-3">Buteurs</h4>
                {selectedMatch.scorers.length > 0 ? selectedMatch.scorers.map((scorer, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-orange-600 text-xs font-bold">⚽</span></div>
                    <span className="font-medium">{scorer}</span>
                  </div>
                )) : <p className="text-gray-500 text-sm">Aucun but marqué</p>}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-500 mb-1">Possession</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{selectedMatch.possession.home}%</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-orange-500" style={{ width: `${selectedMatch.possession.home}%` }} /></div>
                    <span className="font-bold">{selectedMatch.possession.away}%</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-500 mb-1">Tirs</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{selectedMatch.shots.home}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${(selectedMatch.shots.home / (selectedMatch.shots.home + selectedMatch.shots.away)) * 100}%` }} /></div>
                    <span className="font-bold">{selectedMatch.shots.away}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => { setShowMatchDetails(false); handleVideoClick(selectedMatch); }} className="w-full mt-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <Play size={20} fill="currentColor" />Voir le résumé vidéo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && currentVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShowVideoModal(false)}>
          <div className="bg-gray-900 rounded-3xl max-w-4xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <h3 className="text-white font-bold">Résumé: Stade Éclatant vs {currentVideo.opponent}</h3>
              <button onClick={() => setShowVideoModal(false)} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-white"><X size={20} /></button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center text-white">
                <Play size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Lecteur vidéo</p>
                <p className="text-sm text-gray-400 mt-2">Contenu vidéo simulé</p>
              </div>
            </div>
            <div className="p-6 bg-gray-900">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="font-bold text-lg">{currentVideo.score}</p>
                  <p className="text-sm text-gray-400">{currentVideo.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors"><ArrowLeft size={20} /></button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors"><ArrowRight size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamProfile;