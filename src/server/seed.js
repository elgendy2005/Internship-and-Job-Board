// Seeds the database with INVENTED test data only.
// Never put real names, emails, companies or CV links in this file.
import { pathToFileURL } from 'node:url';
import bcrypt from 'bcryptjs';
import { openDb } from './db.js';

try {
  process.loadEnvFile();
} catch {
  // no .env file: use defaults
}

export const SEED_PASSWORD = 'Password123!';

function isoDateInDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function seed(db) {
  const passwordHash = bcrypt.hashSync(SEED_PASSWORD, 10);

  const insertUser = db.prepare(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
  );
  const insertPosting = db.prepare(`
    INSERT INTO postings (recruiter_id, title, company, description, requirements, deadline, status)
    VALUES (@recruiterId, @title, @company, @description, @requirements, @deadline, @status)
  `);

  const run = db.transaction(() => {
    db.exec('DELETE FROM applications; DELETE FROM postings; DELETE FROM users;');
    db.exec("DELETE FROM sqlite_sequence WHERE name IN ('applications', 'postings', 'users');");

    insertUser.run('Test Student', 'student@test.local', passwordHash, 'student');
    const recruiter = insertUser.run('Test Recruiter', 'recruiter@test.local', passwordHash, 'recruiter');
    insertUser.run('Test Career Office', 'career@test.local', passwordHash, 'career_office');

    insertPosting.run({
      recruiterId: recruiter.lastInsertRowid,
      title: 'Software Engineering Intern',
      company: 'Example Software Co.',
      description: 'Help build internal web tools with a small product team. (Test data.)',
      requirements: 'Third-year student; basic JavaScript; Git.',
      deadline: isoDateInDays(30),
      status: 'approved',
    });
    insertPosting.run({
      recruiterId: recruiter.lastInsertRowid,
      title: 'Data Analyst Intern',
      company: 'Sample Analytics Ltd.',
      description: 'Clean and visualise datasets for weekly reports. (Test data.)',
      requirements: 'Statistics course; spreadsheets or Python.',
      deadline: isoDateInDays(45),
      status: 'pending',
    });
  });

  run();
}

// Run only when executed directly (`npm run seed`), not when imported.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const db = openDb();
  seed(db);
  const counts = {
    users: db.prepare('SELECT COUNT(*) AS n FROM users').get().n,
    postings: db.prepare('SELECT COUNT(*) AS n FROM postings').get().n,
  };
  db.close();
  console.log(`Seeded ${counts.users} users and ${counts.postings} postings.`);
  console.log(`Test logins: student@test.local, recruiter@test.local, career@test.local / ${SEED_PASSWORD}`);
}
