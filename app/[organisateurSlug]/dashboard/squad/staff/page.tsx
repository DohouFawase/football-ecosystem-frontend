"use client"
import React, { JSX, useState } from 'react';

interface Staff {
  id: number;
  name: string;
  role: string;
  age: number;
  country: string;
  flag: string;
  experience: number;
  phone: string;
  email: string;
}

const StaffIcon = ({ role }: { role: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    'Entraîneur': (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
      </svg>
    ),
    'Assistant': (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
    'Préparateur': (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    ),
    'Médecin': (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };
  return icons[role] || icons['Assistant'];
};

const getRoleColor = (role: string) => {
  const colors: { [key: string]: { bg: string; border?: string; text: string; badge: string } } = {
    'Entraîneur': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-700',
      badge: 'bg-blue-500'
    },
    'Assistant': { 
      bg: 'bg-green-100', 
      text: 'text-green-700',
      badge: 'bg-green-500'
    },
    'Préparateur': { 
      bg: 'bg-orange-100', 
      text: 'text-orange-700',
      badge: 'bg-orange-500'
    },
    'Médecin': { 
      bg: 'bg-red-100', 
      text: 'text-red-700',
      badge: 'bg-red-500'
    },
  };
  return colors[role] || colors['Assistant'];
};

const Page = () => {
  const [staffMembers, setStaffMembers] = useState<Staff[]>([
    { id: 1, name: 'Michel Dussuyer', role: 'Entraîneur', age: 52, country: 'France', flag: '🇫🇷', experience: 15, phone: '+33 6 12 34 56 78', email: 'michel.d@club.com' },
    { id: 2, name: 'Jean-Marc Nobilo', role: 'Assistant', age: 48, country: 'France', flag: '🇫🇷', experience: 12, phone: '+33 6 98 76 54 32', email: 'jm.nobilo@club.com' },
    { id: 3, name: 'Moussa Latoundji', role: 'Préparateur', age: 45, country: 'Bénin', flag: '🇧🇯', experience: 10, phone: '+229 97 12 34 56', email: 'm.latoundji@club.com' },
    { id: 4, name: 'Dr. Ahmed Koné', role: 'Médecin', age: 50, country: 'Côte d\'Ivoire', flag: '🇨🇮', experience: 20, phone: '+225 07 12 34 56', email: 'a.kone@club.com' },
    { id: 5, name: 'Pierre Aristide', role: 'Assistant', age: 42, country: 'Bénin', flag: '🇧🇯', experience: 8, phone: '+229 96 11 22 33', email: 'p.aristide@club.com' },
  ]);

  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Staff>({
    id: 0,
    name: '',
    role: 'Assistant',
    age: 30,
    country: '',
    flag: '',
    experience: 0,
    phone: '',
    email: '',
  });

  const openAddModal = () => {
    setFormData({
      id: Date.now(),
      name: '',
      role: 'Assistant',
      age: 30,
      country: '',
      flag: '',
      experience: 0,
      phone: '',
      email: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (staff: Staff) => {
    setFormData(staff);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setStaffMembers(staffMembers.map(s => s.id === formData.id ? formData : s));
    } else {
      setStaffMembers([...staffMembers, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre du staff ?')) {
      setStaffMembers(staffMembers.filter(s => s.id !== id));
      setSelectedStaff(null);
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
                Staff Technique
              </h1>
              <p className="text-gray-700">Équipe d&apos;encadrement - Saison 2025/2026</p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Ajouter un membre
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-purple-100 px-5 py-3 rounded-xl   ">
              <span className="font-semibold text-lg">{staffMembers.length}</span>
              <span className=" ml-2">Membres</span>
            </div>
            <div className="bg-blue-100 px-5 py-3 rounded-xl   ">
              <span className=" font-semibold text-lg">{staffMembers.filter(s => s.role === 'Entraîneur').length}</span>
              <span className=" ml-2">Entraîneurs</span>
            </div>
            <div className="bg-green-100 px-5 py-3 rounded-xl   ">
              <span className=" font-semibold text-lg">{staffMembers.filter(s => s.role === 'Assistant').length}</span>
              <span className=" ml-2">Assistants</span>
            </div>
          </div>
        </div>

        {/* Grid du staff */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((staff) => {
            const colors = getRoleColor(staff.role);
            return (
              <div
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className={`bg-white rounded-2xl border-2 ${colors.border} hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1`}
              >
                {/* Header */}
                <div className={` p-5 rounded-t-2xl border-b-2 ${colors.border}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className={`bg-white rounded-full w-16 h-16 flex items-center justify-center border-2 ${colors.border} shadow-md ${colors.text}`}>
                      <StaffIcon role={staff.role} />
                    </div>
                    <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                      {staff.role}
                    </span>
                  </div>
                  <div className="text-3xl">{staff.flag}</div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-gray-900 font-bold text-xl mb-2">
                    {staff.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {staff.country} • {staff.age} ans
                  </p>

                  {/* Info */}
                  <div className="space-y-2">
                    <div className={`${colors.bg} rounded-lg p-3 border-2 ${colors.border}`}>
                      <div className="text-gray-600 text-xs font-semibold">Expérience</div>
                      <div className={`${colors.text} font-bold text-lg`}>{staff.experience} ans</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal détails */}
      {selectedStaff && !isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStaff(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full border-2 border-gray-300 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className={`${getRoleColor(selectedStaff.role).bg} p-6 border-b-2 ${getRoleColor(selectedStaff.role).border}`}>
              <button
                onClick={() => setSelectedStaff(null)}
                className="float-right bg-white border-2 border-gray-300 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              >
                <span className="text-gray-600 text-2xl">×</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className={`bg-white rounded-full w-20 h-20 flex items-center justify-center border-2 ${getRoleColor(selectedStaff.role).border} shadow-lg ${getRoleColor(selectedStaff.role).text}`}>
                  <StaffIcon role={selectedStaff.role} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">
                    {selectedStaff.name}
                  </h2>
                  <p className={`${getRoleColor(selectedStaff.role).text} text-lg font-semibold`}>{selectedStaff.role}</p>
                  <p className="text-gray-700 mt-1">
                    {selectedStaff.flag} {selectedStaff.country} • {selectedStaff.age} ans
                  </p>
                </div>
              </div>
            </div>

            {/* Body modal */}
            <div className="p-6">
              <h3 className="text-gray-900 font-bold text-xl mb-4">Informations</h3>
              <div className="space-y-3">
                <div className={`${getRoleColor(selectedStaff.role).bg} border-2 ${getRoleColor(selectedStaff.role).border} rounded-xl p-4`}>
                  <span className="text-gray-600 text-sm font-semibold">Expérience</span>
                  <p className={`${getRoleColor(selectedStaff.role).text} text-lg font-bold`}>{selectedStaff.experience} ans</p>
                </div>
                <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Téléphone</span>
                  <p className="text-gray-900 text-lg font-bold">{selectedStaff.phone}</p>
                </div>
                <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-4">
                  <span className="text-gray-600 text-sm font-semibold">Email</span>
                  <p className="text-gray-900 text-lg font-bold">{selectedStaff.email}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    openEditModal(selectedStaff);
                    setSelectedStaff(null);
                  }}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(selectedStaff.id)}
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

      {/* Modal formulaire (Ajouter/Modifier) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full border-2 border-gray-300 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-blue-500 p-6">
              <h2 className="text-3xl font-bold text-white">
                {isEditing ? 'Modifier le membre' : 'Ajouter un membre'}
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Ex: Michel Dussuyer"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Rôle</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="Entraîneur">Entraîneur</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Préparateur">Préparateur Physique</option>
                    <option value="Médecin">Médecin</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Âge</label>
                    <input
                      type="number"
                      required
                      min="25"
                      max="70"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Expérience (ans)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="40"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Ex: 🇫🇷"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Ex: nom@club.com"
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
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
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