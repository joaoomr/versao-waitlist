import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums (aligned with types.ts)
// ---------------------------------------------------------------------------

export const tipoEnum = z.enum(["pessoa", "empresa"]);

export const objetivoEnum = z.enum(["oportunidades", "contratar", "conexoes"]);

export const escolaridadeNivelEnum = z.enum([
  "ensino_fundamental_incompleto",
  "ensino_fundamental_completo",
  "ensino_medio_incompleto",
  "ensino_medio_completo",
  "ensino_tecnico_incompleto",
  "ensino_tecnico_completo",
  "ensino_superior_incompleto",
  "ensino_superior_completo",
  "pos_graduacao_incompleta",
  "pos_graduacao_completa",
  "mestrado_incompleto",
  "mestrado_completo",
  "doutorado_incompleto",
  "doutorado_completo",
]);

// ---------------------------------------------------------------------------
// Onboarding Step Schemas
// ---------------------------------------------------------------------------

/** Step 1: Tipo PF/PJ (obrigatorio) */
export const stepTipoSchema = z.object({
  tipo: tipoEnum,
});

/** Step 2: Perfil Base */
export const stepPerfilBaseSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no maximo 100 caracteres")
    .optional(),
  idade: z
    .number()
    .int()
    .min(13, "Idade minima e 13 anos")
    .max(120, "Idade invalida")
    .nullable()
    .optional(),
  bio: z
    .string()
    .max(500, "Bio deve ter no maximo 500 caracteres")
    .optional(),
  redeSocial: z
    .string()
    .max(100, "Rede social deve ter no maximo 100 caracteres")
    .optional(),
  site: z
    .string()
    .max(200, "Site deve ter no maximo 200 caracteres")
    .optional(),
  estado: z.string().max(2).optional(),
  cidade: z.string().max(100).optional(),
  codigoIbge: z.number().int().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

/** Step 3 (PF): Experiencias */
export const experienciaProfissionalSchema = z.object({
  cargo: z.string().min(1, "Cargo e obrigatorio").max(100),
  empresa: z.string().min(1, "Empresa e obrigatoria").max(100),
  periodoInicio: z.string().min(1, "Inicio e obrigatorio").max(10),
  periodoFim: z.string().max(10).nullable().optional(),
});

export const escolaridadeSchema = z.object({
  nivel: escolaridadeNivelEnum,
  instituicao: z.string().max(100).nullable().optional(),
  curso: z.string().max(100).nullable().optional(),
});

export const stepExperienciasSchema = z.object({
  experiencias: z.array(experienciaProfissionalSchema).optional().default([]),
  escolaridade: z.array(escolaridadeSchema).optional().default([]),
});

/** Step 4: Areas + Objetivos */
export const stepAreasSchema = z.object({
  areas: z.array(z.string().max(100)).optional().default([]),
  atuacoes: z.array(z.string().max(100)).optional().default([]),
  objetivos: z.array(objetivoEnum).optional().default([]),
});

// ---------------------------------------------------------------------------
// Edit Profile (full update)
// ---------------------------------------------------------------------------

export const updateProfileSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no maximo 100 caracteres")
    .optional(),
  idade: z.number().int().min(13).max(120).nullable().optional(),
  bio: z.string().max(500, "Bio deve ter no maximo 500 caracteres").optional(),
  redeSocial: z.string().max(100).optional(),
  site: z.string().max(200).optional(),
  estado: z.string().max(2).optional(),
  cidade: z.string().max(100).optional(),
  codigoIbge: z.number().int().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  areas: z.array(z.string().max(100)).optional(),
  atuacoes: z.array(z.string().max(100)).optional(),
  objetivos: z.array(objetivoEnum).optional(),
  profissoes: z
    .array(z.string().min(1).max(100))
    .max(3, "Maximo 3 profissoes")
    .optional(),
  experiencias: z.array(experienciaProfissionalSchema).optional(),
  escolaridade: z.array(escolaridadeSchema).optional(),
});

// ---------------------------------------------------------------------------
// Profissao (standalone for add/remove)
// ---------------------------------------------------------------------------

export const addProfissaoSchema = z.object({
  profissao: z.string().min(1, "Profissao e obrigatoria").max(100),
  ordem: z.number().int().min(0).max(2),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type StepTipoInput = z.infer<typeof stepTipoSchema>;
export type StepPerfilBaseInput = z.infer<typeof stepPerfilBaseSchema>;
export type ExperienciaProfissionalInput = z.infer<typeof experienciaProfissionalSchema>;
export type EscolaridadeInput = z.infer<typeof escolaridadeSchema>;
export type StepExperienciasInput = z.infer<typeof stepExperienciasSchema>;
export type StepAreasInput = z.infer<typeof stepAreasSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
