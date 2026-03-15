// app/analyst/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  ReferenceLine,
  Brush
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Target, 
  Calendar, 
  Filter, 
  Download, 
  Share2, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Search,
  BarChart3,
  PieChart as PieChartIcon,
  Radar as RadarIcon,
  Map,
  Clock,
  Zap,
  Award,
  Shield,
  Footprints,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  MousePointer2,
  Layers,
  GitCompare,
  Calculator,
  Brain,
  Scan,
  Focus,
  Grid3X3,
  Video,
  Mic,
  MessageSquare,
  Bell,
  Star,
  Lock,
  Unlock,
  FileSpreadsheet,
  FileJson,
  Camera,
  User,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  age: number;
  stats: {
    matches: number;
    goals: number;
    assists: number;
    minutes: number;
    xG: number;
    xA: number;
    passes: number;
    passAccuracy: number;
    tackles: number;
    interceptions: number;
    duelsWon: number;
    duelsTotal: number;
    speed: number;
    distance: number;
    shots: number;
    shotsOnTarget: number;
    keyPasses: number;
    bigChancesCreated: number;
    bigChancesMissed: number;
    offsides: number;
    fouls: number;
    yellowCards: number;
    redCards: number;
  };
  form: number[];
  radar: {
    subject: string;
    A: number;
    B: number;
    fullMark: number;
  }[];
  heatmap: { x: number; y: number; intensity: number }[];
  videoClips: { id: string; timestamp: string; description: string; url: string }[];
}

interface Team {
  id: string;
  name: string;
  logo: string;
  stats: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    xG: number;
    xGA: number;
    possession: number;
    passAccuracy: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    freeKicks: number;
    penalties: number;
  };
  form: string[];
  matches: Match[];
  lineup: { position: string; player: string; x: number; y: number }[];
}

interface Match {
  id: string;
  date: string;
  opponent: string;
  venue: 'home' | 'away';
  result: 'W' | 'D' | 'L';
  score: { home: number; away: number };
  xG: number;
  possession: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  heatmap: { x: number; y: number; intensity: number }[];
  timeline: { minute: number; event: string; team: 'home' | 'away'; player?: string }[];
}

interface AnalysisConfig {
  id: string;
  name: string;
  type: 'player' | 'team' | 'match' | 'comparison' | 'tactical';
  filters: {
    dateRange: { start: string; end: string };
    competitions: string[];
    metrics: string[];
    visualization: string;
    advanced?: {
      minMinutes: number;
      minMatches: number;
      positions: string[];
      ageRange: { min: number; max: number };
    };
  };
  createdAt: string;
  updatedAt: string;
  isShared?: boolean;
  isTemplate?: boolean;
}

interface ExportOptions {
  format: 'pdf' | 'excel' | 'json' | 'csv' | 'image';
  includeCharts: boolean;
  includeRawData: boolean;
  includeAnalysis: boolean;
  password?: string;
}

// Mock Data
const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Kylian Mbappé',
    position: 'ATT',
    team: 'Real Madrid',
    age: 25,
    stats: {
      matches: 28, goals: 24, assists: 8, minutes: 2340,
      xG: 22.5, xA: 7.2, passes: 892, passAccuracy: 82.4,
      tackles: 12, interceptions: 8, duelsWon: 156, duelsTotal: 234,
      speed: 36.1, distance: 285.4, shots: 89, shotsOnTarget: 52,
      keyPasses: 45, bigChancesCreated: 12, bigChancesMissed: 8,
      offsides: 15, fouls: 23, yellowCards: 3, redCards: 0
    },
    form: [8.5, 9.2, 7.8, 9.5, 8.9],
    radar: [
      { subject: 'Vitesse', A: 95, B: 75, fullMark: 100 },
      { subject: 'Finition', A: 88, B: 65, fullMark: 100 },
      { subject: 'Passes', A: 78, B: 70, fullMark: 100 },
      { subject: 'Dribble', A: 92, B: 68, fullMark: 100 },
      { subject: 'Défense', A: 45, B: 60, fullMark: 100 },
      { subject: 'Physique', A: 85, B: 72, fullMark: 100 },
    ],
    heatmap: Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      intensity: Math.random()
    })),
    videoClips: [
      { id: 'v1', timestamp: '12:34', description: 'But contre Barcelone', url: '#' },
      { id: 'v2', timestamp: '34:12', description: 'Passe décisive', url: '#' },
      { id: 'v3', timestamp: '67:45', description: 'Action individuelle', url: '#' }
    ]
  },
  {
    id: '2',
    name: 'Erling Haaland',
    position: 'ATT',
    team: 'Manchester City',
    age: 23,
    stats: {
      matches: 26, goals: 27, assists: 5, minutes: 2184,
      xG: 25.8, xA: 4.5, passes: 456, passAccuracy: 74.2,
      tackles: 8, interceptions: 4, duelsWon: 189, duelsTotal: 267,
      speed: 34.8, distance: 245.6, shots: 102, shotsOnTarget: 58,
      keyPasses: 18, bigChancesCreated: 6, bigChancesMissed: 12,
      offsides: 8, fouls: 19, yellowCards: 2, redCards: 0
    },
    form: [9.1, 8.7, 9.5, 8.2, 9.0],
    radar: [
      { subject: 'Vitesse', A: 88, B: 75, fullMark: 100 },
      { subject: 'Finition', A: 95, B: 65, fullMark: 100 },
      { subject: 'Passes', A: 65, B: 70, fullMark: 100 },
      { subject: 'Dribble', A: 75, B: 68, fullMark: 100 },
      { subject: 'Défense', A: 40, B: 60, fullMark: 100 },
      { subject: 'Physique', A: 98, B: 72, fullMark: 100 },
    ],
    heatmap: Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      intensity: Math.random()
    })),
    videoClips: [
      { id: 'v1', timestamp: '08:22', description: 'Coup de casque', url: '#' },
      { id: 'v2', timestamp: '45:30', description: 'Doublé', url: '#' }
    ]
  },
  {
    id: '3',
    name: 'Jude Bellingham',
    position: 'MIL',
    team: 'Real Madrid',
    age: 20,
    stats: {
      matches: 29, goals: 18, assists: 12, minutes: 2520,
      xG: 12.4, xA: 10.8, passes: 1456, passAccuracy: 88.7,
      tackles: 67, interceptions: 45, duelsWon: 198, duelsTotal: 289,
      speed: 32.4, distance: 312.8, shots: 67, shotsOnTarget: 38,
      keyPasses: 78, bigChancesCreated: 15, bigChancesMissed: 4,
      offsides: 3, fouls: 34, yellowCards: 5, redCards: 0
    },
    form: [8.8, 9.0, 8.5, 9.2, 8.7],
    radar: [
      { subject: 'Vitesse', A: 82, B: 75, fullMark: 100 },
      { subject: 'Finition', A: 78, B: 65, fullMark: 100 },
      { subject: 'Passes', A: 92, B: 70, fullMark: 100 },
      { subject: 'Dribble', A: 85, B: 68, fullMark: 100 },
      { subject: 'Défense', A: 88, B: 60, fullMark: 100 },
      { subject: 'Physique', A: 90, B: 72, fullMark: 100 },
    ],
    heatmap: Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      intensity: Math.random()
    })),
    videoClips: [
      { id: 'v1', timestamp: '23:15', description: 'But de l\'extérieur', url: '#' },
      { id: 'v2', timestamp: '56:40', description: 'Tacle décisif', url: '#' }
    ]
  },
  {
    id: '4',
    name: 'Vinicius Jr',
    position: 'ATT',
    team: 'Real Madrid',
    age: 23,
    stats: {
      matches: 27, goals: 15, assists: 14, minutes: 2280,
      xG: 14.2, xA: 12.5, passes: 678, passAccuracy: 79.3,
      tackles: 22, interceptions: 12, duelsWon: 178, duelsTotal: 245,
      speed: 35.2, distance: 298.6, shots: 76, shotsOnTarget: 42,
      keyPasses: 56, bigChancesCreated: 18, bigChancesMissed: 9,
      offsides: 22, fouls: 45, yellowCards: 6, redCards: 1
    },
    form: [8.2, 8.8, 9.1, 7.9, 8.6],
    radar: [
      { subject: 'Vitesse', A: 93, B: 75, fullMark: 100 },
      { subject: 'Finition', A: 75, B: 65, fullMark: 100 },
      { subject: 'Passes', A: 82, B: 70, fullMark: 100 },
      { subject: 'Dribble', A: 96, B: 68, fullMark: 100 },
      { subject: 'Défense', A: 55, B: 60, fullMark: 100 },
      { subject: 'Physique', A: 78, B: 72, fullMark: 100 },
    ],
    heatmap: Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      intensity: Math.random()
    })),
    videoClips: []
  }
];

const TEAMS: Team[] = [
  {
    id: '1',
    name: 'Real Madrid',
    logo: '/rm.png',
    stats: {
      played: 28, won: 22, drawn: 4, lost: 2,
      goalsFor: 68, goalsAgainst: 22, xG: 58.4, xGA: 24.2,
      possession: 58.5, passAccuracy: 89.2, shots: 456, shotsOnTarget: 178,
      corners: 156, freeKicks: 89, penalties: 8
    },
    form: ['W', 'W', 'D', 'W', 'W'],
    matches: [],
    lineup: [
      { position: 'GK', player: 'Courtois', x: 50, y: 10 },
      { position: 'DEF', player: 'Carvajal', x: 80, y: 30 },
      { position: 'DEF', player: 'Militao', x: 60, y: 25 },
      { position: 'DEF', player: 'Alaba', x: 40, y: 25 },
      { position: 'DEF', player: 'Mendy', x: 20, y: 30 },
      { position: 'MID', player: 'Valverde', x: 70, y: 50 },
      { position: 'MID', player: 'Tchouameni', x: 50, y: 45 },
      { position: 'MID', player: 'Bellingham', x: 30, y: 50 },
      { position: 'FWD', player: 'Rodrygo', x: 75, y: 75 },
      { position: 'FWD', player: 'Mbappé', x: 50, y: 85 },
      { position: 'FWD', player: 'Vinicius', x: 25, y: 75 },
    ]
  },
  {
    id: '2',
    name: 'Manchester City',
    logo: '/mc.png',
    stats: {
      played: 28, won: 20, drawn: 5, lost: 3,
      goalsFor: 62, goalsAgainst: 26, xG: 54.8, xGA: 28.4,
      possession: 64.2, passAccuracy: 91.5, shots: 412, shotsOnTarget: 165,
      corners: 142, freeKicks: 76, penalties: 6
    },
    form: ['W', 'D', 'W', 'W', 'D'],
    matches: [],
    lineup: [
      { position: 'GK', player: 'Ederson', x: 50, y: 10 },
      { position: 'DEF', player: 'Walker', x: 80, y: 30 },
      { position: 'DEF', player: 'Dias', x: 60, y: 25 },
      { position: 'DEF', player: 'Akanji', x: 40, y: 25 },
      { position: 'DEF', player: 'Gvardiol', x: 20, y: 30 },
      { position: 'MID', player: 'Rodri', x: 50, y: 40 },
      { position: 'MID', player: 'Silva', x: 70, y: 55 },
      { position: 'MID', player: 'De Bruyne', x: 30, y: 55 },
      { position: 'FWD', player: 'Foden', x: 65, y: 80 },
      { position: 'FWD', player: 'Haaland', x: 50, y: 85 },
      { position: 'FWD', player: 'Doku', x: 35, y: 80 },
    ]
  }
];

const SAVED_CONFIGS: AnalysisConfig[] = [
  {
    id: '1',
    name: 'Analyse Mbappé vs Haaland',
    type: 'comparison',
    filters: {
      dateRange: { start: '2024-01-01', end: '2024-03-31' },
      competitions: ['Ligue 1', 'Champions League'],
      metrics: ['goals', 'xG', 'shots', 'speed'],
      visualization: 'radar',
      advanced: { minMinutes: 500, minMatches: 5, positions: ['ATT'], ageRange: { min: 18, max: 35 } }
    },
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    isShared: true
  },
  {
    id: '2',
    name: 'Performance Real Madrid',
    type: 'team',
    filters: {
      dateRange: { start: '2024-01-01', end: '2024-03-31' },
      competitions: ['La Liga'],
      metrics: ['possession', 'passAccuracy', 'xG'],
      visualization: 'timeline',
      advanced: { minMinutes: 0, minMatches: 0, positions: [], ageRange: { min: 0, max: 99 } }
    },
    createdAt: '2024-03-15',
    updatedAt: '2024-03-18',
    isTemplate: true
  }
];

// Composants UI
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600',
    ghost: 'text-slate-600 hover:text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      className={`rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  footer
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  footer?: React.ReactNode;
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden flex flex-col`}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
          {footer && (
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              {footer}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DateRangePicker = ({ value, onChange }: { value: { start: string; end: string }; onChange: (range: { start: string; end: string }) => void }) => (
  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
    <Calendar size={18} className="text-slate-400" />
    <input
      type="date"
      value={value.start}
      onChange={(e) => onChange({ ...value, start: e.target.value })}
      className="bg-transparent border-none text-sm focus:outline-none text-slate-700"
    />
    <span className="text-slate-400">→</span>
    <input
      type="date"
      value={value.end}
      onChange={(e) => onChange({ ...value, end: e.target.value })}
      className="bg-transparent border-none text-sm focus:outline-none text-slate-700"
    />
  </div>
);

// MODAL FILTRES AVANCÉS
const AdvancedFiltersModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  onChange 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  filters: AnalysisConfig['filters'];
  onChange: (filters: AnalysisConfig['filters']) => void;
}) => {
  const competitions = ['Ligue 1', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Champions League', 'Europa League', 'Coupe de France'];
  const metrics = [
    { id: 'goals', label: 'Buts', icon: Target },
    { id: 'assists', label: 'Passes déc.', icon: Share2 },
    { id: 'xG', label: 'xG', icon: Activity },
    { id: 'xA', label: 'xA', icon: Activity },
    { id: 'possession', label: 'Possession', icon: Footprints },
    { id: 'passAccuracy', label: 'Précision passes', icon: CheckCircle2 },
    { id: 'tackles', label: 'Tacles', icon: Shield },
    { id: 'speed', label: 'Vitesse', icon: Zap },
    { id: 'distance', label: 'Distance', icon: Map },
    { id: 'duels', label: 'Duels', icon: Users },
  ];

  const positions = ['GK', 'DEF', 'MIL', 'ATT', 'ALL'];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Filtres avancés" 
      size="lg"
      footer={
        <div className="flex justify-between items-center w-full">
          <Button variant="ghost" onClick={() => onChange({
            dateRange: { start: '2024-01-01', end: '2024-12-31' },
            competitions: [],
            metrics: [],
            visualization: 'radar',
            advanced: { minMinutes: 0, minMatches: 0, positions: [], ageRange: { min: 16, max: 40 } }
          })}>
            <Trash2 size={16} />
            Réinitialiser
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>Annuler</Button>
            <Button onClick={onClose}>Appliquer les filtres</Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Période */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
            <Calendar size={16} />
            Période d'analyse
          </label>
          <DateRangePicker 
            value={filters.dateRange} 
            onChange={(range) => onChange({ ...filters, dateRange: range })} 
          />
        </div>

        {/* Compétitions */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Compétitions</label>
          <div className="flex flex-wrap gap-2">
            {competitions.map((comp) => (
              <button
                key={comp}
                onClick={() => {
                  const newComps = filters.competitions.includes(comp)
                    ? filters.competitions.filter(c => c !== comp)
                    : [...filters.competitions, comp];
                  onChange({ ...filters, competitions: newComps });
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.competitions.includes(comp)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>
        </div>

        {/* Métriques */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Métriques à analyser</label>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <button
                  key={metric.id}
                  onClick={() => {
                    const newMetrics = filters.metrics.includes(metric.id)
                      ? filters.metrics.filter(m => m !== metric.id)
                      : [...filters.metrics, metric.id];
                    onChange({ ...filters, metrics: newMetrics });
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    filters.metrics.includes(metric.id)
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtres avancés */}
        <div className="bg-slate-50 p-4 rounded-xl space-y-4">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <Settings size={16} />
            Critères avancés
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Minutes minimum</label>
              <input 
                type="number" 
                value={filters.advanced?.minMinutes || 0}
                onChange={(e) => onChange({
                  ...filters,
                  advanced: { ...filters.advanced, minMinutes: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Matchs minimum</label>
              <input 
                type="number" 
                value={filters.advanced?.minMatches || 0}
                onChange={(e) => onChange({
                  ...filters,
                  advanced: { ...filters.advanced, minMatches: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-2 block">Postes</label>
            <div className="flex gap-2">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => {
                    const currentPositions = filters.advanced?.positions || [];
                    const newPositions = currentPositions.includes(pos)
                      ? currentPositions.filter(p => p !== pos)
                      : [...currentPositions, pos];
                    onChange({
                      ...filters,
                      advanced: { ...filters.advanced, positions: newPositions }
                    });
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    filters.advanced?.positions?.includes(pos)
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-2 block">Tranche d'âge</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="16" 
                max="40" 
                value={filters.advanced?.ageRange?.min || 16}
                onChange={(e) => onChange({
                  ...filters,
                  advanced: { 
                    ...filters.advanced, 
                    ageRange: { 
                      ...(filters.advanced?.ageRange || { min: 16, max: 40 }), 
                      min: parseInt(e.target.value) 
                    } 
                  }
                })}
                className="flex-1"
              />
              <span className="text-sm font-mono w-12 text-center">
                {filters.advanced?.ageRange?.min || 16}-{filters.advanced?.ageRange?.max || 40} ans
              </span>
              <input 
                type="range" 
                min="16" 
                max="40" 
                value={filters.advanced?.ageRange?.max || 40}
                onChange={(e) => onChange({
                  ...filters,
                  advanced: { 
                    ...filters.advanced, 
                    ageRange: { 
                      ...(filters.advanced?.ageRange || { min: 16, max: 40 }), 
                      max: parseInt(e.target.value) 
                    } 
                  }
                })}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Visualisation */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Type de visualisation par défaut</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'radar', label: 'Radar', icon: RadarIcon },
              { id: 'timeline', label: 'Timeline', icon: Activity },
              { id: 'scatter', label: 'Nuage', icon: GitCompare },
              { id: 'bar', label: 'Barres', icon: BarChart3 },
              { id: 'heatmap', label: 'Heatmap', icon: Map },
              { id: 'pie', label: 'Camembert', icon: PieChartIcon },
            ].map((viz) => {
              const Icon = viz.icon;
              return (
                <button
                  key={viz.id}
                  onClick={() => onChange({ ...filters, visualization: viz.id })}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    filters.visualization === viz.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium">{viz.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

// MODAL CONFIGURATIONS
const ConfigsModal = ({ 
  isOpen, 
  onClose, 
  configs, 
  onLoad, 
  onDelete, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  configs: AnalysisConfig[];
  onLoad: (config: AnalysisConfig) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredConfigs = configs.filter(config => {
    const matchesSearch = config.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || config.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Configurations sauvegardées" 
      size="xl"
      footer={
        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-slate-500">
            {configs.length} configuration{configs.length > 1 ? 's' : ''} sauvegardée{configs.length > 1 ? 's' : ''}
          </div>
          <Button onClick={onSave}>
            <Plus size={16} />
            Nouvelle configuration
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Barre de recherche et filtres */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher une configuration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none"
            />
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none bg-white"
          >
            <option value="all">Tous les types</option>
            <option value="player">Joueur</option>
            <option value="team">Équipe</option>
            <option value="comparison">Comparaison</option>
            <option value="match">Match</option>
            <option value="tactical">Tactique</option>
          </select>
        </div>

        {/* Liste des configurations */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredConfigs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Settings size={48} className="mx-auto mb-4 opacity-30" />
              <p>Aucune configuration trouvée</p>
            </div>
          ) : (
            filteredConfigs.map((config) => (
              <div 
                key={config.id} 
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      {config.type === 'player' && <User size={24} className="text-blue-600" />}
                      {config.type === 'team' && <Shield size={24} className="text-green-600" />}
                      {config.type === 'comparison' && <GitCompare size={24} className="text-purple-600" />}
                      {config.type === 'match' && <Activity size={24} className="text-orange-600" />}
                      {config.type === 'tactical' && <Layers size={24} className="text-red-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{config.name}</h4>
                        {config.isTemplate && (
                          <Badge variant="purple">Template</Badge>
                        )}
                        {config.isShared && (
                          <Badge variant="info">Partagé</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        {config.filters.competitions.join(', ') || 'Toutes compétitions'} • 
                        {' '}{config.filters.metrics.length} métriques • 
                        {' '}{config.updatedAt}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {config.filters.metrics.slice(0, 5).map((metric) => (
                          <span key={metric} className="px-2 py-0.5 bg-white rounded text-xs text-slate-600 border border-slate-200">
                            {metric}
                          </span>
                        ))}
                        {config.filters.metrics.length > 5 && (
                          <span className="px-2 py-0.5 text-xs text-slate-400">
                            +{config.filters.metrics.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm" onClick={() => onLoad(config)}>
                      Charger
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDelete(config.id)}>
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

// Composants existants conservés
const PlayerCard = ({ player, onClick, isSelected }: { player: Player; onClick: () => void; isSelected: boolean }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
      isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        {player.name.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900">{player.name}</h4>
          <Badge variant="info">{player.position}</Badge>
        </div>
        <p className="text-sm text-slate-500">{player.team} • {player.age} ans</p>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="text-slate-600"><strong>{player.stats.goals}</strong> buts</span>
          <span className="text-slate-600"><strong>{player.stats.assists}</strong> passes</span>
          <span className="text-slate-600"><strong>{player.stats.xG.toFixed(1)}</strong> xG</span>
        </div>
      </div>
    </div>
  </div>
);

const RadarComparison = ({ players }: { players: Player[] }) => {
  const data = players[0]?.radar.map((item, idx) => ({
    subject: item.subject,
    ...players.reduce((acc, p, i) => ({
      ...acc,
      [p.name]: p.radar[idx].A,
      [`${p.name}_avg`]: p.radar[idx].B
    }), {})
  })) || [];

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          {players.map((player, idx) => (
            <Radar
              key={player.id}
              name={player.name}
              dataKey={player.name}
              stroke={colors[idx]}
              fill={colors[idx]}
              fillOpacity={0.3}
            />
          ))}
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const FormTimeline = ({ player }: { player: Player }) => {
  const data = player.form.map((rating, idx) => ({
    match: `J${idx + 1}`,
    rating,
    moyenne: 7.5
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="match" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Area type="monotone" dataKey="rating" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRating)" />
          <Line type="monotone" dataKey="moyenne" stroke="#94A3B8" strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Export Manager
const ExportManager = ({ 
  isOpen, 
  onClose, 
  data 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  data: any;
}) => {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeCharts: true,
    includeRawData: true,
    includeAnalysis: true,
    password: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    onClose();
  };

  const formats = [
    { id: 'pdf', label: 'PDF', icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'excel', label: 'Excel', icon: FileSpreadsheet, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'json', label: 'JSON', icon: FileJson, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'csv', label: 'CSV', icon: Grid3X3, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'image', label: 'Images', icon: Camera, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Exporter l'analyse" 
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <RefreshCw className="animate-spin" size={18} />
                Export en cours...
              </>
            ) : (
              <>
                <Download size={18} />
                Exporter
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Format d'export</label>
          <div className="grid grid-cols-3 gap-3">
            {formats.map((format) => {
              const Icon = format.icon;
              return (
                <button
                  key={format.id}
                  onClick={() => setOptions({ ...options, format: format.id as any })}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    options.format === format.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${format.bg}`}>
                    <Icon size={24} className={format.color} />
                  </div>
                  <span className="font-medium text-slate-900">{format.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Contenu à inclure</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
              <input 
                type="checkbox" 
                checked={options.includeCharts}
                onChange={(e) => setOptions({ ...options, includeCharts: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <div>
                <p className="font-medium text-slate-900">Graphiques et visualisations</p>
                <p className="text-sm text-slate-500">Inclure tous les graphiques générés</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
              <input 
                type="checkbox" 
                checked={options.includeRawData}
                onChange={(e) => setOptions({ ...options, includeRawData: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <div>
                <p className="font-medium text-slate-900">Données brutes</p>
                <p className="text-sm text-slate-500">Statistiques complètes en format tabulaire</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
              <input 
                type="checkbox" 
                checked={options.includeAnalysis}
                onChange={(e) => setOptions({ ...options, includeAnalysis: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <div>
                <p className="font-medium text-slate-900">Analyse et insights</p>
                <p className="text-sm text-slate-500">Commentaires et conclusions de l'analyste</p>
              </div>
            </label>
          </div>
        </div>

        {options.format === 'pdf' && (
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Protection (optionnel)</label>
            <div className="flex items-center gap-2">
              <Lock size={18} className="text-slate-400" />
              <input
                type="password"
                placeholder="Mot de passe PDF"
                value={options.password}
                onChange={(e) => setOptions({ ...options, password: e.target.value })}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

// Composant principal
export default function AnalystStatic() {
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'teams' | 'comparison' | 'predictions' | 'tactical'>('overview');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-03-31' });
  const [filters, setFilters] = useState<AnalysisConfig['filters']>({
    dateRange: { start: '2024-01-01', end: '2024-03-31' },
    competitions: ['Ligue 1', 'Champions League'],
    metrics: ['goals', 'xG', 'assists'],
    visualization: 'radar',
    advanced: { minMinutes: 0, minMatches: 0, positions: [], ageRange: { min: 0, max: 99 } }
  });
  const [savedConfigs, setSavedConfigs] = useState<AnalysisConfig[]>(SAVED_CONFIGS);
  const [showFilters, setShowFilters] = useState(false);
  const [showConfigs, setShowConfigs] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const globalStats = useMemo(() => ({
    totalMatches: 1247,
    totalGoals: 3421,
    avgXG: 2.85,
    topScorer: PLAYERS[0],
    mostAssists: PLAYERS[2],
    bestForm: PLAYERS[1]
  }), []);

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    } else if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleSaveConfig = () => {
    const newConfig: AnalysisConfig = {
      id: Date.now().toString(),
      name: `Analyse ${selectedPlayers.map(p => p.name.split(' ')[0]).join(' vs ')}`,
      type: selectedPlayers.length > 1 ? 'comparison' : 'player',
      filters,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setSavedConfigs([...savedConfigs, newConfig]);
  };

  // RENDU DES TABS MANQUANTS
  const renderTeamAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEAMS.map((team) => (
          <Card 
            key={team.id} 
            className={`p-6 cursor-pointer transition-all ${selectedTeam?.id === team.id ? 'ring-2 ring-blue-600' : 'hover:shadow-md'}`}
            onClick={() => setSelectedTeam(team)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold">
                {team.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{team.name}</h4>
                <p className="text-sm text-slate-500">{team.stats.played} matchs</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="text-lg font-bold text-green-600">{team.stats.won}</p>
                <p className="text-xs text-green-700">V</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded-lg">
                <p className="text-lg font-bold text-yellow-600">{team.stats.drawn}</p>
                <p className="text-xs text-yellow-700">N</p>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <p className="text-lg font-bold text-red-600">{team.stats.lost}</p>
                <p className="text-xs text-red-700">D</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedTeam && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">{selectedTeam.name} - Statistiques détaillées</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Buts marqués</p>
              <p className="text-2xl font-bold text-slate-900">{selectedTeam.stats.goalsFor}</p>
              <p className="text-xs text-slate-400">{selectedTeam.stats.xG.toFixed(1)} xG</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Buts encaissés</p>
              <p className="text-2xl font-bold text-slate-900">{selectedTeam.stats.goalsAgainst}</p>
              <p className="text-xs text-slate-400">{selectedTeam.stats.xGA.toFixed(1)} xGA</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Possession</p>
              <p className="text-2xl font-bold text-slate-900">{selectedTeam.stats.possession}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Précision passes</p>
              <p className="text-2xl font-bold text-slate-900">{selectedTeam.stats.passAccuracy}%</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Derniers résultats</h4>
            <div className="flex gap-2">
              {selectedTeam.form.map((result, idx) => (
                <div 
                  key={idx} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    result === 'W' ? 'bg-green-100 text-green-700' : 
                    result === 'D' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const renderPredictions = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Modèle prédictif</h3>
            <p className="text-indigo-200 text-sm">Basé sur les xG et la forme actuelle</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-indigo-200 text-sm mb-1">Prochain match</p>
            <p className="text-2xl font-bold">Real Madrid vs Barcelona</p>
            <p className="text-sm text-indigo-200 mt-2">Probabilité victoire: 62%</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-indigo-200 text-sm mb-1">xG attendu</p>
            <p className="text-2xl font-bold">2.4 - 1.8</p>
            <p className="text-sm text-indigo-200 mt-2">Score prédit: 2-1</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-indigo-200 text-sm mb-1">Confiance</p>
            <p className="text-2xl font-bold">78.5%</p>
            <p className="text-sm text-indigo-200 mt-2">Basé sur 15 variables</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-bold text-slate-900 mb-4">Évolution des probabilités</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { time: '10\'', home: 45, draw: 30, away: 25 },
                { time: '20\'', home: 48, draw: 28, away: 24 },
                { time: '30\'', home: 52, draw: 25, away: 23 },
                { time: '40\'', home: 55, draw: 23, away: 22 },
                { time: '50\'', home: 58, draw: 22, away: 20 },
                { time: '60\'', home: 62, draw: 20, away: 18 },
                { time: '70\'', home: 65, draw: 18, away: 17 },
                { time: '80\'', home: 68, draw: 17, away: 15 },
                { time: '90\'', home: 72, draw: 15, away: 13 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="home" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Victoire domicile" />
                <Area type="monotone" dataKey="draw" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Match nul" />
                <Area type="monotone" dataKey="away" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Victoire extérieur" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-bold text-slate-900 mb-4">Facteurs clés</h4>
          <div className="space-y-3">
            {[
              { factor: 'Forme récente', weight: 25, value: 85 },
              { factor: 'Historique confrontations', weight: 20, value: 72 },
              { factor: 'xG cumulé', weight: 20, value: 78 },
              { factor: 'Condition physique', weight: 15, value: 90 },
              { factor: 'Avantage domicile', weight: 10, value: 65 },
              { factor: 'Météo / Terrain', weight: 10, value: 80 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-32 text-sm text-slate-600">{item.factor}</div>
                <div className="flex-1">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-right text-sm font-semibold text-slate-900">{item.value}%</div>
                <div className="w-12 text-right text-xs text-slate-500">Poids: {item.weight}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <Activity size={24} className="text-blue-200" />
            <Badge variant="success">+12%</Badge>
          </div>
          <p className="text-blue-100 text-sm">Total Matchs analysés</p>
          <p className="text-3xl font-bold">{globalStats.totalMatches.toLocaleString()}</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Target size={24} className="text-green-600" />
            <Badge variant="success">+8.5%</Badge>
          </div>
          <p className="text-slate-500 text-sm">Buts marqués</p>
          <p className="text-3xl font-bold text-slate-900">{globalStats.totalGoals.toLocaleString()}</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={24} className="text-purple-600" />
            <Badge variant="warning">-2.1%</Badge>
          </div>
          <p className="text-slate-500 text-sm">xG moyen / match</p>
          <p className="text-3xl font-bold text-slate-900">{globalStats.avgXG}</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Users size={24} className="text-amber-600" />
            <Badge variant="success">+24</Badge>
          </div>
          <p className="text-slate-500 text-sm">Joueurs suivis</p>
          <p className="text-3xl font-bold text-slate-900">{PLAYERS.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="text-yellow-500" />
            Meilleur buteur
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl">
              {globalStats.topScorer.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-lg text-slate-900">{globalStats.topScorer.name}</p>
              <p className="text-slate-500">{globalStats.topScorer.team}</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{globalStats.topScorer.stats.goals} buts</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Share2 className="text-blue-500" />
            Meilleur passeur
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
              {globalStats.mostAssists.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-lg text-slate-900">{globalStats.mostAssists.name}</p>
              <p className="text-slate-500">{globalStats.mostAssists.team}</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{globalStats.mostAssists.stats.assists} passes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Zap className="text-purple-500" />
            Forme actuelle
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
              {globalStats.bestForm.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-lg text-slate-900">{globalStats.bestForm.name}</p>
              <p className="text-slate-500">{globalStats.bestForm.team}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-purple-600">
                  {(globalStats.bestForm.form.reduce((a, b) => a + b, 0) / globalStats.bestForm.form.length).toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">/10 moyenne</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPlayerAnalysis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Search size={20} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un joueur..." 
              className="flex-1 outline-none text-slate-700"
            />
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {PLAYERS.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onClick={() => handlePlayerSelect(player)}
                isSelected={selectedPlayers.some(p => p.id === player.id)}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {selectedPlayers.length > 0 ? (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {selectedPlayers.length === 1 ? 'Analyse individuelle' : 'Comparaison'}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedPlayers([])}>
                  <Trash2 size={16} />
                  Effacer
                </Button>
                <Button size="sm" onClick={handleSaveConfig}>
                  <Save size={16} />
                  Sauvegarder
                </Button>
                <Button variant="success" size="sm" onClick={() => setShowExport(true)}>
                  <Download size={16} />
                  Exporter
                </Button>
              </div>
            </div>

            {selectedPlayers.length === 1 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <p className="text-3xl font-bold text-blue-600">{selectedPlayers[0].stats.goals}</p>
                    <p className="text-sm text-slate-500">Buts</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <p className="text-3xl font-bold text-blue-600">{selectedPlayers[0].stats.assists}</p>
                    <p className="text-sm text-slate-500">Passes déc.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <p className="text-3xl font-bold text-blue-600">{selectedPlayers[0].stats.xG.toFixed(1)}</p>
                    <p className="text-sm text-slate-500">xG</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <p className="text-3xl font-bold text-blue-600">{selectedPlayers[0].stats.minutes}</p>
                    <p className="text-sm text-slate-500">Minutes</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Évolution de la forme</h4>
                  <FormTimeline player={selectedPlayers[0]} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Profil radar</h4>
                  <RadarComparison players={selectedPlayers} />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <RadarComparison players={selectedPlayers} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlayers.map((player) => (
                    <div key={player.id} className="bg-slate-50 p-4 rounded-xl">
                      <h4 className="font-bold text-slate-900 mb-3">{player.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Buts</span>
                          <span className="font-semibold">{player.stats.goals} ({player.stats.xG.toFixed(1)} xG)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Passes déc.</span>
                          <span className="font-semibold">{player.stats.assists} ({player.stats.xA.toFixed(1)} xA)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Précision passes</span>
                          <span className="font-semibold">{player.stats.passAccuracy}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card className="p-12 text-center">
            <Users size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Sélectionnez un joueur</h3>
            <p className="text-slate-500">Choisissez un ou plusieurs joueurs pour analyser leurs performances</p>
          </Card>
        )}
      </div>
    </div>
  );

  const renderTactical = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Analyse Tactique</h3>
        <p className="text-slate-500">Module d'analyse tactique en développement...</p>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Analyst Pro</h1>
                <p className="text-xs text-slate-500">Module d'analyse statistique avancée</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
              
              <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                <Filter size={18} />
                Filtres
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => setShowConfigs(true)}>
                <Settings size={18} />
                Configs
              </Button>

              <Button variant="success" size="sm" onClick={() => setShowExport(true)}>
                <Download size={18} />
                Exporter
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 p-2">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
              { id: 'players', label: 'Joueurs', icon: Users },
              { id: 'teams', label: 'Équipes', icon: Shield },
              { id: 'comparison', label: 'Comparaisons', icon: GitCompare },
              { id: 'tactical', label: 'Tactique', icon: Layers },
              { id: 'predictions', label: 'Prédictions', icon: Brain },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'players' && renderPlayerAnalysis()}
            {activeTab === 'teams' && renderTeamAnalysis()}
            {activeTab === 'comparison' && renderPlayerAnalysis()}
            {activeTab === 'tactical' && renderTactical()}
            {activeTab === 'predictions' && renderPredictions()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AdvancedFiltersModal 
        isOpen={showFilters} 
        onClose={() => setShowFilters(false)}
        filters={filters}
        onChange={setFilters}
      />

      <ConfigsModal 
        isOpen={showConfigs} 
        onClose={() => setShowConfigs(false)}
        configs={savedConfigs}
        onLoad={(config) => {
          setFilters(config.filters);
          setShowConfigs(false);
        }}
        onDelete={(id) => setSavedConfigs(savedConfigs.filter(c => c.id !== id))}
        onSave={handleSaveConfig}
      />

      <ExportManager 
        isOpen={showExport} 
        onClose={() => setShowExport(false)} 
        data={{ players: selectedPlayers, filters }}
      />
    </div>
  );
}