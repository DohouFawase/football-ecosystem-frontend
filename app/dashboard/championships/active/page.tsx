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
} from "lucide-react";
import { League, LeagueStatus } from "@/types/LeagueTypes";
import { MOCK_LEAGUES } from "@/mock/league";
import { Modal } from "@/components/ui/Modal";

const Page = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchActiveLeagues();
  }, []);

  const fetchActiveLeagues = async () => {
    try {
      setLoading(true);

      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Utiliser les données mock
      setLeagues(MOCK_LEAGUES);

      // Code pour l'API réelle (à décommenter plus tard)
      // const response = await fetch('/api/organizer/leagues/active');
      // const data = await response.json();
      // setLeagues(data.leagues || []);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (league: League) => {
    setLeagueToDelete(league);
    setIsDeleteModalOpen(true);
  };

  const [step, setStep] = useState(1);

  // État initial basé sur ton JSON
  const [formData, setFormData] = useState({
    name: "Coupe des Vacances Calavi 2026",
    description: "",
    format: "tournament",
    tier: "regional",
    category: "AMATEUR",
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
    // Objets complexes du DTO
    prizeDistribution: { champion: "", vice_champion: "" },
    individualPrizes: { meilleur_joueur_MVP: 0, soulier_d_or_buteur: 0 },
    rules: {
      discipline: { yellow_card_fine: 1000, red_card_fine: 2500 },
      match_logistics: { duration: "90min", substitution_limit: 5 },
    },
    knockoutFormat: "single_elimination",
    hasThirdPlaceMatch: true,
    isPublic: true,
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données envoyées au backend:", formData);
    // Ici ton appel API : await fetch('/api/leagues', { method: 'POST', body: JSON.stringify(formData) })
    setIsCreateModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!leagueToDelete) return;

    try {
      setIsDeleting(true);
      // Simulation d'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mise à jour de l'interface locale
      setLeagues(leagues.filter((l) => l.id !== leagueToDelete.id));

      // Fermeture et reset
      setIsDeleteModalOpen(false);
      setLeagueToDelete(null);

      // Optionnel: Afficher un toast de succès ici
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: LeagueStatus) => {
    const colors = {
      draft: "bg-slate-500/10 text-slate-700 border-slate-300",
      open_registration:
        "bg-emerald-500/10 text-emerald-700 border-emerald-300",
      registration_closed: "bg-amber-500/10 text-amber-700 border-amber-300",
      in_progress: "bg-blue-500/10 text-blue-700 border-blue-300",
      completed: "bg-purple-500/10 text-purple-700 border-purple-300",
      cancelled: "bg-red-500/10 text-red-700 border-red-300",
    };
    return colors[status];
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
    return labels[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredLeagues = leagues.filter((league) => {
    const matchesSearch =
      league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || league.status === filterStatus;
    const matchesFormat =
      filterFormat === "all" || league.format === filterFormat;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  const handleViewDetails = (league: League) => {
    setSelectedLeague(league);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Mes Ligues
              </h1>
              <p className="text-slate-600 mt-1">
                Gérez vos championnats et tournois
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)} // Déclencheur ici
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Ligue
            </button>
          </div>
        </div>
      </div>

      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une ligue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as LeagueStatus | "all")
                }
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="all">Tous les statuts</option>
                <option value="draft">Brouillon</option>
                <option value="open_registration">Inscriptions ouvertes</option>
                <option value="registration_closed">
                  Inscriptions fermées
                </option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={filterFormat}
                onChange={(e) =>
                  setFilterFormat(
                    e.target.value as "all" | "league" | "tournament",
                  )
                }
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="all">Tous les formats</option>
                <option value="league">Championnat</option>
                <option value="tournament">Tournoi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Carte Total Ligues */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  Total Ligues
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {leagues.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl">
                <Trophy className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Carte En cours */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  En cours
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {leagues.filter((l) => l.status === "in_progress").length}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <Calendar className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Carte Inscriptions */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  Inscriptions
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {
                    leagues.filter((l) => l.status === "open_registration")
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl">
                <Users className="w-8 h-8 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Carte Cagnotte */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  Cagnotte totale
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {formatCurrency(
                    leagues.reduce((sum, l) => sum + l.totalPrizePool, 0),
                  )}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl">
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : filteredLeagues.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Aucune ligue trouvée
            </h3>
            <p className="text-slate-600 mb-6">
              Créez votre première ligue pour commencer
            </p>
            <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Créer une ligue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredLeagues.map((league) => (
              <div
                key={league.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Icône de Ligue */}
                      <div className="w-16 h-16  rounded-xl flex items-center justify-center text-black shadow-sm shrink-0">
                        <Trophy className="w-8 h-8" />
                      </div>

                      <div className="flex-1">
                        {/* En-tête de la carte */}
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-bold text-slate-900">
                            {league.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(league.status)}`}
                          >
                            {getStatusLabel(league.status)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                            {league.format === "league"
                              ? "Championnat"
                              : "Tournoi"}
                          </span>
                        </div>

                        {league.description && (
                          <p className="text-slate-600 mb-4 line-clamp-2">
                            {league.description}
                          </p>
                        )}

                        {/* Grille d'infos (Lieu, Date, Équipes, Budget) */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">
                              {league.region?.name},{" "}
                              {league.region?.country.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">
                              {formatDate(league.startDate)} -{" "}
                              {formatDate(league.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">
                              {league._count?.teams || 0}/
                              {league.maxTeams || "∞"} équipes
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700 font-semibold">
                              {formatCurrency(league.totalPrizePool)}
                            </span>
                          </div>
                        </div>

                        {/* Section Récompenses */}
                        {league.totalPrizePool > 0 && (
                          <div className="flex items-center gap-2 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <Award className="w-4 h-4 text-amber-600" />
                            <span className="text-amber-900">
                              <span className="font-semibold">Prix:</span> 1er{" "}
                              {formatCurrency(league.firstPlacePrize || 0)} ·
                              2ème{" "}
                              {formatCurrency(league.secondPlacePrize || 0)} ·
                              3ème {formatCurrency(league.thirdPlacePrize || 0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions de droite */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleViewDetails(league)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      title="Voir"
                    >
                      <Eye className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-amber-50 rounded-lg transition-colors group"
                      title="Modifier"
                    >
                      <Edit className="w-5 h-5 text-slate-400 group-hover:text-amber-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-emerald-50 rounded-lg transition-colors group"
                      title="Rapports"
                    >
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(league)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-slate-50 rounded-lg transition-colors group"
                      title="Détails"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Détails de la Ligue"
        size="lg"
        footer={
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
          >
            Fermer
          </button>
        }
      >
        {selectedLeague && (
          <div className="space-y-6">
            {/* --- EN-TÊTE --- */}
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-black shadow-sm">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedLeague.name}
                </h2>
                <div className="flex gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(selectedLeague.status)}`}
                  >
                    {getStatusLabel(selectedLeague.status)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                    {selectedLeague.tier?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* --- GRILLE D'INFOS GÉNÉRALES --- */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Période
                </p>
                <p className="font-medium text-slate-900">
                  Du {new Date(selectedLeague.startDate).toLocaleDateString()}{" "}
                  au {new Date(selectedLeague.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Participation
                </p>
                <p className="font-medium text-slate-900">
                  {selectedLeague._count?.teams || 0} /{" "}
                  {selectedLeague.maxTeams} équipes
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Localisation
                </p>
                <p className="font-medium text-slate-900">
                  {selectedLeague.region?.name},{" "}
                  {selectedLeague.region?.country.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Cagnotte Totale
                </p>
                <p className="font-bold text-emerald-600 text-lg">
                  {formatCurrency(selectedLeague.totalPrizePool)}
                </p>
              </div>
            </div>

            {/* --- RÉPARTITION DES PRIX (Nouveau) --- */}
            {selectedLeague.prizeDistribution && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" /> Récompenses
                  d'Équipe
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-xs text-amber-700 font-bold uppercase">
                      Champion
                    </p>
                    <p className="text-sm text-amber-900">
                      {selectedLeague.prizeDistribution.champion}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-xs text-slate-500 font-bold uppercase">
                      Vice-Champion
                    </p>
                    <p className="text-sm text-slate-800">
                      {selectedLeague.prizeDistribution.vice_champion}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* --- PRIX INDIVIDUELS (Nouveau) --- */}
            {selectedLeague.individualPrizes && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-700">
                  Trophées Individuels
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedLeague.individualPrizes).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 text-sm"
                      >
                        <span className="font-medium">
                          {key.replace(/_/g, " ")} :
                        </span>{" "}
                        {formatCurrency(value as number)}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* --- RÈGLES ET LOGISTIQUE (Nouveau) --- */}
            {selectedLeague.rules && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Format & Discipline
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 italic">Matchs</p>
                      <p className="text-slate-700">
                        Durée: {selectedLeague.rules.match_logistics.duration}
                      </p>
                      <p className="text-slate-700">
                        Remplacements:{" "}
                        {
                          selectedLeague.rules.match_logistics
                            .substitution_limit
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 italic">Sanctions</p>
                      <p className="text-slate-700 font-medium text-red-600">
                        Rouge:{" "}
                        {formatCurrency(
                          selectedLeague.rules.discipline.red_card_fine,
                        )}
                      </p>
                      <p className="text-slate-700">
                        Règle: {selectedLeague.rules.discipline.suspension_rule}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- DESCRIPTION --- */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                Description
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedLeague.description || "Aucune description fournie."}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* --- MODAL DE CONFIRMATION DE SUPPRESSION --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        size="md"
        footer={
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
              className="flex-1 sm:flex-none px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer définitivement"
              )}
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Êtes-vous sûr de vouloir supprimer cette ligue ?
          </h3>
          <p className="text-slate-600">
            Vous êtes sur le point de supprimer{" "}
            <span className="font-semibold text-slate-900">
              "{leagueToDelete?.name}"
            </span>
            . Cette action est irréversible et toutes les données associées
            seront perdues.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={isCreateModalOpen} // Utilise l'état que tu as défini plus haut
        onClose={() => setIsCreateModalOpen(false)} // Utilise le setter de ton useState
        title={`Créer une Compétition - Étape ${step}/4`}
        size="lg"
        footer={
          <div className="flex justify-between w-full">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2 text-slate-500 disabled:opacity-0"
            >
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit} // Appelle ta fonction de soumission
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Publier la Ligue
              </button>
            )}
          </div>
        }
      >
        <div className="py-2">
          {/* ÉTAPE 1 : GÉNÉRAL */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-blue-50 p-3 rounded-lg flex gap-3 text-blue-700 mb-4">
                <Trophy className="w-5 h-5" />
                <p className="text-sm font-medium">
                  Identité de la compétition
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <input
                  className="w-full p-3 border rounded-xl"
                  placeholder="Nom (ex: Coupe des Vacances...)"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <textarea
                  name="description" // Très important pour handleInputChange
                  className="w-full p-3 border rounded-xl h-24"
                  placeholder="Description des phases..."
                  value={formData.description}
                  onChange={handleInputChange} // Utilise ta fonction générique
                />
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : RÉCOMPENSES (La partie riche de ton JSON) */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl bg-slate-50">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    MVP (FCFA)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-transparent text-lg font-bold outline-none"
                    placeholder="50000"
                  />
                </div>
                <div className="p-4 border rounded-xl bg-slate-50">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Buteur (FCFA)
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-transparent text-lg font-bold outline-none"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <Award className="w-4 h-4" /> Distribution des prix
                </h4>
                <input
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Champion: Trophée + 500.000..."
                />
                <input
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Vice-champion: 300.000..."
                />
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : RÈGLES TECHNIQUES (Discipline & Logistique) */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" /> Amendes Cartons
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="w-1/2 p-2 border rounded-lg"
                      placeholder="Jaune (1000)"
                    />
                    <input
                      className="w-1/2 p-2 border rounded-lg"
                      placeholder="Rouge (2500)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2 text-blue-600">
                    Remplacements
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Max: 5"
                  />
                </div>
              </div>

              <div className="p-4 border border-dashed rounded-xl">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">
                  Priorité en cas d'égalité
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Face-à-face", "Diff. Buts", "Attaque"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Page;
