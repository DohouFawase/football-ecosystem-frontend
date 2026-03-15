'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  User, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Plus,
  MoreHorizontal,
  Download,
  Share2, 
  Edit3,
  Trash2,
  Paperclip,
  Star,
  Zap,
  Target,
  BarChart3,
  Users,
  ArrowLeft,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  MapPin,
  Euro
} from 'lucide-react'

// Types
interface Player {
  id: string
  name: string
  age: number
  nationality: string
  position: string
  club: string
  contractEnd: string
  salary: number
  marketValue: number
  status: 'active' | 'transfer_listed' | 'negotiating' | 'free_agent'
}

interface Message {
  id: string
  sender: 'agent' | 'club' | 'player' | 'other'
  senderName: string
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  player: Player
  club: string
  clubContact: string
  subject: string
  lastMessage: string
  lastTimestamp: string
  unreadCount: number
  status: 'active' | 'pending' | 'closed' | 'urgent'
  messages: Message[]
  dealValue?: number
  dealType?: 'transfer' | 'loan' | 'contract' | 'sponsorship'
}

interface Deal {
  id: string
  player: Player
  type: 'transfer' | 'loan' | 'contract_extension' | 'sponsorship'
  club: string
  value: number
  commission: number
  status: 'negotiating' | 'agreed' | 'signed' | 'cancelled'
  progress: number
  startDate: string
  expectedEndDate: string
  notes: string
}

interface Task {
  id: string
  title: string
  date: string
  completed: boolean
  type: 'meeting' | 'call' | 'deadline' | 'travel'
  relatedTo?: string
}

export default function AgentDashboard() {
  // Données
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'p1',
      name: 'Elias Kacou',
      age: 19,
      nationality: 'CIV',
      position: 'AIL',
      club: 'ASEC Mimosas',
      contractEnd: '2026-06-30',
      salary: 15000,
      marketValue: 2500000,
      status: 'transfer_listed'
    },
    {
      id: 'p2',
      name: 'Lucas Bergvall',
      age: 17,
      nationality: 'SWE',
      position: 'MC',
      club: 'Djurgårdens IF',
      contractEnd: '2025-12-31',
      salary: 8000,
      marketValue: 4800000,
      status: 'negotiating'
    },
    {
      id: 'p3',
      name: 'Kobbie Mainoo',
      age: 18,
      nationality: 'ENG',
      position: 'MDC',
      club: 'Manchester United',
      contractEnd: '2027-06-30',
      salary: 45000,
      marketValue: 35000000,
      status: 'active'
    },
    {
      id: 'p4',
      name: 'Endrick',
      age: 17,
      nationality: 'BRA',
      position: 'BU',
      club: 'Palmeiras',
      contractEnd: '2027-12-31',
      salary: 12000,
      marketValue: 60000000,
      status: 'negotiating'
    }
  ])

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'c1',
      player: {
        id: 'p1',
        name: 'Elias Kacou',
        age: 19,
        nationality: 'CIV',
        position: 'AIL',
        club: 'ASEC Mimosas',
        contractEnd: '2026-06-30',
        salary: 15000,
        marketValue: 2500000,
        status: 'transfer_listed'
      },
      club: 'Olympique de Marseille',
      clubContact: 'Pablo Longoria',
      subject: 'Transfert Elias Kacou',
      lastMessage: 'Nous sommes prêts à augmenter notre offre à 3M€ + bonus.',
      lastTimestamp: '2024-02-20T14:30:00',
      unreadCount: 2,
      status: 'urgent',
      dealValue: 3000000,
      dealType: 'transfer',
      messages: [
        {
          id: 'm1',
          sender: 'club',
          senderName: 'Pablo Longoria',
          content: 'Bonjour, nous sommes très intéressés par Elias Kacou.',
          timestamp: '2024-02-18T10:00:00',
          read: true
        },
        {
          id: 'm2',
          sender: 'agent',
          senderName: 'Moi',
          content: 'Bonjour Pablo, merci de votre intérêt. Quelle est votre proposition ?',
          timestamp: '2024-02-18T11:30:00',
          read: true
        },
        {
          id: 'm3',
          sender: 'club',
          senderName: 'Pablo Longoria',
          content: 'Nous sommes prêts à augmenter notre offre à 3M€ + bonus.',
          timestamp: '2024-02-20T14:30:00',
          read: false
        }
      ]
    },
    {
      id: 'c2',
      player: {
        id: 'p2',
        name: 'Lucas Bergvall',
        age: 17,
        nationality: 'SWE',
        position: 'MC',
        club: 'Djurgårdens IF',
        contractEnd: '2025-12-31',
        salary: 8000,
        marketValue: 4800000,
        status: 'negotiating'
      },
      club: 'Tottenham Hotspur',
      clubContact: 'Fabio Paratici',
      subject: 'Négociation Lucas Bergvall',
      lastMessage: 'Le contrat de 5 ans est prêt. Pouvez-vous venir à Londres ?',
      lastTimestamp: '2024-02-19T16:45:00',
      unreadCount: 1,
      status: 'active',
      dealValue: 10000000,
      dealType: 'transfer',
      messages: [
        {
          id: 'm4',
          sender: 'club',
          senderName: 'Fabio Paratici',
          content: 'Nous avons finalisé les termes du contrat pour Lucas.',
          timestamp: '2024-02-19T16:45:00',
          read: false
        }
      ]
    }
  ])

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 'd1',
      player: {
        id: 'p1',
        name: 'Elias Kacou',
        age: 19,
        nationality: 'CIV',
        position: 'AIL',
        club: 'ASEC Mimosas',
        contractEnd: '2026-06-30',
        salary: 15000,
        marketValue: 2500000,
        status: 'transfer_listed'
      },
      type: 'transfer',
      club: 'Olympique de Marseille',
      value: 3000000,
      commission: 150000,
      status: 'negotiating',
      progress: 65,
      startDate: '2024-02-01',
      expectedEndDate: '2024-02-28',
      notes: 'Bonus de 500k€ si 20 matchs joués.'
    },
    {
      id: 'd2',
      player: {
        id: 'p2',
        name: 'Lucas Bergvall',
        age: 17,
        nationality: 'SWE',
        position: 'MC',
        club: 'Djurgårdens IF',
        contractEnd: '2025-12-31',
        salary: 8000,
        marketValue: 4800000,
        status: 'negotiating'
      },
      type: 'transfer',
      club: 'Tottenham Hotspur',
      value: 10000000,
      commission: 500000,
      status: 'agreed',
      progress: 90,
      startDate: '2024-01-15',
      expectedEndDate: '2024-02-25',
      notes: 'Signature prévue à Londres.'
    }
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'Appel avec Pablo Longoria', date: '2024-02-21T10:00:00', completed: false, type: 'call', relatedTo: 'Elias Kacou' },
    { id: 't2', title: 'Réunion à Londres', date: '2024-02-25T14:00:00', completed: false, type: 'travel', relatedTo: 'Lucas Bergvall' },
    { id: 't3', title: 'Deadline contrat Mainoo', date: '2024-02-28T23:59:00', completed: false, type: 'deadline', relatedTo: 'Kobbie Mainoo' }
  ])

  // États UI
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewPlayerModal, setShowNewPlayerModal] = useState(false)
  const [showNewDealModal, setShowNewDealModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    messages: true,
    players: true,
    deals: true,
    calendar: true
  })

  // Formulaires
  const [newPlayerForm, setNewPlayerForm] = useState({ name: '', age: 18, position: '', club: '', nationality: '', salary: 0, marketValue: 0 })
  const [newDealForm, setNewDealForm] = useState({ playerId: '', club: '', type: 'transfer', value: 0, commission: 0 })
  const [newTaskForm, setNewTaskForm] = useState({ title: '', date: '', type: 'meeting', relatedTo: '' })

  // Computed
  const unreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0)
  const totalCommission = deals.reduce((acc, d) => acc + (d.status === 'signed' ? d.commission : d.status === 'agreed' ? d.commission * 0.5 : 0), 0)
  const pendingTasks = tasks.filter(t => !t.completed).length

  // Actions
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      sender: 'agent',
      senderName: 'Moi',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    }

    const updated = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastTimestamp: message.timestamp,
      unreadCount: 0
    }

    setConversations(prev => prev.map(c => c.id === selectedConversation.id ? updated : c))
    setSelectedConversation(updated)
    setNewMessage('')
  }

  const handleAddPlayer = () => {
    if (!newPlayerForm.name || !newPlayerForm.club) return
    
    const player: Player = {
      id: `p${Date.now()}`,
      ...newPlayerForm,
      contractEnd: '2025-06-30',
      status: 'active'
    }
    
    setPlayers(prev => [...prev, player])
    setNewPlayerForm({ name: '', age: 18, position: '', club: '', nationality: '', salary: 0, marketValue: 0 })
    setShowNewPlayerModal(false)
  }

  const handleDeletePlayer = (id: string) => {
    if (confirm('Supprimer ce joueur ?')) {
      setPlayers(prev => prev.filter(p => p.id !== id))
    }
  }

  const handleAddDeal = () => {
    if (!newDealForm.playerId || !newDealForm.club) return
    
    const player = players.find(p => p.id === newDealForm.playerId)!
    const deal: Deal = {
      id: `d${Date.now()}`,
      player,
      club: newDealForm.club,
      type: newDealForm.type as any,
      value: newDealForm.value,
      commission: newDealForm.commission,
      status: 'negotiating',
      progress: 10,
      startDate: new Date().toISOString().split('T')[0],
      expectedEndDate: '2024-12-31',
      notes: ''
    }
    
    setDeals(prev => [...prev, deal])
    setNewDealForm({ playerId: '', club: '', type: 'transfer', value: 0, commission: 0 })
    setShowNewDealModal(false)
  }

  const handleUpdateDealStatus = (dealId: string, newStatus: Deal['status']) => {
    setDeals(prev => prev.map(d => {
      if (d.id !== dealId) return d
      const progress = newStatus === 'signed' ? 100 : newStatus === 'agreed' ? 90 : newStatus === 'cancelled' ? 0 : d.progress
      return { ...d, status: newStatus, progress }
    }))
  }

  const handleAddTask = () => {
    if (!newTaskForm.title || !newTaskForm.date) return
    
    const task: Task = {
      id: `t${Date.now()}`,
      title: newTaskForm.title,
      date: newTaskForm.date,
      type: newTaskForm.type as any,
      relatedTo: newTaskForm.relatedTo,
      completed: false
    }
    
    setTasks(prev => [...prev, task])
    setNewTaskForm({ title: '', date: '', type: 'meeting', relatedTo: '' })
    setShowNewTaskModal(false)
  }

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return 'À l\'instant'
    if (hours < 24) return `Il y a ${hours}h`
    return d.toLocaleDateString('fr-FR')
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k€`
    return `${value}€`
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                JD
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Jean Dupont</h1>
                <p className="text-sm text-gray-500">Agent FIFA • {players.length} joueurs • {deals.length} deals actifs</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">{formatValue(totalCommission)}</p>
                <p className="text-xs text-gray-500">Commissions 2024</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowNewTaskModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        
        {/* SECTION: MESSAGES */}
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button 
            onClick={() => toggleSection('messages')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-lg text-gray-900">Messages</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-bold">
                  {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            {expandedSections.messages ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {expandedSections.messages && (
            <div className="p-4">
              {selectedConversation ? (
                <div className="space-y-4">
                  {/* Header conversation */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setSelectedConversation(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <h3 className="font-bold text-gray-900">{selectedConversation.subject}</h3>
                        <p className="text-sm text-gray-500">{selectedConversation.club} • {selectedConversation.clubContact}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3 max-h-96 overflow-y-auto p-2">
                    {selectedConversation.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                          msg.sender === 'agent' 
                            ? 'bg-blue-600 text-white rounded-br-md' 
                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                        }`}>
                          <p className="text-xs opacity-75 mb-1">{msg.senderName}</p>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-blue-200' : 'text-gray-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Écrivez votre message..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conversations.map(conv => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all ${
                        conv.unreadCount > 0 ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {conv.club.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{conv.player.name}</h3>
                            <span className="text-xs text-gray-400">{formatDate(conv.lastTimestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-500">{conv.club}</p>
                          <p className={`text-sm mt-1 ${conv.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                            {conv.lastMessage}
                          </p>
                          {conv.dealValue && (
                            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                              <DollarSign className="w-3 h-3" />
                              {formatValue(conv.dealValue)}
                            </span>
                          )}
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* SECTION: JOUEURS */}
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button 
            onClick={() => toggleSection('players')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-lg text-gray-900">Mes Joueurs ({players.length})</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNewPlayerModal(true); }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
              {expandedSections.players ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </div>
          </button>

          {expandedSections.players && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {players.map(player => (
                  <div key={player.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {player.name.charAt(0)}
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => setEditingPlayer(player.id)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeletePlayer(player.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900">{player.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{player.club}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{player.position}</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{player.age} ans</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        player.status === 'transfer_listed' ? 'bg-amber-100 text-amber-700' :
                        player.status === 'negotiating' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {player.status === 'transfer_listed' ? 'À vendre' :
                         player.status === 'negotiating' ? 'Négociation' :
                         player.status === 'free_agent' ? 'Libre' : 'Sous contrat'}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Valeur:</span>
                        <span className="font-bold text-emerald-600">{formatValue(player.marketValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Salaire:</span>
                        <span className="font-medium">{formatValue(player.salary)}/mois</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contrat:</span>
                        <span className="font-medium">{new Date(player.contractEnd).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION: DEALS */}
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button 
            onClick={() => toggleSection('deals')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-lg text-gray-900">Négociations ({deals.length})</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNewDealModal(true); }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Nouveau deal
              </button>
              {expandedSections.deals ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </div>
          </button>

          {expandedSections.deals && (
            <div className="p-4 space-y-4">
              {deals.map(deal => (
                <div key={deal.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {deal.player.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{deal.player.name}</h3>
                        <p className="text-sm text-gray-500">{deal.club} • {deal.type === 'transfer' ? 'Transfert' : deal.type === 'loan' ? 'Prêt' : 'Contrat'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600">{formatValue(deal.value)}</p>
                      <p className="text-sm text-gray-500">Commission: {formatValue(deal.commission)}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progression</span>
                      <select 
                        value={deal.status}
                        onChange={(e) => handleUpdateDealStatus(deal.id, e.target.value as Deal['status'])}
                        className={`text-sm font-bold px-2 py-1 rounded ${
                          deal.status === 'signed' ? 'bg-emerald-100 text-emerald-700' :
                          deal.status === 'agreed' ? 'bg-blue-100 text-blue-700' :
                          deal.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}
                      >
                        <option value="negotiating">En négociation</option>
                        <option value="agreed">Accord trouvé</option>
                        <option value="signed">Signé ✓</option>
                        <option value="cancelled">Annulé ✗</option>
                      </select>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          deal.status === 'signed' ? 'bg-emerald-500' :
                          deal.status === 'agreed' ? 'bg-blue-500' :
                          deal.status === 'cancelled' ? 'bg-red-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${deal.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Début: {new Date(deal.startDate).toLocaleDateString('fr-FR')}</span>
                    <span>Fin: {new Date(deal.expectedEndDate).toLocaleDateString('fr-FR')}</span>
                  </div>

                  {deal.notes && (
                    <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      {deal.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION: CALENDRIER / TÂCHES */}
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button 
            onClick={() => toggleSection('calendar')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-lg text-gray-900">Rendez-vous & Échéances ({pendingTasks})</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNewTaskModal(true); }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
              {expandedSections.calendar ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </div>
          </button>

          {expandedSections.calendar && (
            <div className="p-4">
              <div className="space-y-2">
                {tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`flex items-center gap-3 p-3 border rounded-lg transition-all ${
                      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <button 
                      onClick={() => toggleTaskComplete(task.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {task.completed && <Check className="w-4 h-4 text-white" />}
                    </button>
                    
                    <div className={`flex-1 ${task.completed ? 'opacity-50 line-through' : ''}`}>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(task.date).toLocaleString('fr-FR')} 
                        {task.relatedTo && ` • ${task.relatedTo}`}
                      </p>
                    </div>

                    <span className={`px-2 py-1 rounded text-xs ${
                      task.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                      task.type === 'call' ? 'bg-green-100 text-green-700' :
                      task.type === 'deadline' ? 'bg-red-100 text-red-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {task.type === 'meeting' ? 'Réunion' :
                       task.type === 'call' ? 'Appel' :
                       task.type === 'deadline' ? 'Deadline' : 'Voyage'}
                    </span>

                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* MODAL: Nouveau Joueur */}
      {showNewPlayerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Nouveau joueur</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nom du joueur"
                value={newPlayerForm.name}
                onChange={e => setNewPlayerForm({...newPlayerForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Âge"
                  value={newPlayerForm.age}
                  onChange={e => setNewPlayerForm({...newPlayerForm, age: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Nationalité"
                  value={newPlayerForm.nationality}
                  onChange={e => setNewPlayerForm({...newPlayerForm, nationality: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Position (ex: MC, BU...)"
                value={newPlayerForm.position}
                onChange={e => setNewPlayerForm({...newPlayerForm, position: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Club actuel"
                value={newPlayerForm.club}
                onChange={e => setNewPlayerForm({...newPlayerForm, club: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Salaire mensuel (€)"
                  value={newPlayerForm.salary}
                  onChange={e => setNewPlayerForm({...newPlayerForm, salary: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Valeur marchande (€)"
                  value={newPlayerForm.marketValue}
                  onChange={e => setNewPlayerForm({...newPlayerForm, marketValue: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowNewPlayerModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annuler
              </button>
              <button 
                onClick={handleAddPlayer}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Nouveau Deal */}
      {showNewDealModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Nouvelle négociation</h3>
            <div className="space-y-3">
              <select
                value={newDealForm.playerId}
                onChange={e => setNewDealForm({...newDealForm, playerId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Sélectionner un joueur</option>
                {players.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Club intéressé"
                value={newDealForm.club}
                onChange={e => setNewDealForm({...newDealForm, club: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <select
                value={newDealForm.type}
                onChange={e => setNewDealForm({...newDealForm, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="transfer">Transfert définitif</option>
                <option value="loan">Prêt</option>
                <option value="contract_extension">Extension de contrat</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Montant du deal (€)"
                  value={newDealForm.value}
                  onChange={e => setNewDealForm({...newDealForm, value: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Commission (€)"
                  value={newDealForm.commission}
                  onChange={e => setNewDealForm({...newDealForm, commission: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowNewDealModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annuler
              </button>
              <button 
                onClick={handleAddDeal}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Nouvelle Tâche */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Nouveau rendez-vous</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Titre (ex: Appel avec le président)"
                value={newTaskForm.title}
                onChange={e => setNewTaskForm({...newTaskForm, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="datetime-local"
                value={newTaskForm.date}
                onChange={e => setNewTaskForm({...newTaskForm, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <select
                value={newTaskForm.type}
                onChange={e => setNewTaskForm({...newTaskForm, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="meeting">Réunion</option>
                <option value="call">Appel téléphonique</option>
                <option value="deadline">Deadline</option>
                <option value="travel">Déplacement</option>
              </select>
              <select
                value={newTaskForm.relatedTo}
                onChange={e => setNewTaskForm({...newTaskForm, relatedTo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Lié à un joueur (optionnel)</option>
                {players.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowNewTaskModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annuler
              </button>
              <button 
                onClick={handleAddTask}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}