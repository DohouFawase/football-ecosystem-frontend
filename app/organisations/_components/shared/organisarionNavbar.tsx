"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Trophy,
  Users,
  ArrowRight,
  Radio,
  Zap,
  PlayCircle,
  UserCircle,
  Settings,
  LogOut,
  LayoutDashboard
} from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // État de connexion : Si false, rien n'apparaît (pas de boutons Login/Join)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  
  const user = {
    name: "Alex Johnson",
    role: "League Organizer",
    avatar: null 
  };

  // --- LOGIC: LOGOUT & REDIRECT ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push("/"); // Retour immédiat à l'accueil
  };

  const features = [
    { title: "For Organizers", desc: "Leagues & finances", icon: <Trophy size={18} /> },
    { title: "For Team Managers", desc: "Recruit & transfers", icon: <Users size={18} /> },
    { title: "For Coaches", desc: "Tactics & reports", icon: <Zap size={18} /> },
    { title: "For Fans", desc: "Live stats", icon: <PlayCircle size={18} /> },
  ];

  const activeTournaments = [
    { id: 1, name: "Champions League Elite", org: "Global Strikers", color: "from-blue-600 to-indigo-500" },
    { id: 2, name: "Sunday Cup", org: "City Sports", color: "from-emerald-500 to-teal-500" },
    { id: 3, name: "Underground Street 5v5", org: "Urban Kickers", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-sans bg-gray-50">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-gray-50 to-gray-50" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 w-full border-b border-gray-200 backdrop-blur-md bg-white/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
                <Trophy size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                CHAMPION<span className="text-blue-600">HUB</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">Home</Link>
              
              <div className="relative group">
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-blue-600 transition">
                  Features <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full -left-10 mt-2 w-72 bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                  <div className="grid gap-2">
                    {features.map((item, idx) => (
                      <Link key={idx} href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                        <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">{item.icon}</div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 uppercase">{item.title}</div>
                          <div className="text-[10px] text-slate-500 mt-1">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <Link href="/pricing" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">Pricing</Link>
            </div>

            {/* ACTIONS: ONLY SHOW PROFILE IF LOGGED IN */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-widest">
                <Globe size={16} /> EN
              </button>

              {isLoggedIn && (
                <div className="relative group">
                  <button className="flex items-center gap-3 p-1 pr-4 rounded-full bg-white border border-gray-100 hover:border-blue-500 hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black shadow-inner">
                      {user.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase text-slate-900 leading-none">{user.name}</div>
                      <div className="text-[8px] font-bold uppercase text-blue-600 mt-1">{user.role}</div>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 group-hover:rotate-180 transition-transform" />
                  </button>

                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">
                      <LayoutDashboard size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-slate-700 transition">
                      <Settings size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
                    </Link>
                    <div className="h-px bg-gray-100 my-2 mx-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 transition"
                    >
                      <LogOut size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-slate-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
        <section className="relative z-20 max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-20">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT SIDE */}
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
                    <Radio size={14} className="text-blue-600 animate-pulse" />
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">
                      Over 1,240 matches being played right now
                    </span>
                  </div>
      
                  <div className="space-y-4">
                    <h1 className="text-6xl sm:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">
                      YOUR GAME, <br />
                      <span className="text-blue-600">OUR STAGE.</span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl max-w-lg font-medium">
                      The premier football ecosystem. Whether you're an{" "}
                      <span className="text-slate-900 font-bold">organizer</span> or a{" "}
                      <span className="text-slate-900 font-bold">player</span>, start
                      your journey to the top.
                    </p>
                  </div>
      
                  <button className="group relative w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black uppercase text-base tracking-[0.1em] hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl">
                    Get Started
                    <ArrowRight
                      size={22}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
      
                  <div className="flex gap-12 pt-6 border-t border-gray-200">
                    <div>
                      <div className="text-3xl font-black text-slate-900 italic">
                        450+
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Leagues
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 italic">
                        12.5K
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Players
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* RIGHT SIDE: TOURNAMENT FEED */}
                <div className="relative">
                  {/* Effet de lueur bleue derrière les cartes */}
                  <div className="absolute -inset-10 bg-blue-400/10 blur-[100px] rounded-full opacity-50" />
      
                  <div className="relative space-y-4">
                    <h2 className="text-slate-900 font-black uppercase tracking-tighter text-xl italic mb-6">
                      Active Tournaments
                    </h2>
                    {activeTournaments.map((tournament) => (
                      <div
                        key={tournament.id}
                        className="group relative bg-white border border-gray-100 p-6 rounded-3xl hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <div
                              className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${tournament.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                            >
                              <Trophy className="text-white" size={24} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-slate-900 font-black text-base uppercase">
                                  {tournament.name}
                                </h4>
                                {tournament.status === "LIVE" && (
                                  <span className="px-2 py-0.5 bg-red-500 text-white text-[8px] font-black rounded animate-pulse">
                                    LIVE
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">
                                By {tournament.org}
                              </p>
                            </div>
                          </div>
                          <ArrowRight
                            size={18}
                            className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-white p-6 space-y-8 animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center">
            <span className="text-xl font-black text-slate-900 uppercase">CHAMPIONHUB</span>
            <button onClick={() => setIsOpen(false)}><X size={30} /></button>
          </div>
          {isLoggedIn ? (
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-[2rem] flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl">{user.name.charAt(0)}</div>
                <div>
                  <div className="text-lg font-black uppercase text-slate-900">{user.name}</div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase">{user.role}</div>
                </div>
              </div>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block text-4xl font-black text-slate-900 uppercase italic">Dashboard</Link>
              <button onClick={handleLogout} className="w-full py-5 bg-red-50 text-red-600 font-black uppercase rounded-2xl">Logout Now</button>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Session ended.</p>
              <Link href="/" onClick={() => setIsOpen(false)} className="mt-4 inline-block text-blue-600 font-black uppercase italic text-2xl">Back Home</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;