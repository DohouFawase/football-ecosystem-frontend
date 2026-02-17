'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Zap, 
  Heart,
  Grid3X3,
  List,
  X,
  Activity,
  Plus,
  Check,
  ArrowLeft,
  Trash2,
  Download,
  Share2,
  Eye
} from 'lucide-react'

interface Player {
  id: string
  name: string
  age: number
  nationality: string
  position: string
  club: string
  league: string
  height: number
  weight: number
  foot: 'left' | 'right' | 'both'
  overall: number
  potential: number
  marketValue: number
  stats: {
    matches: number
    goals: number
    assists: number
    rating: number
  }
  attributes: {
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
  scouting: {
    watched: boolean
    rating: number
    reports: number
    tags: string[]
  }
}

const playersData: Player[] = [
  {
    id: '1',
    name: 'Elias Kacou',
    age: 19,
    nationality: 'CIV',
    position: 'AIL',
    club: 'ASEC Mimosas',
    league: 'Ligue 1 CI',
    height: 178,
    weight: 72,
    foot: 'right',
    overall: 72,
    potential: 88,
    marketValue: 2500000,
    stats: { matches: 24, goals: 12, assists: 8, rating: 7.4 },
    attributes: { pace: 89, shooting: 68, passing: 74, dribbling: 82, defending: 34, physical: 76 },
    scouting: { watched: true, rating: 4.5, reports: 3, tags: ['rapide', 'technique'] }
  },
  {
    id: '2',
    name: 'Lucas Bergvall',
    age: 17,
    nationality: 'SWE',
    position: 'MC',
    club: 'Djurgårdens IF',
    league: 'Allsvenskan',
    height: 186,
    weight: 78,
    foot: 'right',
    overall: 68,
    potential: 90,
    marketValue: 4800000,
    stats: { matches: 18, goals: 4, assists: 6, rating: 7.1 },
    attributes: { pace: 72, shooting: 65, passing: 84, dribbling: 78, defending: 62, physical: 74 },
    scouting: { watched: false, rating: 0, reports: 0, tags: [] }
  },
  {
    id: '3',
    name: 'Kobbie Mainoo',
    age: 18,
    nationality: 'ENG',
    position: 'MDC',
    club: 'Manchester United',
    league: 'Premier League',
    height: 180,
    weight: 75,
    foot: 'right',
    overall: 76,
    potential: 89,
    marketValue: 35000000,
    stats: { matches: 15, goals: 2, assists: 1, rating: 7.2 },
    attributes: { pace: 70, shooting: 58, passing: 82, dribbling: 80, defending: 78, physical: 76 },
    scouting: { watched: true, rating: 4.2, reports: 5, tags: ['intelligent', 'calme'] }
  },
  {
    id: '4',
    name: 'Endrick',
    age: 17,
    nationality: 'BRA',
    position: 'BU',
    club: 'Palmeiras',
    league: 'Série A',
    height: 166,
    weight: 60,
    foot: 'left',
    overall: 75,
    potential: 94,
    marketValue: 60000000,
    stats: { matches: 32, goals: 18, assists: 4, rating: 7.6 },
    attributes: { pace: 86, shooting: 78, passing: 64, dribbling: 85, defending: 28, physical: 72 },
    scouting: { watched: true, rating: 4.8, reports: 8, tags: ['buteur', 'star'] }
  },
  {
    id: '5',
    name: 'Arda Güler',
    age: 19,
    nationality: 'TUR',
    position: 'MOC',
    club: 'Real Madrid',
    league: 'La Liga',
    height: 175,
    weight: 68,
    foot: 'left',
    overall: 74,
    potential: 91,
    marketValue: 30000000,
    stats: { matches: 8, goals: 3, assists: 2, rating: 7.3 },
    attributes: { pace: 76, shooting: 76, passing: 84, dribbling: 88, defending: 32, physical: 58 },
    scouting: { watched: true, rating: 4.3, reports: 4, tags: ['technique', 'fragile'] }
  },
  {
    id: '6',
    name: 'Lamine Yamal',
    age: 16,
    nationality: 'ESP',
    position: 'AD',
    club: 'FC Barcelone',
    league: 'La Liga',
    height: 178,
    weight: 65,
    foot: 'left',
    overall: 77,
    potential: 95,
    marketValue: 75000000,
    stats: { matches: 28, goals: 8, assists: 12, rating: 7.8 },
    attributes: { pace: 91, shooting: 72, passing: 78, dribbling: 92, defending: 25, physical: 65 },
    scouting: { watched: true, rating: 4.9, reports: 12, tags: ['génie', 'incontournable'] }
  },
  {
    id: '7',
    name: 'Warren Zaïre-Emery',
    age: 18,
    nationality: 'FRA',
    position: 'MC',
    club: 'Paris SG',
    league: 'Ligue 1',
    height: 178,
    weight: 70,
    foot: 'right',
    overall: 78,
    potential: 92,
    marketValue: 60000000,
    stats: { matches: 25, goals: 3, assists: 7, rating: 7.5 },
    attributes: { pace: 74, shooting: 68, passing: 86, dribbling: 82, defending: 70, physical: 78 },
    scouting: { watched: true, rating: 4.6, reports: 6, tags: ['complet', 'leader'] }
  },
  {
    id: '8',
    name: 'Arthur Vermeeren',
    age: 19,
    nationality: 'BEL',
    position: 'MDC',
    club: 'Atlético Madrid',
    league: 'La Liga',
    height: 180,
    weight: 72,
    foot: 'right',
    overall: 75,
    potential: 87,
    marketValue: 22000000,
    stats: { matches: 20, goals: 1, assists: 3, rating: 7.0 },
    attributes: { pace: 68, shooting: 55, passing: 80, dribbling: 76, defending: 82, physical: 74 },
    scouting: { watched: false, rating: 0, reports: 2, tags: ['récupérateur'] }
  }
]

const positions = ['all', 'GK', 'DC', 'DD', 'DG', 'MDC', 'MC', 'MOC', 'MD', 'MG', 'AD', 'AG', 'AIL', 'AIG', 'BU']
const leagues = ['all', 'Premier League', 'La Liga', 'Ligue 1', 'Ligue 1 CI', 'Allsvenskan', 'Série A']
const sortOptions = [
  { value: 'potential', label: 'Potentiel' },
  { value: 'value', label: 'Valeur' },
  { value: 'rating', label: 'Note scout' },
  { value: 'age', label: 'Âge' },
  { value: 'goals', label: 'Buts' }
]

export default function PlayerList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('all')
  const [selectedLeague, setSelectedLeague] = useState('all')
  const [minPotential, setMinPotential] = useState(70)
  const [watchlistOnly, setWatchlistOnly] = useState(false)
  const [sortBy, setSortBy] = useState('potential')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [watchlist, setWatchlist] = useState<string[]>(playersData.filter(p => p.scouting.watched).map(p => p.id))

  const filteredPlayers = useMemo(() => {
    let filtered = playersData.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          player.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          player.nationality.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPosition = selectedPosition === 'all' || player.position === selectedPosition
      const matchesLeague = selectedLeague === 'all' || player.league === selectedLeague
      const matchesPotential = player.potential >= minPotential
      const matchesWatchlist = !watchlistOnly || watchlist.includes(player.id)
      
      return matchesSearch && matchesPosition && matchesLeague && matchesPotential && matchesWatchlist
    })

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'potential': return b.potential - a.potential
        case 'value': return b.marketValue - a.marketValue
        case 'rating': return b.scouting.rating - a.scouting.rating
        case 'age': return a.age - b.age
        case 'goals': return b.stats.goals - a.stats.goals
        default: return 0
      }
    })

    return filtered
  }, [searchQuery, selectedPosition, selectedLeague, minPotential, watchlistOnly, sortBy, watchlist])

  const toggleCompare = (playerId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (compareList.includes(playerId)) {
      setCompareList(prev => prev.filter(id => id !== playerId))
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, playerId])
    }
  }

  const toggleWatchlist = (playerId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setWatchlist(prev => {
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId)
      }
      return [...prev, playerId]
    })
  }

  const clearCompare = () => {
    setCompareList([])
    setShowCompareModal(false)
  }

  const comparePlayers = playersData.filter(p => compareList.includes(p.id))

  const getAttributeColor = (value: number) => {
    if (value >= 85) return 'bg-emerald-500'
    if (value >= 75) return 'bg-emerald-400'
    if (value >= 65) return 'bg-amber-400'
    if (value >= 50) return 'bg-orange-400'
    return 'bg-red-400'
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`
    return `€${(value / 1000).toFixed(0)}K`
  }

  const getBestValue = (players: Player[], key: keyof Player['attributes'] | 'potential' | 'marketValue') => {
    if (players.length === 0) return null
    if (key === 'potential') {
      return Math.max(...players.map(p => p.potential))
    }
    if (key === 'marketValue') {
      return Math.max(...players.map(p => p.marketValue))
    }
    return Math.max(...players.map(p => p.attributes[key as keyof Player['attributes']]))
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                Liste des joueurs
                <span className="text-lg font-normal text-gray-500">({filteredPlayers.length})</span>
              </h1>
              <p className="text-gray-500 mt-1">Base de données scouting • {playersData.length} profils • {watchlist.length} en watchlist</p>
            </div>
            
            <div className="flex items-center gap-3">
              {compareList.length > 0 && (
                <button 
                  onClick={() => setShowCompareModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm animate-in fade-in"
                >
                  <BarChart3 className="w-4 h-4" />
                  Comparer ({compareList.length})
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">
                    {compareList.length}
                  </span>
                </button>
              )}
              
              <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un joueur, club, nationalité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <select 
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-w-[120px]"
            >
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos === 'all' ? 'Toutes positions' : pos}</option>
              ))}
            </select>

            <select 
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-w-[140px]"
            >
              {leagues.map(league => (
                <option key={league} value={league}>{league === 'all' ? 'Tous championnats' : league}</option>
              ))}
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-w-[140px]"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>Trier par: {opt.label}</option>
              ))}
            </select>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                showFilters 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtres avancés
            </button>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-wrap gap-6 items-center animate-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Potentiel minimum:</span>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={minPotential}
                  onChange={(e) => setMinPotential(parseInt(e.target.value))}
                  className="w-32 accent-blue-600"
                />
                <span className="text-sm font-bold text-blue-600 w-8">{minPotential}</span>
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={watchlistOnly}
                  onChange={(e) => setWatchlistOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Watchlist uniquement</span>
              </label>
            </div>
          )}
        </div>

        {/* Grille de joueurs */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPlayers.map(player => {
              const isInWatchlist = watchlist.includes(player.id)
              const isInCompare = compareList.includes(player.id)
              
              return (
                <div 
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 cursor-pointer relative"
                >
                  {/* Header carte */}
                  <div className="relative h-28 bg-gradient-to-br from-gray-50 to-gray-100 p-4 border-b border-gray-100">
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => toggleCompare(player.id, e)}
                        className={`p-2 rounded-lg transition-all shadow-sm ${isInCompare ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                        title={isInCompare ? 'Retirer de la comparaison' : 'Ajouter à la comparaison'}
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => toggleWatchlist(player.id, e)}
                        className={`p-2 rounded-lg transition-all shadow-sm ${isInWatchlist ? 'bg-rose-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                        title={isInWatchlist ? 'Retirer de la watchlist' : 'Ajouter à la watchlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isInWatchlist ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    {isInWatchlist && (
                      <div className="absolute top-3 left-3">
                        <span className="flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600" />
                        </span>
                      </div>
                    )}

                    <div className="flex items-end gap-3 h-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-md">
                        {player.name.charAt(0)}
                      </div>
                      <div className="min-w-0 pb-1">
                        <h3 className="font-bold text-gray-900 truncate">{player.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{player.club}</p>
                      </div>
                    </div>
                  </div>

                  {/* Corps carte */}
                  <div className="p-4 space-y-3">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium border border-gray-200">{player.position}</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs border border-gray-200">{player.age} ans</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs border border-gray-200">{player.nationality}</span>
                    </div>

                    {/* Potentiel */}
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                          style={{ width: `${player.potential}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-amber-600">{player.potential}</span>
                    </div>

                    {/* Stats rapides */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                        <p className="text-base font-bold text-emerald-600">{player.stats.matches}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Matchs</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                        <p className="text-base font-bold text-blue-600">{player.stats.goals}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Buts</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                        <p className="text-base font-bold text-indigo-600">{player.stats.assists}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Passes</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm font-bold text-emerald-600">{formatValue(player.marketValue)}</span>
                      {player.scouting.rating > 0 ? (
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-bold text-amber-700">{player.scouting.rating}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Non évalué</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Vue liste
          <div className="space-y-2">
            {filteredPlayers.map(player => {
              const isInWatchlist = watchlist.includes(player.id)
              const isInCompare = compareList.includes(player.id)
              
              return (
                <div 
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-sm shrink-0">
                    {player.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{player.name}</h3>
                      {isInWatchlist && (
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      )}
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs border border-gray-200">{player.position}</span>
                    </div>
                    <p className="text-sm text-gray-500">{player.club} • {player.age} ans • {player.nationality}</p>
                  </div>

                  <div className="hidden md:flex items-center gap-8 text-center">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Potentiel</p>
                      <p className="font-bold text-amber-600 text-lg">{player.potential}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Buts</p>
                      <p className="font-bold text-blue-600 text-lg">{player.stats.goals}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Valeur</p>
                      <p className="font-bold text-emerald-600">{formatValue(player.marketValue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Note</p>
                      <div className="flex items-center gap-1 justify-center">
                        {player.scouting.rating > 0 ? (
                          <>
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-bold">{player.scouting.rating}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => toggleCompare(player.id, e)}
                      className={`p-2 rounded-lg transition-all ${isInCompare ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      title={isInCompare ? 'Retirer' : 'Comparer'}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => toggleWatchlist(player.id, e)}
                      className={`p-2 rounded-lg transition-all ${isInWatchlist ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      title={isInWatchlist ? 'Retirer' : 'Watchlist'}
                    >
                      <Heart className={`w-4 h-4 ${isInWatchlist ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filteredPlayers.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">Aucun joueur trouvé</p>
            <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres</p>
          </div>
        )}
      </div>

      {/* Modal Comparaison */}
      {showCompareModal && comparePlayers.length > 0 && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCompareModal(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowCompareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Comparaison de joueurs</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {comparePlayers.length}/3
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={clearCompare}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Tout effacer
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
              </div>
            </div>

            {/* Tableau comparatif */}
            <div className="p-6">
              <div className={`grid gap-4 ${comparePlayers.length === 2 ? 'grid-cols-2' : comparePlayers.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
                {comparePlayers.map(player => (
                  <div key={player.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    {/* Card header */}
                    <div className="p-4 bg-white border-b border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                          {player.name.charAt(0)}
                        </div>
                        <button 
                          onClick={() => toggleCompare(player.id)}
                          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-500">{player.club}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">{player.position}</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{player.age} ans</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Potentiel</span>
                        <span className={`font-bold text-lg ${player.potential === getBestValue(comparePlayers, 'potential') ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {player.potential}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Valeur</span>
                        <span className={`font-bold ${player.marketValue === getBestValue(comparePlayers, 'marketValue') ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {formatValue(player.marketValue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Note scout</span>
                        <span className="font-bold text-gray-900">
                          {player.scouting.rating > 0 ? player.scouting.rating : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Matchs</span>
                        <span className="font-bold text-gray-900">{player.stats.matches}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-500">Buts</span>
                        <span className="font-bold text-gray-900">{player.stats.goals}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-500">Passes D.</span>
                        <span className="font-bold text-gray-900">{player.stats.assists}</span>
                      </div>
                    </div>

                    {/* Attributs */}
                    <div className="p-4 bg-white border-t border-gray-200">
                      <h4 className="font-bold text-sm text-gray-700 mb-3">Attributs</h4>
                      <div className="space-y-2">
                        {Object.entries(player.attributes).map(([attr, value]) => {
                          const isBest = value === getBestValue(comparePlayers, attr as keyof Player['attributes'])
                          return (
                            <div key={attr} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16 capitalize">{attr}</span>
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full ${isBest ? 'bg-emerald-500' : getAttributeColor(value)}`} style={{ width: `${value}%` }} />
                              </div>
                              <span className={`text-xs font-bold w-6 ${isBest ? 'text-emerald-600' : 'text-gray-700'}`}>{value}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ajouter un joueur */}
              {comparePlayers.length < 3 && (
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => setShowCompareModal(false)}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-600 rounded-xl transition-colors text-gray-500"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter un joueur à comparer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal détail joueur */}
      {selectedPlayer && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedPlayer(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-36 bg-gradient-to-br from-blue-600 to-indigo-700 p-6">
              <button 
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-end gap-4 h-full">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-4xl font-bold text-blue-600 shadow-xl">
                  {selectedPlayer.name.charAt(0)}
                </div>
                <div className="pb-2">
                  <h2 className="text-3xl font-bold text-white">{selectedPlayer.name}</h2>
                  <p className="text-blue-100 text-lg">{selectedPlayer.club} • {selectedPlayer.position}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Actions rapides */}
              <div className="flex gap-3">
                <button 
                  onClick={() => toggleWatchlist(selectedPlayer.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-medium ${
                    watchlist.includes(selectedPlayer.id) 
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${watchlist.includes(selectedPlayer.id) ? 'fill-current' : ''}`} />
                  {watchlist.includes(selectedPlayer.id) ? 'Dans la watchlist' : 'Ajouter à la watchlist'}
                </button>
                <button 
                  onClick={() => toggleCompare(selectedPlayer.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-medium ${
                    compareList.includes(selectedPlayer.id) 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  {compareList.includes(selectedPlayer.id) ? 'Dans la comparaison' : 'Comparer'}
                </button>
              </div>

              {/* Info rapide */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-2xl font-bold text-amber-600">{selectedPlayer.potential}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Potentiel</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-2xl font-bold text-emerald-600">{formatValue(selectedPlayer.marketValue)}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Valeur</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-2xl font-bold text-blue-600">{selectedPlayer.stats.rating}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Note</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-2xl font-bold text-indigo-600 capitalize">{selectedPlayer.foot}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Pied</p>
                </div>
              </div>

              {/* Attributs */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Attributs techniques
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedPlayer.attributes).map(([attr, value]) => (
                    <div key={attr}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="capitalize text-gray-600 font-medium">{attr}</span>
                        <span className="font-bold text-gray-900">{value}</span>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${getAttributeColor(value)}`} style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats saison */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  Performance cette saison
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-gray-900">{selectedPlayer.stats.matches}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Matchs</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-emerald-600">{selectedPlayer.stats.goals}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Buts</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-blue-600">{selectedPlayer.stats.assists}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Passes D.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <p className="text-2xl font-bold text-amber-600">{selectedPlayer.scouting.reports}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Rapports</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {selectedPlayer.scouting.tags.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide text-gray-500">Profil</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlayer.scouting.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium shadow-sm shadow-blue-200 flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  Voir fiche complète
                </button>
                <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}