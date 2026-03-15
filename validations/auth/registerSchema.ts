import z from "zod";

export const RegisterFormSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    firstname: z.string().min(1, { message: "Le prénom ne peut pas être vide." }),
    lastname: z.string().min(1, { message: "Le nom ne peut pas être vide." }),
    password: z.string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
        .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." })
        .regex(/[^A-Za-z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial." }),
});