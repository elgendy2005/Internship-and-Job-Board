import { openDb } from '../src/server/db.js';
import { createApp } from '../src/server/app.js';

/** A fresh in-memory database with the schema applied. */
export function createTestDb() {
  return openDb(':memory:');
}

/** An Express app wired to a fresh in-memory database. */
export function createTestApp(options) {
  const db = createTestDb();
  return { db, app: createApp(db, options) };
}
