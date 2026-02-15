"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy, Facebook, Twitter, Instagram, Linkedin, Youtube, 
  Mail, Phone, MessageSquare, ChevronUp, Globe, CreditCard,
  Heart, X
} from 'lucide-react';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [showCookie, setShowCookie] = useState(true);

  // Gestion du bouton Scroll-to-Top
  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) setShowScroll(true);
      else if (showScroll && window.pageYOffset <= 400) setShowScroll(false);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#0A0A0A] text-gray-400 pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* --- TOP FOOTER (6 Columns) --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">
        
        {/* Column 1: Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Trophy size={18} />
            </div>
            <span className="text-xl font-bold text-white tracking-tighter uppercase">
              CHAMPION<span className="text-blue-500">HUB</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed mb-8 font-medium">
            "Empowering championships, teams, and fans worldwide."
          </p>
          <div className="flex gap-4">
            <Facebook size={18} className="hover:text-blue-500 cursor-pointer transition-colors" />
            <Twitter size={18} className="hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram size={18} className="hover:text-pink-500 cursor-pointer transition-colors" />
            <Linkedin size={18} className="hover:text-blue-700 cursor-pointer transition-colors" />
            <Youtube size={18} className="hover:text-red-600 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Column 2: Product */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Product</h4>
          <ul className="space-y-4 text-xs font-semibold">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="#" className="hover:text-white transition">How It Works</Link></li>
            <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
            <li><Link href="#" className="hover:text-white transition">Live Matches</Link></li>
            <li className="flex items-center gap-2">Roadmap <span className="bg-blue-600/20 text-blue-500 px-1.5 py-0.5 rounded text-[8px]">NEW</span></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Resources</h4>
          <ul className="space-y-4 text-xs font-semibold">
            <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
            <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
            <li><Link href="#" className="hover:text-white transition">Video Tutorials</Link></li>
            <li><Link href="#" className="hover:text-white transition">API Documentation</Link></li>
            <li><Link href="#" className="hover:text-white transition">Case Studies</Link></li>
          </ul>
        </div>

        {/* Column 4: Company */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-4 text-xs font-semibold">
            <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition flex items-center gap-2">Careers <span className="text-emerald-500 text-[8px] border border-emerald-500/30 px-1 rounded">Hiring</span></Link></li>
            <li><Link href="#" className="hover:text-white transition">Press Kit</Link></li>
            <li><Link href="#" className="hover:text-white transition">Partners</Link></li>
            <li><Link href="#" className="hover:text-white transition">Affiliate Program</Link></li>
          </ul>
        </div>

        {/* Column 5: Legal */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
          <ul className="space-y-4 text-xs font-semibold">
            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">GDPR Compliance</Link></li>
          </ul>
        </div>

        {/* Column 6: Support */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 text-xs font-semibold">
            <li className="flex items-center gap-2"><Mail size={14} className="text-blue-500"/> support@championhub.com</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-blue-500"/> +1 (555) 123-4567</li>
            <li>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                <span className="block text-white text-[10px] uppercase mb-1">Live Chat</span>
                <button className="text-blue-500 text-[10px] font-black uppercase hover:underline">Click Here to Start</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* --- BOTTOM FOOTER --- */}
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-[10px] font-bold uppercase tracking-widest">
          © 2026 ChampionHub. All rights reserved.
        </div>
        
        <div className="flex items-center gap-8 text-[10px] font-bold uppercase">
          <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
            <Globe size={14} /> English <ChevronUp size={12} className="rotate-180" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
            <CreditCard size={14} /> USD <ChevronUp size={12} className="rotate-180" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold italic text-gray-500">
          Made with <Heart size={12} className="text-red-600 fill-red-600" /> for the love of sports
        </div>
      </div>

      {/* --- FLOATING ELEMENTS --- */}
      
      {/* 1. Live Chat Widget */}
      <div className="fixed bottom-6 left-6 z-[100] group">
        <div className="bg-white text-slate-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-100 animate-in slide-in-from-left duration-500">
          <div className="relative">
             <MessageSquare className="text-blue-600" size={24} />
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase leading-none mb-1">Need Help?</div>
            <button className="text-xs font-bold text-blue-600 hover:underline">Start Chat</button>
          </div>
        </div>
      </div>

      {/* 2. Scroll to Top */}
      {showScroll && (
        <button 
          onClick={scrollUp}
          className="fixed bottom-6 right-6 z-[100] bg-blue-600 text-white p-4 rounded-xl shadow-2xl hover:bg-blue-500 transition-all animate-in zoom-in duration-300"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* 3. Cookie Consent Banner */}
      {showCookie && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-2xl">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="text-xs text-gray-400 flex-grow">
              🍪 We use cookies to enhance your experience. By continuing, you agree to our <Link href="#" className="text-white underline">Privacy Policy</Link>.
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setShowCookie(false)} className="px-4 py-2 text-[10px] font-black uppercase text-white hover:bg-white/10 rounded-lg">Customize</button>
              <button onClick={() => setShowCookie(false)} className="px-6 py-2 text-[10px] font-black uppercase bg-white text-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all">Accept All</button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};

export default Footer;