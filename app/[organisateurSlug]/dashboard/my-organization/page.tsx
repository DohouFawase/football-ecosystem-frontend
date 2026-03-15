"use client";

import React from 'react';
import { useOrgs } from "@/context/OrgContext";
import { 
  Loader2, Globe, Mail, Phone, MapPin, 
  Building2, FileText, Download, ShieldCheck, 
  ExternalLink, ArrowUpRight 
} from 'lucide-react';

export default function Page() {
    const { organizations, isInitialized } = useOrgs();
    const org = organizations && organizations.length > 0 ? organizations[0] : null;

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <div className="relative">
                    <Loader2 className="animate-spin text-slate-900" size={48} strokeWidth={1} />
                    <div className="absolute inset-0 blur-xl bg-slate-200/50 -z-10 rounded-full" />
                </div>
                <p className="text-slate-400 font-medium tracking-[0.3em] text-[10px] mt-8 uppercase">Chargement de l'univers</p>
            </div>
        );
    }

    if (!org) {
        return (/* ... Ton code Empty State précédent ... */ null);
    }

    return (
        <main className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 font-sans text-slate-900">
            <div className="mx-auto max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                
                {/* HEADER SECTION - NO GRADIENT, PURE DEPTH */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 bg-white border border-slate-100 rounded-[2.5rem] p-10 relative overflow-hidden shadow-sm">
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-[2rem] bg-slate-50 border border-slate-100 p-1 flex items-center justify-center overflow-hidden shadow-inner">
                                    <img 
                                        src={org.logoUrl || "https://via.placeholder.com/150"} 
                                        alt="Logo" 
                                        className="h-full w-full rounded-[1.8rem] object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg border border-slate-50">
                                    <ShieldCheck size={20} className="text-blue-600" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {org.status}
                                </div>
                                <h1 className="text-5xl font-black tracking-tight leading-none text-slate-900">
                                    {org.name}
                                </h1>
                                <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                                    <Building2 size={14} />
                                    {org.industry} — {org.registrationNumber}
                                </p>
                            </div>
                        </div>
                        {/* Motif de fond subtil */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                            <Building2 size={200} />
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                <ArrowUpRight size={24} className="text-blue-400" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Organiateur</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium opacity-60 mb-1">Propriétaire</p>
                            <p className="font-bold truncate text-lg tracking-tight">{org.owner?.email.split('@')[0]}</p>
                            <p className="text-[10px] opacity-40 truncate">{org.owner?.email}</p>
                        </div>
                    </div>
                </section>

                {/* BENTO CONTENT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* INFO BLOCK */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 flex items-center gap-4">
                                Identity & Bio <div className="h-px flex-1 bg-slate-50" />
                            </h3>
                            <p className="text-xl leading-relaxed text-slate-600 font-medium italic">
                                "{org.description || "Aucune description n'a été rédigée pour le moment."}"
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12 pt-10 border-t border-slate-50">
                                <InfoItem label="Email Direct" value={org.email} icon={<Mail />} />
                                <InfoItem label="Ligne Téléphonique" value={org.phone} icon={<Phone />} />
                                <InfoItem label="Portail Web" value={org.website} icon={<Globe />} />
                                <InfoItem label="Siège Social" value={org.address} icon={<MapPin />} />
                            </div>
                        </section>

                        {/* DOCUMENT SECTION - THE ONE YOU ASKED FOR */}
                        <section className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Official Archives</h3>
                                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Verified</span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {org.documents?.map((doc: any, i: number) => (
                                    <div key={i} className="group cursor-pointer flex items-center justify-between p-6 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
                                        <div className="flex items-center gap-5">
                                            <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:rotate-6 transition-transform">
                                                <FileText size={20} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-black text-xs uppercase tracking-widest text-slate-900">{doc.type}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Format PDF • 2.4 MB</p>
                                            </div>
                                        </div>
                                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                                            <Download size={18} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* SIDEBAR METRICS */}
                    <div className="space-y-8">
                        <section className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Activity</p>
                            <div className="space-y-6">
                                <Metric icon={<FileText />} label="Ligues Gérées" value={org._count?.leagues || 0} color="text-slate-900" />
                                <Metric icon={<ShieldCheck />} label="Statut KYC" value="Validé" color="text-emerald-500" />
                            </div>
                        </section>

                        <div className="p-1 border border-slate-100 rounded-[2.5rem] bg-white shadow-sm group overflow-hidden">
                            <button className="w-full bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white rounded-[2.2rem] py-10 transition-all duration-700 flex flex-col items-center gap-4">
                                <ExternalLink size={24} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Console Organisateur</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

/* COMPOSANTS UTILITAIRES POUR UN CODE PROPRE */

function InfoItem({ label, value, icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="space-y-3 group">
            <div className="flex items-center gap-3 text-slate-400">
                {React.cloneElement(icon, { size: 16, strokeWidth: 2.5 })}
                <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <p className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors cursor-pointer">
                {value || "Non renseigné"}
            </p>
        </div>
    );
}

function Metric({ icon, label, value, color }: { icon: any, label: string, value: any, color: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="text-slate-200">{React.cloneElement(icon, { size: 18 })}</div>
                <span className="text-xs font-bold text-slate-400">{label}</span>
            </div>
            <span className={`text-xl font-black italic ${color}`}>{value}</span>
        </div>
    );
}