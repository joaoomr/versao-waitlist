import { z } from "zod";

// ---------------------------------------------------------------------------
// Chat Messages
// ---------------------------------------------------------------------------

export const sendMessageSchema = z.object({
  conversationId: z.string().uuid("Conversa invalida"),
  content: z
    .string()
    .min(1, "Mensagem e obrigatoria")
    .max(2000, "Mensagem deve ter no maximo 2000 caracteres"),
  mediaUrl: z.string().url().optional(),
});

// ---------------------------------------------------------------------------
// Swipe Action (Explorar)
// ---------------------------------------------------------------------------

export const recordSwipeSchema = z.object({
  targetId: z.string().uuid("Usuario invalido"),
  action: z.enum(["passa", "seguir", "curtir"]),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type RecordSwipeInput = z.infer<typeof recordSwipeSchema>;
