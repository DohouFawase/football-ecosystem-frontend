"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, MapPin, Users, Calendar, ChevronDown, 
  School, Building2, Home, Star, Zap, Medal, 
  Flame, Crown, Swords, Activity, Clock, Shield, 
  ChevronRight, Search, BarChart3, Award, Radio, 
  PlayCircle, X, User, Flag, Plus, Edit2, Trash2
} from 'lucide-react'

// ==========================================
// TYPES
// ==========================================

type CompType = 'professional' | 'school' | 'college' | 'neighborhood' | 'youth' | 'corporate'

interface Creator {
  id: string
  name: string
  avatar?: string
  role: string
  organization: string
}

interface Team {
  id: string
  name: string
  city: string
  colors: [string, string]
  stats: {
    played: number
    won: number
    drawn: number
    lost: number
    points: number
  }
  topScorer?: string
  coach?: string
}

interface Match {
  id: string
  home: string
  away: string
  homeScore?: number
  awayScore?: number
  date: string
  time: string
  status: 'live' | 'finished' | 'upcoming'
}

interface Competition {
  id: string
  name: string
  type: CompType
  season: string
  region: string
  color: string // Couleur unique flat
  prize: string
  teams: Team[]
  matches: Match[]
  currentJourney: number
  totalJourneys: number
  status: 'active' | 'finished' | 'upcoming'
  createdBy: Creator
  createdAt: string
  description?: string
}

// ==========================================
// COULEURS FLAT VIVES
// ==========================================

const THEME_COLORS = [
  '#FF6B6B', // Rouge corail
  '#4ECDC4', // Turquoise
  '#45B7D1', // Bleu ciel
  '#96CEB4', // Vert menthe
  '#FFEAA7', // Jaune soleil
  '#DDA0DD', // Violet lilas
  '#98D8C8', // Vert d'eau
  '#F7DC6F', // Or
  '#BB8FCE', // Violet
  '#85C1E9', // Bleu clair
]

// ==========================================
// DONNÉES AVEC CRÉATEURS
// ==========================================

const COMPETITIONS: Competition[] = [
  {
    id: 'ligue1-ci',
    name: 'Ligue 1 Côte d\'Ivoire',
    type: 'professional',
    season: '2023-2024',
    region: 'National',
    color: '#E74C3C', // Rouge flat
    prize: '100 000 000 FCFA',
    currentJourney: 15,
    totalJourneys: 30,
    status: 'active',
    createdBy: {
      id: 'c1',
      name: 'Fédération Ivoirienne de Football',
      role: 'Président',
      organization: 'FIF'
    },
    createdAt: '2023-08-15',
    description: 'Championnat national de première division',
    teams: [
      { id: 'asec', name: 'ASEC Mimosas', city: 'Abidjan', colors: ['#FFD700', '#000000'], stats: { played: 15, won: 12, drawn: 2, lost: 1, points: 38 }, topScorer: 'Karim Konaté' },
      { id: 'africa', name: 'Africa Sports', city: 'Abidjan', colors: ['#FF0000', '#FFFFFF'], stats: { played: 15, won: 10, drawn: 3, lost: 2, points: 33 } },
      { id: 'stade', name: 'Stade d\'Abidjan', city: 'Abidjan', colors: ['#0000FF', '#FFFFFF'], stats: { played: 15, won: 8, drawn: 4, lost: 3, points: 28 } },
      { id: 'sab', name: 'SAB de Bouaké', city: 'Bouaké', colors: ['#008000', '#FFFFFF'], stats: { played: 15, won: 7, drawn: 3, lost: 5, points: 24 } },
    ],
    matches: [
      { id: 'm1', home: 'ASEC Mimosas', away: 'Africa Sports', homeScore: 3, awayScore: 1, date: '2024-02-18', time: '16:00', status: 'finished' },
    ]
  },
  
  {
    id: 'champ-scolaire-abi',
    name: 'Championnat Scolaire Abidjan',
    type: 'school',
    season: '2023-2024',
    region: 'Abidjan',
    color: '#27AE60', // Vert flat
    prize: '500 000 FCFA + Kits',
    currentJourney: 8,
    totalJourneys: 12,
    status: 'active',
    createdBy: {
      id: 'c2',
      name: 'M. Kouamé Jean',
      role: 'Coordinateur Sport Scolaire',
      organization: 'Ministère de l\'Éducation Nationale'
    },
    createdAt: '2023-09-01',
    description: 'Tournoi inter-lycées de la district d\'Abidjan',
    teams: [
      { id: 'lc-abidjan', name: 'Lycée Classique d\'Abidjan', city: 'Cocody', colors: ['#1E40AF', '#FFFFFF'], stats: { played: 8, won: 7, drawn: 1, lost: 0, points: 22 } },
      { id: 'ls-sainte-marie', name: 'Lycée Sainte-Marie', city: 'Plateau', colors: ['#EF4444', '#FFFFFF'], stats: { played: 8, won: 6, drawn: 1, lost: 1, points: 19 } },
      { id: 'lt-yopougon', name: 'Lycée Technique', city: 'Yopougon', colors: ['#F59E0B', '#000000'], stats: { played: 8, won: 5, drawn: 2, lost: 1, points: 17 } },
      { id: 'cb-abobo', name: 'Collège Bogbo', city: 'Abobo', colors: ['#10B981', '#FFFFFF'], stats: { played: 8, won: 4, drawn: 1, lost: 3, points: 13 } },
    ],
    matches: [
      { id: 'ms1', home: 'Lycée Classique', away: 'Lycée Sainte-Marie', homeScore: 2, awayScore: 0, date: '2024-02-15', time: '14:00', status: 'finished' },
    ]
  },
  
  {
    id: 'gbos-yopougon',
    name: 'Championnat des Gbos',
    type: 'neighborhood',
    season: '2024',
    region: 'Yopougon, Abidjan',
    color: '#F39C12', // Orange flat
    prize: '150 000 FCFA + Trophée',
    currentJourney: 5,
    totalJourneys: 8,
    status: 'active',
    createdBy: {
      id: 'c3',
      name: 'Bamba Amadou',
      role: 'Président du Comité des Gbos',
      organization: 'Association des Jeunes de Yopougon'
    },
    createdAt: '2024-01-10',
    description: 'Le tournoi de foot du quartier Gbos, Yopougon',
    teams: [
      { id: 'fc-gbos', name: 'FC Gbos', city: 'Yopougon Gbos', colors: ['#FACC15', '#000000'], stats: { played: 5, won: 4, drawn: 1, lost: 0, points: 13 }, topScorer: 'Bamba "Zizou"' },
      { id: 'as-niangon', name: 'AS Niangon', city: 'Niangon', colors: ['#22C55E', '#FFFFFF'], stats: { played: 5, won: 3, drawn: 1, lost: 1, points: 10 } },
      { id: 'fc-sicogi', name: 'FC Sicogi', city: 'Sicogi', colors: ['#EF4444', '#FACC15'], stats: { played: 5, won: 3, drawn: 0, lost: 2, points: 9 } },
      { id: 'asc-koweit', name: 'ASC Koweït', city: 'Koweït', colors: ['#3B82F6', '#FFFFFF'], stats: { played: 5, won: 2, drawn: 1, lost: 2, points: 7 } },
    ],
    matches: [
      { id: 'tg1', home: 'FC Gbos', away: 'AS Niangon', homeScore: 2, awayScore: 0, date: '2024-02-15', time: '17:00', status: 'finished' },
    ]
  },
  
  {
    id: 'cocody-cup',
    name: 'Cocody Cup',
    type: 'neighborhood',
    season: '2024',
    region: 'Cocody, Abidjan',
    color: '#9B59B6', // Violet flat
    prize: '200 000 FCFA + 10 sacs de riz',
    currentJourney: 4,
    totalJourneys: 6,
    status: 'active',
    createdBy: {
      id: 'c4',
      name: 'Mme Diallo Fatima',
      role: 'Présidente',
      organization: 'Association des Femmes de Cocody'
    },
    createdAt: '2024-01-20',
    description: 'Tournoi de solidarité du quartier chic d\'Abidjan',
    teams: [
      { id: 'as-cocody', name: 'AS Cocody', city: 'Cocody', colors: ['#A855F7', '#FFFFFF'], stats: { played: 4, won: 4, drawn: 0, lost: 0, points: 12 }, topScorer: 'Kouamé "Moto"' },
      { id: 'fc-riviera', name: 'FC Riviera', city: 'Riviera', colors: ['#EC4899', '#000000'], stats: { played: 4, won: 3, drawn: 0, lost: 1, points: 9 } },
      { id: 'asc-deux-plateaux', name: 'ASC Deux-Plateaux', city: 'Deux-Plateaux', colors: ['#14B8A6', '#FFFFFF'], stats: { played: 4, won: 2, drawn: 1, lost: 1, points: 7 } },
    ],
    matches: [
      { id: 'tc1', home: 'AS Cocody', away: 'FC Riviera', homeScore: 3, awayScore: 1, date: '2024-02-16', time: '16:00', status: 'finished' },
    ]
  },
  
  {
    id: 'intercollege-sud',
    name: 'Inter-Collèges du Sud',
    type: 'college',
    season: '2024',
    region: 'Sud-Comoé',
    color: '#3498DB', // Bleu flat
    prize: '300 000 FCFA',
    currentJourney: 6,
    totalJourneys: 10,
    status: 'active',
    createdBy: {
      id: 'c5',
      name: 'Dr. Koné Moussa',
      role: 'Inspecteur d\'Académie',
      organization: 'Ministère de l\'Éducation Secondaire'
    },
    createdAt: '2024-01-05',
    description: 'Compétition inter-établissements du sud de la Côte d\'Ivoire',
    teams: [
      { id: 'college-gb', name: 'Collège Grand-Bassam', city: 'Grand-Bassam', colors: ['#3B82F6', '#FFFFFF'], stats: { played: 6, won: 5, drawn: 0, lost: 1, points: 15 } },
      { id: 'college-bonoua', name: 'Collège de Bonoua', city: 'Bonoua', colors: ['#EF4444', '#FCD34D'], stats: { played: 6, won: 4, drawn: 1, lost: 1, points: 13 } },
      { id: 'college-assinie', name: 'Collège d\'Assinie', city: 'Assinie', colors: ['#10B981', '#FFFFFF'], stats: { played: 6, won: 3, drawn: 2, lost: 1, points: 11 } },
    ],
    matches: [
      { id: 'ics1', home: 'Collège Grand-Bassam', away: 'Collège de Bonoua', homeScore: 2, awayScore: 1, date: '2024-02-17', time: '15:00', status: 'finished' },
    ]
  },
  
  {
    id: 'u17-national',
    name: 'Championnat National U17',
    type: 'youth',
    season: '2024',
    region: 'National',
    color: '#E91E63', // Rose flat
    prize: 'Formation en Europe',
    currentJourney: 10,
    totalJourneys: 18,
    status: 'active',
    createdBy: {
      id: 'c6',
      name: 'Fédération Ivoirienne de Football',
      role: 'DTN',
      organization: 'FIF - Direction Technique'
    },
    createdAt: '2024-01-15',
    description: 'Championnat des moins de 17 ans, détection des talents',
    teams: [
      { id: 'asec-u17', name: 'ASEC Mimosas U17', city: 'Abidjan', colors: ['#FFD700', '#000000'], stats: { played: 10, won: 9, drawn: 1, lost: 0, points: 28 } },
      { id: 'africa-u17', name: 'Africa Sports U17', city: 'Abidjan', colors: ['#FF0000', '#FFFFFF'], stats: { played: 10, won: 7, drawn: 2, lost: 1, points: 23 } },
      { id: 'stade-u17', name: 'Stade d\'Abidjan U17', city: 'Abidjan', colors: ['#0000FF', '#FFFFFF'], stats: { played: 10, won: 6, drawn: 2, lost: 2, points: 20 } },
    ],
    matches: [
      { id: 'u171', home: 'ASEC U17', away: 'Africa U17', homeScore: 4, awayScore: 2, date: '2024-02-14', time: '10:00', status: 'finished' },
    ]
  },
  
  {
    id: 'univ-felix',
    name: 'Coupe Universitaire Félix Houphouët',
    type: 'college',
    season: '2024',
    region: 'Abidjan & Yamoussoukro',
    color: '#00BCD4', // Cyan flat
    prize: 'Bourses d\'études',
    currentJourney: 3,
    totalJourneys: 6,
    status: 'active',
    createdBy: {
      id: 'c7',
      name: 'Prof. Ouattara Koffi',
      role: 'Doyen',
      organization: 'Université Félix Houphouët-Boigny'
    },
    createdAt: '2024-02-01',
    description: 'Tournoi inter-universités de Côte d\'Ivoire',
    teams: [
      { id: 'univ-cocody', name: 'Université de Cocody', city: 'Cocody', colors: ['#14B8A6', '#FFFFFF'], stats: { played: 3, won: 3, drawn: 0, lost: 0, points: 9 } },
      { id: 'univ-abobo', name: 'Université d\'Abobo', city: 'Abobo', colors: ['#F59E0B', '#000000'], stats: { played: 3, won: 2, drawn: 0, lost: 1, points: 6 } },
      { id: 'essec', name: 'ESSEC', city: 'Abidjan', colors: ['#8B5CF6', '#FFFFFF'], stats: { played: 3, won: 1, drawn: 1, lost: 1, points: 4 } },
    ],
    matches: [
      { id: 'ufh1', home: 'Université de Cocody', away: 'Université d\'Abobo', date: '2024-02-21', time: '16:00', status: 'upcoming' },
    ]
  },
  
  {
    id: 'tournoi-entreprise',
    name: 'Tournoi Inter-Entreprises',
    type: 'corporate',
    season: '2024',
    region: 'Abidjan',
    color: '#607D8B', // Gris bleu flat
    prize: 'Voyage à Dubai',
    currentJourney: 2,
    totalJourneys: 4,
    status: 'active',
    createdBy: {
      id: 'c8',
      name: 'M. Bamba Karim',
      role: 'DRH',
      organization: 'Société Générale Côte d\'Ivoire'
    },
    createdAt: '2024-02-10',
    description: 'Tournoi de football entre entreprises partenaires',
    teams: [
      { id: 'sg-ci', name: 'SG CI Football Club', city: 'Plateau', colors: ['#DC2626', '#000000'], stats: { played: 2, won: 2, drawn: 0, lost: 0, points: 6 } },
      { id: 'bci', name: 'BCI United', city: 'Plateau', colors: ['#2563EB', '#FFFFFF'], stats: { played: 2, won: 1, drawn: 1, lost: 0, points: 4 } },
      { id: 'nsia', name: 'NSIA Banque FC', city: 'Cocody', colors: ['#059669', '#FACC15'], stats: { played: 2, won: 1, drawn: 0, lost: 1, points: 3 } },
    ],
    matches: [
      { id: 'tie1', home: 'SG CI', away: 'BCI United', homeScore: 2, awayScore: 1, date: '2024-02-20', time: '18:00', status: 'finished' },
    ]
  }
]

// ==========================================
// COMPOSANTS
// ==========================================

const TypeBadge = ({ type }: { type: CompType }) => {
  const config: any = {
    professional: { color: '#E74C3C', icon: Trophy, label: 'Pro' },
    school: { color: '#27AE60', icon: School, label: 'Scolaire' },
    college: { color: '#3498DB', icon: Building2, label: 'Études' },
    neighborhood: { color: '#F39C12', icon: Home, label: 'Quartier' },
    youth: { color: '#E91E63', icon: Star, label: 'Jeunes' },
    corporate: { color: '#607D8B', icon: Crown, label: 'Entreprise' }
  }
  const { color, icon: Icon, label } = config[type]
  
  return (
    <span 
      className="text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
      style={{ backgroundColor: color }}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  )
}

const FormDot = ({ result }: { result: string }) => {
  const colors: any = { W: '#27AE60', D: '#F39C12', L: '#E74C3C' }
  return <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[result] || '#95A5A6' }} />
}

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export default function TournamentFlat() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)
  const [filter, setFilter] = useState<'all' | CompType>('all')
  const [search, setSearch] = useState('')

  const filteredComps = COMPETITIONS.filter(c => {
    const matchesFilter = filter === 'all' || c.type === filter
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.region.toLowerCase().includes(search.toLowerCase()) ||
                          c.createdBy.name.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const toggle = (id: string) => setOpenId(openId === id ? null : id)

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-black text-gray-900 mb-2">🏆 Compétitions de Foot</h1>
          <p className="text-gray-500">Côte d'Ivoire • Tous niveaux • Créées par la communauté</p>
          
          <div className="flex gap-4 mt-4 text-sm">
            <span className="bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-700">
              {COMPETITIONS.length} compétitions
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-700">
              {COMPETITIONS.reduce((a,c) => a + c.teams.length, 0)} équipes
            </span>
          </div>
        </div>

        {/* FILTRES */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Rechercher compétition, ville ou créateur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 bg-white"
            />
          </div>
          {['all', 'professional', 'school', 'college', 'neighborhood', 'youth', 'corporate'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                filter === f 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? 'Tout' : 
               f === 'professional' ? 'Pro' : 
               f === 'school' ? 'Scolaire' : 
               f === 'college' ? 'Études' : 
               f === 'neighborhood' ? 'Quartier' : 
               f === 'youth' ? 'Jeunes' : 'Entreprise'}
            </button>
          ))}
        </div>

        {/* LISTE DES COMPÉTITIONS */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredComps.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* HEADER - COULEUR UNIE FLAT */}
                <div 
                  className="p-4 md:p-5 text-white"
                  style={{ backgroundColor: comp.color }}
                >
                  <button
                    onClick={() => toggle(comp.id)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        {comp.type === 'professional' ? <Trophy className="w-6 h-6" /> :
                         comp.type === 'school' ? <School className="w-6 h-6" /> :
                         comp.type === 'college' ? <Building2 className="w-6 h-6" /> :
                         comp.type === 'neighborhood' ? <Home className="w-6 h-6" /> :
                         comp.type === 'corporate' ? <Crown className="w-6 h-6" /> :
                         <Star className="w-6 h-6" />}
                      </div>
                      <div className="text-left">
                        <h3 className="font-black text-lg md:text-xl">{comp.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-white/90">
                          <MapPin className="w-3 h-3" />
                          {comp.region}
                          <span>•</span>
                          <span>{comp.teams.length} équipes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <TypeBadge type={comp.type} />
                      <div className={`p-2 bg-white/20 rounded-lg transition-transform ${openId === comp.id ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </button>

                  {/* CRÉATEUR - Visible toujours */}
                  <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-3">
                    <div 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCreator(comp.createdBy)
                      }}
                    >
                      <User className="w-5 h-5" style={{ color: comp.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/70 uppercase font-bold">Créé par</p>
                      <p 
                        className="font-bold text-sm cursor-pointer hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCreator(comp.createdBy)
                        }}
                      >
                        {comp.createdBy.name}
                      </p>
                      <p className="text-xs text-white/80">{comp.createdBy.organization}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/70">{comp.createdAt}</p>
                    </div>
                  </div>
                </div>

                {/* CONTENU DÉROULANT */}
                <AnimatePresence>
                  {openId === comp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <div className="p-4 md:p-5">
                        
                        {/* Description */}
                        {comp.description && (
                          <p className="text-gray-600 text-sm mb-4 italic">
                            "{comp.description}"
                          </p>
                        )}

                        {/* Stats rapides */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                            <p className="text-xl font-black text-gray-900">{comp.currentJourney}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Journée</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                            <p className="text-xl font-black text-gray-900">{comp.teams.reduce((a,t) => a + t.stats.played, 0)}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Matchs</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                            <p className="text-lg font-black text-gray-900 truncate">{comp.prize.split(' ').slice(0,2).join(' ')}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Prix</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                            <p className={`text-xl font-black ${comp.status === 'active' ? 'text-green-500' : 'text-gray-400'}`}>
                              {comp.status === 'active' ? 'Actif' : 'Terminé'}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Statut</p>
                          </div>
                        </div>

                        {/* Classement */}
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Classement
                        </h4>
                        
                        <div className="space-y-2 mb-4">
                          {comp.teams.sort((a,b) => b.stats.points - a.stats.points).map((team, idx) => (
                            <div 
                              key={team.id}
                              onClick={() => setSelectedTeam(team)}
                              className="bg-white p-3 rounded-xl border border-gray-200 flex items-center gap-3 cursor-pointer hover:border-gray-400 transition-all"
                            >
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                                style={{ 
                                  backgroundColor: idx === 0 ? '#F1C40F' : idx === 1 ? '#95A5A6' : idx === 2 ? '#E67E22' : '#ECF0F1',
                                  color: idx === 0 ? '#000' : '#2C3E50'
                                }}
                              >
                                {idx + 1}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-bold text-gray-900 truncate">{team.name}</h5>
                                  <span className="font-black text-gray-900">{team.stats.points}pts</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                  <span>{team.city}</span>
                                  <span className="flex gap-1">
                                    {['W','W','D','L','W'].slice(0, 5).map((r,i) => (
                                      <FormDot key={i} result={r} />
                                    ))}
                                  </span>
                                  <span>{team.stats.won}V {team.stats.drawn}N {team.stats.lost}D</span>
                                </div>
                              </div>

                              <div className="flex gap-1">
                                {team.colors.map((c,i) => (
                                  <div key={i} className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: c }} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Matchs */}
                        {comp.matches.length > 0 && (
                          <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <Activity className="w-4 h-4" />
                              Derniers matchs
                            </h4>
                            <div className="space-y-2">
                              {comp.matches.map(match => (
                                <div key={match.id} className="bg-white p-3 rounded-xl border border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs font-bold text-gray-400">{match.date} • {match.time}</div>
                                    <span 
                                      className="px-2 py-1 rounded text-xs font-bold text-white"
                                      style={{ 
                                        backgroundColor: match.status === 'live' ? '#E74C3C' : 
                                                        match.status === 'finished' ? '#95A5A6' : '#F39C12'
                                      }}
                                    >
                                      {match.status === 'live' ? 'LIVE' : match.status === 'finished' ? 'Terminé' : 'À venir'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-gray-900">{match.home}</span>
                                        {match.homeScore !== undefined && (
                                          <span className="font-black text-lg">{match.homeScore}</span>
                                        )}
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900">{match.away}</span>
                                        {match.awayScore !== undefined && (
                                          <span className="font-black text-lg">{match.awayScore}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* MODAL CRÉATEUR */}
        <AnimatePresence>
          {selectedCreator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setSelectedCreator(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{selectedCreator.name}</h3>
                    <p className="text-sm text-gray-500">{selectedCreator.role}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Organisation</p>
                      <p className="font-bold text-gray-900">{selectedCreator.organization}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Trophy className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Compétitions créées</p>
                      <p className="font-bold text-gray-900">
                        {COMPETITIONS.filter(c => c.createdBy.id === selectedCreator.id).length} tournois
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedCreator(null)}
                  className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Fermer
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL ÉQUIPE */}
        <AnimatePresence>
          {selectedTeam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setSelectedTeam(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-gray-900">{selectedTeam.name}</h3>
                  <button onClick={() => setSelectedTeam(null)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  {selectedTeam.colors.map((c,i) => (
                    <div key={i} className="w-10 h-10 rounded-lg shadow-sm" style={{ backgroundColor: c }} />
                  ))}
                  <span className="text-gray-500 font-medium">{selectedTeam.city}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl text-center">
                    <p className="text-2xl font-black text-gray-900">{selectedTeam.stats.points}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase">Points</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl text-center">
                    <p className="text-2xl font-black text-gray-900">{selectedTeam.stats.played}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase">Matchs</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl text-center">
                    <p className="text-2xl font-black text-green-600">{selectedTeam.stats.won}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase">Victoires</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl text-center">
                    <p className="text-2xl font-black text-red-500">{selectedTeam.stats.lost}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase">Défaites</p>
                  </div>
                </div>

                {selectedTeam.topScorer && (
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-4">
                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">Meilleur buteur</p>
                    <p className="font-bold text-gray-900 text-lg">{selectedTeam.topScorer}</p>
                  </div>
                )}
                
                {selectedTeam.coach && (
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Shield className="w-4 h-4" />
                    <span>Coach: <span className="font-bold">{selectedTeam.coach}</span></span>
                  </div>
                )}

                <button 
                  onClick={() => setSelectedTeam(null)}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Fermer
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}