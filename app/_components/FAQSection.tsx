"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';

export const FAQSection = () => {
  const faqs = [
    {
      id: "01",
      title: "HOW DO I GET STARTED?",
      content: "Simply sign up for a free account, choose your role (organization, team, or player), and complete your profile. You can create your first competition or join an existing one immediately."
    },
    {
      id: "02",
      title: "IS THERE A MOBILE APP?",
      content: "Yes! Our platform is mobile-first and works perfectly on all devices. Native iOS and Android apps are currently in development and will be available soon."
    },
    {
      id: "03",
      title: "HOW DOES THE LIVE SCORING WORK?",
      content: "Each match is assigned an operator who updates scores and events (goals, cards, substitutions) in real-time through our mobile app."
    },
    {
      id: "04",
      title: "CAN I TRY BEFORE I BUY?",
      content: "Absolutely! All paid plans come with a 14-day free trial. No credit card required. You can also use our free plan indefinitely."
    },
    {
      id: "05",
      title: "IS MY DATA SECURE?",
      content: "Yes. We use bank-level encryption, secure cloud hosting, and comply with international data protection standards. Your data is backed up daily."
    }
  ];

  // On prépare les items pour ton composant Accordion
  // On injecte du JSX dans le titre pour garder le style "Bespoke"
  const accordionItems = faqs.map((faq) => ({
    id: faq.id,
    title: (
      <div className="flex items-center gap-6 py-2">
        <span className="text-[10px] font-black text-blue-600 tracking-[0.3em]">
          {faq.id}
        </span>
        <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase">
          {faq.title}
        </span>
      </div>
    ),
    content: (
      <div className="pl-14 pb-6 text-sm font-bold text-slate-500 leading-relaxed uppercase tracking-tight">
        {faq.content}
      </div>
    )
  }));

  return (
    <section id="faq" className="py-40 bg-white relative overflow-hidden">
      {/* Background Decor Soft */}
      <div className="absolute top-0 right-0 w-[30%] h-full bg-slate-50/50 -skew-x-12 translate-x-20 pointer-events-none" />

      <Container size="xl">
        {/* HEADER (Cohérent avec ton Pricing) */}
        <div className="relative mb-32">
          <div className="absolute -left-10 -top-20 text-[180px] font-black text-slate-50/80 select-none leading-none uppercase pointer-events-none">
            ANSWERS
          </div>
          <div className="relative z-10 flex flex-col items-start">
            <Badge label="Support Center" status="info" />
            <h2 className="mt-6 text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
              Common <br />
              <span className="text-blue-600 italic underline decoration-slate-100 underline-offset-8">Questions.</span>
            </h2>
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Côté gauche : Intro */}
          <div className="lg:col-span-4 flex flex-col justify-between py-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] leading-loose">
              Everything you need to know <br /> 
              about the future of <br /> 
              football management.
            </p>
            <div className="hidden lg:block">
              <div className="w-12 h-1 bg-blue-600 rounded-full mb-6" />
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                Scroll to explore
              </p>
            </div>
          </div>

          {/* Côté droit : Utilisation de ton composant Accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-slate-100 bespoke-accordion">
              <Accordion 
                items={accordionItems}
                // Si ton composant Accordion accepte des classes :
                className="divide-y divide-slate-100" 
              />
            </div>
          </div>
        </div>
      </Container>

      {/* CSS Additionnel pour rendre l'Accordion "Bespoke" */}
      <style jsx global>{`
        .bespoke-accordion button {
          padding-top: 2rem !important;
          padding-bottom: 2rem !important;
          transition: all 0.5s ease !important;
        }
        .bespoke-accordion button:hover {
          background-color: #f8fafc !important; /* slate-50 */
          padding-left: 1rem !important;
        }
        .bespoke-accordion [data-state='open'] button {
          color: #2563eb !important; /* blue-600 */
        }
      `}</style>
    </section>
  );
};