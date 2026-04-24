import { z } from "zod";

// ---------------------------------------------------------------------------
// Search & Filters
// ---------------------------------------------------------------------------

export const searchSchema = z.object({
  q: z.string().max(200, "Busca muito longa").optional().default(""),
  tipo: z.enum(["pessoa", "empresa"]).optional(),
  estado: z.string().max(2).optional(),
  cidade: z.string().max(100).optional(),
  area: z.string().max(100).optional(),
  atuacao: z.string().max(100).optional(),
  objetivo: z.enum(["oportunidades", "contratar", "conexoes"]).optional(),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(50).optional().default(20),
});

// ---------------------------------------------------------------------------
// Explore Filters
// ---------------------------------------------------------------------------

export const exploreFiltersSchema = z.object({
  tipo: z.enum(["pessoa", "empresa"]).optional(),
  estado: z.string().max(2).optional(),
  cidade: z.string().max(100).optional(),
  areaAtuacao: z.string().max(100).optional(),
  objetivo: z.enum(["oportunidades", "contratar", "conexoes"]).optional(),
  profissao: z.string().max(100).optional(),
  idadeMin: z.number().int().min(13).optional(),
  idadeMax: z.number().int().max(120).optional(),
  escolaridadeNivel: z.string().max(50).optional(),
});

// ---------------------------------------------------------------------------
// Connection Filters
// ---------------------------------------------------------------------------

export const connectionFiltersSchema = z.object({
  q: z.string().max(200).optional().default(""),
  tipo: z.enum(["pessoa", "empresa"]).optional(),
  estado: z.string().max(2).optional(),
  area: z.string().max(100).optional(),
  atuacao: z.string().max(100).optional(),
  objetivo: z.enum(["oportunidades", "contratar", "conexoes"]).optional(),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(50).optional().default(20),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type SearchInput = z.infer<typeof searchSchema>;
export type ExploreFiltersInput = z.infer<typeof exploreFiltersSchema>;
export type ConnectionFiltersInput = z.infer<typeof connectionFiltersSchema>;
