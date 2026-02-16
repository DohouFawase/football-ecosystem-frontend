'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Calendar, DollarSign, Activity, 
  Award, Star, Clock, MapPin, CheckCircle, XCircle, 
  Briefcase, Wallet, PieChart, BarChart3, Download,
  Filter, ChevronDown, ChevronUp, Trophy, Target,
  Zap, Shield, Users, CalendarDays, Receipt,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  FileText, Printer, Share2, CreditCard, Banknote,
  X, Search, ArrowLeftRight, Clock4, AlertCircle,
  CheckCircle2,FileSpreadsheet, History,
  ChevronLeft, ChevronRight, CreditCard as CardIcon,
  Building2, User, Mail, Phone, Hash
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

// Types existants...
interface MatchHistory {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  venue: string;
  city: string;
  result: 'completed' | 'cancelled' | 'postponed';
  status: 'accepted' | 'declined' | 'completed' | 'no_show';
  financials: {
    gross: number;
    net: number;
    bonuses: number;
    expenses: number;
  };
  rating?: number;
  organizer: string;
  role: 'primary' | 'backup' | 'supervisor';
  incidents?: string[];
  notes?: string;
}

interface MonthlyStats {
  month: string;
  year: number;
  matchesCount: number;
  totalEarnings: number;
  acceptanceRate: number;
  averageRating: number;
  incidents: number;
}

interface YearlySummary {
  year: number;
  totalMatches: number;
  totalEarnings: number;
  totalExpenses: number;
  netIncome: number;
  acceptanceRate: number;
  averageRating: number;
  topOrganizer: string;
  mostActiveMonth: string;
  cancellations: number;
  bonuses: number;
}

// NOUVEAU: Types pour les paiements
interface Payment {
  id: string;
  date: string;
  amount: number;
  type: 'match_fee' | 'bonus' | 'expense_reimbursement' | 'adjustment';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'bank_transfer' | 'check' | 'paypal' | 'stripe';
  reference: string;
  matchId?: string;
  matchDetails?: {
    homeTeam: string;
    awayTeam: string;
    date: string;
  };
  description: string;
  taxAmount: number;
  netAmount: number;
  invoiceNumber: string;
  paidAt?: string;
  bankDetails: {
    accountName: string;
    iban: string;
    bic: string;
    bankName: string;
  };
}

interface PaymentSummary {
  totalPending: number;
  totalProcessing: number;
  totalPaid: number;
  totalFailed: number;
  yearToDate: number;
  lastPayment: string;
  nextScheduledPayment: string;
  averagePaymentAmount: number;
  paymentCount: number;
}

// Données mock pour les paiements
const generateMockPayments = (year: number): Payment[] => {
  const payments: Payment[] = [];
  const statuses: Payment['status'][] = ['completed', 'completed', 'completed', 'processing', 'pending'];
  const types: Payment['type'][] = ['match_fee', 'match_fee', 'match_fee', 'bonus', 'expense_reimbursement', 'adjustment'];
  const methods: Payment['method'][] = ['bank_transfer', 'bank_transfer', 'check', 'paypal', 'stripe'];
  
  const teams = ['PSG', 'Marseille', 'Lyon', 'Monaco', 'Lille', 'Rennes', 'Nice', 'Lens'];
  
  for (let i = 0; i < 25; i++) {
    const date = new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const gross = 200 + Math.floor(Math.random() * 400);
    const tax = gross * 0.22;
    const net = gross - tax;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    payments.push({
      id: `PAY-${year}-${String(i + 1).padStart(4, '0')}`,
      date: date.toISOString(),
      amount: gross,
      type: types[Math.floor(Math.random() * types.length)],
      status,
      method: methods[Math.floor(Math.random() * methods.length)],
      reference: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      matchId: `M-${year}${String(i).padStart(3, '0')}`,
      matchDetails: {
        homeTeam: teams[Math.floor(Math.random() * teams.length)],
        awayTeam: teams[Math.floor(Math.random() * teams.length)],
        date: date.toISOString()
      },
      description: [
        'Frais de match - Opérateur principal',
        'Bonus performance - Match à risque',
        'Remboursement frais de déplacement',
        'Ajustement fin de mois',
        'Prime ancienneté'
      ][Math.floor(Math.random() * 5)],
      taxAmount: tax,
      netAmount: net,
      invoiceNumber: `INV-${year}-${String(i + 1).padStart(4, '0')}`,
      paidAt: status === 'completed' ? new Date(date.getTime() + 86400000 * 3).toISOString() : undefined,
      bankDetails: {
        accountName: 'Jean DUPONT',
        iban: 'FR76 3000 1000 0100 0000 0000 000',
        bic: 'SOGEFRPP',
        bankName: 'Société Générale'
      }
    });
  }
  
  return payments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generatePaymentSummary = (payments: Payment[]): PaymentSummary => {
  const completed = payments.filter(p => p.status === 'completed');
  const pending = payments.filter(p => p.status === 'pending');
  const processing = payments.filter(p => p.status === 'processing');
  const failed = payments.filter(p => p.status === 'failed');
  
  return {
    totalPending: pending.reduce((s, p) => s + p.netAmount, 0),
    totalProcessing: processing.reduce((s, p) => s + p.netAmount, 0),
    totalPaid: completed.reduce((s, p) => s + p.netAmount, 0),
    totalFailed: failed.reduce((s, p) => s + p.netAmount, 0),
    yearToDate: completed.reduce((s, p) => s + p.netAmount, 0),
    lastPayment: completed[0]?.paidAt || '',
    nextScheduledPayment: pending[0]?.date || '',
    averagePaymentAmount: completed.length > 0 ? completed.reduce((s, p) => s + p.netAmount, 0) / completed.length : 0,
    paymentCount: payments.length
  };
};

// Données existantes...
const generateHistoryData = () => {
  const matches: MatchHistory[] = [];
  const months: MonthlyStats[] = [];
  
  for (let m = 0; m < 24; m++) {
    const date = new Date();
    date.setMonth(date.getMonth() - m);
    const monthName = date.toLocaleDateString('fr-FR', { month: 'long' });
    const year = date.getFullYear();
    
    const matchesCount = Math.floor(Math.random() * 8) + 2;
    const monthMatches: MatchHistory[] = [];
    
    for (let i = 0; i < matchesCount; i++) {
      const day = Math.floor(Math.random() * 28) + 1;
      const matchDate = new Date(year, date.getMonth(), day);
      
      const teams = ['PSG', 'Marseille', 'Lyon', 'Monaco', 'Lille', 'Rennes', 'Nice', 'Lens'];
      const organizers = ['LFP', 'FFF', 'PSG', 'OL', 'Monaco', 'Lille'];
      const venues = ['Parc des Princes', 'Vélodrome', 'Groupama', 'Louis II', 'Pierre Mauroy'];
      
      const status = Math.random() > 0.15 ? 'completed' : Math.random() > 0.5 ? 'declined' : 'no_show';
      const gross = 200 + Math.floor(Math.random() * 300);
      const expenses = Math.floor(Math.random() * 80);
      const bonuses = Math.random() > 0.7 ? 50 + Math.floor(Math.random() * 100) : 0;
      
      monthMatches.push({
        id: `M-${year}${String(m).padStart(2, '0')}${String(i).padStart(3, '0')}`,
        date: matchDate.toISOString(),
        homeTeam: teams[Math.floor(Math.random() * teams.length)],
        awayTeam: teams[Math.floor(Math.random() * teams.length)],
        league: ['Ligue 1', 'Ligue 2', 'Coupe de France'][Math.floor(Math.random() * 3)],
        venue: venues[Math.floor(Math.random() * venues.length)],
        city: ['Paris', 'Marseille', 'Lyon', 'Monaco', 'Lille'][Math.floor(Math.random() * 5)],
        result: Math.random() > 0.9 ? 'cancelled' : 'completed',
        status: status as any,
        financials: {
          gross,
          net: gross - (gross * 0.22) - expenses + bonuses,
          bonuses,
          expenses
        },
        rating: status === 'completed' ? 4 + Math.random() : undefined,
        organizer: organizers[Math.floor(Math.random() * organizers.length)],
        role: ['primary', 'backup', 'supervisor'][Math.floor(Math.random() * 3)] as any,
        incidents: Math.random() > 0.9 ? ['Retard léger'] : undefined,
        notes: Math.random() > 0.8 ? 'Match très intéressant, bonne ambiance' : undefined
      });
    }
    
    const completed = monthMatches.filter(m => m.status === 'completed');
    const earnings = completed.reduce((sum, m) => sum + m.financials.net, 0);
    const ratings = completed.filter(m => m.rating).map(m => m.rating!);
    const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
    
    months.push({
      month: monthName,
      year,
      matchesCount: monthMatches.length,
      totalEarnings: earnings,
      acceptanceRate: (completed.length / monthMatches.length) * 100,
      averageRating: avgRating,
      incidents: monthMatches.filter(m => m.incidents).length
    });
    
    matches.push(...monthMatches);
  }
  
  const yearlySummaries: YearlySummary[] = [2024, 2023].map(year => {
    const yearMatches = matches.filter(m => new Date(m.date).getFullYear() === year);
    const completed = yearMatches.filter(m => m.status === 'completed');
    const earnings = completed.reduce((sum, m) => sum + m.financials.net, 0);
    const expenses = completed.reduce((sum, m) => sum + m.financials.expenses, 0);
    const bonuses = completed.reduce((sum, m) => sum + m.financials.bonuses, 0);
    
    const organizerCounts: Record<string, number> = {};
    completed.forEach(m => {
      organizerCounts[m.organizer] = (organizerCounts[m.organizer] || 0) + 1;
    });
    const topOrganizer = Object.entries(organizerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    
    const monthCounts: Record<string, number> = {};
    completed.forEach(m => {
      const month = new Date(m.date).toLocaleDateString('fr-FR', { month: 'long' });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    
    const ratings = completed.filter(m => m.rating).map(m => m.rating!);
    
    return {
      year,
      totalMatches: yearMatches.length,
      totalEarnings: earnings,
      totalExpenses: expenses,
      netIncome: earnings - expenses,
      acceptanceRate: (completed.length / yearMatches.length) * 100,
      averageRating: ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0,
      topOrganizer,
      mostActiveMonth,
      cancellations: yearMatches.filter(m => m.result === 'cancelled').length,
      bonuses
    };
  });
  
  return { matches, months, yearlySummaries };
};

const { matches: MOCK_MATCHES, months: MOCK_MONTHS, yearlySummaries: MOCK_SUMMARIES } = generateHistoryData();

export default function OperatorHistory() {
  const [mounted, setMounted] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [viewMode, setViewMode] = useState<'overview' | 'matches' | 'financial'>('overview');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'declined'>('all');
  
  // NOUVEAU: États pour les paiements
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'completed' | 'pending' | 'processing'>('all');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initialiser les paiements
    const initialPayments = generateMockPayments(selectedYear);
    setPayments(initialPayments);
    setPaymentSummary(generatePaymentSummary(initialPayments));
  }, [selectedYear]);

  if (!mounted || !paymentSummary) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Chargement...</div>
      </div>
    );
  }

  const currentSummary = MOCK_SUMMARIES.find(s => s.year === selectedYear) || MOCK_SUMMARIES[0];
  const yearMatches = MOCK_MATCHES.filter(m => new Date(m.date).getFullYear() === selectedYear);
  const filteredMatches = filterStatus === 'all' ? yearMatches : yearMatches.filter(m => m.status === filterStatus);
  
  const monthlyData = MOCK_MONTHS.filter(m => m.year === selectedYear).reverse();
  
  const totalStats = {
    allTimeMatches: MOCK_MATCHES.length,
    allTimeEarnings: MOCK_MATCHES.filter(m => m.status === 'completed').reduce((sum, m) => sum + m.financials.net, 0),
    currentYearEarnings: currentSummary.totalEarnings,
    averagePerMatch: currentSummary.totalEarnings / (currentSummary.totalMatches || 1),
    bestMonth: monthlyData.reduce((max, m) => m.totalEarnings > max.totalEarnings ? m : max, monthlyData[0]),
    totalBonuses: MOCK_MATCHES.reduce((sum, m) => sum + m.financials.bonuses, 0)
  };

  const filteredPayments = paymentFilter === 'all' 
    ? payments 
    : payments.filter(p => p.status === paymentFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'accepted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'declined': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'no_show': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getPaymentStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'failed': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getPaymentTypeIcon = (type: Payment['type']) => {
    switch (type) {
      case 'match_fee': return <Briefcase size={16} className="text-indigo-500" />;
      case 'bonus': return <Zap size={16} className="text-amber-500" />;
      case 'expense_reimbursement': return <Receipt size={16} className="text-emerald-500" />;
      case 'adjustment': return <ArrowLeftRight size={16} className="text-purple-500" />;
      default: return <DollarSign size={16} className="text-slate-500" />;
    }
  };

  const getPaymentMethodIcon = (method: Payment['method']) => {
    switch (method) {
      case 'bank_transfer': return <Building2 size={16} className="text-blue-500" />;
      case 'check': return <FileText size={16} className="text-amber-500" />;
      case 'paypal': return <CreditCard size={16} className="text-indigo-500" />;
      case 'stripe': return <CardIcon size={16} className="text-purple-500" />;
      default: return <DollarSign size={16} className="text-slate-500" />;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'primary': return <Star size={14} className="text-amber-500" />;
      case 'supervisor': return <Shield size={14} className="text-purple-500" />;
      default: return <Users size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header existant... */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-200">
                <BarChart3 size={24} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Mon Historique</h1>
                <p className="text-sm text-slate-500">Performance et revenus</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
              </select>
              <button className="px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200 flex items-center gap-2">
                <Download size={16} />
                Exporter
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: PieChart },
              { id: 'matches', label: 'Mes matchs', icon: Calendar },
              { id: 'financial', label: 'Financier', icon: Wallet }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  viewMode === tab.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* ... Vues overview et matches identiques ... */}
        
        {viewMode === 'overview' && (
          <div className="space-y-6">
            {/* KPIs principaux */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-indigo-100 text-sm font-medium">Revenus {selectedYear}</span>
                  <TrendingUp size={20} className="text-indigo-200" />
                </div>
                <div className="text-3xl font-black">{currentSummary.totalEarnings.toFixed(0)} €</div>
                <div className="text-indigo-200 text-sm mt-1">
                  Net après charges
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm font-medium">Matchs réalisés</span>
                  <Activity size={20} className="text-emerald-500" />
                </div>
                <div className="text-3xl font-black text-slate-900">{currentSummary.totalMatches}</div>
                <div className="text-slate-500 text-sm mt-1">
                  {currentSummary.acceptanceRate.toFixed(0)}% acceptation
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm font-medium">Note moyenne</span>
                  <Star size={20} className="text-amber-500" />
                </div>
                <div className="text-3xl font-black text-slate-900">{currentSummary.averageRating.toFixed(1)}/5</div>
                <div className="text-slate-500 text-sm mt-1">
                  Basé sur {yearMatches.filter(m => m.rating).length} évaluations
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm font-medium">Bonus gagnés</span>
                  <Zap size={20} className="text-amber-500" />
                </div>
                <div className="text-3xl font-black text-amber-600">{currentSummary.bonuses.toFixed(0)} €</div>
                <div className="text-slate-500 text-sm mt-1">
                  Performance & urgence
                </div>
              </div>
            </div>

            {/* Graphique d'évolution mensuelle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-indigo-600" />
                Évolution mensuelle
              </h3>
              <div className="h-64 flex items-end gap-2">
                {monthlyData.map((month, idx) => {
                  const maxEarnings = Math.max(...monthlyData.map(m => m.totalEarnings));
                  const height = (month.totalEarnings / maxEarnings) * 100;
                  
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative group">
                        <div 
                          className="w-full bg-indigo-500 rounded-t-lg transition-all hover:bg-indigo-600"
                          style={{ height: `${height}%`, minHeight: '4px' }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {month.totalEarnings.toFixed(0)} €
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 text-center">
                        {month.month.slice(0, 3)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats détaillées */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Trophy size={20} className="text-amber-500" />
                  Performance {selectedYear}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Meilleur mois</span>
                    <span className="font-bold text-slate-900">{totalStats.bestMonth?.month} ({totalStats.bestMonth?.totalEarnings.toFixed(0)} €)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Organisateur principal</span>
                    <span className="font-bold text-slate-900">{currentSummary.topOrganizer}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Revenu moyen / match</span>
                    <span className="font-bold text-slate-900">{totalStats.averagePerMatch.toFixed(0)} €</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Annulations subies</span>
                    <span className="font-bold text-rose-600">{currentSummary.cancellations}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-emerald-500" />
                  Statistiques globales
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Total carrière</span>
                    <span className="font-bold text-slate-900">{totalStats.allTimeMatches} matchs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Revenus totaux</span>
                    <span className="font-bold text-emerald-600">{totalStats.allTimeEarnings.toFixed(0)} €</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Total bonus</span>
                    <span className="font-bold text-amber-600">{totalStats.totalBonuses.toFixed(0)} €</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Ancienneté</span>
                    <span className="font-bold text-slate-900">2 ans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'matches' && (
          <div className="space-y-4">
            {/* Filtres */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {['all', 'completed', 'declined'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === status 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {status === 'all' ? 'Tous' : status === 'completed' ? 'Réalisés' : 'Refusés'}
                  </button>
                ))}
              </div>
              <span className="text-sm text-slate-500">
                {filteredMatches.length} match{filteredMatches.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Liste des matchs */}
            <div className="space-y-3">
              {filteredMatches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getStatusColor(match.status)}`}>
                        {match.status === 'completed' ? <CheckCircle size={20} /> : 
                         match.status === 'declined' ? <XCircle size={20} /> : 
                         <Clock size={20} />}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          {match.homeTeam} vs {match.awayTeam}
                          {getRoleIcon(match.role)}
                        </div>
                        <div className="text-sm text-slate-500">
                          {new Date(match.date).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long',
                            year: 'numeric'
                          })} • {match.league}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {match.rating && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star size={16} className="fill-amber-500" />
                          <span className="font-bold">{match.rating.toFixed(1)}</span>
                        </div>
                      )}
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(match.status)}`}>
                        {match.status === 'completed' ? 'Réalisé' : 
                         match.status === 'declined' ? 'Refusé' : 'No-show'}
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div className="font-bold text-slate-900">{match.financials.net.toFixed(0)} €</div>
                        <div className="text-xs text-slate-400">net</div>
                      </div>
                      {expandedMatch === match.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedMatch === match.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-4 bg-slate-50 space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Lieu</div>
                              <div className="text-sm font-semibold text-slate-900">{match.venue}, {match.city}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Organisateur</div>
                              <div className="text-sm font-semibold text-slate-900">{match.organizer}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Rôle</div>
                              <div className="text-sm font-semibold text-slate-900 capitalize">
                                {match.role === 'primary' ? 'Opérateur principal' : 
                                 match.role === 'supervisor' ? 'Superviseur' : 'Backup'}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 p-3 bg-white rounded-lg">
                            <div className="text-center">
                              <div className="text-xs text-slate-500 mb-1">Brut</div>
                              <div className="font-bold text-slate-900">{match.financials.gross.toFixed(0)} €</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-slate-500 mb-1">Bonus</div>
                              <div className="font-bold text-amber-600">{match.financials.bonuses.toFixed(0)} €</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-slate-500 mb-1">Frais</div>
                              <div className="font-bold text-rose-600">-{match.financials.expenses.toFixed(0)} €</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-slate-500 mb-1">Net</div>
                              <div className="font-bold text-emerald-600">{match.financials.net.toFixed(0)} €</div>
                            </div>
                          </div>

                          {match.incidents && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                              <div className="text-sm font-semibold text-amber-700 mb-1">Incident signalé</div>
                              <div className="text-sm text-amber-600">{match.incidents.join(', ')}</div>
                            </div>
                          )}

                          {match.notes && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="text-sm font-semibold text-blue-700 mb-1">Vos notes</div>
                              <div className="text-sm text-blue-600">{match.notes}</div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'financial' && (
          <div className="space-y-6">
            {/* Résumé financier */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl text-white">
                <div className="text-emerald-100 text-sm font-medium mb-2">Revenus nets {selectedYear}</div>
                <div className="text-4xl font-black">{currentSummary.netIncome.toFixed(0)} €</div>
                <div className="text-emerald-100 text-sm mt-2">
                  Après déduction des frais
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="text-slate-500 text-sm font-medium mb-2">Frais professionnels</div>
                <div className="text-4xl font-black text-rose-600">{currentSummary.totalExpenses.toFixed(0)} €</div>
                <div className="text-slate-500 text-sm mt-2">
                  Transport, repas, hébergement
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="text-slate-500 text-sm font-medium mb-2">Rentabilité</div>
                <div className="text-4xl font-black text-indigo-600">
                  {((currentSummary.netIncome / (currentSummary.totalEarnings || 1)) * 100).toFixed(0)}%
                </div>
                <div className="text-slate-500 text-sm mt-2">
                  Ratio net / brut
                </div>
              </div>
            </div>

            {/* Détails par catégorie */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Répartition des revenus</h3>
              <div className="space-y-4">
                {[
                  { label: 'Frais de match de base', amount: yearMatches.filter(m => m.status === 'completed').reduce((s, m) => s + m.financials.gross - m.financials.bonuses, 0), color: 'bg-blue-500' },
                  { label: 'Bonus performance', amount: yearMatches.filter(m => m.status === 'completed').reduce((s, m) => s + m.financials.bonuses, 0), color: 'bg-amber-500' },
                  { label: 'Indemnités transport', amount: yearMatches.filter(m => m.status === 'completed').reduce((s, m) => s + m.financials.expenses * 0.6, 0), color: 'bg-emerald-500' }
                ].map((item, idx) => {
                  const total = yearMatches.filter(m => m.status === 'completed').reduce((s, m) => s + m.financials.net, 0);
                  const percentage = (item.amount / total) * 100;
                  
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-700 font-medium">{item.label}</span>
                        <span className="text-slate-900 font-bold">{item.amount.toFixed(0)} € ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-slate-700 font-medium">
                <Receipt size={20} />
                Télécharger mes factures
              </button>
              <button className="flex-1 p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-slate-700 font-medium">
                <FileText size={20} />
                Attestation fiscale
              </button>
              <button 
                onClick={() => setPaymentModalOpen(true)}
                className="flex-1 p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Banknote size={20} />
                Voir mes paiements
              </button>
            </div>
          </div>
        )}
      </main>

      {/* NOUVEAU: Modal des paiements */}
      <AnimatePresence>
        {paymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Header du modal */}
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Banknote size={28} />
                      Mes Paiements
                    </h2>
                    <p className="text-indigo-100 mt-1">
                      Historique complet des transactions {selectedYear}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setPaymentModalOpen(false);
                      setSelectedPayment(null);
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Résumé rapide */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-indigo-100 text-xs mb-1">Payé</div>
                    <div className="text-2xl font-black">{paymentSummary.totalPaid.toFixed(0)} €</div>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-indigo-100 text-xs mb-1">En traitement</div>
                    <div className="text-2xl font-black text-blue-300">{paymentSummary.totalProcessing.toFixed(0)} €</div>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-indigo-100 text-xs mb-1">En attente</div>
                    <div className="text-2xl font-black text-amber-300">{paymentSummary.totalPending.toFixed(0)} €</div>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-indigo-100 text-xs mb-1">Nombre</div>
                    <div className="text-2xl font-black">{paymentSummary.paymentCount}</div>
                  </div>
                </div>
              </div>

              <div className="flex h-[calc(90vh-200px)]">
                {/* Liste des paiements */}
                <div className="w-2/3 border-r border-slate-200 overflow-hidden flex flex-col">
                  {/* Filtres */}
                  <div className="p-4 border-b border-slate-200 flex gap-2">
                    {['all', 'completed', 'processing', 'pending'].map(status => (
                      <button
                        key={status}
                        onClick={() => setPaymentFilter(status as any)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          paymentFilter === status 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {status === 'all' ? 'Tous' : 
                         status === 'completed' ? 'Payés' : 
                         status === 'processing' ? 'En traitement' : 'En attente'}
                      </button>
                    ))}
                  </div>

                  {/* Liste scrollable */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredPayments.map((payment, idx) => (
                      <motion.button
                        key={payment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => setSelectedPayment(payment)}
                        className={`w-full p-4 rounded-xl border text-left transition-all hover:shadow-md ${
                          selectedPayment?.id === payment.id 
                            ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200' 
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getPaymentStatusColor(payment.status)}`}>
                              {getPaymentTypeIcon(payment.type)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{payment.description}</div>
                              <div className="text-xs text-slate-500">
                                {new Date(payment.date).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900">{payment.netAmount.toFixed(2)} €</div>
                            <div className={`text-xs px-2 py-0.5 rounded-full border inline-block ${getPaymentStatusColor(payment.status)}`}>
                              {payment.status === 'completed' ? 'Payé' : 
                               payment.status === 'processing' ? 'Traitement' : 
                               payment.status === 'pending' ? 'En attente' : 'Échec'}
                            </div>
                          </div>
                        </div>
                        
                        {payment.matchDetails && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                            <Shield size={12} />
                            {payment.matchDetails.homeTeam} vs {payment.matchDetails.awayTeam}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Détails du paiement sélectionné */}
                <div className="w-1/3 bg-slate-50 overflow-y-auto">
                  {selectedPayment ? (
                    <div className="p-6 space-y-6">
                      {/* En-tête */}
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 ${getPaymentStatusColor(selectedPayment.status)}`}>
                          {getPaymentTypeIcon(selectedPayment.type)}
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">{selectedPayment.description}</h3>
                        <p className="text-slate-500 text-sm">{selectedPayment.id}</p>
                      </div>

                      {/* Montants */}
                      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                          <DollarSign size={16} className="text-indigo-600" />
                          Détail du paiement
                        </h4>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Montant brut</span>
                          <span className="font-semibold text-slate-900">{selectedPayment.amount.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Retenue fiscale (22%)</span>
                          <span className="font-semibold text-rose-600">-{selectedPayment.taxAmount.toFixed(2)} €</span>
                        </div>
                        <div className="h-px bg-slate-200 my-2" />
                        <div className="flex justify-between text-base font-bold">
                          <span className="text-slate-900">Net à payer</span>
                          <span className="text-emerald-600">{selectedPayment.netAmount.toFixed(2)} €</span>
                        </div>
                      </div>

                      {/* Méthode et statut */}
                      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                          <CreditCard size={16} className="text-indigo-600" />
                          Paiement
                        </h4>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-sm">Méthode</span>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                            {getPaymentMethodIcon(selectedPayment.method)}
                            {selectedPayment.method === 'bank_transfer' ? 'Virement bancaire' :
                             selectedPayment.method === 'check' ? 'Chèque' :
                             selectedPayment.method === 'paypal' ? 'PayPal' : 'Stripe'}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-sm">Statut</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPaymentStatusColor(selectedPayment.status)}`}>
                            {selectedPayment.status === 'completed' ? '✓ Payé' :
                             selectedPayment.status === 'processing' ? '⏳ Traitement' :
                             selectedPayment.status === 'pending' ? '⏱ En attente' : '✗ Échec'}
                          </span>
                        </div>

                        {selectedPayment.paidAt && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 text-sm">Payé le</span>
                            <span className="text-sm font-medium text-slate-900">
                              {new Date(selectedPayment.paidAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-sm">Référence</span>
                          <span className="text-sm font-mono text-slate-900">{selectedPayment.reference}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-sm">Facture</span>
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            <FileText size={14} />
                            {selectedPayment.invoiceNumber}
                          </button>
                        </div>
                      </div>

                      {/* Coordonnées bancaires */}
                      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                          <Building2 size={16} className="text-indigo-600" />
                          Compte bancaire
                        </h4>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Titulaire</span>
                            <span className="font-medium text-slate-900">{selectedPayment.bankDetails.accountName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-xs block mb-1">IBAN</span>
                            <span className="font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded block">
                              {selectedPayment.bankDetails.iban}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">BIC</span>
                            <span className="font-mono text-slate-900">{selectedPayment.bankDetails.bic}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Banque</span>
                            <span className="font-medium text-slate-900">{selectedPayment.bankDetails.bankName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Match associé */}
                      {selectedPayment.matchDetails && (
                        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
                          <h4 className="font-bold text-indigo-900 text-sm mb-2 flex items-center gap-2">
                            <Shield size={16} />
                            Match associé
                          </h4>
                          <div className="text-indigo-800 font-medium">
                            {selectedPayment.matchDetails.homeTeam} vs {selectedPayment.matchDetails.awayTeam}
                          </div>
                          <div className="text-indigo-600 text-sm">
                            {new Date(selectedPayment.matchDetails.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                          <Printer size={16} />
                          Imprimer
                        </button>
                        <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                          <Share2 size={16} />
                          Partager
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <Banknote size={48} className="mx-auto mb-3 opacity-30" />
                        <p>Sélectionnez un paiement pour voir les détails</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}