import { z } from "zod";

export const createOrgSchema = z.object({
  // Étape 1
  name: z.string().min(3, "Le nom doit avoir au moins 3 caractères"),
  website: z.string().url("L'URL est invalide (ex: https://site.com)").or(z.literal("")).optional().nullable(),
  description: z.string().min(10, "La mission doit être plus détaillée"),
  
  // Étape 2
  email: z.string().email("Email officiel invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  registrationNumber: z.string().min(2, "Le numéro d'enregistrement est requis"),
  address: z.string().min(5, "L'adresse est trop courte"),
});

export type CreateOrgInputs = z.infer<typeof createOrgSchema>;