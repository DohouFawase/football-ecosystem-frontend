'use client';
import React, { useState } from 'react';
import { 
  Trophy, Users, Calendar, MapPin, TrendingUp, Star, 
  Shield, Activity, ChevronRight, Award, Target, Zap,
  ArrowUpRight, Clock, Flag, Shirt, BarChart3
} from 'lucide-react';

const TeamProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState(null);

  const team = {
    name: "Stade Éclatant",
    shortName: "SE",
    founded: 1987,
    stadium: "Parc des Lumières",
    capacity: "42,500",
    location: "Lyon, France",
    league: "Ligue 1 Uber Eats",
    position: 2,
    points: 61,
    logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&h=200&fit=crop",
    colors: ["#FF6B35", "#004E89"],
    description: "Un club ambitieux alliant tradition et innovation, connu pour son football offensif et son engagement communautaire.",
    manager: "Lucas Bernard",
    captain: "Hugo Lloris"
  };

  const players = [
    { 
      id: 1, 
      name: "Hugo Lloris", 
      position: "Gardien", 
      number: 1, 
      age: 37, 
      nationality: "France", 
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", 
      stats: { matches: 28, cleanSheets: 14, saves: 94, rating: 7.8 }
    },
    { 
      id: 2, 
      name: "William Saliba", 
      position: "Défenseur", 
      number: 2, 
      age: 23, 
      nationality: "France", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", 
      stats: { matches: 30, goals: 3, assists: 1, rating: 7.5 }
    },
    { 
      id: 3, 
      name: "Warren Zaïre-Emery", 
      position: "Milieu", 
      number: 33, 
      age: 18, 
      nationality: "France", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", 
      stats: { matches: 29, goals: 6, assists: 9, rating: 7.9 }
    },
    { 
      id: 4, 
      name: "DOHOU JEAN", 
      position: "Milieu", 
      number: 7, 
      age: 26, 
      nationality: "Bénin", 
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop", 
      stats: { matches: 28, goals: 26, assists: 7, rating: 8.4 }
    },
    { 
      id: 5, 
      name: "Ousmane Dembélé", 
      position: "Attaquant", 
      number: 10, 
      age: 27, 
      nationality: "France", 
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop", 
      stats: { matches: 27, goals: 12, assists: 11, rating: 7.7 }
    },
  ];

  const matches = [
    { opponent: "Paris Saint-Germain", date: "15 Mars 2026", result: "W", score: "2-1", venue: "Domicile", competition: "Ligue 1" },
    { opponent: "Olympique de Marseille", date: "09 Mars 2026", result: "W", score: "3-0", venue: "Extérieur", competition: "Ligue 1" },
    { opponent: "AS Monaco", date: "02 Mars 2026", result: "D", score: "1-1", venue: "Domicile", competition: "Ligue 1" },
    { opponent: "Lille OSC", date: "23 Fév 2026", result: "W", score: "2-0", venue: "Extérieur", competition: "Ligue 1" },
    { opponent: "Stade Rennais", date: "16 Fév 2026", result: "L", score: "0-1", venue: "Domicile", competition: "Ligue 1" },
  ];

  const achievements = [
    { year: "2025", title: "Champion de France", count: 1, icon: Trophy },
    { year: "2024", title: "Coupe de la Ligue", count: 1, icon: Award },
    { year: "2023", title: "Trophée des Champions", count: 1, icon: Star },
    { year: "2019", title: "Ligue Europa", count: 1, icon: Shield },
  ];

  const statsData = {
    offensive: [
      { label: "Buts marqués", value: 58, max: 80, color: "from-orange-400 to-red-500" },
      { label: "Tirs par match", value: 15.2, max: 20, color: "from-blue-400 to-blue-600" },
      { label: "Possession", value: 62, max: 100, suffix: "%", color: "from-green-400 to-emerald-600" },
      { label: "Passes réussies", value: 89, max: 100, suffix: "%", color: "from-purple-400 to-purple-600" },
    ],
    defensive: [
      { label: "Buts encaissés", value: 24, max: 60, inverse: true, color: "from-green-400 to-emerald-600" },
      { label: "Clean sheets", value: 14, max: 30, color: "from-blue-400 to-blue-600" },
      { label: "Interceptions", value: 245, max: 300, color: "from-orange-400 to-red-500" },
      { label: "Duels gagnés", value: 52, max: 100, suffix: "%", color: "from-purple-400 to-purple-600" },
    ]
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
      {/* Header - Clean White with Accent */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
              {team.shortName}
            </div>
            <span className="font-bold text-xl tracking-tight">{team.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <button className="hover:text-orange-500 transition-colors">Effectif</button>
            <button className="hover:text-orange-500 transition-colors">Calendrier</button>
            <button className="hover:text-orange-500 transition-colors">Classement</button>
            <button className="hover:text-orange-500 transition-colors">Billetterie</button>
          </nav>
          <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Espace Fan
          </button>
        </div>
      </header>

      {/* Hero Section - Light & Airy */}
      <section className="bg-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Team Identity */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  {team.league}
                </span>
                <span className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={16} />
                  {team.location}
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                Stade<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  Éclatant
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                {team.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                  <Calendar className="text-orange-500" size={20} />
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-semibold">Fondé en</p>
                    <p className="font-bold text-gray-900">{team.founded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                  <Users className="text-orange-500" size={20} />
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-semibold">Stade</p>
                    <p className="font-bold text-gray-900">{team.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                  <Shield className="text-orange-500" size={20} />
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-semibold">Entraîneur</p>
                    <p className="font-bold text-gray-900">{team.manager}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Position Card */}
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
                        <span key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                          ${r === 'W' ? 'bg-emerald-500' : r === 'D' ? 'bg-amber-400' : 'bg-rose-500'}`}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Match Teaser */}
              <div className="mt-6 bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <p className="text-orange-600 text-xs font-bold uppercase mb-3">Prochain Match</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-2 font-bold text-gray-900">
                      SE
                    </div>
                    <span className="text-xs font-medium">Stade Éclatant</span>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-2xl font-black text-gray-400">VS</p>
                    <p className="text-xs text-gray-500 mt-1">Dim 22 Mars</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-900 rounded-xl shadow-sm flex items-center justify-center mb-2 text-white font-bold text-xs">
                      PSG
                    </div>
                    <span className="text-xs font-medium">Paris SG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs - Minimal */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
              { id: 'squad', label: 'Effectif', icon: Users },
              { id: 'matches', label: 'Matchs', icon: Calendar },
              { id: 'stats', label: 'Statistiques', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-all font-medium text-sm
                  ${activeTab === tab.id 
                    ? 'border-orange-500 text-orange-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
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
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Matchs", value: "30", sub: "18V 8N 4D", icon: Activity, color: "blue" },
                { label: "Buts", value: "58", sub: "1.93/match", icon: Target, color: "orange" },
                { label: "Clean Sheets", value: "14", sub: "47%", icon: Shield, color: "emerald" },
                { label: "Meilleur Buteur", value: "JEAN", sub: "26 buts", icon: Trophy, color: "purple" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4
                    ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                      stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-purple-50 text-purple-600'}`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Form */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-900">Derniers Résultats</h3>
                  <button className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Voir tout <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {matches.slice(0, 3).map((match, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm
                          ${getResultColor(match.result)}`}>
                          {match.result}
                        </span>
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

              {/* Achievements */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <Trophy className="text-orange-500" size={24} />
                  Palmarès
                </h3>
                <div className="space-y-6">
                  {achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center flex-shrink-0">
                        <achievement.icon className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{achievement.title}</p>
                        <p className="text-sm text-gray-500">{achievement.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors">
                  Voir l'historique complet
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'squad' && (
          <div className="space-y-8">
            {/* Position Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Tous', 'Gardiens', 'Défenseurs', 'Milieux', 'Attaquants'].map((pos, idx) => (
                <button
                  key={pos}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                    ${idx === 0 ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Players Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map((player) => (
                <div 
                  key={player.id}
                  onClick={() => setSelectedPlayer(selectedPlayer === player.id ? null : player.id)}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-b from-gray-100 to-white">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <span className="text-2xl font-black text-gray-900">{player.number}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent p-6 pt-12">
                      <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">{player.position}</p>
                      <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-500">{player.nationality} • {player.age} ans</p>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-2">
                    {selectedPlayer === player.id ? (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">{player.stats.matches}</p>
                          <p className="text-xs text-gray-500 uppercase">Matchs</p>
                        </div>
                        <div className="text-center border-l border-gray-100">
                          <p className="text-xl font-bold text-orange-600">
                            {player.stats.goals !== undefined ? player.stats.goals : player.stats.cleanSheets}
                          </p>
                          <p className="text-xs text-gray-500 uppercase">
                            {player.stats.goals !== undefined ? 'Buts' : 'CS'}
                          </p>
                        </div>
                        <div className="text-center border-l border-gray-100">
                          <p className="text-xl font-bold text-gray-900">{player.stats.rating}</p>
                          <p className="text-xs text-gray-500 uppercase">Note</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
                        <span>Cliquez pour voir les stats</span>
                        <ChevronRight size={16} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="space-y-6">
            {matches.map((match, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredMatch(idx)}
                onMouseLeave={() => setHoveredMatch(null)}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold transition-colors
                      ${getResultColor(match.result)}`}>
                      <span className="text-lg">{match.result}</span>
                      <span className="text-[10px] uppercase font-medium opacity-80">{getResultText(match.result)}</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                          {match.competition}
                        </span>
                        <span className="text-sm text-gray-400">{match.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">vs {match.opponent}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <MapPin size={14} />
                        {match.venue === 'Domicile' ? 'Parc des Lumières' : 'Stade extérieur'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900">{match.score}</p>
                    <p className="text-sm text-gray-400 mt-1">Score final</p>
                  </div>
                </div>

                {hoveredMatch === idx && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 animate-in fade-in">
                    <button className="flex-1 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                      Résumé vidéo
                    </button>
                    <button className="flex-1 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                      Statistiques
                    </button>
                    <button className="flex-1 py-2 bg-orange-50 rounded-lg text-sm font-medium text-orange-600 hover:bg-orange-100 transition-colors">
                      Compo équipe
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Offensive Stats */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Zap className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Performance Offensive</h3>
                  <p className="text-sm text-gray-500">Saison 2025-2026</p>
                </div>
              </div>

              <div className="space-y-6">
                {statsData.offensive.map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">{stat.label}</span>
                      <span className="font-bold text-gray-900 text-lg">
                        {stat.value}{stat.suffix || ''}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${(stat.value / stat.max) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>Max: {stat.max}{stat.suffix || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Defensive Stats */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Shield className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Performance Défensive</h3>
                  <p className="text-sm text-gray-500">Saison 2025-2026</p>
                </div>
              </div>

              <div className="space-y-6">
                {statsData.defensive.map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">{stat.label}</span>
                      <span className="font-bold text-gray-900 text-lg">
                        {stat.value}{stat.suffix || ''}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${(stat.value / stat.max) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>Max: {stat.max}{stat.suffix || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Chart Placeholder */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Comparaison avec la saison dernière</h3>
              <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                  <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Graphique de comparaison des saisons</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamProfile;