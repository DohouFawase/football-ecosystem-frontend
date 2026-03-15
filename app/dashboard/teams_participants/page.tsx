"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trophy, Users, Calendar, Shield, Swords } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { FetchMyOrganization, FetchOrganizationTeams } from "@/actions/organization/registeOrganization";

const TournamentAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const myOrg = useSelector((state: RootState) => state.org.myOrg);
  const myOrgStatus = useSelector((state: RootState) => state.org.myOrgStatus);
  const orgTeams = useSelector((state: RootState) => state.org.orgTeams);
  const orgTeamsStatus = useSelector((state: RootState) => state.org.orgTeamsStatus);

  useEffect(() => {
    if (myOrgStatus === "idle") {
      dispatch(FetchMyOrganization());
    }
  }, [myOrgStatus, dispatch]);

  useEffect(() => {
    if (myOrgStatus === "succeeded" && myOrg?.id && orgTeamsStatus === "idle") {
      dispatch(FetchOrganizationTeams(myOrg.id));
    }
  }, [myOrgStatus, myOrg?.id, orgTeamsStatus, dispatch]);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (myOrgStatus === "loading" || orgTeamsStatus === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-slate-900 border-t-transparent animate-spin" />
          <p className="text-slate-500 font-medium">Chargement des compétitions...</p>
        </div>
      </div>
    );
  }

  // ✅ On exclut les leagues avec status "draft"
  const leagues = (orgTeams?.leagues ?? []).filter(
    (league: any) => league.status !== "draft"
  );

  const totalTeams = leagues.reduce(
    (acc: number, league: any) => acc + league.teams.length, 0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Nos Compétitions</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Gérez vos ligues et équipes participantes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-2xl font-bold text-slate-900">{leagues.length}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Compétitions</p>
              </div>
              <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-2xl font-bold text-slate-900">{totalTeams}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Équipes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {leagues.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-200">
              <Trophy className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune compétition active</h3>
            <p className="text-slate-500">Toutes vos compétitions sont en brouillon ou aucune n'a été créée.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leagues.map((league: any) => {
              const isOpen = openId === league.id;
              const statusConfig = getStatusConfig(league.status);

              return (
                <div
                  key={league.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow hover:shadow-sm"
                >
                  {/* ── Header ───────────────────────────────────────────────── */}
                  <button
                    onClick={() => toggleAccordion(league.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", statusConfig.bg)}>
                        <Swords className={cn("w-6 h-6", statusConfig.iconColor)} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-slate-900 text-lg">{league.name}</h3>
                          <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", statusConfig.badge)}>
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5" />
                            {league.format}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5" />
                            {league.tier}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Users className="w-4 h-4 text-slate-400" />
                          {league.teams.length} équipe{league.teams.length > 1 ? "s" : ""}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {league.teams.reduce((acc: number, t: any) => acc + (t.totalPlayers || 0), 0)} joueurs
                        </p>
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                        isOpen ? "bg-slate-200" : "bg-slate-100"
                      )}>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* ── Content ───────────────────────────────────────────────── */}
                  <div className={cn(
                    "border-t border-slate-200 bg-slate-50 transition-all duration-300 ease-in-out",
                    isOpen ? "block" : "hidden"
                  )}>
                    <div className="p-5">
                      {/* Dates */}
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-5 pb-4 border-b border-slate-200">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">Période :</span>
                        <span>
                          {new Date(league.startDate).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "long", year: "numeric",
                          })}
                        </span>
                        <span className="text-slate-400">→</span>
                        <span>
                          {new Date(league.endDate).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "long", year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Teams */}
                      {league.teams.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {league.teams.map((team: any) => (
                            <div
                              key={team.id}
                              className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {team.logoUrl ? (
                                  <img src={team.logoUrl} alt={team.name} className="w-10 h-10 rounded-lg object-cover" />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                                    {team.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <p className="font-semibold text-slate-900 text-sm">{team.name}</p>
                                  <p className="text-xs text-slate-500">ID: {team.id.slice(0, 8)}...</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg">
                                <Users className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">
                                  {team.totalPlayers || 0}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-white rounded-xl border border-dashed border-slate-300">
                          <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">Aucune équipe inscrite</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

function getStatusConfig(status: string) {
  const configs: Record<string, { label: string; badge: string; bg: string; iconColor: string }> = {
    open_registration: {
      label: "Inscriptions ouvertes",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    registration_closed: {
      label: "Inscriptions fermées",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    in_progress: {
      label: "En cours",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    completed: {
      label: "Terminée",
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    cancelled: {
      label: "Annulée",
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      bg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  };
  return configs[status] ?? configs.open_registration;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default TournamentAccordion;