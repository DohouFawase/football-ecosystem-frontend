"use client";

import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Trophy, 
  Users, 
  Zap, 
  PlayCircle,
  Plus,
  Minus
} from 'lucide-react';

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { id: 'general', label: 'General', icon: <HelpCircle size={16} /> },
    { id: 'organizers', label: 'Organizers', icon: <Trophy size={16} /> },
    { id: 'teams', label: 'Teams', icon: <Users size={16} /> },
    { id: 'coaches', label: 'Coaches', icon: <Zap size={16} /> },
    { id: 'fans', label: 'Fans', icon: <PlayCircle size={16} /> },
  ];

  const faqs = {
    general: [
      { q: "What sports does ChampionHub support?", a: "Football/soccer, basketball, volleyball, handball, rugby, and more. If your sport has teams and matches, we support it!" },
      { q: "Is ChampionHub available in my country?", a: "Yes! We operate globally. Our platform supports multiple currencies and languages." },
      { q: "Do I need technical skills to use ChampionHub?", a: "Not at all. Our interface is designed for non-technical users. If you can use email, you can use ChampionHub." },
      { q: "Is there a mobile app?", a: "Currently, we offer a mobile-optimized website. Native iOS and Android apps are coming in Q3 2026." }
    ],
    organizers: [
      { q: "How long does approval take?", a: "Typically 24-48 hours. We verify your organization to ensure quality championships." },
      { q: "Can I run multiple championships simultaneously?", a: "Yes! Pro and Enterprise plans support unlimited championships." },
      { q: "Can I customize registration fees?", a: "Absolutely. Set any fee structure you want (one-time, installments, early bird)." },
      { q: "Can I export data?", a: "Yes. Export team lists, match results, and financial reports in CSV or PDF format." }
    ],
    teams: [
      { q: "How do I join a championship?", a: "Browse available championships, submit your application, and wait for organizer approval." },
      { q: "Can I manage multiple teams?", a: "Yes! One account can manage multiple teams easily from a single dashboard." },
      { q: "How many staff accounts can I create?", a: "Free plan includes 2 staff accounts. Pro and Elite plans offer unlimited staff access." }
    ],
    coaches: [
      { q: "Can I access the platform from my phone?", a: "Yes. The tactical board and all coaching features work perfectly on mobile browsers." },
      { q: "Can I save multiple formations?", a: "Yes. Save unlimited tactical setups and switch between them during match prep." },
      { q: "Can I export training plans?", a: "Yes. Export your sessions to PDF or share them digitally with your players." }
    ],
    fans: [
      { q: "Do I need an account to view scores?", a: "No. Public scores are visible to everyone. Create an account for alerts and following teams." },
      { q: "How fast are live updates?", a: "Score updates appear within 5 seconds of being entered by match officials." },
      { q: "When will betting be available?", a: "We're working on regulatory approvals. Expected launch in late 2026. Join the waitlist!" }
    ]
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black italic tracking-tighter uppercase text-slate-900">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-slate-500 mt-4 font-medium italic">Everything you need to know about ChampionHub.</p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {faqs[activeCategory].map((faq, idx) => (
            <div 
              key={idx}
              className={`border rounded-3xl transition-all duration-300 ${
                openIndex === idx ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-white'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-black uppercase italic tracking-tight text-slate-900 pr-8">
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  openIndex === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-slate-400'
                }`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-blue-100/50 mt-2">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;