import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const objetivoEnum = pgEnum("objetivo", [
  "oportunidades",
  "contratar",
  "conexoes",
]);

export const escolaridadeNivelEnum = pgEnum("escolaridade_nivel", [
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
// User Areas
// ---------------------------------------------------------------------------

export const userAreas = pgTable("user_areas", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  area: text("area").notNull(),
});

// ---------------------------------------------------------------------------
// User Atuacao
// ---------------------------------------------------------------------------

export const userAtuacao = pgTable("user_atuacao", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  atuacao: text("atuacao").notNull(),
});

// ---------------------------------------------------------------------------
// User Objetivos
// ---------------------------------------------------------------------------

export const userObjetivos = pgTable("user_objetivos", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  objetivo: objetivoEnum("objetivo").notNull(),
});

// ---------------------------------------------------------------------------
// User Profissoes
// ---------------------------------------------------------------------------

export const userProfissoes = pgTable("user_profissoes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  profissao: text("profissao").notNull(),
  ordem: integer("ordem").notNull(),
});

// ---------------------------------------------------------------------------
// User Experiencias
// ---------------------------------------------------------------------------

export const userExperiencias = pgTable("user_experiencias", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  cargo: text("cargo").notNull(),
  empresa: text("empresa").notNull(),
  periodoInicio: text("periodo_inicio").notNull(),
  periodoFim: text("periodo_fim"),
});

// ---------------------------------------------------------------------------
// User Escolaridade
// ---------------------------------------------------------------------------

export const userEscolaridade = pgTable("user_escolaridade", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  nivel: escolaridadeNivelEnum("nivel").notNull(),
  instituicao: text("instituicao"),
  curso: text("curso"),
});
