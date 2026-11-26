# Product Vision — Internship & Job Board

**Project:** Internship & Job Board (SET 312 Agile Software Engineering, Project 8)
**Product Owner:** Ahmed ElGendy

## Vision statement

**For** university students looking for internships, and the companies and Career Office
that serve them,
**who** today rely on scattered emails, social-media posts and spreadsheets to publish,
check and apply for internships,
**the** Internship & Job Board
**is a** web platform for publishing, approving and applying to internships
**that** lets recruiters post internships with requirements and a deadline, lets the
Career Office approve them before students see them, and lets students apply with a CV
link and follow their application status in one place.
**Unlike** general job boards and informal channels, which have no university check, no
enforced deadlines and no shared application status,
**our product** publishes only Career Office-approved opportunities, closes applications
automatically at the deadline, allows one application per student per posting, and
moves every application through a clear, rule-checked hiring workflow.

## Users

| User | Goal | Main actions |
|---|---|---|
| Student | Find suitable internships and know where each application stands | Browse approved internships, view details, apply with a CV link, track application status |
| Company recruiter | Reach qualified students and manage applicants | Create postings with requirements and a deadline, view applicants, update application status |
| Career Office reviewer | Make sure only legitimate, suitable opportunities reach students | Review pending postings, approve or reject them with a reason |

## MVP epics

| # | Epic | Stories |
|---|---|---|
| 1 | **Post an internship** with requirements and a deadline | IJB-5 (access), IJB-6, IJB-7 |
| 2 | **Career Office approval** of postings | IJB-11, IJB-15 |
| 3 | **Student applications** with a CV link | IJB-8, IJB-10, IJB-19, IJB-20, IJB-21 |
| 4 | **Application status tracking** | IJB-22, IJB-23, IJB-24, IJB-25 |

Post-MVP: IJB-9 Search & Filter Internships.

## Key rule

- **Applications close after the deadline.** The whole deadline day is included
  (closes at 23:59 local time).
- **A student can apply once per posting.**
- **Status can only move forward, except to `rejected`:**

```
applied → shortlisted → interview → offer
   │           │            │
   └───────────┴────────────┴──────→ rejected
```

`offer` and `rejected` are final. The rule is enforced in `src/domain/`, unit-tested
with Vitest and described in Gherkin scenarios.

## Success criteria

- A recruiter can publish a posting that becomes visible to students only after Career
  Office approval.
- A student can apply before the deadline and see status changes made by the recruiter.
- Every violation of the key rule is rejected with a clear message, and nothing is saved.
