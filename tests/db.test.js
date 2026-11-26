import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { SEED_PASSWORD, seed } from '../src/server/seed.js';
import { createTestDb } from './helpers.js';

function insertUser(db, email, role) {
  return db
    .prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)')
    .run('Test User', email, 'not-a-real-hash', role).lastInsertRowid;
}

describe('database schema', () => {
  let db;
  let studentId;
  let postingId;

  beforeEach(() => {
    db = createTestDb();
    studentId = insertUser(db, 'student@test.local', 'student');
    const recruiterId = insertUser(db, 'recruiter@test.local', 'recruiter');
    postingId = db
      .prepare(
        `INSERT INTO postings (recruiter_id, title, company, description, deadline)
         VALUES (?, 'Test Intern', 'Example Co.', 'Test posting', '2099-12-31')`,
      )
      .run(recruiterId).lastInsertRowid;
  });

  it('rejects a duplicate application for the same student and posting', () => {
    const apply = db.prepare(
      'INSERT INTO applications (posting_id, student_id, cv_link) VALUES (?, ?, ?)',
    );

    apply.run(postingId, studentId, 'https://example.com/cv-1.pdf');

    expect(() => apply.run(postingId, studentId, 'https://example.com/cv-2.pdf')).toThrow(
      /UNIQUE constraint failed: applications.posting_id, applications.student_id/,
    );
    const { n } = db
      .prepare('SELECT COUNT(*) AS n FROM applications WHERE posting_id = ? AND student_id = ?')
      .get(postingId, studentId);
    expect(n).toBe(1);
  });

  it('gives new postings status "pending" and new applications status "applied"', () => {
    const posting = db.prepare('SELECT status FROM postings WHERE id = ?').get(postingId);
    expect(posting.status).toBe('pending');

    const appId = db
      .prepare('INSERT INTO applications (posting_id, student_id, cv_link) VALUES (?, ?, ?)')
      .run(postingId, studentId, 'https://example.com/cv.pdf').lastInsertRowid;
    const application = db.prepare('SELECT status FROM applications WHERE id = ?').get(appId);
    expect(application.status).toBe('applied');
  });

  it('rejects an unknown role', () => {
    expect(() => insertUser(db, 'admin@test.local', 'admin')).toThrow(/CHECK constraint failed/);
  });

  it('rejects a duplicate email regardless of case', () => {
    expect(() => insertUser(db, 'STUDENT@test.local', 'student')).toThrow(/UNIQUE constraint failed: users.email/);
  });

  it('enforces foreign keys', () => {
    expect(() =>
      db
        .prepare('INSERT INTO applications (posting_id, student_id, cv_link) VALUES (?, ?, ?)')
        .run(9999, studentId, 'https://example.com/cv.pdf'),
    ).toThrow(/FOREIGN KEY constraint failed/);
  });
});

describe('seed', () => {
  it('creates the three test users and one approved + one pending posting', () => {
    const db = createTestDb();

    seed(db);
    seed(db); // running it twice must not duplicate data

    const users = db.prepare('SELECT email, role, password_hash FROM users ORDER BY id').all();
    expect(users.map((u) => [u.email, u.role])).toEqual([
      ['student@test.local', 'student'],
      ['recruiter@test.local', 'recruiter'],
      ['career@test.local', 'career_office'],
    ]);
    expect(bcrypt.compareSync(SEED_PASSWORD, users[0].password_hash)).toBe(true);

    const statuses = db.prepare('SELECT status FROM postings ORDER BY id').all().map((p) => p.status);
    expect(statuses).toEqual(['approved', 'pending']);
  });
});
