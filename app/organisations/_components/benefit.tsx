"use client";

import React, { useState } from 'react';
import { 
  Building2, Trophy, Cpu, CreditCard, UserCheck, Bell, 
  BarChart, Users, Ticket, Tv, Briefcase, Calendar, 
  Handshake, PieChart, Repeat, Clipboard, Phone, Target, 
  Layers, Activity, Video, BookOpen, Radio, Star, Smartphone,
  ChevronRight, Sparkles
} from 'lucide-react';

const FeaturesDeepDive = () => {
  const [activeRole, setActiveRole] = useState('organizers');

  const roles = [
    { id: 'organizers', label: 'For Organizers', icon: <Building2 size={16} /> },
    { id: 'managers', label: 'For Team Managers', icon: <Briefcase size={16} /> },
    { id: 'coaches', label: 'For Coaches', icon: <Target size={16} /> },
    { id: 'fans', label: 'For Fans', icon: <Star size={16} /> },
  ];

  const features = {
    organizers: [
      { title: "Organization Profile", desc: "Professional branding with custom logos and colors.", icon: <Building2 />, size: "large" },
      { title: "Smart Scheduling", desc: "AI-powered fixture generator with venue sync.", icon: <Cpu />, size: "small", highlight: true },
      { title: "Multi-Championship", desc: "Run multiple leagues from one hub.", icon: <Trophy />, size: "small" },
      { title: "Payment Integration", desc: "Accept Credit Cards & Mobile Money.", icon: <CreditCard />, size: "small" },
      { title: "Automated Notifications", desc: "Reminders for match starts & changes.", icon: <Bell />, size: "small" },
      { title: "Ticket Sales", desc: "Coming Soon: Direct match ticketing.", icon: <Ticket />, size: "small", status: "Soon" },
    ],
    managers: [
      { title: "Squad Builder", desc: "Visual roster management with player cards.", icon: <Users />, size: "large" },
      { title: "Transfer Market", desc: "List, browse, and negotiate player deals.", icon: <Repeat />, size: "small", highlight: true },
      { title: "Financial Dashboard", desc: "Track sponsorships and prize money.", icon: <PieChart />, size: "small" },
      { title: "Friendly Organizer", desc: "Challenge teams to practice matches.", icon: <Handshake />, size: "small" },
      { title: "Staff Portal", desc: "Unlimited accounts with custom permissions.", icon: <UserCheck />, size: "small" },
      { title: "Mobile Access", desc: "Manage on the go with our future app.", icon: <Smartphone />, size: "small", status: "Soon" },
    ],
    coaches: [
      { title: "Tactical Board", desc: "Drag-and-drop formations & animations.", icon: <Layers />, size: "large" },
      { title: "Training Planner", desc: "Design weekly drills & fitness programs.", icon: <Calendar />, size: "small", highlight: true },
      { title: "Player Analytics", desc: "Performance metrics & growth targets.", icon: <Activity />, size: "small" },
      { title: "Match Prep", desc: "Opponent scouting & pre-match briefs.", icon: <Video />, size: "small" },
      { title: "Drill Library", desc: "Access hundreds of training exercises.", icon: <BookOpen />, size: "small" },
      { title: "Post-Match Reports", desc: "Analyze performance and plan improvements.", icon: <Clipboard />, size: "small" },
    ],
    fans: [
      { title: "Live Match Center", desc: "Real-time scores & minute-by-minute stats.", icon: <Radio />, size: "large" },
      { title: "Smart Alerts", desc: "Goal notifications & final whistles.", icon: <Bell />, size: "small", highlight: true },
      { title: "Fantasy Leagues", desc: "Compete with friends & build dream teams.", icon: <Tv />, size: "small", status: "Soon" },
      { title: "Standings", desc: "Live tables & qualification scenarios.", icon: <Trophy />, size: "small" },
      { title: "Sports Betting", desc: "Future: Secure & responsible wagering.", icon: <Sparkles />, size: "small", status: "Soon" },
      { title: "Mobile-First", desc: "Optimized for match-day phone viewing.", icon: <Smartphone />, size: "small" },
    ]
  };

  return (
    <section className="py-24 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] text-slate-900">
              Powerful Features <br />
              <span className="text-blue-600">For Every Role.</span>
            </h2>
          </div>
          
          {/* TAB SWITCHER */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeRole === role.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-slate-900'
                }`}
              >
                {role.icon} {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto lg:h-[600px]">
          {features[activeRole].map((feature, idx) => (
            <div 
              key={idx}
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 border border-gray-100 transition-all duration-500 hover:shadow-2xl shadow-sm bg-white ${
                feature.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'
              } ${feature.highlight ? 'bg-blue-50/30' : ''}`}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6 ${
                  feature.highlight ? 'bg-blue-600 text-white' : 'bg-gray-50 text-slate-900 group-hover:bg-blue-100 group-hover:text-blue-600'
                }`}>
                  {feature.icon}
                </div>

                <div className="mt-auto">
                  {feature.status && (
                    <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-600 text-[8px] font-black uppercase mb-2 inline-block">
                      {feature.status}
                    </span>
                  )}
                  <h4 className={`font-black uppercase italic tracking-tighter mb-2 ${
                    feature.size === 'large' ? 'text-3xl' : 'text-lg'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>

              {/* WATERMARK ICON FOR LARGE CARDS */}
              {feature.size === 'large' && (
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   {React.cloneElement(feature.icon, { size: 280 })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-4 text-slate-900 font-black uppercase italic tracking-widest text-sm group">
                Explore all tools <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:translate-x-2 transition-transform"><ChevronRight size={18}/></div>
            </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesDeepDive;