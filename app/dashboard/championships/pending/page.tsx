'use client';

import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, DollarSign, FileText, Eye, AlertCircle, Filter, Search, Calendar, Trophy, MapPin, Mail, Phone } from 'lucide-react';

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

export type ParticipationStatus = 
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'WITHDRAWN';

export type PaymentStatus = 
  | 'UNPAID'
  | 'PENDING'
  | 'PAID'
  | 'REFUNDED';

// Mock data for development
export const MOCK_PARTICIPATIONS: LeagueParticipation[] = [
  {
    "id": "participation-001",
    "ownerId": "user-001",
    "teamName": "AS Diamono FC",
    "teamId": null,
    "leagueId": "league-001",
    "status": "PENDING" as const,
    "rejectionReason": null,
    "paymentStatus": "PENDING" as const,
    "paymentAmount": 500000,
    "paymentProof": "https://storage.example.com/proofs/payment-001.jpg",
    "paymentDate": "2026-02-15T10:30:00Z",
    "paymentMethod": "Mobile Money (Orange Money)",
    "transactionRef": "OM20260215123456",
    "appliedAt": "2026-02-15T09:00:00Z",
    "updatedAt": "2026-02-15T10:30:00Z",
    "owner": {
      "id": "user-001",
      "firstName": "Mamadou",
      "lastName": "Diallo",
      "email": "mamadou.diallo@example.com",
      "phone": "+221771234567"
    },
    "league": {
      "id": "league-001",
      "name": "Championnat National Sénior 2026",
      "format": "league",
      "registrationFee": 500000,
      "region": {
        "name": "Dakar",
        "country": {
          "name": "Sénégal"
        }
      }
    }
  },
  {
    "id": "participation-002",
    "ownerId": "user-002",
    "teamName": "Étoiles de Thiès",
    "teamId": null,
    "leagueId": "league-001",
    "status": "PENDING" as const,
    "rejectionReason": null,
    "paymentStatus": "PAID" as const,
    "paymentAmount": 500000,
    "paymentProof": "https://storage.example.com/proofs/payment-002.jpg",
    "paymentDate": "2026-02-14T14:20:00Z",
    "paymentMethod": "Virement bancaire",
    "transactionRef": "VIR20260214789012",
    "appliedAt": "2026-02-14T11:00:00Z",
    "updatedAt": "2026-02-14T16:00:00Z",
    "owner": {
      "id": "user-002",
      "firstName": "Aminata",
      "lastName": "Sow",
      "email": "aminata.sow@example.com",
      "phone": "+221775551234"
    },
    "league": {
      "id": "league-001",
      "name": "Championnat National Sénior 2026",
      "format": "league",
      "registrationFee": 500000,
      "region": {
        "name": "Dakar",
        "country": {
          "name": "Sénégal"
        }
      }
    }
  },
  {
    "id": "participation-003",
    "ownerId": "user-003",
    "teamName": "Lions de Saint-Louis",
    "teamId": null,
    "leagueId": "league-002",
    "status": "PENDING" as const,
    "rejectionReason": null,
    "paymentStatus": "UNPAID" as const,
    "paymentAmount": null,
    "paymentProof": null,
    "paymentDate": null,
    "paymentMethod": null,
    "transactionRef": null,
    "appliedAt": "2026-02-16T08:00:00Z",
    "updatedAt": "2026-02-16T08:00:00Z",
    "owner": {
      "id": "user-003",
      "firstName": "Ousmane",
      "lastName": "Ba",
      "email": "ousmane.ba@example.com",
      "phone": "+221776667890"
    },
    "league": {
      "id": "league-002",
      "name": "Coupe des Champions U21",
      "format": "tournament",
      "registrationFee": 250000,
      "region": {
        "name": "Thiès",
        "country": {
          "name": "Sénégal"
        }
      }
    }
  },
  {
    "id": "participation-004",
    "ownerId": "user-004",
    "teamName": "AC Kaolack United",
    "teamId": null,
    "leagueId": "league-001",
    "status": "APPROVED" as const,
    "rejectionReason": null,
    "paymentStatus": "PAID" as const,
    "paymentAmount": 500000,
    "paymentProof": "https://storage.example.com/proofs/payment-004.jpg",
    "paymentDate": "2026-02-10T12:00:00Z",
    "paymentMethod": "Wave",
    "transactionRef": "WAVE20260210345678",
    "appliedAt": "2026-02-10T09:30:00Z",
    "updatedAt": "2026-02-11T10:00:00Z",
    "owner": {
      "id": "user-004",
      "firstName": "Fatou",
      "lastName": "Ndiaye",
      "email": "fatou.ndiaye@example.com",
      "phone": "+221778889999"
    },
    "league": {
      "id": "league-001",
      "name": "Championnat National Sénior 2026",
      "format": "league",
      "registrationFee": 500000,
      "region": {
        "name": "Dakar",
        "country": {
          "name": "Sénégal"
        }
      }
    }
  },
  {
    "id": "participation-005",
    "ownerId": "user-005",
    "teamName": "Racing Club de Ziguinchor",
    "teamId": null,
    "leagueId": "league-003",
    "status": "REJECTED" as const,
    "rejectionReason": "Documents d'inscription incomplets. Veuillez fournir les certificats médicaux de tous les joueurs et la licence officielle du club.",
    "paymentStatus": "REFUNDED" as const,
    "paymentAmount": 300000,
    "paymentProof": "https://storage.example.com/proofs/payment-005.jpg",
    "paymentDate": "2026-02-08T15:30:00Z",
    "paymentMethod": "Free Money",
    "transactionRef": "FREE20260208111222",
    "appliedAt": "2026-02-08T14:00:00Z",
    "updatedAt": "2026-02-12T11:00:00Z",
    "owner": {
      "id": "user-005",
      "firstName": "Ibrahima",
      "lastName": "Sarr",
      "email": "ibrahima.sarr@example.com",
      "phone": "+221779990000"
    },
    "league": {
      "id": "league-003",
      "name": "Ligue Régionale de Basket",
      "format": "league",
      "registrationFee": 300000,
      "region": {
        "name": "Dakar",
        "country": {
          "name": "Sénégal"
        }
      }
    }
  },
  {
    "id": "participation-006",
    "ownerId": "user-006",
    "teamName": "Jeunesse Sportive de Mbour",
    "teamId": null,
    "leagueId": "league-001",
    "status": "PENDING" as const,
    "rejectionReason": null,
    "paymentStatus": "PENDING" as const,
    "paymentAmount": 500000,
    "paymentProof": "https://storage.example.com/proofs/payment-006.jpg",
    "paymentDate": "2026-02-16T09:45:00Z",
    "paymentMethod": "Mobile Money (Orange Money)",
    "transactionRef": "OM20260216567890",
    "appliedAt": "2026-02-16T08:30:00Z",
    "updatedAt": "2026-02-16T09:45:00Z",
    "owner": {
      "id": "user-006",
      "firstName": "Aïssatou",
      "lastName": "Faye",
      "email": "aissatou.faye@example.com",
      "phone": "+221770001111"
    },
    "league": {
      "id": "league-001",
      "name": "Championnat National Sénior 2026",
      "format": "league",
      "registrationFee": 500000,
      "region": {
        "name": "Dakar",
        "country": {
          "name": "Sénégal"
        }
      }
    }
  }
];

const Page = () => {
  const [participations, setParticipations] = useState<LeagueParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ParticipationStatus | 'all'>('PENDING');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<PaymentStatus | 'all'>('all');
  const [selectedParticipation, setSelectedParticipation] = useState<LeagueParticipation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingParticipations();
  }, []);

  const fetchPendingParticipations = async () => {
    try {
      setLoading(true);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utiliser les données mock
      setParticipations(MOCK_PARTICIPATIONS);
      
      // Code pour l'API réelle (à décommenter plus tard)
      // const response = await fetch('/api/organizer/participations/pending');
      // const data = await response.json();
      // setParticipations(data.participations || []);
    } catch (error) {
      console.error('Error fetching participations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (participationId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir approuver cette participation ?')) return;
    
    setActionLoading(true);
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mettre à jour les données mock localement
      setParticipations(prev => 
        prev.map(p => 
          p.id === participationId 
            ? { ...p, status: 'APPROVED' as const, updatedAt: new Date().toISOString() }
            : p
        )
      );
      
      alert('Participation approuvée avec succès !');
      
      // Code pour l'API réelle (à décommenter plus tard)
      // const response = await fetch(`/api/organizer/participations/${participationId}/approve`, {
      //   method: 'POST',
      // });
      // 
      // if (response.ok) {
      //   await fetchPendingParticipations();
      //   alert('Participation approuvée avec succès !');
      // }
    } catch (error) {
      console.error('Error approving participation:', error);
      alert('Erreur lors de l\'approbation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedParticipation || !rejectionReason.trim()) {
      alert('Veuillez fournir une raison de rejet');
      return;
    }

    setActionLoading(true);
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mettre à jour les données mock localement
      setParticipations(prev => 
        prev.map(p => 
          p.id === selectedParticipation.id 
            ? { 
                ...p, 
                status: 'REJECTED' as const, 
                rejectionReason: rejectionReason,
                updatedAt: new Date().toISOString() 
              }
            : p
        )
      );
      
      setShowModal(false);
      setRejectionReason('');
      setSelectedParticipation(null);
      alert('Participation rejetée');
      
      // Code pour l'API réelle (à décommenter plus tard)
      // const response = await fetch(`/api/organizer/participations/${selectedParticipation.id}/reject`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reason: rejectionReason }),
      // });
      // 
      // if (response.ok) {
      //   await fetchPendingParticipations();
      //   setShowModal(false);
      //   setRejectionReason('');
      //   setSelectedParticipation(null);
      //   alert('Participation rejetée');
      // }
    } catch (error) {
      console.error('Error rejecting participation:', error);
      alert('Erreur lors du rejet');
    } finally {
      setActionLoading(false);
    }
  };

  const handleValidatePayment = async (participationId: string) => {
    if (!confirm('Confirmer que le paiement a été reçu ?')) return;
    
    setActionLoading(true);
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mettre à jour les données mock localement
      setParticipations(prev => 
        prev.map(p => 
          p.id === participationId 
            ? { 
                ...p, 
                paymentStatus: 'PAID' as const,
                updatedAt: new Date().toISOString() 
              }
            : p
        )
      );
      
      alert('Paiement validé avec succès !');
      
      // Code pour l'API réelle (à décommenter plus tard)
      // const response = await fetch(`/api/organizer/participations/${participationId}/validate-payment`, {
      //   method: 'POST',
      // });
      // 
      // if (response.ok) {
      //   await fetchPendingParticipations();
      //   alert('Paiement validé avec succès !');
      // }
    } catch (error) {
      console.error('Error validating payment:', error);
      alert('Erreur lors de la validation du paiement');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: ParticipationStatus) => {
    const colors = {
      PENDING: 'bg-amber-500/10 text-amber-700 border-amber-300',
      APPROVED: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
      REJECTED: 'bg-red-500/10 text-red-700 border-red-300',
      WITHDRAWN: 'bg-slate-500/10 text-slate-700 border-slate-300',
    };
    return colors[status];
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colors = {
      UNPAID: 'bg-red-500/10 text-red-700 border-red-300',
      PENDING: 'bg-amber-500/10 text-amber-700 border-amber-300',
      PAID: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
      REFUNDED: 'bg-slate-500/10 text-slate-700 border-slate-300',
    };
    return colors[status];
  };

  const getStatusLabel = (status: ParticipationStatus) => {
    const labels = {
      PENDING: 'En attente',
      APPROVED: 'Approuvé',
      REJECTED: 'Rejeté',
      WITHDRAWN: 'Retiré',
    };
    return labels[status];
  };

  const getPaymentStatusLabel = (status: PaymentStatus) => {
    const labels = {
      UNPAID: 'Non payé',
      PENDING: 'En attente',
      PAID: 'Payé',
      REFUNDED: 'Remboursé',
    };
    return labels[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredParticipations = participations.filter(participation => {
    const matchesSearch = 
      participation.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participation.owner?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participation.owner?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participation.league?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || participation.status === filterStatus;
    const matchesPayment = filterPaymentStatus === 'all' || participation.paymentStatus === filterPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const pendingCount = participations.filter(p => p.status === 'PENDING').length;
  const paymentPendingCount = participations.filter(p => p.paymentStatus === 'PENDING').length;
  const approvedCount = participations.filter(p => p.status === 'APPROVED').length;

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className=" px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Demandes de Participation</h1>
              <p className="text-slate-600 mt-1">Gérez les inscriptions aux ligues</p>
            </div>
            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold border border-amber-300">
                  {pendingCount} en attente
                </span>
              )}
              {paymentPendingCount > 0 && (
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-300">
                  {paymentPendingCount} paiements à vérifier
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">En attente</p>
                <p className="text-3xl font-bold mt-1">{pendingCount}</p>
              </div>
              <Clock className="w-12 h-12 text-amber-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Paiements</p>
                <p className="text-3xl font-bold mt-1">{paymentPendingCount}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Approuvées</p>
                <p className="text-3xl font-bold mt-1">{approvedCount}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total</p>
                <p className="text-3xl font-bold mt-1">{participations.length}</p>
              </div>
              <Users className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une équipe ou ligue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ParticipationStatus | 'all')}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="all">Tous les statuts</option>
                <option value="PENDING">En attente</option>
                <option value="APPROVED">Approuvé</option>
                <option value="REJECTED">Rejeté</option>
                <option value="WITHDRAWN">Retiré</option>
              </select>
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value as PaymentStatus | 'all')}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="all">Tous les paiements</option>
                <option value="UNPAID">Non payé</option>
                <option value="PENDING">En attente</option>
                <option value="PAID">Payé</option>
                <option value="REFUNDED">Remboursé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Participations List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        ) : filteredParticipations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucune demande trouvée</h3>
            <p className="text-slate-600">Les demandes de participation apparaîtront ici</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredParticipations.map((participation) => (
              <div
                key={participation.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Trophy className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-slate-900">
                          {participation.teamName || 'Équipe sans nom'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(participation.status)}`}>
                          {getStatusLabel(participation.status)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(participation.paymentStatus)}`}>
                          {getPaymentStatusLabel(participation.paymentStatus)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="text-slate-700 font-medium truncate">
                            {participation.league?.name}
                          </span>
                        </div>

                        {participation.league?.region && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-700 truncate">
                              {participation.league.region.name}, {participation.league.region.country.name}
                            </span>
                          </div>
                        )}

                        {participation.owner && (
                          <>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="text-slate-700 truncate">
                                {participation.owner.firstName} {participation.owner.lastName}
                              </span>
                            </div>

                            {participation.owner.email && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <span className="text-slate-700 truncate">
                                  {participation.owner.email}
                                </span>
                              </div>
                            )}

                            {participation.owner.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <span className="text-slate-700">
                                  {participation.owner.phone}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="text-slate-700">
                            Demandé le {formatDate(participation.appliedAt)}
                          </span>
                        </div>
                      </div>

                      {/* Payment Info */}
                      {participation.league && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Frais d'inscription</p>
                              <p className="text-lg font-bold text-slate-900">
                                {formatCurrency(participation.league.registrationFee)}
                              </p>
                            </div>

                            {participation.paymentAmount && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Montant payé</p>
                                <p className="text-lg font-bold text-emerald-600">
                                  {formatCurrency(participation.paymentAmount)}
                                </p>
                              </div>
                            )}

                            {participation.paymentMethod && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Méthode de paiement</p>
                                <p className="text-sm font-semibold text-slate-700">
                                  {participation.paymentMethod}
                                </p>
                                {participation.transactionRef && (
                                  <p className="text-xs text-slate-500">
                                    Réf: {participation.transactionRef}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {participation.paymentProof && (
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <a
                                href={participation.paymentProof}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                              >
                                <FileText className="w-4 h-4" />
                                Voir le justificatif de paiement
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Rejection Reason */}
                      {participation.status === 'REJECTED' && participation.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-red-900 mb-1">Raison du rejet</p>
                            <p className="text-sm text-red-700">{participation.rejectionReason}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {participation.status === 'PENDING' && (
                    <div className="flex items-center gap-2 ml-4">
                      {participation.paymentStatus === 'PENDING' && (
                        <button
                          onClick={() => handleValidatePayment(participation.id)}
                          disabled={actionLoading}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
                        >
                          <DollarSign className="w-4 h-4" />
                          Valider paiement
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleApprove(participation.id)}
                        disabled={actionLoading || participation.paymentStatus !== 'PAID'}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm disabled:opacity-50"
                        title={participation.paymentStatus !== 'PAID' ? 'Le paiement doit être validé d\'abord' : ''}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approuver
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedParticipation(participation);
                          setShowModal(true);
                        }}
                        disabled={actionLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        Rejeter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showModal && selectedParticipation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Rejeter la demande</h3>
            <p className="text-slate-600 mb-4">
              Équipe: <span className="font-semibold">{selectedParticipation.teamName}</span>
            </p>
            
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Raison du rejet *
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Expliquez pourquoi cette demande est rejetée..."
            />

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setRejectionReason('');
                  setSelectedParticipation(null);
                }}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectionReason.trim()}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
              >
                {actionLoading ? 'En cours...' : 'Confirmer le rejet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;