"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const CTASection = () => {
  return (
    <section id="cta" className="py-60 bg-white relative overflow-hidden">
      {/* Fond Décoratif - Identité de marque */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-slate-50/60 tracking-tighter uppercase leading-none select-none">
          VICTORY
        </div>
      </div>

      <Container size="xl">
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Badge Signature */}
          <Badge label="Join the Movement" status="success" />

          {/* Titre Monumental */}
          <h2 className="mt-12 text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.8] uppercase italic">
            READY TO <br />
            <span className="text-blue-600">CHANGE THE GAME?</span>
          </h2>

          {/* Description Soft */}
          <p className="mt-12 text-xs md:text-sm font-black text-slate-400 uppercase tracking-[0.5em] max-w-xl leading-relaxed">
            The toolkit engineered for those who <br />
            build the future of football.
          </p>

          {/* Actions Bespoke */}
          <div className="mt-20 flex flex-col md:flex-row items-center gap-12">
            
            {/* Bouton Principal - Le "Pill" Cinétique */}
            <Button
              className="group relative h-24 px-16 rounded-full! bg-slate-900 text-white overflow-hidden transition-all duration-500 hover:px-24 hover:bg-blue-600"
            >
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">Get Started Free</span>
              <div className="absolute right-8 opacity-0 group-hover:opacity-100 group-hover:right-10 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Button>

            {/* Bouton Secondaire - Ligne Minimaliste */}
            <button className="group flex items-center gap-4 text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] transition-all">
              Request a demo
              <div className="w-12 h-px bg-slate-900 group-hover:w-24 group-hover:bg-blue-600 transition-all duration-500" />
            </button>
          </div>

          {/* Trust Line avec SVG cinétique */}
          <div className="mt-40 w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-slate-100">
            {[
              { label: "NO CREDIT CARD", icon: "✓" },
              { label: "INSTANT SETUP", icon: "⚡" },
              { label: "14-DAY TRIAL", icon: "★" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-blue-600 font-bold">{item.icon}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>

        </div>
      </Container>

      {/* Signature Verticale - Identité Lab */}
      <div className="absolute right-10 bottom-20 hidden xl:block">
        <span className="text-[9px] font-black text-slate-200 uppercase tracking-[1em] [writing-mode:vertical-lr] rotate-180">
          DESIGNED_BY_UI_KIT_LAB
        </span>
      </div>
    </section>
  );
};