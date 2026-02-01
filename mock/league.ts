import { League } from "@/types/LeagueTypes";

export const MOCK_LEAGUES: League[] = [
  {
    "id": "league-001",
    "name": "Championnat National Sénior 2026",
    "description": "Championnat national de football professionnel pour la saison 2026",
    "format": "league" as const,
    "tier": "professional",
    "category": "senior",
    "startDate": "2026-03-01T00:00:00Z",
    "endDate": "2026-11-30T23:59:59Z",
    "maxTeams": 16,
    "minTeams": 12,
    "registrationFee": 500000,
    "totalPrizePool": 10000000,
    "firstPlacePrize": 5000000,
    "secondPlacePrize": 3000000,
    "thirdPlacePrize": 2000000,
    "status": "open_registration" as const,
    "isPublic": true,
    "_count": {
      "teams": 10,
      "participations": 15
    },
    "region": {
      "id": "region-001",
      "name": "Dakar",
      "country": { "id": "country-001", "name": "Sénégal", "code": "SN" }
    },
    "sport": { "id": "sport-001", "name": "Football" }
  },
  {
    "id": "league-002",
    "name": "Coupe des Champions U21",
    "description": "Tournoi à élimination directe pour les équipes de moins de 21 ans",
    "format": "tournament" as const,
    "tier": "professional",
    "category": "U21",
    "startDate": "2026-04-15T00:00:00Z",
    "endDate": "2026-06-30T23:59:59Z",
    "maxTeams": 32,
    "minTeams": 16,
    "registrationFee": 250000,
    "totalPrizePool": 5000000,
    "firstPlacePrize": 2500000,
    "secondPlacePrize": 1500000,
    "thirdPlacePrize": 1000000,
    "status": "registration_closed" as const,
    "isPublic": true,
    "_count": {
      "teams": 32,
      "participations": 42
    },
    "region": {
      "id": "region-002",
      "name": "Thiès",
      "country": { "id": "country-001", "name": "Sénégal", "code": "SN" }
    },
    "sport": { "id": "sport-001", "name": "Football" }
  },
  {
    "id": "league-003",
    "name": "Ligue Régionale de Basket",
    "description": "Championnat régional de basketball professionnel",
    "format": "league" as const,
    "tier": "regional",
    "category": "senior",
    "startDate": "2026-02-01T00:00:00Z",
    "endDate": "2026-08-31T23:59:59Z",
    "maxTeams": 12,
    "minTeams": 8,
    "registrationFee": 300000,
    "totalPrizePool": 3000000,
    "firstPlacePrize": 1500000,
    "secondPlacePrize": 900000,
    "thirdPlacePrize": 600000,
    "status": "in_progress" as const,
    "isPublic": true,
    "_count": {
      "teams": 12,
      "participations": 12
    },
    "region": {
      "id": "region-001",
      "name": "Dakar",
      "country": { "id": "country-001", "name": "Sénégal", "code": "SN" }
    },
    "sport": { "id": "sport-002", "name": "Basketball" }
  },
  {
    "id": "league-004",
    "name": "Tournoi Féminin National",
    "description": "Tournoi national de football féminin",
    "format": "tournament" as const,
    "tier": "national",
    "category": "women",
    "startDate": "2026-05-01T00:00:00Z",
    "endDate": "2026-07-15T23:59:59Z",
    "maxTeams": 16,
    "minTeams": 8,
    "registrationFee": 200000,
    "totalPrizePool": 4000000,
    "firstPlacePrize": 2000000,
    "secondPlacePrize": 1200000,
    "thirdPlacePrize": 800000,
    "status": "draft" as const,
    "isPublic": true,
    "_count": {
      "teams": 0,
      "participations": 3
    },
    "region": {
      "id": "region-003",
      "name": "Saint-Louis",
      "country": { "id": "country-001", "name": "Sénégal", "code": "SN" }
    },
    "sport": { "id": "sport-001", "name": "Football" }
  },
  {
    "id": "league-005",
    "name": "Super Ligue Professionnelle",
    "description": "Élite du football sénégalais - Championnat des meilleurs clubs",
    "format": "league" as const,
    "tier": "professional",
    "category": "senior",
    "startDate": "2025-09-01T00:00:00Z",
    "endDate": "2026-05-31T23:59:59Z",
    "maxTeams": 14,
    "minTeams": 12,
    "registrationFee": 750000,
    "totalPrizePool": 15000000,
    "firstPlacePrize": 8000000,
    "secondPlacePrize": 4500000,
    "thirdPlacePrize": 2500000,
    "status": "completed" as const,
    "isPublic": true,
    "_count": {
      "teams": 14,
      "participations": 14
    },
    "region": {
      "id": "region-001",
      "name": "Dakar",
      "country": { "id": "country-001", "name": "Sénégal", "code": "SN" }
    },
    "sport": { "id": "sport-001", "name": "Football" }
  }
];
