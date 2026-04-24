import {
  pgTable,
  pgEnum,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const swipeActionEnum = pgEnum("swipe_action", [
  "passa",
  "seguir",
  "curtir",
]);

// ---------------------------------------------------------------------------
// Swipe Actions
// ---------------------------------------------------------------------------

export const swipeActions = pgTable("swipe_actions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  targetId: uuid("target_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  action: swipeActionEnum("action").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// Connections (mutual match)
// ---------------------------------------------------------------------------

export const connections = pgTable("connections", {
  id: uuid("id").primaryKey().defaultRandom(),
  userAId: uuid("user_a_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  userBId: uuid("user_b_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// Follows
// ---------------------------------------------------------------------------

export const follows = pgTable("follows", {
  id: uuid("id").primaryKey().defaultRandom(),
  followerId: uuid("follower_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  followingId: uuid("following_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
