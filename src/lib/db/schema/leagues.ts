import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const leagueVisibilityEnum = pgEnum("league_visibility", [
  "publica",
  "privada",
]);

export const leagueRoleEnum = pgEnum("league_role", ["fundador", "membro"]);

// ---------------------------------------------------------------------------
// Leagues
// ---------------------------------------------------------------------------

export const leagues = pgTable("leagues", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  descricao: text("descricao"),
  fotoUrl: text("foto_url"),
  visibilidade: leagueVisibilityEnum("visibilidade").notNull(),
  founderId: uuid("founder_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// League Members
// ---------------------------------------------------------------------------

export const leagueMembers = pgTable("league_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  leagueId: uuid("league_id")
    .references(() => leagues.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  role: leagueRoleEnum("role").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// League Invites
// ---------------------------------------------------------------------------

export const leagueInvites = pgTable("league_invites", {
  id: uuid("id").primaryKey().defaultRandom(),
  leagueId: uuid("league_id")
    .references(() => leagues.id, { onDelete: "cascade" })
    .notNull(),
  code: text("code").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// League Areas
// ---------------------------------------------------------------------------

export const leagueAreas = pgTable("league_areas", {
  id: uuid("id").primaryKey().defaultRandom(),
  leagueId: uuid("league_id")
    .references(() => leagues.id, { onDelete: "cascade" })
    .notNull(),
  area: text("area").notNull(),
});

// ---------------------------------------------------------------------------
// League Atuacao
// ---------------------------------------------------------------------------

export const leagueAtuacao = pgTable("league_atuacao", {
  id: uuid("id").primaryKey().defaultRandom(),
  leagueId: uuid("league_id")
    .references(() => leagues.id, { onDelete: "cascade" })
    .notNull(),
  atuacao: text("atuacao").notNull(),
});
