'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  User, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  MoreHorizontal,
  Download,
  FileText,
  Edit3,
  Trash2,
  Send,
  Paperclip,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Eye,
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Save,
  Printer,
  Share2,
  History,
  Lock,
  Unlock,
  Star,
  Zap,
  Target,
  BarChart3,
  Users,
  Euro,
  Percent,
  Clock3,
  MapPin,
  Globe,
  Trash,
  CheckSquare
} from 'lucide-react'

// Types
interface Player {
  id: string
  name: string
  age: number
  nationality: string
  position: string
  currentClub: string
  contractEnd: string
  marketValue: number
  salary: number
}

interface NegotiationStep {
  id: string
  date: string
  type: 'offer' | 'counter' | 'meeting' | 'call' | 'email' | 'decision'
  from: 'agent' | 'club' | 'player'
  title: string
  description: string
  value?: number
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating'
  documents?: string[]
}

interface Comment {
  id: string
  author: string
  date: string
  text: string
  internal: boolean
}

interface Document {
  id: string
  name: string
  type: 'contract' | 'offer' | 'medical' | 'financial' | 'other'
  date: string
  size: string
  url: string
}

interface Deal {
  id: string
  player: Player
  type: 'transfer' | 'loan' | 'contract_extension' | 'free_transfer'
  targetClub: string
  targetClubContact: string
  targetClubCountry: string
  currentStatus: 'initial_contact' | 'offer_sent' | 'negotiating' | 'agreed' | 'contract_signed' | 'cancelled' | 'on_hold'
  financialDetails: {
    transferFee: number
    agentCommission: number
    playerSalary: number
    contractDuration: number
    bonuses: {
      appearance: number
      goals: number
      assists: number
      cleanSheet: number
      teamPerformance: number
      individualAwards: number
    }
    sellOnClause: number
    buyBackClause?: number
    releaseClause?: number
  }
  timeline: NegotiationStep[]
  documents: Document[]
  comments: Comment[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
  expectedCompletionDate: string
  notes: string
  createdAt: string
  updatedAt: string
}

export default function NegotiationsPage() {
  // Données initiales
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 'd1',
      player: {
        id: 'p1',
        name: 'Elias Kacou',
        age: 19,
        nationality: 'CIV',
        position: 'AIL',
        currentClub: 'ASEC Mimosas',
        contractEnd: '2026-06-30',
        marketValue: 2500000,
        salary: 15000
      },
      type: 'transfer',
      targetClub: 'Olympique de Marseille',
      targetClubContact: 'Pablo Longoria - Président',
      targetClubCountry: 'France',
      currentStatus: 'negotiating',
      financialDetails: {
        transferFee: 3500000,
        agentCommission: 175000,
        playerSalary: 45000,
        contractDuration: 4,
        bonuses: {
          appearance: 5000,
          goals: 10000,
          assists: 5000,
          cleanSheet: 0,
          teamPerformance: 25000,
          individualAwards: 50000
        },
        sellOnClause: 15,
        buyBackClause: 8000000,
        releaseClause: 25000000
      },
      timeline: [
        {
          id: 't1',
          date: '2024-02-01',
          type: 'meeting',
          from: 'club',
          title: 'Premier contact',
          description: 'Le club exprime son intérêt pour Elias Kacou',
          status: 'accepted'
        },
        {
          id: 't2',
          date: '2024-02-05',
          type: 'offer',
          from: 'club',
          title: 'Offre initiale',
          description: 'Proposition de 2.5M€ + bonus',
          value: 2500000,
          status: 'rejected'
        },
        {
          id: 't3',
          date: '2024-02-10',
          type: 'counter',
          from: 'agent',
          title: 'Contre-proposition',
          description: 'Demande de 4M€ + 20% commission',
          value: 4000000,
          status: 'negotiating'
        },
        {
          id: 't4',
          date: '2024-02-15',
          type: 'offer',
          from: 'club',
          title: 'Nouvelle offre',
          description: '3.5M€ + bonus de performance + 15% à la revente',
          value: 3500000,
          status: 'negotiating'
        }
      ],
      documents: [
        { id: 'doc1', name: 'Offre officielle OM.pdf', type: 'offer', date: '2024-02-05', size: '2.4 MB', url: '#' },
        { id: 'doc2', name: 'Contre-proposition.pdf', type: 'offer', date: '2024-02-10', size: '1.8 MB', url: '#' }
      ],
      comments: [
        { id: 'c1', author: 'Jean Dupont', date: '2024-02-15', text: 'Le club est sérieux, il faut pousser pour les bonus.', internal: false },
        { id: 'c2', author: 'Assistant', date: '2024-02-16', text: 'Vérifier les clauses fiscales en France.', internal: true }
      ],
      priority: 'high',
      expectedCompletionDate: '2024-02-28',
      notes: 'Le joueur est chaud pour rejoindre Marseille. Concurrence avec Lyon et Monaco.',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-15'
    },
    {
      id: 'd2',
      player: {
        id: 'p2',
        name: 'Lucas Bergvall',
        age: 17,
        nationality: 'SWE',
        position: 'MC',
        currentClub: 'Djurgårdens IF',
        contractEnd: '2025-12-31',
        marketValue: 4800000,
        salary: 8000
      },
      type: 'transfer',
      targetClub: 'Tottenham Hotspur',
      targetClubContact: 'Fabio Paratici - DS',
      targetClubCountry: 'Angleterre',
      currentStatus: 'agreed',
      financialDetails: {
        transferFee: 10000000,
        agentCommission: 500000,
        playerSalary: 120000,
        contractDuration: 5,
        bonuses: {
          appearance: 10000,
          goals: 20000,
          assists: 15000,
          cleanSheet: 0,
          teamPerformance: 50000,
          individualAwards: 100000
        },
        sellOnClause: 10
      },
      timeline: [
        {
          id: 't5',
          date: '2024-01-15',
          type: 'meeting',
          from: 'club',
          title: 'Contact initial',
          description: 'Tottenham suit le joueur depuis 6 mois',
          status: 'accepted'
        },
        {
          id: 't6',
          date: '2024-01-20',
          type: 'offer',
          from: 'club',
          title: 'Offre de 8M€',
          description: 'Première proposition',
          value: 8000000,
          status: 'rejected'
        },
        {
          id: 't7',
          date: '2024-01-25',
          type: 'offer',
          from: 'club',
          title: 'Offre améliorée',
          description: '10M€ + bonus + contrat 5 ans',
          value: 10000000,
          status: 'accepted'
        },
        {
          id: 't8',
          date: '2024-02-18',
          type: 'decision',
          from: 'player',
          title: 'Accord trouvé',
          description: 'Le joueur accepte les termes du contrat',
          status: 'accepted'
        }
      ],
      documents: [
        { id: 'doc3', name: 'Contrat de travail.pdf', type: 'contract', date: '2024-02-18', size: '5.2 MB', url: '#' },
        { id: 'doc4', name: 'Visite médicale.pdf', type: 'medical', date: '2024-02-19', size: '3.1 MB', url: '#' }
      ],
      comments: [
        { id: 'c3', author: 'Jean Dupont', date: '2024-02-18', text: 'Excellent deal pour un joueur de 17 ans. Commission record.', internal: false }
      ],
      priority: 'urgent',
      expectedCompletionDate: '2024-02-25',
      notes: 'Signature prévue à Londres. Billet d\'avion à réserver.',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-19'
    }
  ])

  // États
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [showNewDealModal, setShowNewDealModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [showAddStepModal, setShowAddStepModal] = useState(false)
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false)
  const [showAddCommentModal, setShowAddCommentModal] = useState(false)
  const [showEditNotesModal, setShowEditNotesModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'value' | 'priority'>('date')
  const [expandedSections, setExpandedSections] = useState({
    financial: true,
    timeline: true,
    documents: true,
    comments: true
  })

  // Formulaires
  const [newDealForm, setNewDealForm] = useState({
    playerName: '',
    playerAge: 18,
    position: '',
    currentClub: '',
    nationality: '',
    targetClub: '',
    targetClubContact: '',
    type: 'transfer',
    transferFee: 0,
    commission: 0,
    playerSalary: 0,
    contractDuration: 4,
    priority: 'medium'
  })

  const [newStepForm, setNewStepForm] = useState({
    type: 'offer',
    title: '',
    description: '',
    value: 0,
    from: 'club',
    status: 'pending' as 'pending' | 'accepted' | 'rejected' | 'negotiating'
  })

  const [newCommentForm, setNewCommentForm] = useState({
    text: '',
    internal: false
  })

  const [newDocumentForm, setNewDocumentForm] = useState({
    name: '',
    type: 'contract' as 'contract' | 'offer' | 'medical' | 'financial' | 'other',
    file: null as File | null
  })

  const [editingFinancial, setEditingFinancial] = useState(false)
  const [editFinancialForm, setEditFinancialForm] = useState<any>(null)
  const [editNotesForm, setEditNotesForm] = useState('')
  const [editDealForm, setEditDealForm] = useState<any>(null)

  // Computed
  const filteredDeals = useMemo(() => {
    let filtered = deals.filter(d => {
      const matchesSearch = d.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.targetClub.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || d.currentStatus === filterStatus
      const matchesPriority = filterPriority === 'all' || d.priority === filterPriority
      return matchesSearch && matchesStatus && matchesPriority
    })

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'date': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case 'value': return b.financialDetails.transferFee - a.financialDetails.transferFee
        case 'priority': 
          const prio = { urgent: 4, high: 3, medium: 2, low: 1 }
          return prio[b.priority] - prio[a.priority]
        default: return 0
      }
    })

    return filtered
  }, [deals, searchQuery, filterStatus, filterPriority, sortBy])

  const stats = {
    total: deals.length,
    active: deals.filter(d => ['initial_contact', 'offer_sent', 'negotiating'].includes(d.currentStatus)).length,
    agreed: deals.filter(d => d.currentStatus === 'agreed').length,
    signed: deals.filter(d => d.currentStatus === 'contract_signed').length,
    totalValue: deals.reduce((acc, d) => acc + d.financialDetails.transferFee, 0),
    totalCommission: deals.reduce((acc, d) => acc + d.financialDetails.agentCommission, 0)
  }

  // Actions
  const handleCreateDeal = () => {
    if (!newDealForm.playerName || !newDealForm.targetClub) return

    const player: Player = {
      id: `p${Date.now()}`,
      name: newDealForm.playerName,
      age: newDealForm.playerAge,
      position: newDealForm.position,
      currentClub: newDealForm.currentClub,
      nationality: newDealForm.nationality,
      contractEnd: '2025-06-30',
      marketValue: newDealForm.transferFee,
      salary: newDealForm.playerSalary
    }

    const deal: Deal = {
      id: `d${Date.now()}`,
      player,
      type: newDealForm.type as any,
      targetClub: newDealForm.targetClub,
      targetClubContact: newDealForm.targetClubContact,
      targetClubCountry: '',
      currentStatus: 'initial_contact',
      financialDetails: {
        transferFee: newDealForm.transferFee,
        agentCommission: newDealForm.commission,
        playerSalary: newDealForm.playerSalary,
        contractDuration: newDealForm.contractDuration,
        bonuses: { appearance: 0, goals: 0, assists: 0, cleanSheet: 0, teamPerformance: 0, individualAwards: 0 },
        sellOnClause: 0
      },
      timeline: [{
        id: `t${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'meeting',
        from: 'club',
        title: 'Premier contact établi',
        description: `Début des négociations avec ${newDealForm.targetClub}`,
        status: 'accepted'
      }],
      documents: [],
      comments: [],
      priority: newDealForm.priority as any,
      expectedCompletionDate: '2024-12-31',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => [deal, ...prev])
    setShowNewDealModal(false)
    setNewDealForm({
      playerName: '', playerAge: 18, position: '', currentClub: '', nationality: '',
      targetClub: '', targetClubContact: '', type: 'transfer',
      transferFee: 0, commission: 0, playerSalary: 0, contractDuration: 4, priority: 'medium'
    })
  }

  const handleDeleteDeal = (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id))
    setShowDeleteConfirm(null)
    setSelectedDeal(null)
  }

  const handleUpdateStatus = (dealId: string, newStatus: Deal['currentStatus']) => {
    setDeals(prev => prev.map(d => {
      if (d.id !== dealId) return d
      return { ...d, currentStatus: newStatus, updatedAt: new Date().toISOString() }
    }))
    if (selectedDeal) {
      setSelectedDeal({ ...selectedDeal, currentStatus: newStatus, updatedAt: new Date().toISOString() })
    }
  }

  const handleAddStep = () => {
    if (!selectedDeal || !newStepForm.title) return

    const step: NegotiationStep = {
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: newStepForm.type as any,
      from: newStepForm.from as any,
      title: newStepForm.title,
      description: newStepForm.description,
      value: newStepForm.value || undefined,
      status: newStepForm.status
    }

    const updated = {
      ...selectedDeal,
      timeline: [...selectedDeal.timeline, step],
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
    setShowAddStepModal(false)
    setNewStepForm({ type: 'offer', title: '', description: '', value: 0, from: 'club', status: 'pending' })
  }

  const handleAddComment = () => {
    if (!selectedDeal || !newCommentForm.text) return

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: 'Jean Dupont',
      date: new Date().toISOString(),
      text: newCommentForm.text,
      internal: newCommentForm.internal
    }

    const updated = {
      ...selectedDeal,
      comments: [...selectedDeal.comments, comment],
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
    setShowAddCommentModal(false)
    setNewCommentForm({ text: '', internal: false })
  }

  const handleAddDocument = () => {
    if (!selectedDeal || !newDocumentForm.name) return

    const doc: Document = {
      id: `doc${Date.now()}`,
      name: newDocumentForm.name,
      type: newDocumentForm.type,
      date: new Date().toISOString().split('T')[0],
      size: newDocumentForm.file ? `${(newDocumentForm.file.size / 1024 / 1024).toFixed(1)} MB` : '0 MB',
      url: '#'
    }

    const updated = {
      ...selectedDeal,
      documents: [...selectedDeal.documents, doc],
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
    setShowAddDocumentModal(false)
    setNewDocumentForm({ name: '', type: 'contract', file: null })
  }

  const handleSaveFinancial = () => {
    if (!selectedDeal || !editFinancialForm) return

    const updated = {
      ...selectedDeal,
      financialDetails: editFinancialForm,
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
    setEditingFinancial(false)
  }

  const handleSaveNotes = () => {
    if (!selectedDeal) return

    const updated = {
      ...selectedDeal,
      notes: editNotesForm,
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
    setShowEditNotesModal(false)
  }

  const handleEditDeal = () => {
    if (!selectedDeal || !editDealForm) return

    const updated = {
      ...selectedDeal,
      player: {
        ...selectedDeal.player,
        name: editDealForm.playerName,
        age: editDealForm.playerAge,
        position: editDealForm.position,
        nationality: editDealForm.nationality,
        currentClub: editDealForm.currentClub
      },
      targetClub: editDealForm.targetClub,
      targetClubContact: editDealForm.targetClubContact,
      priority: editDealForm.priority,
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
    setShowEditModal(false)
  }

  const handleDeleteStep = (stepId: string) => {
    if (!selectedDeal) return

    const updated = {
      ...selectedDeal,
      timeline: selectedDeal.timeline.filter(s => s.id !== stepId),
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
  }

  const handleDeleteComment = (commentId: string) => {
    if (!selectedDeal) return

    const updated = {
      ...selectedDeal,
      comments: selectedDeal.comments.filter(c => c.id !== commentId),
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
  }

  const handleDeleteDocument = (docId: string) => {
    if (!selectedDeal) return

    const updated = {
      ...selectedDeal,
      documents: selectedDeal.documents.filter(d => d.id !== docId),
      updatedAt: new Date().toISOString()
    }

    setDeals(prev => prev.map(d => d.id === selectedDeal.id ? updated : d))
    setSelectedDeal(updated)
  }

  const handleDownloadDocument = (doc: Document) => {
    // Simulation de téléchargement
    alert(`Téléchargement de ${doc.name}...`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (!selectedDeal) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Négociation ${selectedDeal.player.name}`,
          text: `Détails de la négociation pour ${selectedDeal.player.name} avec ${selectedDeal.targetClub}`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papier !')
    }
  }

  const openEditModal = () => {
    if (!selectedDeal) return
    setEditDealForm({
      playerName: selectedDeal.player.name,
      playerAge: selectedDeal.player.age,
      position: selectedDeal.player.position,
      nationality: selectedDeal.player.nationality,
      currentClub: selectedDeal.player.currentClub,
      targetClub: selectedDeal.targetClub,
      targetClubContact: selectedDeal.targetClubContact,
      priority: selectedDeal.priority
    })
    setShowEditModal(true)
  }

  const openEditNotes = () => {
    if (!selectedDeal) return
    setEditNotesForm(selectedDeal.notes)
    setShowEditNotesModal(true)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M€`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k€`
    return `${value}€`
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'initial_contact': return 'bg-gray-100 text-gray-700'
      case 'offer_sent': return 'bg-blue-100 text-blue-700'
      case 'negotiating': return 'bg-amber-100 text-amber-700'
      case 'agreed': return 'bg-emerald-100 text-emerald-700'
      case 'contract_signed': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      case 'on_hold': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      initial_contact: 'Premier contact',
      offer_sent: 'Offre envoyée',
      negotiating: 'En négociation',
      agreed: 'Accord trouvé',
      contract_signed: 'Contrat signé',
      cancelled: 'Annulé',
      on_hold: 'En attente'
    }
    return labels[status] || status
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'text-red-600 bg-red-50'
      case 'high': return 'text-orange-600 bg-orange-50'
      case 'medium': return 'text-blue-600 bg-blue-50'
      case 'low': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStepIcon = (type: string) => {
    switch(type) {
      case 'offer': return <DollarSign className="w-4 h-4" />
      case 'meeting': return <Users className="w-4 h-4" />
      case 'call': return <Phone className="w-4 h-4" />
      case 'email': return <Mail className="w-4 h-4" />
      case 'decision': return <CheckSquare className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  // Vue détaillée d'une négociation
  if (selectedDeal) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedDeal(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedDeal.player.name}</h1>
                  <p className="text-sm text-gray-500">{selectedDeal.targetClub} • {getStatusLabel(selectedDeal.currentStatus)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrint}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Imprimer"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Partager"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedDeal.priority)}`}>
                  {selectedDeal.priority}
                </span>
                <button 
                  onClick={openEditModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Modifier
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(selectedDeal.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="col-span-2 space-y-6">
              {/* Informations joueur */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {selectedDeal.player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedDeal.player.name}</h2>
                        <p className="text-gray-500">{selectedDeal.player.position} • {selectedDeal.player.age} ans • {selectedDeal.player.nationality}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{formatValue(selectedDeal.player.marketValue)}</p>
                        <p className="text-sm text-gray-500">Valeur marchande</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 mb-1">Club actuel</p>
                        <p className="font-medium text-gray-900">{selectedDeal.player.currentClub}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 mb-1">Contrat jusqu'au</p>
                        <p className="font-medium text-gray-900">{selectedDeal.player.contractEnd}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 mb-1">Salaire actuel</p>
                        <p className="font-medium text-gray-900">{formatValue(selectedDeal.player.salary)}/mois</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails financiers */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleSection('financial')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Détails financiers</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditFinancialForm({...selectedDeal.financialDetails})
                        setEditingFinancial(true)
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Edit3 className="w-4 h-4 text-gray-600" />
                    </button>
                    {expandedSections.financial ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>
                
                {expandedSections.financial && (
                  <div className="p-6">
                    {editingFinancial ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Frais de transfert</label>
                            <input 
                              type="number"
                              value={editFinancialForm?.transferFee || 0}
                              onChange={(e) => setEditFinancialForm({...editFinancialForm, transferFee: Number(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Commission agent</label>
                            <input 
                              type="number"
                              value={editFinancialForm?.agentCommission || 0}
                              onChange={(e) => setEditFinancialForm({...editFinancialForm, agentCommission: Number(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salaire joueur/mois</label>
                            <input 
                              type="number"
                              value={editFinancialForm?.playerSalary || 0}
                              onChange={(e) => setEditFinancialForm({...editFinancialForm, playerSalary: Number(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Durée contrat (années)</label>
                            <input 
                              type="number"
                              value={editFinancialForm?.contractDuration || 0}
                              onChange={(e) => setEditFinancialForm({...editFinancialForm, contractDuration: Number(e.target.value)})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => setEditingFinancial(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            Annuler
                          </button>
                          <button 
                            onClick={handleSaveFinancial}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-sm text-blue-600 mb-1">Frais de transfert</p>
                            <p className="text-2xl font-bold text-blue-900">{formatValue(selectedDeal.financialDetails.transferFee)}</p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                            <p className="text-sm text-green-600 mb-1">Commission agent</p>
                            <p className="text-2xl font-bold text-green-900">{formatValue(selectedDeal.financialDetails.agentCommission)}</p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                            <p className="text-sm text-purple-600 mb-1">Salaire joueur</p>
                            <p className="text-2xl font-bold text-purple-900">{formatValue(selectedDeal.financialDetails.playerSalary)}/mois</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Bonus</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Matchs joués</span>
                                <span className="font-medium">{formatValue(selectedDeal.financialDetails.bonuses.appearance)}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Buts</span>
                                <span className="font-medium">{formatValue(selectedDeal.financialDetails.bonuses.goals)}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Passes décisives</span>
                                <span className="font-medium">{formatValue(selectedDeal.financialDetails.bonuses.assists)}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Performance équipe</span>
                                <span className="font-medium">{formatValue(selectedDeal.financialDetails.bonuses.teamPerformance)}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Clauses</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Pourcentage à la revente</span>
                                <span className="font-medium">{selectedDeal.financialDetails.sellOnClause}%</span>
                              </div>
                              {selectedDeal.financialDetails.buyBackClause && (
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                  <span className="text-gray-600">Clause de rachat</span>
                                  <span className="font-medium">{formatValue(selectedDeal.financialDetails.buyBackClause)}</span>
                                </div>
                              )}
                              {selectedDeal.financialDetails.releaseClause && (
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                  <span className="text-gray-600">Clause de libération</span>
                                  <span className="font-medium">{formatValue(selectedDeal.financialDetails.releaseClause)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleSection('timeline')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Timeline des négociations</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowAddStepModal(true)
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter
                    </button>
                    {expandedSections.timeline ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>
                
                {expandedSections.timeline && (
                  <div className="p-6">
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                      <div className="space-y-6">
                        {selectedDeal.timeline.map((step, index) => (
                          <div key={step.id} className="relative flex gap-4 group">
                            <div className={`absolute left-4 w-3 h-3 rounded-full -translate-x-1.5 mt-1.5 ${
                              step.status === 'accepted' ? 'bg-green-500' :
                              step.status === 'rejected' ? 'bg-red-500' :
                              step.status === 'negotiating' ? 'bg-amber-500' : 'bg-gray-400'
                            }`} />
                            <div className="ml-10 flex-1">
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 relative">
                                <button 
                                  onClick={() => handleDeleteStep(step.id)}
                                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="p-1 bg-white rounded border border-gray-200">
                                      {getStepIcon(step.type)}
                                    </span>
                                    <div>
                                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                                      <p className="text-sm text-gray-500">{step.date} • {step.from === 'agent' ? 'Agent' : step.from === 'player' ? 'Joueur' : 'Club'}</p>
                                    </div>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    step.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                    step.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    step.status === 'negotiating' ? 'bg-amber-100 text-amber-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {step.status}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                                {step.value && (
                                  <p className="text-blue-600 font-medium text-sm">Valeur: {formatValue(step.value)}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Actions rapides */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleUpdateStatus(selectedDeal.id, 'agreed')}
                    disabled={selectedDeal.currentStatus === 'agreed'}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Marquer comme accordé
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedDeal.id, 'contract_signed')}
                    disabled={selectedDeal.currentStatus === 'contract_signed'}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="w-4 h-4" />
                    Contrat signé
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedDeal.id, 'on_hold')}
                    disabled={selectedDeal.currentStatus === 'on_hold'}
                    className="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4" />
                    Mettre en attente
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedDeal.id, 'cancelled')}
                    disabled={selectedDeal.currentStatus === 'cancelled'}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="w-4 h-4" />
                    Annuler la négociation
                  </button>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleSection('documents')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Documents ({selectedDeal.documents.length})</h3>
                  </div>
                  {expandedSections.documents ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {expandedSections.documents && (
                  <div className="p-4">
                    <button 
                      onClick={() => setShowAddDocumentModal(true)}
                      className="w-full mb-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter un document
                    </button>
                    <div className="space-y-2">
                      {selectedDeal.documents.map(doc => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleDownloadDocument(doc)}
                              className="p-1 text-gray-400 hover:text-blue-600"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Commentaires */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleSection('comments')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Commentaires ({selectedDeal.comments.length})</h3>
                  </div>
                  {expandedSections.comments ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {expandedSections.comments && (
                  <div className="p-4">
                    <button 
                      onClick={() => setShowAddCommentModal(true)}
                      className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter un commentaire
                    </button>
                    <div className="space-y-4">
                      {selectedDeal.comments.map(comment => (
                        <div key={comment.id} className={`p-3 rounded-lg relative group ${comment.internal ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50'}`}>
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                            <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.text}</p>
                          {comment.internal && (
                            <span className="inline-flex items-center gap-1 mt-2 text-xs text-amber-600">
                              <Lock className="w-3 h-3" />
                              Interne
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Notes</h3>
                  <button 
                    onClick={openEditNotes}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedDeal.notes || 'Aucune note'}</p>
              </div>
            </div>
          </div>
        </main>

        {/* Modal Ajouter Étape */}
        {showAddStepModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Nouvelle étape</h3>
                <button onClick={() => setShowAddStepModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select 
                      value={newStepForm.type}
                      onChange={(e) => setNewStepForm({...newStepForm, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="offer">Offre</option>
                      <option value="counter">Contre-proposition</option>
                      <option value="meeting">Réunion</option>
                      <option value="call">Appel</option>
                      <option value="email">Email</option>
                      <option value="decision">Décision</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select 
                      value={newStepForm.status}
                      onChange={(e) => setNewStepForm({...newStepForm, status: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">En attente</option>
                      <option value="accepted">Accepté</option>
                      <option value="rejected">Rejeté</option>
                      <option value="negotiating">En négociation</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input 
                    type="text"
                    value={newStepForm.title}
                    onChange={(e) => setNewStepForm({...newStepForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Nouvelle offre reçue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    value={newStepForm.description}
                    onChange={(e) => setNewStepForm({...newStepForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Détails de l'étape..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valeur (optionnel)</label>
                    <input 
                      type="number"
                      value={newStepForm.value}
                      onChange={(e) => setNewStepForm({...newStepForm, value: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
                    <select 
                      value={newStepForm.from}
                      onChange={(e) => setNewStepForm({...newStepForm, from: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="club">Club</option>
                      <option value="agent">Agent</option>
                      <option value="player">Joueur</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button 
                  onClick={() => setShowAddStepModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleAddStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter l'étape
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Ajouter Commentaire */}
        {showAddCommentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Nouveau commentaire</h3>
                <button onClick={() => setShowAddCommentModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                  <textarea 
                    value={newCommentForm.text}
                    onChange={(e) => setNewCommentForm({...newCommentForm, text: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre commentaire..."
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newCommentForm.internal}
                    onChange={(e) => setNewCommentForm({...newCommentForm, internal: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Note interne (visible uniquement par l'agence)</span>
                </label>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button 
                  onClick={() => setShowAddCommentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Ajouter Document */}
        {showAddDocumentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Ajouter un document</h3>
                <button onClick={() => setShowAddDocumentModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du document</label>
                  <input 
                    type="text"
                    value={newDocumentForm.name}
                    onChange={(e) => setNewDocumentForm({...newDocumentForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Contrat_signé.pdf"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    value={newDocumentForm.type}
                    onChange={(e) => setNewDocumentForm({...newDocumentForm, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="contract">Contrat</option>
                    <option value="offer">Offre</option>
                    <option value="medical">Médical</option>
                    <option value="financial">Financier</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fichier</label>
                  <input 
                    type="file"
                    onChange={(e) => setNewDocumentForm({...newDocumentForm, file: e.target.files?.[0] || null})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button 
                  onClick={() => setShowAddDocumentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleAddDocument}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Modifier Notes */}
        {showEditNotesModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Modifier les notes</h3>
                <button onClick={() => setShowEditNotesModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <textarea 
                  value={editNotesForm}
                  onChange={(e) => setEditNotesForm(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Notes sur la négociation..."
                />
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button 
                  onClick={() => setShowEditNotesModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleSaveNotes}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Modifier Deal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 my-8">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Modifier la négociation</h3>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du joueur</label>
                    <input 
                      type="text"
                      value={editDealForm?.playerName || ''}
                      onChange={(e) => setEditDealForm({...editDealForm, playerName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                    <input 
                      type="number"
                      value={editDealForm?.playerAge || 0}
                      onChange={(e) => setEditDealForm({...editDealForm, playerAge: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input 
                      type="text"
                      value={editDealForm?.position || ''}
                      onChange={(e) => setEditDealForm({...editDealForm, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                    <input 
                      type="text"
                      value={editDealForm?.nationality || ''}
                      onChange={(e) => setEditDealForm({...editDealForm, nationality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Club actuel</label>
                  <input 
                    type="text"
                    value={editDealForm?.currentClub || ''}
                    onChange={(e) => setEditDealForm({...editDealForm, currentClub: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Club cible</label>
                    <input 
                      type="text"
                      value={editDealForm?.targetClub || ''}
                      onChange={(e) => setEditDealForm({...editDealForm, targetClub: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact club</label>
                    <input 
                      type="text"
                      value={editDealForm?.targetClubContact || ''}
                      onChange={(e) => setEditDealForm({...editDealForm, targetClubContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select 
                    value={editDealForm?.priority || 'medium'}
                    onChange={(e) => setEditDealForm({...editDealForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleEditDeal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Confirmation Suppression */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Êtes-vous sûr de vouloir supprimer cette négociation ? Cette action est irréversible.
                </p>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={() => handleDeleteDeal(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Vue liste des négociations
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Négociations</h1>
              <p className="text-gray-500">Gérez les transferts et contrats de vos joueurs</p>
            </div>
            <button 
              onClick={() => setShowNewDealModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nouvelle négociation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-blue-900">{stats.active}</p>
              <p className="text-sm text-blue-600">Actives</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-emerald-900">{stats.agreed}</p>
              <p className="text-sm text-emerald-600">Accordées</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-green-900">{stats.signed}</p>
              <p className="text-sm text-green-600">Signées</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-purple-900">{formatValue(stats.totalValue)}</p>
              <p className="text-sm text-purple-600">Valeur totale</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-2xl font-bold text-amber-900">{formatValue(stats.totalCommission)}</p>
              <p className="text-sm text-amber-600">Commissions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Rechercher un joueur ou un club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="initial_contact">Premier contact</option>
              <option value="offer_sent">Offre envoyée</option>
              <option value="negotiating">En négociation</option>
              <option value="agreed">Accord trouvé</option>
              <option value="contract_signed">Contrat signé</option>
            </select>
            <select 
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Toutes priorités</option>
              <option value="urgent">Urgente</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Trier par date</option>
              <option value="value">Trier par valeur</option>
              <option value="priority">Trier par priorité</option>
            </select>
          </div>
        </div>

        {/* Liste des deals */}
        <div className="space-y-4">
          {filteredDeals.map(deal => (
            <div 
              key={deal.id} 
              onClick={() => setSelectedDeal(deal)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                    {deal.player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{deal.player.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(deal.priority)}`}>
                        {deal.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{deal.player.position} • {deal.player.age} ans • {deal.player.currentClub}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Building2 className="w-4 h-4" />
                        {deal.targetClub}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(deal.expectedCompletionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusColor(deal.currentStatus)}`}>
                    {getStatusLabel(deal.currentStatus)}
                  </span>
                  <p className="text-2xl font-bold text-gray-900">{formatValue(deal.financialDetails.transferFee)}</p>
                  <p className="text-sm text-gray-500">Commission: {formatValue(deal.financialDetails.agentCommission)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Nouvelle Négociation */}
      {showNewDealModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 my-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Nouvelle négociation</h3>
              <button onClick={() => setShowNewDealModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du joueur</label>
                  <input 
                    type="text"
                    value={newDealForm.playerName}
                    onChange={(e) => setNewDealForm({...newDealForm, playerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                  <input 
                    type="number"
                    value={newDealForm.playerAge}
                    onChange={(e) => setNewDealForm({...newDealForm, playerAge: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input 
                    type="text"
                    value={newDealForm.position}
                    onChange={(e) => setNewDealForm({...newDealForm, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: ATT, MIL, DEF"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                  <input 
                    type="text"
                    value={newDealForm.nationality}
                    onChange={(e) => setNewDealForm({...newDealForm, nationality: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: FRA"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Club actuel</label>
                <input 
                  type="text"
                  value={newDealForm.currentClub}
                  onChange={(e) => setNewDealForm({...newDealForm, currentClub: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Club cible</label>
                  <input 
                    type="text"
                    value={newDealForm.targetClub}
                    onChange={(e) => setNewDealForm({...newDealForm, targetClub: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact club</label>
                  <input 
                    type="text"
                    value={newDealForm.targetClubContact}
                    onChange={(e) => setNewDealForm({...newDealForm, targetClubContact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nom et fonction"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    value={newDealForm.type}
                    onChange={(e) => setNewDealForm({...newDealForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="transfer">Transfert</option>
                    <option value="loan">Prêt</option>
                    <option value="contract_extension">Prolongation</option>
                    <option value="free_transfer">Libre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select 
                    value={newDealForm.priority}
                    onChange={(e) => setNewDealForm({...newDealForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frais de transfert</label>
                  <input 
                    type="number"
                    value={newDealForm.transferFee}
                    onChange={(e) => setNewDealForm({...newDealForm, transferFee: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commission</label>
                  <input 
                    type="number"
                    value={newDealForm.commission}
                    onChange={(e) => setNewDealForm({...newDealForm, commission: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salaire/mois</label>
                  <input 
                    type="number"
                    value={newDealForm.playerSalary}
                    onChange={(e) => setNewDealForm({...newDealForm, playerSalary: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewDealModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleCreateDeal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Créer la négociation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}