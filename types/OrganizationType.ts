/**
 * Interface pour les documents de l'organisation
 */
export interface OrganizationDocument {
  url: string;
  type: 'statuts' | 'identity' | string; // On précise les types connus
}

/**
 * Interface pour le propriétaire (Owner)
 */
export interface OrganizationOwner {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  kycStatus: 'pending' | 'verified' | 'rejected' | string;
}

/**
 * Interface principale pour l'Organisation
 */
export interface Organization {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  ownerId: string;
  legalName: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  documents: OrganizationDocument[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
  rejectionReason: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  createdAt: string; // Ou Date si tu transformes la string après réception
  updatedAt: string;
  owner: OrganizationOwner;
  _count: {
    leagues: number;
  };
}