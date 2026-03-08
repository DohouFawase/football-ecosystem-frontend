import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string()
    .min(1, { message: "L'email est requis" })
    .email({ message: 'Adresse email invalide' }),
    
  password: z.string()
    .min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
});

// Cette ligne permet à React Hook Form de connaître la structure de tes données
export type LoginFormInputs = z.infer<typeof loginFormSchema>;