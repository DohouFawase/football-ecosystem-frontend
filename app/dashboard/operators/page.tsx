"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Clock, AlertCircle, ShieldCheck, 
  Activity, ChevronRight, Wifi, WifiOff, Phone, 
  Mail, Fingerprint, BarChart3, Zap, TrendingUp,
  Users, Radio, Eye, MoreVertical, Play, Pause,
  Signal, Battery, Map, Navigation, Thermometer,
  Droplets, Wind, Sun, Moon, Maximize2, Minimize2,
  Bell, Search, Filter, ArrowUpRight, ArrowDownRight,
  Target, Award, Crown, Flame, Sparkles, Plus, 
  Trash2, Edit3, CheckCircle2, XCircle, Calendar,
  Trophy, Home, Shield, Swords, MapPinned, 
  ClipboardList, UserPlus, Link2, Unlink, RefreshCw,
  ChevronDown, ChevronUp, AlertTriangle, CheckCircle,
  X, Building2, Flag, Star, ZapOff, Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

// ==========================================
// TYPES
// ==========================================

type TournamentType = 'professional' | 'neighborhood' | 'youth' | 'corporate';
type MatchStatus = 'live' | 'upcoming' | 'finished' | 'break' | 'cancelled';
type OperatorStatus = 'available' | 'busy' | 'offline' | 'on_leave';
type AssignmentStatus = 'confirmed' | 'pending' | 'declined';

interface Neighborhood {
  id: string;
  name: string;
  city: string;
  district: string;
  coordinates: { lat: number; lng: number };
  popularity: number;
  facilities: string[];
}

interface Tournament {
  id: string;
  name: string;
  type: TournamentType;
  season: string;
  startDate: string;
  endDate: string;
  neighborhoods?: Neighborhood[];
  teams: string[];
  status: 'active' | 'finished' | 'upcoming' | 'suspended';
  prize?: string;
  description?: string;
}

interface Operator {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  status: OperatorStatus;
  isOnline: boolean;
  lastSeen: string;
  accuracy: number;
  device?: string;
  battery?: number;
  signal?: number;
  location?: { lat: number; lng: number };
  stats: {
    totalMatches: number;
    incidents: number;
    rating: number;
    tournamentsHandled: number;
  };
  specialties: string[];
  availabilitySchedule: any[];
  currentAssignments: string[];
  maxDailyMatches: number;
}

interface Match {
  id: string;
  tournamentId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName?: string;
  awayTeamName?: string;
  stadium: string;
  field?: string;
  date: string;
  time: string;
  status: MatchStatus;
  score?: { home: number; away: number };
  weather?: { temp: number; condition: 'sunny' | 'cloudy' | 'rainy' | 'windy' };
  attendance?: number;
  capacity?: number;
  operatorId?: string;
  assignmentStatus?: AssignmentStatus;
  financeStatus: 'approved' | 'blocked' | 'pending';
  lastUpdate?: string;
  alerts: number;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

// ==========================================
// DONNÉES INITIALES COMPLÈTES
// ==========================================

const INITIAL_NEIGHBORHOODS: Neighborhood[] = [
  { id: 'n1', name: 'Tokoin Wuiti', city: 'Lomé', district: 'Tokoin', coordinates: { lat: 6.1319, lng: 1.2228 }, popularity: 9, facilities: ['Terrain A', 'Terrain B', 'Eclairage'] },
  { id: 'n2', name: 'Adawlato', city: 'Lomé', district: 'Adawlato', coordinates: { lat: 6.1419, lng: 1.2128 }, popularity: 8, facilities: ['Terrain Central'] },
  { id: 'n3', name: 'Kégué', city: 'Lomé', district: 'Kégué', coordinates: { lat: 6.1619, lng: 1.2328 }, popularity: 7, facilities: ['Stade Quartier'] },
  { id: 'n4', name: 'Bè-Kpota', city: 'Lomé', district: 'Bè', coordinates: { lat: 6.1519, lng: 1.2428 }, popularity: 8, facilities: ['Terrain 1', 'Terrain 2'] },
  { id: 'n5', name: 'Sanguéra', city: 'Lomé', district: 'Sanguéra', coordinates: { lat: 6.1719, lng: 1.2528 }, popularity: 6, facilities: ['Terrain Principal'] },
];

const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    name: 'Championnat National',
    type: 'professional',
    season: '2023-2024',
    startDate: '2023-09-15',
    endDate: '2024-06-30',
    teams: ['Coton FC', 'Loto FC', 'Requins FC', 'ASPAC', 'Dragons FC', 'Buffles du Borgou'],
    status: 'active',
    prize: '50,000,000 FCFA'
  },
  {
    id: 't2',
    name: 'Coupe des Quartiers - Saison 5',
    type: 'neighborhood',
    season: '2024',
    startDate: '2024-03-01',
    endDate: '2024-05-30',
    neighborhoods: [INITIAL_NEIGHBORHOODS[0], INITIAL_NEIGHBORHOODS[1], INITIAL_NEIGHBORHOODS[3]],
    teams: ['AS Tokoin', 'FC Adawlato', 'Bè-Kpota United', 'Sanguéra FC'],
    status: 'active',
    prize: '2,000,000 FCFA + Trophée',
    description: 'Le plus grand tournoi de foot de quartier de la capitale'
  },
  {
    id: 't3',
    name: 'Tournoi Inter-Entreprises',
    type: 'corporate',
    season: '2024',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    teams: ['Team Bolloré', 'EcoBank FC', 'Togocom United'],
    status: 'upcoming',
    prize: '500,000 FCFA'
  }
];

const INITIAL_OPERATORS: Operator[] = [
  {
    id: 'op1',
    name: "Jean Kouassi",
    phone: "+229 97 00 00 01",
    email: "j.kouassi@ligue.bj",
    status: 'busy',
    isOnline: true,
    lastSeen: "Actif",
    accuracy: 98,
    device: "Samsung Galaxy S23",
    battery: 87,
    signal: 4,
    location: { lat: 6.365, lng: 2.418 },
    stats: { totalMatches: 156, incidents: 3, rating: 4.8, tournamentsHandled: 12 },
    specialties: ['Professionnel', 'Quartier'],
    availabilitySchedule: [],
    currentAssignments: ['m1'],
    maxDailyMatches: 2
  },
  {
    id: 'op2',
    name: "Marc Sodjinou",
    phone: "+229 96 00 00 02",
    email: "m.sodjinou@ligue.bj",
    status: 'available',
    isOnline: false,
    lastSeen: "il y a 10 min",
    accuracy: 85,
    device: "iPhone 14 Pro",
    battery: 34,
    signal: 2,
    location: { lat: 6.497, lng: 2.628 },
    stats: { totalMatches: 89, incidents: 12, rating: 3.9, tournamentsHandled: 8 },
    specialties: ['Jeunes', 'Amateur'],
    availabilitySchedule: [],
    currentAssignments: [],
    maxDailyMatches: 3
  },
  {
    id: 'op3',
    name: "Amina Diallo",
    phone: "+229 95 00 00 03",
    email: "a.diallo@ligue.bj",
    status: 'available',
    isOnline: true,
    lastSeen: "Actif",
    accuracy: 96,
    device: "Google Pixel 7",
    battery: 92,
    signal: 5,
    location: { lat: 6.370, lng: 2.430 },
    stats: { totalMatches: 203, incidents: 1, rating: 4.9, tournamentsHandled: 15 },
    specialties: ['Professionnel', 'Corporatif', 'Quartier'],
    availabilitySchedule: [],
    currentAssignments: ['m3'],
    maxDailyMatches: 2
  },
  {
    id: 'op4',
    name: "Koffi Mensah",
    phone: "+229 94 00 00 04",
    email: "k.mensah@ligue.bj",
    status: 'on_leave',
    isOnline: false,
    lastSeen: "il y a 2h",
    accuracy: 91,
    device: "Xiaomi 13",
    battery: 12,
    signal: 3,
    location: { lat: 6.365, lng: 2.418 },
    stats: { totalMatches: 78, incidents: 5, rating: 4.2, tournamentsHandled: 6 },
    specialties: ['Amateur'],
    availabilitySchedule: [],
    currentAssignments: [],
    maxDailyMatches: 1
  },
  {
    id: 'op5',
    name: "Fatima N'Diaye",
    phone: "+229 93 00 00 05",
    email: "f.ndiaye@ligue.bj",
    status: 'available',
    isOnline: true,
    lastSeen: "Actif",
    accuracy: 94,
    device: "iPhone 15",
    battery: 76,
    signal: 5,
    location: { lat: 6.145, lng: 1.215 },
    stats: { totalMatches: 134, incidents: 2, rating: 4.7, tournamentsHandled: 10 },
    specialties: ['Quartier', 'Jeunes'],
    availabilitySchedule: [],
    currentAssignments: [],
    maxDailyMatches: 3
  }
];

const INITIAL_MATCHES: Match[] = [
  {
    id: 'm1',
    tournamentId: 't1',
    homeTeamId: 'team1',
    awayTeamId: 'team2',
    homeTeamName: 'Coton FC',
    awayTeamName: 'Loto FC',
    stadium: "Stade de l'Amitié",
    date: '2024-02-16',
    time: "18:00",
    status: 'live',
    score: { home: 2, away: 1 },
    weather: { temp: 32, condition: 'sunny' },
    attendance: 12500,
    capacity: 20000,
    operatorId: 'op1',
    assignmentStatus: 'confirmed',
    financeStatus: 'approved',
    lastUpdate: "Il y a 2 min",
    alerts: 0,
    priority: 'high'
  },
  {
    id: 'm2',
    tournamentId: 't2',
    homeTeamId: 'team3',
    awayTeamId: 'team4',
    homeTeamName: 'AS Tokoin',
    awayTeamName: 'FC Adawlato',
    stadium: "Terrain A - Tokoin Wuiti",
    field: "Terrain Principal",
    date: '2024-02-16',
    time: "16:00",
    status: 'upcoming',
    weather: { temp: 30, condition: 'cloudy' },
    operatorId: undefined,
    assignmentStatus: 'pending',
    financeStatus: 'pending',
    lastUpdate: "En attente d'assignation",
    alerts: 1,
    priority: 'normal'
  },
  {
    id: 'm3',
    tournamentId: 't1',
    homeTeamId: 'team5',
    awayTeamId: 'team6',
    homeTeamName: 'Dragons FC',
    awayTeamName: 'Buffles du Borgou',
    stadium: "Stade Charles de Gaulle",
    date: '2024-02-16',
    time: "16:30",
    status: 'break',
    score: { home: 0, away: 0 },
    weather: { temp: 30, condition: 'rainy' },
    attendance: 8200,
    capacity: 18000,
    operatorId: 'op3',
    assignmentStatus: 'confirmed',
    financeStatus: 'approved',
    lastUpdate: "À l'instant",
    alerts: 1,
    priority: 'normal'
  },
  {
    id: 'm4',
    tournamentId: 't2',
    homeTeamId: 'team7',
    awayTeamId: 'team8',
    homeTeamName: 'Bè-Kpota United',
    awayTeamName: 'Sanguéra FC',
    stadium: "Terrain Central - Adawlato",
    field: "Terrain Unique",
    date: '2024-02-17',
    time: "15:00",
    status: 'upcoming',
    weather: { temp: 31, condition: 'sunny' },
    operatorId: undefined,
    assignmentStatus: 'pending',
    financeStatus: 'pending',
    lastUpdate: "Assignation requise",
    alerts: 2,
    priority: 'urgent'
  }
];

// ==========================================
// COMPOSANTS RÉUTILISABLES
// ==========================================

const Modal = ({ isOpen, onClose, title, children, size = "lg", icon: Icon }: any) => {
  if (!isOpen) return null;
  
  const sizes: any = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw]"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`bg-white w-full ${sizes[size]} rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="p-2 bg-indigo-100 rounded-xl">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                )}
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors group"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
              </button>
            </div>
            <div className="p-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StatusBadge = ({ status, type = 'match' }: { status: string, type?: 'match' | 'operator' | 'assignment' | 'finance' }) => {
  const configs: any = {
    match: {
      live: { color: 'emerald', icon: Radio, text: 'En direct', animate: true },
      upcoming: { color: 'blue', icon: Calendar, text: 'À venir', animate: false },
      finished: { color: 'slate', icon: CheckCircle, text: 'Terminé', animate: false },
      break: { color: 'amber', icon: Pause, text: 'Mi-temps', animate: false },
      cancelled: { color: 'rose', icon: XCircle, text: 'Annulé', animate: false }
    },
    operator: {
      available: { color: 'emerald', icon: CheckCircle2, text: 'Disponible', animate: false },
      busy: { color: 'amber', icon: Clock, text: 'Occupé', animate: false },
      offline: { color: 'slate', icon: WifiOff, text: 'Hors ligne', animate: false },
      on_leave: { color: 'rose', icon: AlertTriangle, text: 'En congé', animate: false }
    },
    assignment: {
      confirmed: { color: 'emerald', icon: ShieldCheck, text: 'Confirmé', animate: false },
      pending: { color: 'amber', icon: Clock, text: 'En attente', animate: true },
      declined: { color: 'rose', icon: XCircle, text: 'Refusé', animate: false }
    },
    finance: {
      approved: { color: 'emerald', icon: ShieldCheck, text: 'Validé', animate: false },
      blocked: { color: 'rose', icon: AlertCircle, text: 'Bloqué', animate: false },
      pending: { color: 'amber', icon: Clock, text: 'En cours', animate: false }
    }
  };

  const config = configs[type][status] || configs[type]['pending'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-${config.color}-100 text-${config.color}-700 ${config.animate ? 'animate-pulse' : ''}`}>
      <Icon size={12} />
      {config.text}
    </span>
  );
};

const PriorityIndicator = ({ level }: { level: string }) => {
  const colors: any = {
    low: 'bg-slate-400',
    normal: 'bg-blue-400',
    high: 'bg-amber-400',
    urgent: 'bg-rose-500 animate-pulse'
  };
  
  return (
    <div className="flex items-center gap-1" title={`Priorité: ${level}`}>
      <div className={`w-2 h-2 rounded-full ${colors[level] || colors.normal}`} />
      <span className="text-[10px] font-bold uppercase text-slate-500">{level}</span>
    </div>
  );
};

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export default function OperatorSupervision() {
  // États
  const [operators, setOperators] = useState<Operator[]>(INITIAL_OPERATORS);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [neighborhoods] = useState<Neighborhood[]>(INITIAL_NEIGHBORHOODS);
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'operators' | 'matches' | 'tournaments' | 'assign'>('dashboard');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'details' | 'addOperator' | 'editOperator' | 'assign' | 'tournament'>('details');
  
  // Formulaires
  const [newOperator, setNewOperator] = useState<Partial<Operator>>({
    name: '',
    phone: '',
    email: '',
    maxDailyMatches: 2,
    specialties: [],
    status: 'available'
  });

  // Filtrage
  const [filterTournament, setFilterTournament] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ==========================================
  // FONCTIONS CRUD OPÉRATEURS
  // ==========================================

  const handleAddOperator = () => {
    if (!newOperator.name || !newOperator.phone || !newOperator.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const operator: Operator = {
      id: `op${Date.now()}`,
      name: newOperator.name,
      phone: newOperator.phone,
      email: newOperator.email,
      status: 'available',
      isOnline: false,
      lastSeen: 'Jamais connecté',
      accuracy: 100,
      stats: {
        totalMatches: 0,
        incidents: 0,
        rating: 5.0,
        tournamentsHandled: 0
      },
      specialties: newOperator.specialties || [],
      availabilitySchedule: [],
      currentAssignments: [],
      maxDailyMatches: newOperator.maxDailyMatches || 2
    };

    setOperators([...operators, operator]);
    setNewOperator({ name: '', phone: '', email: '', maxDailyMatches: 2, specialties: [], status: 'available' });
    setIsModalOpen(false);
    setModalMode('details');
  };

  const handleDeleteOperator = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet opérateur ?')) {
      setOperators(operators.filter(op => op.id !== id));
      setMatches(matches.map(m => m.operatorId === id ? { ...m, operatorId: undefined, assignmentStatus: 'pending' } : m));
    }
  };

  const handleUpdateOperator = () => {
    if (!selectedOperator) return;
    setOperators(operators.map(op => op.id === selectedOperator.id ? selectedOperator : op));
    setIsModalOpen(false);
    setModalMode('details');
  };

  // ==========================================
  // SYSTÈME D'ASSIGNATION INTELLIGENT
  // ==========================================

  const getAvailableOperators = (match: Match) => {
    return operators.filter(op => {
      const currentMatchCount = matches.filter(m => 
        m.operatorId === op.id && 
        m.date === match.date && 
        ['live', 'upcoming'].includes(m.status)
      ).length;

      const isAvailable = op.status === 'available' || (op.status === 'busy' && currentMatchCount < op.maxDailyMatches);
      const hasCapacity = currentMatchCount < op.maxDailyMatches;
      
      const tournament = tournaments.find(t => t.id === match.tournamentId);
      const isNeighborhoodSpecialist = tournament?.type === 'neighborhood' 
        ? op.specialties.includes('Quartier') 
        : true;

      return isAvailable && hasCapacity && isNeighborhoodSpecialist;
    }).sort((a, b) => {
      const scoreA = (a.isOnline ? 100 : 0) + a.accuracy + (a.specialties.includes('Quartier') ? 50 : 0);
      const scoreB = (b.isOnline ? 100 : 0) + b.accuracy + (b.specialties.includes('Quartier') ? 50 : 0);
      return scoreB - scoreA;
    });
  };

  const handleAssignOperator = (matchId: string, operatorId: string) => {
    const operator = operators.find(op => op.id === operatorId);
    if (!operator) return;

    const todayMatches = matches.filter(m => 
      m.operatorId === operatorId && 
      m.date === selectedMatch?.date &&
      ['live', 'upcoming'].includes(m.status)
    ).length;

    if (todayMatches >= operator.maxDailyMatches) {
      alert(`Cet opérateur a déjà atteint sa limite de ${operator.maxDailyMatches} matchs pour cette journée`);
      return;
    }

    setMatches(matches.map(m => 
      m.id === matchId 
        ? { ...m, operatorId, assignmentStatus: 'confirmed', lastUpdate: 'Assigné à l\'instant' }
        : m
    ));

    setOperators(operators.map(op => 
      op.id === operatorId 
        ? { ...op, status: 'busy', currentAssignments: [...op.currentAssignments, matchId] }
        : op
    ));

    setIsModalOpen(false);
    setModalMode('details');
  };

  const handleUnassignOperator = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (!match?.operatorId) return;

    setMatches(matches.map(m => 
      m.id === matchId 
        ? { ...m, operatorId: undefined, assignmentStatus: 'pending', lastUpdate: 'Désassigné' }
        : m
    ));

    setOperators(operators.map(op => 
      op.id === match.operatorId 
        ? { 
            ...op, 
            status: op.currentAssignments.length <= 1 ? 'available' : 'busy',
            currentAssignments: op.currentAssignments.filter(id => id !== matchId)
          }
        : op
    ));
  };

  // ==========================================
  // RENDU DES VUES
  // ==========================================

  const renderDashboard = () => {
    const stats = {
      totalOperators: operators.length,
      availableOperators: operators.filter(o => o.status === 'available').length,
      onlineOperators: operators.filter(o => o.isOnline).length,
      totalMatches: matches.length,
      liveMatches: matches.filter(m => m.status === 'live').length,
      unassignedMatches: matches.filter(m => !m.operatorId && m.status === 'upcoming').length,
      urgentAssignments: matches.filter(m => !m.operatorId && m.priority === 'urgent').length
    };

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} value={stats.totalOperators} label="Opérateurs" sublabel={`${stats.availableOperators} disponibles`} color="indigo" />
          <StatCard icon={Activity} value={stats.liveMatches} label="Matchs en direct" sublabel={`${stats.totalMatches} au total`} color="emerald" pulse />
          <StatCard icon={AlertCircle} value={stats.unassignedMatches} label="Sans assignation" sublabel={`${stats.urgentAssignments} urgents`} color="amber" alert={stats.urgentAssignments > 0} />
          <StatCard icon={Trophy} value={tournaments.length} label="Tournois actifs" sublabel={`${tournaments.filter(t => t.type === 'neighborhood').length} de quartier`} color="violet" />
        </div>

        {stats.urgentAssignments > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg shadow-rose-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Assignations Urgentes Requises</h3>
                  <p className="text-rose-100">{stats.urgentAssignments} matchs prioritaires sans opérateur assigné</p>
                </div>
              </div>
              <button onClick={() => setActiveTab('assign')} className="px-6 py-3 bg-white text-rose-600 rounded-xl font-bold hover:bg-rose-50 transition-colors shadow-lg">
                Voir les assignations
              </button>
            </div>
          </motion.div>
        )}

        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Radio className="w-6 h-6 text-emerald-500 animate-pulse" />
            Matchs en Direct
          </h2>
          <div className="grid gap-4">
            {matches.filter(m => m.status === 'live').map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                tournament={tournaments.find(t => t.id === match.tournamentId)}
                operator={operators.find(o => o.id === match.operatorId)}
                onClick={() => {
                  setSelectedMatch(match);
                  setIsModalOpen(true);
                  setModalMode('details');
                }}
              />
            ))}
            {matches.filter(m => m.status === 'live').length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                <p className="text-slate-400 font-medium">Aucun match en direct pour le moment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderOperators = () => {
    const filtered = operators.filter(op => 
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.phone.includes(searchQuery)
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900">Gestion des Opérateurs</h2>
          <button 
            onClick={() => {
              setModalMode('addOperator');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95"
          >
            <UserPlus className="w-5 h-5" />
            Nouvel Opérateur
          </button>
        </div>

        <div className="grid gap-4">
          {filtered.map(operator => (
            <motion.div key={operator.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl flex items-center justify-center text-xl font-black text-indigo-600">
                      {operator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-white ${operator.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{operator.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <StatusBadge status={operator.status} type="operator" />
                      <span className="text-sm text-slate-500">{operator.phone}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {operator.specialties.map(spec => (
                        <span key={spec} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{spec}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <div className="text-2xl font-black text-slate-900">{operator.stats.totalMatches}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Matchs</div>
                  </div>
                  <div className="text-right hidden md:block">
                    <div className="text-2xl font-black text-emerald-600">{operator.accuracy}%</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Précision</div>
                  </div>
                  <div className="text-right hidden md:block">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-2xl font-black text-slate-900">{operator.stats.rating}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Note</div>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setSelectedOperator(operator);
                        setModalMode('editOperator');
                        setIsModalOpen(true);
                      }}
                      className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteOperator(operator.id)}
                      className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {operator.currentAssignments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Assignations actuelles</p>
                  <div className="flex gap-2">
                    {operator.currentAssignments.map(matchId => {
                      const match = matches.find(m => m.id === matchId);
                      if (!match) return null;
                      return (
                        <span key={matchId} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {match.stadium} • {match.time}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnassignOperator(matchId);
                            }}
                            className="ml-2 hover:text-rose-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderAssignmentCenter = () => {
    const unassigned = matches.filter(m => !m.operatorId && m.status === 'upcoming');
    const pending = matches.filter(m => m.operatorId && m.assignmentStatus === 'pending');

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Centre d'Assignation</h2>
            <p className="text-slate-500">Gérez les assignations des opérateurs aux matchs</p>
          </div>
          <button 
            onClick={() => {
              unassigned.forEach(match => {
                const available = getAvailableOperators(match);
                if (available.length > 0) {
                  handleAssignOperator(match.id, available[0].id);
                }
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Auto-assigner tout
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Matchs en attente ({unassigned.length})
          </h3>
          <div className="grid gap-4">
            {unassigned.map(match => (
              <AssignmentCard 
                key={match.id}
                match={match}
                tournament={tournaments.find(t => t.id === match.tournamentId)}
                availableOperators={getAvailableOperators(match)}
                onAssign={() => {
                  setSelectedMatch(match);
                  setModalMode('assign');
                  setIsModalOpen(true);
                }}
              />
            ))}
            {unassigned.length === 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="font-bold text-emerald-900">Tous les matchs sont assignés !</p>
              </div>
            )}
          </div>
        </div>

        {pending.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              En attente de confirmation ({pending.length})
            </h3>
            <div className="grid gap-4">
              {pending.map(match => (
                <AssignmentCard 
                  key={match.id}
                  match={match}
                  tournament={tournaments.find(t => t.id === match.tournamentId)}
                  assignedOperator={operators.find(o => o.id === match.operatorId)}
                  onConfirm={() => {
                    setMatches(matches.map(m => m.id === match.id ? { ...m, assignmentStatus: 'confirmed' } : m));
                  }}
                  onDecline={() => handleUnassignOperator(match.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // CONTENU DES MODALS - CORRIGÉ ET COMPLÉTÉ
  // ==========================================

  const renderModalContent = () => {
    // 1. MODAL AJOUT OPÉRATEUR
    if (modalMode === 'addOperator') {
      return (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nom complet *</label>
              <input 
                type="text"
                value={newOperator.name}
                onChange={e => setNewOperator({...newOperator, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: Jean Kouassi"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone *</label>
                <input 
                  type="tel"
                  value={newOperator.phone}
                  onChange={e => setNewOperator({...newOperator, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+229 97 00 00 01"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
                <input 
                  type="email"
                  value={newOperator.email}
                  onChange={e => setNewOperator({...newOperator, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="email@ligue.bj"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Spécialités</label>
              <div className="flex gap-2 flex-wrap">
                {['Professionnel', 'Quartier', 'Jeunes', 'Amateur', 'Corporatif', 'Feminin'].map(spec => (
                  <button
                    key={spec}
                    onClick={() => {
                      const current = newOperator.specialties || [];
                      const updated = current.includes(spec) ? current.filter(s => s !== spec) : [...current, spec];
                      setNewOperator({...newOperator, specialties: updated});
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      (newOperator.specialties || []).includes(spec) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Matchs max/jour</label>
              <input 
                type="number"
                min="1"
                max="5"
                value={newOperator.maxDailyMatches}
                onChange={e => setNewOperator({...newOperator, maxDailyMatches: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handleAddOperator}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Créer l'opérateur
            </button>
          </div>
        </div>
      );
    }

    // 2. MODAL MODIFICATION OPÉRATEUR
    if (modalMode === 'editOperator' && selectedOperator) {
      return (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nom complet</label>
              <input 
                type="text"
                value={selectedOperator.name}
                onChange={e => setSelectedOperator({...selectedOperator, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone</label>
                <input 
                  type="tel"
                  value={selectedOperator.phone}
                  onChange={e => setSelectedOperator({...selectedOperator, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input 
                  type="email"
                  value={selectedOperator.email}
                  onChange={e => setSelectedOperator({...selectedOperator, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Statut</label>
              <select 
                value={selectedOperator.status}
                onChange={e => setSelectedOperator({...selectedOperator, status: e.target.value as OperatorStatus})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="available">Disponible</option>
                <option value="busy">Occupé</option>
                <option value="on_leave">En congé</option>
                <option value="offline">Hors ligne</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Spécialités</label>
              <div className="flex gap-2 flex-wrap">
                {['Professionnel', 'Quartier', 'Jeunes', 'Amateur', 'Corporatif', 'Feminin'].map(spec => (
                  <button
                    key={spec}
                    onClick={() => {
                      const current = selectedOperator.specialties || [];
                      const updated = current.includes(spec) ? current.filter(s => s !== spec) : [...current, spec];
                      setSelectedOperator({...selectedOperator, specialties: updated});
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      selectedOperator.specialties.includes(spec) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handleUpdateOperator}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>
      );
    }

    // 3. MODAL ASSIGNATION
    if (modalMode === 'assign' && selectedMatch) {
      const availableOps = getAvailableOperators(selectedMatch);
      const tournament = tournaments.find(t => t.id === selectedMatch.tournamentId);

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6">
            <h4 className="font-bold text-slate-900 mb-2">{selectedMatch.stadium}</h4>
            <p className="text-sm text-slate-500">{tournament?.name}</p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedMatch.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedMatch.time}</span>
              <PriorityIndicator level={selectedMatch.priority} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Opérateurs disponibles ({availableOps.length})</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableOps.map(op => {
                const todayCount = matches.filter(m => m.operatorId === op.id && m.date === selectedMatch.date).length;
                return (
                  <button
                    key={op.id}
                    onClick={() => handleAssignOperator(selectedMatch.id, op.id)}
                    className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                      {op.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{op.name}</span>
                        {op.isOnline && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>{op.accuracy}% précision</span>
                        <span>•</span>
                        <span>{todayCount}/{op.maxDailyMatches} matchs aujourd'hui</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {op.stats.rating}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
              {availableOps.length === 0 && (
                <div className="text-center py-8 bg-slate-50 rounded-2xl">
                  <p className="text-slate-500 font-medium">Aucun opérateur disponible pour ce créneau</p>
                  <p className="text-sm text-slate-400 mt-1">Vérifiez les disponibilités ou les spécialités requises</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 4. MODAL DÉTAILS MATCH (par défaut)
    if (modalMode === 'details' && selectedMatch) {
      const operator = operators.find(o => o.id === selectedMatch.operatorId);
      const tournament = tournaments.find(t => t.id === selectedMatch.tournamentId);

      return (
        <div className="space-y-8">
          {/* En-tête Match */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-indigo-200 text-sm font-medium mb-1">{tournament?.name}</p>
                  <h2 className="text-3xl font-black">{selectedMatch.homeTeamName} vs {selectedMatch.awayTeamName}</h2>
                  <p className="text-indigo-200 mt-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {selectedMatch.stadium}
                    {selectedMatch.field && <span>• {selectedMatch.field}</span>}
                  </p>
                </div>
                {selectedMatch.score && (
                  <div className="text-5xl font-black tabular-nums bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                    {selectedMatch.score.home}:{selectedMatch.score.away}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <StatusBadge status={selectedMatch.status} type="match" />
                  <p className="text-xs text-indigo-200 uppercase font-bold mt-2">Statut</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <p className="font-bold text-lg">{selectedMatch.time}</p>
                  <p className="text-xs text-indigo-200 uppercase font-bold">{selectedMatch.date}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <p className="font-bold text-lg">{selectedMatch.attendance?.toLocaleString() || 0}</p>
                  <p className="text-xs text-indigo-200 uppercase font-bold">Spectateurs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <p className="font-bold text-lg flex items-center gap-2">
                    {selectedMatch.weather?.temp}°C
                    {selectedMatch.weather?.condition === 'sunny' && <Sun className="w-5 h-5 text-amber-300" />}
                    {selectedMatch.weather?.condition === 'rainy' && <Droplets className="w-5 h-5 text-blue-300" />}
                    {selectedMatch.weather?.condition === 'cloudy' && <Cloud className="w-5 h-5 text-slate-300" />}
                  </p>
                  <p className="text-xs text-indigo-200 uppercase font-bold">Météo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Colonne Opérateur */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Opérateur Assigné
              </h3>
              
              {operator ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-600">
                      {operator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">{operator.name}</h4>
                      <StatusBadge status={selectedMatch.assignmentStatus || 'confirmed'} type="assignment" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm font-bold text-slate-500">Téléphone</span>
                      <span className="font-bold text-slate-900">{operator.phone}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm font-bold text-slate-500">Email</span>
                      <span className="font-bold text-slate-900">{operator.email}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm font-bold text-slate-500">Précision</span>
                      <span className="font-bold text-emerald-600">{operator.accuracy}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm font-bold text-slate-500">Note</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-slate-900">{operator.stats.rating}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleUnassignOperator(selectedMatch.id)}
                    className="w-full py-3 bg-rose-100 text-rose-700 rounded-xl font-bold hover:bg-rose-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Unlink className="w-4 h-4" />
                    Désassigner l'opérateur
                  </button>
                </div>
              ) : (
                <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-2xl p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                  <p className="font-bold text-amber-900 mb-2">Aucun opérateur assigné</p>
                  <p className="text-sm text-amber-700 mb-4">Ce match nécessite une assignation urgente</p>
                  <button 
                    onClick={() => setModalMode('assign')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
                  >
                    Assigner maintenant
                  </button>
                </div>
              )}
            </div>

            {/* Colonne Finance & Statut */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Statut & Finance
              </h3>
              
              <div className="space-y-4">
                <div className={`p-6 rounded-2xl border-2 ${
                  selectedMatch.financeStatus === 'approved' ? 'bg-emerald-50 border-emerald-200' :
                  selectedMatch.financeStatus === 'blocked' ? 'bg-rose-50 border-rose-200' :
                  'bg-amber-50 border-amber-200'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedMatch.financeStatus === 'approved' ? 'bg-emerald-500 text-white' :
                      selectedMatch.financeStatus === 'blocked' ? 'bg-rose-500 text-white' :
                      'bg-amber-500 text-white'
                    }`}>
                      {selectedMatch.financeStatus === 'approved' ? <ShieldCheck size={24} /> :
                       selectedMatch.financeStatus === 'blocked' ? <AlertCircle size={24} /> :
                       <Clock size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Statut Financier</h4>
                      <p className={`text-sm font-medium ${
                        selectedMatch.financeStatus === 'approved' ? 'text-emerald-700' :
                        selectedMatch.financeStatus === 'blocked' ? 'text-rose-700' :
                        'text-amber-700'
                      }`}>
                        {selectedMatch.financeStatus === 'approved' ? 'Paiement club validé et traité' :
                         selectedMatch.financeStatus === 'blocked' ? 'Paiement suspendu - Vérification requise' :
                         'Paiement en cours de traitement'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4">Informations complémentaires</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Dernière mise à jour</span>
                      <span className="font-bold text-slate-900">{selectedMatch.lastUpdate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Alertes</span>
                      <span className={`font-bold ${selectedMatch.alerts > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {selectedMatch.alerts > 0 ? `${selectedMatch.alerts} active(s)` : 'Aucune'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Priorité</span>
                      <span className="font-bold text-slate-900 capitalize">{selectedMatch.priority}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Capacité stade</span>
                      <span className="font-bold text-slate-900">{selectedMatch.capacity?.toLocaleString()} places</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Fallback si aucune condition n'est remplie
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Chargement...</p>
      </div>
    );
  };

  // ==========================================
  // RENDER PRINCIPAL
  // ==========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 lg:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Navigation */}
        <header className="mb-8">
          <div className="bg-white rounded-3xl p-4 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Ligue de Football</h1>
                  <p className="text-sm text-slate-500">Système de Supervision & Assignation</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
              {[
                { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
                { id: 'operators', label: 'Opérateurs', icon: Users },
                { id: 'assign', label: 'Assignations', icon: Link2 },
                { id: 'matches', label: 'Matchs', icon: Swords },
                { id: 'tournaments', label: 'Tournois', icon: Trophy }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'operators' && renderOperators()}
          {activeTab === 'assign' && renderAssignmentCenter()}
          {activeTab === 'matches' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Tous les Matchs</h2>
              <div className="grid gap-4">
                {matches.map(match => (
                  <MatchCard 
                    key={match.id}
                    match={match}
                    tournament={tournaments.find(t => t.id === match.tournamentId)}
                    operator={operators.find(o => o.id === match.operatorId)}
                    onClick={() => {
                      setSelectedMatch(match);
                      setIsModalOpen(true);
                      setModalMode('details');
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {activeTab === 'tournaments' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Tournois</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* MODAL UNIQUE AVEC RENDU CONDITIONNEL CORRECT */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMatch(null);
            setSelectedOperator(null);
          }}
          title={
            modalMode === 'addOperator' ? 'Nouvel Opérateur' :
            modalMode === 'editOperator' ? 'Modifier Opérateur' :
            modalMode === 'assign' ? 'Assigner un Opérateur' :
            selectedMatch ? `${selectedMatch.homeTeamName} vs ${selectedMatch.awayTeamName}` :
            'Détails'
          }
          size={modalMode === 'assign' ? 'md' : 'lg'}
          icon={
            modalMode === 'addOperator' ? UserPlus :
            modalMode === 'editOperator' ? Edit3 :
            modalMode === 'assign' ? Link2 :
            Eye
          }
        >
          {renderModalContent()}
        </Modal>

      </div>
    </div>
  );
}

// ==========================================
// SOUS-COMPOSANTS
// ==========================================

function StatCard({ icon: Icon, value, label, sublabel, color, pulse = false, alert = false }: any) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-6 relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-3xl font-black text-${color}-600`}>{value}</p>
          <p className="font-bold text-slate-900 mt-1">{label}</p>
          <p className={`text-xs font-bold text-${color}-400 uppercase mt-1`}>{sublabel}</p>
        </div>
        <div className={`p-3 bg-${color}-100 rounded-xl ${pulse ? 'animate-pulse' : ''}`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
      {alert && <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />}
    </motion.div>
  );
}

function MatchCard({ match, tournament, operator, onClick }: { match: Match, tournament?: Tournament, operator?: Operator, onClick: () => void }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} onClick={onClick} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 cursor-pointer hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <StatusBadge status={match.status} type="match" />
          {tournament?.type === 'neighborhood' && (
            <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-lg text-xs font-bold">
              <Home className="w-3 h-3 inline mr-1" />
              Quartier
            </span>
          )}
          <PriorityIndicator level={match.priority} />
        </div>
        {match.score && (
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {match.score.home} - {match.score.away}
          </div>
        )}
      </div>

      <h3 className="font-bold text-lg text-slate-900 mb-2">
        {match.homeTeamName || match.homeTeamId} vs {match.awayTeamName || match.awayTeamId}
      </h3>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {match.stadium}</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {match.time}</span>
        {match.field && <span className="text-indigo-600 font-medium">• {match.field}</span>}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          {operator ? (
            <>
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-600">
                {operator.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{operator.name}</p>
                <StatusBadge status={match.assignmentStatus || 'confirmed'} type="assignment" />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-bold">Sans assignation</span>
            </div>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
      </div>
    </motion.div>
  );
}

function AssignmentCard({ match, tournament, availableOperators, assignedOperator, onAssign, onConfirm, onDecline }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{tournament?.name}</span>
            <PriorityIndicator level={match.priority} />
          </div>
          <h3 className="font-bold text-lg text-slate-900">{match.stadium}</h3>
          <p className="text-sm text-slate-500">{match.date} à {match.time}</p>
          {match.field && <p className="text-sm text-indigo-600 font-medium mt-1">{match.field}</p>}
        </div>
        
        {assignedOperator ? (
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-600">
                {assignedOperator.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold">{assignedOperator.name}</p>
                <p className="text-xs text-slate-500">En attente de confirmation</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={onConfirm} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-200 transition-colors">Confirmer</button>
              <button onClick={onDecline} className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200 transition-colors">Refuser</button>
            </div>
          </div>
        ) : (
          <button onClick={onAssign} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Assigner
          </button>
        )}
      </div>

      {!assignedOperator && availableOperators && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">{availableOperators.length} opérateurs disponibles</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {availableOperators.slice(0, 3).map((op: Operator) => (
              <div key={op.id} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg whitespace-nowrap">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                  {op.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-xs font-bold text-slate-700">{op.name}</span>
                <span className="text-xs text-emerald-600">{op.accuracy}%</span>
              </div>
            ))}
            {availableOperators.length > 3 && (
              <div className="flex items-center px-3 py-2 bg-slate-50 rounded-lg">
                <span className="text-xs font-bold text-slate-500">+{availableOperators.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const typeColors: any = {
    professional: 'from-blue-500 to-indigo-600',
    neighborhood: 'from-violet-500 to-purple-600',
    youth: 'from-emerald-500 to-teal-600',
    corporate: 'from-amber-500 to-orange-600'
  };

  const typeLabels: any = {
    professional: 'Professionnel',
    neighborhood: 'Quartier',
    youth: 'Jeunes',
    corporate: 'Corporatif'
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all">
      <div className={`h-24 bg-gradient-to-br ${typeColors[tournament.type]} p-6 relative`}>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold">{typeLabels[tournament.type]}</span>
        </div>
        <h3 className="text-xl font-black text-white mt-4">{tournament.name}</h3>
        <p className="text-white/80 text-sm">Saison {tournament.season}</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {tournament.startDate}</span>
          <span className="flex items-center gap-1"><Flag className="w-4 h-4" /> {tournament.teams.length} équipes</span>
        </div>
        
        {tournament.neighborhoods && (
          <div className="mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Quartiers participants</p>
            <div className="flex flex-wrap gap-2">
              {tournament.neighborhoods.map(n => (
                <span key={n.id} className="px-2 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-bold">
                  <MapPinned className="w-3 h-3 inline mr-1" />
                  {n.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {tournament.prize && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-amber-900">{tournament.prize}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}