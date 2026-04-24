import { z } from "zod";

// ---------------------------------------------------------------------------
// League CRUD
// ---------------------------------------------------------------------------

export const createLeagueSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no maximo 100 caracteres"),
  descricao: z
    .string()
    .max(500, "Descricao deve ter no maximo 500 caracteres")
    .optional(),
  visibilidade: z.enum(["publica", "privada"]),
  areas: z.array(z.string().max(100)).optional().default([]),
  atuacoes: z.array(z.string().max(100)).optional().default([]),
});

export const updateLeagueSchema = z.object({
  leagueId: z.string().uuid("Liga invalida"),
  nome: z.string().min(2).max(100).optional(),
  descricao: z.string().max(500).optional(),
  visibilidade: z.enum(["publica", "privada"]).optional(),
  areas: z.array(z.string().max(100)).optional(),
  atuacoes: z.array(z.string().max(100)).optional(),
});

// ---------------------------------------------------------------------------
// League Members
// ---------------------------------------------------------------------------

export const joinLeagueSchema = z.object({
  leagueId: z.string().uuid("Liga invalida"),
  inviteCode: z.string().optional(),
});

export const removeMemberSchema = z.object({
  leagueId: z.string().uuid("Liga invalida"),
  userId: z.string().uuid("Usuario invalido"),
});

export const createInviteSchema = z.object({
  leagueId: z.string().uuid("Liga invalida"),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type CreateLeagueInput = z.infer<typeof createLeagueSchema>;
export type UpdateLeagueInput = z.infer<typeof updateLeagueSchema>;
export type JoinLeagueInput = z.infer<typeof joinLeagueSchema>;
export type RemoveMemberInput = z.infer<typeof removeMemberSchema>;
export type CreateInviteInput = z.infer<typeof createInviteSchema>;
