"use client";
import React, { useState, useRef } from 'react';
import { 
  Trophy, MapPin, Wallet, Calendar, X, 
  Upload, CheckCircle2, Trash2, Search, ChevronLeft, ChevronRight, Info,
  PartyPopper, Clock
} from 'lucide-react';

const ExploreChampionships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Nouvel état pour le succès
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  const [formData, setFormData] = useState({
    leagueId: '',
    teamName: '',
    paymentAmount: 80000,
    paymentMethod: 'MTN Mobile Money',
    paymentProof: null,
  });

  const allTournaments = [
    { id: "uuid-1", title: "Ligue d'Hiver Elite", category: "Football", prize: "2.000.000 FCFA", fee: 80000, spots: "18/24", date: "15 Mars", location: "Cotonou, BJ", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500" },
    { id: "uuid-2", title: "Street Soccer Masters", category: "Futsal", prize: "500.000 FCFA", fee: 80000, spots: "8/12", date: "02 Avril", location: "Abidjan, CI", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=500" },
    { id: "uuid-3", title: "3x3 Summer Showdown", category: "Basketball", prize: "1.000.000 FCFA", fee: 80000, spots: "12/16", date: "10 Juin", location: "Dakar, SN", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500" },
    { id: "uuid-4", title: "Cyber Cup 2026", category: "E-Sports", prize: "3.000.000 FCFA", fee: 80000, spots: "32/64", date: "20 Août", location: "Online", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500" },
  ];

  const filteredTournaments = allTournaments.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') current.scrollBy({ left: -400, behavior: 'smooth' });
    else current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, paymentProof: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi API
    setIsRegistering(false);
    setShowSuccess(true); // Afficher le modal de succès
    setPreviewImage(null);
  };

  return (
    <section className="py-24 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">
              CHAMPIONSHIP <span className="text-blue-600">MARKET</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Explore and join elite leagues</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
              type="text"
              placeholder="Search by league or sport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-5 pl-14 pr-6 font-bold focus:border-blue-600 transition-all outline-none text-sm"
            />
          </div>
        </div>

        {/* --- CAROUSEL CONTROLS --- */}
        <div className="flex justify-end gap-3 mb-6">
          <button onClick={() => scroll('left')} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><ChevronLeft size={20}/></button>
          <button onClick={() => scroll('right')} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><ChevronRight size={20}/></button>
        </div>

        {/* --- CAROUSEL TRACK --- */}
        <div ref={scrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10">
          {filteredTournaments.map((t) => (
            <div key={t.id} className="min-w-[320px] md:min-w-[400px] snap-start">
              <TournamentCard 
                tournament={t} 
                onViewDetails={() => setSelectedTournament(t)}
                onRegister={() => { setFormData({...formData, leagueId: t.id}); setIsRegistering(true); }}
              />
            </div>
          ))}
        </div>

        {/* --- MODAL 1: DÉTAILS --- */}
        {selectedTournament && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedTournament(null)} />
            <div className="relative bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
              <img src={selectedTournament.image} className="w-full h-64 object-cover" />
              <div className="p-10 text-center">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6">{selectedTournament.title}</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-10 mb-10">
                  <DetailItem icon={<Wallet size={18}/>} label="Frais d'entrée" value="80.000 FCFA" />
                  <DetailItem icon={<MapPin size={18}/>} label="Lieu" value={selectedTournament.location} />
                  <DetailItem icon={<Trophy size={18}/>} label="Grand Prix" value={selectedTournament.prize} />
                  <DetailItem icon={<Calendar size={18}/>} label="Début" value={selectedTournament.date} />
                </div>
                <button 
                   onClick={() => { setIsRegistering(true); setSelectedTournament(null); }}
                   className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase italic tracking-widest hover:bg-black transition-all"
                >
                  Participer Maintenant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL 2: INSCRIPTION --- */}
        {isRegistering && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setIsRegistering(false)} />
            <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="bg-blue-600 p-8 text-white flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase italic">Team Entry</h3>
                <button onClick={() => setIsRegistering(false)}><X size={24}/></button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <input type="text" required className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 font-bold" placeholder="Nom de votre équipe" />
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-blue-50 p-5 rounded-3xl"><p className="text-[10px] font-black text-blue-400 uppercase">Frais</p><p className="text-xl font-black italic">80.000 FCFA</p></div>
                   <div className="bg-gray-50 p-5 rounded-3xl"><p className="text-[10px] font-black text-gray-400 uppercase">Méthode</p><p className="text-sm font-black uppercase mt-1">Mobile Money</p></div>
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-3 ml-2 text-center">Preuve de paiement (Capture d'écran)</p>
                   {!previewImage ? (
                    <div onClick={() => fileInputRef.current.click()} className="border-4 border-dashed border-gray-100 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-3 hover:bg-blue-50 cursor-pointer transition-all group">
                        <Upload className="text-blue-600 group-hover:scale-110 transition-transform" size={40} />
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Déposez votre reçu ici</span>
                    </div>
                   ) : (
                    <div className="relative h-44 rounded-[2rem] overflow-hidden border-2 border-blue-100">
                        <img src={previewImage} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setPreviewImage(null)} className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity font-black uppercase italic text-xs"><Trash2 size={20} className="mr-2"/> Supprimer</button>
                    </div>
                   )}
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase italic tracking-widest hover:bg-blue-600 transition-all shadow-xl">Valider l'inscription</button>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 3: SUCCÈS (LE NOUVEAU MODAL) --- */}
        {showSuccess && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-xl" onClick={() => setShowSuccess(false)} />
            <div className="relative bg-white w-full max-w-md rounded-[3.5rem] p-12 text-center shadow-2xl animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Demande Envoyée !</h3>
              
              <div className="space-y-4 mb-10">
                <p className="text-gray-500 font-bold text-sm leading-relaxed">
                  Votre candidature a été reçue avec succès. 
                </p>
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 text-left">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Clock size={18}/></div>
                  <p className="text-[10px] font-black uppercase text-gray-400">
                    Statut : <span className="text-blue-600">En cours de vérification du paiement</span>
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase italic tracking-widest hover:bg-emerald-500 transition-all shadow-xl"
              >
                C'est compris !
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

const TournamentCard = ({ tournament, onViewDetails, onRegister }) => (
  <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
    <div className="relative h-64 overflow-hidden">
      <img src={tournament.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-blue-600 italic">{tournament.category}</div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1 leading-none">{tournament.title}</h3>
      <p className="text-blue-600 font-black text-xs mb-6 italic">Frais: 80.000 FCFA</p>
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button onClick={onRegister} className="py-4 bg-gray-900 text-white rounded-2xl font-black uppercase italic text-[10px] hover:bg-blue-600 transition-all shadow-lg">Participer</button>
        <button onClick={onViewDetails} className="py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase italic text-[10px] hover:bg-gray-200 transition-all">Infos</button>
      </div>
    </div>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex flex-col items-center">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl mb-2">{icon}</div>
    <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest mb-1">{label}</p>
    <p className="text-[11px] font-bold uppercase leading-none">{value}</p>
  </div>
);

export default ExploreChampionships;