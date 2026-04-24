import { z } from "zod";

// ---------------------------------------------------------------------------
// Auth Validators
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email e obrigatorio")
    .email("Email invalido"),
  senha: z
    .string()
    .min(1, "Senha e obrigatoria"),
});

export const cadastroSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no maximo 100 caracteres"),
  email: z
    .string()
    .min(1, "Email e obrigatorio")
    .email("Email invalido"),
  senha: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(128, "Senha deve ter no maximo 128 caracteres"),
  consentTermos: z
    .literal(true, { message: "Voce deve aceitar os Termos de Uso" }),
  consentPrivacidade: z
    .literal(true, { message: "Voce deve aceitar a Politica de Privacidade" }),
  consentAnalytics: z.boolean().optional().default(false),
});

export const recuperarSenhaSchema = z.object({
  email: z
    .string()
    .min(1, "Email e obrigatorio")
    .email("Email invalido"),
});

export const resetSenhaSchema = z.object({
  token: z.string().min(1, "Token e obrigatorio"),
  novaSenha: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(128, "Senha deve ter no maximo 128 caracteres"),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type LoginInput = z.infer<typeof loginSchema>;
export type CadastroInput = z.infer<typeof cadastroSchema>;
export type RecuperarSenhaInput = z.infer<typeof recuperarSenhaSchema>;
export type ResetSenhaInput = z.infer<typeof resetSenhaSchema>;
