'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";

import { 
  UserPlus, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Edit3,
  Trash2,
  Save,
  ChevronRight,
  User
} from 'lucide-react'

interface Recruit {
  id: number
  name: string
  position: string
  age: number
  country: string
  flag: string
  currentClub: string
  estimatedValue: string
  contractEnd: string
  status: 'En négociation' | 'Offre envoyée' | 'En observation' | 'Accord trouvé'
  phone: string
  email: string
  agent: string
  notes: string
  rating: number
  potential: 'Élite' | 'Très bon' | 'Bon' | 'Prometteur'
  offre?: string
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
      notes: 'Joueur de classe mondiale, vitesse exceptionnelle',
      rating: 94,
      potential: 'Élite',
      offre: 'Non'
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
      notes: 'Excellent milieu box-to-box, grand potentiel',
      rating: 92,
      potential: 'Élite',
      offre: 'Non'
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
      notes: 'Buteur prolifique, physique impressionnant',
      rating: 88,
      potential: 'Très bon',
      offre: '65M € + bonus'
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
      notes: 'Jeune prodige allemand, technique raffinée',
      rating: 89,
      potential: 'Élite',
      offre: '120M €'
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
      notes: 'Défenseur solide et rapide, bon dans le jeu aérien',
      rating: 87,
      potential: 'Très bon',
      offre: '75M €'
    },
  ])

  const [selectedRecruit, setSelectedRecruit] = useState<Recruit | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('Tous')
  
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
    rating: 75,
    potential: 'Bon',
    offre: 'Non'
  })

  // COULEURS VIVES SANS NOIR - STYLE SPORTIF
  const statusColors = {
    'En observation': {
      bg: 'bg-slate-700/80',
      border: 'border-slate-400',
      text: 'text-slate-200',
      accent: 'bg-slate-500',
      header: 'from-slate-700 to-slate-600'
    },
    'Offre envoyée': {
      bg: 'bg-orange-600/80',
      border: 'border-orange-400',
      text: 'text-orange-100',
      accent: 'bg-orange-500',
      header: 'from-orange-600 to-amber-500'
    },
    'En négociation': {
      bg: 'bg-blue-600/80',
      border: 'border-blue-400',
      text: 'text-blue-100',
      accent: 'bg-blue-500',
      header: 'from-blue-600 to-cyan-500'
    },
    'Accord trouvé': {
      bg: 'bg-emerald-600/80',
      border: 'border-emerald-400',
      text: 'text-emerald-100',
      accent: 'bg-emerald-500',
      header: 'from-emerald-600 to-teal-500'
    }
  }

  const potentialColors = {
    'Élite': 'bg-yellow-400 text-slate-900 border-yellow-300',
    'Très bon': 'bg-purple-500 text-white border-purple-400',
    'Bon': 'bg-blue-500 text-white border-blue-400',
    'Prometteur': 'bg-teal-500 text-white border-teal-400'
  }

  const positionColors: Record<string, string> = {
    'Attaquant': 'text-rose-400 bg-rose-950/50 border-rose-700',
    'Milieu': 'text-cyan-400 bg-cyan-950/50 border-cyan-700',
    'Défenseur': 'text-emerald-400 bg-emerald-950/50 border-emerald-700',
    'Gardien': 'text-amber-400 bg-amber-950/50 border-amber-700'
  }

  const filteredRecruits = recruits.filter(recruit => {
    const matchesSearch = recruit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recruit.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'Tous' || recruit.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = [
    { label: 'CIBLES', value: recruits.length, color: 'from-slate-400 to-slate-300' },
    { label: 'ACCORDS', value: recruits.filter(r => r.status === 'Accord trouvé').length, color: 'from-emerald-400 to-teal-300' },
    { label: 'OFFRES', value: recruits.filter(r => r.status === 'Offre envoyée' || r.status === 'En négociation').length, color: 'from-orange-400 to-amber-300' },
    { label: 'BUDGET', value: '250M €', color: 'from-cyan-400 to-blue-300' }
  ]

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
      rating: 75,
      potential: 'Bon',
      offre: 'Non'
    })
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const openEditModal = (recruit: Recruit) => {
    setFormData(recruit)
    setIsEditing(true)
    setIsModalOpen(true)
    setSelectedRecruit(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      setRecruits(recruits.map(r => r.id === formData.id ? formData : r))
    } else {
      setRecruits([...recruits, formData])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer cette cible ?')) {
      setRecruits(recruits.filter(r => r.id !== id))
      setSelectedRecruit(null)
    }
  }

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-900">
      {/* HEADER TRANSPARENT */}
      <header className="sticky top-0 z-40 bg-slate-900/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white">
                  Centre <span className="text-cyan-400">Recrutement</span>
                </h1>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Saison 2024-2025</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black uppercase tracking-wide hover:bg-cyan-400 transition-colors flex items-center gap-2 shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              Nouvelle Cible
            </motion.button>
          </div>

          {/* STATS BAR */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* FILTRES */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="RECHERCHER UN JOUEUR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-bold uppercase tracking-wide transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['Tous', 'En observation', 'Offre envoyée', 'En négociation', 'Accord trouvé'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-3 rounded-xl font-black text-sm uppercase tracking-wide whitespace-nowrap transition-all border-2 ${
                  filterStatus === status
                    ? 'bg-white text-slate-900 border-white'
                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE CARTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredRecruits.map((recruit, index) => {
              const status = statusColors[recruit.status]
              const posStyle = positionColors[recruit.position] || 'text-slate-400 bg-slate-900/50 border-slate-700'
              
              return (
                <motion.div
                  key={recruit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedRecruit(recruit)}
                  className={`group relative bg-slate-800/40 backdrop-blur-md border-2 ${status.border} rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-${status.accent}/20`}
                >
                  {/* BADGE STATUT */}
                  <div className={`absolute top-0 right-0 ${status.accent} text-white text-xs font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10 shadow-lg`}>
                    {recruit.status}
                  </div>

                  {/* HEADER CARTE */}
                  <div className={`bg-gradient-to-r ${status.header} p-4 border-b ${status.border}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl filter drop-shadow-lg">{recruit.flag}</span>
                        <div>
                          <div className="text-2xl font-black text-white leading-none mb-1 drop-shadow-md">{recruit.name}</div>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border backdrop-blur-sm ${posStyle}`}>
                            <Shield className="w-3 h-3" />
                            {recruit.position}
                          </div>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${potentialColors[recruit.potential]} flex items-center justify-center text-xl font-black border-2 shadow-lg backdrop-blur-sm`}>
                        {recruit.rating}
                      </div>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-4 space-y-3 bg-slate-900/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-bold uppercase text-xs">Club Actuel</span>
                      <span className="text-white font-bold">{recruit.currentClub}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-bold uppercase text-xs">Valeur</span>
                      <span className="text-cyan-400 font-black text-lg">{recruit.estimatedValue}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-bold uppercase text-xs">Contrat</span>
                      <span className="text-white font-bold">{recruit.contractEnd}</span>
                    </div>

                    {/* BARRE PROGRESSION */}
                    <div className="pt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 font-bold uppercase">Progression</span>
                        <span className={status.text}>{recruit.offre !== 'Non' ? 'OFFRE: ' + recruit.offre : 'AUCUNE OFFRE'}</span>
                      </div>
                      <div className="h-2 bg-slate-950/50 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: recruit.status === 'Accord trouvé' ? '100%' : recruit.status === 'En négociation' ? '75%' : recruit.status === 'Offre envoyée' ? '50%' : '25%' }}
                          className={`h-full ${status.accent}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className={`${status.bg} backdrop-blur-sm px-4 py-2 border-t ${status.border} flex items-center justify-between`}>
                    <span className={`text-xs font-bold uppercase ${status.text}`}>{recruit.potential}</span>
                    <ChevronRight className={`w-5 h-5 ${status.text}`} />
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* MODAL DETAILS */}
      <AnimatePresence>
        {selectedRecruit && !isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedRecruit(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border-2 ${statusColors[selectedRecruit.status].border} rounded-3xl overflow-hidden shadow-2xl`}
            >
              {/* HEADER */}
              <div className={`bg-gradient-to-r ${statusColors[selectedRecruit.status].header} p-6 border-b-2 ${statusColors[selectedRecruit.status].border} relative`}>
                <button
                  onClick={() => setSelectedRecruit(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-slate-950/30 hover:bg-slate-950/50 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="flex items-center gap-6">
                  <div className="text-7xl filter drop-shadow-2xl">{selectedRecruit.flag}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-4xl font-black text-white uppercase italic drop-shadow-lg">{selectedRecruit.name}</h2>
                      <div className={`px-3 py-1 rounded-lg text-sm font-black border-2 ${potentialColors[selectedRecruit.potential]}`}>
                        {selectedRecruit.potential}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-white/90">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold border backdrop-blur-sm ${positionColors[selectedRecruit.position]}`}>
                        <Shield className="w-4 h-4" />
                        {selectedRecruit.position}
                      </span>
                      <span className="font-bold">{selectedRecruit.age} ANS</span>
                      <span className="font-bold">•</span>
                      <span className="font-bold">{selectedRecruit.country.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="text-center bg-slate-950/30 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
                    <div className="text-5xl font-black text-white drop-shadow-lg">{selectedRecruit.rating}</div>
                    <div className="text-xs text-slate-300 font-bold uppercase">Note</div>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4 bg-slate-900/40">
                {/* GRID INFO */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">Club Actuel</div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-cyan-400" />
                      {selectedRecruit.currentClub}
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">Valeur Marchande</div>
                    <div className="text-xl font-black text-cyan-400">{selectedRecruit.estimatedValue}</div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">Fin Contrat</div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-slate-400" />
                      {selectedRecruit.contractEnd}
                    </div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">Statut</div>
                    <div className={`text-xl font-black ${statusColors[selectedRecruit.status].text}`}>
                      {selectedRecruit.status}
                    </div>
                  </div>
                </div>

                {/* OFFRE EN COURS */}
                <div className={`bg-gradient-to-r ${statusColors[selectedRecruit.status].header} border-2 ${statusColors[selectedRecruit.status].border} rounded-xl p-4 backdrop-blur-sm`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase text-white/70 mb-1">Offre en cours</div>
                      <div className={`text-2xl font-black text-white drop-shadow-md`}>
                        {selectedRecruit.offre || 'Aucune offre'}
                      </div>
                    </div>
                    <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white/30`}>
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-bold uppercase text-slate-400 mb-2">Contact</div>
                  <div className="flex items-center gap-3 text-white">
                    <User className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold">{selectedRecruit.agent}</span>
                  </div>
                  <a href={`tel:${selectedRecruit.phone}`} className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="font-bold">{selectedRecruit.phone}</span>
                  </a>
                  <a href={`mailto:${selectedRecruit.email}`} className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="font-bold">{selectedRecruit.email}</span>
                  </a>
                </div>

                {/* NOTES */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-sm mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Notes & Observations
                  </div>
                  <p className="text-slate-300 leading-relaxed">{selectedRecruit.notes}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openEditModal(selectedRecruit)}
                    className="flex-1 bg-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-wide hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Edit3 className="w-5 h-5" />
                    Modifier
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDelete(selectedRecruit.id)}
                    className="flex-1 bg-rose-600 text-white py-4 rounded-xl font-black uppercase tracking-wide hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
                  >
                    <Trash2 className="w-5 h-5" />
                    Supprimer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700 rounded-3xl shadow-2xl"
            >
              <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b-2 border-slate-700 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-black text-white uppercase italic">
                  {isEditing ? 'Modifier Cible' : 'Nouvelle Cible'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Nom</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="NOM DU JOUEUR"
                    />
import { motion, AnimatePresence } from "motion/react";
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Position</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="Attaquant">ATTAQUANT</option>
                      <option value="Milieu">MILIEU</option>
                      <option value="Défenseur">DÉFENSEUR</option>
                      <option value="Gardien">GARDIEN</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Âge</label>
                    <input
                      type="number"
                      required
                      min="16"
                      max="45"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Note (0-100)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Pays</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="FRANCE"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Drapeau</label>
                    <input
                      type="text"
                      required
                      value={formData.flag}
                      onChange={(e) => setFormData({...formData, flag: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="🇫🇷"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Club Actuel</label>
                    <input
                      type="text"
                      required
                      value={formData.currentClub}
                      onChange={(e) => setFormData({...formData, currentClub: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="REAL MADRID"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Valeur</label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="180M €"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Fin Contrat</label>
                    <input
                      type="text"
                      required
                      value={formData.contractEnd}
                      onChange={(e) => setFormData({...formData, contractEnd: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="2028"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Statut</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="En observation">EN OBSERVATION</option>
                      <option value="Offre envoyée">OFFRE ENVOYÉE</option>
                      <option value="En négociation">EN NÉGOCIATION</option>
                      <option value="Accord trouvé">ACCORD TROUVÉ</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Potentiel</label>
                    <select
                      value={formData.potential}
                      onChange={(e) => setFormData({...formData, potential: e.target.value as any})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="Élite">ÉLITE</option>
                      <option value="Très bon">TRÈS BON</option>
                      <option value="Bon">BON</option>
                      <option value="Prometteur">PROMETTEUR</option>
                    </select>
                  </div>

                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Offre Actuelle</label>
                    <input
                      type="text"
                      value={formData.offre}
                      onChange={(e) => setFormData({...formData, offre: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="NON ou 50M €"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Agent</label>
                    <input
                      type="text"
                      required
                      value={formData.agent}
                      onChange={(e) => setFormData({...formData, agent: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="NOM DE L'AGENT"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Téléphone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="agent@email.com"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Notes</label>
                    <textarea
                      required
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      placeholder="DESCRIPTION DU JOUEUR..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-black uppercase tracking-wide transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-black uppercase tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                  >
                    <Save className="w-5 h-5" />
                    {isEditing ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page