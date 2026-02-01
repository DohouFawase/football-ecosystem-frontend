"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

export const HowItWorksSection = () => {
  const steps = [
    { step: "01", title: "Create Identity", desc: "Join as an organization or scout. Build your professional profile in seconds.", color: "from-blue-600 to-indigo-600" },
    { step: "02", title: "Launch League", desc: "Define rules, set match schedules, and invite teams to your ecosystem.", color: "from-slate-800 to-slate-900" },
    { step: "03", title: "Live Ops", desc: "Update scores live while stats are synced globally in real-time.", color: "from-blue-600 to-indigo-600" },
    { step: "04", title: "Scale Careers", desc: "Connect talents with our global scouting network and FIFA agents.", color: "from-slate-800 to-slate-900" }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white overflow-hidden">
      <Container size="xl">
        
        {/* Header Ultra-Moderne */}
        <div className="relative mb-32">
          <div className="absolute -left-10 -top-20 text-[200px] font-black text-slate-50/90 select-none">
            WORKFLOW
          </div>
          <div className="relative z-10 flex flex-col items-start">
             <Badge label="Operational Excellence" status="success" />
             <h2 className="mt-6 text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
               THE ROAD TO <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">VICTORY.</span>
             </h2>
          </div>
        </div>

        {/* Layout Créatif Asymétrique */}
        <div className="relative">
          {/* Ligne décorative en arrière-plan */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((item, index) => (
              <div 
                key={index} 
                className={`relative p-8 rounded-[3rem] transition-all duration-500 group
                ${index % 2 !== 0 ? 'lg:mt-20 bg-slate-50/50' : 'bg-white'}`}
              >
                {/* Numéro flottant avec effet de contour (Stroke) */}
                <div className="absolute -top-12 right-6 text-8xl font-black text-transparent stroke-slate-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ WebkitTextStroke: '2px #e2e8f0' }}>
                  {item.step}
                </div>

                <div className="relative z-10">
                  {/* Icone Stylisée */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed text-sm mb-8">
                    {item.desc}
                  </p>

                  {/* Barre de progression personnalisée */}
                  <div className="relative h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className={`absolute top-0 left-0 h-full bg-gradient-to-r ${item.color} w-0 group-hover:w-full transition-all duration-700 ease-out`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};