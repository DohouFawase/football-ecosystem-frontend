"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Pour la redirection
import { Button } from '@/components/ui/Button';
import { Loader2, Building2, Phone, Mail, Globe, MapPin, ArrowRight, CheckCircle2, Briefcase } from 'lucide-react';
import { useOrgs } from "@/context/OrgContext";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOrgModal = ({ isOpen, onClose }: ModalProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addOrganization } = useOrgs()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: 'Football Club', // Valeur par défaut
    website: '',
    email: '',
    phone: '',
    address: '',
    registrationNumber: '',
  });

  if (!isOpen) return null;

  // Fonction pour envoyer les données
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Simulation de l'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // --- L'ÉTAPE MANQUANTE EST ICI ---
      // On envoie les données au contexte AVANT la redirection
      addOrganization(formData); 
      // ---------------------------------

      setIsSuccess(true);
      
      // 2. Redirection après avoir montré le message de succès
      setTimeout(() => {
        onClose();
        router.push(`/organisations`); 
      }, 2000);

    } catch (error) {
      console.error("Erreur lors de la création", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 transition-all duration-500">
        
        {!isSuccess ? (
          <>
            {/* Header avec indicateur de progression */}
            <div className="p-10 pb-4">
              <div className="flex justify-between items-center mb-8">
                <div className={`p-4 rounded-2xl transition-all duration-500 ${step === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'}`}>
                  {step === 1 ? <Building2 size={24} /> : <Briefcase size={24} />}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors">
                  <XIcon />
                </button>
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                {step === 1 ? "Identity & Vision" : "Legal & Contact"}
              </h2>
              <div className="flex gap-1.5 mt-4">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 1 ? 'w-10 bg-blue-600' : 'w-4 bg-slate-100'}`} />
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 2 ? 'w-10 bg-blue-600' : 'w-4 bg-slate-100'}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-10 pt-4">
              <div className="min-h-[320px]">
                {step === 1 ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization Name</label>
                      <input 
                        required 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-lg" 
                        placeholder="e.g. Generation Foot" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Industry</label>
                        <select 
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none font-bold appearance-none"
                          value={formData.industry}
                          onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        >
                          <option>Football Club</option>
                          <option>Academy</option>
                          <option>Agency</option>
                          <option>Federation</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Website</label>
                        <div className="relative">
                          <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" placeholder="www.club.com" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})}/>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Statement</label>
                      <textarea rows={2} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-medium" placeholder="Describe the soul of your organization..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input required type="email" className="w-full pl-12 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none font-bold" placeholder="contact@club.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input className="w-full pl-12 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none font-bold" placeholder="+221..." value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reg. Number</label>
                      <input className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none font-bold" placeholder="REG-2024-XYZ" value={formData.registrationNumber} onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}/>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input className="w-full pl-12 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none font-bold" placeholder="Street, City, Country" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 flex gap-4">
                {step === 2 && !isLoading && (
                  <Button variant="ghost" type="button" className="h-16 px-8 font-bold text-slate-400" onClick={() => setStep(1)}>Back</Button>
                )}
                <Button 
                  type={step === 1 ? "button" : "submit"}
                  disabled={isLoading}
                  onClick={() => step === 1 && setStep(2)}
                  className={`flex-1 h-16 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
                    step === 1 ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : step === 1 ? (
                    <>Continue <ArrowRight size={20} /></>
                  ) : (
                    "Launch Organization"
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          /* SUCCESS VIEW */
          <div className="p-16 text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-emerald-100 animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">Organization Created!</h2>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
              Redirecting you to <span className="text-slate-900 font-bold">&quot;{formData.name}&quot;</span> management portal...
            </p>
            <Loader2 className="animate-spin mx-auto text-blue-600" size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

// Petit composant Icône X pour fermer
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);