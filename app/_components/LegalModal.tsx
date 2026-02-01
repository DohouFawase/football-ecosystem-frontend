"use client";

import React, { useState } from 'react';

// 1. Définition de l'interface pour les types des props
interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "privacy" | "terms";
}

export const LegalModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = "privacy" 
}) => {
  // Typage de l'état pour n'accepter que nos deux onglets
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(defaultTab);

  if (!isOpen) return null;

  return (
   
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Overlay avec flou artistique */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-5xl h-full max-h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">
        
        {/* Header du Modal */}
        <div className="px-8 md:px-16 py-10 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex gap-8">
            {(["privacy", "terms"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative pb-2 ${
                  activeTab === tab ? "text-blue-600" : "text-slate-300 hover:text-slate-900"
                }`}
              >
                {tab === "privacy" ? "Privacy Policy" : "Terms of Service"}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-full animate-in fade-in slide-in-from-left-2" />
                )}
              </button>
            ))}
          </div>

          {/* Bouton Close en SVG Brut */}
          <button 
            onClick={onClose} 
            className="group p-2 hover:bg-slate-50 rounded-full transition-all duration-300"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-slate-400 group-hover:text-slate-900 group-hover:rotate-90 transition-transform duration-500"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Contenu Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 md:px-16 py-12 bespoke-scroll bg-white">
          {activeTab === "privacy" ? <PrivacyContent /> : <TermsContent />}
        </div>

        {/* Footer du Modal */}
        <div className="px-8 md:px-16 py-8 bg-slate-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Version 2.0.26</span>
            </div>
            <button 
                onClick={onClose}
                className="text-[10px] font-black text-white bg-slate-900 px-10 py-4 rounded-full uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
                Accept & Close
            </button>
        </div>
      </div>

      <style jsx>{`
        .bespoke-scroll::-webkit-scrollbar { width: 5px; }
        .bespoke-scroll::-webkit-scrollbar-track { background: #f8fafc; }
        .bespoke-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .bespoke-scroll::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

// --- CONTENUS ---
const PrivacyContent: React.FC = () => (
  <div className="max-w-3xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <section>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-black text-blue-600">01</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
      <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">Data Collection</h3>
      <p className="text-sm font-bold text-slate-500 leading-[1.8] uppercase tracking-tight">
        We collect professional data essential for football management: Player stats, organizational details, and performance metrics. We do not sell your personal data to third parties.
      </p>
    </section>
    
    <section>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-black text-blue-600">02</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
      <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">Security Systems</h3>
      <p className="text-sm font-bold text-slate-500 leading-[1.8] uppercase tracking-tight">
        All data is encrypted via AES-256 and hosted on secure cloud environments. Your financial transactions are handled by PCI-DSS compliant partners.
      </p>
    </section>
  </div>
);

const TermsContent: React.FC = () => (
  <div className="max-w-3xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <section>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-black text-blue-600">01</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
      <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">Platform Usage</h3>
      <p className="text-sm font-bold text-slate-500 leading-[1.8] uppercase tracking-tight">
        By using the Football Ecosystem platform, you agree to provide accurate information regarding competitions and player identities to maintain the integrity of the network.
      </p>
    </section>

    <section>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-black text-blue-600">02</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
      <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">Subscription</h3>
      <p className="text-sm font-bold text-slate-500 leading-[1.8] uppercase tracking-tight">
        Paid plans are billed monthly or annually. Cancellations take effect at the end of the current billing cycle. No refunds for partial months of service.
      </p>
    </section>
  </div>
);