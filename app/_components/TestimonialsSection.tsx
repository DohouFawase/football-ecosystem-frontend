"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Coach Amadou Diallo",
      role: "Head Coach, Dakar United FC",
      avatar: "AD",
      text: "This platform transformed how we manage our youth academy. We can now track every player's development and scouts have already contacted us!",
      tag: "Academy",
      color: "ring-blue-500"
    },
    {
      name: "Dr. Fatima Okonkwo",
      role: "Sports Director, Lagos Int. School",
      avatar: "FO",
      text: "Organizing our inter-school tournament used to take weeks. Now it takes hours. The live scoring feature is simply revolutionary for us.",
      tag: "Education",
      color: "ring-indigo-500"
    },
    {
      name: "Jean-Pierre Kouassi",
      role: "Pro Scout, Talent Africa",
      avatar: "JK",
      text: "Finally, a comprehensive database of African football talent! I've discovered players I would never have found otherwise. A true game-changer.",
      tag: "Scouting",
      color: "ring-slate-900"
    }
  ];

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // AUTO-PLAY STRICT (Sans bouton, sans pause)
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <section id="testimonials" className="py-32 bg-slate-50 overflow-hidden">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* GAUCHE : TITRE ET BARRE DE TEMPS DISCRÈTE */}
          <div className="relative">
            <div className="absolute -left-10 -top-24 text-[180px] font-black text-slate-200/40 select-none leading-none">
              VOICES
            </div>
            
            <div className="relative z-10">
              <Badge label="Elite Feedback" status="success" />
              <h2 className="mt-8 text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
                TRUSTED BY <br />
                <span className="text-blue-600 italic underline decoration-slate-200 underline-offset-8">THE ELITE.</span>
              </h2>
              
              <div className="mt-16">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Community Insights
                </p>
                {/* Ligne de progression automatique sans bouton */}
                <div className="flex gap-3">
                  {testimonials.map((_, i) => (
                    <div 
                      key={i} 
                      className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden w-16"
                    >
                      {i === activeIndex && (
                        <div className="absolute top-0 left-0 h-full bg-blue-600 animate-progress-fast" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DROITE : CARROUSEL AUTOMATIQUE */}
          <div className="relative h-[450px] w-full max-w-md mx-auto lg:mx-0">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;
              const isNext = index === (activeIndex + 1) % testimonials.length;

              return (
                <div
                  key={index}
                  className={`absolute inset-0 p-10 rounded-[3.5rem] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${isActive 
                      ? 'z-30 opacity-100 translate-x-0 translate-y-0 scale-100 bg-white shadow-2xl shadow-blue-900/10 border border-slate-100' 
                      : isNext 
                        ? 'z-20 opacity-40 translate-x-12 translate-y-8 scale-90 bg-slate-100 rotate-6 blur-[1px]' 
                        : 'z-10 opacity-0 -translate-x-24 rotate-[-12deg] scale-75'
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                      {item.tag}
                    </span>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-slate-100">
                      <path d="M10 11L8 17H5L7 11H5V7H11V11H10ZM18 11L16 17H13L15 11H13V7H19V11H18Z" fill="currentColor"/>
                    </svg>
                  </div>

                  <p className="text-2xl font-black leading-tight mb-10 tracking-tighter text-slate-900 italic">
                    &quot;{item.text}&quot;
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50 mt-auto">
                    <Avatar 
                      fallback={item.avatar} 
                      alt={item.name}
                      size="lg" 
                      className={`ring-4 ring-offset-4 ring-offset-white ${item.color}`} 
                    />
                    <div>
                      <h4 className="font-black uppercase tracking-tighter text-slate-900 leading-none mb-1">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-blue-600/70">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* AJOUTER CECI DANS TON FICHIER CSS GLOBAL OU TAILWIND CONFIG */}
      <style jsx>{`
        @keyframes progress-fast {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-fast {
          animation: progress-fast 5000ms linear forwards;
        }
      `}</style>
    </section>
  );
};