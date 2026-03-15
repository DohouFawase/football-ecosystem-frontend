import { LoginFormSchema } from "@/validations/auth/loginSchema";
import { RegisterFormSchema } from "@/validations/auth/registerSchema";
import z from "zod";

/**
 * Interface pour l'inscription (SignUp)
 * Reflète les champs requis par votre SignUpDTO
 */
export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  passwordConfirm: string;
}

/**
 * Interface pour la connexion (Login)
 * Reflète les champs requis par votre LoginDto
 */
export interface LoginData {
  email: string;
  password: string;
}



export type LoginFormInputs = z.infer<typeof LoginFormSchema>;
export type RegisterFormInputs = z.infer<typeof RegisterFormSchema>;