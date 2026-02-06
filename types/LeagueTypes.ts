export interface League {
  id: string;
  name: string;
  description?: string;
  format: 'league' | 'tournament';
  tier: string;
  category?: string;
  startDate: string;
  endDate: string;
  maxTeams?: number;
  minTeams?: number;
  registrationFee: number;
  totalPrizePool: number;
  firstPlacePrize?: number;
  secondPlacePrize?: number;
  thirdPlacePrize?: number;
  status: LeagueStatus;
  isPublic: boolean;
  _count?: {
    teams: number;
    participations: number;
  };
  region?: {
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
      code?: string;
    };
  };
  sport?: {
    id: string;
    name: string;
  };
}

export type LeagueStatus = 
  | 'draft'
  | 'open_registration'
  | 'registration_closed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';
  
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