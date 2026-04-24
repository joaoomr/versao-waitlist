import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const userTipoEnum = pgEnum("user_tipo", ["pessoa", "empresa"]);

export const consentTypeEnum = pgEnum("consent_type", [
  "termos",
  "privacidade",
  "analytics",
]);

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  tipo: userTipoEnum("tipo").default("pessoa"),
  avatarUrl: text("avatar_url"),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// Profiles
// ---------------------------------------------------------------------------

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  idade: text("idade"),
  bio: varchar("bio", { length: 500 }),
  redeSocial: text("rede_social"),
  site: text("site"),
  estado: varchar("estado", { length: 2 }),
  cidade: varchar("cidade", { length: 100 }),
  codigoIbge: text("codigo_ibge"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// User Consents (LGPD)
// ---------------------------------------------------------------------------

export const usersConsents = pgTable("users_consents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  consentType: consentTypeEnum("consent_type").notNull(),
  accepted: boolean("accepted").default(false),
  version: text("version").default("1.0"),
  createdAt: timestamp("created_at").defaultNow(),
});
