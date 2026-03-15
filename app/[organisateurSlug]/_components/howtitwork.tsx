"use client";

import React, { useState } from 'react';
import { 
  Trophy, Users, Zap, PlayCircle, CheckCircle2, 
  ChevronRight, Layout, Calendar, Wallet, Search, 
  ClipboardList, Activity, Star,
  ShieldCheck,
  Target,
  BarChart3,
  UserPlus,
  Radio,
  MessageSquare,
  Dices
} from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('organizer');

  const tabs = [
    { id: 'organizer', label: 'Organizer Journey', icon: <Trophy size={18} />, color: 'blue' },
    { id: 'team', label: 'Team Journey', icon: <Users size={18} />, color: 'emerald' },
    { id: 'coach', label: 'Coach Journey', icon: <Zap size={18} />, color: 'purple' },
    { id: 'fan', label: 'Fan Journey', icon: <PlayCircle size={18} />, color: 'orange' },
  ];

  const content = {
    organizer: [
      { title: "Apply & Verify", desc: "Submit docs & get verified in 24-48h.", icon: <CheckCircle2 /> },
      { title: "Set Up League", desc: "Define formats, rules, and entry fees.", icon: <Layout /> },
      { title: "Recruit Teams", desc: "Review applications & manage badges.", icon: <Users /> },
      { title: "Smart Scheduling", desc: "Auto-generate fixtures & assign venues.", icon: <Calendar /> },
      { title: "Live Monitoring", desc: "Real-time scores & automated standings.", icon: <Activity /> },
      { title: "Financial Hub", desc: "Track fees, expenses, and export reports.", icon: <Wallet /> },
    ],
    team: [
      { title: "Discover", desc: "Filter by region, level, and deadlines.", icon: <Search /> },
      { title: "Apply", desc: "Upload club docs & pay entry fees.", icon: <ClipboardList /> },
      { title: "Dashboard Access", desc: "Unlock professional management tools.", icon: <Layout /> },
      { title: "Squad Builder", desc: "Add players, photos, and track stats.", icon: <Users /> },
      { title: "Staff Roles", desc: "Create accounts for coaches & physios.", icon: <ShieldCheck /> },
      { title: "Pro Operations", desc: "Handle transfers & tactical planning.", icon: <Activity /> },
    ],
    coach: [
      { title: "Get Credentials", desc: "Secure access via manager invitation.", icon: <CheckCircle2 /> },
      { title: "Explore HQ", desc: "Check upcoming matches & squad health.", icon: <Layout /> },
      { title: "Training Lab", desc: "Design drills & track attendance.", icon: <Calendar /> },
      { title: "Tactical Board", desc: "Interactive 4-4-2 / 4-3-3 formations.", icon: <Zap /> },
      { title: "Match Brief", desc: "Select Starting XI & opponent analysis.", icon: <Target /> },
      { title: "Performance", desc: "Post-match ratings & coaching reports.", icon: <BarChart3 /> },
    ],
    fan: [
      { title: "Free Entry", desc: "Quick social signup. No payment needed.", icon: <UserPlus /> },
      { title: "Smart Search", icon: <Search />, desc: "Find leagues by sport or geographic region." },
      { title: "Follow Favorites", icon: <Star />, desc: "Bookmark teams & get custom alerts." },
      { title: "Watch Live", icon: <Radio />, desc: "Live commentary & minute-by-minute updates." },
      { title: "Engage", icon: <MessageSquare />, desc: "Join fantasy leagues & share on social." },
      { title: "Bet Smart", icon: <Dices />, desc: "Future feature: Secure odds & responsible tools." },
    ]
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADLINE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase text-slate-900">
            From Application to <span className="text-blue-600">Victory</span>
          </h2>
          <p className="text-slate-500 mt-4 font-medium text-lg italic">Here's your journey in the ecosystem.</p>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 ${
                activeTab === tab.id 
                ? `bg-slate-900 text-white shadow-2xl scale-105` 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* DYNAMIC CONTENT GRID */}
        <div className="relative p-8 lg:p-12 bg-gray-50 rounded-[3rem] border border-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content[activeTab].map((step, idx) => (
              <div 
                key={idx} 
                className="group bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {step.icon || <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter mb-1 block">
                      Step {idx + 1}
                    </span>
                    <h4 className="text-lg font-black uppercase italic text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BACKGROUND DECORATION */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
             <Trophy size={300} />
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-16 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                Ready to start? <ChevronRight size={14} />
            </div>
            <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                Join the {activeTab} journey
            </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;