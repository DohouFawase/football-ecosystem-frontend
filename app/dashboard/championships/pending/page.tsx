'use client';

import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, DollarSign, FileText, MapPin, Mail, Phone, Search, Filter, X, AlertCircle, Trophy, Info } from 'lucide-react';

// Types
export interface LeagueParticipation {
  id: string;
  ownerId: string;
  teamName?: string;
  teamId?: string;
  leagueId: string;
  status: ParticipationStatus;
  rejectionReason?: string;
  paymentStatus: PaymentStatus;
  paymentAmount?: number;
  paymentProof?: string;
  paymentDate?: string;
  paymentMethod?: string;
  transactionRef?: string;
  appliedAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  league?: {
    id: string;
    name: string;
    format: string;
    registrationFee: number;
    region?: {
      name: string;
      country: {
        name: string;
      };
    };
  };
}

export type ParticipationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN';
export type PaymentStatus = 'UNPAID' | 'PENDING' | 'PAID' | 'REFUNDED';

// Mock data
export const MOCK_PARTICIPATIONS: LeagueParticipation[] = [
  {
    id: "part-001",
    ownerId: "user-001",
    teamName: "AS Diamono FC",
    leagueId: "league-001",
    status: "PENDING",
    paymentStatus: "PENDING",
    paymentAmount: 500000,
    paymentProof: "https://example.com/proof.jpg",
    paymentDate: "2026-02-15T10:30:00Z",
    paymentMethod: "Orange Money",
    transactionRef: "OM20260215123456",
    appliedAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-02-15T10:30:00Z",
    owner: {
      id: "user-001",
      firstName: "Mamadou",
      lastName: "Diallo",
      email: "mamadou.diallo@example.com",
      phone: "+221771234567"
    },
    league: {
      id: "league-001",
      name: "Championnat National Sénior 2026",
      format: "league",
      registrationFee: 500000,
      region: { name: "Dakar", country: { name: "Sénégal" } }
    }
  },
  {
    id: "part-002",
    ownerId: "user-002",
    teamName: "Étoiles de Thiès",
    leagueId: "league-001",
    status: "PENDING",
    paymentStatus: "PAID",
    paymentAmount: 500000,
    paymentProof: "https://example.com/proof2.jpg",
    paymentDate: "2026-02-14T14:20:00Z",
    paymentMethod: "Virement bancaire",
    transactionRef: "VIR20260214789012",
    appliedAt: "2026-02-14T11:00:00Z",
    updatedAt: "2026-02-14T16:00:00Z",
    owner: {
      id: "user-002",
      firstName: "Aminata",
      lastName: "Sow",
      email: "aminata.sow@example.com",
      phone: "+221775551234"
    },
    league: {
      id: "league-001",
      name: "Championnat National Sénior 2026",
      format: "league",
      registrationFee: 500000,
      region: { name: "Dakar", country: { name: "Sénégal" } }
    }
  },
  {
    id: "part-003",
    ownerId: "user-003",
    teamName: "Lions de Saint-Louis",
    leagueId: "league-002",
    status: "PENDING",
    paymentStatus: "UNPAID",
    appliedAt: "2026-02-16T08:00:00Z",
    updatedAt: "2026-02-16T08:00:00Z",
    owner: {
      id: "user-003",
      firstName: "Ousmane",
      lastName: "Ba",
      email: "ousmane.ba@example.com",
      phone: "+221776667890"
    },
    league: {
      id: "league-002",
      name: "Coupe des Champions U21",
      format: "tournament",
      registrationFee: 250000,
      region: { name: "Thiès", country: { name: "Sénégal" } }
    }
  },
  {
    id: "part-004",
    ownerId: "user-004",
    teamName: "AC Kaolack United",
    leagueId: "league-001",
    status: "APPROVED",
    paymentStatus: "PAID",
    paymentAmount: 500000,
    paymentProof: "https://example.com/proof4.jpg",
    paymentDate: "2026-02-10T12:00:00Z",
    paymentMethod: "Wave",
    transactionRef: "WAVE20260210345678",
    appliedAt: "2026-02-10T09:30:00Z",
    updatedAt: "2026-02-11T10:00:00Z",
    owner: {
      id: "user-004",
      firstName: "Fatou",
      lastName: "Ndiaye",
      email: "fatou.ndiaye@example.com",
      phone: "+221778889999"
    },
    league: {
      id: "league-001",
      name: "Championnat National Sénior 2026",
      format: "league",
      registrationFee: 500000,
      region: { name: "Dakar", country: { name: "Sénégal" } }
    }
  },
  {
    id: "part-005",
    ownerId: "user-005",
    teamName: "Racing Club de Ziguinchor",
    leagueId: "league-003",
    status: "REJECTED",
    rejectionReason: "Documents d'inscription incomplets. Veuillez fournir les certificats médicaux de tous les joueurs et la licence officielle du club.",
    paymentStatus: "REFUNDED",
    paymentAmount: 300000,
    paymentProof: "https://example.com/proof5.jpg",
    paymentDate: "2026-02-08T15:30:00Z",
    paymentMethod: "Free Money",
    transactionRef: "FREE20260208111222",
    appliedAt: "2026-02-08T14:00:00Z",
    updatedAt: "2026-02-12T11:00:00Z",
    owner: {
      id: "user-005",
      firstName: "Ibrahima",
      lastName: "Sarr",
      email: "ibrahima.sarr@example.com",
      phone: "+221779990000"
    },
    league: {
      id: "league-003",
      name: "Ligue Régionale de Basket",
      format: "league",
      registrationFee: 300000,
      region: { name: "Dakar", country: { name: "Sénégal" } }
    }
  }
];

// COULEURS
const COLORS = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  withdrawn: 'bg-gray-100 text-gray-800 border-gray-200',
  unpaid: 'bg-red-100 text-red-800 border-red-200',
  paymentPending: 'bg-amber-100 text-amber-800 border-amber-200',
  paid: 'bg-green-100 text-green-800 border-green-200',
  refunded: 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function Page() {
  const [participations, setParticipations] = useState<LeagueParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ParticipationStatus | 'all'>('all');
  const [selectedParticipation, setSelectedParticipation] = useState<LeagueParticipation | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // États pour les modals
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailModalData, setDetailModalData] = useState<LeagueParticipation | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<any>(null);

  useEffect(() => {
    fetchParticipations();
  }, []);

  const fetchParticipations = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setParticipations(MOCK_PARTICIPATIONS);
    setLoading(false);
  };

  // Ouvrir le modal de succès
  const openSuccessModal = (type: 'success' | 'error', title: string, message: string, details?: any) => {
    setSuccessModalData({ type, title, message, details });
    setShowSuccessModal(true);
  };

  // Ouvrir le modal de détails
  const openDetailModal = (participation: LeagueParticipation) => {
    setDetailModalData(participation);
    setShowDetailModal(true);
  };

  // Ouvrir le dialog de confirmation
  const openConfirmDialog = (data: any) => {
    setConfirmDialogData(data);
    setShowConfirmDialog(true);
  };

  const handleApprove = (id: string) => {
    const participation = participations.find(p => p.id === id);
    if (!participation) return;

    openConfirmDialog({
      title: "Confirmer l'approbation",
      message: `Êtes-vous sûr de vouloir approuver ${participation.teamName} ?`,
      confirmText: "Oui, approuver",
      cancelText: "Annuler",
      type: 'success',
      onConfirm: async () => {
        setActionLoading(id);
        setShowConfirmDialog(false);
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setParticipations(prev => prev.map(p => 
          p.id === id ? { ...p, status: 'APPROVED' as const, updatedAt: new Date().toISOString() } : p
        ));
        
        setActionLoading(null);
        
        openSuccessModal(
          'success',
          '✓ Participation Approuvée !',
          `${participation.teamName} est maintenant inscrite à la compétition.`,
          {
            ligue: participation.league?.name,
            responsable: `${participation.owner?.firstName} ${participation.owner?.lastName}`,
            date: new Date().toLocaleDateString('fr-FR')
          }
        );
      }
    });
  };

  const handleValidatePayment = (id: string) => {
    const participation = participations.find(p => p.id === id);
    if (!participation) return;

    openConfirmDialog({
      title: "Valider le paiement",
      message: `Confirmer la réception de ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(participation.paymentAmount || 0)} ?`,
      confirmText: "Valider le paiement",
      cancelText: "Annuler",
      type: 'primary',
      onConfirm: async () => {
        setActionLoading(id);
        setShowConfirmDialog(false);
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setParticipations(prev => prev.map(p => 
          p.id === id ? { ...p, paymentStatus: 'PAID' as const, updatedAt: new Date().toISOString() } : p
        ));
        
        setActionLoading(null);
        
        openSuccessModal(
          'success',
          '✓ Paiement Validé !',
          `Le paiement de ${participation.teamName} a été confirmé.`,
          {
            montant: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(participation.paymentAmount || 0),
            reference: participation.transactionRef
          }
        );
      }
    });
  };

  const openRejectModal = (p: LeagueParticipation) => {
    setSelectedParticipation(p);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!selectedParticipation || !rejectionReason.trim()) return;
    
    setActionLoading(selectedParticipation.id);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setParticipations(prev => prev.map(p => 
      p.id === selectedParticipation.id 
        ? { ...p, status: 'REJECTED' as const, rejectionReason, updatedAt: new Date().toISOString() } 
        : p
    ));
    
    setShowRejectModal(false);
    
    openSuccessModal(
      'error',
      '✕ Demande Rejetée',
      `La participation de ${selectedParticipation.teamName} a été rejetée.`,
      {
        motif: rejectionReason
      }
    );
    
    setRejectionReason('');
    setSelectedParticipation(null);
    setActionLoading(null);
  };

  const getStatusStyle = (status: ParticipationStatus) => {
    const styles = { 
      PENDING: COLORS.pending, 
      APPROVED: COLORS.approved, 
      REJECTED: COLORS.rejected, 
      WITHDRAWN: COLORS.withdrawn 
    };
    return styles[status];
  };

  const getPaymentStyle = (status: PaymentStatus) => {
    const styles = { 
      UNPAID: COLORS.unpaid, 
      PENDING: COLORS.paymentPending, 
      PAID: COLORS.paid, 
      REFUNDED: COLORS.refunded 
    };
    return styles[status];
  };

  const getStatusLabel = (status: ParticipationStatus) => {
    const labels = { 
      PENDING: 'En attente', 
      APPROVED: 'Approuvé', 
      REJECTED: 'Rejeté', 
      WITHDRAWN: 'Retiré' 
    };
    return labels[status];
  };

  const getPaymentLabel = (status: PaymentStatus) => {
    const labels = { 
      UNPAID: 'Non payé', 
      PENDING: 'En attente', 
      PAID: 'Payé', 
      REFUNDED: 'Remboursé' 
    };
    return labels[status];
  };

  const filtered = participations.filter(p => {
    const matchesSearch = !searchTerm || 
      p.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.league?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: participations.filter(p => p.status === 'PENDING').length,
    paymentPending: participations.filter(p => p.paymentStatus === 'PENDING').length,
    approved: participations.filter(p => p.status === 'APPROVED').length,
    total: participations.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Demandes de participation</h1>
              <p className="text-gray-600 text-sm mt-1">Gérez les inscriptions aux ligues</p>
            </div>
            {stats.pending > 0 && (
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-bold border-2 border-amber-300 animate-pulse">
                {stats.pending} en attente
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'En attente', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Paiements', value: stats.paymentPending, icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Approuvés', value: stats.approved, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
            { label: 'Total', value: stats.total, icon: Users, color: 'text-gray-500', bg: 'bg-gray-50' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une équipe, un responsable..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ParticipationStatus | 'all')}
              className="md:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="APPROVED">Approuvé</option>
              <option value="REJECTED">Rejeté</option>
              <option value="WITHDRAWN">Retiré</option>
            </select>
          </div>
        </div>

        {/* Liste */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune demande trouvée</h3>
            <p className="text-gray-500">Modifiez vos critères de recherche</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((p) => (
              <div 
                key={p.id} 
                className={`bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  p.status === 'REJECTED' ? 'border-red-200 hover:border-red-300' : 
                  p.status === 'APPROVED' ? 'border-green-200 hover:border-green-300' : 
                  'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => openDetailModal(p)}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 transition-transform hover:scale-110 ${
                          p.status === 'REJECTED' ? 'bg-red-100 text-red-600' : 
                          p.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 
                          'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {p.teamName?.charAt(0) || 'E'}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <button 
                            onClick={() => openDetailModal(p)}
                            className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors text-left"
                          >
                            {p.teamName || 'Équipe sans nom'}
                          </button>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(p.status)}`}>
                            {getStatusLabel(p.status)}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getPaymentStyle(p.paymentStatus)}`}>
                            {getPaymentLabel(p.paymentStatus)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                          <span className="flex items-center gap-1"><Trophy className="w-4 h-4" /> {p.league?.name}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {p.league?.region?.name}</span>
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {p.owner?.firstName} {p.owner?.lastName}</span>
                        </div>
                        
                        {/* Message de rejet visible directement */}
                        {p.status === 'REJECTED' && p.rejectionReason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-bold text-red-800">Motif du rejet:</p>
                              <p className="text-sm text-red-700 line-clamp-2">{p.rejectionReason}</p>
                              <button 
                                onClick={() => openDetailModal(p)}
                                className="text-xs text-red-600 hover:text-red-800 underline mt-1 font-medium"
                              >
                                Voir tout →
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {/* Message de succès visible directement */}
                        {p.status === 'APPROVED' && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-bold text-green-800">Participation confirmée</p>
                              <p className="text-sm text-green-700">Cette équipe est officiellement inscrite.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {p.status === 'PENDING' && (
                        <>
                          {p.paymentStatus === 'PENDING' && p.paymentProof && (
                            <button
                              onClick={() => handleValidatePayment(p.id)}
                              disabled={actionLoading === p.id}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap"
                            >
                              {actionLoading === p.id ? '...' : 'Valider paiement'}
                            </button>
                          )}
                          <button
                            onClick={() => handleApprove(p.id)}
                            disabled={actionLoading === p.id || p.paymentStatus !== 'PAID'}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap ${
                              p.paymentStatus === 'PAID' 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            title={p.paymentStatus !== 'PAID' ? 'Validation du paiement requise' : ''}
                          >
                            {actionLoading === p.id ? '...' : 'Approuver'}
                          </button>
                          <button
                            onClick={() => openRejectModal(p)}
                            disabled={actionLoading === p.id}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap"
                          >
                            Rejeter
                          </button>
                        </>
                      )}
                      
                      {(p.status === 'APPROVED' || p.status === 'REJECTED') && (
                        <button
                          onClick={() => openDetailModal(p)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          Détails
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== MODAL DE REJET ==================== */}
      {showRejectModal && selectedParticipation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => !actionLoading && setShowRejectModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-modal-in">
            <div className="bg-red-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  Rejeter la demande
                </h3>
                {!actionLoading && (
                  <button 
                    onClick={() => setShowRejectModal(false)}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-4 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-lg">
                  {selectedParticipation.teamName?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{selectedParticipation.teamName}</p>
                  <p className="text-sm text-gray-600">{selectedParticipation.league?.name}</p>
                </div>
              </div>
              
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Motif du rejet <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-all"
                rows={4}
                placeholder="Expliquez clairement pourquoi cette demande est rejetée..."
                disabled={actionLoading === selectedParticipation.id}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1 text-right">{rejectionReason.length} caractères</p>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRejectModal(false)}
                  disabled={actionLoading === selectedParticipation.id}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectionReason.trim() || actionLoading === selectedParticipation.id}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {actionLoading === selectedParticipation.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Traitement...
                    </>
                  ) : (
                    'Confirmer le rejet'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL DE CONFIRMATION ==================== */}
      {showConfirmDialog && confirmDialogData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowConfirmDialog(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-modal-in">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmDialogData.type === 'success' ? 'bg-green-100' : 'bg-blue-100'}`}>
              <AlertCircle className={`w-8 h-8 ${confirmDialogData.type === 'success' ? 'text-green-600' : 'text-blue-600'}`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{confirmDialogData.title}</h3>
            <p className="text-gray-600 mb-6">{confirmDialogData.message}</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmDialog(false)} 
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                {confirmDialogData.cancelText}
              </button>
              <button 
                onClick={confirmDialogData.onConfirm} 
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors ${confirmDialogData.type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {confirmDialogData.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL DE SUCCÈS/REJET HYPER VISIBLE ==================== */}
      {showSuccessModal && successModalData && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-success-bounce">
            {/* Header coloré avec icône */}
            <div className={`${successModalData.type === 'success' ? 'bg-green-500' : 'bg-red-500'} p-8 text-center relative`}>
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-icon-bounce">
                {successModalData.type === 'success' ? (
                  <CheckCircle className="w-12 h-12 text-green-500" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white">{successModalData.title}</h3>
            </div>
            
            {/* Contenu */}
            <div className="p-8 text-center">
              <p className="text-gray-700 text-lg mb-6 font-medium">{successModalData.message}</p>
              
              {successModalData.details && (
                <div className={`${successModalData.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-2 rounded-xl p-4 mb-6 text-left space-y-2`}>
                  {successModalData.details.ligue && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ligue:</span>
                      <span className="font-semibold text-gray-900">{successModalData.details.ligue}</span>
                    </div>
                  )}
                  {successModalData.details.responsable && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsable:</span>
                      <span className="font-semibold text-gray-900">{successModalData.details.responsable}</span>
                    </div>
                  )}
                  {successModalData.details.date && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold text-gray-900">{successModalData.details.date}</span>
                    </div>
                  )}
                  {successModalData.details.montant && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Montant:</span>
                      <span className="font-bold text-green-600">{successModalData.details.montant}</span>
                    </div>
                  )}
                  {successModalData.details.reference && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Référence:</span>
                      <span className="font-mono text-xs bg-white px-2 py-1 rounded border">{successModalData.details.reference}</span>
                    </div>
                  )}
                  {successModalData.details.motif && (
                    <div className="mt-2 pt-2 border-t border-red-200">
                      <span className="text-red-800 font-semibold text-sm block mb-1">Motif du rejet:</span>
                      <p className="text-red-700 text-sm bg-white p-2 rounded border border-red-100">{successModalData.details.motif}</p>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg ${successModalData.type === 'success' ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-200' : 'bg-red-500 hover:bg-red-600 text-white shadow-red-200'}`}
              >
                {successModalData.type === 'success' ? 'Parfait !' : 'Compris'}
              </button>
            </div>
            
            {/* Barre de progression */}
            <div className={`h-1.5 ${successModalData.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-progress-bar`}></div>
          </div>
        </div>
      )}

      {/* ==================== MODAL DE DÉTAILS ==================== */}
      {showDetailModal && detailModalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowDetailModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-modal-in">
            {/* Header */}
            <div className={`p-6 ${detailModalData.status === 'REJECTED' ? 'bg-red-500' : detailModalData.status === 'APPROVED' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {detailModalData.status === 'REJECTED' ? <XCircle className="w-8 h-8" /> : detailModalData.status === 'APPROVED' ? <CheckCircle className="w-8 h-8" /> : <Info className="w-8 h-8" />}
                  <h3 className="text-xl font-bold">
                    {detailModalData.status === 'REJECTED' ? 'Demande Rejetée' : detailModalData.status === 'APPROVED' ? 'Demande Approuvée' : 'Détails de la demande'}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Info équipe */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-2xl font-bold text-gray-600">
                  {detailModalData.teamName?.charAt(0) || 'E'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">{detailModalData.teamName}</h4>
                  <p className="text-gray-600">{detailModalData.league?.name}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${detailModalData.status === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-200' : detailModalData.status === 'APPROVED' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                      {detailModalData.status === 'REJECTED' ? 'REJETÉ' : detailModalData.status === 'APPROVED' ? 'APPROUVÉ' : 'EN ATTENTE'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Message principal */}
              {(detailModalData.status === 'REJECTED' || detailModalData.status === 'APPROVED') && (
                <div className={`p-4 rounded-xl border-l-4 ${detailModalData.status === 'REJECTED' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}>
                  <h5 className={`font-bold mb-2 ${detailModalData.status === 'REJECTED' ? 'text-red-900' : 'text-green-900'}`}>
                    {detailModalData.status === 'REJECTED' ? 'Motif du rejet' : 'Confirmation'}
                  </h5>
                  <p className={`text-sm ${detailModalData.status === 'REJECTED' ? 'text-red-700' : 'text-green-700'}`}>
                    {detailModalData.status === 'REJECTED' 
                      ? detailModalData.rejectionReason 
                      : `La participation de ${detailModalData.teamName} a été approuvée le ${new Date(detailModalData.updatedAt).toLocaleDateString('fr-FR')}. L'équipe est maintenant officiellement inscrite à la compétition.`}
                  </p>
                </div>
              )}
              
              {/* Détails */}
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" /> Informations
                </h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-xs mb-1">Responsable</p>
                    <p className="font-semibold text-gray-900">{detailModalData.owner?.firstName} {detailModalData.owner?.lastName}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-xs mb-1">Téléphone</p>
                    <p className="font-semibold text-gray-900">{detailModalData.owner?.phone}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg col-span-2 border border-gray-200">
                    <p className="text-gray-500 text-xs mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{detailModalData.owner?.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Paiement */}
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" /> Paiement
                </h5>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant</span>
                    <span className="font-bold text-gray-900">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(detailModalData.paymentAmount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Méthode</span>
                    <span className="font-medium text-gray-900">{detailModalData.paymentMethod || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Référence</span>
                    <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200">{detailModalData.transactionRef || '-'}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles pour animations */}
      <style jsx global>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes success-bounce {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes icon-bounce {
          0% { transform: scale(0) rotate(-45deg); }
          50% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes progress-bar {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-modal-in { animation: modal-in 0.2s ease-out forwards; }
        .animate-success-bounce { animation: success-bounce 0.5s ease-out forwards; }
        .animate-icon-bounce { animation: icon-bounce 0.5s ease-out forwards; }
        .animate-progress-bar { animation: progress-bar 4s linear forwards; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}