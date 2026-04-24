import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as users from "./schema/users";
import * as profileSections from "./schema/profile-sections";
import * as connections from "./schema/connections";
import * as content from "./schema/content";
import * as leagues from "./schema/leagues";
import * as chat from "./schema/chat";
import * as notifications from "./schema/notifications";
import * as feedback from "./schema/feedback";
import * as relations from "./schema/relations";

const schema = {
  ...users,
  ...profileSections,
  ...connections,
  ...content,
  ...leagues,
  ...chat,
  ...notifications,
  ...feedback,
  ...relations,
};

type Schema = typeof schema;

let _db: NeonHttpDatabase<Schema> | null = null;

export function getDb(): NeonHttpDatabase<Schema> {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    const sql: NeonQueryFunction<false, false> = neon(url);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

// Lazy proxy — connection created on first use, not at import time
export const db = new Proxy({} as NeonHttpDatabase<Schema>, {
  get(_target, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type DB = NeonHttpDatabase<Schema>;
