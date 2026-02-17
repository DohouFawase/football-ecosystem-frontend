'use client'

import React, { useState, useMemo, useRef } from 'react'
import { 
  Search, 
  Filter, 
  FileText, 
  Star, 
  Calendar, 
  User, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronDown, 
  Download, 
  Share2, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageSquare,
  Target,
  BarChart3,
  Zap,
  Award,
  ArrowLeft,
  Printer,
  Check,
  X,
  Save,
  Send,
  MoreHorizontal,
  Eye,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

// Types
interface Player {
  id: string
  name: string
  age: number
  nationality: string
  position: string
  club: string
  height: number
  weight: number
  foot: 'left' | 'right' | 'both'
}

interface Comment {
  id: string
  author: string
  date: string
  text: string
}

interface ScoutingReport {
  id: string
  player: Player
  scout: string
  date: string
  match: string
  matchDate: string
  venue: string
  competition: string
  overallRating: number
  potentialRating: number
  recommendation: 'sign' | 'monitor' | 'reject' | 'loan' | 'follow'
  summary: string
  strengths: string[]
  weaknesses: string[]
  tacticalAnalysis: string
  physicalAnalysis: string
  technicalAnalysis: string
  mentalAnalysis: string
  stats: {
    minutesPlayed: number
    goals: number
    assists: number
    passes: number
    passAccuracy: number
    duelsWon: number
    duelsTotal: number
    keyPasses: number
    shots: number
    shotsOnTarget: number
    rating: number
  }
  status: 'draft' | 'submitted' | 'reviewed' | 'archived'
  tags: string[]
  comments: Comment[]
}

const recommendations = {
  sign: { label: 'SIGNER', color: 'bg-emerald-500', hoverColor: 'hover:bg-emerald-600', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50', icon: CheckCircle2, desc: 'Recrutement prioritaire' },
  monitor: { label: 'SUIVRE', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600', textColor: 'text-blue-700', bgColor: 'bg-blue-50', icon: Eye, desc: 'Observation continue' },
  reject: { label: 'REJETER', color: 'bg-red-500', hoverColor: 'hover:bg-red-600', textColor: 'text-red-700', bgColor: 'bg-red-50', icon: XCircle, desc: 'Profil non adapté' },
  loan: { label: 'PRÊT', color: 'bg-amber-500', hoverColor: 'hover:bg-amber-600', textColor: 'text-amber-700', bgColor: 'bg-amber-50', icon: Clock, desc: 'Prêt avec OA possible' },
  follow: { label: 'À VOIR', color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600', textColor: 'text-purple-700', bgColor: 'bg-purple-50', icon: Target, desc: 'Nouvelles observations' }
}

const statusConfig = {
  draft: { label: 'Brouillon', color: 'bg-gray-400', textColor: 'text-gray-600', bgColor: 'bg-gray-100' },
  submitted: { label: 'Soumis', color: 'bg-blue-500', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
  reviewed: { label: 'Revu', color: 'bg-amber-500', textColor: 'text-amber-600', bgColor: 'bg-amber-50' },
  archived: { label: 'Archivé', color: 'bg-slate-500', textColor: 'text-slate-600', bgColor: 'bg-slate-100' }
}

export default function ScoutingReports() {
  // États
  const [reports, setReports] = useState<ScoutingReport[]>([
    {
      id: '1',
      player: {
        id: 'p1',
        name: 'Elias Kacou',
        age: 19,
        nationality: 'CIV',
        position: 'AIL',
        club: 'ASEC Mimosas',
        height: 178,
        weight: 72,
        foot: 'right'
      },
      scout: 'Jean Dupont',
      date: '2024-02-15',
      match: 'ASEC Mimosas vs Africa Sports',
      matchDate: '2024-02-10',
      venue: 'Stade Félix Houphouët-Boigny',
      competition: 'Ligue 1 CI',
      overallRating: 4.5,
      potentialRating: 5,
      recommendation: 'sign',
      summary: 'Joueur exceptionnel avec une explosivité rare. Capable de faire la différence individuellement.',
      strengths: ['Vitesse explosive', 'Dribble 1v1', 'Finition clinique', 'Mentalité compétiteur'],
      weaknesses: ['Participation défensive', 'Décisions précipitées', 'Jeu de tête'],
      tacticalAnalysis: 'Évolue sur l\'aile droite, aime provoquer en 1v1.',
      physicalAnalysis: 'Athlète complet, accélération exceptionnelle.',
      technicalAnalysis: 'Technique solide, contrôle orienté efficace.',
      mentalAnalysis: 'Leader discret, réactions positives aux erreurs.',
      stats: {
        minutesPlayed: 90,
        goals: 2,
        assists: 1,
        passes: 34,
        passAccuracy: 78,
        duelsWon: 12,
        duelsTotal: 18,
        keyPasses: 4,
        shots: 5,
        shotsOnTarget: 3,
        rating: 8.5
      },
      status: 'submitted',
      tags: ['rapide', 'technique', 'urgent'],
      comments: [
        { id: 'c1', author: 'Pierre Martin', date: '2024-02-16', text: 'Excellent rapport. Il faut avancer rapidement sur ce dossier.' }
      ]
    },
    {
      id: '2',
      player: {
        id: 'p2',
        name: 'Lucas Bergvall',
        age: 17,
        nationality: 'SWE',
        position: 'MC',
        club: 'Djurgårdens IF',
        height: 186,
        weight: 78,
        foot: 'right'
      },
      scout: 'Marie Lefebvre',
      date: '2024-02-20',
      match: 'Djurgårdens vs Malmö FF',
      matchDate: '2024-02-18',
      venue: 'Tele2 Arena',
      competition: 'Allsvenskan',
      overallRating: 3.8,
      potentialRating: 4.5,
      recommendation: 'monitor',
      summary: 'Milieu moderne avec excellente vision. À suivre 6-12 mois.',
      strengths: ['Vision', 'Calme', 'Positionnement tactique'],
      weaknesses: ['Physique adolescent', 'Résistance au duel'],
      tacticalAnalysis: 'Double pivot, excellente lecture défensive.',
      physicalAnalysis: 'Corpulence adolescente, musculation nécessaire.',
      technicalAnalysis: 'Passe excellente, dribble limité.',
      mentalAnalysis: 'Maturité tactique, leader naturel.',
      stats: {
        minutesPlayed: 85,
        goals: 0,
        assists: 2,
        passes: 67,
        passAccuracy: 89,
        duelsWon: 4,
        duelsTotal: 11,
        keyPasses: 6,
        shots: 1,
        shotsOnTarget: 0,
        rating: 7.2
      },
      status: 'reviewed',
      tags: ['intelligent', 'jeune'],
      comments: []
    },
    {
      id: '3',
      player: {
        id: 'p3',
        name: 'Kobbie Mainoo',
        age: 18,
        nationality: 'ENG',
        position: 'MDC',
        club: 'Manchester United',
        height: 180,
        weight: 75,
        foot: 'right'
      },
      scout: 'Thomas Bernard',
      date: '2024-02-22',
      match: 'Man Utd vs Liverpool',
      matchDate: '2024-02-20',
      venue: 'Old Trafford',
      competition: 'Premier League',
      overallRating: 4.2,
      potentialRating: 4.8,
      recommendation: 'sign',
      summary: 'Phénomène de maturité. Peut devenir top européen.',
      strengths: ['Maturité tactique', 'Récupération', 'Calme sous pression'],
      weaknesses: ['Blessures mineures', 'Jeu aérien'],
      tacticalAnalysis: 'Excellente anticipation, brise les lignes.',
      physicalAnalysis: 'Athlète fonctionnel, résistance remarquable.',
      technicalAnalysis: 'Technique parfaite pour son poste.',
      mentalAnalysis: 'Mentalité gagnant, intelligence émotionnelle.',
      stats: {
        minutesPlayed: 90,
        goals: 0,
        assists: 0,
        passes: 78,
        passAccuracy: 94,
        duelsWon: 9,
        duelsTotal: 12,
        keyPasses: 3,
        shots: 0,
        shotsOnTarget: 0,
        rating: 7.8
      },
      status: 'submitted',
      tags: ['complet', 'top niveau'],
      comments: [
        { id: 'c2', author: 'DS', date: '2024-02-23', text: 'Inaccessible, contrat long avec MU.' }
      ]
    }
  ])

  // États UI
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedScout, setSelectedScout] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'potential'>('date')
  const [selectedReport, setSelectedReport] = useState<ScoutingReport | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  
  // État formulaire création/édition
  const [formData, setFormData] = useState<Partial<ScoutingReport>>({
    player: {
      id: 'new',
      name: '',
      age: 18,
      nationality: '',
      position: '',
      club: '',
      height: 180,
      weight: 75,
      foot: 'right'
    },
    match: '',
    matchDate: new Date().toISOString().split('T')[0],
    venue: '',
    competition: '',
    overallRating: 3,
    potentialRating: 3,
    recommendation: 'monitor',
    summary: '',
    strengths: [],
    weaknesses: [],
    tacticalAnalysis: '',
    physicalAnalysis: '',
    technicalAnalysis: '',
    mentalAnalysis: '',
    stats: {
      minutesPlayed: 90,
      goals: 0,
      assists: 0,
      passes: 0,
      passAccuracy: 0,
      duelsWon: 0,
      duelsTotal: 0,
      keyPasses: 0,
      shots: 0,
      shotsOnTarget: 0,
      rating: 6.0
    },
    status: 'draft',
    tags: [],
    comments: []
  })

  const [newStrength, setNewStrength] = useState('')
  const [newWeakness, setNewWeakness] = useState('')
  const [newTag, setNewTag] = useState('')

  // Refs
  const printRef = useRef<HTMLDivElement>(null)

  // Computed
  const filteredReports = useMemo(() => {
    let filtered = reports.filter(report => {
      const matchesSearch = report.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.scout.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.match.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRec = selectedRecommendation === 'all' || report.recommendation === selectedRecommendation
      const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
      const matchesScout = selectedScout === 'all' || report.scout === selectedScout
      
      return matchesSearch && matchesRec && matchesStatus && matchesScout
    })

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'date': return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'rating': return b.overallRating - a.overallRating
        case 'potential': return b.potentialRating - a.potentialRating
        default: return 0
      }
    })

    return filtered
  }, [reports, searchQuery, selectedRecommendation, selectedStatus, selectedScout, sortBy])

  const stats = {
    total: reports.length,
    sign: reports.filter(r => r.recommendation === 'sign').length,
    monitor: reports.filter(r => r.recommendation === 'monitor').length,
    avgRating: reports.length > 0 ? (reports.reduce((acc, r) => acc + r.overallRating, 0) / reports.length).toFixed(1) : '0'
  }

  const uniqueScouts = [...new Set(reports.map(r => r.scout))]

  // Actions
  const handleCreateReport = () => {
    setIsCreating(true)
    setFormData({
      player: {
        id: 'new',
        name: '',
        age: 18,
        nationality: '',
        position: '',
        club: '',
        height: 180,
        weight: 75,
        foot: 'right'
      },
      scout: 'Moi',
      date: new Date().toISOString().split('T')[0],
      match: '',
      matchDate: new Date().toISOString().split('T')[0],
      venue: '',
      competition: '',
      overallRating: 3,
      potentialRating: 3,
      recommendation: 'monitor',
      summary: '',
      strengths: [],
      weaknesses: [],
      tacticalAnalysis: '',
      physicalAnalysis: '',
      technicalAnalysis: '',
      mentalAnalysis: '',
      stats: {
        minutesPlayed: 90,
        goals: 0,
        assists: 0,
        passes: 0,
        passAccuracy: 0,
        duelsWon: 0,
        duelsTotal: 0,
        keyPasses: 0,
        shots: 0,
        shotsOnTarget: 0,
        rating: 6.0
      },
      status: 'draft',
      tags: [],
      comments: []
    })
  }

  const handleEditReport = () => {
    if (!selectedReport) return
    setIsEditing(true)
    setFormData({ ...selectedReport })
    setSelectedReport(null)
  }

  const handleSaveReport = () => {
    if (!formData.player?.name || !formData.match) {
      alert('Veuillez remplir les champs obligatoires')
      return
    }

    const newReport: ScoutingReport = {
      id: isEditing ? formData.id! : Date.now().toString(),
      player: formData.player as Player,
      scout: formData.scout || 'Moi',
      date: formData.date || new Date().toISOString().split('T')[0],
      match: formData.match || '',
      matchDate: formData.matchDate || '',
      venue: formData.venue || '',
      competition: formData.competition || '',
      overallRating: formData.overallRating || 3,
      potentialRating: formData.potentialRating || 3,
      recommendation: (formData.recommendation as any) || 'monitor',
      summary: formData.summary || '',
      strengths: formData.strengths || [],
      weaknesses: formData.weaknesses || [],
      tacticalAnalysis: formData.tacticalAnalysis || '',
      physicalAnalysis: formData.physicalAnalysis || '',
      technicalAnalysis: formData.technicalAnalysis || '',
      mentalAnalysis: formData.mentalAnalysis || '',
      stats: formData.stats as any,
      status: (formData.status as any) || 'draft',
      tags: formData.tags || [],
      comments: formData.comments || []
    }

    if (isEditing) {
      setReports(prev => prev.map(r => r.id === newReport.id ? newReport : r))
    } else {
      setReports(prev => [newReport, ...prev])
    }

    setIsCreating(false)
    setIsEditing(false)
    setSelectedReport(newReport)
  }

  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id))
    setShowDeleteConfirm(null)
    setSelectedReport(null)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedReport) return
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Moi',
      date: new Date().toISOString().split('T')[0],
      text: newComment
    }

    const updatedReport = {
      ...selectedReport,
      comments: [...selectedReport.comments, comment]
    }

    setReports(prev => prev.map(r => r.id === selectedReport.id ? updatedReport : r))
    setSelectedReport(updatedReport)
    setNewComment('')
  }

  const handleShareReport = () => {
    if (!shareEmail.trim()) return
    alert(`Rapport partagé avec ${shareEmail}`)
    setShowShareModal(false)
    setShareEmail('')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    alert('PDF généré et téléchargé')
  }

  const handleChangeStatus = (newStatus: string) => {
    if (!selectedReport) return
    const updated = { ...selectedReport, status: newStatus as any }
    setReports(prev => prev.map(r => r.id === selectedReport.id ? updated : r))
    setSelectedReport(updated)
  }

  const handleAddStrength = () => {
    if (!newStrength.trim()) return
    setFormData(prev => ({
      ...prev,
      strengths: [...(prev.strengths || []), newStrength]
    }))
    setNewStrength('')
  }

  const handleAddWeakness = () => {
    if (!newWeakness.trim()) return
    setFormData(prev => ({
      ...prev,
      weaknesses: [...(prev.weaknesses || []), newWeakness]
    }))
    setNewWeakness('')
  }

  const handleAddTag = () => {
    if (!newTag.trim()) return
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), newTag]
    }))
    setNewTag('')
  }

  const removeStrength = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      strengths: prev.strengths?.filter((_, i) => i !== idx) || []
    }))
  }

  const removeWeakness = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      weaknesses: prev.weaknesses?.filter((_, i) => i !== idx) || []
    }))
  }

  const removeTag = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== idx) || []
    }))
  }

  // Render helpers
  const RecConfig = (rec: string) => recommendations[rec as keyof typeof recommendations] || recommendations.monitor
  const StatusConfig = (status: string) => statusConfig[status as keyof typeof statusConfig] || statusConfig.draft

  // Formulaire création/édition
  if (isCreating || isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Plus className="w-6 h-6 text-blue-600" />
              {isEditing ? 'Modifier le rapport' : 'Nouveau rapport de scouting'}
            </h1>
            <div className="flex gap-3">
              <button 
                onClick={() => { setIsCreating(false); setIsEditing(false); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleSaveReport}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Info joueur */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4">Informations du joueur</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    value={formData.player?.name || ''}
                    onChange={e => setFormData(prev => ({ ...prev, player: { ...prev.player!, name: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Nom du joueur"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Club</label>
                  <input
                    type="text"
                    value={formData.player?.club || ''}
                    onChange={e => setFormData(prev => ({ ...prev, player: { ...prev.player!, club: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Club actuel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <select
                    value={formData.player?.position || ''}
                    onChange={e => setFormData(prev => ({ ...prev, player: { ...prev.player!, position: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Sélectionner</option>
                    {['GK', 'DC', 'DD', 'DG', 'MDC', 'MC', 'MOC', 'MD', 'MG', 'AD', 'AG', 'AIL', 'AIG', 'BU'].map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                  <input
                    type="number"
                    value={formData.player?.age || ''}
                    onChange={e => setFormData(prev => ({ ...prev, player: { ...prev.player!, age: parseInt(e.target.value) || 0 } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                  <input
                    type="text"
                    value={formData.player?.nationality || ''}
                    onChange={e => setFormData(prev => ({ ...prev, player: { ...prev.player!, nationality: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ex: FRA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pied fort</label>
                  <select
                    value={formData.player?.foot || 'right'}
                    onChange={e => setFormData(prev => ({ ...prev, player: { ...prev.player!, foot: e.target.value as any } }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="right">Droit</option>
                    <option value="left">Gauche</option>
                    <option value="both">Ambidextre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info match */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4">Match observé</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Match *</label>
                  <input
                    type="text"
                    value={formData.match || ''}
                    onChange={e => setFormData(prev => ({ ...prev, match: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ex: PSG vs Marseille"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date du match</label>
                  <input
                    type="date"
                    value={formData.matchDate || ''}
                    onChange={e => setFormData(prev => ({ ...prev, matchDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stade</label>
                  <input
                    type="text"
                    value={formData.venue || ''}
                    onChange={e => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ex: Parc des Princes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compétition</label>
                  <input
                    type="text"
                    value={formData.competition || ''}
                    onChange={e => setFormData(prev => ({ ...prev, competition: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ex: Ligue 1"
                  />
                </div>
              </div>
            </div>

            {/* Évaluation */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4">Évaluation</h3>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note globale (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.overallRating || 3}
                    onChange={e => setFormData(prev => ({ ...prev, overallRating: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Potentiel (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.potentialRating || 3}
                    onChange={e => setFormData(prev => ({ ...prev, potentialRating: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommandation</label>
                  <select
                    value={formData.recommendation || 'monitor'}
                    onChange={e => setFormData(prev => ({ ...prev, recommendation: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="sign">SIGNER</option>
                    <option value="monitor">SUIVRE</option>
                    <option value="reject">REJETER</option>
                    <option value="loan">PRÊT</option>
                    <option value="follow">À VOIR</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Résumé général</label>
                <textarea
                  value={formData.summary || ''}
                  onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Description générale du joueur..."
                />
              </div>
            </div>

            {/* Forces */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4 text-emerald-600 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Forces
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newStrength}
                  onChange={e => setNewStrength(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleAddStrength()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="Ajouter une force..."
                />
                <button
                  onClick={handleAddStrength}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.strengths?.map((s, i) => (
                  <span key={i} className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {s}
                    <button onClick={() => removeStrength(i)} className="hover:text-emerald-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Faiblesses */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4 text-red-600 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Faiblesses
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newWeakness}
                  onChange={e => setNewWeakness(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleAddWeakness()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Ajouter une faiblesse..."
                />
                <button
                  onClick={handleAddWeakness}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.weaknesses?.map((w, i) => (
                  <span key={i} className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {w}
                    <button onClick={() => removeWeakness(i)} className="hover:text-red-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Analyses détaillées */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4">Analyses détaillées</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Analyse tactique</label>
                  <textarea
                    value={formData.tacticalAnalysis || ''}
                    onChange={e => setFormData(prev => ({ ...prev, tacticalAnalysis: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Analyse physique</label>
                  <textarea
                    value={formData.physicalAnalysis || ''}
                    onChange={e => setFormData(prev => ({ ...prev, physicalAnalysis: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Analyse technique</label>
                  <textarea
                    value={formData.technicalAnalysis || ''}
                    onChange={e => setFormData(prev => ({ ...prev, technicalAnalysis: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Analyse mentale</label>
                  <textarea
                    value={formData.mentalAnalysis || ''}
                    onChange={e => setFormData(prev => ({ ...prev, mentalAnalysis: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4">Tags</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ajouter un tag..."
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((t, i) => (
                  <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    #{t}
                    <button onClick={() => removeTag(i)} className="hover:text-blue-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Boutons finaux */}
            <div className="flex gap-3 sticky bottom-6 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-lg">
              <button 
                onClick={() => { setIsCreating(false); setIsEditing(false); }}
                className="flex-1 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Annuler
              </button>
              <button 
                onClick={handleSaveReport}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isEditing ? 'Enregistrer les modifications' : 'Créer le rapport'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Modal confirmation suppression
  if (showDeleteConfirm) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div className="flex items-center gap-3 mb-4 text-red-600">
            <Trash2 className="w-8 h-8" />
            <h3 className="text-xl font-bold">Confirmer la suppression</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Êtes-vous sûr de vouloir supprimer ce rapport ? Cette action est irréversible.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={() => handleDeleteReport(showDeleteConfirm)}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Modal partage
  if (showShareModal && selectedReport) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Share2 className="w-8 h-8" />
            <h3 className="text-xl font-bold">Partager le rapport</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Rapport: <span className="font-bold">{selectedReport.player.name}</span>
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email du destinataire</label>
            <input
              type="email"
              value={shareEmail}
              onChange={e => setShareEmail(e.target.value)}
              placeholder="collegue@club.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowShareModal(false)}
              className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleShareReport}
              disabled={!shareEmail.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Détail rapport
  if (selectedReport) {
    const rec = RecConfig(selectedReport.recommendation)
    const RecIcon = rec.icon
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header sticky */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedReport(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour aux rapports
              </button>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Imprimer
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button 
                  onClick={handleEditReport}
                  className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Modifier
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(selectedReport.id)}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={printRef} className="max-w-4xl mx-auto px-6 py-8">
          {/* Header joueur */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-end gap-6">
              <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center text-5xl font-bold text-blue-600 shadow-xl">
                {selectedReport.player.name.charAt(0)}
              </div>
              <div className="pb-2">
                <h1 className="text-4xl font-bold mb-2">{selectedReport.player.name}</h1>
                <p className="text-xl text-blue-100">{selectedReport.player.club} • {selectedReport.player.position} • {selectedReport.player.age} ans</p>
                <div className="flex gap-3 mt-4">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 ${rec.color} rounded-lg font-bold text-sm`}>
                    <RecIcon className="w-4 h-4" />
                    {rec.label}
                  </span>
                  <select
                    value={selectedReport.status}
                    onChange={e => handleChangeStatus(e.target.value)}
                    className="px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium border border-white/30 focus:outline-none focus:bg-white/30"
                  >
                    <option value="draft" className="text-gray-900">Brouillon</option>
                    <option value="submitted" className="text-gray-900">Soumis</option>
                    <option value="reviewed" className="text-gray-900">Revu</option>
                    <option value="archived" className="text-gray-900">Archivé</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Grille info */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{selectedReport.overallRating}<span className="text-lg text-gray-400">/5</span></p>
              <p className="text-sm text-gray-500">Note globale</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-blue-600">{selectedReport.potentialRating}<span className="text-lg text-gray-400">/5</span></p>
              <p className="text-sm text-gray-500">Potentiel</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{selectedReport.stats.rating}</p>
              <p className="text-sm text-gray-500">Note match</p>
            </div>
          </div>

          {/* Info match */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              Match observé
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Rencontre</p>
                <p className="font-medium text-gray-900">{selectedReport.match}</p>
                <p className="text-sm text-gray-500">{new Date(selectedReport.matchDate).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lieu & Compétition</p>
                <p className="font-medium text-gray-900">{selectedReport.venue}</p>
                <p className="text-sm text-gray-500">{selectedReport.competition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Scout</p>
                <p className="font-medium text-gray-900">{selectedReport.scout}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date du rapport</p>
                <p className="font-medium text-gray-900">{new Date(selectedReport.date).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>

          {/* Résumé */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-lg mb-3">Résumé</h3>
            <p className="text-gray-700 leading-relaxed">{selectedReport.summary}</p>
          </div>

          {/* Forces/Faiblesses */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Forces
              </h3>
              <ul className="space-y-2">
                {selectedReport.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-emerald-900">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-red-800 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Faiblesses
              </h3>
              <ul className="space-y-2">
                {selectedReport.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-900">
                    <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Analyses */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">Analyses détaillées</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  Tactique
                </h4>
                <p className="text-sm text-gray-600">{selectedReport.tacticalAnalysis}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Physique
                </h4>
                <p className="text-sm text-gray-600">{selectedReport.physicalAnalysis}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  Technique
                </h4>
                <p className="text-sm text-gray-600">{selectedReport.technicalAnalysis}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-500" />
                  Mental
                </h4>
                <p className="text-sm text-gray-600">{selectedReport.mentalAnalysis}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              Statistiques du match
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{selectedReport.stats.minutesPlayed}'</p>
                <p className="text-xs text-gray-500">Minutes</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">{selectedReport.stats.goals}</p>
                <p className="text-xs text-gray-500">Buts</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{selectedReport.stats.assists}</p>
                <p className="text-xs text-gray-500">Passes D.</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{selectedReport.stats.passes}</p>
                <p className="text-xs text-gray-500">Passes ({selectedReport.stats.passAccuracy}%)</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedReport.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Commentaires */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              Commentaires ({selectedReport.comments.length})
            </h3>
            
            <div className="space-y-4 mb-4">
              {selectedReport.comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddComment()}
                placeholder="Ajouter un commentaire..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Liste principale
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                Rapports de Scouting
                <span className="text-lg font-normal text-gray-500">({filteredReports.length})</span>
              </h1>
              <p className="text-gray-500 mt-1">{stats.total} rapports • {stats.sign} signatures • Note moyenne {stats.avgRating}</p>
            </div>
            
            <button 
              onClick={handleCreateReport}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Nouveau rapport
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-emerald-600">{stats.sign}</p>
              <p className="text-sm text-gray-500">À signer</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-blue-600">{stats.monitor}</p>
              <p className="text-sm text-gray-500">À suivre</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-amber-600">{stats.avgRating}</p>
              <p className="text-sm text-gray-500">Moyenne</p>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher joueur, scout, match..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select 
                value={selectedRecommendation}
                onChange={(e) => setSelectedRecommendation(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">Toutes reco.</option>
                {Object.entries(recommendations).map(([key, rec]) => (
                  <option key={key} value={key}>{rec.label}</option>
                ))}
              </select>

              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">Tous statuts</option>
                {Object.entries(statusConfig).map(([key, status]) => (
                  <option key={key} value={key}>{status.label}</option>
                ))}
              </select>

              <select 
                value={selectedScout}
                onChange={(e) => setSelectedScout(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">Tous scouts</option>
                {uniqueScouts.map(scout => (
                  <option key={scout} value={scout}>{scout}</option>
                ))}
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="date">Plus récent</option>
                <option value="rating">Meilleure note</option>
                <option value="potential">Potentiel</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div className="space-y-3">
          {filteredReports.map(report => {
            const rec = RecConfig(report.recommendation)
            const status = StatusConfig(report.status)
            
            return (
              <div 
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                      {report.player.name.charAt(0)}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{report.player.name}</h3>
                        <span className={`px-2 py-0.5 ${rec.color} text-white text-xs font-bold rounded`}>
                          {rec.label}
                        </span>
                        <span className={`px-2 py-0.5 ${status.color} text-white text-xs rounded`}>
                          {status.label}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">
                        {report.player.club} • {report.player.position} • {report.player.age} ans
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {report.scout}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {report.match}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-xl font-bold text-gray-900">{report.overallRating}</span>
                      </div>
                      <p className="text-xs text-gray-500">Note</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-1">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="text-xl font-bold text-blue-600">{report.potentialRating}</span>
                      </div>
                      <p className="text-xs text-gray-500">Potentiel</p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedReport(report); setShowShareModal(true); }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Partager"
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedReport(report); handleEditReport(); }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(report.id); }}
                        className="p-2 hover:bg-red-50 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-gray-600 text-sm line-clamp-2">{report.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {report.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {report.comments.length > 0 && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {report.comments.length}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">Aucun rapport trouvé</p>
            <button 
              onClick={handleCreateReport}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Créer un rapport
            </button>
          </div>
        )}
      </div>
    </div>
  )
}