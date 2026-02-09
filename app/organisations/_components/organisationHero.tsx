import React from 'react';
import { Trophy, Users, ArrowRight, Radio, Zap, Layout } from 'lucide-react';

const HeroSection = () => {
  const activeTournaments = [
    { id: 1, name: "Champions League Elite", org: "Global Strikers", teams: 32, prize: "$10,000", status: "LIVE", color: "from-blue-600 to-indigo-500" },
    { id: 2, name: "Sunday Cup", org: "City Sports", teams: 16, prize: "$2,000", status: "Open for Entry", color: "from-emerald-500 to-teal-500" },
    { id: 3, name: "Underground Street 5v5", org: "Urban Kickers", teams: 12, prize: "$500", status: "Starts in 2h", color: "from-orange-500 to-red-500" },
  ];

  return (
    <section className="relative t-24 min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505]">
      
      {/* --- NOUVEAU DESIGN DU BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* L'image fixée en haut */}
        <div 
          className="absolute top-0 left-0 w-full h-[70%] bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80')] bg-cover bg-center opacity-40"
        />
        {/* Le dégradé qui part du bas (noir) vers le haut (transparent) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
      </div>
      {/* ------------------------------------ */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: TEXT & SINGLE CTA */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <Radio size={14} className="text-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                Over 1,240 matches being played right now
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl sm:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
                YOUR GAME, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500">
                  OUR STAGE.
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-lg font-medium">
                The premier football ecosystem. Whether you're an <span className="text-white">organizer</span> or a <span className="text-white">player</span>, start your journey to the top today.
              </p>
            </div>

            <div className="pt-4">
              <button className="group relative w-full sm:w-auto bg-white text-black px-12 py-6 rounded-2xl font-black uppercase text-base tracking-[0.1em] hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden shadow-2xl shadow-white/5">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Get Started
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="flex gap-12 pt-6 border-t border-white/5">
              <div>
                <div className="text-3xl font-black text-white tracking-tighter">450+</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Leagues</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white tracking-tighter">12.5K</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Players</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: TOURNAMENT FEED */}
          <div className="relative">
            {/* Effet de lueur bleue derrière les cartes */}
            <div className="absolute -inset-20 bg-blue-600/20 blur-[120px] rounded-full opacity-50" />
            
            <div className="relative space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-white font-black uppercase tracking-tighter text-xl italic">Active Tournaments</h2>
              </div>

              {activeTournaments.map((tournament) => (
                <div key={tournament.id} className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-blue-500/50 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${tournament.color} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                        <Trophy className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-black text-base uppercase">{tournament.name}</h4>
                          {tournament.status === "LIVE" && (
                            <span className="px-2 py-0.5 bg-red-500 text-[8px] font-black rounded animate-pulse">LIVE</span>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase mt-0.5">By {tournament.org}</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;