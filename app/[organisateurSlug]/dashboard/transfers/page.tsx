"use client"
import React, { useState } from 'react';

// 1. Définition de la structure d'un mouvement
interface Mouvement {
  id: number;
  joueur: string;
  type: 'ACHAT' | 'VENTE' | 'PRÊT';
  clubPartenaire: string; // Le club qui achète ou vend
  valeur: string;
}

const Page: React.FC = () => {
  // 2. État initial (Données du club)
  const [mouvements, setMouvements] = useState<Mouvement[]>([
    { id: 1, joueur: "Erling Haaland", type: 'ACHAT', clubPartenaire: "Man. City", valeur: "180M €" },
    { id: 2, joueur: "Gavi", type: 'VENTE', clubPartenaire: "PSG", valeur: "90M €" },
    { id: 3, joueur: "Xavi Simons", type: 'PRÊT', clubPartenaire: "RB Leipzig", valeur: "0 €" },
  ]);

  const nomMonClub = "MON CLUB FC";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-mono p-4">
      
      {/* HEADER */}
      <nav className="bg-black text-white p-5 border-b-4 border-blue-600 mb-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-black">{nomMonClub} _ MANAGER</span>
          <div className="bg-blue-600 px-3 py-1 text-sm font-bold uppercase">Mercato Ouvert</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          
          {/* STATS RAPIDES */}
          <div className="col-span-12 md:col-span-4 space-y-4">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-black uppercase border-b-2 border-black mb-4">Résumé</h2>
              <p className="text-sm">Mouvements totaux : <strong>{mouvements.length}</strong></p>
              <p className="text-sm">Type : Achat / Vente / Prêt</p>
            </div>
          </div>

          {/* TABLEAU DES TRANSFERTS */}
          <div className="col-span-12 md:col-span-8">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-white text-left text-xs">
                    <th className="p-4">JOUEUR</th>
                    <th className="p-4">TYPE</th>
                    <th className="p-4">TRANSFERT</th>
                    <th className="p-4 text-right">VALEUR</th>
                  </tr>
                </thead>
                <tbody>
                  {mouvements.map((m) => (
                    <tr key={m.id} className="border-b-2 border-black hover:bg-yellow-50">
                      <td className="p-4 font-black uppercase">{m.joueur}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-bold ${
                          m.type === 'ACHAT' ? 'bg-green-400' : 
                          m.type === 'VENTE' ? 'bg-red-400' : 'bg-blue-400'
                        }`}>
                          {m.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold">
                        {m.type === 'ACHAT' ? `${m.clubPartenaire} ➔ ICI` : `ICI ➔ ${m.clubPartenaire}`}
                      </td>
                      <td className="p-4 text-right font-black">{m.valeur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Page;