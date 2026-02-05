"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, Tv, Zap, TrendingUp, AlertOctagon, 
  ArrowUpRight, Users, CreditCard, Activity, Globe,
  Lock, Unlock, ChevronRight, Download, Search
} from 'lucide-react';

// --- Simulation de Données ---
const COMPETITIONS = ["Ligue Pro", "Coupe du Bénin", "Ligue Nationale"];

const FinanceCommandCenter = () => {
  const [activeComp, setActiveComp] = useState("Ligue Pro");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-6 lg:p-10 font-sans">
      
      <div className="max-w-7xl mx-auto">
        
        {/* --- TOP HEADER NAVIGATION --- */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                <ShieldCheck size={22} className="text-white" />
              </div>
            </div>
            <p className="text-slate-500 text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Console de Supervision • Bénin
            </p>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              {COMPETITIONS.map(c => (
                <button 
                  key={c}
                  onClick={() => setActiveComp(c)}
                  className={`px-5 py-2 rounded-lg text-xs font-black transition-all ${
                    activeComp === c 
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' 
                    : 'text-slate-500 hover:text-indigo-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </nav>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Download size={18} className="text-slate-600" />
            </button>
          </div>
        </header>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLONNE GAUCHE (8 colonnes) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* KPI Cards Lumineuses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard title="Capital Engagé" value="84.2M" trend="+12%" icon={<CreditCard />} color="indigo" />
              <MetricCard title="Encaissements" value="52.1M" trend="+8%" icon={<TrendingUp />} color="emerald" />
              <MetricCard title="Opérations" value="14.5M" trend="-2%" icon={<Activity />} color="rose" />
            </div>

            {/* Graphique Cashflow Neutre */}
            <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 uppercase italic">
                    <TrendingUp className="text-indigo-600" size={20} /> Flux de Trésorerie
                  </h2>
                  <p className="text-slate-400 text-xs font-bold uppercase mt-1">Prévisions vs Réel (FCFA)</p>
                </div>
                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> Entrées</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-200"></span> Sorties</span>
                </div>
              </div>
              <div className="flex items-end justify-between h-56 gap-4">
                <SmartBar height="40%" label="SEP" value="12M" />
                <SmartBar height="60%" label="OCT" value="18M" />
                <SmartBar height="50%" label="NOV" value="15M" />
                <SmartBar height="85%" label="DEC" value="28M" active />
                <SmartBar height="35%" label="JAN" value="10M" />
                <SmartBar height="95%" label="FEB" value="32M" />
              </div>
            </section>

            {/* Contrats Média & Sponsoring */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-slate-800 uppercase text-sm italic">Droits TV Broadcast</h3>
                  <Tv size={18} className="text-indigo-600" />
                </div>
                <div className="space-y-4">
                  <MediaRow name="ORTOB Bénin" status="Confirmé" amount="25M" progress={100} color="bg-indigo-600" />
                  <MediaRow name="Canal+ Sport" status="Négociation" amount="40M" progress={45} color="bg-indigo-400" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-slate-800 uppercase text-sm italic">Sponsoring Majeur</h3>
                  <Zap size={18} className="text-amber-500" />
                </div>
                <div className="space-y-4">
                  <MediaRow name="MTN Bénin" status="Partiel" amount="15M" progress={60} color="bg-amber-500" />
                  <MediaRow name="Moov Africa" status="Confirmé" amount="12M" progress={100} color="bg-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE (4 colonnes) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Contrôle Opérateurs (Le cœur du système) */}
            <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-black uppercase tracking-tight text-slate-800 italic">Accès Opérateurs</h2>
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                  <Search size={14} className="text-slate-400" />
                </div>
              </div>

              <div className="space-y-3">
                <OperatorLock club="Coton FC" isLocked={false} />
                <OperatorLock club="Loto FC" isLocked={false} />
                <OperatorLock club="Requins FC" isLocked={true} reason="Reliquat (1.5M)" />
                <OperatorLock club="Aspac" isLocked={false} />
                <OperatorLock club="Dragons FC" isLocked={true} reason="Litige Inscr." />
                <OperatorLock club="Ayéma FC" isLocked={false} />
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/50 -mx-8 -mb-8 p-8">
                <div className="flex items-center gap-3 text-rose-600 mb-2">
                  <AlertOctagon size={18} />
                  <p className="text-[10px] font-black uppercase tracking-wider">Sécurité des données</p>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  Le déverrouillage de la saisie est automatisé dès réception du virement sur le compte central.
                </p>
              </div>
            </section>

            {/* CTA IA Analysis */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-2 uppercase italic tracking-tighter text-white">Rapport Prédictif</h3>
                <p className="text-indigo-100 text-[11px] font-medium leading-snug mb-6">Analyses des revenus pour le prochain tour de la compétition.</p>
                <div className="flex items-center gap-2 font-black text-xs uppercase bg-white/10 w-fit px-4 py-2 rounded-full group-hover:bg-white/20 transition-all">
                  Générer <ChevronRight size={14} />
                </div>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- SOUS-COMPOSANTS ---

const MetricCard = ({ title, value, trend, icon, color }: any) => {
  const iconColors: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600"
  };
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:border-indigo-200 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${iconColors[color]}`}>{icon}</div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
      <h4 className="text-2xl font-black text-slate-900 mt-0.5">{value} <span className="text-xs font-bold text-slate-300">FCFA</span></h4>
    </div>
  );
};

const SmartBar = ({ height, label, value, active = false }: any) => (
  <div className="flex flex-col items-center flex-1 group h-full">
    <div className="relative w-full flex flex-col items-center flex-1 justify-end">
      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-white text-[9px] font-black px-2 py-1 rounded shadow-xl">
        {value}
      </div>
      <div 
        style={{ height }} 
        className={`w-full max-w-[40px] rounded-t-lg transition-all duration-700 ${
          active ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-100 group-hover:bg-slate-200'
        }`}
      ></div>
    </div>
    <span className="text-[10px] font-black text-slate-400 mt-4">{label}</span>
  </div>
);

const MediaRow = ({ name, status, amount, progress, color }: any) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-2 text-xs font-bold">
      <span className="text-slate-700">{name}</span>
      <span className="text-indigo-600">{amount}</span>
    </div>
    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
      <div style={{ width: `${progress}%` }} className={`${color} h-full rounded-full transition-all duration-1000`}></div>
    </div>
    <p className="text-[9px] text-slate-400 mt-2 font-black uppercase tracking-tighter italic">{status}</p>
  </div>
);

const OperatorLock = ({ club, isLocked, reason }: any) => (
  <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
    isLocked ? 'bg-rose-50/50 border-rose-100' : 'bg-white border-slate-100 hover:border-indigo-100 shadow-sm'
  }`}>
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${isLocked ? 'bg-white text-rose-500 shadow-sm' : 'bg-indigo-50 text-indigo-600'}`}>
        {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
      </div>
      <div>
        <p className="text-xs font-black text-slate-800">{club}</p>
        {isLocked && <p className="text-[9px] text-rose-500 font-bold uppercase">{reason}</p>}
      </div>
    </div>
    {!isLocked && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></div>}
  </div>
);

export default FinanceCommandCenter;