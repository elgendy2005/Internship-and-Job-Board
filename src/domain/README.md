# src/domain

Pure business rules for the Internship & Job Board.

Code in this folder must **not** import Express, better-sqlite3 or anything from
`src/server/`. Functions here take plain values and return plain values (or throw),
so they can be unit-tested in isolation and reused by routes and Cucumber steps.

The key rules from the backlog will live here, each added by the story that owns it:

- applications close after the deadline (IJB-21)
- a student can apply once per posting (IJB-20)
- application status can only move forward, except to `rejected` (IJB-25)
