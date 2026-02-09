import React from 'react';
import { Trophy, Users, MapPin, ArrowRight, Wallet, Calendar } from 'lucide-react';

const ExploreChampionships = () => {
  // Simulation de données provenant de différentes organisations
  const allTournaments = [
    {
      id: 1,
      orgName: "Elite Sports Group",
      title: "Champions Winter League",
      category: "Football",
      prize: "$10,000",
      spots: "18/24",
      date: "Starts Mar 15",
      location: "Paris, FR",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500"
    },
    {
      id: 2,
      orgName: "Pro Street Academy",
      title: "Street Soccer Masters",
      category: "Futsal",
      prize: "$2,500",
      spots: "8/12",
      date: "Starts April 02",
      location: "Abidjan, CI",
      image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=500"
    },
    {
      id: 3,
      orgName: "B-Ball Nations",
      title: "3x3 Summer Showdown",
      category: "Basketball",
      prize: "$5,000",
      spots: "12/16",
      date: "Starts June 10",
      location: "Dakar, SN",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER AVEC FILTRES --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-blue-600 font-black tracking-widest uppercase text-xs">Marketplace</span>
            <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase mt-2">
              Find Your Next <br />
              <span className="text-gray-400">Challenge.</span>
            </h2>
          </div>
          
          {/* Filtres rapides */}
          <div className="flex flex-wrap gap-2">
            {['All Sports', 'Football', 'Basketball', 'E-Sports'].map((filter, i) => (
              <button key={i} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* --- TOURNAMENT GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTournaments.map((tournament) => (
            <div key={tournament.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              
              {/* Image & Badge */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tournament.image} 
                  alt={tournament.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 italic">
                  {tournament.category}
                </div>
                <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white italic">
                  Organized by {tournament.orgName}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight">
                    {tournament.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Wallet size={16} className="text-blue-600" />
                    <span className="text-xs font-bold uppercase">{tournament.prize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users size={16} className="text-blue-600" />
                    <span className="text-xs font-bold uppercase">{tournament.spots} Spots</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="text-xs font-bold uppercase">{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} className="text-blue-600" />
                    <span className="text-xs font-bold uppercase">{tournament.location}</span>
                  </div>
                </div>

                <button className="w-full group/btn relative flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase italic tracking-widest text-xs overflow-hidden transition-all hover:bg-blue-600">
                  <span className="relative z-10 flex items-center gap-2">
                    View Details <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- VIEW ALL FOOTER --- */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 text-gray-400 font-black uppercase italic tracking-widest hover:text-blue-600 transition-colors">
            Browse all 150+ championships <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreChampionships;