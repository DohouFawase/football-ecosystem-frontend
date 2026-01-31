"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOrgModal = ({ isOpen, onClose }: ModalProps) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    legalName: '',
    registrationNumber: '',
    email: '',
    phone: '',
    address: '',
    website: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const Icons = {
    Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/></svg>,
    Contact: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>,
    CheckCircle: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    Globe: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 transition-all duration-500">
        
        {!isSuccess ? (
          <>
            <div className="p-10 pb-4">
              <div className="flex justify-between items-center mb-8">
                <div className={`p-4 rounded-2xl transition-all duration-500 ${step === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'}`}>
                  {step === 1 ? <Icons.Building /> : <Icons.Contact />}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                {step === 1 ? "Identity" : "Contact & Legal"}
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
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Org Name</label>
                      <input required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-lg" placeholder="e.g. Dakar Academy" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Website</label>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Globe /></div>
                        <input className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" placeholder="www.your-site.com" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})}/>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission</label>
                      <textarea rows={2} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-medium text-slate-600" placeholder="A brief vision..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                      <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" placeholder="contact@org.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                      <input className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" placeholder="+221..." value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reg. Number</label>
                      <input className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" placeholder="ID-00X" value={formData.registrationNumber} onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}/>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Address</label>
                      <input className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" placeholder="Street, City, Country" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 flex gap-4">
                {step === 2 && (
                  <Button variant="ghost" type="button" className="h-16 px-8 font-bold text-slate-400" onClick={() => setStep(1)}>Back</Button>
                )}
                <Button 
                  type={step === 1 ? "button" : "submit"}
                  onClick={() => step === 1 && setStep(2)}
                  className={`flex-1 h-16 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${
                    step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                  }`}
                >
                  {step === 1 ? <>Continue <Icons.ArrowRight /></> : <>Build My Legacy</>}
                </Button>
              </div>
            </form>
          </>
        ) : (
          /* SUCCESS VIEW */
          <div className="p-16 text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-emerald-100 animate-bounce">
              <Icons.CheckCircle />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">Submitted!</h2>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
              Your organization <span className="text-slate-900 font-bold">&quot;{formData.name}&quot;</span> is now being reviewed.
            </p>
            <Button onClick={onClose} className="w-full h-16 bg-slate-900 text-white rounded-2xl font-bold">Close Portal</Button>
          </div>
        )}
      </div>
    </div>
  );
};