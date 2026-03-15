"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  AlertCircle,
  Filter,
  Search,
  Calendar,
  Trophy,
  MapPin,
  Mail,
  Phone,
  Loader2,
  Trash2,
  RefreshCw,
  ChevronDown,
  CreditCard,
  ShieldCheck,
  Ban,
  AlertTriangle,
  Eye,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegistrations,
  approveRegistration,
  rejectRegistration,
  deleteRegistration,
} from "@/actions/leagueParticipants/leagueParticipants";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ParticipationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "WITHDRAWN";
export type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "PAID"
  | "REFUNDED"
  | "APPROVED";

export interface LeagueParticipation {
  id: string;
  ownerId: string;
  teamName?: string;
  teamId?: string | null;
  leagueId: string;
  status: ParticipationStatus;
  rejectionReason?: string | null;
  paymentStatus: PaymentStatus;
  paymentAmount?: number | null;
  paymentProof?: string | null;
  paymentDate?: string | null;
  paymentMethod?: string | null;
  transactionRef?: string | null;
  appliedAt: string;
  approvedAt?: string | null;
  approvedBy?: string | null;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  updatedAt: string;
  team?: unknown | null;
  owner?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  league?: {
    id: string;
    name: string;
    format?: string;
    registrationFee?: number;
    region?: { name: string; country: { name: string } };
  };
}

// ─── Config statuts participation ─────────────────────────────────────────────
const STATUS_CFG: Record<
  ParticipationStatus,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    icon: React.ElementType;
    dot: string;
  }
> = {
  PENDING: {
    label: "En attente",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: Clock,
    dot: "bg-amber-500",
  },
  APPROVED: {
    label: "Approuvé",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: CheckCircle,
    dot: "bg-emerald-500",
  },
  REJECTED: {
    label: "Rejeté",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: XCircle,
    dot: "bg-rose-500",
  },
  WITHDRAWN: {
    label: "Retiré",
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    icon: Ban,
    dot: "bg-slate-400",
  },
};

// ─── Config statuts paiement ──────────────────────────────────────────────────
const PAYMENT_CFG: Record<
  string,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  UNPAID: {
    label: "Non payé",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
  PENDING: {
    label: "En attente",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  PAID: {
    label: "Payé",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  APPROVED: {
    label: "Validé",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  REFUNDED: {
    label: "Remboursé",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const cn = (...c: (string | boolean | undefined)[]) =>
  c.filter(Boolean).join(" ");

const formatDate = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const formatDateTime = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const formatCurrency = (n?: number | null) =>
  n != null
    ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        minimumFractionDigits: 0,
      }).format(n)
    : "—";

const ownerName = (p: LeagueParticipation) => {
  if (!p.owner) return "—";
  const full = [p.owner.firstName, p.owner.lastName].filter(Boolean).join(" ");
  return full || p.owner.email || "—";
};

// ─── Composant ────────────────────────────────────────────────────────────────
const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(
    (state: RootState) => state.registration.items,
  ) as LeagueParticipation[];
  const storeStatus = useSelector(
    (state: RootState) => state.registration.status,
  );
  const actionLoading = useSelector(
    (state: RootState) => state.registration.actionLoading,
  );

  // Filtres
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ParticipationStatus | "all">(
    "all",
  );
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [filterLeague, setFilterLeague] = useState<string>("all");

  // Modals
  const [rejectTarget, setRejectTarget] = useState<LeagueParticipation | null>(
    null,
  );
  const [rejectReason, setRejectReason] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<LeagueParticipation | null>(
    null,
  );
  const [detailTarget, setDetailTarget] = useState<LeagueParticipation | null>(
    null,
  );

  // Fetch au montage
  useEffect(() => {
    dispatch(fetchRegistrations({}));
  }, [dispatch]);

  // ─── Listes uniques pour filtres ──────────────────────────────────────────
  const leagueOptions = Array.from(
    new Map(
      items.filter((i) => i.league).map((i) => [i.league!.id, i.league!.name]),
    ).entries(),
  );

  // ─── Filtrage ─────────────────────────────────────────────────────────────
  const filtered = items.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch =
      p.teamName?.toLowerCase().includes(s) ||
      p.owner?.email?.toLowerCase().includes(s) ||
      p.owner?.firstName?.toLowerCase().includes(s) ||
      p.owner?.lastName?.toLowerCase().includes(s) ||
      p.league?.name.toLowerCase().includes(s) ||
      p.transactionRef?.toLowerCase().includes(s);
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchPayment =
      filterPayment === "all" || p.paymentStatus === filterPayment;
    const matchLeague = filterLeague === "all" || p.leagueId === filterLeague;
    return matchSearch && matchStatus && matchPayment && matchLeague;
  });

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = {
    total: items.length,
    pending: items.filter((p) => p.status === "PENDING").length,
    approved: items.filter((p) => p.status === "APPROVED").length,
    rejected: items.filter((p) => p.status === "REJECTED").length,
    withdrawn: items.filter((p) => p.status === "WITHDRAWN").length,
    payPending: items.filter((p) => p.paymentStatus === "PENDING").length,
    payPaid: items.filter(
      (p) => p.paymentStatus === "PAID" || p.paymentStatus === "APPROVED",
    ).length,
    payUnpaid: items.filter((p) => p.paymentStatus === "UNPAID").length,
    totalAmount: items.reduce((s, p) => s + (p.paymentAmount ?? 0), 0),
  };

  // ─── Actions ──────────────────────────────────────────────────────────────
  const handleApprove = (id: string) => dispatch(approveRegistration(id));

  const handleRejectConfirm = async () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    await dispatch(
      rejectRegistration({ id: rejectTarget.id, reason: rejectReason }),
    );
    setRejectTarget(null);
    setRejectReason("");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await dispatch(deleteRegistration(deleteTarget.id));
    setDeleteTarget(null);
  };

  const isActing = (id: string) => actionLoading === id;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Demandes de participation
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Gérez les inscriptions et les paiements de vos ligues
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {stats.pending > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm font-medium text-amber-800">
                    {stats.pending} en attente
                  </span>
                </div>
              )}
              <button
                onClick={() => dispatch(fetchRegistrations({}))}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                title="Actualiser"
              >
                <RefreshCw
                  className={cn(
                    "w-5 h-5",
                    storeStatus === "loading" && "animate-spin",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ── Stats Cards ────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            {
              label: "Total",
              value: stats.total,
              color: "text-slate-900",
              bg: "bg-white",
              border: "border-slate-200",
            },
            {
              label: "En attente",
              value: stats.pending,
              color: "text-amber-600",
              bg: "bg-white",
              border: "border-amber-200",
            },
            {
              label: "Approuvés",
              value: stats.approved,
              color: "text-emerald-600",
              bg: "bg-white",
              border: "border-emerald-200",
            },
            {
              label: "Rejetés",
              value: stats.rejected,
              color: "text-rose-600",
              bg: "bg-white",
              border: "border-rose-200",
            },
            {
              label: "Non payé",
              value: stats.payUnpaid,
              color: "text-rose-600",
              bg: "bg-white",
              border: "border-rose-200",
            },
            {
              label: "Paiement en attente",
              value: stats.payPending,
              color: "text-amber-600",
              bg: "bg-white",
              border: "border-amber-200",
            },
            {
              label: "Payés",
              value: stats.payPaid,
              color: "text-emerald-600",
              bg: "bg-white",
              border: "border-emerald-200",
            },
            {
              label: "Total encaissé",
              value: formatCurrency(stats.totalAmount),
              color: "text-slate-900",
              bg: "bg-white",
              border: "border-slate-200",
              isCurrency: true,
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-xl border p-4 text-center transition-shadow hover:shadow-sm",
                s.bg,
                s.border,
              )}
            >
              <p className={cn("text-2xl font-bold", s.color, s.isCurrency && "text-lg")}>
                {s.value}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </section>

        {/* ── Filtres ────────────────────────────────────────────────────────── */}
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une équipe, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all"
              />
            </div>
            
            {/* Statut participation */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as ParticipationStatus | "all")
                }
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-10 pr-8 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer"
              >
                <option value="all">Tous les statuts</option>
                <option value="PENDING">En attente</option>
                <option value="APPROVED">Approuvé</option>
                <option value="REJECTED">Rejeté</option>
                <option value="WITHDRAWN">Retiré</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Statut paiement */}
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-10 pr-8 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer"
              >
                <option value="all">Tous les paiements</option>
                <option value="UNPAID">Non payé</option>
                <option value="PENDING">En attente</option>
                <option value="PAID">Payé</option>
                <option value="APPROVED">Validé</option>
                <option value="REFUNDED">Remboursé</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Ligue */}
            <div className="relative">
              <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={filterLeague}
                onChange={(e) => setFilterLeague(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-10 pr-8 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer"
              >
                <option value="all">Toutes les ligues</option>
                {leagueOptions.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">{filtered.length}</span> résultat{filtered.length > 1 ? "s" : ""}
              {filtered.length !== items.length && ` sur ${items.length}`}
            </p>
            {(search ||
              filterStatus !== "all" ||
              filterPayment !== "all" ||
              filterLeague !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilterStatus("all");
                  setFilterPayment("all");
                  setFilterLeague("all");
                }}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-1"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </section>

        {/* ── Liste ──────────────────────────────────────────────────────────── */}
        {storeStatus === "loading" ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
              <div className="absolute inset-0 rounded-full border-4 border-t-slate-900 animate-spin" />
            </div>
            <p className="text-slate-500 font-medium">Chargement des participations...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-5 border border-slate-100">
              <Users className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Aucune participation trouvée
            </h3>
            <p className="text-sm text-slate-500">
              Modifiez vos filtres ou attendez de nouvelles demandes
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-4">Équipe & Contact</div>
              <div className="col-span-2">Ligue</div>
              <div className="col-span-2">Statuts</div>
              <div className="col-span-2">Paiement</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const sCfg = STATUS_CFG[p.status] ?? STATUS_CFG.PENDING;
                const payCfg = PAYMENT_CFG[p.paymentStatus] ?? PAYMENT_CFG.UNPAID;
                const SIcon = sCfg.icon;
                const acting = isActing(p.id);

                return (
                  <div
                    key={p.id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-slate-50 transition-colors items-center group"
                  >
                    {/* Équipe & Contact */}
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">
                        {p.teamName?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate mb-0.5">
                          {p.teamName || "Équipe sans nom"}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          {p.owner?.email && (
                            <span className="flex items-center gap-1.5 truncate">
                              <Mail className="w-3.5 h-3.5" />
                              <span className="truncate">{p.owner.email}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {formatDate(p.appliedAt)}
                        </div>
                      </div>
                    </div>

                    {/* Ligue */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Trophy className="w-4 h-4 text-slate-400" />
                        <span className="font-medium truncate">{p.league?.name}</span>
                      </div>
                      {p.league?.region && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {p.league.region.name}
                        </div>
                      )}
                    </div>

                    {/* Statuts */}
                    <div className="col-span-2">
                      <div className="flex flex-col gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border w-fit",
                            sCfg.bg,
                            sCfg.text,
                            sCfg.border,
                          )}
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full", sCfg.dot)} />
                          {sCfg.label}
                        </span>
                        {p.status === "REJECTED" && p.rejectionReason && (
                          <span className="text-xs text-rose-600 truncate max-w-[150px]" title={p.rejectionReason}>
                            {p.rejectionReason}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Paiement */}
                    <div className="col-span-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border w-fit mb-2",
                          payCfg.bg,
                          payCfg.text,
                          payCfg.border,
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full", payCfg.dot)} />
                        {payCfg.label}
                      </span>
                      <div className="space-y-1 text-xs text-slate-500">
                        {p.paymentAmount != null && (
                          <div className="font-semibold text-slate-700">
                            {formatCurrency(p.paymentAmount)}
                          </div>
                        )}
                        {p.transactionRef && (
                          <div className="font-mono text-slate-400 truncate max-w-[120px]">
                            {p.transactionRef}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      {acting ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                      ) : (
                        <>
                          <button
                            onClick={() => setDetailTarget(p)}
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {p.status !== "APPROVED" && (
                            <>
                              <button
                                onClick={() => handleApprove(p.id)}
                                className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all"
                                title="Approuver"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>

                              {p.status !== "REJECTED" && (
                                <button
                                  onClick={() => setRejectTarget(p)}
                                  className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 transition-all"
                                  title="Rejeter"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => setDeleteTarget(p)}
                                className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-all"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          {p.status === "APPROVED" && (
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                              Validée
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ── Modal détails ──────────────────────────────────────────────────────── */}
      {detailTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">
                Détails de la participation
              </h3>
              <button
                onClick={() => setDetailTarget(null)}
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl">
                  {detailTarget.teamName?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    {detailTarget.teamName || "Équipe sans nom"}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                      STATUS_CFG[detailTarget.status].bg,
                      STATUS_CFG[detailTarget.status].text,
                      STATUS_CFG[detailTarget.status].border,
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_CFG[detailTarget.status].dot)} />
                      {STATUS_CFG[detailTarget.status].label}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm text-slate-500">
                      {formatDateTime(detailTarget.appliedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4" /> Informations équipe
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Propriétaire</span>
                      <span className="font-medium text-slate-900">{ownerName(detailTarget)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Email</span>
                      <span className="font-medium text-slate-900">{detailTarget.owner?.email || "—"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Téléphone</span>
                      <span className="font-medium text-slate-900">{detailTarget.owner?.phone || "—"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> Ligue
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Nom</span>
                      <span className="font-medium text-slate-900">{detailTarget.league?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Frais d'inscription</span>
                      <span className="font-medium text-slate-900">{formatCurrency(detailTarget.league?.registrationFee)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Région</span>
                      <span className="font-medium text-slate-900">
                        {detailTarget.league?.region?.name}, {detailTarget.league?.region?.country?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 col-span-2">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Paiement
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1">Statut</p>
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border",
                          PAYMENT_CFG[detailTarget.paymentStatus].bg,
                          PAYMENT_CFG[detailTarget.paymentStatus].text,
                          PAYMENT_CFG[detailTarget.paymentStatus].border,
                        )}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", PAYMENT_CFG[detailTarget.paymentStatus].dot)} />
                          {PAYMENT_CFG[detailTarget.paymentStatus].label}
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Montant payé</p>
                        <p className="font-semibold text-slate-900">{formatCurrency(detailTarget.paymentAmount)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Méthode</p>
                        <p className="font-semibold text-slate-900">{detailTarget.paymentMethod || "—"}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Référence</p>
                        <p className="font-mono text-slate-900">{detailTarget.transactionRef || "—"}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Date de paiement</p>
                        <p className="font-semibold text-slate-900">{formatDate(detailTarget.paymentDate)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Justificatif</p>
                        {detailTarget.paymentProof ? (
                          <a 
                            href={detailTarget.paymentProof} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" /> Voir le fichier
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {detailTarget.rejectionReason && (
                  <div className="col-span-2 bg-rose-50 border border-rose-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-rose-900 mb-1">Motif du rejet</h4>
                        <p className="text-sm text-rose-700">{detailTarget.rejectionReason}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setDetailTarget(null)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal rejet ────────────────────────────────────────────────────────── */}
      {rejectTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-amber-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Rejeter la participation</h3>
                  <p className="text-sm text-slate-600">{rejectTarget.teamName}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Motif du rejet <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Expliquez pourquoi cette demande est rejetée..."
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
              />
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setRejectTarget(null);
                  setRejectReason("");
                }}
                className="px-5 py-2.5 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleRejectConfirm}
                disabled={!rejectReason.trim()}
                className="px-5 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" /> Confirmer le rejet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal suppression ──────────────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-6 text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <AlertTriangle className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Supprimer cette participation ?
              </h3>
              <p className="text-sm text-slate-500 mb-1">
                Vous êtes sur le point de supprimer <span className="font-semibold text-slate-900">{deleteTarget.teamName}</span>
              </p>
              <p className="text-xs text-rose-600 font-medium">Cette action est irréversible.</p>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-5 py-2.5 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-5 py-2.5 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;