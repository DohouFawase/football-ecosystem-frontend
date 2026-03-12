"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy, Users, Calendar, DollarSign, Edit, Trash2, Eye, 
  FileText, Award, ChevronRight, Plus, Filter, Search, MapPin, 
  Info, AlertTriangle, ChevronLeft, Save, AlertCircle, 
  TrendingUp, Activity, Zap, Crown, Target, Timer, Sparkles,
  Globe, Dumbbell
} from "lucide-react";
import { League, LeagueStatus } from "@/types/LeagueTypes";
import { Modal } from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tournamentSchema,
  TournamentFormValues,
} from "@/validations/shampionship/shampionship";
import { fetchChampionships } from "@/actions/championships/registeChampionship";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

// Types pour les données API
interface Region {
  id: string;
  name: string;
  country: {
    id: string;
    name: string;
    code: string;
  };
  countryId: string;
  description?: string;
}

interface Sport {
  id: string;
  name: string;
}

const Page = () => {
  // === RÉCUPÉRATION DIRECTE DES DONNÉES REDUX ===
  const dispatch = useDispatch<AppDispatch>();
  const shamp = useSelector((state: RootState) => state.shamp.items);
  const shampLoading = useSelector((state: RootState) => state.shamp.loading);
  
  // === ÉTATS POUR LES DONNÉES FILTRÉES ===
  const [regions, setRegions] = useState<Region[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [apiLoading, setApiLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeagueStatus | "all">("all");
  const [filterFormat, setFilterFormat] = useState<"all" | "league" | "tournament">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leagueToDelete, setLeagueToDelete] = useState<League | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // === CHARGEMENT INITIAL DES DONNÉES ===
  useEffect(() => {
    dispatch(fetchChampionships());
  }, [dispatch]);

  // Extraction des régions et sports uniques quand shamp change
  useEffect(() => {
    if (shamp && shamp.length > 0) {
      // Extraire les régions uniques
      const uniqueRegions = shamp.reduce((acc: Region[], item: any) => {
        if (item.region && !acc.find(r => r.id === item.region.id)) {
          acc.push(item.region);
        }
        return acc;
      }, []);
      
      // Extraire les sports uniques
      const uniqueSports = shamp.reduce((acc: Sport[], item: any) => {
        if (item.sport && !acc.find(s => s.id === item.sport.id)) {
          acc.push(item.sport);
        }
        return acc;
      }, []);

      setRegions(uniqueRegions);
      setSports(uniqueSports);
      setApiLoading(false);
      
      console.log("=== RÉGIONS EXTRAITES ===", uniqueRegions);
      console.log("=== SPORTS EXTRAITS ===", uniqueSports);
      console.log("=== CHAMPIONNATS CHARGÉS ===", shamp.length, "items");
    }
  }, [shamp]);

  const {
    register, handleSubmit, watch, setValue, formState: { errors, isValid }, reset,
  } = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: "Coupe des Vacances Calavi 2026",
      description: "",
      format: "tournament",
      tier: "regional",
      category: "AMATEUR" as const,
      sportId: "",
      regionId: "",
      startDate: "",
      endDate: "",
      maxTeams: 16,
      minTeams: 16,
      registrationFee: 30000,
      totalPrizePool: 750000,
      firstPlacePrize: 500000,
      secondPlacePrize: 300000,
      thirdPlacePrize: 150000,
      prizeDistribution: { champion: "", vice_champion: "" },
      individualPrizes: { meilleur_joueur_MVP: 0, soulier_d_or_buteur: 0 },
      rules: {
        discipline: { yellow_card_fine: 1000, red_card_fine: 2500 },
        match_logistics: { duration: "90min", substitution_limit: 5 },
      },
      knockoutFormat: "single_elimination",
      hasThirdPlaceMatch: true,
      isPublic: true,
    },
  });

  const selectedRegion = watch("regionId");
  const selectedSport = watch("sportId");

  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 1: return !errors.name && !errors.regionId && !errors.sportId;
      case 2: return !errors.startDate && !errors.endDate;
      case 3: return !errors.individualPrizes && !errors.prizeDistribution?.champion && !errors.prizeDistribution?.vice_champion;
      case 4: return !errors.rules;
      default: return isValid;
    }
  };

  const nextStep = () => { if (isStepValid(step)) setStep((s) => s + 1); };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: TournamentFormValues) => {
    console.log("✅ Données envoyées au backend:", data);
    setIsCreateModalOpen(false);
    reset();
    setStep(1);
  };

  const handleDeleteClick = (league: League) => {
    setLeagueToDelete(league);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!leagueToDelete) return;
    try {
      setIsDeleting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Appel API réel pour suppression
      setIsDeleteModalOpen(false);
      setLeagueToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewDetails = (league: League) => {
    setSelectedLeague(league);
    setIsModalOpen(true);
  };

  const getStatusConfig = (status: LeagueStatus) => {
    const configs = {
      draft: { color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", light: "bg-slate-50", icon: Info, pulse: false },
      open_registration: { color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-200", light: "bg-emerald-50", icon: Zap, pulse: true },
      registration_closed: { color: "text-amber-700", bg: "bg-amber-100", border: "border-amber-200", light: "bg-amber-50", icon: Timer, pulse: false },
      in_progress: { color: "text-blue-700", bg: "bg-blue-100", border: "border-blue-200", light: "bg-blue-50", icon: Activity, pulse: true },
      completed: { color: "text-violet-700", bg: "bg-violet-100", border: "border-violet-200", light: "bg-violet-50", icon: Crown, pulse: false },
      cancelled: { color: "text-rose-700", bg: "bg-rose-100", border: "border-rose-200", light: "bg-rose-50", icon: AlertCircle, pulse: false },
    };
    return configs[status] || configs.draft;
  };

  const getStatusLabel = (status: LeagueStatus) => {
    const labels = {
      draft: "Brouillon",
      open_registration: "Inscriptions ouvertes",
      registration_closed: "Inscriptions fermées",
      in_progress: "En cours",
      completed: "Terminé",
      cancelled: "Annulé",
    };
    return labels[status] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency", currency: "XOF", minimumFractionDigits: 0,
    }).format(amount);
  };

  // === UTILISATION DIRECTE DE SHAMP POUR LA LISTE ===
  const filteredLeagues = shamp.filter((league: any) => {
    const matchesSearch = league.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || league.status === filterStatus;
    const matchesFormat = filterFormat === "all" || league.format === filterFormat;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  // === STATS CALCULÉES SUR SHAMP ===
  const totalPrizePool = shamp.reduce((sum: number, l: any) => sum + (l.totalPrizePool || 0), 0);
  const activeLeagues = shamp.filter((l: any) => l.status === "in_progress").length;
  const openRegistrations = shamp.filter((l: any) => l.status === "open_registration").length;

  // Grouper les régions par pays pour l'affichage
  const regionsByCountry = regions.reduce((acc: { [key: string]: Region[] }, region) => {
    const countryName = region.country?.name || "Autre";
    if (!acc[countryName]) acc[countryName] = [];
    acc[countryName].push(region);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Arena Pulse</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Command Center</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="group relative overflow-hidden rounded-xl bg-slate-900 px-6 py-2.5 font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:shadow-xl hover:shadow-indigo-200 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle Compétition
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Stats Cards - BASÉES SUR SHAMP */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[ 
            { label: "Ligues Actives", value: shamp.length, icon: Trophy, color: "from-violet-500 to-purple-600", bgColor: "bg-violet-50", textColor: "text-violet-700", borderColor: "border-violet-100" },
            { label: "En Cours", value: activeLeagues, icon: Activity, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-100", pulse: true },
            { label: "Inscriptions", value: openRegistrations, icon: Zap, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-50", textColor: "text-emerald-700", borderColor: "border-emerald-100" },
            { label: "Cagnotte Totale", value: formatCurrency(totalPrizePool), icon: DollarSign, color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-100", isCurrency: true },
          ].map((stat) => (
            <div key={stat.label} className={cn("relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 bg-white hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1", stat.borderColor)}>
              <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl", stat.color)} />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className={cn("mt-2 text-3xl font-bold tracking-tight text-slate-900", stat.isCurrency && "text-2xl", stat.pulse && activeLeagues > 0 && "text-blue-600")}>{stat.value}</p>
                </div>
                <div className={cn("rounded-xl p-3", stat.bgColor)}>
                  <stat.icon className={cn("w-5 h-5", stat.textColor)} />
                </div>
              </div>
              <div className="mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className={cn("h-full rounded-full bg-gradient-to-r w-2/3", stat.color)} />
              </div>
            </div>
          ))}
        </section>

        {/* Filtres */}
        <section className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
              <input
                type="text"
                placeholder="Rechercher une compétition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all"
              />
            </div>
            
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as LeagueStatus | "all")}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-700 focus:outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer hover:bg-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="draft">Brouillon</option>
                <option value="open_registration">Inscriptions ouvertes</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={filterFormat}
                onChange={(e) => setFilterFormat(e.target.value as "all" | "league" | "tournament")}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-700 focus:outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer hover:bg-white"
              >
                <option value="all">Tous formats</option>
                <option value="league">Championnat</option>
                <option value="tournament">Tournoi</option>
              </select>
              <Trophy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <Activity className="w-4 h-4" />
            <span>{filteredLeagues.length} compétition{filteredLeagues.length > 1 ? 's' : ''}</span>
          </div>
        </section>

        {/* === LISTE DES LIGUES - DIRECTEMENT DEPUIS SHAMP === */}
        {shampLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin" />
            </div>
            <p className="text-slate-400 animate-pulse">Chargement des compétitions...</p>
          </div>
        ) : filteredLeagues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
              <Trophy className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Aucune compétition trouvée</h3>
            <p className="text-slate-500 mb-8 max-w-md">Commencez par créer votre première ligue ou tournoi pour lancer votre saison</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-indigo-100 transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Créer une compétition
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredLeagues.map((league: any) => {
              const status = getStatusConfig(league.status);
              const StatusIcon = status.icon;
              const isHovered = hoveredCard === league.id;
              
              return (
                <div
                  key={league.id}
                  onMouseEnter={() => setHoveredCard(league.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={cn("group relative overflow-hidden rounded-2xl border transition-all duration-300 bg-white hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-0.5", isHovered ? "border-indigo-200" : "border-slate-100")}
                >
                  <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300", status.bg.replace('bg-', 'from-').replace('50', '400'), "to-transparent", isHovered && "opacity-100")} />
                  <div className="relative p-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={cn("relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300", status.light, isHovered && "scale-105")}>
                        <Trophy className={cn("w-7 h-7 transition-colors", status.color)} />
                        {status.pulse && <div className={cn("absolute inset-0 animate-pulse opacity-30", status.light)} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 truncate pr-4">{league.name}</h3>
                          <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all", status.bg, status.color, status.border, status.pulse && "animate-pulse")}>
                            <StatusIcon className="w-3 h-3" />
                            {getStatusLabel(league.status)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            {league.format === "league" ? "Championnat" : "Tournoi"}
                          </span>
                        </div>
                        {league.description && <p className="text-slate-500 text-sm mb-4 line-clamp-2 max-w-2xl">{league.description}</p>}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 rounded-lg bg-slate-50"><MapPin className="w-3.5 h-3.5 text-slate-400" /></div>
                            <span className="truncate">{league.region?.name}, {league.region?.country?.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 rounded-lg bg-slate-50"><Calendar className="w-3.5 h-3.5 text-slate-400" /></div>
                            <span>{formatDate(league.startDate)} - {formatDate(league.endDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 rounded-lg bg-slate-50"><Users className="w-3.5 h-3.5 text-slate-400" /></div>
                            <span>
                              <span className={cn("font-semibold", (league._count?.teams || 0) >= (league.maxTeams || 0) ? "text-emerald-600" : "text-slate-700")}>{league._count?.teams || 0}</span>
                              /{league.maxTeams || "∞"} équipes
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-50"><DollarSign className="w-3.5 h-3.5 text-amber-500" /></div>
                            <span className="font-bold text-amber-700">{formatCurrency(league.totalPrizePool || 0)}</span>
                          </div>
                        </div>
                        {league.totalPrizePool > 0 && (
                          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                            <div className="p-1.5 rounded-lg bg-amber-100"><Award className="w-4 h-4 text-amber-600" /></div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                              <span className="text-slate-700"><span className="text-amber-700 font-bold">1er</span> {formatCurrency(league.firstPlacePrize || 0)}</span>
                              <span className="text-slate-700"><span className="text-slate-500 font-bold">2ème</span> {formatCurrency(league.secondPlacePrize || 0)}</span>
                              <span className="text-slate-700"><span className="text-orange-600 font-bold">3ème</span> {formatCurrency(league.thirdPlacePrize || 0)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex lg:flex-col items-center lg:items-end gap-2 lg:min-w-[140px] lg:border-l lg:border-slate-100 lg:pl-6">
                      <div className="flex lg:flex-col gap-2">
                        <button onClick={() => handleViewDetails(league)} className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100" title="Voir détails"><Eye className="w-4 h-4" /></button>
                        <button className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-all border border-transparent hover:border-amber-100" title="Modifier"><Edit className="w-4 h-4" /></button>
                        <button className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100" title="Rapports"><FileText className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteClick(league)} className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100" title="Supprimer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <button className="hidden lg:flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors mt-2 font-medium">Détails <ChevronRight className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>


      {/* === MODAL DÉTAILS - NOUVEAU DESIGN === */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="" 
        size="lg"
      >
        {selectedLeague && (
          <div className="space-y-6">
            
            {/* HEADER COMPACT */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shrink-0">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-slate-900 truncate">{selectedLeague.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", getStatusConfig(selectedLeague.status).bg, getStatusConfig(selectedLeague.status).color, getStatusConfig(selectedLeague.status).border)}>
                    {getStatusLabel(selectedLeague.status)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {selectedLeague.format === "league" ? "Championnat" : "Tournoi"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {selectedLeague.category}
                  </span>
                </div>
              </div>
            </div>

            {/* INFOS RAPIDES - Ligne unique */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{formatDate(selectedLeague.startDate)} - {formatDate(selectedLeague.endDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{selectedLeague.region?.name}, {selectedLeague.region?.country?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{selectedLeague._count?.teams || 0}/{selectedLeague.maxTeams} équipes</span>
              </div>
            </div>

            {/* PRIX - Section compacte */}
            {selectedLeague.totalPrizePool > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-slate-800">Récompenses</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">Total: {formatCurrency(selectedLeague.totalPrizePool)}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-600">1</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500">1ère</p>
                    <p className="font-bold text-slate-800 text-sm">{formatCurrency(selectedLeague.firstPlacePrize || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-600">2</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500">2ème</p>
                    <p className="font-bold text-slate-800 text-sm">{formatCurrency(selectedLeague.secondPlacePrize || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-600">3</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500">3ème</p>
                    <p className="font-bold text-slate-800 text-sm">{formatCurrency(selectedLeague.thirdPlacePrize || 0)}</p>
                  </div>
                </div>

                {/* Prix individuels tags */}
                {selectedLeague.individualPrizes && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200">
                    {selectedLeague.individualPrizes.meilleur_joueur_MVP > 0 && (
                      <span className="px-2 py-1 bg-white rounded-md text-xs text-slate-600 border border-slate-200">MVP: {formatCurrency(selectedLeague.individualPrizes.meilleur_joueur_MVP)}</span>
                    )}
                    {selectedLeague.individualPrizes.soulier_d_or_buteur > 0 && (
                      <span className="px-2 py-1 bg-white rounded-md text-xs text-slate-600 border border-slate-200">Buteur: {formatCurrency(selectedLeague.individualPrizes.soulier_d_or_buteur)}</span>
                    )}
                    {selectedLeague.individualPrizes.gants_d_or_gardien > 0 && (
                      <span className="px-2 py-1 bg-white rounded-md text-xs text-slate-600 border border-slate-200">Gardien: {formatCurrency(selectedLeague.individualPrizes.gants_d_or_gardien)}</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* RÈGLES - Accordéon simple */}
            {selectedLeague.rules && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-400" /> Règlement
                </h4>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {selectedLeague.rules.discipline && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Amendes</p>
                      <p className="text-slate-700">Jaune: {formatCurrency(selectedLeague.rules.discipline.yellow_card_fine || 0)}</p>
                      <p className="text-slate-700">Rouge: {formatCurrency(selectedLeague.rules.discipline.red_card_fine || 0)}</p>
                    </div>
                  )}
                  
                  {selectedLeague.rules.match_logistics && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Match</p>
                      <p className="text-slate-700">{selectedLeague.rules.match_logistics.duration}</p>
                      <p className="text-slate-700">{selectedLeague.rules.match_logistics.substitution_limit} remplacements</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DESCRIPTION */}
            {selectedLeague.description && (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Description</p>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedLeague.description}</p>
              </div>
            )}

            {/* FOOTER */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-400">
                ID: {selectedLeague.id.substring(0, 8)}... • {selectedLeague.isPublic ? "Public" : "Privé"}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">Fermer</button>
                <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Modifier
                </button>
              </div>
            </div>

          </div>
        )}
      </Modal>

      {/* Modal Suppression */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => !isDeleting && setIsDeleteModalOpen(false)} title="Confirmer la suppression" size="md">
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100">
            <AlertTriangle className="w-10 h-10 text-rose-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Supprimer cette compétition ?</h3>
          <p className="text-slate-500 max-w-sm">Vous êtes sur le point de supprimer <span className="text-slate-900 font-semibold">"{leagueToDelete?.name}"</span>. Cette action est irréversible.</p>
        </div>
        <div className="flex gap-3 justify-end pt-6 border-t border-slate-100">
          <button onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting} className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50">Annuler</button>
          <button onClick={confirmDelete} disabled={isDeleting} className="px-6 py-2.5 bg-rose-600 text-white font-medium rounded-xl hover:bg-rose-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-rose-200">
            {isDeleting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Suppression...</> : <><Trash2 className="w-4 h-4" /> Supprimer définitivement</>}
          </button>
        </div>
      </Modal>

      {/* Modal Création avec données API */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => { setIsCreateModalOpen(false); setStep(1); reset(); }}
        title={`Nouvelle Compétition - Étape ${step}/4`}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} id="create-form" className="space-y-6">
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className={cn("h-full transition-all duration-500 rounded-full", s <= step ? "bg-slate-900" : "bg-transparent", s === step && "bg-indigo-600")} />
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="p-2 bg-white rounded-lg shadow-sm"><Trophy className="w-5 h-5 text-indigo-600" /></div>
                <div>
                  <p className="font-semibold text-indigo-900">Identité de la compétition</p>
                  <p className="text-sm text-indigo-600">Informations principales</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nom de la compétition *</label>
                  <input {...register("name")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all", errors.name ? "border-rose-300 bg-rose-50" : "border-slate-200")} placeholder="Ex: Coupe des Vacances Calavi 2026" />
                  {errors.name && <p className="text-rose-600 text-sm mt-2">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400" /> Région *</label>
                  <div className="relative">
                    {apiLoading ? (
                      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-400 flex items-center gap-2"><div className="w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" /> Chargement des régions...</div>
                    ) : (
                      <select {...register("regionId")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all appearance-none cursor-pointer", errors.regionId ? "border-rose-300 bg-rose-50" : "border-slate-200", !selectedRegion && "text-slate-400")}>
                        <option value="">Sélectionner une région...</option>
                        {Object.entries(regionsByCountry).map(([country, countryRegions]) => (
                          <optgroup key={country} label={country}>
                            {countryRegions.map((region) => (
                              <option key={region.id} value={region.id}>{region.name} {region.description && `- ${region.description.substring(0, 30)}...`}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    )}
                    {!apiLoading && <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />}
                  </div>
                  {errors.regionId && <p className="text-rose-600 text-sm mt-2">{errors.regionId.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"><Dumbbell className="w-4 h-4 text-slate-400" /> Type de sport *</label>
                  <div className="relative">
                    {apiLoading ? (
                      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-400 flex items-center gap-2"><div className="w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" /> Chargement des sports...</div>
                    ) : (
                      <select {...register("sportId")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all appearance-none cursor-pointer", errors.sportId ? "border-rose-300 bg-rose-50" : "border-slate-200", !selectedSport && "text-slate-400")}>
                        <option value="">Sélectionner un sport...</option>
                        {sports.map((sport) => (<option key={sport.id} value={sport.id}>{sport.name}</option>))}
                      </select>
                    )}
                    {!apiLoading && <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />}
                  </div>
                  {errors.sportId && <p className="text-rose-600 text-sm mt-2">{errors.sportId.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea {...register("description")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all h-24 resize-none", errors.description ? "border-rose-300 bg-rose-50" : "border-slate-200")} placeholder="Décrivez votre compétition..." />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="p-2 bg-white rounded-lg shadow-sm"><Calendar className="w-5 h-5 text-emerald-600" /></div>
                <div>
                  <p className="font-semibold text-emerald-900">Planning & Capacité</p>
                  <p className="text-sm text-emerald-600">Dates et nombre d'équipes</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date de début *</label>
                  <input type="date" {...register("startDate")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all", errors.startDate ? "border-rose-300 bg-rose-50" : "border-slate-200")} />
                  {errors.startDate && <p className="text-rose-600 text-sm mt-2">{errors.startDate.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date de fin *</label>
                  <input type="date" {...register("endDate")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all", errors.endDate ? "border-rose-300 bg-rose-50" : "border-slate-200")} />
                  {errors.endDate && <p className="text-rose-600 text-sm mt-2">{errors.endDate.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre max d'équipes</label>
                  <input type="number" {...register("maxTeams", { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all" min={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Frais d'inscription (FCFA)</label>
                  <div className="relative">
                    <input type="number" {...register("registrationFee", { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all" min={0} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
                <div className="p-2 bg-white rounded-lg shadow-sm"><Award className="w-5 h-5 text-amber-600" /></div>
                <div>
                  <p className="font-semibold text-amber-900">Récompenses & Prix</p>
                  <p className="text-sm text-amber-600">Distribution des gains</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2"><Target className="w-3 h-3" /> MVP (FCFA)</label>
                  <input type="number" {...register("individualPrizes.meilleur_joueur_MVP", { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" placeholder="50000" />
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2"><Target className="w-3 h-3" /> Soulier d'Or (FCFA)</label>
                  <input type="number" {...register("individualPrizes.soulier_d_or_buteur", { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" placeholder="50000" />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2"><Crown className="w-4 h-4 text-amber-600" /> Distribution des prix</h4>
                <input {...register("prizeDistribution.champion")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all", errors.prizeDistribution?.champion ? "border-rose-300" : "border-slate-200")} placeholder="Champion: Trophée + 500.000 FCFA" />
                <input {...register("prizeDistribution.vice_champion")} className={cn("w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all", errors.prizeDistribution?.vice_champion ? "border-rose-300" : "border-slate-200")} placeholder="Vice-champion: 300.000 FCFA" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
                <div className="p-2 bg-white rounded-lg shadow-sm"><Info className="w-5 h-5 text-violet-600" /></div>
                <div>
                  <p className="font-semibold text-violet-900">Règlement & Discipline</p>
                  <p className="text-sm text-violet-600">Configuration des matchs</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-semibold flex items-center gap-2 text-rose-600"><AlertCircle className="w-4 h-4" /> Amendes Cartons</label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 mb-1 block">Jaune (FCFA)</label>
                      <input type="number" {...register("rules.discipline.yellow_card_fine", { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100" placeholder="1000" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 mb-1 block">Rouge (FCFA)</label>
                      <input type="number" {...register("rules.discipline.red_card_fine", { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100" placeholder="2500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-semibold flex items-center gap-2 text-blue-600"><Users className="w-4 h-4" /> Logistique</label>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Remplacements max</label>
                    <input type="number" {...register("rules.match_logistics.substitution_limit", { valueAsNumber: true })} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" placeholder="5" min={0} max={11} />
                  </div>
                </div>
              </div>
              <div className="p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">Critères de départage</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Face-à-face", "Différence de buts", "Buts marqués", "Fair-play"].map((criteria) => (<span key={criteria} className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-slate-600 border border-slate-200 shadow-sm">{criteria}</span>))}
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-6">
          <button type="button" onClick={prevStep} disabled={step === 1} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 disabled:opacity-0 hover:bg-slate-100 rounded-lg transition-all"><ChevronLeft className="w-4 h-4" /> Précédent</button>
          {step < 4 ? (
            <button type="button" onClick={nextStep} disabled={!isStepValid(step)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl">Suivant <ChevronRight className="w-4 h-4" /></button>
          ) : (
            <button type="submit" form="create-form" disabled={!isValid} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl"><Save className="w-4 h-4" /> Publier la Compétition</button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Page;