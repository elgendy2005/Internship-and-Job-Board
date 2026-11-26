# Internship & Job Board

University team project for **SET 312 Agile Software Engineering** (Project 8).

A web platform where **recruiters** post internships with requirements and a deadline,
the **Career Office** reviews and approves them, and **students** browse approved
internships, apply with a CV link and track the status of their applications.

**Key rule:** applications close after the deadline; a student can apply once per posting;
application status can only move forward (`applied → shortlisted → interview → offer`),
except to `rejected`. `offer` and `rejected` are final.

- Product backlog and acceptance criteria: [docs/week4/stories.md](docs/week4/stories.md)
- Product vision: [docs/project/vision.md](docs/project/vision.md)
- Definition of Done: [docs/project/definition-of-done.md](docs/project/definition-of-done.md)
- Jira: <https://modagemy.atlassian.net/browse/IJB>

> **Status: Sprint 0 (walking skeleton).** The app runs end to end (React → Express →
> SQLite) with a health check and placeholder pages. User stories IJB-5 … IJB-25 are
> implemented by the team in Sprints 1–4.

## Team

| Name | Scrum role |
|---|---|
| Ahmed ElGendy | Product Owner |
| Ahmed Elbarazany | Scrum Master |
| Abdelaziz Amir | Developer |
| Mohamed Alaa | Developer |
| Mohamed Amr | Developer |

## Tech stack

| Part | Technology |
|---|---|
| Runtime | Node.js 22 LTS, npm, ES modules |
| Backend | Express 5, SQLite via better-sqlite3 |
| Frontend | React, Vite, React Router |
| Unit/API tests | Vitest, Supertest, coverage via @vitest/coverage-v8 |
| BDD | Cucumber (`@cucumber/cucumber`) with Gherkin `.feature` files |
| Lint | ESLint 9 flat config with React plugins |
| CI / CD | GitHub Actions, Docker |

## Prerequisites

- [Node.js 22 LTS](https://nodejs.org/) (includes npm). Check with `node -v`.
- [Git](https://git-scm.com/)
- Optional: [Docker](https://www.docker.com/) to run the production image

## Getting started (clean machine)

**macOS / Linux (bash/zsh)**

```bash
git clone https://github.com/elgendy2005/Internship-and-Job-Board.git
cd Internship-and-Job-Board
npm ci
cp .env.example .env        # optional: change PORT or DB_PATH
npm run seed                # create ./data/app.db with test users and postings
npm run dev                 # API on :3000, web app on http://localhost:5173
```

**Windows (PowerShell)**

```powershell
git clone https://github.com/elgendy2005/Internship-and-Job-Board.git
cd Internship-and-Job-Board
npm ci
Copy-Item .env.example .env # optional: change PORT or DB_PATH
npm run seed                # create .\data\app.db with test users and postings
npm run dev                 # API on :3000, web app on http://localhost:5173
```

Open <http://localhost:5173>. The Home page should show **API: ok**.

### Test accounts (created by `npm run seed`)

| Role | Email | Password |
|---|---|---|
| Student | `student@test.local` | `Password123!` |
| Recruiter | `recruiter@test.local` | `Password123!` |
| Career Office | `career@test.local` | `Password123!` |

The seed also creates two postings: one `approved`, one `pending`.
Running `npm run seed` again **wipes and recreates** all data in the database.

## npm scripts

| Command | What it does |
|---|---|
| `npm run dev` | Express API (auto-restart) + Vite dev server together |
| `npm run build` | Build the React client into `dist/` |
| `npm start` | Run in production mode: API + built client on `PORT` (default 3000) |
| `npm run seed` | Reset the database and insert test data |
| `npm test` | Run Vitest unit/API tests once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Tests with a coverage report in `coverage/` |
| `npm run bdd` | Run Cucumber scenarios in `features/` |
| `npm run lint` | ESLint, fails on any warning |
| `npm run lint:fix` | ESLint with auto-fix |

Production build locally (same commands on all platforms):

```bash
npm run build
npm start          # http://localhost:3000
```

### Environment variables

See [.env.example](.env.example). `.env` is loaded automatically and is never committed.

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `3000` | Port of the Express server |
| `DB_PATH` | `./data/app.db` | SQLite file; tests use `:memory:` |

## Docker

```bash
docker build -t internship-job-board .
docker run --rm -p 3000:3000 -v ijb-data:/app/data internship-job-board
# seed the database inside the volume (optional)
docker run --rm -v ijb-data:/app/data internship-job-board npm run seed
```

Open <http://localhost:3000>. To use another port: `-e PORT=8080 -p 8080:8080`.

## Folder layout

```
README.md
src/
  domain/         pure business rules (no Express/DB imports); key rules live here
  server/
    app.js        createApp(db): Express app, used by index.js, tests and Cucumber
    index.js      starts the server
    db.js         SQLite connection + schema
    seed.js       test data (npm run seed)
    errors.js     HttpError(status, message) for clean JSON errors
    routes/       one router per area (health.js, ...)
  client/         Vite React app (index.html, main.jsx, App.jsx, pages/)
tests/            Vitest tests (*.test.js)
features/         Gherkin *.feature files
  step_definitions/
  support/        Cucumber World: fresh in-memory DB + app per scenario
.github/          CI workflow and pull request template
docs/project/     vision, Definition of Done, sprint review/retro templates, feedback
docs/week4/       backlog, estimation and forecast
Dockerfile
```

**API conventions:** routes live under `/api`. Errors are always JSON:
`{ "error": "message" }` with a matching HTTP status. Throw
`new HttpError(400, 'Clear message')` from a route and the error handler formats it.

## Team workflow

1. **One branch per Jira story**, named `IJB-xx-short-name`
   (e.g. `IJB-19-apply-with-cv-link`). Branch from an up-to-date `main`.
2. Commit small, logical steps with clear messages
   (e.g. `feat(applications): reject duplicate application (IJB-20)`).
   Everyone commits their own work, because commit history is graded.
3. Open a pull request whose **title starts with the Jira key**,
   e.g. `IJB-19 Apply for internship using CV link`, and fill in the PR template.
4. **Merge only when CI is green and at least 1 teammate has approved.**
   Never push directly to `main`.
5. A story is done only when it meets the
   [Definition of Done](docs/project/definition-of-done.md).

Before pushing, run locally:

```bash
npm run lint && npm test && npm run bdd
```

## Test data only

This repository and every database it creates must contain **invented test data only**:
no real names, email addresses, phone numbers, companies or CV links. Use addresses like
`name@test.local` and companies like `Example Software Co.`. Never commit `.env` files
or database files (`data/*.db` is git-ignored).

## Troubleshooting

- **All Vitest tests fail with `Cannot read properties of undefined (reading 'config')`
  on Windows:** your terminal's current directory starts with a lowercase drive letter
  (`c:\Users\...`, which some VS Code terminals use). Vite then loads Vitest twice. Run
  `cd C:\Users\...\Internship-and-Job-Board` with a capital `C:` (or open a new terminal)
  and run the tests again.
- **`npm ci` fails building better-sqlite3:** make sure you use Node 22 LTS (`node -v`).
- **Port already in use:** set another `PORT` in `.env`.
