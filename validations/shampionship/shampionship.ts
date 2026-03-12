
import * as z from 'zod';
export const  tournamentSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  format: z.string().nonempty("Le format est requis"),
  tier: z.string().nonempty("Le niveau est requis"),
  category: z.enum(["AMATEUR", "PRO", "SEMI_PRO"]),
  sportId: z.string().uuid("ID Sport invalide"),
  regionId: z.string().nonempty("La région est requise"),
  startDate: z.string().nonempty("Date de début requise"),
  endDate: z.string().nonempty("Date de fin requise"),
  
  // Validation numérique
  maxTeams: z.number().min(2, "Minimum 2 équipes"),
  minTeams: z.number().min(2, "Minimum 2 équipes"),
  registrationFee: z.number().min(0, "Frais non négatifs"),
  totalPrizePool: z.number().min(0),
  firstPlacePrize: z.number().min(0),
  secondPlacePrize: z.number().min(0),
  thirdPlacePrize: z.number().min(0),

  // Objets complexes
  prizeDistribution: z.object({
    champion: z.string().min(1, "Requis"),
    vice_champion: z.string().min(1, "Requis"),
  }),
  individualPrizes: z.object({
    meilleur_joueur_MVP: z.number().min(0),
    soulier_d_or_buteur: z.number().min(0),
  }),
  rules: z.object({
    discipline: z.object({
      yellow_card_fine: z.number().min(0),
      red_card_fine: z.number().min(0),
    }),
    match_logistics: z.object({
      duration: z.string().min(1, "Précisez la durée"),
      substitution_limit: z.number().max(11),
    }),
  }),
  knockoutFormat: z.string(),
  hasThirdPlaceMatch: z.boolean(),
  isPublic: z.boolean(),
}).refine((data) => data.firstPlacePrize <= data.totalPrizePool, {
  message: "Le prix du 1er ne peut pas dépasser la cagnotte totale",
  path: ["firstPlacePrize"],
});

// Type TypeScript généré à partir du schéma
export type TournamentFormValues = z.infer<typeof tournamentSchema>;