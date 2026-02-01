"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Grid } from '@/components/ui/Grid';

export const TargetAudienceSection = () => {
  const audiences = [
    { title: "Schools", label: "Academics", desc: "Organize inter-school cups and build student athlete portfolios.", color: "from-blue-600 to-indigo-600" },
    { title: "Amateur Clubs", label: "Grassroots", desc: "Manage rosters and give your players professional digital exposure.", color: "from-slate-800 to-slate-900" },
    { title: "Pro Scouts", label: "Talent", desc: "Access the largest database of African talent with detailed analytics.", color: "from-blue-600 to-indigo-600" },
    { title: "Players", label: "Athletes", desc: "Build your professional career history and get discovered globally.", color: "from-slate-800 to-slate-900" },
    { title: "Coaches", label: "Tactics", desc: "Analyze performance and develop winning strategies with live data.", color: "from-blue-600 to-indigo-600" },
    { title: "Organizers", label: "Events", desc: "Run professional tournaments with automated scheduling and scoring.", color: "from-slate-800 to-slate-900" }
  ];

  return (
    <section id="target-audience" className="py-32 bg-white overflow-hidden">
      <Container size="xl">
        
        {/* Header Style "Elite" */}
        <div className="relative mb-32 text-right flex flex-col items-end">
          <div className="absolute -right-20 -top-20 text-[200px] font-black text-slate-50/90 select-none tracking-tighter uppercase">
            COMMUNITY
          </div>
          <div className="relative z-10">
             <Badge label="Ecosystem Stakeholders" status="success" />
             <h2 className="mt-6 text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
               BUILT FOR <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 italic">EVERY PLAYER.</span>
             </h2>
          </div>
        </div>

        {/* Grille Créative Asymétrique */}
        <div className="relative">
          <Grid cols={3} gap={6}>
            {audiences.map((audience, index) => (
              <div 
                key={index} 
                className={`group relative p-10 rounded-[3.5rem] transition-all duration-500 border border-slate-50
                ${index % 2 !== 0 ? 'lg:mt-12 bg-slate-50/40' : 'bg-white shadow-xl shadow-slate-100'}`}
              >
                {/* Background Label (Stroke effect) */}
                <div className="absolute top-8 right-10 text-4xl font-black text-transparent opacity-10 group-hover:opacity-100 transition-opacity"
                     style={{ WebkitTextStroke: '1.5px #64748b' }}>
                  {audience.label}
                </div>

                <div className="relative z-10">
                  {/* Icon Hexagone Style */}
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${audience.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:-rotate-12 transition-transform duration-500`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>

                  <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 leading-none">
                    {audience.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed text-sm mb-8">
                    {audience.desc}
                  </p>

                  {/* Bouton d'action minimaliste */}
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 group-hover:gap-4 transition-all">
                    Explore Solutions <span className="text-lg">→</span>
                  </button>
                </div>

                {/* Décoration de coin */}
                <div className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-600 group-hover:scale-[3] transition-all" />
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
};