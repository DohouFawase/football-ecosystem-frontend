"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { FetchMyOrganization } from '@/actions/organization/registeOrganization';
import { useEffect } from 'react';
import { Building2, Mail, Phone, Globe, MapPin, FileText, Users, Shield, ExternalLink, AlertCircle } from "lucide-react";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();

  const myOrg = useSelector((state: RootState) => state.org.myOrg);
  const myOrgStatus = useSelector((state: RootState) => state.org.myOrgStatus);
  const myOrgError = useSelector((state: RootState) => state.org.myOrgError);

  useEffect(() => {
    dispatch(FetchMyOrganization());
  }, [dispatch]);

  // ─── idle + loading = on affiche le loader ─────────────────────
  if (myOrgStatus === "idle" || myOrgStatus === "loading") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-slate-900 border-t-transparent animate-spin" />
          <p className="text-slate-500 font-medium">Chargement de votre organisation...</p>
        </div>
      </main>
    );
  }

  if (myOrgStatus === "failed") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Erreur de chargement</h3>
          <p className="text-slate-500">{myOrgError}</p>
        </div>
      </main>
    );
  }

  if (!myOrg) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
            <Building2 className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune organisation</h3>
          <p className="text-slate-500">Vous n'avez pas encore créé d'organisation.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Mon Organisation</h1>
                <p className="text-sm text-slate-500 mt-0.5">Gérez les informations de votre structure</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
                {myOrg.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Bannière & Logo ──────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="h-48 bg-slate-900 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="relative px-8 -mt-16 pb-8">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-xl ring-4 ring-white flex-shrink-0">
                {myOrg.logoUrl ? (
                  <img 
                    src={myOrg.logoUrl} 
                    alt="Logo" 
                    className="h-full w-full rounded-xl object-cover" 
                  />
                ) : (
                  <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-900">
                    {myOrg.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 pb-2">
                <h2 className="text-3xl font-bold text-slate-900 mb-1">{myOrg.name}</h2>
                <p className="text-slate-500 font-medium">{myOrg.legalName}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Colonne principale ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* À propos */}
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> À propos
                </h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed mb-6">
                  {myOrg.description || "Aucune description renseignée."}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InfoItem 
                    icon={Mail} 
                    label="Email" 
                    value={myOrg.email} 
                    isLink 
                    href={`mailto:${myOrg.email}`}
                  />
                  <InfoItem 
                    icon={Phone} 
                    label="Téléphone" 
                    value={myOrg.phone} 
                  />
                  <InfoItem 
                    icon={Globe} 
                    label="Site Web" 
                    value={myOrg.website} 
                    isLink 
                    href={myOrg.website?.startsWith('http') ? myOrg.website : `https://${myOrg.website}`}
                  />
                  <InfoItem 
                    icon={MapPin} 
                    label="Adresse" 
                    value={myOrg.address} 
                  />
                </div>
              </div>
            </section>

            {/* Documents */}
            {myOrg.documents && myOrg.documents.length > 0 && (
              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Documents Officiels
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {myOrg.documents.map((doc: any, i: number) => (
                      <a 
                        key={i} 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs group-hover:bg-slate-200 transition-colors">
                          PDF
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 capitalize truncate">{doc.type}</p>
                          <p className="text-xs text-slate-500">Document officiel</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            
            {/* Propriétaire */}
            {myOrg.owner && (
              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Propriétaire
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-bold">
                      {myOrg.owner.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">
                        {myOrg.owner.firstName && myOrg.owner.lastName
                          ? `${myOrg.owner.firstName} ${myOrg.owner.lastName}`
                          : myOrg.owner.email}
                      </p>
                      <p className="text-xs text-slate-500">Contact Principal</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Vérification KYC</span>
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium border",
                        myOrg.owner.kycStatus === "VERIFIED" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      )}>
                        {myOrg.owner.kycStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Statistiques */}
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Statistiques
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Ligues créées</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {myOrg._count?.leagues ?? 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
              </div>
            </section>

            {/* ID Organisation */}
            <section className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">ID Organisation</p>
              <p className="font-mono text-sm text-slate-700 break-all">{myOrg.id}</p>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────────────

function InfoItem({ 
  icon: Icon, 
  label, 
  value, 
  isLink = false, 
  href 
}: { 
  icon: React.ElementType;
  label: string; 
  value?: string | null; 
  isLink?: boolean;
  href?: string;
}) {
  if (!value) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">{label}</p>
          <p className="text-sm text-slate-400 italic">Non renseigné</p>
        </div>
      </div>
    );
  }

  const content = (
    <>
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">{label}</p>
        <p className={cn(
          "text-sm font-medium truncate",
          isLink ? "text-slate-900 group-hover:text-slate-700" : "text-slate-900"
        )}>
          {value}
        </p>
      </div>
    </>
  );

  if (isLink && href) {
    return (
      <a href={href} className="group flex items-start gap-3 hover:bg-slate-50 p-2 -m-2 rounded-xl transition-colors">
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 p-2 -m-2">
      {content}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Trophy icon component (since it wasn't imported)
function Trophy({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}