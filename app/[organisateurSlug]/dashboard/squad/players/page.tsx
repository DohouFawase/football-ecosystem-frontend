"use client"
import React, { useState } from 'react';

interface Player {
  id: number;
  name: string;
  position: string;
  jerseyNumber: number;
  isInjured: boolean;
  injuryDetails?: string;
  country: string;
  flag: string;
  age: number;
  goals: number;
  assists: number;
  matches: number;
  rating: number;
  transferStatus: 'available' | 'unavailable' | 'loan';
}
const TransferIcon = ({ status }: { status: string }) => {
  if (status === 'available') {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    );
  }
  if (status === 'loan') {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4" />
      </svg>
    );
  }
  return null;
};


const Page = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [players] = useState<Player[]>([
    // Gardiens
    { id: 1, name: 'Luc Bernardin', position: 'Gardien', jerseyNumber: 1, isInjured: false, country: 'France', flag: '🇫🇷', age: 32, goals: 0, assists: 0, matches: 30, rating: 8.2, transferStatus: 'unavailable' },
    { id: 2, name: 'Samuel Koffi', position: 'Gardien', jerseyNumber: 16, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 28, goals: 0, assists: 0, matches: 8, rating: 7.1, transferStatus: 'unavailable' },
    { id: 3, name: 'Mohamed Traoré', position: 'Gardien', jerseyNumber: 23, isInjured: true, injuryDetails: 'Fracture main - 6 semaines', country: 'Mali', flag: '🇲🇱', age: 25, goals: 0, assists: 0, matches: 5, rating: 6.8, transferStatus: 'available' },
    
    // Défenseurs
    { id: 4, name: 'Paul Martin', position: 'Défenseur', jerseyNumber: 5, isInjured: false, country: 'Belgique', flag: '🇧🇪', age: 29, goals: 2, assists: 3, matches: 30, rating: 7.9, transferStatus: 'unavailable' },
    { id: 5, name: 'Yves Dossou', position: 'Défenseur', jerseyNumber: 4, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 28, goals: 1, assists: 2, matches: 29, rating: 7.6, transferStatus: 'unavailable' },
    { id: 6, name: 'Rodrigo Santos', position: 'Défenseur', jerseyNumber: 2, isInjured: false, country: 'Portugal', flag: '🇵🇹', age: 26, goals: 3, assists: 4, matches: 28, rating: 8.0, transferStatus: 'available' },
    { id: 7, name: 'Ibrahim Sanogo', position: 'Défenseur', jerseyNumber: 3, isInjured: false, country: 'Côte d\'Ivoire', flag: '🇨🇮', age: 30, goals: 1, assists: 1, matches: 27, rating: 7.7, transferStatus: 'loan' },
    { id: 8, name: 'Antoine Dubois', position: 'Défenseur', jerseyNumber: 15, isInjured: true, injuryDetails: 'Déchirure ischio - 4 semaines', country: 'France', flag: '🇫🇷', age: 27, goals: 2, assists: 2, matches: 20, rating: 7.5, transferStatus: 'unavailable' },
    { id: 9, name: 'Kwame Mensah', position: 'Défenseur', jerseyNumber: 13, isInjured: false, country: 'Ghana', flag: '🇬🇭', age: 24, goals: 0, assists: 3, matches: 25, rating: 7.4, transferStatus: 'unavailable' },
    { id: 10, name: 'Lucas Ferreira', position: 'Défenseur', jerseyNumber: 22, isInjured: false, country: 'Brésil', flag: '🇧🇷', age: 23, goals: 1, assists: 2, matches: 18, rating: 7.2, transferStatus: 'loan' },
    { id: 11, name: 'David Adjovi', position: 'Défenseur', jerseyNumber: 26, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 22, goals: 0, assists: 1, matches: 12, rating: 6.9, transferStatus: 'unavailable' },
    
    // Milieux
    { id: 12, name: 'Marc Silva', position: 'Milieu', jerseyNumber: 8, isInjured: true, injuryDetails: 'Blessure au genou - 3 semaines', country: 'Brésil', flag: '🇧🇷', age: 27, goals: 5, assists: 12, matches: 22, rating: 7.8, transferStatus: 'available' },
    { id: 13, name: 'Thomas Kouassi', position: 'Milieu', jerseyNumber: 6, isInjured: true, injuryDetails: 'Entorse cheville - 2 semaines', country: 'Côte d\'Ivoire', flag: '🇨🇮', age: 24, goals: 8, assists: 10, matches: 25, rating: 8.1, transferStatus: 'unavailable' },
    { id: 14, name: 'André Hounkpatin', position: 'Milieu', jerseyNumber: 7, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 26, goals: 6, assists: 9, matches: 28, rating: 7.7, transferStatus: 'unavailable' },
    { id: 15, name: 'Maxime Leroy', position: 'Milieu', jerseyNumber: 11, isInjured: false, country: 'France', flag: '🇫🇷', age: 25, goals: 7, assists: 11, matches: 29, rating: 8.0, transferStatus: 'unavailable' },
    { id: 16, name: 'Amadou Diallo', position: 'Milieu', jerseyNumber: 14, isInjured: false, country: 'Sénégal', flag: '🇸🇳', age: 28, goals: 4, assists: 8, matches: 27, rating: 7.6, transferStatus: 'available' },
    { id: 17, name: 'José Martinez', position: 'Milieu', jerseyNumber: 18, isInjured: false, country: 'Espagne', flag: '🇪🇸', age: 29, goals: 3, assists: 7, matches: 26, rating: 7.5, transferStatus: 'loan' },
    { id: 18, name: 'Fabrice Gbaguidi', position: 'Milieu', jerseyNumber: 20, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 23, goals: 5, assists: 6, matches: 24, rating: 7.3, transferStatus: 'unavailable' },
    { id: 19, name: 'Ahmed Ouattara', position: 'Milieu', jerseyNumber: 21, isInjured: true, injuryDetails: 'Élongation mollet - 10 jours', country: 'Burkina Faso', flag: '🇧🇫', age: 22, goals: 2, assists: 4, matches: 15, rating: 7.0, transferStatus: 'unavailable' },
    { id: 20, name: 'Kevin Assogba', position: 'Milieu', jerseyNumber: 25, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 21, goals: 1, assists: 3, matches: 10, rating: 6.7, transferStatus: 'unavailable' },
    
    // Attaquants
    { id: 21, name: 'Jean Dupont', position: 'Attaquant', jerseyNumber: 10, isInjured: false, country: 'France', flag: '🇫🇷', age: 25, goals: 18, assists: 7, matches: 28, rating: 8.5, transferStatus: 'unavailable' },
    { id: 22, name: 'Pierre Agbodjan', position: 'Attaquant', jerseyNumber: 9, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 23, goals: 15, assists: 4, matches: 27, rating: 8.3, transferStatus: 'available' },
    { id: 23, name: 'Carlos Mendes', position: 'Attaquant', jerseyNumber: 19, isInjured: false, country: 'Cap-Vert', flag: '🇨🇻', age: 26, goals: 12, assists: 5, matches: 26, rating: 7.9, transferStatus: 'unavailable' },
    { id: 24, name: 'Moussa Sissoko', position: 'Attaquant', jerseyNumber: 17, isInjured: false, country: 'Mali', flag: '🇲🇱', age: 24, goals: 10, assists: 6, matches: 25, rating: 7.8, transferStatus: 'loan' },
    { id: 25, name: 'Emmanuel Zohoré', position: 'Attaquant', jerseyNumber: 27, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 22, goals: 8, assists: 3, matches: 20, rating: 7.4, transferStatus: 'unavailable' },
    { id: 26, name: 'Didier Ahouansou', position: 'Attaquant', jerseyNumber: 29, isInjured: true, injuryDetails: 'Pubalgie - 5 semaines', country: 'Bénin', flag: '🇧🇯', age: 27, goals: 6, assists: 2, matches: 16, rating: 7.2, transferStatus: 'available' },
    { id: 27, name: 'Victor Hounkanrin', position: 'Attaquant', jerseyNumber: 30, isInjured: false, country: 'Bénin', flag: '🇧🇯', age: 20, goals: 3, assists: 1, matches: 8, rating: 6.8, transferStatus: 'unavailable' },
    { id: 28, name: 'Sami Ben Ali', position: 'Attaquant', jerseyNumber: 28, isInjured: false, country: 'Tunisie', flag: '🇹🇳', age: 25, goals: 7, assists: 4, matches: 22, rating: 7.5, transferStatus: 'available' },
    { id: 29, name: 'Junior Akambi', position: 'Attaquant', jerseyNumber: 24, isInjured: false, country: 'Cameroun', flag: '🇨🇲', age: 23, goals: 5, assists: 2, matches: 14, rating: 7.1, transferStatus: 'unavailable' },
    { id: 30, name: 'Rachid Kagnon', position: 'Attaquant', jerseyNumber: 31, isInjured: true, injuryDetails: 'Commotion - 1 semaine', country: 'Bénin', flag: '🇧🇯', age: 21, goals: 2, assists: 1, matches: 9, rating: 6.6, transferStatus: 'loan' },
  ]);


  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Simple */}
        <div className="bg-gray-100 rounded-xl border-2 border-gray-300 p-8 mb-8">
          <h1 className="text-4xl font-bold text-black mb-3">
            Mon Club de Football
          </h1>
          <p className="text-gray-700 mb-4">Saison 2025/2026 - Effectif Complet</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white px-5 py-2 rounded-lg border-2 border-gray-400">
              <span className="text-black font-semibold">{players.filter(p => !p.isInjured).length}</span>
              <span className="text-gray-600 ml-2">Disponibles</span>
            </div>
            <div className="bg-white px-5 py-2 rounded-lg border-2 border-gray-400">
              <span className="text-black font-semibold">{players.filter(p => p.isInjured).length}</span>
              <span className="text-gray-600 ml-2">Blessés</span>
            </div>
            <div className="bg-white px-5 py-2 rounded-lg border-2 border-gray-400">
              <span className="text-black font-semibold">{players.filter(p => p.transferStatus === 'available').length}</span>
              <span className="text-gray-600 ml-2">Sur le marché</span>
            </div>
            <div className="bg-white px-5 py-2 rounded-lg border-2 border-gray-400">
              <span className="text-black font-semibold">{players.filter(p => p.transferStatus === 'loan').length}</span>
              <span className="text-gray-600 ml-2">En prêt</span>
            </div>
          </div>
        </div>

        {/* Grid de joueurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className={`bg-white rounded-xl border-2 border-gray-400 hover:border-black shadow-sm hover:shadow-lg transition-all cursor-pointer ${
                player.isInjured ? 'opacity-60' : ''
              }`}
            >
              {/* Header */}
              <div className="bg-gray-100 p-4 rounded-t-xl border-b-2 border-gray-400">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-black">
                    <span className="text-xl font-bold text-black">
                      {player.jerseyNumber}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {player.isInjured && (
                      <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        BLESSÉ
                      </span>
                    )}
                    {player.transferStatus === 'available' && (
                      <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <TransferIcon status="available" />
                        TRANSFÉRABLE
                      </span>
                    )}
                    {player.transferStatus === 'loan' && (
                      <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <TransferIcon status="loan" />
                        PRÊT
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-2xl">{player.flag}</div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="text-black font-bold text-lg mb-1">
                  {player.name}
                </h3>
                <p className="text-gray-700 text-sm mb-1">{player.position}</p>
                <p className="text-gray-600 text-xs mb-3">
                  {player.country} • {player.age} ans
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded p-2 text-center border-2 border-gray-300">
                    <div className="text-black font-bold">{player.goals}</div>
                    <div className="text-gray-600 text-xs">Buts</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-center border-2 border-gray-300">
                    <div className="text-black font-bold">{player.assists}</div>
                    <div className="text-gray-600 text-xs">Passes</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-center border-2 border-gray-300">
                    <div className="text-black font-bold">{player.matches}</div>
                    <div className="text-gray-600 text-xs">Matchs</div>
                  </div>
                </div>

                {/* Note */}
                <div className="mt-3 bg-gray-100 border-2 border-gray-400 rounded p-2 text-center">
                  <span className="text-black font-bold">{player.rating}</span>
                  <span className="text-gray-600 text-sm ml-1">/ 10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal détails */}
      {selectedPlayer && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlayer(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full border-2 border-black shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="bg-gray-100 p-6 border-b-2 border-gray-400">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="float-right bg-white border-2 border-black hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <span className="text-black text-2xl">×</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center border-2 border-black">
                  <span className="text-4xl font-bold text-black">
                    {selectedPlayer.jerseyNumber}
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-black mb-1">
                    {selectedPlayer.name}
                  </h2>
                  <p className="text-gray-800 text-lg">{selectedPlayer.position}</p>
                  <p className="text-gray-700 mt-1">
                    {selectedPlayer.flag} {selectedPlayer.country} • {selectedPlayer.age} ans
                  </p>
                </div>
              </div>

              {/* Statut transfert */}
              <div className="mt-4 flex gap-3">
                {selectedPlayer.transferStatus === 'available' && (
                  <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <TransferIcon status="available" />
                    <span className="font-semibold">Disponible au transfert</span>
                  </div>
                )}
                {selectedPlayer.transferStatus === 'loan' && (
                  <div className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <TransferIcon status="loan" />
                    <span className="font-semibold">En prêt</span>
                  </div>
                )}
                {selectedPlayer.transferStatus === 'unavailable' && (
                  <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Non transférable</span>
                  </div>
                )}
              </div>
            </div>

            {/* Body modal */}
            <div className="p-6">
              {/* Note */}
              <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-6 mb-6 text-center">
                <div className="text-black text-5xl font-bold mb-2">
                  {selectedPlayer.rating}
                </div>
                <div className="text-gray-700 text-lg font-semibold">
                  Note Moyenne / 10
                </div>
              </div>

              {/* Stats */}
              <h3 className="text-black font-bold text-xl mb-4">Statistiques</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">Buts marqués</span>
                  <span className="text-black text-2xl font-bold">{selectedPlayer.goals}</span>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">Passes décisives</span>
                  <span className="text-black text-2xl font-bold">{selectedPlayer.assists}</span>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">Matchs joués</span>
                  <span className="text-black text-2xl font-bold">{selectedPlayer.matches}</span>
                </div>
              </div>

              {/* Blessure */}
              {selectedPlayer.isInjured && selectedPlayer.injuryDetails && (
                <div className="mt-6 bg-gray-100 border-2 border-black rounded-xl p-5">
                  <h3 className="text-black font-bold text-lg mb-2 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Information Blessure
                  </h3>
                  <p className="text-gray-700 text-lg">
                    {selectedPlayer.injuryDetails}
                  </p>
                </div>
              )}

              {!selectedPlayer.isInjured && (
                <div className="mt-6 bg-white border-2 border-black rounded-xl p-5 text-center">
                  <p className="text-black text-lg font-semibold flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Joueur disponible pour la sélection
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;