import { League } from "@/types/LeagueTypes";

export const MOCK_LEAGUES: League[] = [
  {
    "id": "league-calavi-2026",
    "name": "Coupe des Vacances Calavi 2026",
    "description": "Tournoi de prestige. Phase de groupes (4 poules de 4) suivie d'une phase à élimination directe.",
    "format": "tournament" as const,
    "tier": "regional",
    "category": "AMATEUR",
    "startDate": "2026-07-15T09:00:00Z",
    "endDate": "2026-08-30T18:00:00Z",
    "maxTeams": 16,
    "minTeams": 16,
    "registrationFee": 30000,
    "totalPrizePool": 750000,
    "firstPlacePrize": 500000,
    "secondPlacePrize": 300000,
    "thirdPlacePrize": 150000,
    "status": "open_registration" as const,
    "isPublic": true,
    "knockoutFormat": "single_elimination",
    "hasThirdPlaceMatch": true,
    "_count": {
      "teams": 8,
      "participations": 12
    },
    "region": {
      "id": "6a852d53-d123-4712-a40d-74c39c195026",
      "name": "Atlantique (Calavi)",
      "country": { "id": "country-bj", "name": "Bénin", "code": "BJ" }
    },
    "sport": { "id": "8d8ade51-8a9c-448b-9ed9-d3a91754ace4", "name": "Football" },
    // Données étendues issues de ton nouveau JSON
    "prizeDistribution": {
      "champion": "Trophée + Médailles d'or + 500.000 FCFA",
      "vice_champion": "Médailles d'argent + 300.000 FCFA",
      "troisieme": "Médailles de bronze + 150.000 FCFA",
      "quatrieme": "Ballons de compétition + 50.000 FCFA"
    },
    "individualPrizes": {
      "meilleur_joueur_MVP": 50000,
      "soulier_d_or_buteur": 50000,
      "gants_d_or_gardien": 30000,
      "prix_fair_play": 20000
    },
    "rules": {
      "competition_format": { "groups": 4, "teams_per_group": 4, "qualifiers_per_group": 2 },
      "discipline": { "yellow_card_fine": 1000, "red_card_fine": 2500, "suspension_rule": "2 jaunes = 1 match" },
      "match_logistics": { "duration": "90min", "substitution_limit": 5, "extra_time_final_only": true }
    }
  },
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
    "_count": { "teams": 10, "participations": 15 },
    "region": {
      "id": "region-001",
      "name": "Dakar",
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
    "_count": { "teams": 12, "participations": 12 },
    "region": {
      "id": "region-001",
      "name": "Dakar",
      "country": { "id": "country-001", "name": "Sénégal", "code": "SN" }
    },
    "sport": { "id": "sport-002", "name": "Basketball" }
  }
];