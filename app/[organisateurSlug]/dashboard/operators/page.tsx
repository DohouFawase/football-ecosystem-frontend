"use client";

import React, { useState } from 'react';
import { 
  User, MapPin, Clock, AlertCircle, ShieldCheck, 
  Activity, ChevronRight, Wifi, WifiOff, Phone, 
  Mail, Fingerprint, BarChart3 
} from 'lucide-react';

// --- Ton Composant Modal Intégré ---
const Modal = ({ isOpen, onClose, title, children, footer }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800 uppercase tracking-tighter italic font-black">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✕</button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

const OperatorSupervision = () => {
  const [selectedOp, setSelectedOp] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [operations] = useState([
    {
      id: 'm1',
      match: "Coton FC vs Loto FC",
      stadium: "Stade de l'Amitié",
      operator: { 
        name: "Jean Kouassi", 
        phone: "+229 97 00 00 01", 
        email: "j.kouassi@ligue.bj",
        isOnline: true, 
        lastSeen: "Maintenant",
        accuracy: "98%",
        device: "Android - Cotonou"
      },
      financeStatus: 'Approved',
      matchStatus: 'En cours'
    },
    {
      id: 'm2',
      match: "Requins FC vs ASPAC",
      stadium: "Stade René Pleven",
      operator: { 
        name: "Marc Sodjinou", 
        phone: "+229 96 00 00 02", 
        email: "m.sodjinou@ligue.bj",
        isOnline: false, 
        lastSeen: "il y a 10 min",
        accuracy: "85%",
        device: "iPhone - Porto-Novo"
      },
      financeStatus: 'Blocked',
      matchStatus: 'A venir'
    }
  ]);

  const handleOpenDetails = (op: any) => {
    setSelectedOp(op);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER (Exactement comme avant) --- */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">Supervision Live</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1 flex items-center gap-2">
              <Activity size={14} className="text-indigo-600 animate-pulse" /> 
              Flux des matchs & Opérateurs en temps réel
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">Connectés</p>
                <p className="text-lg font-black text-emerald-500">12</p>
             </div>
          </div>
        </header>

        {/* --- LISTE DES MATCHS (Retour au design 3 colonnes) --- */}
        <div className="grid gap-6">
          {operations.map((op) => (
            <div key={op.id} className="group bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                
                {/* 1. Colonne Match */}
                <div className="lg:w-1/3 p-6 bg-slate-50/50 border-r border-slate-100">
                   <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase mb-3 inline-block ${
                     op.matchStatus === 'En cours' ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'
                   }`}>
                     {op.matchStatus}
                   </span>
                   <h3 className="text-lg font-black text-slate-800 mb-2">{op.match}</h3>
                   <p className="text-xs text-slate-500 flex items-center gap-2"><MapPin size={12} /> {op.stadium}</p>
                </div>

                {/* 2. Colonne Opérateur */}
                <div className="lg:w-1/3 p-6 flex items-center gap-4">
                   <div className="relative">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><User size={24} /></div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${op.operator.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                   </div>
                   <div>
                      <p className="font-bold text-slate-800">{op.operator.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                         {op.operator.isOnline ? (
                           <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><Wifi size={10}/> En ligne</span>
                         ) : (
                           <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><WifiOff size={10}/> {op.operator.lastSeen}</span>
                         )}
                      </div>
                   </div>
                </div>

                {/* 3. Colonne Finance & Action */}
                <div className="lg:w-1/3 p-6 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Finance</p>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${op.financeStatus === 'Approved' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-rose-600 bg-rose-50 border-rose-100'}`}>
                         {op.financeStatus === 'Approved' ? <ShieldCheck size={14} /> : <AlertCircle size={14} />}
                         <span className="text-[10px] font-black uppercase">{op.financeStatus}</span>
                      </div>
                   </div>
                   <button 
                     onClick={() => handleOpenDetails(op)}
                     className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg"
                   >
                      <ChevronRight size={20} />
                   </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL DE DÉTAILS --- */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Détails de l'Opération"
          footer={
            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
              Fermer
            </button>
          }
        >
          {selectedOp && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                  <Fingerprint size={24} />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-800">{selectedOp.operator.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{selectedOp.operator.device}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Précision</p>
                  <p className="text-xl font-black text-emerald-500">{selectedOp.operator.accuracy}</p>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Paiement Club</p>
                  <p className={`text-sm font-black uppercase ${selectedOp.financeStatus === 'Approved' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {selectedOp.financeStatus}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
                  <Phone size={14} className="text-indigo-500" />
                  <p className="text-xs font-bold">{selectedOp.operator.phone}</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
                  <Mail size={14} className="text-indigo-500" />
                  <p className="text-xs font-bold">{selectedOp.operator.email}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default OperatorSupervision;