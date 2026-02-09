"use client";
import React, { useState } from 'react';
import { Trophy, Users, MapPin, ArrowRight, Wallet, Calendar, X, Globe, Shield, Info } from 'lucide-react';

const ExploreChampionships = () => {
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const allTournaments = [
    { id: 1, orgName: "Elite Sports Group", title: "Champions Winter League", category: "Football", prize: "$10,000", spots: "18/24", date: "Starts Mar 15", location: "Paris, FR", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500", desc: "The premier winter football competition in Europe. High-stakes matches and professional scouting." },
    { id: 2, orgName: "Pro Street Academy", title: "Street Soccer Masters", category: "Futsal", prize: "$2,500", spots: "8/12", date: "Starts April 02", location: "Abidjan, CI", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=500", desc: "Fast-paced urban futsal. Show your skills in the heart of Abidjan." },
    { id: 3, orgName: "B-Ball Nations", title: "3x3 Summer Showdown", category: "Basketball", prize: "$5,000", spots: "12/16", date: "Starts June 10", location: "Dakar, SN", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500", desc: "The biggest 3x3 basketball event in Senegal. Music, dunk contests, and elite competition." },
    { id: 4, orgName: "Volley Pro Tour", title: "Beach Spike Open", category: "Volleyball", prize: "$3,000", spots: "10/20", date: "Starts July 15", location: "Miami, US", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=500", desc: "Summer beach volleyball tournament. Sun, sand, and competitive spikes." },
    { id: 5, orgName: "Cyber Arena", title: "Global E-Sports Cup", category: "E-Sports", prize: "$20,000", spots: "32/64", date: "Starts Aug 20", location: "Online / Seoul", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500", desc: "The ultimate showdown for professional gamers. Compete globally for the grand trophy." },
    { id: 6, orgName: "Rugby Titans", title: "Seven's Rugby Shield", category: "Rugby", prize: "$7,500", spots: "14/16", date: "Starts Sept 05", location: "London, UK", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=500", desc: "Intense rugby sevens tournament featuring the best clubs in the UK." }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-blue-600 font-black tracking-widest uppercase text-[10px]">Marketplace</span>
            <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase mt-2">
              Find Your Next <br />
              <span className="text-gray-400">Challenge.</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All Sports', 'Football', 'Basketball', 'E-Sports'].map((filter, i) => (
              <button key={i} className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${
                i === 0 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID (Preview: 3 items) --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTournaments.slice(0, 3).map((tournament) => (
            <TournamentCard 
              key={tournament.id} 
              tournament={tournament} 
              onViewDetails={() => setSelectedTournament(tournament)} 
            />
          ))}
        </div>

        {/* --- BROWSE ALL ACTION --- */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => setIsMarketplaceOpen(true)}
            className="inline-flex items-center gap-3 text-gray-400 font-black uppercase italic tracking-widest hover:text-blue-600 transition-colors"
          >
            Browse all {allTournaments.length}+ championships <ArrowRight size={20} />
          </button>
        </div>

        {/* --- MODAL 1: MARKETPLACE (FULL LIST) --- */}
        {isMarketplaceOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setIsMarketplaceOpen(false)} />
            <div className="relative bg-gray-50 w-full max-w-7xl h-full rounded-[3rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="p-8 border-b bg-white flex justify-between items-center">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">Full Championship <span className="text-blue-600">Marketplace</span></h3>
                <button onClick={() => setIsMarketplaceOpen(false)} className="p-3 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-all"><X size={24}/></button>
              </div>
              {/* Modal Content (Scrollable) */}
              <div className="p-8 overflow-y-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allTournaments.map((tournament) => (
                  <TournamentCard 
                    key={tournament.id} 
                    tournament={tournament} 
                    onViewDetails={() => setSelectedTournament(tournament)} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL 2: TOURNAMENT DETAILS --- */}
        {selectedTournament && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTournament(null)} />
            <div className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-300">
              <div className="h-64 relative">
                <img src={selectedTournament.image} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedTournament(null)} className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all"><X size={20}/></button>
              </div>
              <div className="p-10">
                <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest">{selectedTournament.category}</span>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mt-2 mb-4">{selectedTournament.title}</h3>
                <p className="text-gray-500 mb-8 font-medium leading-relaxed">{selectedTournament.desc}</p>
                
                <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl mb-8">
                   <DetailItem icon={<Wallet size={18}/>} label="Grand Prize" value={selectedTournament.prize} />
                   <DetailItem icon={<Users size={18}/>} label="Availability" value={selectedTournament.spots} />
                   <DetailItem icon={<Calendar size={18}/>} label="Start Date" value={selectedTournament.date} />
                   <DetailItem icon={<MapPin size={18}/>} label="Location" value={selectedTournament.location} />
                </div>

                <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase italic tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                  Submit Team Application
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

// --- COMPOSANT RÉUTILISABLE CARTE ---
const TournamentCard = ({ tournament, onViewDetails }) => (
  <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
    <div className="relative h-56 overflow-hidden">
      <img src={tournament.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase text-blue-600 italic">
        {tournament.category}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">{tournament.title}</h3>
      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase mb-6">
        <span className="flex items-center gap-1"><MapPin size={12}/> {tournament.location}</span>
        <span className="flex items-center gap-1"><Wallet size={12}/> {tournament.prize}</span>
      </div>
      <button 
        onClick={onViewDetails}
        className="w-full py-3 bg-gray-900 text-white rounded-xl font-black uppercase italic tracking-widest text-[10px] hover:bg-blue-600 transition-all"
      >
        View Championship
      </button>
    </div>
  </div>
);

// --- COMPOSANT RÉUTILISABLE DÉTAIL ---
const DetailItem = ({ icon, label, value }) => (
  <div className="flex gap-3">
    <div className="text-blue-600">{icon}</div>
    <div>
      <div className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">{label}</div>
      <div className="text-sm font-bold uppercase">{value}</div>
    </div>
  </div>
);

export default ExploreChampionships;