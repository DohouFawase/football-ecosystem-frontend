"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, MapPin, Users, Calendar, ChevronDown, 
  School, Building2, Home, Star, Medal, 
  Flame, Crown, Swords, Activity, Shield, 
  ChevronRight, Search, BarChart3, Award, 
  X, User, Flag, Plus, Settings, Layers,
  TrendingUp, Target, Zap, Radio
} from 'lucide-react'

// ==========================================
// TYPES
// ==========================================

type CompType = 'professional' | 'school' | 'college' | 'neighborhood' | 'youth' | 'corporate'

interface Team {
  id: string
  name: string
  city: string
  colors: [string, string]
  category: string // U17, U20, Senior, etc.
  stats: {
    played: number
    won: number
    drawn: number
    lost: number
    points: number
  }
  topScorer?: string
  coach: string
  contact: string
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
  field?: string
}

interface Tournament {
  id: string
  name: string
  type: CompType
  season: string
  region: string
  color: string
  prize: string
  teams: Team[]
  matches: Match[]
  currentJourney: number
  totalJourneys: number
  status: 'active' | 'finished' | 'upcoming'
  description: string
  requirements: string[] // Ce qu'il faut pour participer
  fees: string // Frais d'inscription
}

interface Organization {
  id: string
  name: string
  fullName: string
  logo?: string
  founded: number
  president: string
  headquarters: string
  contact: string
  website?: string
  description: string
  tournaments: Tournament[]
}

// ==========================================
// ORGANISATION CENTRALE
// ==========================================

const FEDERATION: Organization = {
  id: 'fif',
  name: 'FIF',
  fullName: 'Fédération Ivoirienne de Football',
  founded: 1960,
  president: 'Yacine Idriss Diallo',
  headquarters: 'Abidjan, Plateau',
  contact: '+225 20 22 50 00',
  website: 'www.fif.ci',
  description: 'Organisation officielle gérant tous les tournois de football en Côte d\'Ivoire, du professionnel au quartier.',
  tournaments: [
    // 🏆 PROFESSIONNEL
    {
      id: 'ligue1',
      name: 'Ligue 1',
      type: 'professional',
      season: '2023-2024',
      region: 'National',
      color: '#C0392B',
      prize: '100 000 000 FCFA + Coupe du Président',
      currentJourney: 15,
      totalJourneys: 30,
      status: 'active',
      description: 'Championnat national de première division. 18 clubs professionnels.',
      requirements: ['Licence professionnelle', 'Stade homologué', 'Assurance joueurs'],
      fees: '5 000 000 FCFA',
      teams: [
        { 
          id: 'asec', name: 'ASEC Mimosas', city: 'Abidjan', category: 'Senior',
          colors: ['#FFD700', '#000000'], coach: 'Julien Chevalier', contact: '+225 07 07 07 07',
          stats: { played: 15, won: 12, drawn: 2, lost: 1, points: 38 }, topScorer: 'Karim Konaté (12 buts)'
        },
        { 
          id: 'africa', name: 'Africa Sports', city: 'Abidjan', category: 'Senior',
          colors: ['#E74C3C', '#FFFFFF'], coach: 'Sébastien Desabre', contact: '+225 08 08 08 08',
          stats: { played: 15, won: 10, drawn: 3, lost: 2, points: 33 }
        },
        { 
          id: 'stade', name: 'Stade d\'Abidjan', city: 'Abidjan', category: 'Senior',
          colors: ['#2980B9', '#FFFFFF'], coach: 'Patrice Beaumelle', contact: '+225 09 09 09 09',
          stats: { played: 15, won: 8, drawn: 4, lost: 3, points: 28 }
        },
        { 
          id: 'sab', name: 'SAB de Bouaké', city: 'Bouaké', category: 'Senior',
          colors: ['#27AE60', '#FFFFFF'], coach: 'Emmanuel Amunike', contact: '+225 10 10 10 10',
          stats: { played: 15, won: 7, drawn: 3, lost: 5, points: 24 }
        },
      ],
      matches: [
        { id: 'm1', home: 'ASEC Mimosas', away: 'Africa Sports', homeScore: 3, awayScore: 1, date: '2024-02-18', time: '16:00', status: 'finished' },
        { id: 'm2', home: 'Stade d\'Abidjan', away: 'SAB de Bouaké', date: '2024-02-20', time: '15:30', status: 'upcoming' },
      ]
    },
    
    // 🎓 SCOLAIRE
    {
      id: 'champ-scolaire',
      name: 'Championnat Scolaire National',
      type: 'school',
      season: '2023-2024',
      region: 'National (12 districts)',
      color: '#27AE60',
      prize: 'Trophée + Kits sportifs + Bourses',
      currentJourney: 8,
      totalJourneys: 12,
      status: 'active',
      description: 'Compétition inter-lycées et collèges. Catégories: U15 et U18.',
      requirements: ['Immatriculation scolaire', 'Autorisation parentale', 'Certificat médical'],
      fees: 'Gratuit',
      teams: [
        { 
          id: 'lc-abidjan', name: 'Lycée Classique d\'Abidjan', city: 'Cocody', category: 'U18',
          colors: ['#1E40AF', '#FFFFFF'], coach: 'M. Kouassi Jean', contact: 'lycee.classique@edu.ci',
          stats: { played: 8, won: 7, drawn: 1, lost: 0, points: 22 }
        },
        { 
          id: 'ls-sainte-marie', name: 'Lycée Sainte-Marie', city: 'Plateau', category: 'U18',
          colors: ['#E74C3C', '#FFFFFF'], coach: 'Mme Diallo Aminata', contact: 'sainte.marie@edu.ci',
          stats: { played: 8, won: 6, drawn: 1, lost: 1, points: 19 }
        },
        { 
          id: 'lt-yopougon', name: 'Lycée Technique de Yopougon', city: 'Yopougon', category: 'U18',
          colors: ['#F39C12', '#000000'], coach: 'M. Bamba Koffi', contact: 'lt.yopougon@edu.ci',
          stats: { played: 8, won: 5, drawn: 2, lost: 1, points: 17 }
        },
        { 
          id: 'college-bogbo', name: 'Collège Moderne Bogbo', city: 'Abobo', category: 'U15',
          colors: ['#16A085', '#FFFFFF'], coach: 'M. Ouattara Moussa', contact: 'bogbo@edu.ci',
          stats: { played: 8, won: 4, drawn: 1, lost: 3, points: 13 }
        },
      ],
      matches: [
        { id: 'ms1', home: 'Lycée Classique', away: 'Lycée Sainte-Marie', homeScore: 2, awayScore: 0, date: '2024-02-15', time: '14:00', status: 'finished', field: 'Stade Félix Houphouët' },
      ]
    },
    
    // 🏫 UNIVERSITAIRE
    {
      id: 'coupe-univ',
      name: 'Coupe Universitaire',
      type: 'college',
      season: '2024',
      region: 'National (5 universités)',
      color: '#2980B9',
      prize: 'Trophée + Bourses d\'études',
      currentJourney: 4,
      totalJourneys: 8,
      status: 'active',
      description: 'Tournoi inter-universités. Ouvert à tous les étudiants régulièrement inscrits.',
      requirements: ['Carte d\'étudiant valide', 'Certificat de scolarité', 'Licence FIF'],
      fees: '50 000 FCFA',
      teams: [
        { 
          id: 'univ-cocody', name: 'Université Félix Houphouët-Boigny', city: 'Cocody', category: 'Senior',
          colors: ['#8E44AD', '#FFFFFF'], coach: 'Prof. Koné', contact: 'sport@univ-fhb.ci',
          stats: { played: 4, won: 4, drawn: 0, lost: 0, points: 12 }
        },
        { 
          id: 'univ-abobo', name: 'Université Nangui Abrogoua', city: 'Abobo', category: 'Senior',
          colors: ['#D35400', '#FFFFFF'], coach: 'Dr. Touré', contact: 'sport@una.ci',
          stats: { played: 4, won: 3, drawn: 0, lost: 1, points: 9 }
        },
        { 
          id: 'essec', name: 'ESSEC', city: 'Abidjan', category: 'Senior',
          colors: ['#27AE60', '#F1C40F'], coach: 'M. Yao', contact: 'sport@essec.ci',
          stats: { played: 4, won: 2, drawn: 1, lost: 1, points: 7 }
        },
      ],
      matches: [
        { id: 'cu1', home: 'Université FHB', away: 'Université Nangui', date: '2024-02-22', time: '16:00', status: 'upcoming', field: 'Stade Universitaire' },
      ]
    },
    
    // 🏘️ QUARTIER - NIVEAU 1
    {
      id: 'champ-quartier-abidjan',
      name: 'Championnat des Quartiers - Abidjan',
      type: 'neighborhood',
      season: '2024',
      region: 'Abidjan (10 communes)',
      color: '#F39C12',
      prize: '2 000 000 FCFA + Coupe + Voyage',
      currentJourney: 6,
      totalJourneys: 10,
      status: 'active',
      description: 'Tournoi officiel des équipes de quartier. Phase qualificative par commune.',
      requirements: ['Dossier complet', 'Caution 100 000 FCFA', 'Stade de quartier homologué'],
      fees: '75 000 FCFA',
      teams: [
        { 
          id: 'as-cocody', name: 'AS Cocody', city: 'Cocody', category: 'Senior',
          colors: ['#9B59B6', '#FFFFFF'], coach: 'Kouamé "Moto"', contact: '+225 01 01 01 01',
          stats: { played: 6, won: 5, drawn: 1, lost: 0, points: 16 }, topScorer: 'Kouamé (8 buts)'
        },
        { 
          id: 'fc-gbos', name: 'FC Gbos de Yopougon', city: 'Yopougon', category: 'Senior',
          colors: ['#F1C40F', '#000000'], coach: 'Bamba Amadou', contact: '+225 02 02 02 02',
          stats: { played: 6, won: 4, drawn: 1, lost: 1, points: 13 }, topScorer: 'Bamba "Zizou" (6 buts)'
        },
        { 
          id: 'fc-riviera', name: 'FC Riviera', city: 'Cocody', category: 'Senior',
          colors: ['#E91E63', '#000000'], coach: 'Koné Ibrahim', contact: '+225 03 03 03 03',
          stats: { played: 6, won: 4, drawn: 0, lost: 2, points: 12 }
        },
        { 
          id: 'asc-deux-plateaux', name: 'ASC Deux-Plateaux', city: 'Cocody', category: 'Senior',
          colors: ['#1ABC9C', '#FFFFFF'], coach: 'Touré Mamadou', contact: '+225 04 04 04 04',
          stats: { played: 6, won: 3, drawn: 2, lost: 1, points: 11 }
        },
      ],
      matches: [
        { id: 'cq1', home: 'AS Cocody', away: 'FC Gbos', homeScore: 2, awayScore: 1, date: '2024-02-16', time: '16:00', status: 'finished', field: 'Terrain Municipal Cocody' },
      ]
    },
    
    // 🏘️ QUARTIER - NIVEAU 2 (Régional)
    {
      id: 'coupe-regionale-sud',
      name: 'Coupe Régionale du Sud',
      type: 'neighborhood',
      season: '2024',
      region: 'Région du Sud (Abidjan, Grand-Bassam, Bonoua)',
      color: '#E67E22',
      prize: '3 000 000 FCFA + Qualif. Nationale',
      currentJourney: 3,
      totalJourneys: 6,
      status: 'active',
      description: 'Phase régionale regroupant les meilleures équipes des championnats de quartier.',
      requirements: ['Qualification championnat local', 'Licence FIF à jour', 'Matériel homologué'],
      fees: '100 000 FCFA',
      teams: [
        { 
          id: 'as-cocody-reg', name: 'AS Cocody (Champ. Abidjan)', city: 'Cocody', category: 'Senior',
          colors: ['#9B59B6', '#FFFFFF'], coach: 'Kouamé "Moto"', contact: '+225 01 01 01 01',
          stats: { played: 3, won: 3, drawn: 0, lost: 0, points: 9 }
        },
        { 
          id: 'fc-bassam', name: 'FC Grand-Bassam', city: 'Grand-Bassam', category: 'Senior',
          colors: ['#3498DB', '#FFFFFF'], coach: 'M. Loba', contact: '+225 05 05 05 05',
          stats: { played: 3, won: 2, drawn: 0, lost: 1, points: 6 }
        },
      ],
      matches: [
        { id: 'crs1', home: 'AS Cocody', away: 'FC Grand-Bassam', date: '2024-02-25', time: '15:00', status: 'upcoming', field: 'Stade de Grand-Bassam' },
      ]
    },
    
    // 👶 JEUNES - U17
    {
      id: 'champ-u17',
      name: 'Championnat National U17',
      type: 'youth',
      season: '2024',
      region: 'National',
      color: '#E91E63',
      prize: 'Formation en Europe + Matériel',
      currentJourney: 10,
      totalJourneys: 18,
      status: 'active',
      description: 'Championnat des moins de 17 ans. Détection pour les centres de formation professionnels.',
      requirements: ['Certificat de naissance', 'Test osseux', 'Autorisation parentale'],
      fees: 'Gratuit',
      teams: [
        { 
          id: 'asec-u17', name: 'ASEC Mimosas U17', city: 'Abidjan', category: 'U17',
          colors: ['#FFD700', '#000000'], coach: 'Amunike', contact: 'academy@asec.ci',
          stats: { played: 10, won: 9, drawn: 1, lost: 0, points: 28 }
        },
        { 
          id: 'africa-u17', name: 'Africa Sports U17', city: 'Abidjan', category: 'U17',
          colors: ['#E74C3C', '#FFFFFF'], coach: 'Gili', contact: 'academy@africasports.ci',
          stats: { played: 10, won: 7, drawn: 2, lost: 1, points: 23 }
        },
        { 
          id: 'academie-fhb', name: 'Académie FHB', city: 'Yamoussoukro', category: 'U17',
          colors: ['#8E44AD', '#F1C40F'], coach: 'M. Koné', contact: 'academie@fif.ci',
          stats: { played: 10, won: 6, drawn: 2, lost: 2, points: 20 }
        },
      ],
      matches: [
        { id: 'u17-1', home: 'ASEC U17', away: 'Africa U17', homeScore: 4, awayScore: 2, date: '2024-02-14', time: '10:00', status: 'finished', field: 'Centre Technique FIF' },
      ]
    },
    
    // 👶 JEUNES - U20
    {
      id: 'champ-u20',
      name: 'Championnat National U20',
      type: 'youth',
      season: '2024',
      region: 'National',
      color: '#9B59B6',
      prize: 'Intégration équipes pro + Bourses',
      currentJourney: 8,
      totalJourneys: 14,
      status: 'active',
      description: 'Championnat des moins de 20 ans. Passage vers le professionnalisme.',
      requirements: ['Âge vérifié', 'Licence FIF', 'Centre de formation agréé'],
      fees: 'Gratuit',
      teams: [
        { 
          id: 'asec-u20', name: 'ASEC Mimosas U20', city: 'Abidjan', category: 'U20',
          colors: ['#FFD700', '#000000'], coach: 'Desabre', contact: 'academy@asec.ci',
          stats: { played: 8, won: 7, drawn: 1, lost: 0, points: 22 }
        },
        { 
          id: 'wac-u20', name: 'Williams AC U20', city: 'Abidjan', category: 'U20',
          colors: ['#9B59B6', '#F1C40F'], coach: 'M. Touré', contact: 'academy@wac.ci',
          stats: { played: 8, won: 5, drawn: 2, lost: 1, points: 17 }
        },
      ],
      matches: [
        { id: 'u20-1', home: 'ASEC U20', away: 'WAC U20', date: '2024-02-21', time: '15:00', status: 'upcoming', field: 'Parc des Sports' },
      ]
    },
    
    // 🏢 ENTREPRISE
    {
      id: 'coupe-entreprise',
      name: 'Coupe des Entreprises',
      type: 'corporate',
      season: '2024',
      region: 'Abidjan',
      color: '#607D8B',
      prize: 'Trophée + Don caritatif',
      currentJourney: 2,
      totalJourneys: 4,
      status: 'active',
      description: 'Tournoi de solidarité entre entreprises. Les frais d\'inscription sont reversés à des œuvres sociales.',
      requirements: ['Entreprise immatriculée', 'Équipe salariés', 'Charte fair-play signée'],
      fees: '500 000 FCFA (reversés)',
      teams: [
        { 
          id: 'societe-generale', name: 'Société Générale CI', city: 'Plateau', category: 'Senior',
          colors: ['#C0392B', '#000000'], coach: 'M. Diallo (DRH)', contact: 'drh@sgci.ci',
          stats: { played: 2, won: 2, drawn: 0, lost: 0, points: 6 }
        },
        { 
          id: 'bci', name: 'BCI - Banque pour le Commerce', city: 'Plateau', category: 'Senior',
          colors: ['#2980B9', '#FFFFFF'], coach: 'Mme Koffi', contact: 'drh@bci.ci',
          stats: { played: 2, won: 1, drawn: 1, lost: 0, points: 4 }
        },
        { 
          id: 'orange', name: 'Orange Côte d\'Ivoire', city: 'Cocody', category: 'Senior',
          colors: ['#F39C12', '#000000'], coach: 'M. Bamba', contact: 'drh@orange.ci',
          stats: { played: 2, won: 1, drawn: 0, lost: 1, points: 3 }
        },
      ],
      matches: [
        { id: 'ce1', home: 'Société Générale', away: 'BCI', homeScore: 2, awayScore: 1, date: '2024-02-20', time: '18:00', status: 'finished', field: 'Stade Municipal' },
      ]
    }
  ]
}

// ==========================================
// COMPOSANTS
// ==========================================

const TypeBadge = ({ type }: { type: CompType }) => {
  const config: any = {
    professional: { color: '#C0392B', icon: Trophy, label: 'Pro' },
    school: { color: '#27AE60', icon: School, label: 'Scolaire' },
    college: { color: '#2980B9', icon: Building2, label: 'Université' },
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
  const colors: any = { W: '#27AE60', D: '#F39C12', L: '#C0392B' }
  return <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[result] || '#95A5A6' }} />
}

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export default function FederationTournaments() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [filter, setFilter] = useState<'all' | CompType>('all')
  const [search, setSearch] = useState('')
  const [showOrgInfo, setShowOrgInfo] = useState(false)

  const filteredTournaments = FEDERATION.tournaments.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.region.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const toggle = (id: string) => setOpenId(openId === id ? null : id)

  // Stats globales
  const totalTeams = FEDERATION.tournaments.reduce((a, t) => a + t.teams.length, 0)
  const activeTournaments = FEDERATION.tournaments.filter(t => t.status === 'active').length

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER ORGANISATION */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">{FEDERATION.fullName}</h1>
                  <p className="text-gray-500 text-sm">Depuis {FEDERATION.founded} • {FEDERATION.headquarters}</p>
                </div>
              </div>
              <p className="text-gray-600 mt-2 max-w-2xl">{FEDERATION.description}</p>
            </div>
            <button 
              onClick={() => setShowOrgInfo(true)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-colors"
            >
              Infos
            </button>
          </div>
          
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-black text-gray-900">{FEDERATION.tournaments.length}</p>
              <p className="text-xs font-bold text-gray-400 uppercase">Tournois</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-black text-gray-900">{totalTeams}</p>
              <p className="text-xs font-bold text-gray-400 uppercase">Équipes</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-black text-green-600">{activeTournaments}</p>
              <p className="text-xs font-bold text-gray-400 uppercase">Actifs</p>
            </div>
          </div>
        </div>

        {/* FILTRES */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Rechercher un tournoi..."
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
               f === 'college' ? 'Univ' : 
               f === 'neighborhood' ? 'Quartier' : 
               f === 'youth' ? 'Jeunes' : 'Entreprise'}
            </button>
          ))}
        </div>

        {/* LISTE DES TOURNOIS */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* HEADER - COULEUR UNIE */}
                <div 
                  className="p-4 md:p-5 text-white"
                  style={{ backgroundColor: tournament.color }}
                >
                  <button
                    onClick={() => toggle(tournament.id)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        {tournament.type === 'professional' ? <Trophy className="w-6 h-6" /> :
                         tournament.type === 'school' ? <School className="w-6 h-6" /> :
                         tournament.type === 'college' ? <Building2 className="w-6 h-6" /> :
                         tournament.type === 'neighborhood' ? <Home className="w-6 h-6" /> :
                         tournament.type === 'corporate' ? <Crown className="w-6 h-6" /> :
                         <Star className="w-6 h-6" />}
                      </div>
                      <div className="text-left">
                        <h3 className="font-black text-lg md:text-xl">{tournament.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-white/90">
                          <MapPin className="w-3 h-3" />
                          {tournament.region}
                          <span>•</span>
                          <span>{tournament.teams.length} équipes</span>
                          <span>•</span>
                          <span>Saison {tournament.season}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <TypeBadge type={tournament.type} />
                      <div className={`p-2 bg-white/20 rounded-lg transition-transform ${openId === tournament.id ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </button>

                  {/* Info rapide */}
                  <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Medal className="w-4 h-4" />
                      {tournament.prize.split(' ').slice(0,3).join(' ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-4 h-4" />
                      J {tournament.currentJourney}/{tournament.totalJourneys}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {tournament.fees}
                    </span>
                  </div>
                </div>

                {/* CONTENU */}
                <AnimatePresence>
                  {openId === tournament.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <div className="p-4 md:p-5">
                        
                        {/* Description */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-4">
                          <p className="text-gray-700 text-sm mb-2">{tournament.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {tournament.requirements.map((req, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                                ✓ {req}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Classement */}
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Classement
                        </h4>
                        
                        <div className="space-y-2 mb-4">
                          {tournament.teams.sort((a,b) => b.stats.points - a.stats.points).map((team, idx) => (
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
                                  <div>
                                    <h5 className="font-bold text-gray-900 truncate">{team.name}</h5>
                                    <p className="text-xs text-gray-500">{team.city} • {team.category}</p>
                                  </div>
                                  <span className="font-black text-gray-900">{team.stats.points}pts</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
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
                        {tournament.matches.length > 0 && (
                          <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <Activity className="w-4 h-4" />
                              Matchs récents
                            </h4>
                            <div className="space-y-2">
                              {tournament.matches.map(match => (
                                <div key={match.id} className="bg-white p-3 rounded-xl border border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
                                      <Calendar className="w-3 h-3" />
                                      {match.date} • {match.time}
                                      {match.field && <span>• {match.field}</span>}
                                    </div>
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
                                          <span className="font-black text-xl">{match.homeScore}</span>
                                        )}
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900">{match.away}</span>
                                        {match.awayScore !== undefined && (
                                          <span className="font-black text-xl">{match.awayScore}</span>
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

        {/* MODAL ORGANISATION */}
        <AnimatePresence>
          {showOrgInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setShowOrgInfo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{FEDERATION.fullName}</h3>
                    <p className="text-sm text-gray-500">Fondée en {FEDERATION.founded}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Président</p>
                      <p className="font-bold text-gray-900">{FEDERATION.president}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Siège</p>
                      <p className="font-bold text-gray-900">{FEDERATION.headquarters}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Layers className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Tournois gérés</p>
                      <p className="font-bold text-gray-900">{FEDERATION.tournaments.length} compétitions</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowOrgInfo(false)}
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
                  <span className="text-gray-500 font-medium">{selectedTeam.city} • {selectedTeam.category}</span>
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

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Coach</p>
                      <p className="font-bold text-gray-900">{selectedTeam.coach}</p>
                    </div>
                  </div>
                  
                  {selectedTeam.topScorer && (
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                      <p className="text-xs font-bold text-orange-600 uppercase mb-1">Meilleur buteur</p>
                      <p className="font-bold text-gray-900 text-lg">{selectedTeam.topScorer}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Layers className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Contact</p>
                      <p className="font-bold text-gray-900 text-sm">{selectedTeam.contact}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedTeam(null)}
                  className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
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