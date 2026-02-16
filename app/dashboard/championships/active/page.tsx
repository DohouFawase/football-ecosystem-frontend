"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  FileText,
  Award,
  ChevronRight,
  Plus,
  Filter,
  Search,
  MapPin,
  Info,
  AlertTriangle,
  ChevronLeft,
  Save,
  AlertCircle,
  X,
  CheckCircle,
  Target,
  Shield,
  Clock,
  Zap,
  Crown,
  Medal,
  Star,
  TrendingUp,
  Activity,
  Flag,
  Swords,
  Ban,
  Settings,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  Globe,
  EyeOff,
  Play,
  PauseCircle,
  CheckSquare,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { League, LeagueStatus } from "@/types/LeagueTypes";

// Types étendus pour les nouvelles fonctionnalités
interface ExtendedLeague extends League {
  prizeDistribution?: {
    champion: string;
    vice_champion: string;
    troisieme?: string;
    quatrieme?: string;
  };
  individualPrizes?: {
    meilleur_joueur_MVP: number;
    soulier_d_or_buteur: number;
    gants_d_or_gardien?: number;
    prix_fair_play?: number;
  };
  rules?: {
    competition_format?: {
      groups: number;
      teams_per_group: number;
      qualifiers_per_group: number;
    };
    discipline?: {
      yellow_card_fine: number;
      red_card_fine: number;
      suspension_rule: string;
    };
    match_logistics?: {
      duration: string;
      substitution_limit: number;
      extra_time_final_only?: boolean;
    };
    tie_breaker?: string[];
  };
  stats?: {
    totalMatches?: number;
    completedMatches?: number;
    averageGoals?: number;
    topScorer?: string;
  };
}

// MOCK DATA ENRICHI avec plus de ligues et tournois créatifs
const MOCK_LEAGUES: ExtendedLeague[] = [
  {
    id: "league-calavi-2026",
    name: "Coupe des Vacances Calavi 2026",
    description: "Tournoi de prestige. Phase de groupes (4 poules de 4) suivie d'une phase à élimination directe. Ambiance festive garantie !",
    format: "tournament",
    tier: "regional",
    category: "AMATEUR",
    startDate: "2026-07-15T09:00:00Z",
    endDate: "2026-08-30T18:00:00Z",
    maxTeams: 16,
    minTeams: 16,
    registrationFee: 30000,
    totalPrizePool: 750000,
    firstPlacePrize: 500000,
    secondPlacePrize: 300000,
    thirdPlacePrize: 150000,
    status: "open_registration",
    isPublic: true,
    knockoutFormat: "single_elimination",
    hasThirdPlaceMatch: true,
    _count: { teams: 8, participations: 12 },
    region: {
      id: "6a852d53-d123-4712-a40d-74c39c195026",
      name: "Atlantique (Calavi)",
      country: { id: "country-bj", name: "Bénin", code: "BJ" }
    },
    sport: { id: "8d8ade51-8a9c-448b-9ed9-d3a91754ace4", name: "Football" },
    prizeDistribution: {
      champion: "Trophée + Médailles d'or + 500.000 FCFA",
      vice_champion: "Médailles d'argent + 300.000 FCFA",
      troisieme: "Médailles de bronze + 150.000 FCFA",
      quatrieme: "Ballons de compétition + 50.000 FCFA"
    },
    individualPrizes: {
      meilleur_joueur_MVP: 50000,
      soulier_d_or_buteur: 50000,
      gants_d_or_gardien: 30000,
      prix_fair_play: 20000
    },
    rules: {
      competition_format: { groups: 4, teams_per_group: 4, qualifiers_per_group: 2 },
      discipline: { yellow_card_fine: 1000, red_card_fine: 2500, suspension_rule: "2 jaunes = 1 match" },
      match_logistics: { duration: "90min", substitution_limit: 5, extra_time_final_only: true },
      tie_breaker: ["Face-à-face", "Diff. Buts", "Buts marqués", "Tirage au sort"]
    },
    stats: { totalMatches: 32, completedMatches: 0, averageGoals: 0 }
  },
  {
    id: "league-champions-2026",
    name: "Ligue des Champions de Quartier",
    description: "Le tournoi le plus attendu de l'année ! 32 équipes s'affrontent pour le titre suprême du quartier.",
    format: "tournament",
    tier: "local",
    category: "AMATEUR",
    startDate: "2026-06-01T14:00:00Z",
    endDate: "2026-08-15T20:00:00Z",
    maxTeams: 32,
    minTeams: 24,
    registrationFee: 15000,
    totalPrizePool: 500000,
    firstPlacePrize: 300000,
    secondPlacePrize: 150000,
    thirdPlacePrize: 50000,
    status: "draft",
    isPublic: true,
    knockoutFormat: "double_elimination",
    hasThirdPlaceMatch: true,
    _count: { teams: 0, participations: 0 },
    region: {
      id: "region-dakar",
      name: "Médina",
      country: { id: "country-sn", name: "Sénégal", code: "SN" }
    },
    sport: { id: "sport-foot", name: "Football" },
    prizeDistribution: {
      champion: "Coupe en or + 300.000 FCFA + Maillots",
      vice_champion: "150.000 FCFA + Ballons",
      troisieme: "50.000 FCFA + Trophée bronze",
      quatrieme: "Trophée participation"
    },
    individualPrizes: {
      meilleur_joueur_MVP: 25000,
      soulier_d_or_buteur: 25000,
      gants_d_or_gardien: 15000,
      prix_fair_play: 10000
    },
    rules: {
      competition_format: { groups: 8, teams_per_group: 4, qualifiers_per_group: 2 },
      discipline: { yellow_card_fine: 500, red_card_fine: 1500, suspension_rule: "Rouge direct = 2 matchs" },
      match_logistics: { duration: "80min", substitution_limit: 5, extra_time_final_only: false },
      tie_breaker: ["Points", "Diff. Buts", "Buts marqués", "Penalties"]
    }
  },
  {
    id: "league-feminin-2026",
    name: "Championnat Féminin D1 2026",
    description: "La première division du football féminin. Saison régulière avec play-offs pour le titre.",
    format: "league",
    tier: "professional",
    category: "senior",
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-11-30T23:59:59Z",
    maxTeams: 12,
    minTeams: 10,
    registrationFee: 200000,
    totalPrizePool: 5000000,
    firstPlacePrize: 3000000,
    secondPlacePrize: 1500000,
    thirdPlacePrize: 500000,
    status: "in_progress",
    isPublic: true,
    _count: { teams: 12, participations: 12 },
    region: {
      id: "region-dakar",
      name: "Dakar",
      country: { id: "country-sn", name: "Sénégal", code: "SN" }
    },
    sport: { id: "sport-foot", name: "Football" },
    prizeDistribution: {
      champion: "Trophée + 3.000.000 FCFA + Qualif. Ligue Africaine",
      vice_champion: "1.500.000 FCFA",
      troisieme: "500.000 FCFA"
    },
    individualPrizes: {
      meilleur_joueur_MVP: 100000,
      soulier_d_or_buteur: 100000,
      gants_d_or_gardien: 50000,
      prix_fair_play: 25000
    },
    rules: {
      competition_format: { groups: 1, teams_per_group: 12, qualifiers_per_group: 4 },
      discipline: { yellow_card_fine: 2000, red_card_fine: 5000, suspension_rule: "3 jaunes = 1 match, Rouge = 2 matchs" },
      match_logistics: { duration: "90min", substitution_limit: 5, extra_time_final_only: true },
      tie_breaker: ["Points", "Diff. Buts", "Buts marqués", "Face-à-face"]
    },
    stats: { totalMatches: 132, completedMatches: 45, averageGoals: 2.8, topScorer: "Fatou Ndiaye (12 buts)" }
  },
  {
    id: "league-u21-2026",
    name: "Coupe des Champions U21",
    description: "Tournoi des espoirs. Découvrez les talents de demain ! Format innovant avec phases de poule et bracket final.",
    format: "tournament",
    tier: "regional",
    category: "U21",
    startDate: "2026-05-15T09:00:00Z",
    endDate: "2026-07-20T18:00:00Z",
    maxTeams: 24,
    minTeams: 16,
    registrationFee: 50000,
    totalPrizePool: 1000000,
    firstPlacePrize: 600000,
    secondPlacePrize: 300000,
    thirdPlacePrize: 100000,
    status: "open_registration",
    isPublic: true,
    knockoutFormat: "single_elimination",
    hasThirdPlaceMatch: true,
    _count: { teams: 18, participations: 20 },
    region: {
      id: "region-thies",
      name: "Thiès",
      country: { id: "country-sn", name: "Sénégal", code: "SN" }
    },
    sport: { id: "sport-foot", name: "Football" },
    prizeDistribution: {
      champion: "Trophée + Bourses de formation + 600.000 FCFA",
      vice_champion: "300.000 FCFA + Kits sportifs",
      troisieme: "100.000 FCFA",
      quatrieme: "Médailles + Ballons"
    },
    individualPrizes: {
      meilleur_joueur_MVP: 50000,
      soulier_d_or_buteur: 50000,
      gants_d_or_gardien: 25000,
      prix_fair_play: 15000,
      "espoir_du_tournoi": 20000
    },
    rules: {
      competition_format: { groups: 6, teams_per_group: 4, qualifiers_per_group: 2 },
      discipline: { yellow_card_fine: 1000, red_card_fine: 2000, suspension_rule: "Formation obligatoire après carton rouge" },
      match_logistics: { duration: "80min", substitution_limit: 7, extra_time_final_only: true },
      tie_breaker: ["Points", "Diff. Buts", "Buts marqués", "Penalties"]
    }
  },
  {
    id: "league-beach-2026",
    name: "Tournoi de Beach Soccer 2026",
    description: "Football de plage en bord de mer ! Tournoi 5v5 rapide et spectaculaire.",
    format: "tournament",
    tier: "local",
    category: "AMATEUR",
    startDate: "2026-12-15T10:00:00Z",
    endDate: "2026-12-20T22:00:00Z",
    maxTeams: 16,
    minTeams: 8,
    registrationFee: 25000,
    totalPrizePool: 400000,
    firstPlacePrize: 250000,
    secondPlacePrize: 100000,
    thirdPlacePrize: 50000,
    status: "draft",
    isPublic: false,
    knockoutFormat: "single_elimination",
    hasThirdPlaceMatch: false,
    _count: { teams: 0, participations: 0 },
    region: {
      id: "region-saly",
      name: "Saly",
      country: { id: "country-sn", name: "Sénégal", code: "SN" }
    },
    sport: { id: "sport-beach", name: "Beach Soccer" },
    prizeDistribution: {
      champion: "Coupe spéciale + 250.000 FCFA + Week-end VIP",
      vice_champion: "100.000 FCFA",
      troisieme: "50.000 FCFA"
    },
    individualPrizes: {
      meilleur_joueur_MVP: 20000,
      soulier_d_or_buteur: 20000,
      gants_d_or_gardien: 10000
    },
    rules: {
      competition_format: { groups: 4, teams_per_group: 4, qualifiers_per_group: 2 },
      discipline: { yellow_card_fine: 500, red_card_fine: 1000, suspension_rule: "Match suivant" },
      match_logistics: { duration: "36min (3x12)", substitution_limit: 10, extra_time_final_only: false },
      tie_breaker: ["Points", "Diff. Buts", "Buts marqués"]
    }
  },
  {
    id: "league-001",
    name: "Championnat National Sénior 2026",
    description: "Championnat national de football professionnel pour la saison 2026",
    format: "league",
    tier: "professional",
    category: "senior",
    startDate: "2026-03-01T00:00:00Z",
    endDate: "2026-11-30T23:59:59Z",
    maxTeams: 16,
    minTeams: 12,
    registrationFee: 500000,
    totalPrizePool: 10000000,
    firstPlacePrize: 5000000,
    secondPlacePrize: 3000000,
    thirdPlacePrize: 2000000,
    status: "open_registration",
    isPublic: true,
    _count: { teams: 10, participations: 15 },
    region: {
      id: "region-001",
      name: "Dakar",
      country: { id: "country-001", name: "Sénégal", code: "SN" }
    },
    sport: { id: "sport-001", name: "Football" }
  }
];

// CODE COULEUR SIMPLE
const COLORS = {
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  open_registration: 'bg-green-100 text-green-800 border-green-200',
  registration_closed: 'bg-amber-100 text-amber-800 border-amber-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-purple-100 text-purple-800 border-purple-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white',
  neutral: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
};

// Configuration des statuts avec leurs propriétés
const STATUS_CONFIG: Record<LeagueStatus, { label: string; description: string; icon: any; color: string; bgColor: string; borderColor: string }> = {
  draft: {
    label: "Brouillon",
    description: "En préparation, visible uniquement par vous",
    icon: FileText,
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200"
  },
  open_registration: {
    label: "Inscriptions ouvertes",
    description: "Les équipes peuvent s'inscrire librement",
    icon: Unlock,
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  registration_closed: {
    label: "Inscriptions fermées",
    description: "Plus d'inscriptions acceptées, en attente de début",
    icon: Lock,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  },
  in_progress: {
    label: "En cours",
    description: "La compétition est active",
    icon: Play,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  completed: {
    label: "Terminé",
    description: "Compétition finalisée",
    icon: CheckSquare,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  cancelled: {
    label: "Annulé",
    description: "Compétition annulée",
    icon: XCircle,
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  }
};

export default function Page() {
  const [leagues, setLeagues] = useState<ExtendedLeague[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeagueStatus | "all">("all");
  const [filterFormat, setFilterFormat] = useState<"all" | "league" | "tournament">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Modals state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  const [selectedLeague, setSelectedLeague] = useState<ExtendedLeague | null>(null);
  const [leagueToDelete, setLeagueToDelete] = useState<ExtendedLeague | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  
  // Form state pour création/édition - 5 étapes maintenant
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    format: "tournament",
    tier: "regional",
    category: "AMATEUR",
    startDate: "",
    endDate: "",
    maxTeams: 16,
    minTeams: 8,
    registrationFee: 25000,
    totalPrizePool: 500000,
    firstPlacePrize: 300000,
    secondPlacePrize: 150000,
    thirdPlacePrize: 50000,
    knockoutFormat: "single_elimination",
    hasThirdPlaceMatch: true,
    isPublic: true,
    status: "draft", // Nouveau champ
    // Nouveaux champs enrichis
    prizeDistribution: {
      champion: "",
      vice_champion: "",
      troisieme: "",
      quatrieme: ""
    },
    individualPrizes: {
      meilleur_joueur_MVP: 0,
      soulier_d_or_buteur: 0,
      gants_d_or_gardien: 0,
      prix_fair_play: 0
    },
    rules: {
      competition_format: { groups: 4, teams_per_group: 4, qualifiers_per_group: 2 },
      discipline: { yellow_card_fine: 1000, red_card_fine: 2500, suspension_rule: "" },
      match_logistics: { duration: "90min", substitution_limit: 5, extra_time_final_only: true },
      tie_breaker: ["Points", "Diff. Buts", "Buts marqués"]
    }
  });

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLeagues(MOCK_LEAGUES);
    setLoading(false);
  };

  const openDetailModal = (league: ExtendedLeague) => {
    setSelectedLeague(league);
    setShowDetailModal(true);
  };

  const openCreateModal = () => {
    setFormStep(1);
    setFormData({
      name: "",
      description: "",
      format: "tournament",
      tier: "regional",
      category: "AMATEUR",
      startDate: "",
      endDate: "",
      maxTeams: 16,
      minTeams: 8,
      registrationFee: 25000,
      totalPrizePool: 500000,
      firstPlacePrize: 300000,
      secondPlacePrize: 150000,
      thirdPlacePrize: 50000,
      knockoutFormat: "single_elimination",
      hasThirdPlaceMatch: true,
      isPublic: true,
      status: "draft", // Par défaut en brouillon
      prizeDistribution: { champion: "", vice_champion: "", troisieme: "", quatrieme: "" },
      individualPrizes: { meilleur_joueur_MVP: 0, soulier_d_or_buteur: 0, gants_d_or_gardien: 0, prix_fair_play: 0 },
      rules: {
        competition_format: { groups: 4, teams_per_group: 4, qualifiers_per_group: 2 },
        discipline: { yellow_card_fine: 1000, red_card_fine: 2500, suspension_rule: "2 jaunes = 1 match" },
        match_logistics: { duration: "90min", substitution_limit: 5, extra_time_final_only: true },
        tie_breaker: ["Points", "Diff. Buts", "Buts marqués"]
      }
    });
    setShowCreateModal(true);
  };

  const openEditModal = (league: ExtendedLeague) => {
    setSelectedLeague(league);
    setFormStep(1);
    setFormData({
      name: league.name,
      description: league.description || "",
      format: league.format,
      tier: league.tier,
      category: league.category,
      startDate: league.startDate.split('T')[0],
      endDate: league.endDate.split('T')[0],
      maxTeams: league.maxTeams,
      minTeams: league.minTeams || 8,
      registrationFee: league.registrationFee,
      totalPrizePool: league.totalPrizePool,
      firstPlacePrize: league.firstPlacePrize || 0,
      secondPlacePrize: league.secondPlacePrize || 0,
      thirdPlacePrize: league.thirdPlacePrize || 0,
      knockoutFormat: league.knockoutFormat || "single_elimination",
      hasThirdPlaceMatch: league.hasThirdPlaceMatch || false,
      isPublic: league.isPublic,
      status: league.status, // Ajout du statut existant
      prizeDistribution: league.prizeDistribution || { champion: "", vice_champion: "", troisieme: "", quatrieme: "" },
      individualPrizes: league.individualPrizes || { meilleur_joueur_MVP: 0, soulier_d_or_buteur: 0, gants_d_or_gardien: 0, prix_fair_play: 0 },
      rules: league.rules || {
        competition_format: { groups: 4, teams_per_group: 4, qualifiers_per_group: 2 },
        discipline: { yellow_card_fine: 1000, red_card_fine: 2500, suspension_rule: "" },
        match_logistics: { duration: "90min", substitution_limit: 5, extra_time_final_only: true },
        tie_breaker: ["Points", "Diff. Buts", "Buts marqués"]
      }
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (league: ExtendedLeague) => {
    setLeagueToDelete(league);
    setShowDeleteModal(true);
  };

  const openRulesModal = (league: ExtendedLeague) => {
    setSelectedLeague(league);
    setShowRulesModal(true);
  };

  const handleCreate = async () => {
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newLeague: ExtendedLeague = {
      id: `league-${Date.now()}`,
      ...formData,
      _count: { teams: 0, participations: 0 },
      region: {
        id: "region-new",
        name: "Nouvelle Région",
        country: { id: "country-sn", name: "Sénégal", code: "SN" }
      },
      sport: { id: "sport-foot", name: "Football" }
    };
    
    setLeagues(prev => [newLeague, ...prev]);
    setShowCreateModal(false);
    setActionLoading(false);
    
    setSuccessData({
      type: 'success',
      title: 'Ligue créée avec succès !',
      message: `${formData.name} est prête avec le statut "${STATUS_CONFIG[formData.status as LeagueStatus].label}".`,
      details: { 
        format: formData.format === 'tournament' ? 'Tournoi' : 'Championnat', 
        teams: formData.maxTeams,
        statut: STATUS_CONFIG[formData.status as LeagueStatus].label,
        visibilite: formData.isPublic ? "Publique" : "Privée"
      }
    });
    setShowSuccessModal(true);
  };

  const handleEdit = async () => {
    if (!selectedLeague) return;
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLeagues(prev => prev.map(l => l.id === selectedLeague.id ? { ...l, ...formData } : l));
    setShowEditModal(false);
    setActionLoading(false);
    
    setSuccessData({
      type: 'success',
      title: 'Modifications enregistrées !',
      message: `Les informations de ${formData.name} ont été mises à jour.`,
      details: { 
        modifications: "Toutes les données",
        nouveau_statut: STATUS_CONFIG[formData.status as LeagueStatus].label
      }
    });
    setShowSuccessModal(true);
  };

  const handleDelete = async () => {
    if (!leagueToDelete) return;
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setLeagues(prev => prev.filter(l => l.id !== leagueToDelete.id));
    setShowDeleteModal(false);
    setActionLoading(false);
    
    setSuccessData({
      type: 'error',
      title: 'Ligue supprimée',
      message: `${leagueToDelete.name} a été définitivement supprimée.`,
      details: { action: "Suppression irréversible" }
    });
    setShowSuccessModal(true);
    setLeagueToDelete(null);
  };

  const getStatusColor = (status: LeagueStatus) => COLORS[status] || COLORS.draft;
  
  const getStatusLabel = (status: LeagueStatus) => {
    return STATUS_CONFIG[status]?.label || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredLeagues = leagues.filter((league) => {
    const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || league.status === filterStatus;
    const matchesFormat = filterFormat === "all" || league.format === filterFormat;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  const stats = {
    total: leagues.length,
    active: leagues.filter(l => l.status === "in_progress").length,
    draft: leagues.filter(l => l.status === "draft").length,
    open: leagues.filter(l => l.status === "open_registration").length,
    totalPrize: leagues.reduce((sum, l) => sum + l.totalPrizePool, 0)
  };

  // Composant de formulaire réutilisable (création/édition) - 5 étapes
  const LeagueForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const nextStep = () => setFormStep(s => Math.min(s + 1, 5));
    const prevStep = () => setFormStep(s => Math.max(s - 1, 1));
    
    const updateFormData = (path: string, value: any) => {
      setFormData(prev => {
        const keys = path.split('.');
        if (keys.length === 1) return { ...prev, [path]: value };
        
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      });
    };

    return (
      <div className="space-y-6">
        {/* Indicateur d'étapes - 5 étapes maintenant */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                s === formStep ? 'bg-blue-600 text-white' : 
                s < formStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s < formStep ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 5 && <div className={`w-12 h-1 mx-1 ${s < formStep ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        
        <div className="text-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            Étape {formStep}/5 : {
              formStep === 1 ? 'Informations générales' :
              formStep === 2 ? 'Structure & Dates' :
              formStep === 3 ? 'Récompenses & Prix' :
              formStep === 4 ? 'Règlement & Règles' :
              'Statut & Visibilité'
            }
          </span>
        </div>

        {formStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4">
              <h4 className="font-bold text-blue-800 flex items-center gap-2">
                <Trophy className="w-5 h-5" /> Identité de la compétition
              </h4>
              <p className="text-sm text-blue-600 mt-1">Définissez le nom et la présentation de votre ligue</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la compétition *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Coupe des Vacances 2026"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Décrivez le format, l'ambiance, les objectifs..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select
                  value={formData.format}
                  onChange={(e) => updateFormData('format', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="tournament">Tournoi</option>
                  <option value="league">Championnat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                <select
                  value={formData.tier}
                  onChange={(e) => updateFormData('tier', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="local">Local</option>
                  <option value="regional">Régional</option>
                  <option value="national">National</option>
                  <option value="professional">Professionnel</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-4">
              <h4 className="font-bold text-amber-800 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Structure & Planning
              </h4>
              <p className="text-sm text-amber-600 mt-1">Dates et organisation du tournoi</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin *</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateFormData('endDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Équipes max</label>
                <input
                  type="number"
                  value={formData.maxTeams}
                  onChange={(e) => updateFormData('maxTeams', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Équipes min</label>
                <input
                  type="number"
                  value={formData.minTeams}
                  onChange={(e) => updateFormData('minTeams', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frais d'inscription (FCFA)</label>
              <input
                type="number"
                value={formData.registrationFee}
                onChange={(e) => updateFormData('registrationFee', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {formData.format === 'tournament' && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h5 className="font-medium text-gray-700 mb-3">Format du tournoi</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Type d'élimination</label>
                    <select
                      value={formData.knockoutFormat}
                      onChange={(e) => updateFormData('knockoutFormat', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="single_elimination">Élimination simple</option>
                      <option value="double_elimination">Double élimination</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.hasThirdPlaceMatch}
                      onChange={(e) => updateFormData('hasThirdPlaceMatch', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <label className="text-sm text-gray-700">Match pour la 3ème place</label>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-lg border">
                    <span className="text-xs text-gray-500">Poules</span>
                    <input
                      type="number"
                      value={formData.rules.competition_format.groups}
                      onChange={(e) => updateFormData('rules.competition_format.groups', parseInt(e.target.value))}
                      className="w-full text-center font-bold text-lg border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-lg border">
                    <span className="text-xs text-gray-500">Éq./poule</span>
                    <input
                      type="number"
                      value={formData.rules.competition_format.teams_per_group}
                      onChange={(e) => updateFormData('rules.competition_format.teams_per_group', parseInt(e.target.value))}
                      className="w-full text-center font-bold text-lg border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-lg border">
                    <span className="text-xs text-gray-500">Qualifiés</span>
                    <input
                      type="number"
                      value={formData.rules.competition_format.qualifiers_per_group}
                      onChange={(e) => updateFormData('rules.competition_format.qualifiers_per_group', parseInt(e.target.value))}
                      className="w-full text-center font-bold text-lg border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {formStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 mb-4">
              <h4 className="font-bold text-purple-800 flex items-center gap-2">
                <Award className="w-5 h-5" /> Récompenses & Prix
              </h4>
              <p className="text-sm text-purple-600 mt-1">Motivations financières et trophées</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
                <label className="block text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
                  <Crown className="w-4 h-4" /> Champion
                </label>
                <input
                  type="number"
                  value={formData.firstPlacePrize}
                  onChange={(e) => updateFormData('firstPlacePrize', parseInt(e.target.value))}
                  className="w-full p-2 border border-amber-300 rounded-lg font-bold text-amber-900"
                  placeholder="Prix en FCFA"
                />
                <input
                  type="text"
                  value={formData.prizeDistribution.champion}
                  onChange={(e) => updateFormData('prizeDistribution.champion', e.target.value)}
                  className="w-full mt-2 p-2 border border-amber-200 rounded-lg text-sm"
                  placeholder="Description (Trophée + ...)"
                />
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Medal className="w-4 h-4" /> Vice-champion
                </label>
                <input
                  type="number"
                  value={formData.secondPlacePrize}
                  onChange={(e) => updateFormData('secondPlacePrize', parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                  placeholder="Prix en FCFA"
                />
                <input
                  type="text"
                  value={formData.prizeDistribution.vice_champion}
                  onChange={(e) => updateFormData('prizeDistribution.vice_champion', e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Description"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                <label className="block text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" /> 3ème place
                </label>
                <input
                  type="number"
                  value={formData.thirdPlacePrize}
                  onChange={(e) => updateFormData('thirdPlacePrize', parseInt(e.target.value))}
                  className="w-full p-2 border border-orange-300 rounded-lg font-bold text-orange-900"
                />
                <input
                  type="text"
                  value={formData.prizeDistribution.troisieme}
                  onChange={(e) => updateFormData('prizeDistribution.troisieme', e.target.value)}
                  className="w-full mt-2 p-2 border border-orange-200 rounded-lg text-sm"
                  placeholder="Description"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">4ème place</label>
                <input
                  type="text"
                  value={formData.prizeDistribution.quatrieme}
                  onChange={(e) => updateFormData('prizeDistribution.quatrieme', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Récompense"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h5 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Prix individuels
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-blue-600 block mb-1">MVP (FCFA)</label>
                  <input
                    type="number"
                    value={formData.individualPrizes.meilleur_joueur_MVP}
                    onChange={(e) => updateFormData('individualPrizes.meilleur_joueur_MVP', parseInt(e.target.value))}
                    className="w-full p-2 border border-blue-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-blue-600 block mb-1">Meilleur buteur (FCFA)</label>
                  <input
                    type="number"
                    value={formData.individualPrizes.soulier_d_or_buteur}
                    onChange={(e) => updateFormData('individualPrizes.soulier_d_or_buteur', parseInt(e.target.value))}
                    className="w-full p-2 border border-blue-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-blue-600 block mb-1">Meilleur gardien (FCFA)</label>
                  <input
                    type="number"
                    value={formData.individualPrizes.gants_d_or_gardien}
                    onChange={(e) => updateFormData('individualPrizes.gants_d_or_gardien', parseInt(e.target.value))}
                    className="w-full p-2 border border-blue-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-blue-600 block mb-1">Fair-play (FCFA)</label>
                  <input
                    type="number"
                    value={formData.individualPrizes.prix_fair_play}
                    onChange={(e) => updateFormData('individualPrizes.prix_fair_play', parseInt(e.target.value))}
                    className="w-full p-2 border border-blue-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-800">Cagnotte totale estimée</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    (formData.firstPlacePrize || 0) + 
                    (formData.secondPlacePrize || 0) + 
                    (formData.thirdPlacePrize || 0) +
                    (formData.individualPrizes.meilleur_joueur_MVP || 0) +
                    (formData.individualPrizes.soulier_d_or_buteur || 0) +
                    (formData.individualPrizes.gants_d_or_gardien || 0) +
                    (formData.individualPrizes.prix_fair_play || 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {formStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 mb-4">
              <h4 className="font-bold text-red-800 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Règlement & Discipline
              </h4>
              <p className="text-sm text-red-600 mt-1">Règles du jeu et sanctions</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <h5 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Amendes cartons
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-amber-700 block mb-1">Carton jaune (FCFA)</label>
                    <input
                      type="number"
                      value={formData.rules.discipline.yellow_card_fine}
                      onChange={(e) => updateFormData('rules.discipline.yellow_card_fine', parseInt(e.target.value))}
                      className="w-full p-2 border border-amber-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-amber-700 block mb-1">Carton rouge (FCFA)</label>
                    <input
                      type="number"
                      value={formData.rules.discipline.red_card_fine}
                      onChange={(e) => updateFormData('rules.discipline.red_card_fine', parseInt(e.target.value))}
                      className="w-full p-2 border border-amber-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h5 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Logistique match
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-blue-700 block mb-1">Durée du match</label>
                    <select
                      value={formData.rules.match_logistics.duration}
                      onChange={(e) => updateFormData('rules.match_logistics.duration', e.target.value)}
                      className="w-full p-2 border border-blue-300 rounded-lg"
                    >
                      <option value="80min">80 minutes</option>
                      <option value="90min">90 minutes</option>
                      <option value="36min">36 minutes (Beach)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-blue-700 block mb-1">Remplacements max</label>
                    <input
                      type="number"
                      value={formData.rules.match_logistics.substitution_limit}
                      onChange={(e) => updateFormData('rules.match_logistics.substitution_limit', parseInt(e.target.value))}
                      className="w-full p-2 border border-blue-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Règle de suspension</label>
              <input
                type="text"
                value={formData.rules.discipline.suspension_rule}
                onChange={(e) => updateFormData('rules.discipline.suspension_rule', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder="Ex: 2 jaunes = 1 match, Rouge direct = 2 matchs"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Critères de départage
              </h5>
              <div className="flex flex-wrap gap-2">
                {formData.rules.tie_breaker.map((criteria: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium flex items-center gap-2">
                    {idx + 1}. {criteria}
                    <button 
                      onClick={() => {
                        const newTieBreaker = formData.rules.tie_breaker.filter((_: any, i: number) => i !== idx);
                        updateFormData('rules.tie_breaker', newTieBreaker);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  id="newCriteria"
                  placeholder="Ajouter un critère..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        updateFormData('rules.tie_breaker', [...formData.rules.tie_breaker, input.value.trim()]);
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 5 : STATUT ET VISIBILITÉ */}
        {formStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 mb-4">
              <h4 className="font-bold text-indigo-800 flex items-center gap-2">
                <Settings className="w-5 h-5" /> Statut & Visibilité
              </h4>
              <p className="text-sm text-indigo-600 mt-1">Définissez l'état actuel et la visibilité de votre compétition</p>
            </div>

            {/* Sélection du statut */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Statut de la compétition *</label>
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(STATUS_CONFIG) as LeagueStatus[]).map((status) => {
                  const config = STATUS_CONFIG[status];
                  const Icon = config.icon;
                  const isSelected = formData.status === status;
                  
                  return (
                    <button
                      key={status}
                      onClick={() => updateFormData('status', status)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? `${config.bgColor} ${config.borderColor} border-2 ring-2 ring-offset-2 ${config.color.replace('text-', 'ring-')}` 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/50' : 'bg-gray-100'}`}>
                          <Icon className={`w-5 h-5 ${isSelected ? config.color : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${isSelected ? config.color : 'text-gray-700'}`}>
                              {config.label}
                            </span>
                            {isSelected && <CheckCircle className="w-4 h-4 text-green-500" />}
                          </div>
                          <p className={`text-sm mt-1 ${isSelected ? config.color : 'text-gray-500'}`}>
                            {config.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visibilité publique/privée */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" /> Visibilité
              </h5>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateFormData('isPublic', true)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.isPublic 
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Globe className={`w-8 h-8 mx-auto mb-2 ${formData.isPublic ? 'text-blue-600' : 'text-gray-400'}`} />
                  <p className={`font-bold ${formData.isPublic ? 'text-blue-700' : 'text-gray-700'}`}>Publique</p>
                  <p className="text-xs text-gray-500 mt-1">Visible par tous les utilisateurs</p>
                  {formData.isPublic && <CheckCircle className="w-5 h-5 text-blue-500 mx-auto mt-2" />}
                </button>

                <button
                  onClick={() => updateFormData('isPublic', false)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    !formData.isPublic 
                      ? 'bg-gray-100 border-gray-600 ring-2 ring-gray-300' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <EyeOff className={`w-8 h-8 mx-auto mb-2 ${!formData.isPublic ? 'text-gray-700' : 'text-gray-400'}`} />
                  <p className={`font-bold ${!formData.isPublic ? 'text-gray-800' : 'text-gray-700'}`}>Privée</p>
                  <p className="text-xs text-gray-500 mt-1">Visible uniquement par vous</p>
                  {!formData.isPublic && <CheckCircle className="w-5 h-5 text-gray-600 mx-auto mt-2" />}
                </button>
              </div>
            </div>

            {/* Récapitulatif rapide */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 mt-4">
              <h5 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" /> Récapitulatif
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600">Statut:</span>
                  <span className="font-bold text-blue-900">{STATUS_CONFIG[formData.status as LeagueStatus].label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Visibilité:</span>
                  <span className="font-bold text-blue-900">{formData.isPublic ? "Publique" : "Privée"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Inscriptions:</span>
                  <span className={`font-bold ${formData.status === 'open_registration' ? 'text-green-600' : 'text-gray-600'}`}>
                    {formData.status === 'open_registration' ? "Ouvertes" : "Fermées"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation boutons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={formStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              formStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Précédent
          </button>
          
          {formStep < 5 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              Suivant <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={isEdit ? handleEdit : handleCreate}
              disabled={actionLoading}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all hover:scale-105 disabled:opacity-50"
            >
              {actionLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEdit ? 'Mettre à jour' : 'Créer la ligue'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes Ligues & Tournois</h1>
              <p className="text-gray-600 text-sm mt-1">Gérez vos compétitions et championnats</p>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Compétition
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">En cours</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Brouillons</p>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Ouvertes</p>
                <p className="text-2xl font-bold text-amber-600">{stats.open}</p>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Cagnotte</p>
                <p className="text-lg font-bold text-purple-600">{formatCurrency(stats.totalPrize)}</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une compétition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as LeagueStatus | "all")}
              className="md:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="draft">Brouillon</option>
              <option value="open_registration">Inscriptions ouvertes</option>
              <option value="registration_closed">Inscriptions fermées</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
            </select>
            <select
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value as "all" | "league" | "tournament")}
              className="md:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Tous les formats</option>
              <option value="tournament">Tournoi</option>
              <option value="league">Championnat</option>
            </select>
          </div>
        </div>

        {/* Liste */}
        {filteredLeagues.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune compétition trouvée</h3>
            <p className="text-gray-500 mb-6">Créez votre première ligue pour commencer</p>
            <button 
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Créer une compétition
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeagues.map((league) => (
              <div 
                key={league.id} 
                className={`bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  league.status === 'in_progress' ? 'border-blue-200 shadow-md' : 
                  league.status === 'open_registration' ? 'border-green-200' : 
                  league.status === 'draft' ? 'border-gray-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => openDetailModal(league)}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 transition-transform hover:scale-110 ${
                          league.format === 'tournament' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {league.format === 'tournament' ? <Swords className="w-7 h-7" /> : <Trophy className="w-7 h-7" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <button 
                            onClick={() => openDetailModal(league)}
                            className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors text-left"
                          >
                            {league.name}
                          </button>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(league.status)}`}>
                            {getStatusLabel(league.status)}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                            {league.format === 'tournament' ? 'Tournoi' : 'Championnat'}
                          </span>
                          {league.tier === 'professional' && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                              PRO
                            </span>
                          )}
                          {!league.isPublic && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-300 flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Privé
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{league.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {league.region?.name}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(league.startDate)}</span>
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {league._count?.teams || 0}/{league.maxTeams}</span>
                          <span className="flex items-center gap-1 font-medium text-green-600"><DollarSign className="w-4 h-4" /> {formatCurrency(league.totalPrizePool)}</span>
                        </div>

                        {/* Récompenses rapides */}
                        {league.prizeDistribution && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium border border-yellow-200 flex items-center gap-1">
                              <Crown className="w-3 h-3" /> {league.prizeDistribution.champion?.substring(0, 30)}...
                            </span>
                            {league.individualPrizes && (
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200 flex items-center gap-1">
                                <Star className="w-3 h-3" /> MVP: {formatCurrency(league.individualPrizes.meilleur_joueur_MVP)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openDetailModal(league)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir détails"
                      >
                        <Eye className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => openEditModal(league)}
                        className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5 text-gray-400 hover:text-amber-600" />
                      </button>
                      <button
                        onClick={() => openRulesModal(league)}
                        className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Règlement"
                      >
                        <Shield className="w-5 h-5 text-gray-400 hover:text-purple-600" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(league)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== MODAL DÉTAILS ==================== */}
      {showDetailModal && selectedLeague && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
            <div className={`p-6 ${selectedLeague.status === 'in_progress' ? 'bg-blue-500' : selectedLeague.status === 'open_registration' ? 'bg-green-500' : 'bg-gray-600'} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    {selectedLeague.format === 'tournament' ? <Swords className="w-8 h-8" /> : <Trophy className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedLeague.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium">
                        {getStatusLabel(selectedLeague.status)}
                      </span>
                      <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium">
                        {selectedLeague.tier?.toUpperCase()}
                      </span>
                      {!selectedLeague.isPublic && (
                        <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> PRIVÉ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Description */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <p className="text-gray-700">{selectedLeague.description || "Aucune description"}</p>
              </div>
              
              {/* Grid info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-1">Période</p>
                  <p className="font-bold text-gray-900">{formatDate(selectedLeague.startDate)} - {formatDate(selectedLeague.endDate)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-xs text-green-600 font-bold uppercase mb-1">Participation</p>
                  <p className="font-bold text-gray-900">{selectedLeague._count?.teams} / {selectedLeague.maxTeams} équipes</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="text-xs text-amber-600 font-bold uppercase mb-1">Frais d'inscription</p>
                  <p className="font-bold text-gray-900">{formatCurrency(selectedLeague.registrationFee)}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-xs text-purple-600 font-bold uppercase mb-1">Cagnotte totale</p>
                  <p className="font-bold text-purple-900 text-xl">{formatCurrency(selectedLeague.totalPrizePool)}</p>
                </div>
              </div>
              
              {/* Récompenses */}
              {selectedLeague.prizeDistribution && (
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" /> Récompenses
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <Crown className="w-8 h-8 text-yellow-600" />
                      <div className="flex-1">
                        <p className="font-bold text-yellow-900">Champion</p>
                        <p className="text-sm text-yellow-700">{selectedLeague.prizeDistribution.champion}</p>
                      </div>
                      <span className="font-bold text-yellow-800">{formatCurrency(selectedLeague.firstPlacePrize || 0)}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <Medal className="w-8 h-8 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">Vice-champion</p>
                        <p className="text-sm text-gray-600">{selectedLeague.prizeDistribution.vice_champion}</p>
                      </div>
                      <span className="font-bold text-gray-700">{formatCurrency(selectedLeague.secondPlacePrize || 0)}</span>
                    </div>
                    {selectedLeague.prizeDistribution.troisieme && (
                      <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-xl">
                        <Star className="w-8 h-8 text-orange-600" />
                        <div className="flex-1">
                          <p className="font-bold text-orange-900">3ème place</p>
                          <p className="text-sm text-orange-700">{selectedLeague.prizeDistribution.troisieme}</p>
                        </div>
                        <span className="font-bold text-orange-800">{formatCurrency(selectedLeague.thirdPlacePrize || 0)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Prix individuels */}
              {selectedLeague.individualPrizes && (
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-500" /> Trophées individuels
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedLeague.individualPrizes).map(([key, value]) => (
                      <div key={key} className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex justify-between items-center">
                        <span className="text-sm text-blue-800 font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="font-bold text-blue-900">{formatCurrency(value as number)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Stats si disponibles */}
              {selectedLeague.stats && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Statistiques
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-indigo-700">{selectedLeague.stats.totalMatches}</p>
                      <p className="text-xs text-indigo-600">Matchs total</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-indigo-700">{selectedLeague.stats.completedMatches}</p>
                      <p className="text-xs text-indigo-600">Matchs joués</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-indigo-700">{selectedLeague.stats.averageGoals}</p>
                      <p className="text-xs text-indigo-600">Buts/match</p>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL CRÉATION ==================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !actionLoading && setShowCreateModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
            <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-6 h-6" /> Créer une nouvelle compétition
              </h3>
              {!actionLoading && (
                <button onClick={() => setShowCreateModal(false)} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            <div className="p-6">
              <LeagueForm />
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL ÉDITION ==================== */}
      {showEditModal && selectedLeague && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !actionLoading && setShowEditModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
            <div className="bg-amber-500 p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Edit className="w-6 h-6" /> Modifier {selectedLeague.name}
              </h3>
              {!actionLoading && (
                <button onClick={() => setShowEditModal(false)} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            <div className="p-6">
              <LeagueForm isEdit={true} />
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL SUPPRESSION ==================== */}
      {showDeleteModal && leagueToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !actionLoading && setShowDeleteModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-modal-in">
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-2">
                Vous êtes sur le point de supprimer <span className="font-bold text-gray-900">"{leagueToDelete.name}"</span>
              </p>
              <p className="text-sm text-red-600 mb-6">Cette action est irréversible et toutes les données seront perdues.</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    'Supprimer définitivement'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL RÈGLEMENT ==================== */}
      {showRulesModal && selectedLeague && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRulesModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-modal-in">
            <div className="bg-purple-600 p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shield className="w-6 h-6" /> Règlement - {selectedLeague.name}
              </h3>
              <button onClick={() => setShowRulesModal(false)} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedLeague.rules ? (
                <>
                  {/* Format */}
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" /> Format de la compétition
                    </h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <p className="text-2xl font-bold text-blue-700">{selectedLeague.rules.competition_format?.groups}</p>
                        <p className="text-xs text-blue-600">Poules</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <p className="text-2xl font-bold text-blue-700">{selectedLeague.rules.competition_format?.teams_per_group}</p>
                        <p className="text-xs text-blue-600">Éq./poule</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <p className="text-2xl font-bold text-blue-700">{selectedLeague.rules.competition_format?.qualifiers_per_group}</p>
                        <p className="text-xs text-blue-600">Qualifiés</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Discipline */}
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                      <Ban className="w-5 h-5" /> Discipline
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-red-100">
                        <span className="text-red-700">Carton jaune</span>
                        <span className="font-bold text-red-900">{formatCurrency(selectedLeague.rules.discipline?.yellow_card_fine || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-red-100">
                        <span className="text-red-700">Carton rouge</span>
                        <span className="font-bold text-red-900">{formatCurrency(selectedLeague.rules.discipline?.red_card_fine || 0)}</span>
                      </div>
                      <p className="text-sm text-red-700 bg-white p-2 rounded-lg border border-red-100">
                        <span className="font-semibold">Règle:</span> {selectedLeague.rules.discipline?.suspension_rule}
                      </p>
                    </div>
                  </div>
                  
                  {/* Logistique */}
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" /> Déroulement des matchs
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-green-100 text-center">
                        <p className="text-lg font-bold text-green-700">{selectedLeague.rules.match_logistics?.duration}</p>
                        <p className="text-xs text-green-600">Durée</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-100 text-center">
                        <p className="text-lg font-bold text-green-700">{selectedLeague.rules.match_logistics?.substitution_limit}</p>
                        <p className="text-xs text-green-600">Remplacements</p>
                      </div>
                    </div>
                    {selectedLeague.rules.match_logistics?.extra_time_final_only && (
                      <p className="mt-2 text-sm text-green-700 bg-white p-2 rounded-lg border border-green-100">
                        ⚠️ Prolongations uniquement en finale
                      </p>
                    )}
                  </div>
                  
                  {/* Tie breaker */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> Critères de départage
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLeague.rules.tie_breaker?.map((criteria, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium">
                          {idx + 1}. {criteria}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun règlement détaillé défini pour cette compétition.</p>
                </div>
              )}
              
              <button
                onClick={() => setShowRulesModal(false)}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL SUCCÈS HYPER VISIBLE ==================== */}
      {showSuccessModal && successData && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-success-bounce">
            <div className={`${successData.type === 'success' ? 'bg-green-500' : 'bg-red-500'} p-8 text-center`}>
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-icon-bounce">
                {successData.type === 'success' ? (
                  <CheckCircle className="w-12 h-12 text-green-500" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white">{successData.title}</h3>
            </div>
            
            <div className="p-8 text-center">
              <p className="text-gray-700 text-lg mb-6 font-medium">{successData.message}</p>
              
              {successData.details && (
                <div className={`${successData.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-2 rounded-xl p-4 mb-6 text-left`}>
                  {Object.entries(successData.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-semibold text-gray-900">{value as string}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg ${successData.type === 'success' ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-200' : 'bg-red-500 hover:bg-red-600 text-white shadow-red-200'}`}
              >
                {successData.type === 'success' ? 'Parfait !' : 'Compris'}
              </button>
            </div>
            
            <div className={`h-1.5 ${successData.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-progress-bar`}></div>
          </div>
        </div>
      )}

      {/* Styles pour animations */}
      <style jsx global>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes success-bounce {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes icon-bounce {
          0% { transform: scale(0) rotate(-45deg); }
          50% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes progress-bar {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-modal-in { animation: modal-in 0.3s ease-out forwards; }
        .animate-success-bounce { animation: success-bounce 0.5s ease-out forwards; }
        .animate-icon-bounce { animation: icon-bounce 0.5s ease-out forwards; }
        .animate-progress-bar { animation: progress-bar 4s linear forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}