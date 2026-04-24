import {
  pgTable,
  pgEnum,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const notificationTypeEnum = pgEnum("notification_type", [
  "follow",
  "like",
  "comment",
  "connection",
  "league_invite",
]);

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: notificationTypeEnum("type").notNull(),
  actorId: uuid("actor_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  referenceId: text("reference_id"),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
