/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Activity,
  Zap,
  Crown,
  Target,
  Timer,
  Globe,
  Dumbbell,
} from "lucide-react";
import { League, LeagueStatus } from "@/types/LeagueTypes";
import { Modal } from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tournamentSchema,
  TournamentFormValues,
} from "@/validations/shampionship/shampionship";
import {
  CreateChampionship,
  fetchChampionships,
  UpdateChampionship,
} from "@/actions/championships/registeChampionship";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface Region {
  id: string;
  name: string;
  country: { id: string; name: string; code: string };
  countryId: string;
  description?: string;
}

interface Sport {
  id: string;
  name: string;
}

// Champs à valider par step
const FIELDS_BY_STEP: Record<number, (keyof TournamentFormValues)[]> = {
  1: ["name", "regionId", "sportId", "format", "category", "tier"],
  2: ["startDate", "endDate", "maxTeams", "minTeams", "registrationFee"],
  3: [
    "totalPrizePool",
    "firstPlacePrize",
    "secondPlacePrize",
    "thirdPlacePrize",
    "prizeDistribution",
    "individualPrizes",
  ],
  4: ["rules", "knockoutFormat"],
};

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shamp = useSelector((state: RootState) => state.shamp.items);
  console.log("=== DEBUG SHAMP PAGE ===");
  console.log("shamp (raw from store):", shamp);
  const shampLoading = useSelector((state: RootState) => state.shamp.loading);

  const [regions, setRegions] = useState<Region[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeagueStatus | "all">("all");
  const [filterFormat, setFilterFormat] = useState<
    "all" | "league" | "tournament"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leagueToDelete, setLeagueToDelete] = useState<League | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // ── ÉTAT MODAL ÉDITION ──────────────────────────────────────────────────────
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLeague, setEditingLeague] = useState<League | null>(null);
  const [editStep, setEditStep] = useState(1);

  useEffect(() => {
    dispatch(fetchChampionships());
  }, [dispatch]);

  useEffect(() => {
    if (shamp && shamp.length > 0) {
      const uniqueRegions = shamp.reduce((acc: Region[], item: any) => {
        if (item.region && !acc.find((r) => r.id === item.region.id))
          acc.push(item.region);
        console.log("=== DEBUG REDUCE REGION ===");
        console.log("Current item region:", item.region);
        return acc;
      }, []);
      const uniqueSports = shamp.reduce((acc: Sport[], item: any) => {
        if (item.sport && !acc.find((s) => s.id === item.sport.id))

          acc.push(item.sport);
        console.log("=== DEBUG REDUCE SPORT ===");
        console.log("Current item sport:", item.sport);
        return acc;
      }, []);
      setRegions(uniqueRegions);
      setSports(uniqueSports);
      setApiLoading(false);
    }
  }, [shamp]);

  // ── FORM CRÉATION ───────────────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      format: "tournament",
      tier: "regional",
      category: "AMATEUR",
      sportId: "",
      regionId: "",
      startDate: "",
      endDate: "",
      maxTeams: 16,
      minTeams: 4,
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

  // ── FORM ÉDITION ────────────────────────────────────────────────────────────
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    trigger: triggerEdit,
    formState: { errors: errorsEdit, isSubmitting: isSubmittingEdit },
    reset: resetEdit,
  } = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema),
    mode: "onChange",
  });

  const nextStep = async () => {
    const fields = FIELDS_BY_STEP[step];
    const valid = await trigger(fields as any);
    if (valid) setStep((s) => Math.min(s + 1, 4));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const nextEditStep = async () => {
    const fields = FIELDS_BY_STEP[editStep];
    const valid = await triggerEdit(fields as any);
    if (valid) setEditStep((s) => Math.min(s + 1, 4));
  };
  const prevEditStep = () => setEditStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: TournamentFormValues) => {
    console.log("✅ Données envoyées au backend:", data);
    await dispatch(CreateChampionship(data)).unwrap();
    setIsCreateModalOpen(false);
    reset();
    setStep(1);
  };

  // ── HANDLER OUVERTURE ÉDITION ───────────────────────────────────────────────
  const handleEditClick = (league: League) => {
    setEditingLeague(league);
    setEditStep(1);
    // Pré-remplir le formulaire avec les données existantes
    resetEdit({
      name: league.name || "",
      description: (league as any).description || "",
      format: (league.format as any) || "tournament",
      tier: (league as any).tier || "regional",
      category: (league as any).category || "AMATEUR",
      sportId: (league as any).sport?.id || (league as any).sportId || "",
      regionId: league.region?.id || (league as any).regionId || "",
      startDate: league.startDate ? league.startDate.substring(0, 10) : "",
      endDate: league.endDate ? league.endDate.substring(0, 10) : "",
      maxTeams: league.maxTeams || 16,
      minTeams: (league as any).minTeams || 4,
      registrationFee: (league as any).registrationFee || 0,
      totalPrizePool: league.totalPrizePool || 0,
      firstPlacePrize: league.firstPlacePrize || 0,
      secondPlacePrize: league.secondPlacePrize || 0,
      thirdPlacePrize: league.thirdPlacePrize || 0,
      prizeDistribution: (league as any).prizeDistribution || {
        champion: "",
        vice_champion: "",
      },
      individualPrizes: (league as any).individualPrizes || {
        meilleur_joueur_MVP: 0,
        soulier_d_or_buteur: 0,
      },
      rules: league.rules || {
        discipline: { yellow_card_fine: 1000, red_card_fine: 2500 },
        match_logistics: { duration: "90min", substitution_limit: 5 },
      },
      knockoutFormat: (league as any).knockoutFormat || "single_elimination",
      hasThirdPlaceMatch: (league as any).hasThirdPlaceMatch ?? true,
      isPublic: (league as any).isPublic ?? true,
    });
    setIsEditModalOpen(true);
  };

  // ── SUBMIT ÉDITION ──────────────────────────────────────────────────────────
  const onSubmitEdit = async (data: TournamentFormValues) => {
    if (!editingLeague) return;
    console.log("✏️ Mise à jour envoyée:", { id: editingLeague.id, ...data });
    // Remplace par ton action Redux/API d'update, ex:
    await dispatch(
      UpdateChampionship({ id: editingLeague.id, ...data }),
    ).unwrap();
    // await new Promise((resolve) => setTimeout(resolve, 800)); // Simule l'appel API
    setIsEditModalOpen(false);
    setEditingLeague(null);
    setEditStep(1);
    resetEdit();
    dispatch(fetchChampionships()); // Recharge la liste
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
    const configs: Record<string, any> = {
      draft: {
        color: "text-slate-600",
        bg: "bg-slate-100",
        border: "border-slate-200",
        light: "bg-slate-50",
        icon: Info,
        pulse: false,
      },
      open_registration: {
        color: "text-emerald-700",
        bg: "bg-emerald-100",
        border: "border-emerald-200",
        light: "bg-emerald-50",
        icon: Zap,
        pulse: true,
      },
      registration_closed: {
        color: "text-amber-700",
        bg: "bg-amber-100",
        border: "border-amber-200",
        light: "bg-amber-50",
        icon: Timer,
        pulse: false,
      },
      in_progress: {
        color: "text-blue-700",
        bg: "bg-blue-100",
        border: "border-blue-200",
        light: "bg-blue-50",
        icon: Activity,
        pulse: true,
      },
      completed: {
        color: "text-violet-700",
        bg: "bg-violet-100",
        border: "border-violet-200",
        light: "bg-violet-50",
        icon: Crown,
        pulse: false,
      },
      cancelled: {
        color: "text-rose-700",
        bg: "bg-rose-100",
        border: "border-rose-200",
        light: "bg-rose-50",
        icon: AlertCircle,
        pulse: false,
      },
    };
    return configs[status] || configs.draft;
  };

  const getStatusLabel = (status: LeagueStatus) => {
    const labels: Record<string, string> = {
      draft: "Brouillon",
      open_registration: "Inscriptions ouvertes",
      registration_closed: "Inscriptions fermées",
      in_progress: "En cours",
      completed: "Terminé",
      cancelled: "Annulé",
    };
    return labels[status] || status;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);

  const filteredLeagues = shamp.filter((league: any) => {
    const matchesSearch =
      league.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || league.status === filterStatus;
    const matchesFormat = filterFormat === "all" || league.format === filterFormat;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  const totalPrizePool = shamp.reduce(
    (sum: number, l: any) => sum + (l.totalPrizePool || 0),
    0,
  );
  const activeLeagues = shamp.filter(
    (l: any) => l.status === "in_progress",
  ).length;
  const openRegistrations = shamp.filter(
    (l: any) => l.status === "open_registration",
  ).length;

  const regionsByCountry = regions.reduce(
    (acc: Record<string, Region[]>, region) => {
      const countryName = region.country?.name || "Autre";
      if (!acc[countryName]) acc[countryName] = [];
      acc[countryName].push(region);
      return acc;
    },
    {},
  );

  // ─── Composant champ d'erreur ───────────────────────────────────────────────
  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-rose-600 text-xs mt-1.5">{msg}</p> : null;

  // ─── Classe de base pour les inputs ────────────────────────────────────────
  const inputCls = (hasError?: boolean) =>
    cn(
      "w-full bg-white border rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400",
      "focus:outline-none focus:ring-4 transition-all text-sm",
      hasError
        ? "border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-rose-50"
        : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-50",
    );

  // ─── Contenu steps partagé (formulaire) — générique pour create & edit ─────
  // On passe register/errors dynamiquement
  const renderStep = (
    currentStep: number,
    reg: typeof register | typeof registerEdit,
    errs: typeof errors | typeof errorsEdit,
  ) => {
    const E = ({ msg }: { msg?: string }) =>
      msg ? <p className="text-rose-600 text-xs mt-1.5">{msg}</p> : null;

    if (currentStep === 1)
      return (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Trophy className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-indigo-900">
                Identité de la compétition
              </p>
              <p className="text-sm text-indigo-600">
                Informations principales
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nom de la compétition *
            </label>
            <input
              {...reg("name")}
              className={inputCls(!!(errs as any).name)}
              placeholder="Ex: Coupe des Vacances Calavi 2026"
            />
            <E msg={(errs as any).name?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Format *
              </label>
              <div className="relative">
                <select
                  {...reg("format")}
                  className={
                    inputCls(!!(errs as any).format) +
                    " appearance-none cursor-pointer"
                  }
                >
                  <option value="tournament">Tournoi</option>
                  <option value="league">Championnat</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
              </div>
              <E msg={(errs as any).format?.message} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Catégorie *
              </label>
              <div className="relative">
                <select
                  {...reg("category")}
                  className={
                    inputCls(!!(errs as any).category) +
                    " appearance-none cursor-pointer"
                  }
                >
                  <option value="AMATEUR">Amateur</option>
                  <option value="SEMI_PRO">Semi-Pro</option>
                  <option value="PRO">Pro</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
              </div>
              <E msg={(errs as any).category?.message} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Niveau *
            </label>
            <div className="relative">
              <select
                {...reg("tier")}
                className={
                  inputCls(!!(errs as any).tier) +
                  " appearance-none cursor-pointer"
                }
              >
                <option value="local">Local</option>
                <option value="regional">Régional</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
            </div>
            <E msg={(errs as any).tier?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" /> Région *
            </label>
            {apiLoading ? (
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-400 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />{" "}
                Chargement...
              </div>
            ) : (
              <div className="relative">
                <select
                  {...reg("regionId")}
                  className={
                    inputCls(!!(errs as any).regionId) +
                    " appearance-none cursor-pointer"
                  }
                >
                  <option value="">Sélectionner une région...</option>
                  {Object.entries(regionsByCountry).map(
                    ([country, countryRegions]) => (
                      <optgroup key={country} label={country}>
                        {countryRegions.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </optgroup>
                    ),
                  )}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
              </div>
            )}
            <E msg={(errs as any).regionId?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-slate-400" /> Sport *
            </label>
            {apiLoading ? (
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-400 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />{" "}
                Chargement...
              </div>
            ) : (
              <div className="relative">
                <select
                  {...reg("sportId")}
                  className={
                    inputCls(!!(errs as any).sportId) +
                    " appearance-none cursor-pointer"
                  }
                >
                  <option value="">Sélectionner un sport...</option>
                  {sports.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
              </div>
            )}
            <E msg={(errs as any).sportId?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              {...reg("description")}
              rows={3}
              className={inputCls(!!(errs as any).description) + " resize-none"}
              placeholder="Décrivez votre compétition..."
            />
          </div>
        </div>
      );

    if (currentStep === 2)
      return (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-emerald-900">
                Planning & Capacité
              </p>
              <p className="text-sm text-emerald-600">
                Dates et nombre d'équipes
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Date de début *
              </label>
              <input
                type="date"
                {...reg("startDate")}
                className={inputCls(!!(errs as any).startDate)}
              />
              <E msg={(errs as any).startDate?.message} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Date de fin *
              </label>
              <input
                type="date"
                {...reg("endDate")}
                className={inputCls(!!(errs as any).endDate)}
              />
              <E msg={(errs as any).endDate?.message} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Équipes minimum *
              </label>
              <input
                type="number"
                {...reg("minTeams", { valueAsNumber: true })}
                min={2}
                className={inputCls(!!(errs as any).minTeams)}
              />
              <E msg={(errs as any).minTeams?.message} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Équipes maximum *
              </label>
              <input
                type="number"
                {...reg("maxTeams", { valueAsNumber: true })}
                min={2}
                className={inputCls(!!(errs as any).maxTeams)}
              />
              <E msg={(errs as any).maxTeams?.message} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Frais d'inscription (FCFA)
            </label>
            <div className="relative">
              <input
                type="number"
                {...reg("registrationFee", { valueAsNumber: true })}
                min={0}
                className={inputCls(!!(errs as any).registrationFee)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium pointer-events-none">
                FCFA
              </span>
            </div>
            <E msg={(errs as any).registrationFee?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Format éliminatoire
            </label>
            <div className="relative">
              <select
                {...reg("knockoutFormat")}
                className={
                  inputCls(!!(errs as any).knockoutFormat) +
                  " appearance-none cursor-pointer"
                }
              >
                <option value="single_elimination">Élimination simple</option>
                <option value="double_elimination">Élimination double</option>
                <option value="round_robin">Round Robin</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                {...reg("hasThirdPlaceMatch")}
                className="w-4 h-4 rounded accent-indigo-600"
              />
              <span className="text-sm text-slate-700">
                Match pour la 3ème place
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                {...reg("isPublic")}
                className="w-4 h-4 rounded accent-indigo-600"
              />
              <span className="text-sm text-slate-700">
                Compétition publique
              </span>
            </label>
          </div>
        </div>
      );

    if (currentStep === 3)
      return (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Récompenses & Prix</p>
              <p className="text-sm text-amber-600">Distribution des gains</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Cagnotte totale (FCFA) *
            </label>
            <div className="relative">
              <input
                type="number"
                {...reg("totalPrizePool", { valueAsNumber: true })}
                min={0}
                className={inputCls(!!(errs as any).totalPrizePool)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                FCFA
              </span>
            </div>
            <E msg={(errs as any).totalPrizePool?.message} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "1ère place *", field: "firstPlacePrize" as const },
              { label: "2ème place *", field: "secondPlacePrize" as const },
              { label: "3ème place *", field: "thirdPlacePrize" as const },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {label}
                </label>
                <input
                  type="number"
                  {...reg(field, { valueAsNumber: true })}
                  min={0}
                  placeholder="0"
                  className={inputCls(!!(errs as any)[field])}
                />
                <E msg={(errs as any)[field]?.message} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                <Target className="w-3 h-3" /> MVP (FCFA)
              </label>
              <input
                type="number"
                {...reg("individualPrizes.meilleur_joueur_MVP", {
                  valueAsNumber: true,
                })}
                min={0}
                placeholder="0"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <E
                msg={
                  (errs as any).individualPrizes?.meilleur_joueur_MVP?.message
                }
              />
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                <Target className="w-3 h-3" /> Soulier d'Or (FCFA)
              </label>
              <input
                type="number"
                {...reg("individualPrizes.soulier_d_or_buteur", {
                  valueAsNumber: true,
                })}
                min={0}
                placeholder="0"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <E
                msg={
                  (errs as any).individualPrizes?.soulier_d_or_buteur?.message
                }
              />
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-600" /> Description des prix
              *
            </h4>
            <div>
              <input
                {...reg("prizeDistribution.champion")}
                className={inputCls(
                  !!(errs as any).prizeDistribution?.champion,
                )}
                placeholder="Ex: Trophée + 500.000 FCFA + médailles"
              />
              <E msg={(errs as any).prizeDistribution?.champion?.message} />
            </div>
            <div>
              <input
                {...reg("prizeDistribution.vice_champion")}
                className={inputCls(
                  !!(errs as any).prizeDistribution?.vice_champion,
                )}
                placeholder="Ex: 300.000 FCFA + médailles"
              />
              <E
                msg={(errs as any).prizeDistribution?.vice_champion?.message}
              />
            </div>
          </div>
        </div>
      );

    if (currentStep === 4)
      return (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Info className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-violet-900">
                Règlement & Discipline
              </p>
              <p className="text-sm text-violet-600">
                Configuration des matchs
              </p>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold flex items-center gap-2 text-rose-600 mb-3">
              <AlertCircle className="w-4 h-4" /> Amendes cartons
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Carton jaune (FCFA)
                </label>
                <input
                  type="number"
                  {...reg("rules.discipline.yellow_card_fine", {
                    valueAsNumber: true,
                  })}
                  min={0}
                  placeholder="1000"
                  className={inputCls(
                    !!(errs as any).rules?.discipline?.yellow_card_fine,
                  )}
                />
                <E
                  msg={
                    (errs as any).rules?.discipline?.yellow_card_fine?.message
                  }
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Carton rouge (FCFA)
                </label>
                <input
                  type="number"
                  {...reg("rules.discipline.red_card_fine", {
                    valueAsNumber: true,
                  })}
                  min={0}
                  placeholder="2500"
                  className={inputCls(
                    !!(errs as any).rules?.discipline?.red_card_fine,
                  )}
                />
                <E
                  msg={(errs as any).rules?.discipline?.red_card_fine?.message}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold flex items-center gap-2 text-blue-600 mb-3">
              <Users className="w-4 h-4" /> Logistique match
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Durée du match
                </label>
                <input
                  type="text"
                  {...reg("rules.match_logistics.duration")}
                  placeholder="90min"
                  className={inputCls(
                    !!(errs as any).rules?.match_logistics?.duration,
                  )}
                />
                <E
                  msg={(errs as any).rules?.match_logistics?.duration?.message}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Remplacements max
                </label>
                <input
                  type="number"
                  {...reg("rules.match_logistics.substitution_limit", {
                    valueAsNumber: true,
                  })}
                  min={0}
                  max={11}
                  placeholder="5"
                  className={inputCls(
                    !!(errs as any).rules?.match_logistics?.substitution_limit,
                  )}
                />
                <E
                  msg={
                    (errs as any).rules?.match_logistics?.substitution_limit
                      ?.message
                  }
                />
              </div>
            </div>
          </div>
          <div className="p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">
              Critères de départage
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Face-à-face",
                "Différence de buts",
                "Buts marqués",
                "Fair-play",
              ].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-slate-600 border border-slate-200 shadow-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    return null;
  };

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
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Arena Pulse
                </h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                  Command Center
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="group relative overflow-hidden rounded-xl bg-slate-900 px-6 py-2.5 font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:shadow-xl hover:shadow-indigo-200 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Nouvelle Compétition
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Ligues Actives",
              value: shamp.length,
              icon: Trophy,
              color: "from-violet-500 to-purple-600",
              bgColor: "bg-violet-50",
              textColor: "text-violet-700",
              borderColor: "border-violet-100",
            },
            {
              label: "En Cours",
              value: activeLeagues,
              icon: Activity,
              color: "from-blue-500 to-cyan-500",
              bgColor: "bg-blue-50",
              textColor: "text-blue-700",
              borderColor: "border-blue-100",
            },
            {
              label: "Inscriptions",
              value: openRegistrations,
              icon: Zap,
              color: "from-emerald-500 to-teal-500",
              bgColor: "bg-emerald-50",
              textColor: "text-emerald-700",
              borderColor: "border-emerald-100",
            },
            {
              label: "Cagnotte Totale",
              value: formatCurrency(totalPrizePool),
              icon: DollarSign,
              color: "from-amber-500 to-orange-500",
              bgColor: "bg-amber-50",
              textColor: "text-amber-700",
              borderColor: "border-amber-100",
              isCurrency: true,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 bg-white hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1",
                stat.borderColor,
              )}
            >
              <div
                className={cn(
                  "absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl",
                  stat.color,
                )}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-3xl font-bold tracking-tight text-slate-900",
                      (stat as any).isCurrency && "text-2xl",
                    )}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className={cn("rounded-xl p-3", stat.bgColor)}>
                  <stat.icon className={cn("w-5 h-5", stat.textColor)} />
                </div>
              </div>
              <div className="mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r w-2/3",
                    stat.color,
                  )}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Filtres */}
        <section className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
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
                onChange={(e) =>
                  setFilterStatus(e.target.value as LeagueStatus | "all")
                }
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
                onChange={(e) => setFilterFormat(e.target.value as any)}
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
            <span>
              {filteredLeagues.length} compétition
              {filteredLeagues.length > 1 ? "s" : ""}
            </span>
          </div>
        </section>

        {/* Liste */}
        {shampLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin" />
            </div>
            <p className="text-slate-400 animate-pulse">
              Chargement des compétitions...
            </p>
          </div>
        ) : filteredLeagues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
              <Trophy className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Aucune compétition trouvée
            </h3>
            <p className="text-slate-500 mb-8 max-w-md">
              Créez votre première ligue ou tournoi pour lancer votre saison
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-indigo-100 transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" /> Créer une compétition
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
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border transition-all duration-300 bg-white hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-0.5",
                    isHovered ? "border-indigo-200" : "border-slate-100",
                  )}
                >
                  <div className="relative p-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={cn(
                          "relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300",
                          status.light,
                          isHovered && "scale-105",
                        )}
                      >
                        <Trophy
                          className={cn(
                            "w-7 h-7 transition-colors",
                            status.color,
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 truncate pr-4">
                            {league.name}
                          </h3>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                              status.bg,
                              status.color,
                              status.border,
                            )}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {getStatusLabel(league.status)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            {league.format === "league"
                              ? "Championnat"
                              : "Tournoi"}
                          </span>
                        </div>
                        {league.description && (
                          <p className="text-slate-500 text-sm mb-4 line-clamp-2 max-w-2xl">
                            {league.description}
                          </p>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 rounded-lg bg-slate-50">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            <span className="truncate">
                              {league.region?.name},{" "}
                              {league.region?.country?.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 rounded-lg bg-slate-50">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            <span>
                              {formatDate(league.startDate)} -{" "}
                              {formatDate(league.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 rounded-lg bg-slate-50">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            <span>
                              <span className="font-semibold text-slate-700">
                                {league._count?.teams || 0}
                              </span>
                              /{league.maxTeams || "∞"} équipes
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-50">
                              <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                            </div>
                            <span className="font-bold text-amber-700">
                              {formatCurrency(league.totalPrizePool || 0)}
                            </span>
                          </div>
                        </div>
                        {league.totalPrizePool > 0 && (
                          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                            <div className="p-1.5 rounded-lg bg-amber-100">
                              <Award className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                              <span className="text-slate-700">
                                <span className="text-amber-700 font-bold">
                                  1er
                                </span>{" "}
                                {formatCurrency(league.firstPlacePrize || 0)}
                              </span>
                              <span className="text-slate-700">
                                <span className="text-slate-500 font-bold">
                                  2ème
                                </span>{" "}
                                {formatCurrency(league.secondPlacePrize || 0)}
                              </span>
                              <span className="text-slate-700">
                                <span className="text-orange-600 font-bold">
                                  3ème
                                </span>{" "}
                                {formatCurrency(league.thirdPlacePrize || 0)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex lg:flex-col items-center lg:items-end gap-2 lg:min-w-[140px] lg:border-l lg:border-slate-100 lg:pl-6">
                      {/* Helper pour savoir si un statut est "libre" (tous boutons actifs) */}
                      {(() => {
                     const isInProgress = league.status === "in_progress";
const isCompleted = league.status === "completed";
const isCancelled = league.status === "cancelled";
const isDraft = league.status === "draft"; // ← nouveau
const isLocked = isInProgress || isCompleted

                        return (
                          <div className="flex lg:flex-col gap-2">
                            {/* Voir détails */}
                            <button
                              onClick={() => handleViewDetails(league)}
                              disabled={isLocked}
                              className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-500 disabled:hover:border-transparent"
                              title="Voir détails"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Modifier */}
                            <button
                              onClick={() => handleEditClick(league)}
                              disabled={isLocked}
                              className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-all border border-transparent hover:border-amber-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-500 disabled:hover:border-transparent"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Rapports — actif uniquement si in_progress */}
                            <button
                              disabled={!isInProgress}
                              className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-500 disabled:hover:border-transparent"
                              title="Rapports"
                            >
                              <FileText className="w-4 h-4" />
                            </button>

                            {/* Supprimer — actif si completed OU cancelled */}
                            <button
                              onClick={() => handleDeleteClick(league)}
                              disabled={!isCompleted && !isCancelled && !isDraft}
                              className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-500 disabled:hover:border-transparent"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })()}
                      <button className="hidden lg:flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors mt-2 font-medium">
                        Détails <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── MODAL DÉTAILS ─────────────────────────────────────────────────────── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
        size="lg"
      >
        {selectedLeague && (
          <div className="space-y-6">
            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shrink-0">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-slate-900 truncate">
                  {selectedLeague.name}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                      getStatusConfig(selectedLeague.status).bg,
                      getStatusConfig(selectedLeague.status).color,
                      getStatusConfig(selectedLeague.status).border,
                    )}
                  >
                    {getStatusLabel(selectedLeague.status)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {selectedLeague.format === "league"
                      ? "Championnat"
                      : "Tournoi"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {selectedLeague.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  {formatDate(selectedLeague.startDate)} -{" "}
                  {formatDate(selectedLeague.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>
                  {selectedLeague.region?.name},{" "}
                  {selectedLeague.region?.country?.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span>
                  {selectedLeague._count?.teams || 0}/{selectedLeague.maxTeams}{" "}
                  équipes
                </span>
              </div>
            </div>
            {selectedLeague.totalPrizePool > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-slate-800">
                      Récompenses
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    Total: {formatCurrency(selectedLeague.totalPrizePool)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      place: "1ère",
                      prize: selectedLeague.firstPlacePrize || 0,
                      bg: "bg-amber-100",
                      text: "text-amber-600",
                      num: "1",
                    },
                    {
                      place: "2ème",
                      prize: selectedLeague.secondPlacePrize || 0,
                      bg: "bg-slate-100",
                      text: "text-slate-600",
                      num: "2",
                    },
                    {
                      place: "3ème",
                      prize: selectedLeague.thirdPlacePrize || 0,
                      bg: "bg-orange-100",
                      text: "text-orange-600",
                      num: "3",
                    },
                  ].map(({ place, prize, bg, text, num }) => (
                    <div
                      key={place}
                      className="text-center p-3 bg-white rounded-lg border border-slate-200"
                    >
                      <div
                        className={cn(
                          "w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center",
                          bg,
                        )}
                      >
                        <span className={cn("text-xs font-bold", text)}>
                          {num}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-500">
                        {place}
                      </p>
                      <p className="font-bold text-slate-800 text-sm">
                        {formatCurrency(prize)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedLeague.rules && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-400" /> Règlement
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {selectedLeague.rules.discipline && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Amendes</p>
                      <p className="text-slate-700">
                        Jaune:{" "}
                        {formatCurrency(
                          selectedLeague.rules.discipline.yellow_card_fine || 0,
                        )}
                      </p>
                      <p className="text-slate-700">
                        Rouge:{" "}
                        {formatCurrency(
                          selectedLeague.rules.discipline.red_card_fine || 0,
                        )}
                      </p>
                    </div>
                  )}
                  {selectedLeague.rules.match_logistics && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Match</p>
                      <p className="text-slate-700">
                        {selectedLeague.rules.match_logistics.duration}
                      </p>
                      <p className="text-slate-700">
                        {
                          selectedLeague.rules.match_logistics
                            .substitution_limit
                        }{" "}
                        remplacements
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedLeague.description && (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                  Description
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedLeague.description}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-400">
                ID: {selectedLeague.id.substring(0, 8)}... •{" "}
                {selectedLeague.isPublic ? "Public" : "Privé"}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    handleEditClick(selectedLeague);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Modifier
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ── MODAL SUPPRESSION ─────────────────────────────────────────────────── */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        size="md"
      >
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100">
            <AlertTriangle className="w-10 h-10 text-rose-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Supprimer cette compétition ?
          </h3>
          <p className="text-slate-500 max-w-sm">
            Vous êtes sur le point de supprimer{" "}
            <span className="text-slate-900 font-semibold">
              "{leagueToDelete?.name}"
            </span>
            . Cette action est irréversible.
          </p>
        </div>
        <div className="flex gap-3 justify-end pt-6 border-t border-slate-100">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeleting}
            className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className="px-6 py-2.5 bg-rose-600 text-white font-medium rounded-xl hover:bg-rose-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-rose-200"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                Suppression...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" /> Supprimer définitivement
              </>
            )}
          </button>
        </div>
      </Modal>

      {/* ── MODAL CRÉATION ────────────────────────────────────────────────────── */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setStep(1);
          reset();
        }}
        title={`Nouvelle Compétition — Étape ${step}/4`}
        size="lg"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="create-form"
          className="space-y-6"
        >
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden"
              >
                <div
                  className={cn(
                    "h-full transition-all duration-500 rounded-full",
                    s < step
                      ? "bg-slate-400"
                      : s === step
                        ? "bg-indigo-600"
                        : "bg-transparent",
                  )}
                />
              </div>
            ))}
          </div>
          {renderStep(step, register, errors)}
        </form>
        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 disabled:opacity-0 hover:bg-slate-100 rounded-lg transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Précédent
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              form="create-form"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                  Publication...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Publier la Compétition
                </>
              )}
            </button>
          )}
        </div>
      </Modal>

      {/* ── MODAL ÉDITION ─────────────────────────────────────────────────────── */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingLeague(null);
          setEditStep(1);
          resetEdit();
        }}
        title={`Modifier "${editingLeague?.name || ""}" — Étape ${editStep}/4`}
        size="lg"
      >
        {/* Bandeau d'identification */}
        {editingLeague && (
          <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Edit className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                Mode édition
              </p>
              <p className="text-sm font-bold text-amber-900 truncate">
                {editingLeague.name}
              </p>
            </div>
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0",
                getStatusConfig(editingLeague.status).bg,
                getStatusConfig(editingLeague.status).color,
                getStatusConfig(editingLeague.status).border,
              )}
            >
              {getStatusLabel(editingLeague.status)}
            </span>
          </div>
        )}

        <form
          onSubmit={handleSubmitEdit(onSubmitEdit)}
          id="edit-form"
          className="space-y-6"
        >
          {/* Barre de progression */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden"
              >
                <div
                  className={cn(
                    "h-full transition-all duration-500 rounded-full",
                    s < editStep
                      ? "bg-amber-400"
                      : s === editStep
                        ? "bg-amber-600"
                        : "bg-transparent",
                  )}
                />
              </div>
            ))}
          </div>

          {renderStep(editStep, registerEdit, errorsEdit)}
        </form>

        {/* Navigation édition */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={prevEditStep}
            disabled={editStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 disabled:opacity-0 hover:bg-slate-100 rounded-lg transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Précédent
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingLeague(null);
                setEditStep(1);
                resetEdit();
              }}
              className="px-4 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all text-sm font-medium"
            >
              Annuler
            </button>

            {editStep < 4 ? (
              <button
                type="button"
                onClick={nextEditStep}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
              >
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="edit-form"
                disabled={isSubmittingEdit}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
              >
                {isSubmittingEdit ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Enregistrer les modifications
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
