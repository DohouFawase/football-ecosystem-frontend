'use client'
import React, { useState } from 'react';

interface Recruit {
  id: number;
  name: string;
  position: string;
  age: number;
  country: string;
  flag: string;
  currentClub: string;
  estimatedValue: string;
  contractEnd: string;
  status: 'En négociation' | 'Offre envoyée' | 'En observation' | 'Accord trouvé';
  phone: string;
  email: string;
  agent: string;
  notes: string;
}

const Page = () => {
  const [recruits, setRecruits] = useState<Recruit[]>([
    {
      id: 1,
      name: 'Kylian Mbappé',
      position: 'Attaquant',
      age: 25,
      country: 'France',
      flag: '🇫🇷',
      currentClub: 'Real Madrid',
      estimatedValue: '180M €',
      contractEnd: '2028',
      status: 'En observation',
      phone: '+33 6 12 34 56 78',
      email: 'k.mbappe@agent.com',
      agent: 'John Smith',
      notes: 'Joueur de classe mondiale, vitesse exceptionnelle'
    },
    {
      id: 2,
      name: 'Jude Bellingham',
      position: 'Milieu',
      age: 21,
      country: 'Angleterre',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      currentClub: 'Real Madrid',
      estimatedValue: '150M €',
      contractEnd: '2029',
      status: 'En observation',
      phone: '+44 7123 456789',
      email: 'j.bellingham@agent.com',
      agent: 'Sarah Johnson',
      notes: 'Excellent milieu box-to-box, grand potentiel'
    },
    {
      id: 3,
      name: 'Victor Osimhen',
      position: 'Attaquant',
      age: 25,
      country: 'Nigeria',
      flag: '🇳🇬',
      currentClub: 'Galatasaray',
      estimatedValue: '75M €',
      contractEnd: '2026',
      status: 'En négociation',
      phone: '+234 802 123 4567',
      email: 'v.osimhen@agent.com',
      agent: 'Roberto Calenda',
      notes: 'Buteur prolifique, physique impressionnant'
    },
    {
      id: 4,
      name: 'Florian Wirtz',
      position: 'Milieu',
      age: 21,
      country: 'Allemagne',
      flag: '🇩🇪',
      currentClub: 'Bayer Leverkusen',
      estimatedValue: '130M €',
      contractEnd: '2027',
      status: 'Offre envoyée',
      phone: '+49 151 12345678',
      email: 'f.wirtz@agent.com',
      agent: 'Hans Berger',
      notes: 'Jeune prodige allemand, technique raffinée'
    },
    {
      id: 5,
      name: 'William Saliba',
      position: 'Défenseur',
      age: 23,
      country: 'France',
      flag: '🇫🇷',
      currentClub: 'Arsenal',
      estimatedValue: '80M €',
      contractEnd: '2027',
      status: 'Accord trouvé',
      phone: '+33 6 98 76 54 32',
      email: 'w.saliba@agent.com',
      agent: 'Djibril Niang',
      notes: 'Défenseur solide et rapide, bon dans le jeu aérien'
    },
  ]);

  const [selectedRecruit, setSelectedRecruit] = useState<Recruit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Recruit>({
    id: 0,
    name: '',
    position: 'Attaquant',
    age: 20,
    country: '',
    flag: '',
    currentClub: '',
    estimatedValue: '',
    contractEnd: '',
    status: 'En observation',
    phone: '',
    email: '',
    agent: '',
    notes: '',
  });

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
      'En négociation': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
      'Offre envoyée': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' },
      'En observation': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-500' },
      'Accord trouvé': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
    };
    return colors[status] || colors['En observation'];
  };

  const openAddModal = () => {
    setFormData({
      id: Date.now(),
      name: '',
      position: 'Attaquant',
      age: 20,
      country: '',
      flag: '',
      currentClub: '',
      estimatedValue: '',
      contractEnd: '',
      status: 'En observation',
      phone: '',
      email: '',
      agent: '',
      notes: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (recruit: Recruit) => {
    setFormData(recruit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setRecruits(recruits.map(r => r.id === formData.id ? formData : r));
    } else {
      setRecruits([...recruits, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recrue ?')) {
      setRecruits(recruits.filter(r => r.id !== id));
      setSelectedRecruit(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Recrutement
              </h1>
              <p className="text-gray-700">Cibles et négociations en cours</p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Ajouter une cible
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-purple-100 px-5 py-3 rounded-xl border-2 border-purple-400 shadow-sm">
              <span className="text-purple-700 font-semibold text-lg">{recruits.length}</span>
              <span className="text-purple-600 ml-2">Cibles</span>
            </div>
            <div className="bg-green-100 px-5 py-3 rounded-xl border-2 border-green-400 shadow-sm">
              <span className="text-green-700 font-semibold text-lg">{recruits.filter(r => r.status === 'Accord trouvé').length}</span>
              <span className="text-green-600 ml-2">Accords</span>
            </div>
            <div className="bg-blue-100 px-5 py-3 rounded-xl border-2 border-blue-400 shadow-sm">
              <span className="text-blue-700 font-semibold text-lg">{recruits.filter(r => r.status === 'En négociation').length}</span>
              <span className="text-blue-600 ml-2">Négociations</span>
            </div>
          </div>
        </div>

        {/* Grid des recrues */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recruits.map((recruit) => {
            const statusColor = getStatusColor(recruit.status);
            return (
              <div
                key={recruit.id}
                onClick={() => setSelectedRecruit(recruit)}
                className="bg-white rounded-2xl border-2 border-gray-300 hover:border-purple-500 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              >
                {/* Header */}
                <div className="bg-purple-100 p-5 rounded-t-2xl border-b-2 border-purple-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-4xl">{recruit.flag}</div>
                    <span className={`${statusColor.bg} ${statusColor.text} text-xs font-bold px-3 py-1.5 rounded-full border-2 ${statusColor.border}`}>
                      {recruit.status}
                    </span>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1 inline-block border-2 border-purple-300">
                    <span className="text-purple-700 font-bold text-sm">{recruit.position}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-gray-900 font-bold text-xl mb-2">
                    {recruit.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    {recruit.country} • {recruit.age} ans
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    {recruit.currentClub}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-3 border-2 border-gray-200">
                      <div className="text-gray-600 text-xs font-semibold">Valeur estimée</div>
                      <div className="text-purple-600 font-bold text-lg">{recruit.estimatedValue}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border-2 border-gray-200">
                      <div className="text-gray-600 text-xs font-semibold">Fin de contrat</div>
                      <div className="text-gray-900 font-bold">{recruit.contractEnd}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal détails */}
      {selectedRecruit && !isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRecruit(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full border-2 border-purple-300 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="bg-purple-100 p-6 border-b-2 border-purple-300">
              <button
                onClick={() => setSelectedRecruit(null)}
                className="float-right bg-white border-2 border-gray-300 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              >
                <span className="text-gray-600 text-2xl">×</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="text-6xl">{selectedRecruit.flag}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">
                    {selectedRecruit.name}
                  </h2>
                  <p className="text-purple-700 text-lg font-semibold">{selectedRecruit.position}</p>
                  <p className="text-gray-700 mt-1">
                    {selectedRecruit.country} • {selectedRecruit.age} ans
                  </p>
                </div>
              </div>

              {/* Statut */}
              <div className="mt-4">
                <span className={`${getStatusColor(selectedRecruit.status).bg} ${getStatusColor(selectedRecruit.status).text} px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(selectedRecruit.status).border} inline-block`}>
                  {selectedRecruit.status}
                </span>
              </div>
            </div>

            {/* Body modal */}
            <div className="p-6">
              <h3 className="text-gray-900 font-bold text-xl mb-4">Informations</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Club actuel</span>
                  <p className="text-gray-900 text-lg font-bold">{selectedRecruit.currentClub}</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Valeur estimée</span>
                  <p className="text-purple-600 text-lg font-bold">{selectedRecruit.estimatedValue}</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Fin de contrat</span>
                  <p className="text-gray-900 text-lg font-bold">{selectedRecruit.contractEnd}</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Agent</span>
                  <p className="text-gray-900 text-lg font-bold">{selectedRecruit.agent}</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Téléphone</span>
                  <p className="text-gray-900 text-lg font-bold">{selectedRecruit.phone}</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Email</span>
                  <p className="text-gray-900 text-lg font-bold">{selectedRecruit.email}</p>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Notes</span>
                  <p className="text-gray-900 mt-1">{selectedRecruit.notes}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    openEditModal(selectedRecruit);
                    setSelectedRecruit(null);
                  }}
                  className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(selectedRecruit.id)}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal formulaire */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full border-2 border-purple-300 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-purple-500 p-6 sticky top-0 z-10">
              <h2 className="text-3xl font-bold text-white">
                {isEditing ? 'Modifier la cible' : 'Ajouter une cible'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Ex: Kylian Mbappé"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Position</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="Attaquant">Attaquant</option>
                      <option value="Milieu">Milieu</option>
                      <option value="Défenseur">Défenseur</option>
                      <option value="Gardien">Gardien</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Âge</label>
                    <input
                      type="number"
                      required
                      min="16"
                      max="40"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Pays</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="Ex: France"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Drapeau</label>
                    <input
                      type="text"
                      required
                      value={formData.flag}
                      onChange={(e) => setFormData({...formData, flag: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="Ex: 🇫🇷"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Club actuel</label>
                  <input
                    type="text"
                    required
                    value={formData.currentClub}
                    onChange={(e) => setFormData({...formData, currentClub: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Ex: Real Madrid"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Valeur estimée</label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="Ex: 50M €"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Fin de contrat</label>
                    <input
                      type="text"
                      required
                      value={formData.contractEnd}
                      onChange={(e) => setFormData({...formData, contractEnd: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="Ex: 2027"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  >
                    <option value="En observation">En observation</option>
                    <option value="Offre envoyée">Offre envoyée</option>
                    <option value="En négociation">En négociation</option>
                    <option value="Accord trouvé">Accord trouvé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Agent</label>
                  <input
                    type="text"
                    required
                    value={formData.agent}
                    onChange={(e) => setFormData({...formData, agent: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Ex: John Smith"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Ex: +33 6 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Ex: joueur@agent.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Notes / Observations</label>
                  <textarea
                    required
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Ex: Joueur rapide avec un bon finish..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg"
                >
                  {isEditing ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;