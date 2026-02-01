"use client";

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BadgeStatus, ButtonVariant } from '@/types/uiTypes';

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "month",
      badge: "Perfect for getting started",
      badgeStatus: 'info' as BadgeStatus,
      features: [
        { text: "Up to 2 teams", included: true },
        { text: "1 active competition", included: true },
        { text: "Basic player profiles", included: true },
        { text: "Match scheduling", included: true },
        { text: "Live scoring", included: true },
        { text: "Basic statistics", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Scout reports", included: false },
        { text: "Transfer management", included: false }
      ],
      cta: "Start Free",
      ctaVariant: "outline" as ButtonVariant,
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      period: "month",
      badge: "Most Popular",
      badgeStatus: 'success' as BadgeStatus,
      features: [
        { text: "Unlimited teams", included: true },
        { text: "Unlimited competitions", included: true },
        { text: "Advanced player profiles", included: true },
        { text: "Complete statistics", included: true },
        { text: "Live scoring & timeline", included: true },
        { text: "Scout report system", included: true },
        { text: "Transfer market access", included: true },
        { text: "Priority support", included: true },
        { text: "Mobile app access", included: true }
      ],
      cta: "Start 14-Day Trial",
      ctaVariant: "primary" as ButtonVariant, // Adapté à tes types
      popular: true
    },
    {
      name: "Enterprise",
      price: "Bespoke", // Remplacé "Custom" pour le style, mais garde l'esprit
      period: "pricing",
      badge: "For large organizations",
      badgeStatus: 'warning' as BadgeStatus,
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Multi-organization management", included: true },
        { text: "API access", included: true },
        { text: "Custom branding", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Advanced integrations", included: true },
        { text: "Custom features", included: true },
        { text: "SLA guarantee", included: true },
        { text: "24/7 priority support", included: true }
      ],
      cta: "Contact Sales",
      ctaVariant: "outline" as ButtonVariant,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-40 bg-white relative overflow-hidden">
      {/* Background Decor Soft */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30" />

      <Container size="xl">
        {/* TON HEADER (PRÉSERVÉ) */}
        <div className="relative mb-32">
          <div className="absolute -left-10 -top-20 text-[180px] font-black text-slate-50/80 select-none leading-none uppercase pointer-events-none">
            PRICING
          </div>
          <div className="relative z-10 flex flex-col items-start">
            <Badge label="Flexible Investment" status="success" />
            <h2 className="mt-6 text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
              Plans for <br />
              <span className="text-blue-600 italic underline decoration-slate-100 underline-offset-8">Every Level.</span>
            </h2>
          </div>
        </div>

        {/* LAYOUT "MODULAR STRIPES" AVEC TOUTES LES FEATURES */}
        <div className="relative space-y-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="group relative flex flex-col p-8 md:p-12 rounded-[3rem] border border-slate-50 transition-all duration-700 hover:border-blue-100 hover:bg-slate-50/40 backdrop-blur-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                
                {/* 1. Identity & Price */}
                <div className="flex flex-col md:flex-row md:items-center gap-10 min-w-[300px]">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase mb-2">
                      {plan.popular ? 'Priority' : `Tier 0${index + 1}`}
                    </span>
                    <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic">
                      {plan.name}
                    </h3>
                  </div>
                  
                  <div className="relative">
                    <span className="text-7xl font-black tracking-tighter text-transparent [text-stroke:1px_#e2e8f0] group-hover:[text-stroke:1px_#2563eb] transition-all duration-700">
                      {plan.price}
                    </span>
                    <span className="absolute -top-1 -right-8 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      {plan.period === "month" ? "USD/MO" : "Tailored"}
                    </span>
                  </div>
                </div>

                {/* 2. Micro-Features Grid (L'Innovation logicielle) */}
                <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 border-l border-slate-100 pl-8">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 group/feat">
                      <div className={`shrink-0 w-1.5 h-1.5 rounded-full transition-transform group-hover/feat:scale-150 ${feature.included ? 'bg-blue-600' : 'bg-slate-200'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${feature.included ? 'text-slate-600' : 'text-slate-300 line-through opacity-50'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 3. CTA Action */}
                <div className="flex justify-end shrink-0">
                  <Button
                    variant={plan.ctaVariant}
                    className={`rounded-full! h-20 px-12 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500
                      ${plan.popular 
                        ? 'bg-slate-900 text-white hover:bg-blue-600 hover:px-16 shadow-2xl shadow-slate-200' 
                        : 'border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900'
                      }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>

              {/* Hover Badge Info */}
              <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <Badge label={plan.badge} status={plan.badgeStatus} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};