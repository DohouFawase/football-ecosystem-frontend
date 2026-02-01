"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const FeaturesSection = () => {
  const features = [
    {
      title: "Competition Hub",
      desc: "Launch leagues and tournaments with customizable rules in minutes.",
      icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17M14 14.66V17M18 9.22V14.66a6 6 0 0 1-12 0V9.22c0-1.5 1-3.22 3-3.22h6c2 0 3 1.72 3 3.22Z"/></svg>
    },
    {
      title: "Scouting Network",
      desc: "Professional evaluations with technical, physical, and mental ratings.",
      icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 8v8"/></svg>
    },
    {
      title: "Live Analytics",
      desc: "Real-time match events and comprehensive stats synced globally.",
      icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
    },
    {
      title: "Market Insight",
      desc: "Manage transfers with agent integration and contract automation.",
      icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
    },
    {
      title: "Financial Suite",
      desc: "Fees, prizes, and payments handled securely in one ecosystem.",
      icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
    },
    {
      title: "Global Reach",
      desc: "Optimized mobile access tailored for global connectivity.",
      icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
    }
  ];

  return (
    <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Éléments de design en arrière-plan */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl opacity-50" />

      <Container size="xl">
        <div className="relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-24">
            <Badge label="Core Capabilities" status="success" />
            <h2 className="mt-6 text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
              BUILT FOR THE <br />
              <span className="text-blue-600 italic">NEXT GEN.</span>
            </h2>
            <p className="mt-8 text-xl text-slate-500 font-medium max-w-xl">
              A comprehensive toolkit engineered for football federations, scouts, and professional leagues.
            </p>
          </div>

          {/* Grille de Features Créative */}
          <Grid cols={3} gap={6}>
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group p-10 rounded-[3rem] border border-slate-100 bg-white/70 backdrop-blur-xl hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-slate-200/50"
              >
                <div className="flex flex-col h-full">
                  {/* Icon Box */}
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors duration-500">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-white uppercase italic tracking-tighter mb-4 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-500 group-hover:text-blue-100 font-medium leading-relaxed transition-colors">
                    {feature.desc}
                  </p>

                  {/* Bouton de détail subtil */}
                  <div className="mt-auto pt-8 flex justify-end">
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-white/50 group-hover:rotate-45 transition-all">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-400 group-hover:text-white"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
};