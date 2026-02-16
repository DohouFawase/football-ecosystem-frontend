'use client';

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Shield, AlertCircle, CheckCircle, XCircle, 
  Clock, MapPin, Users, FileText, Camera, MessageSquare,
  TrendingUp, Filter, Search, Plus, ChevronDown, ChevronRight,
  MoreHorizontal, Download, Share2, Printer, Bell,
  Activity, Zap, Flame, Snowflake, Wind, CloudRain,
  Siren, SirenIcon, Ambulance, FireExtinguisher,
  Construction, TrafficCone, Ban, Eye, EyeOff,
  Timer, Calendar, MapPinned, UserCircle, Phone,
  Paperclip, Send, History, RotateCcw, CheckCheck,
  AlertOctagon, Info, X, ArrowRight, BarChart3,
  PieChart, TrendingDown, ShieldAlert,
  SirenIcon as SirenLucide, BadgeAlert, FileWarning,
  ClipboardList, ScanEye, Radio, Wifi, WifiOff,
  BatteryWarning, ThermometerSun, Waves, Mountain,
  AlertCircleIcon, AlertTriangleIcon, AlertOctagonIcon,
  ShieldCheck,
  Briefcase,
  LayoutGrid,
  List,
  Map as MapIcon,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Target,
  Gauge,
  Layers,
  Sparkles,
  ZapIcon,
  AlignLeft,
  MapPinIcon
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

// Types enrichis
type IncidentStatus = 'reported' | 'acknowledged' | 'investigating' | 'resolved' | 'closed' | 'escalated';
type IncidentPriority = 'low' | 'medium' | 'high' | 'critical' | 'emergency';
type IncidentCategory = 
  | 'security' | 'technical' | 'medical' | 'weather' 
  | 'crowd' | 'infrastructure' | 'operational' | 'disciplinary'
  | 'equipment' | 'communication' | 'other';

interface IncidentLocation {
  venue: string;
  sector: string;
  exactLocation: string;
  coordinates?: { lat: number; lng: number };
}

interface InvolvedPerson {
  id: string;
  name: string;
  role: 'player' | 'staff' | 'spectator' | 'security' | 'medical' | 'referee' | 'operator' | 'other';
  team?: string;
  condition?: 'unharmed' | 'injured' | 'serious' | 'critical';
  actionTaken?: string;
}

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'report' | 'acknowledge' | 'update' | 'action' | 'resolution' | 'escalation' | 'closure';
  description: string;
  author: string;
  role: string;
  attachments?: string[];
}

interface CommunicationLog {
  id: string;
  timestamp: string;
  type: 'radio' | 'phone' | 'message' | 'email' | 'alert';
  from: string;
  to: string;
  content: string;
  priority: IncidentPriority;
}

interface Incident {
  id: string;
  code: string;
  title: string;
  description: string;
  category: IncidentCategory;
  priority: IncidentPriority;
  status: IncidentStatus;
  location: IncidentLocation;
  matchId?: string;
  matchInfo?: {
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
    league: string;
  };
  reportedAt: string;
  reportedBy: {
    name: string;
    role: string;
    contact: string;
  };
  assignedTo?: {
    name: string;
    role: string;
    team: string;
  };
  involvedPersons: InvolvedPerson[];
  timeline: TimelineEvent[];
  communications: CommunicationLog[];
  media?: {
    photos: string[];
    videos: string[];
    documents: string[];
  };
  resolution?: {
    resolvedAt: string;
    resolvedBy: string;
    summary: string;
    preventiveMeasures: string[];
    lessonsLearned: string;
  };
  estimatedResolutionTime?: number;
  impact: {
    safety: 1 | 2 | 3 | 4 | 5;
    operations: 1 | 2 | 3 | 4 | 5;
    reputation: 1 | 2 | 3 | 4 | 5;
    financial: 1 | 2 | 3 | 4 | 5;
  };
  tags: string[];
  relatedIncidents?: string[];
  weatherConditions?: string;
  crowdDensity?: 'low' | 'medium' | 'high' | 'very_high';
}

// Données mock créatives
const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-2024-001',
    code: 'SEC-001-CRIT',
    title: 'Intrusion sur le terrain - Supporter non identifié',
    description: 'Un supporter a réussi à franchir les barrières de sécurité et a pénétré sur le terrain pendant le match. Interpellation immédiate par les stewards. Match interrompu 3 minutes.',
    category: 'security',
    priority: 'critical',
    status: 'resolved',
    location: {
      venue: 'Parc des Princes',
      sector: 'Tribune Auteuil - Zone technique',
      exactLocation: 'Bord de terrain, côté gauche gardien',
      coordinates: { lat: 48.8414, lng: 2.2530 }
    },
    matchId: 'M-2024-156',
    matchInfo: {
      homeTeam: 'Paris SG',
      awayTeam: 'Marseille',
      date: '2024-03-15',
      time: '20:45',
      league: 'Ligue 1 Uber Eats'
    },
    reportedAt: '2024-03-15T21:23:00Z',
    reportedBy: {
      name: 'Marc Dubois',
      role: 'Chef de sécurité secteur Auteuil',
      contact: '06 12 34 56 78'
    },
    assignedTo: {
      name: 'Sarah Lefebvre',
      role: 'Responsable Sécurité Stade',
      team: 'Direction Sécurité'
    },
    involvedPersons: [
      {
        id: 'P1',
        name: 'Inconnu - Supporter',
        role: 'spectator',
        condition: 'unharmed',
        actionTaken: 'Interpellé, évacué, interdiction de stade 3 ans'
      },
      {
        id: 'P2',
        name: 'Kylian Mbappé',
        role: 'player',
        team: 'Paris SG',
        condition: 'unharmed',
        actionTaken: 'Protégé par les stewards, match repris'
      }
    ],
    timeline: [
      {
        id: 'T1',
        timestamp: '2024-03-15T21:23:00Z',
        type: 'report',
        description: 'Alerte intrusion déclenchée par caméra IA',
        author: 'Système de surveillance',
        role: 'Automated'
      },
      {
        id: 'T2',
        timestamp: '2024-03-15T21:23:15Z',
        type: 'acknowledge',
        description: 'Accusé de réception - Équipe sécurité dépêchée',
        author: 'Marc Dubois',
        role: 'Chef de sécurité'
      },
      {
        id: 'T3',
        timestamp: '2024-03-15T21:24:30Z',
        type: 'action',
        description: 'Stewards ont interpellé l\'intrus, évacuation en cours',
        author: 'Jean Martin',
        role: 'Steward chef'
      },
      {
        id: 'T4',
        timestamp: '2024-03-15T21:26:00Z',
        type: 'resolution',
        description: 'Intrus évacué, match peut reprendre. Aucun blessé.',
        author: 'Sarah Lefebvre',
        role: 'Responsable Sécurité'
      }
    ],
    communications: [
      {
        id: 'C1',
        timestamp: '2024-03-15T21:23:05Z',
        type: 'alert',
        from: 'Système Auto',
        to: 'Tous les agents',
        content: 'ALERTE SECURITE - Intrusion terrain secteur Auteuil',
        priority: 'critical'
      },
      {
        id: 'C2',
        timestamp: '2024-03-15T21:23:30Z',
        type: 'radio',
        from: 'Marc Dubois',
        to: 'Stewards Auteuil',
        content: 'Tous agents secteur Auteuil, intrusion confirmée, intervention immédiate',
        priority: 'critical'
      }
    ],
    resolution: {
      resolvedAt: '2024-03-15T21:26:00Z',
      resolvedBy: 'Sarah Lefebvre',
      summary: 'Intrusion maîtrisée sans blessé. Protocole sécurité suivi à la lettre.',
      preventiveMeasures: [
        'Renforcement barrières secteur Auteuil',
        'Déploiement 2 stewards supplémentaires',
        'Réunion sécurité post-match'
      ],
      lessonsLearned: 'Réactivité excellente. Système de détection IA efficace.'
    },
    estimatedResolutionTime: 3,
    impact: { safety: 4, operations: 3, reputation: 3, financial: 2 },
    tags: ['intrusion', 'supporter', 'terrain', 'steward', 'IA_detection'],
    weatherConditions: 'Clair, 12°C',
    crowdDensity: 'very_high'
  },
  {
    id: 'INC-2024-002',
    code: 'MED-002-HIGH',
    title: 'Blessure grave joueur - Entorse genou avec suspicion ligamentaire',
    description: 'Joueur #14 de l\'équipe visiteuse (Marseille) victime d\'un tacle dangereux. Douleur intense au genou gauche, impossible de reprendre. Évacuation sur civière.',
    category: 'medical',
    priority: 'high',
    status: 'investigating',
    location: {
      venue: 'Parc des Princes',
      sector: 'Terrain - Zone centrale',
      exactLocation: '30mètres, cercle central',
      coordinates: { lat: 48.8415, lng: 2.2531 }
    },
    matchId: 'M-2024-156',
    matchInfo: {
      homeTeam: 'Paris SG',
      awayTeam: 'Marseille',
      date: '2024-03-15',
      time: '20:45',
      league: 'Ligue 1 Uber Eats'
    },
    reportedAt: '2024-03-15T21:45:00Z',
    reportedBy: {
      name: 'Dr. Patrick Müller',
      role: 'Médecin du match',
      contact: '07 89 12 34 56'
    },
    assignedTo: {
      name: 'Dr. Sophie Bernard',
      role: 'Responsable Médical LFP',
      team: 'Commission Médicale'
    },
    involvedPersons: [
      {
        id: 'P3',
        name: 'Jonathan Clauss',
        role: 'player',
        team: 'Marseille',
        condition: 'serious',
        actionTaken: 'Évacuation médicale, IRM programmée'
      },
      {
        id: 'P4',
        name: 'Nuno Mendes',
        role: 'player',
        team: 'Paris SG',
        condition: 'unharmed',
        actionTaken: 'Avertissement verbal, tacle réévalué par VAR'
      }
    ],
    timeline: [
      {
        id: 'T5',
        timestamp: '2024-03-15T21:45:00Z',
        type: 'report',
        description: 'Arrêt du jeu - J Marseille au sol, douleur genou',
        author: 'Arbitre central',
        role: 'Arbitre'
      },
      {
        id: 'T6',
        timestamp: '2024-03-15T21:45:30Z',
        type: 'action',
        description: 'Équipe médicale sur le terrain, évaluation en cours',
        author: 'Dr. Patrick Müller',
        role: 'Médecin'
      },
      {
        id: 'T7',
        timestamp: '2024-03-15T21:48:00Z',
        type: 'update',
        description: 'Évacuation sur civière, remplacement effectué. Suspicion rupture ligament croisé.',
        author: 'Dr. Patrick Müller',
        role: 'Médecin'
      },
      {
        id: 'T8',
        timestamp: '2024-03-15T22:15:00Z',
        type: 'escalation',
        description: 'Rapport médical transmis à la commission LFP. Enquête ouverte sur le tacle.',
        author: 'Dr. Sophie Bernard',
        role: 'Responsable Médical'
      }
    ],
    communications: [
      {
        id: 'C3',
        timestamp: '2024-03-15T21:45:10Z',
        type: 'radio',
        from: 'Arbitre',
        to: 'Medical Team',
        content: 'MEDICAL! Joueur blessé terrain centre, besoin évaluation',
        priority: 'high'
      },
      {
        id: 'C4',
        timestamp: '2024-03-15T21:50:00Z',
        type: 'phone',
        from: 'Dr. Müller',
        to: 'SMU Paris',
        content: 'Demande évacuation urgente, genou traumatisé, IRM nécessaire',
        priority: 'high'
      }
    ],
    estimatedResolutionTime: 120,
    impact: { safety: 4, operations: 3, reputation: 2, financial: 3 },
    tags: ['blessure', 'joueur', 'médical', 'évacuation', 'tacle_dangereux'],
    weatherConditions: 'Clair, 12°C',
    crowdDensity: 'very_high'
  },
  {
    id: 'INC-2024-003',
    code: 'TEC-003-MED',
    title: 'Panne système VAR - Retard de 8 minutes',
    description: 'Panne complète du système de vidéo-arbitrage à la 67ème minute. Impossible de valider les décisions litigieuses. Match interrompu pour maintenance.',
    category: 'technical',
    priority: 'medium',
    status: 'resolved',
    location: {
      venue: 'Groupama Stadium',
      sector: 'Salle technique VAR',
      exactLocation: 'Poste de contrôle vidéo niveau -2',
      coordinates: { lat: 45.7640, lng: 4.9820 }
    },
    matchId: 'M-2024-157',
    matchInfo: {
      homeTeam: 'Lyon',
      awayTeam: 'Lille',
      date: '2024-03-16',
      time: '17:00',
      league: 'Ligue 1 Uber Eats'
    },
    reportedAt: '2024-03-16T18:35:00Z',
    reportedBy: {
      name: 'Thomas Petit',
      role: 'Technicien VAR',
      contact: '06 45 67 89 01'
    },
    assignedTo: {
      name: 'Lucas Moreau',
      role: 'Responsable Technique Stade',
      team: 'IT Infrastructure'
    },
    involvedPersons: [
      {
        id: 'P5',
        name: 'Équipe VAR complète',
        role: 'other',
        actionTaken: 'Redémarrage système, tests de validation'
      }
    ],
    timeline: [
      {
        id: 'T9',
        timestamp: '2024-03-16T18:35:00Z',
        type: 'report',
        description: 'Panne système VAR - Écran noir, perte connexion caméras',
        author: 'Thomas Petit',
        role: 'Technicien'
      },
      {
        id: 'T10',
        timestamp: '2024-03-16T18:36:00Z',
        type: 'acknowledge',
        description: 'Arbitre informé, match suspendu temporairement',
        author: 'Lucas Moreau',
        role: 'Responsable Tech'
      },
      {
        id: 'T11',
        timestamp: '2024-03-16T18:42:00Z',
        type: 'action',
        description: 'Redémarrage système, reconnexion caméras 12/14',
        author: 'Thomas Petit',
        role: 'Technicien'
      },
      {
        id: 'T12',
        timestamp: '2024-03-16T18:43:00Z',
        type: 'resolution',
        description: 'Système VAR rétabli, match reprend. 2 caméras encore hors service.',
        author: 'Lucas Moreau',
        role: 'Responsable Tech'
      }
    ],
    communications: [
      {
        id: 'C5',
        timestamp: '2024-03-16T18:35:15Z',
        type: 'radio',
        from: 'VAR Room',
        to: 'Arbitre central',
        content: 'PANNE VAR - Système indisponible, arrêt recommandé',
        priority: 'high'
      }
    ],
    resolution: {
      resolvedAt: '2024-03-16T18:43:00Z',
      resolvedBy: 'Lucas Moreau',
      summary: 'Panne due à surcharge serveur. Redémarrage effectué.',
      preventiveMeasures: [
        'Mise à jour firmware serveurs VAR',
        'Installation onduleur dédié',
        'Procédure backup papier validée'
      ],
      lessonsLearned: 'Temps de récupération acceptable mais procédure backup à améliorer.'
    },
    estimatedResolutionTime: 8,
    impact: { safety: 1, operations: 4, reputation: 3, financial: 2 },
    tags: ['VAR', 'panne', 'technique', 'retard', 'arbitrage'],
    weatherConditions: 'Pluvieux, 8°C',
    crowdDensity: 'high'
  },
  {
    id: 'INC-2024-004',
    code: 'WEA-004-EMERG',
    title: 'Orage violent - Menace foudre, évacuation tribunes',
    description: 'Orage électrique intense détecté à 5km du stade. Protocole foudre activé. Évacuation partielle des tribunes exposées. Match suspendu à la 34ème minute.',
    category: 'weather',
    priority: 'emergency',
    status: 'resolved',
    location: {
      venue: 'Allianz Riviera',
      sector: 'Tribunes Nord et Est',
      exactLocation: 'Zones hautes non couvertes',
      coordinates: { lat: 43.7050, lng: 7.1920 }
    },
    matchId: 'M-2024-158',
    matchInfo: {
      homeTeam: 'Nice',
      awayTeam: 'Monaco',
      date: '2024-03-17',
      time: '15:00',
      league: 'Ligue 1 Uber Eats'
    },
    reportedAt: '2024-03-17T15:42:00Z',
    reportedBy: {
      name: 'Station Météo Auto',
      role: 'Système automatisé',
      contact: 'meteo@lfp.fr'
    },
    assignedTo: {
      name: 'Marie Curie',
      role: 'Responsable Sécurité',
      team: 'Direction des Opérations'
    },
    involvedPersons: [
      {
        id: 'P6',
        name: '15,000 spectateurs',
        role: 'spectator',
        actionTaken: 'Évacuation ordonnée vers zones couvertes'
      }
    ],
    timeline: [
      {
        id: 'T13',
        timestamp: '2024-03-17T15:42:00Z',
        type: 'report',
        description: 'ALERTE ROUGE FOUDRE - Orage à 5km, approche rapide',
        author: 'Station Météo',
        role: 'Automated'
      },
      {
        id: 'T14',
        timestamp: '2024-03-17T15:42:30Z',
        type: 'action',
        description: 'Protocole foudre activé, annonce stade, évacuation tribunes Nord/Est',
        author: 'Marie Curie',
        role: 'Sécurité'
      },
      {
        id: 'T15',
        timestamp: '2024-03-17T16:15:00Z',
        type: 'update',
        description: 'Orage éloigné à 15km. Évaluation reprise possible.',
        author: 'Station Météo',
        role: 'Automated'
      },
      {
        id: 'T16',
        timestamp: '2024-03-17T16:30:00Z',
        type: 'resolution',
        description: 'Match reprend. Tribunes réouvertes. Aucun incident.',
        author: 'Marie Curie',
        role: 'Sécurité'
      }
    ],
    communications: [
      {
        id: 'C6',
        timestamp: '2024-03-17T15:42:10Z',
        type: 'alert',
        from: 'Météo France',
        to: 'Tous les postes',
        content: 'ALERTE METEO NIVEAU 3 - Orage violent imminent',
        priority: 'emergency'
      }
    ],
    resolution: {
      resolvedAt: '2024-03-17T16:30:00Z',
      resolvedBy: 'Marie Curie',
      summary: 'Évacuation réussie en 8 minutes. Protocole efficace.',
      preventiveMeasures: [
        'Amélioration couverture tribune Nord',
        'Exercice évacuation trimestriel'
      ],
      lessonsLearned: 'Réactivité excellente. Communication stade à améliorer.'
    },
    estimatedResolutionTime: 48,
    impact: { safety: 5, operations: 4, reputation: 2, financial: 3 },
    tags: ['météo', 'orage', 'foudre', 'évacuation', 'protocole'],
    weatherConditions: 'Orage violent, vents 80km/h, pluie intense',
    crowdDensity: 'high'
  },
  {
    id: 'INC-2024-005',
    code: 'DIS-005-HIGH',
    title: 'Altercation entre joueurs - Coups échangés hors jeu',
    description: 'Incident entre deux joueurs dans le tunnel à la mi-temps. Échauffourouffe verbale puis échange de coups. Séparation par les staffs.',
    category: 'disciplinary',
    priority: 'high',
    status: 'escalated',
    location: {
      venue: 'Stade Bollaert-Delelis',
      sector: 'Tunnel joueurs',
      exactLocation: 'Vestiaires visiteurs - couloir principal',
      coordinates: { lat: 50.4329, lng: 2.8150 }
    },
    matchId: 'M-2024-159',
    matchInfo: {
      homeTeam: 'Lens',
      awayTeam: 'Strasbourg',
      date: '2024-03-18',
      time: '19:00',
      league: 'Ligue 1 Uber Eats'
    },
    reportedAt: '2024-03-18T20:00:00Z',
    reportedBy: {
      name: 'Steward Vestiaires',
      role: 'Agent de sécurité',
      contact: '06 11 22 33 44'
    },
    assignedTo: {
      name: 'Commission Discipline LFP',
      role: 'Instance disciplinaire',
      team: 'Direction Juridique'
    },
    involvedPersons: [
      {
        id: 'P7',
        name: 'Florian Sotoca',
        role: 'player',
        team: 'Lens',
        condition: 'unharmed',
        actionTaken: 'Carton rouge après VAR, convocation commission'
      },
      {
        id: 'P8',
        name: 'Emanuel Emegha',
        role: 'player',
        team: 'Strasbourg',
        condition: 'unharmed',
        actionTaken: 'Carton rouge après VAR, convocation commission'
      }
    ],
    timeline: [
      {
        id: 'T17',
        timestamp: '2024-03-18T20:00:00Z',
        type: 'report',
        description: 'Alerte steward - Altercation tunnel, besoin renfort',
        author: 'Steward',
        role: 'Sécurité'
      },
      {
        id: 'T18',
        timestamp: '2024-03-18T20:01:00Z',
        type: 'action',
        description: 'Staffs séparent les joueurs, calme revenu',
        author: 'Coach Lens',
        role: 'Entraîneur'
      },
      {
        id: 'T19',
        timestamp: '2024-03-18T20:15:00Z',
        type: 'escalation',
        description: 'Rapport arbitre + vidéos transmis Commission Discipline',
        author: 'Délégué LFP',
        role: 'Délégué'
      }
    ],
    communications: [
      {
        id: 'C7',
        timestamp: '2024-03-18T20:00:15Z',
        type: 'radio',
        from: 'Steward',
        to: 'Sécurité',
        content: 'URGENCE - Altercation joueurs tunnel, intervention rapide',
        priority: 'high'
      }
    ],
    estimatedResolutionTime: 1440,
    impact: { safety: 3, operations: 2, reputation: 4, financial: 3 },
    tags: ['altercation', 'joueurs', 'discipline', 'carton_rouge', 'commission'],
    weatherConditions: 'Couvert, 10°C',
    crowdDensity: 'medium'
  }
];

// Fonctions utilitaires
const getCategoryIcon = (category: IncidentCategory) => {
  switch (category) {
    case 'security': return <ShieldAlert size={20} />;
    case 'medical': return <Ambulance size={20} />;
    case 'technical': return <Zap size={20} />;
    case 'weather': return <CloudRain size={20} />;
    case 'crowd': return <Users size={20} />;
    case 'infrastructure': return <Construction size={20} />;
    case 'operational': return <Activity size={20} />;
    case 'disciplinary': return <Ban size={20} />;
    case 'equipment': return <AlertTriangle size={20} />;
    case 'communication': return <Radio size={20} />;
    default: return <AlertCircle size={20} />;
  }
};

const getCategoryColor = (category: IncidentCategory) => {
  switch (category) {
    case 'security': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'medical': return 'bg-red-100 text-red-700 border-red-200';
    case 'technical': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'weather': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'crowd': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'infrastructure': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'operational': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case 'disciplinary': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'equipment': return 'bg-teal-100 text-teal-700 border-teal-200';
    case 'communication': return 'bg-pink-100 text-pink-700 border-pink-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const getPriorityColor = (priority: IncidentPriority) => {
  switch (priority) {
    case 'emergency': return 'bg-rose-500 text-white';
    case 'critical': return 'bg-orange-500 text-white';
    case 'high': return 'bg-amber-500 text-white';
    case 'medium': return 'bg-blue-500 text-white';
    case 'low': return 'bg-slate-500 text-white';
    default: return 'bg-slate-400 text-white';
  }
};

const getStatusColor = (status: IncidentStatus) => {
  switch (status) {
    case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'closed': return 'bg-slate-100 text-slate-600 border-slate-200';
    case 'investigating': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'escalated': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'acknowledged': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'reported': return 'bg-rose-100 text-rose-700 border-rose-200';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getImpactColor = (level: number) => {
  if (level <= 2) return 'bg-emerald-500';
  if (level <= 3) return 'bg-amber-500';
  if (level <= 4) return 'bg-orange-500';
  return 'bg-rose-500';
};

// Composant pour les cartes de statistiques
const StatCard = ({ title, value, subtitle, trend, icon: Icon, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${
          trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-600' : 'text-slate-600'
        }`}>
          {trend > 0 ? <ArrowUpRight size={16} /> : trend < 0 ? <ArrowDownRight size={16} /> : <Minus size={16} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
    <div className="text-sm font-medium text-slate-600 mb-1">{title}</div>
    {subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
  </motion.div>
);

// Composant pour la vue LISTE
const ListView = ({ incidents, onSelect }: { incidents: Incident[], onSelect: (i: Incident) => void }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Code</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Incident</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Catégorie</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Priorité</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Lieu</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Impact</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {incidents.map((incident, idx) => (
            <motion.tr
              key={incident.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelect(incident)}
              className="hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                  {incident.code}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {incident.title}
                </div>
                <div className="text-sm text-slate-500 line-clamp-1">{incident.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getCategoryColor(incident.category)}`}>
                  {getCategoryIcon(incident.category)}
                  <span className="capitalize">{incident.category}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(incident.priority)}`}>
                  {incident.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {incident.location.venue}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {new Date(incident.reportedAt).toLocaleDateString('fr-FR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-1">
                  {Object.entries(incident.impact).slice(0, 3).map(([key, value]) => (
                    <div 
                      key={key}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${getImpactColor(value)}`}
                      title={`${key}: ${value}/5`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Composant pour la vue CARTE (Map)
const MapView = ({ incidents, onSelect }: { incidents: Incident[], onSelect: (i: Incident) => void }) => {
  // Simulation d'une carte avec des points positionnés relativement
  const venues = [
    { name: 'Parc des Princes', x: 20, y: 30 },
    { name: 'Groupama Stadium', x: 50, y: 40 },
    { name: 'Allianz Riviera', x: 70, y: 70 },
    { name: 'Stade Bollaert-Delelis', x: 40, y: 20 },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-sm relative h-[600px]">
      {/* Fond de carte stylisé */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.3)_0%,_transparent_50%)]" />
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Titre et légende */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <h3 className="text-white font-bold flex items-center gap-2">
          <MapIcon size={20} className="text-indigo-400" />
          Vue Géographique des Incidents
        </h3>
        <div className="flex gap-2">
          {['emergency', 'critical', 'high', 'medium', 'low'].map(priority => (
            <div key={priority} className="flex items-center gap-1 text-xs text-slate-300">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority as IncidentPriority).split(' ')[0]}`} />
              <span className="capitalize">{priority}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Points d'incidents sur la carte */}
      {incidents.map((incident, idx) => {
        // Position basée sur le lieu ou aléatoire si non défini
        const venue = venues.find(v => incident.location.venue.includes(v.name)) || venues[idx % venues.length];
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        
        return (
          <motion.button
            key={incident.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            onClick={() => onSelect(incident)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
            style={{ 
              left: `${venue.x + offsetX}%`, 
              top: `${venue.y + offsetY}%` 
            }}
          >
            <div className={`
              relative flex items-center justify-center w-12 h-12 rounded-full 
              ${getPriorityColor(incident.priority).split(' ')[0]} 
              shadow-lg shadow-black/50 border-2 border-white/20
              hover:scale-110 transition-transform cursor-pointer
            `}>
              {getCategoryIcon(incident.category)}
              
              {/* Pulse effect pour les incidents critiques */}
              {(incident.priority === 'emergency' || incident.priority === 'critical') && (
                <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-30" />
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                {incident.code}
                <div className="text-slate-500 font-normal">{incident.location.venue}</div>
              </div>
            </div>
          </motion.button>
        );
      })}

      {/* Liste des incidents en overlay en bas */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent p-4 pt-12">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {incidents.map(incident => (
            <button
              key={incident.id}
              onClick={() => onSelect(incident)}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 hover:bg-white/20 transition-colors text-left min-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(incident.priority).split(' ')[0]}`} />
                <span className="text-xs font-mono text-slate-300">{incident.code}</span>
              </div>
              <div className="text-sm font-bold text-white line-clamp-1">{incident.title}</div>
              <div className="text-xs text-slate-400 mt-1">{incident.location.venue}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function IncidentsPage() {
  const [mounted, setMounted] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filterCategory, setFilterCategory] = useState<IncidentCategory | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<IncidentPriority | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'live'>('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Chargement...</div>
      </div>
    );
  }

  const filteredIncidents = incidents.filter(incident => {
    const matchesCategory = filterCategory === 'all' || incident.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || incident.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPriority && matchesStatus && matchesSearch;
  });

  const stats = {
    total: incidents.length,
    byCategory: {} as Record<IncidentCategory, number>,
    byPriority: {} as Record<IncidentPriority, number>,
    byStatus: {} as Record<IncidentStatus, number>,
    resolved: incidents.filter(i => i.status === 'resolved' || i.status === 'closed').length,
    inProgress: incidents.filter(i => i.status === 'investigating' || i.status === 'acknowledged').length,
    criticalOpen: incidents.filter(i => (i.priority === 'critical' || i.priority === 'emergency') && i.status !== 'resolved' && i.status !== 'closed').length,
    avgResolutionTime: incidents.filter(i => i.estimatedResolutionTime).reduce((sum, i) => sum + (i.estimatedResolutionTime || 0), 0) / incidents.filter(i => i.estimatedResolutionTime).length || 0,
    resolutionRate: (incidents.filter(i => i.status === 'resolved' || i.status === 'closed').length / incidents.length) * 100
  };

  incidents.forEach(i => {
    stats.byCategory[i.category] = (stats.byCategory[i.category] || 0) + 1;
    stats.byPriority[i.priority] = (stats.byPriority[i.priority] || 0) + 1;
    stats.byStatus[i.status] = (stats.byStatus[i.status] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Section Statistiques Créative */}
      <div className="bg-slate-900 text-white pb-12 pt-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Incidents Totaux"
              value={stats.total}
              subtitle="Ce mois-ci"
              trend={12}
              icon={AlertTriangle}
              color="bg-indigo-500"
              delay={0}
            />
            <StatCard
              title="Taux de Résolution"
              value={`${stats.resolutionRate.toFixed(0)}%`}
              subtitle={`${stats.resolved} résolus`}
              trend={5}
              icon={CheckCircle}
              color="bg-emerald-500"
              delay={0.1}
            />
            <StatCard
              title="En Cours"
              value={stats.inProgress}
              subtitle="Investigation active"
              trend={-8}
              icon={Activity}
              color="bg-amber-500"
              delay={0.2}
            />
            <StatCard
              title="Temps Moyen"
              value={`${stats.avgResolutionTime.toFixed(0)}m`}
              subtitle="De résolution"
              trend={-15}
              icon={Clock}
              color="bg-blue-500"
              delay={0.3}
            />
          </div>

          {/* Dashboard Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Distribution par catégorie */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <Layers size={20} className="text-indigo-400" />
                  Distribution par Catégorie
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      activeTab === 'overview' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Vue d'ensemble
                  </button>
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      activeTab === 'analytics' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Analytiques
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {Object.entries(stats.byCategory)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, count], idx) => {
                    const percentage = (count / stats.total) * 100;
                    return (
                      <div key={category} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getCategoryColor(category as IncidentCategory)}`}>
                              {getCategoryIcon(category as IncidentCategory)}
                            </div>
                            <span className="font-medium capitalize">{category}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 text-sm">{count} incidents</span>
                            <span className="font-bold">{percentage.toFixed(0)}%</span>
                          </div>
                        </div>
                        <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${getCategoryColor(category as IncidentCategory).split(' ')[0].replace('bg-', 'bg-opacity-80 bg-')}`}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Priorités & Métriques */}
            <div className="space-y-6">
              {/* Priorités */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Gauge size={20} className="text-rose-400" />
                  Niveaux de Priorité
                </h3>
                <div className="space-y-3">
                  {(['emergency', 'critical', 'high', 'medium', 'low'] as IncidentPriority[]).map(priority => {
                    const count = stats.byPriority[priority] || 0;
                    return (
                      <div key={priority} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority).split(' ')[0]}`} />
                          <span className="capitalize font-medium">{priority}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getPriorityColor(priority).split(' ')[0]}`}
                              style={{ width: `${(count / stats.total) * 100}%` }}
                            />
                          </div>
                          <span className="font-bold w-6 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Alertes en direct */}
              <div className="bg-gradient-to-br from-rose-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                  <span className="font-bold text-rose-300">Alertes Critiques Actives</span>
                </div>
                <div className="text-4xl font-black mb-2">{stats.criticalOpen}</div>
                <p className="text-sm text-rose-200/80">Incidents nécessitant une attention immédiate</p>
                <button className="mt-4 w-full py-2 bg-rose-500 hover:bg-rose-600 rounded-lg text-sm font-semibold transition-colors">
                  Voir les détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 -mt-6">
        {/* Filtres et contrôles */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm sticky top-4 z-20">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px] relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un incident (titre, code, lieu...)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Toutes catégories</option>
                {['security', 'medical', 'technical', 'weather', 'crowd', 'infrastructure', 'operational', 'disciplinary'].map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Toutes priorités</option>
                {['emergency', 'critical', 'high', 'medium', 'low'].map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tous statuts</option>
                {['reported', 'acknowledged', 'investigating', 'resolved', 'closed', 'escalated'].map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>

              {/* Toggle View Mode - CORRIGÉ */}
              <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Vue Grille"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Vue Liste"
                >
                  <AlignLeft size={18} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'map' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Vue Carte"
                >
                  <MapPinIcon size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENU CONDITIONNEL SELON LE VIEW MODE */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredIncidents.map((incident, idx) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedIncident(incident)}
                  className={`group bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                    incident.priority === 'emergency' || incident.priority === 'critical' 
                      ? 'border-rose-200 hover:border-rose-300' 
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {/* Bandeau supérieur avec priorité */}
                  <div className={`h-1.5 ${getPriorityColor(incident.priority).split(' ')[0]}`} />
                  
                  <div className="p-5">
                    {/* En-tête */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {incident.code}
                      </span>
                      <div className="flex gap-1">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(incident.priority)}`}>
                          {incident.priority}
                        </span>
                      </div>
                    </div>

                    {/* Titre et description */}
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {incident.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {incident.description}
                    </p>

                    {/* Métadonnées */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                        <Calendar size={12} />
                        {new Date(incident.reportedAt).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                        <MapPin size={12} />
                        {incident.location.venue}
                      </span>
                    </div>

                    {/* Footer avec catégorie et statut */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getCategoryColor(incident.category)}`}>
                        {getCategoryIcon(incident.category)}
                        <span className="capitalize">{incident.category}</span>
                      </div>
                      
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>

                    {/* Indicateurs d'impact */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-slate-400">Impact:</span>
                      <div className="flex gap-1">
                        {Object.entries(incident.impact).slice(0, 3).map(([key, value]) => (
                          <div 
                            key={key}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${getImpactColor(value)}`}
                            title={`${key}: ${value}/5`}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dernier événement */}
                    {incident.timeline.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <History size={12} className="text-indigo-500" />
                          <span className="truncate">
                            {incident.timeline[incident.timeline.length - 1].description.slice(0, 45)}...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ListView incidents={filteredIncidents} onSelect={setSelectedIncident} />
            </motion.div>
          )}

          {viewMode === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <MapView incidents={filteredIncidents} onSelect={setSelectedIncident} />
            </motion.div>
          )}
        </AnimatePresence>

        {filteredIncidents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={48} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun incident trouvé</h3>
            <p className="text-slate-500 mb-6">Modifiez vos filtres ou créez un nouvel incident</p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
              <Plus size={20} />
              Créer un incident
            </button>
          </motion.div>
        )}
      </main>

      {/* Modal détail incident */}
      <AnimatePresence>
        {selectedIncident && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Header du modal */}
              <div className={`p-6 text-white ${getPriorityColor(selectedIncident.priority).replace('text-white', '')}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                        {selectedIncident.code}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase">
                        {selectedIncident.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedIncident.status)}`}>
                        {selectedIncident.status}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black mb-2">{selectedIncident.title}</h2>
                    <p className="text-white/80 text-sm max-w-2xl">{selectedIncident.description}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedIncident(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Quick stats */}
                <div className="flex items-center gap-6 mt-6 text-sm">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(selectedIncident.reportedAt).toLocaleString('fr-FR')}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {selectedIncident.location.venue} • {selectedIncident.location.sector}
                  </span>
                  <span className="flex items-center gap-2">
                    <UserCircle size={16} />
                    Signalé par: {selectedIncident.reportedBy.name}
                  </span>
                  {selectedIncident.estimatedResolutionTime && (
                    <span className="flex items-center gap-2">
                      <Timer size={16} />
                      Résolution: ~{selectedIncident.estimatedResolutionTime} min
                    </span>
                  )}
                </div>
              </div>

              <div className="flex h-[calc(90vh-200px)]">
                {/* Contenu principal */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Match associé */}
                  {selectedIncident.matchInfo && (
                    <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                      <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                        <Shield size={16} />
                        Match associé
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-slate-900">{selectedIncident.matchInfo.homeTeam}</span>
                          <span className="text-slate-400">vs</span>
                          <span className="font-bold text-slate-900">{selectedIncident.matchInfo.awayTeam}</span>
                        </div>
                        <div className="text-sm text-slate-500">
                          {selectedIncident.matchInfo.league} • {selectedIncident.matchInfo.date} à {selectedIncident.matchInfo.time}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <History size={18} className="text-indigo-600" />
                      Chronologie
                    </h4>
                    <div className="space-y-4 relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
                      {selectedIncident.timeline.map((event, idx) => (
                        <div key={event.id} className="relative pl-10">
                          <div className={`absolute left-2 top-1.5 w-5 h-5 rounded-full border-2 bg-white ${
                            event.type === 'resolution' ? 'border-emerald-500' :
                            event.type === 'escalation' ? 'border-purple-500' :
                            event.type === 'action' ? 'border-amber-500' :
                            'border-indigo-500'
                          }`} />
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{event.type}</span>
                              <span className="text-xs text-slate-400">{new Date(event.timestamp).toLocaleString('fr-FR')}</span>
                            </div>
                            <p className="text-sm text-slate-700 mb-2">{event.description}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <UserCircle size={12} />
                              {event.author} • {event.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personnes impliquées */}
                  {selectedIncident.involvedPersons.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Users size={18} className="text-indigo-600" />
                        Personnes impliquées ({selectedIncident.involvedPersons.length})
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedIncident.involvedPersons.map(person => (
                          <div key={person.id} className="p-4 bg-white rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                <UserCircle size={20} className="text-slate-400" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-sm">{person.name}</div>
                                <div className="text-xs text-slate-500 capitalize">{person.role}{person.team && ` • ${person.team}`}</div>
                              </div>
                            </div>
                            {person.condition && (
                              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                person.condition === 'unharmed' ? 'bg-emerald-100 text-emerald-700' :
                                person.condition === 'injured' ? 'bg-amber-100 text-amber-700' :
                                'bg-rose-100 text-rose-700'
                              }`}>
                                {person.condition}
                              </div>
                            )}
                            {person.actionTaken && (
                              <p className="text-xs text-slate-500 mt-2">{person.actionTaken}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Communications */}
                  {selectedIncident.communications.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Radio size={18} className="text-indigo-600" />
                        Journal des communications
                      </h4>
                      <div className="space-y-3">
                        {selectedIncident.communications.map(comm => (
                          <div key={comm.id} className={`p-4 rounded-xl border ${
                            comm.priority === 'emergency' ? 'bg-rose-50 border-rose-200' :
                            comm.priority === 'critical' || comm.priority === 'high' ? 'bg-amber-50 border-amber-200' :
                            'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                  comm.type === 'radio' ? 'bg-blue-100 text-blue-700' :
                                  comm.type === 'alert' ? 'bg-rose-100 text-rose-700' :
                                  'bg-slate-200 text-slate-700'
                                }`}>
                                  {comm.type.toUpperCase()}
                                </span>
                                <span className="text-xs text-slate-500">{new Date(comm.timestamp).toLocaleTimeString('fr-FR')}</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-700 mb-2">{comm.content}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>De: {comm.from}</span>
                              <span>À: {comm.to}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Résolution */}
                  {selectedIncident.resolution && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                        <CheckCircle size={18} />
                        Résolution
                      </h4>
                      <p className="text-sm text-emerald-800 mb-3">{selectedIncident.resolution.summary}</p>
                      
                      {selectedIncident.resolution.preventiveMeasures.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs font-bold text-emerald-700 mb-2">MESURES PRÉVENTIVES</div>
                          <ul className="space-y-1">
                            {selectedIncident.resolution.preventiveMeasures.map((measure, idx) => (
                              <li key={idx} className="text-sm text-emerald-700 flex items-center gap-2">
                                <CheckCircle size={12} />
                                {measure}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="text-xs text-emerald-600 italic">
                        &quot;{selectedIncident.resolution.lessonsLearned}&quot;
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-600">
                        Résolu par {selectedIncident.resolution.resolvedBy} le {new Date(selectedIncident.resolution.resolvedAt).toLocaleString('fr-FR')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar info */}
                <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 overflow-y-auto">
                  {/* Impact */}
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-3 text-sm">Impact estimé</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedIncident.impact).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-500 capitalize">{key}</span>
                            <span className="text-xs font-bold text-slate-700">{value}/5</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getImpactColor(value)}`}
                              style={{ width: `${(value / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Localisation détaillée */}
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                      <MapPinned size={16} />
                      Localisation précise
                    </h4>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-sm">
                      <div className="font-medium text-slate-900 mb-1">{selectedIncident.location.venue}</div>
                      <div className="text-slate-500 mb-1">{selectedIncident.location.sector}</div>
                      <div className="text-slate-400 text-xs">{selectedIncident.location.exactLocation}</div>
                    </div>
                  </div>

                  {/* Assigné à */}
                  {selectedIncident.assignedTo && (
                    <div className="mb-6">
                      <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                        <Briefcase size={16} />
                        Assigné à
                      </h4>
                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <div className="font-medium text-slate-900">{selectedIncident.assignedTo.name}</div>
                        <div className="text-sm text-slate-500">{selectedIncident.assignedTo.role}</div>
                        <div className="text-xs text-slate-400">{selectedIncident.assignedTo.team}</div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-3 text-sm">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedIncident.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-3">
                    {selectedIncident.weatherConditions && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CloudRain size={16} className="text-blue-500" />
                        {selectedIncident.weatherConditions}
                      </div>
                    )}
                    {selectedIncident.crowdDensity && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} className="text-purple-500" />
                        Affluence: {selectedIncident.crowdDensity.replace('_', ' ')}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-2">
                    <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                      <FileText size={16} />
                      Générer rapport
                    </button>
                    <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Partager
                    </button>
                    <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      <Printer size={16} />
                      Imprimer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}