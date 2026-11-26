import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

export const DEFAULT_DB_PATH = './data/app.db';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  email         TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT    NOT NULL,
  role          TEXT    NOT NULL CHECK (role IN ('student', 'recruiter', 'career_office'))
);

CREATE TABLE IF NOT EXISTS postings (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  recruiter_id     INTEGER NOT NULL REFERENCES users(id),
  title            TEXT    NOT NULL,
  company          TEXT    NOT NULL,
  description      TEXT    NOT NULL,
  requirements     TEXT,
  deadline         TEXT    CHECK (deadline IS NULL OR deadline GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
  status           TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_postings_status ON postings(status);
CREATE INDEX IF NOT EXISTS idx_postings_recruiter ON postings(recruiter_id);

CREATE TABLE IF NOT EXISTS applications (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  posting_id INTEGER NOT NULL REFERENCES postings(id),
  student_id INTEGER NOT NULL REFERENCES users(id),
  cv_link    TEXT    NOT NULL,
  status     TEXT    NOT NULL DEFAULT 'applied'
             CHECK (status IN ('applied', 'shortlisted', 'interview', 'offer', 'rejected')),
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE (posting_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_applications_student ON applications(student_id);
`;

/**
 * Open (and create if needed) the SQLite database and apply the schema.
 *
 * @param {string} [dbPath]  file path or ':memory:'. Defaults to env DB_PATH, then ./data/app.db
 * @returns {import('better-sqlite3').Database}
 */
export function openDb(dbPath = process.env.DB_PATH || DEFAULT_DB_PATH) {
  const inMemory = dbPath === ':memory:';
  if (!inMemory) {
    fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');
  if (!inMemory) {
    db.pragma('journal_mode = WAL');
  }
  db.exec(SCHEMA);
  return db;
}
