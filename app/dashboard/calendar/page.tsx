'use client'

import React, { useState, useMemo } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Trophy, 
  MapPin, 
  Clock, 
  Filter,
  X,
  CheckCircle2,
  Info,
  CalendarDays,
  Users,
  FileText,
  AlertTriangle
} from 'lucide-react'

// Types
interface Match {
  id: number
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  venue: 'home' | 'away' | 'neutral'
  competition: string
  stadium: string
  score?: {
    home: number
    away: number
  }
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled'
  description?: string
  notes?: string // Notes internes pour le staff
  broadcast?: string[]
  referee?: string
  attendance?: number // Affluence pour les matchs passés
  formation?: string // Formation tactique
}

interface MatchDetailsProps {
  match: Match | null
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

// Configuration du club
const CLUB_CONFIG = {
  name: 'FC Exemple',
  shortName: 'FCE',
  stadium: 'Stade Municipal',
  capacity: 15000,
  season: '2024/2025'
}

// Données exemple internes au club
const scheduledMatches: Match[] = [
  { 
    id: 1, 
    date: '2024-03-15', 
    time: '20:45', 
    homeTeam: CLUB_CONFIG.name,
    awayTeam: 'Paris FC',
    venue: 'home',
    competition: 'Ligue 2',
    stadium: CLUB_CONFIG.stadium,
    score: { home: 2, away: 1 },
    status: 'finished',
    description: 'Bonne prestation collective, à retenir pour la suite',
    notes: 'Récupération active le lendemain. Analyse vidéo lundi 10h.',
    broadcast: ['BeIN Sports'],
    referee: 'M. Delajod',
    attendance: 12450,
    formation: '4-3-3'
  },
  { 
    id: 2, 
    date: '2024-03-22', 
    time: '21:00', 
    homeTeam: 'Guingamp',
    awayTeam: CLUB_CONFIG.name,
    venue: 'away',
    competition: 'Ligue 2',
    stadium: 'Stade de Roudourou',
    score: { home: 0, away: 0 },
    status: 'finished',
    description: 'Match piège, point précieux pris',
    notes: 'Voyage retour immédiat. Repos dimanche.',
    broadcast: ['Prime Video'],
    referee: 'M. Millot',
    attendance: 9800,
    formation: '4-2-3-1'
  },
  { 
    id: 3, 
    date: '2024-04-02', 
    time: '18:30', 
    homeTeam: CLUB_CONFIG.name,
    awayTeam: 'Bordeaux',
    venue: 'home',
    competition: 'Ligue 2',
    stadium: CLUB_CONFIG.stadium,
    status: 'scheduled',
    description: 'Match important pour le maintien',
    notes: 'Concentration maximale. Briefing tactique vendredi.',
    broadcast: ['BeIN Sports'],
    referee: 'À désigner',
    formation: '4-3-3'
  },
  { 
    id: 4, 
    date: '2024-04-06', 
    time: '17:00', 
    homeTeam: 'Auxerre',
    awayTeam: CLUB_CONFIG.name,
    venue: 'away',
    competition: 'Ligue 2',
    stadium: 'Stade de l\'Abbé-Deschamps',
    status: 'scheduled',
    notes: 'Déplacement en bus. Départ 8h du centre d\'entraînement.',
    broadcast: ['Prime Video'],
    referee: 'À désigner'
  },
  { 
    id: 5, 
    date: '2024-04-14', 
    time: '20:45', 
    homeTeam: 'Angers',
    awayTeam: CLUB_CONFIG.name,
    venue: 'away',
    competition: 'Coupe de France',
    stadium: 'Stade Raymond Kopa',
    status: 'scheduled',
    description: 'Quart de finale, objectif demi',
    notes: 'Préparation spécifique. Réunion staff jeudi.',
    broadcast: ['France 2'],
    referee: 'À désigner'
  },
  { 
    id: 6, 
    date: '2024-04-21', 
    time: '15:00', 
    homeTeam: CLUB_CONFIG.name,
    awayTeam: 'Laval',
    venue: 'home',
    competition: 'Ligue 2',
    stadium: CLUB_CONFIG.stadium,
    status: 'scheduled',
    notes: 'Après-midi familles invitées au stade.',
    broadcast: ['BeIN Sports'],
    referee: 'À désigner',
    formation: '4-3-3'
  },
  { 
    id: 7, 
    date: '2026-02-20', 
    time: '20:45', 
    homeTeam: CLUB_CONFIG.name,
    awayTeam: 'Pau FC',
    venue: 'home',
    competition: 'Ligue 2',
    stadium: CLUB_CONFIG.stadium,
    status: 'live',
    description: 'En cours - Début de match solide',
    notes: 'Remplaçants échauffement en cours',
    broadcast: ['Prime Video'],
    referee: 'M. Letexier',
    formation: '4-3-3'
  },
  { 
    id: 8, 
    date: '2026-02-25', 
    time: '18:30', 
    homeTeam: 'Rodez',
    awayTeam: CLUB_CONFIG.name,
    venue: 'away',
    competition: 'Ligue 2',
    stadium: 'Stade Paul-Lignon',
    status: 'scheduled',
    notes: 'Voyage la veille. Hôtel confirmé.',
    broadcast: ['BeIN Sports 2'],
    referee: 'À désigner'
  },
  { 
    id: 9, 
    date: '2026-03-02', 
    time: '17:00', 
    homeTeam: CLUB_CONFIG.name,
    awayTeam: 'Ajaccio',
    venue: 'home',
    competition: 'Ligue 2',
    stadium: CLUB_CONFIG.stadium,
    status: 'scheduled',
    notes: 'Attention chaleur vestiaire - prévoir ventilation',
    broadcast: ['Prime Video'],
    referee: 'À désigner',
    formation: '4-3-3'
  },
  { 
    id: 10, 
    date: '2026-03-09', 
    time: '21:00', 
    homeTeam: 'Amiens',
    awayTeam: CLUB_CONFIG.name,
    venue: 'away',
    competition: 'Coupe de France',
    stadium: 'Stade de la Licorne',
    status: 'postponed',
    description: 'Reporté cause intempéries',
    notes: 'Nouvelle date à définir avec la FFF. Entraînement maintenu.',
    broadcast: ['France 2'],
    referee: 'À désigner'
  },
]

const competitions = ['all', 'Ligue 2', 'Coupe de France', 'Amical']

const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

// Palette de couleurs neutre professionnelle
const COLORS = {
  primary: 'slate',
  accent: 'blue',
  success: 'emerald',
  warning: 'amber',
  danger: 'rose',
  neutral: 'gray'
}

// Composant Modal de détails
const MatchDetailsModal: React.FC<MatchDetailsProps> = ({ 
  match, 
  isOpen, 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext 
}) => {
  if (!isOpen || !match) return null

  const matchDate = new Date(match.date)
  const isPast = match.status === 'finished'
  const isLive = match.status === 'live'
  const isPostponed = match.status === 'postponed'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className={`relative p-6 ${
          isPostponed ? 'bg-amber-600' : 
          isPast ? 'bg-slate-700' : 
          isLive ? 'bg-rose-600' : 
          'bg-slate-600'
        } text-white`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {match.competition}
            </span>
            {isLive && (
              <span className="bg-rose-500 animate-pulse px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full" />
                EN DIRECT
              </span>
            )}
            {isPast && (
              <span className="bg-emerald-500/80 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Terminé
              </span>
            )}
            {isPostponed && (
              <span className="bg-amber-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Reporté
              </span>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-center my-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className={match.homeTeam === CLUB_CONFIG.name ? 'text-white' : 'text-white/80'}>
                {match.homeTeam}
              </span>
              <span className="text-3xl font-mono bg-white/20 px-4 py-2 rounded-xl">
                {isPast ? `${match.score?.home} - ${match.score?.away}` : 
                 isPostponed ? 'XX' : 'vs'}
              </span>
              <span className={match.awayTeam === CLUB_CONFIG.name ? 'text-white' : 'text-white/80'}>
                {match.awayTeam}
              </span>
            </div>
          </h2>
          
          <p className="text-white/80 text-center">
            {matchDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Alert pour match reporté */}
          {isPostponed && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900">Match reporté</p>
                  <p className="text-amber-800 text-sm mt-1">Nouvelle date à venir. Consultez le planning mis à jour régulièrement.</p>
                </div>
              </div>
            </div>
          )}

          {/* Score pour matchs passés */}
          {isPast && match.score && (
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <p className="text-sm text-slate-500 mb-2">Score final</p>
              <div className="flex items-center justify-center gap-4 text-4xl font-bold text-slate-800">
                <span>{match.score.home}</span>
                <span className="text-slate-400">-</span>
                <span>{match.score.away}</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                {match.homeTeam === CLUB_CONFIG.name && match.score.home > match.score.away ? 'Victoire à domicile' :
                 match.awayTeam === CLUB_CONFIG.name && match.score.away > match.score.home ? 'Victoire à l\'extérieur' :
                 match.score.home === match.score.away ? 'Match nul' : 'Défaite'}
              </p>
              {match.attendance && (
                <p className="text-xs text-slate-400 mt-2">
                  Affluence: {match.attendance.toLocaleString()} spectateurs
                </p>
              )}
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Heure</span>
              </div>
              <p className="font-semibold text-slate-800">{match.time}</p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Lieu</span>
              </div>
              <p className="font-semibold text-slate-800">{match.stadium}</p>
              <p className="text-xs text-slate-500 mt-1">
                {match.homeTeam === CLUB_CONFIG.name ? '🏠 Domicile' : '✈️ Déplacement'}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">Arbitre</span>
              </div>
              <p className="font-semibold text-slate-800">{match.referee || 'À désigner'}</p>
            </div>

            {match.formation && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">Formation</span>
                </div>
                <p className="font-semibold text-slate-800">{match.formation}</p>
              </div>
            )}
          </div>

          {/* Description */}
          {match.description && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Analyse</p>
                  <p className="text-blue-800 text-sm mt-1">{match.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notes internes (section staff) */}
          {match.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-amber-700" />
                <p className="font-bold text-amber-900 text-sm uppercase tracking-wide">Notes Staff</p>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">{match.notes}</p>
            </div>
          )}

          {/* Diffusion TV */}
          {match.broadcast && match.broadcast.length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">📺 Diffusion TV</p>
              <div className="flex flex-wrap gap-2">
                {match.broadcast.map((channel) => (
                  <span key={channel} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation entre matchs */}
          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                hasPrevious ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                hasNext ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const MatchScheduler: React.FC = () => {
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
  const [selectedYear, setSelectedYear] = useState(today.getFullYear())
  const [filterCompetition, setFilterCompetition] = useState<string>('all')
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar')

  // Filtrer les matchs
  const filteredMatches = useMemo(() => {
    return scheduledMatches.filter(match => {
      const matchDate = new Date(match.date)
      const monthMatch = matchDate.getMonth() === selectedMonth
      const yearMatch = matchDate.getFullYear() === selectedYear
      const competitionMatch = filterCompetition === 'all' || match.competition === filterCompetition
      return monthMatch && yearMatch && competitionMatch
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [selectedMonth, selectedYear, filterCompetition])

  // Navigation mois
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(prev => prev - 1)
    } else {
      setSelectedMonth(prev => prev - 1)
    }
  }

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(prev => prev + 1)
    } else {
      setSelectedMonth(prev => prev + 1)
    }
  }

  // Générer les jours du calendrier
  const generateCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1)
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0)
    const startPadding = firstDay.getDay()
    const daysInMonth = lastDay.getDate()
    
    const days: (null | { date: number; matches: Match[]; isToday: boolean })[] = []
    
    for (let i = 0; i < startPadding; i++) {
      days.push(null)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayMatches = scheduledMatches.filter(m => m.date === currentDateStr)
      const isToday = today.getDate() === day && 
                      today.getMonth() === selectedMonth && 
                      today.getFullYear() === selectedYear
      
      days.push({
        date: day,
        matches: dayMatches,
        isToday
      })
    }
    
    return days
  }

  const getCompetitionColor = (comp: string) => {
    switch(comp) {
      case 'Ligue 2': return 'bg-slate-500'
      case 'Coupe de France': return 'bg-amber-500'
      case 'Amical': return 'bg-emerald-500'
      default: return 'bg-slate-400'
    }
  }

  const getStatusColor = (status: Match['status']) => {
    switch(status) {
      case 'finished': return 'bg-slate-400'
      case 'live': return 'bg-rose-500 animate-pulse'
      case 'postponed': return 'bg-amber-500'
      case 'cancelled': return 'bg-red-600'
      default: return 'bg-blue-500'
    }
  }

  const getStatusBadge = (status: Match['status']) => {
    switch(status) {
      case 'finished': return { text: 'Terminé', class: 'bg-slate-200 text-slate-700' }
      case 'live': return { text: 'LIVE', class: 'bg-rose-500 text-white animate-pulse' }
      case 'postponed': return { text: 'Reporté', class: 'bg-amber-200 text-amber-800' }
      case 'cancelled': return { text: 'Annulé', class: 'bg-red-200 text-red-800' }
      default: return { text: 'Prévu', class: 'bg-blue-100 text-blue-800' }
    }
  }

  const currentMatchIndex = selectedMatch ? filteredMatches.findIndex(m => m.id === selectedMatch.id) : -1
  const handlePreviousMatch = () => {
    if (currentMatchIndex > 0) {
      setSelectedMatch(filteredMatches[currentMatchIndex - 1])
    }
  }
  const handleNextMatch = () => {
    if (currentMatchIndex < filteredMatches.length - 1) {
      setSelectedMatch(filteredMatches[currentMatchIndex + 1])
    }
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <Calendar className="w-8 h-8 text-slate-600" />
                </div>
                Planning Matchs
              </h1>
              <p className="text-slate-500 mt-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {CLUB_CONFIG.name} - Saison {CLUB_CONFIG.season}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-100 rounded-xl p-1 flex">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'calendar' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <CalendarDays className="w-4 h-4" />
                  Calendrier
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Liste
                </button>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-2">
                <button 
                  onClick={prevMonth}
                  className="p-2 hover:bg-white rounded-lg transition-all shadow-sm hover:shadow-md text-slate-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-semibold min-w-[140px] text-center text-slate-800">
                  {monthNames[selectedMonth]} {selectedYear}
                </span>
                <button 
                  onClick={nextMonth}
                  className="p-2 hover:bg-white rounded-lg transition-all shadow-sm hover:shadow-md text-slate-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-600 mr-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Compétition:</span>
            </div>
            {competitions.map(comp => (
              <button
                key={comp}
                onClick={() => setFilterCompetition(comp)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterCompetition === comp 
                    ? 'bg-slate-700 text-white shadow-lg' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {comp === 'all' ? 'Toutes' : comp}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-slate-500">
            <p className="text-slate-500 text-sm">Matchs ce mois</p>
            <p className="text-2xl font-bold text-slate-800">{filteredMatches.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-emerald-500">
            <p className="text-slate-500 text-sm">Domicile</p>
            <p className="text-2xl font-bold text-slate-800">
              {filteredMatches.filter(m => m.homeTeam === CLUB_CONFIG.name).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-amber-500">
            <p className="text-slate-500 text-sm">Extérieur</p>
            <p className="text-2xl font-bold text-slate-800">
              {filteredMatches.filter(m => m.awayTeam === CLUB_CONFIG.name).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500">
            <p className="text-slate-500 text-sm">À venir</p>
            <p className="text-2xl font-bold text-slate-800">
              {filteredMatches.filter(m => m.status === 'scheduled' || m.status === 'live').length}
            </p>
          </div>
        </div>

        {/* Vue Calendrier */}
        {viewMode === 'calendar' ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-slate-500 py-2 bg-slate-50 rounded-lg">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`min-h-[100px] rounded-xl border-2 transition-all ${
                    day?.isToday ? 'border-slate-500 bg-slate-50' : 'border-slate-100 hover:border-slate-300'
                  } ${!day ? 'bg-slate-50/50' : 'bg-white'}`}
                >
                  {day && (
                    <div className="p-2 h-full flex flex-col">
                      <span className={`text-sm font-semibold mb-1 ${day.isToday ? 'text-slate-700 bg-slate-200 w-7 h-7 flex items-center justify-center rounded-full' : 'text-slate-600'}`}>
                        {day.date}
                      </span>
                      <div className="flex-1 space-y-1 overflow-y-auto">
                        {day.matches.map(match => {
                          const isPast = match.status === 'finished'
                          const isPostponed = match.status === 'postponed'
                          const isHome = match.homeTeam === CLUB_CONFIG.name
                          const statusBadge = getStatusBadge(match.status)
                          
                          return (
                            <button
                              key={match.id}
                              onClick={() => setSelectedMatch(match)}
                              className={`w-full text-left text-xs p-1.5 rounded-lg transition-all hover:scale-105 ${
                                isPostponed ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                isPast ? 'bg-slate-200 text-slate-600' : 
                                'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              } ${match.status === 'live' ? 'ring-2 ring-rose-400 animate-pulse bg-rose-50' : ''}`}
                            >
                              <div className="flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${getCompetitionColor(match.competition)}`} />
                                <span className="truncate font-medium">{match.time}</span>
                              </div>
                              <div className="truncate font-bold mt-0.5">
                                {isHome ? 'vs' : '@'} {isHome ? match.awayTeam : match.homeTeam}
                              </div>
                              <div className={`text-[10px] mt-0.5 px-1.5 py-0.5 rounded inline-block ${statusBadge.class}`}>
                                {statusBadge.text}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Vue Liste */
          <div className="space-y-4">
            {filteredMatches.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">Aucun match ce mois</p>
                <button 
                  onClick={() => {setSelectedMonth(today.getMonth()); setSelectedYear(today.getFullYear()); setFilterCompetition('all');}}
                  className="mt-4 text-slate-600 hover:text-slate-800 font-medium"
                >
                  Revenir à aujourd'hui
                </button>
              </div>
            ) : (
              filteredMatches.map((match) => {
                const matchDate = new Date(match.date)
                const isToday = today.toDateString() === matchDate.toDateString()
                const isPast = match.status === 'finished'
                const isPostponed = match.status === 'postponed'
                const isHome = match.homeTeam === CLUB_CONFIG.name
                const statusBadge = getStatusBadge(match.status)
                
                return (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={`w-full text-left bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 ${
                      isToday ? 'ring-2 ring-slate-400 ring-offset-2' : ''
                    } ${isPast ? 'opacity-80' : ''} ${isPostponed ? 'opacity-60' : ''}`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Date */}
                      <div className={`${
                        isPostponed ? 'bg-amber-600' :
                        isPast ? 'bg-slate-500' : 
                        isHome ? 'bg-slate-700' : 
                        'bg-slate-600'
                      } text-white p-6 md:w-40 flex flex-col justify-center items-center shrink-0`}>
                        <span className="text-3xl font-bold">{matchDate.getDate()}</span>
                        <span className="text-sm uppercase">{monthNames[matchDate.getMonth()].substring(0, 3)}</span>
                        <span className="text-xs text-slate-300 mt-1">{matchDate.getFullYear()}</span>
                        {isToday && <span className="text-xs bg-slate-500 px-2 py-1 rounded mt-2">Aujourd'hui</span>}
                        <span className={`text-xs px-2 py-1 rounded mt-2 ${statusBadge.class}`}>
                          {statusBadge.text}
                        </span>
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          
                          {/* Info match */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={`${getCompetitionColor(match.competition)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                                {match.competition}
                              </span>
                              <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {match.time}
                              </span>
                              {match.referee && match.referee !== 'À désigner' && (
                                <span className="text-slate-400 text-sm flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {match.referee}
                                </span>
                              )}
                            </div>
                            
                            <h3 className={`text-xl font-bold flex items-center gap-3 flex-wrap ${
                              isPostponed ? 'text-amber-700 line-through' :
                              isPast ? 'text-slate-500' : 
                              'text-slate-800'
                            }`}>
                              <span className={isHome ? 'text-slate-900' : 'text-slate-600'}>
                                {match.homeTeam}
                              </span>
                              {isPast && match.score ? (
                                <span className="font-mono text-2xl text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                                  {match.score.home} - {match.score.away}
                                </span>
                              ) : isPostponed ? (
                                <span className="font-mono text-xl text-amber-600 bg-amber-100 px-3 py-1 rounded-lg">
                                  XX - XX
                                </span>
                              ) : (
                                <span className="text-slate-400 font-light">vs</span>
                              )}
                              <span className={!isHome ? 'text-slate-900' : 'text-slate-600'}>
                                {match.awayTeam}
                              </span>
                              {!isPast && !isPostponed && <Trophy className="w-5 h-5 text-amber-500" />}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-slate-500 mt-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">
                                {isHome ? '🏠 Domicile' : '✈️ Extérieur'} • {match.stadium}
                              </span>
                              {match.attendance && (
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                                  {match.attendance.toLocaleString()} spect.
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <span className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium flex items-center gap-1 border border-slate-200">
                              <Info className="w-4 h-4" />
                              Détails
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        )}

        {/* Timeline annuelle */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Vue d'ensemble {selectedYear}</h3>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {monthNames.map((month, idx) => {
              const monthMatches = scheduledMatches.filter(m => {
                const d = new Date(m.date)
                return d.getMonth() === idx && d.getFullYear() === selectedYear
              })
              const hasMatches = monthMatches.length > 0
              const isCurrentMonth = idx === today.getMonth() && selectedYear === today.getFullYear()
              
              return (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(idx)}
                  className={`p-3 rounded-lg text-center transition-all relative ${
                    selectedMonth === idx 
                      ? 'bg-slate-700 text-white shadow-lg' 
                      : isCurrentMonth
                        ? 'bg-slate-200 text-slate-800 ring-2 ring-slate-400'
                        : hasMatches 
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                          : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-medium">{month.substring(0, 3)}</div>
                  {hasMatches && (
                    <div className={`text-[10px] mt-1 ${selectedMonth === idx ? 'text-slate-300' : 'text-slate-600'}`}>
                      {monthMatches.length} matchs
                    </div>
                  )}
                  {isCurrentMonth && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* Modal */}
      <MatchDetailsModal 
        match={selectedMatch}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        onPrevious={handlePreviousMatch}
        onNext={handleNextMatch}
        hasPrevious={currentMatchIndex > 0}
        hasNext={currentMatchIndex < filteredMatches.length - 1 && currentMatchIndex !== -1}
      />
    </div>
  )
}

export default MatchScheduler