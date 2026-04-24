import { z } from "zod";

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

export const submitFeedbackSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Nota minima e 1")
    .max(5, "Nota maxima e 5"),
  content: z
    .string()
    .max(2000, "Feedback deve ter no maximo 2000 caracteres")
    .optional()
    .default(""),
});

// ---------------------------------------------------------------------------
// Account Deletion (soft delete)
// ---------------------------------------------------------------------------

export const deleteAccountSchema = z.object({
  confirmacao: z
    .literal("EXCLUIR", { message: "Digite EXCLUIR para confirmar" }),
});

// ---------------------------------------------------------------------------
// LGPD Consent
// ---------------------------------------------------------------------------

export const updateConsentSchema = z.object({
  consentType: z.enum(["termos", "privacidade", "analytics"]),
  accepted: z.boolean(),
  version: z.string().min(1, "Versao e obrigatoria").max(20),
});

// ---------------------------------------------------------------------------
// Notification Preferences
// ---------------------------------------------------------------------------

export const toggleNotificationsSchema = z.object({
  enabled: z.boolean(),
});

// ---------------------------------------------------------------------------
// Contact Form (institutional)
// ---------------------------------------------------------------------------

export const contactFormSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100),
  email: z
    .string()
    .email("Email invalido"),
  assunto: z.enum(["duvida", "suporte", "parceria", "feedback", "outro"]),
  mensagem: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem deve ter no maximo 2000 caracteres"),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type SubmitFeedbackInput = z.infer<typeof submitFeedbackSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
export type UpdateConsentInput = z.infer<typeof updateConsentSchema>;
export type ToggleNotificationsInput = z.infer<typeof toggleNotificationsSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
