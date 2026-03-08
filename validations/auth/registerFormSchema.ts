import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z.string()
    .min(1, { message: "L'email est requis" })
    .email({ message: 'Adresse email invalide' }),
    firstName: z.string().min(2, "Prénom trop court"),
lastName: z.string().min(2, "Nom trop court"),
  password: z.string()
    .min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
    .refine((value) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      // Retourne true si les 3 conditions sont respectées
      return hasUpperCase && hasLowerCase && hasNumber;
    }, {
      message: 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre'
    }), // Suppression du .check ici
});

// Cette ligne permet à React Hook Form de connaître la structure de tes données
export type RegisterFormInputs = z.infer<typeof registerFormSchema>;