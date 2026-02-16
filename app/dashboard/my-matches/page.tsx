'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Clock, MapPin, Shield, User, CheckCircle, XCircle, 
  AlertCircle, Eye, Filter, Download, Trophy, Flag, Phone,
  Wallet, Euro, Receipt, TrendingUp, Building2, FileText,
  Briefcase, Car, Hotel, Utensils, Coffee, ParkingCircle,
  Plane, Train, Bus, Info, HelpCircle, MessageSquare,
  Star, Award, Zap, Target, BarChart3, PieChart, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

// Types
type MatchStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'conflict';
type AssignmentStatus = 'proposed' | 'confirmed' | 'rejected';

interface Financials {
  matchFee: number;
  transportCost: number;
  accommodationCost: number;
  mealAllowance: number;
  bonusPerformance: number;
  bonusUrgent: number;
  taxRate: number;
  totalNet: number;
  totalGross: number;
  paymentStatus: 'pending' | 'processed' | 'paid';
  paymentDate?: string;
  invoiceNumber?: string;
}

interface OrganizerDetails {
  name: string;
  logo?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  department: string;
  notes?: string;
  rating: number;
  totalMatchesTogether: number;
}

interface AssignmentDetails {
  assignedBy: string;
  assignedAt: string;
  assignmentMethod: 'auto' | 'manual' | 'replacement';
  replacementReason?: string;
  previousOperator?: string;
  urgencyLevel: 'planned' | 'short_notice' | 'emergency';
  specialRequirements?: string[];
  equipmentProvided: string[];
}

interface Match {
  id: string;
  date: Date;
  time: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  venue: string;
  city: string;
  status: MatchStatus;
  assignmentStatus: AssignmentStatus;
  operatorResponse?: {
    accepted: boolean;
    reason?: string;
    respondedAt?: Date;
  };
  details: {
    referee: string;
    tvBroadcast: string;
    estimatedDuration: string;
    transportProvided: boolean;
    hotelProvided: boolean;
    contactPhone: string;
    specialInstructions?: string;
    backupOperator?: string;
    priority: 'low' | 'normal' | 'high' | 'critical';
  };
  financials: Financials;
  organizer: OrganizerDetails;
  assignment: AssignmentDetails;
}

// Générer des matchs sur 1 an avec données enrichies
const generateMockMatches = (): Match[] => {
  const matches: Match[] = [];
  const leagues = ['Ligue 1', 'Ligue 2', 'Coupe de France', 'Champions League'];
  const teams = [
    'PSG', 'Marseille', 'Lyon', 'Monaco', 'Lille', 'Rennes', 'Nice', 'Strasbourg',
    'Lens', 'Nantes', 'Reims', 'Montpellier', 'Toulouse', 'Brest', 'Metz', 'Le Havre'
  ];
  const venues = [
    'Parc des Princes', 'Vélodrome', 'Groupama Stadium', 'Louis II', 
    'Pierre Mauroy', 'Roazhon Park', 'Allianz Riviera', 'Stade de la Meinau'
  ];
  const organizers = [
    { name: 'Ligue de Football Professionnel', dept: 'Opérations', rating: 4.8 },
    { name: 'FFF - Commission Arbitrage', dept: 'Organisation', rating: 4.5 },
    { name: 'Paris Saint-Germain', dept: 'Events', rating: 4.9 },
    { name: 'Olympique Lyonnais', dept: 'Match Day', rating: 4.6 },
    { name: 'AS Monaco', dept: 'Sporting', rating: 4.7 }
  ];
  
  const today = new Date();
  
  const createFinancials = (index: number, priority: string): Financials => {
    const baseFee = 250 + (index % 5) * 50;
    const urgentBonus = priority === 'critical' ? 150 : priority === 'high' ? 75 : 0;
    const transport = index % 3 === 0 ? 45 : index % 3 === 1 ? 80 : 120;
    const hotel = index % 4 === 0 ? 120 : 0;
    const meals = 35;
    const performance = index % 7 === 0 ? 100 : 0;
    
    const gross = baseFee + urgentBonus + transport + hotel + meals + performance;
    const tax = gross * 0.22;
    
    return {
      matchFee: baseFee,
      transportCost: transport,
      accommodationCost: hotel,
      mealAllowance: meals,
      bonusPerformance: performance,
      bonusUrgent: urgentBonus,
      taxRate: 22,
      totalGross: gross,
      totalNet: gross - tax,
      paymentStatus: index % 3 === 0 ? 'paid' : index % 3 === 1 ? 'processed' : 'pending',
      paymentDate: index % 3 === 0 ? '2024-03-20' : undefined,
      invoiceNumber: `INV-2024-${String(index + 1).padStart(4, '0')}`
    };
  };

  const createOrganizer = (index: number): OrganizerDetails => {
    const org = organizers[index % organizers.length];
    return {
      name: org.name,
      contactName: `Contact ${org.dept}`,
      contactEmail: `contact${index}@org.com`,
      contactPhone: `06${Math.floor(Math.random() * 100000000)}`,
      department: org.dept,
      notes: index % 5 === 0 ? 'Client préférentiel - VIP' : undefined,
      rating: org.rating,
      totalMatchesTogether: 12 + (index % 20)
    };
  };

  const createAssignment = (index: number, assignment: AssignmentStatus): AssignmentDetails => ({
    assignedBy: ['System Auto', 'Marie Dupont', 'Pierre Martin', 'Sophie Bernard'][index % 4],
    assignedAt: new Date(Date.now() - (index + 1) * 86400000).toISOString(),
    assignmentMethod: index % 3 === 0 ? 'auto' : index % 3 === 1 ? 'manual' : 'replacement',
    replacementReason: index % 3 === 2 ? 'Opérateur initial malade' : undefined,
    previousOperator: index % 3 === 2 ? 'Jean Leblanc' : undefined,
    urgencyLevel: index % 4 === 0 ? 'emergency' : index % 4 === 1 ? 'short_notice' : 'planned',
    specialRequirements: index % 2 === 0 ? ['Accès VIP requis', 'Parking réservé'] : undefined,
    equipmentProvided: ['Badge accès', 'Tenue officielle', 'Kit communication']
  });
  
  // Matchs passés
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (i + 1) * 7);
    const priority = (['low', 'normal', 'high', 'critical'] as const)[i % 4];
    matches.push({
      ...createBaseMatch(date, 'completed', i),
      financials: createFinancials(i, priority),
      organizer: createOrganizer(i),
      assignment: createAssignment(i, 'confirmed')
    });
  }
  
  // Matchs en attente
  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + (i + 1) * 3);
    const priority = (['low', 'normal', 'high', 'critical'] as const)[(i + 1) % 4];
    matches.push({
      ...createBaseMatch(date, 'pending', i + 5, 'proposed'),
      financials: createFinancials(i + 5, priority),
      organizer: createOrganizer(i + 5),
      assignment: createAssignment(i + 5, 'proposed')
    });
  }
  
  // Matchs acceptés
  for (let i = 0; i < 8; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + (i + 2) * 7);
    const priority = (['low', 'normal', 'high', 'critical'] as const)[(i + 2) % 4];
    matches.push({
      ...createBaseMatch(date, 'pending', i + 8, 'confirmed'),
      financials: createFinancials(i + 8, priority),
      organizer: createOrganizer(i + 8),
      assignment: createAssignment(i + 8, 'confirmed')
    });
  }
  
  // Matchs sur 6 mois
  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setMonth(date.getMonth() + (i % 6) + 1);
    date.setDate(Math.floor(Math.random() * 28) + 1);
    const isProposed = Math.random() > 0.7;
    const priority = (['low', 'normal', 'high', 'critical'] as const)[i % 4];
    matches.push({
      ...createBaseMatch(date, 'pending', i + 16, isProposed ? 'proposed' : 'confirmed'),
      financials: createFinancials(i + 16, priority),
      organizer: createOrganizer(i + 16),
      assignment: createAssignment(i + 16, isProposed ? 'proposed' : 'confirmed')
    });
  }
  
  function createBaseMatch(date: Date, status: MatchStatus, index: number, assignment: AssignmentStatus = 'confirmed'): Match {
    const homeIndex = index % teams.length;
    const awayIndex = (index + 1) % teams.length;
    
    return {
      id: `M-${2024}${String(index).padStart(3, '0')}`,
      date: date,
      time: `${19 + (index % 3)}:00`,
      homeTeam: teams[homeIndex],
      awayTeam: teams[awayIndex],
      league: leagues[index % leagues.length],
      venue: venues[index % venues.length],
      city: ['Paris', 'Marseille', 'Lyon', 'Monaco', 'Lille', 'Rennes'][index % 6],
      status,
      assignmentStatus: assignment,
      details: {
        referee: `Arbitre ${index + 1}`,
        tvBroadcast: ['Canal+', 'Amazon Prime', 'beIN Sports'][index % 3],
        estimatedDuration: '2h30',
        transportProvided: index % 2 === 0,
        hotelProvided: index % 3 === 0,
        contactPhone: `06${Math.floor(Math.random() * 100000000)}`,
        specialInstructions: index % 4 === 0 ? 'Match à risque - sécurité renforcée' : undefined,
        backupOperator: index % 5 === 0 ? 'Backup Op.' : undefined,
        priority: (['low', 'normal', 'high', 'critical'] as const)[index % 4]
      },
      financials: {} as Financials,
      organizer: {} as OrganizerDetails,
      assignment: {} as AssignmentDetails
    };
  }
  
  return matches.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const WEEKDAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// Composant pour les détails financiers
const FinancialDetails = ({ financials }: { financials: Financials }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'processed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payé';
      case 'processed': return 'En traitement';
      default: return 'En attente';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
        <div>
          <div className="text-sm text-emerald-600 font-medium mb-1">Rémunération totale</div>
          <div className="text-3xl font-black text-emerald-700">
            {financials.totalNet.toFixed(2)} €
          </div>
          <div className="text-xs text-emerald-600">
            Brut: {financials.totalGross.toFixed(2)} € • Taxe: {(financials.totalGross * financials.taxRate / 100).toFixed(2)} € ({financials.taxRate}%)
          </div>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getPaymentStatusColor(financials.paymentStatus)}`}>
            <Wallet size={14} />
            {getPaymentStatusLabel(financials.paymentStatus)}
          </div>
          {financials.paymentDate && (
            <div className="text-xs text-slate-500 mt-1">
              Payé le {new Date(financials.paymentDate).toLocaleDateString('fr-FR')}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Receipt size={16} />
          Détails de la rémunération
        </span>
        <ChevronLeft size={16} className={`text-slate-400 transition-transform ${showDetails ? '-rotate-90' : 'rotate-90'}`} />
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Frais de match</span>
                <span className="font-semibold text-slate-700">{financials.matchFee.toFixed(2)} €</span>
              </div>
              {financials.bonusUrgent > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600 flex items-center gap-1">
                    <Zap size={14} />
                    Bonus urgence
                  </span>
                  <span className="font-semibold text-amber-700">+{financials.bonusUrgent.toFixed(2)} €</span>
                </div>
              )}
              {financials.bonusPerformance > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-purple-600 flex items-center gap-1">
                    <Star size={14} />
                    Bonus performance
                  </span>
                  <span className="font-semibold text-purple-700">+{financials.bonusPerformance.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-1">
                  <Car size={14} />
                  Transport
                </span>
                <span className="font-semibold text-slate-700">{financials.transportCost.toFixed(2)} €</span>
              </div>
              {financials.accommodationCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Hotel size={14} />
                    Hébergement
                  </span>
                  <span className="font-semibold text-slate-700">{financials.accommodationCost.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-1">
                  <Utensils size={14} />
                  Repas
                </span>
                <span className="font-semibold text-slate-700">{financials.mealAllowance.toFixed(2)} €</span>
              </div>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-700">TOTAL BRUT</span>
                <span className="text-slate-900">{financials.totalGross.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm text-rose-600">
                <span>Retenue à source ({financials.taxRate}%)</span>
                <span>-{(financials.totalGross * financials.taxRate / 100).toFixed(2)} €</span>
              </div>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex justify-between text-base font-black text-emerald-700">
                <span>NET À PAYER</span>
                <span>{financials.totalNet.toFixed(2)} €</span>
              </div>
              {financials.invoiceNumber && (
                <div className="mt-3 p-2 bg-white rounded border border-slate-200">
                  <div className="text-xs text-slate-500 mb-1">Numéro de facture</div>
                  <div className="text-sm font-mono font-semibold text-slate-700 flex items-center gap-2">
                    <FileText size={14} />
                    {financials.invoiceNumber}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Composant pour les détails de l'organisateur
const OrganizerDetails = ({ organizer, assignment }: { organizer: OrganizerDetails; assignment: AssignmentDetails }) => {
  const [showHistory, setShowHistory] = useState(false);

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'short_notice': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const getAssignmentMethodIcon = (method: string) => {
    switch (method) {
      case 'auto': return <Zap size={14} className="text-amber-500" />;
      case 'replacement': return <User size={14} className="text-rose-500" />;
      default: return <User size={14} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Building2 size={24} className="text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-slate-900">{organizer.name}</div>
              <div className="text-sm text-slate-500">{organizer.department}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-blue-200">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-slate-700">{organizer.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <User size={14} className="text-slate-400" />
            {organizer.contactName}
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone size={14} className="text-slate-400" />
            {organizer.contactPhone}
          </div>
        </div>

        {organizer.notes && (
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700 flex items-center gap-2">
            <Award size={14} />
            {organizer.notes}
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Briefcase size={16} />
          Détails de l&apos;assignation
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Assigné par</span>
            <span className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              {getAssignmentMethodIcon(assignment.assignmentMethod)}
              {assignment.assignedBy}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Date d&apos;assignation</span>
            <span className="text-sm font-semibold text-slate-700">
              {new Date(assignment.assignedAt).toLocaleDateString('fr-FR')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Niveau d&apos;urgence</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getUrgencyColor(assignment.urgencyLevel)}`}>
              {assignment.urgencyLevel === 'emergency' ? 'Urgence' : 
               assignment.urgencyLevel === 'short_notice' ? 'Court délai' : 'Planifié'}
            </span>
          </div>

          {assignment.replacementReason && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="text-sm font-semibold text-rose-700 mb-1 flex items-center gap-1">
                <User size={14} />
                Remplacement
              </div>
              <div className="text-sm text-rose-600">
                Remplace {assignment.previousOperator} - {assignment.replacementReason}
              </div>
            </div>
          )}

          {assignment.specialRequirements && assignment.specialRequirements.length > 0 && (
            <div className="space-y-1">
              <span className="text-sm text-slate-500">Exigences spéciales</span>
              <div className="flex flex-wrap gap-2">
                {assignment.specialRequirements.map((req, idx) => (
                  <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-sm text-slate-500">Équipement fourni</span>
            <div className="flex flex-wrap gap-2">
              {assignment.equipmentProvided.map((eq, idx) => (
                <span key={idx} className="px-2 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1">
                  <CheckCircle size={10} />
                  {eq}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full mt-4 flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <BarChart3 size={16} />
            Historique avec cet organisateur
          </span>
          <span className="text-sm font-bold text-blue-600">
            {organizer.totalMatchesTogether} matchs
          </span>
        </button>
      </div>
    </div>
  );
};

export default function OperatorScheduler() {
  const [mounted, setMounted] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [responseModal, setResponseModal] = useState<{ match: Match; accept: boolean } | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted'>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'organizer'>('overview');

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());
    setMatches(generateMockMatches());
  }, []);

  if (!mounted || !currentDate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Chargement...</div>
      </div>
    );
  }

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getMatchesForDay = (day: number) => {
    return matches.filter(m => 
      m.date.getDate() === day &&
      m.date.getMonth() === currentMonth &&
      m.date.getFullYear() === currentYear &&
      (filterStatus === 'all' || 
       (filterStatus === 'pending' && m.assignmentStatus === 'proposed') ||
       (filterStatus === 'accepted' && m.assignmentStatus === 'confirmed'))
    );
  };

  const handleResponse = (match: Match, accept: boolean) => {
    if (accept) {
      setMatches(prev => prev.map(m => 
        m.id === match.id 
          ? { ...m, assignmentStatus: 'confirmed' as const, operatorResponse: { accepted: true, respondedAt: new Date() } }
          : m
      ));
      setResponseModal(null);
    } else {
      if (!declineReason.trim()) return;
      setMatches(prev => prev.map(m => 
        m.id === match.id 
          ? { ...m, assignmentStatus: 'rejected' as const, operatorResponse: { accepted: false, reason: declineReason, respondedAt: new Date() } }
          : m
      ));
      setResponseModal(null);
      setDeclineReason('');
    }
  };

  const getStatusColor = (match: Match) => {
    if (match.assignmentStatus === 'rejected') return 'bg-rose-100 text-rose-700 border-rose-200';
    if (match.assignmentStatus === 'confirmed') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (match.assignmentStatus === 'proposed') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertCircle size={12} className="text-rose-500" />;
      case 'high': return <Flag size={12} className="text-amber-500" />;
      default: return null;
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const stats = {
    total: matches.length,
    pending: matches.filter(m => m.assignmentStatus === 'proposed').length,
    accepted: matches.filter(m => m.assignmentStatus === 'confirmed').length,
    declined: matches.filter(m => m.assignmentStatus === 'rejected').length,
    thisMonth: matches.filter(m => m.date.getMonth() === currentMonth).length,
    totalEarnings: matches
      .filter(m => m.assignmentStatus === 'confirmed' || m.assignmentStatus === 'completed')
      .reduce((sum, m) => sum + m.financials.totalNet, 0)
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-200">
                <CalendarIcon size={24} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Mon Planning</h1>
                <p className="text-sm text-slate-500">Calendrier des assignations - {currentYear}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <DollarSign size={16} className="text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">
                  {stats.totalEarnings.toFixed(2)} € gagnés
                </span>
              </div>
              <button 
                onClick={() => setViewMode(viewMode === 'month' ? 'list' : 'month')}
                className="px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <Filter size={16} />
                {viewMode === 'month' ? 'Vue Liste' : 'Vue Calendrier'}
              </button>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                OP
              </div>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-5 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-2xl font-black text-slate-900">{stats.total}</div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Total matchs</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-2xl font-black text-amber-700">{stats.pending}</div>
              <div className="text-xs text-amber-600 uppercase font-semibold">En attente</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-2xl font-black text-emerald-700">{stats.accepted}</div>
              <div className="text-xs text-emerald-600 uppercase font-semibold">Confirmés</div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="text-2xl font-black text-indigo-700">{stats.thisMonth}</div>
              <div className="text-xs text-indigo-600 uppercase font-semibold">Ce mois</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
              <div className="text-2xl font-black text-emerald-700">{stats.totalEarnings.toFixed(0)}€</div>
              <div className="text-xs text-emerald-600 uppercase font-semibold">Revenus</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation et filtres */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 min-w-[200px] text-center">
              {MONTHS[currentMonth]} {currentYear}
            </h2>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'pending' ? 'bg-amber-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              À répondre
            </button>
            <button
              onClick={() => setFilterStatus('accepted')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'accepted' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Confirmés
            </button>
          </div>
        </div>

        {viewMode === 'month' ? (
          /* Vue Calendrier */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {WEEKDAYS.map(day => (
                <div key={day} className="py-3 text-center text-sm font-bold text-slate-500 uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du mois */}
            <div className="grid grid-cols-7 auto-rows-fr">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[120px] border-b border-r border-slate-100 bg-slate-50/50" />
              ))}
              
              {days.map(day => {
                const dayMatches = getMatchesForDay(day);
                const isToday = new Date().getDate() === day && 
                               new Date().getMonth() === currentMonth &&
                               new Date().getFullYear() === currentYear;

                return (
                  <div 
                    key={day} 
                    className={`min-h-[120px] border-b border-r border-slate-100 p-2 transition-colors hover:bg-slate-50 ${
                      isToday ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-indigo-600' : 'text-slate-700'}`}>
                      {day}
                      {isToday && <span className="ml-1 text-xs">(Auj)</span>}
                    </div>
                    
                    <div className="space-y-1">
                      {dayMatches.slice(0, 3).map(match => (
                        <button
                          key={match.id}
                          onClick={() => setSelectedMatch(match)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs border transition-all hover:shadow-md ${
                            getStatusColor(match)
                          } ${match.assignmentStatus === 'proposed' ? 'ring-2 ring-amber-400 ring-offset-1' : ''}`}
                        >
                          <div className="flex items-center gap-1 font-bold truncate">
                            {getPriorityIcon(match.details.priority)}
                            {match.time}
                          </div>
                          <div className="truncate opacity-90">{match.homeTeam}-{match.awayTeam}</div>
                          {match.assignmentStatus === 'proposed' && (
                            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
                              <AlertCircle size={10} />
                              À confirmer
                            </div>
                          )}
                        </button>
                      ))}
                      {dayMatches.length > 3 && (
                        <div className="text-xs text-slate-400 text-center">
                          +{dayMatches.length - 3} autres
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Vue Liste */
          <div className="space-y-3">
            {matches
              .filter(m => 
                m.date.getMonth() === currentMonth && 
                m.date.getFullYear() === currentYear &&
                (filterStatus === 'all' || 
                 (filterStatus === 'pending' && m.assignmentStatus === 'proposed') ||
                 (filterStatus === 'accepted' && m.assignmentStatus === 'confirmed'))
              )
              .map(match => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${getStatusColor(match)}`}>
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-slate-900">
                            {match.homeTeam} vs {match.awayTeam}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(match)}`}>
                            {match.assignmentStatus === 'proposed' ? 'À confirmer' : 
                             match.assignmentStatus === 'confirmed' ? 'Confirmé' : 'Refusé'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <CalendarIcon size={14} />
                            {match.date.toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {match.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {match.venue}, {match.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield size={14} />
                            {match.league}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 size={14} />
                            {match.organizer.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-4">
                        <div className="text-lg font-bold text-emerald-600">
                          {match.financials.totalNet.toFixed(0)} €
                        </div>
                        <div className="text-xs text-slate-400">net</div>
                      </div>
                      <button
                        onClick={() => setSelectedMatch(match)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                      >
                        <Eye size={16} />
                        Détails
                      </button>
                      {match.assignmentStatus === 'proposed' && (
                        <>
                          <button
                            onClick={() => setResponseModal({ match, accept: true })}
                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Accepter
                          </button>
                          <button
                            onClick={() => setResponseModal({ match, accept: false })}
                            className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Refuser
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </main>

      {/* Modal Détails du Match */}
      <AnimatePresence>
        {selectedMatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className={`p-6 border-b ${getStatusColor(selectedMatch)} border-opacity-30`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedMatch)}`}>
                        {selectedMatch.assignmentStatus === 'proposed' ? '⏳ EN ATTENTE DE RÉPONSE' : 
                         selectedMatch.assignmentStatus === 'confirmed' ? '✓ CONFIRMÉ' : '✗ REFUSÉ'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        {selectedMatch.details.priority === 'critical' ? '🔴 CRITIQUE' : 
                         selectedMatch.details.priority === 'high' ? '🟠 HAUTE' : 
                         selectedMatch.details.priority === 'normal' ? '🔵 NORMALE' : '🟢 BASSE'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {selectedMatch.financials.totalNet.toFixed(0)} € net
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">
                      {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                    </h2>
                    <p className="text-slate-500 flex items-center gap-2 mt-1">
                      <Shield size={16} />
                      {selectedMatch.league} • Match {selectedMatch.id}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedMatch(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <XCircle size={24} className="text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                    activeTab === 'overview' 
                      ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Vue d&apos;ensemble
                </button>
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                    activeTab === 'financial' 
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Wallet size={16} />
                    Financier
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('organizer')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                    activeTab === 'organizer' 
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Building2 size={16} />
                    Organisateur
                  </span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Infos principales */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <CalendarIcon size={16} />
                          <span className="text-sm font-medium">Date et heure</span>
                        </div>
                        <div className="text-lg font-bold text-slate-900">
                          {selectedMatch.date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                        <div className="text-slate-700">{selectedMatch.time}</div>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <MapPin size={16} />
                          <span className="text-sm font-medium">Lieu</span>
                        </div>
                        <div className="text-lg font-bold text-slate-900">{selectedMatch.venue}</div>
                        <div className="text-slate-700">{selectedMatch.city}</div>
                      </div>
                    </div>

                    {/* Détails opérationnels */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900">Informations opérationnelles</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                          <User size={18} className="text-slate-400" />
                          <div>
                            <div className="text-xs text-slate-500">Arbitre désigné</div>
                            <div className="font-semibold text-slate-900">{selectedMatch.details.referee}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                          <Trophy size={18} className="text-slate-400" />
                          <div>
                            <div className="text-xs text-slate-500">Diffusion TV</div>
                            <div className="font-semibold text-slate-900">{selectedMatch.details.tvBroadcast}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                          <Clock size={18} className="text-slate-400" />
                          <div>
                            <div className="text-xs text-slate-500">Durée estimée</div>
                            <div className="font-semibold text-slate-900">{selectedMatch.details.estimatedDuration}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                          <Phone size={18} className="text-slate-400" />
                          <div>
                            <div className="text-xs text-slate-500">Contact urgent</div>
                            <div className="font-semibold text-slate-900">{selectedMatch.details.contactPhone}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Logistique */}
                    <div className="flex gap-3 flex-wrap">
                      {selectedMatch.details.transportProvided && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200">
                          <Car size={16} />
                          Transport fourni
                        </div>
                      )}
                      {selectedMatch.details.hotelProvided && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200">
                          <Hotel size={16} />
                          Hébergement fourni
                        </div>
                      )}
                      {selectedMatch.details.backupOperator && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                          <User size={16} />
                          Backup: {selectedMatch.details.backupOperator}
                        </div>
                      )}
                    </div>

                    {/* Instructions spéciales */}
                    {selectedMatch.details.specialInstructions && (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                        <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
                          <AlertCircle size={18} />
                          Instructions spéciales
                        </div>
                        <p className="text-rose-700 text-sm">{selectedMatch.details.specialInstructions}</p>
                      </div>
                    )}

                    {/* Réponse précédente */}
                    {selectedMatch.operatorResponse && (
                      <div className={`p-4 rounded-xl border ${
                        selectedMatch.operatorResponse.accepted 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : 'bg-rose-50 border-rose-200'
                      }`}>
                        <div className={`font-bold mb-1 ${
                          selectedMatch.operatorResponse.accepted ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          Votre réponse du {selectedMatch.operatorResponse.respondedAt?.toLocaleDateString('fr-FR')}
                        </div>
                        {selectedMatch.operatorResponse.reason && (
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="font-medium">Motif :</span> {selectedMatch.operatorResponse.reason}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'financial' && (
                  <FinancialDetails financials={selectedMatch.financials} />
                )}

                {activeTab === 'organizer' && (
                  <OrganizerDetails 
                    organizer={selectedMatch.organizer} 
                    assignment={selectedMatch.assignment} 
                  />
                )}
              </div>

              {/* Actions footer */}
              {selectedMatch.assignmentStatus === 'proposed' && (
                <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedMatch(null);
                      setResponseModal({ match: selectedMatch, accept: false });
                    }}
                    className="flex-1 px-4 py-3 bg-white border border-rose-200 text-rose-600 rounded-xl font-bold hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle size={20} />
                    Refuser
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMatch(null);
                      setResponseModal({ match: selectedMatch, accept: true });
                    }}
                    className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Accepter ({selectedMatch.financials.totalNet.toFixed(0)} €)
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Réponse (Accept/Decline) */}
      <AnimatePresence>
        {responseModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              {responseModal.accept ? (
                <>
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                    Confirmer l&apos;acceptation ?
                  </h3>
                  <div className="text-center mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="text-sm text-emerald-600 mb-1">Rémunération</div>
                    <div className="text-2xl font-black text-emerald-700">
                      {responseModal.match.financials.totalNet.toFixed(2)} €
                    </div>
                    <div className="text-xs text-emerald-600">
                      Brut: {responseModal.match.financials.totalGross.toFixed(2)} €
                    </div>
                  </div>
                  <p className="text-slate-500 text-center mb-6 text-sm">
                    {responseModal.match.homeTeam} vs {responseModal.match.awayTeam}
                    <br />
                    Organisateur: {responseModal.match.organizer.name}
                    <br />
                    <span className="text-xs">{responseModal.match.date.toLocaleDateString('fr-FR')} à {responseModal.match.time}</span>
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setResponseModal(null)}
                      className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleResponse(responseModal.match, true)}
                      className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                    >
                      Confirmer
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle size={32} className="text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                    Refuser l&apos;assignation
                  </h3>
                  <p className="text-slate-500 text-center mb-4 text-sm">
                    Match : <span className="font-bold text-slate-900">
                      {responseModal.match.homeTeam} vs {responseModal.match.awayTeam}
                    </span>
                    <br />
                    Organisateur: {responseModal.match.organizer.name}
                    <br />
                    <span className="text-amber-600 font-medium">
                      Perte de revenu: {responseModal.match.financials.totalNet.toFixed(2)} €
                    </span>
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Motif du refus (obligatoire) :
                    </label>
                    <textarea
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      placeholder="Ex: Indisponibilité personnelle, congés déjà planifiés, distance trop éloignée..."
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2 text-sm text-amber-800">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <p>
                        Le refus sans motif valable peut impacter votre éligibilité aux futures assignations. 
                        Un backup sera automatiquement contacté.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setResponseModal(null);
                        setDeclineReason('');
                      }}
                      className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleResponse(responseModal.match, false)}
                      disabled={!declineReason.trim()}
                      className="flex-1 px-4 py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirmer le refus
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}