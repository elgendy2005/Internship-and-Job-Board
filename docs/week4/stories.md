# Internship & Job Board — Week 4 User Stories

**Project:** Internship & Job Board (Project 8)
**Users:** Student · Company recruiter · Career Office reviewer

The MVP covers the four epics from the project brief: posting an internship with requirements and a deadline, Career Office approval, student applications with a CV link, and application status tracking. The 15 Jira keys and titles match the backlog. The sections below follow the five activities of the [Miro story map](https://miro.com/app/board/uXjVENhzv3U=/).

**Key rule:** applications close after the deadline; a student can apply once per posting; status can only move forward, except to `rejected`.

**Application status workflow:**

```
applied → shortlisted → interview → offer
   │           │            │
   └───────────┴────────────┴──────→ rejected
```

`offer` and `rejected` are final statuses.

---

## 01 Access Platform

### [IJB-5](https://modagemy.atlassian.net/browse/IJB-5) — User Registration & Login · 5 SP · MVP

As a platform user, I want to register and sign in, so I can access the features for my role.

**Acceptance criteria**
- Given a new email and a valid password, when I register with a role (student, recruiter or Career Office), then my account is created with that role.
- Given an email that is already registered, when I try to register again, then registration is rejected with a clear message.
- Given valid credentials, when I sign in, then I see the pages for my role only.
- Given invalid credentials, when I sign in, then access is denied with an error message.

## 02 Publish Internship

### [IJB-6](https://modagemy.atlassian.net/browse/IJB-6) — Create Internship Posting · 5 SP · MVP

As a recruiter, I want to submit an internship posting, so the Career Office can review it.

**Acceptance criteria**
- Given I am signed in as a recruiter, when I submit a posting with a title, company and description, then it is saved with status `pending`.
- Given a posting with missing required fields, when I submit it, then it is rejected and the missing fields are shown.
- Given a posting is `pending`, then it is not visible to students.

### [IJB-7](https://modagemy.atlassian.net/browse/IJB-7) — Set Internship Requirements & Deadline · 3 SP · MVP

As a recruiter, I want to set eligibility requirements and an application deadline, so students know whether and when to apply.

**Acceptance criteria**
- Given I am creating a posting, when I enter requirements and a deadline date in the future, then both are saved with the posting.
- Given a deadline today or in the past, when I submit, then the posting is rejected with a message.
- Given the posting is approved, then the requirements and deadline appear in its published details.

## 03 Review & Approve

### [IJB-11](https://modagemy.atlassian.net/browse/IJB-11) — Review Pending Internship Postings · 3 SP · MVP

As a Career Office reviewer, I want to see pending postings and their details, so I can evaluate submissions.

**Acceptance criteria**
- Given there are pending postings, when I open the review queue, then I see all `pending` postings, oldest first.
- When I open a posting from the queue, then I see its full details, requirements and deadline.
- Given I am not a Career Office reviewer, then the review queue is not accessible.

### [IJB-15](https://modagemy.atlassian.net/browse/IJB-15) — Approve or Reject Internship Postings · 5 SP · MVP

As a Career Office reviewer, I want to approve or reject a pending posting, so only approved opportunities are published.

**Acceptance criteria**
- When I approve a pending posting, then its status becomes `approved` and it becomes visible to students.
- When I reject a pending posting with a reason, then its status becomes `rejected`, it stays hidden from students, and the recruiter can see the reason.
- Given a posting is already approved or rejected, then it no longer appears in the review queue.

## 04 Discover & Apply

### [IJB-8](https://modagemy.atlassian.net/browse/IJB-8) — View Approved Internships · 3 SP · MVP

As a student, I want to browse approved internships, so I can find opportunities to consider.

**Acceptance criteria**
- Given postings with different statuses, when I open the internship list, then only `approved` postings are shown.
- Pending and rejected postings are never shown.
- Postings whose deadline has passed are shown as "Closed".

### [IJB-10](https://modagemy.atlassian.net/browse/IJB-10) — View Internship Details · 2 SP · MVP

As a student, I want to open a posting's details, so I can decide whether to apply.

**Acceptance criteria**
- When I open an approved posting, then I see its company, description, requirements and deadline.
- Given a posting that is not approved, when I open its link directly, then I see a "not found" message.

### [IJB-19](https://modagemy.atlassian.net/browse/IJB-19) — Apply for Internship Using CV Link · 5 SP · MVP

As a student, I want to apply with a CV link, so the recruiter can review my application.

**Acceptance criteria**
- Given an open approved posting, when I submit a valid CV URL, then an application is created with status `applied` and records the student, posting and CV link.
- Given a missing or invalid URL, when I submit, then the application is rejected with a message and nothing is saved.

### [IJB-20](https://modagemy.atlassian.net/browse/IJB-20) — Prevent Duplicate Applications · 3 SP · MVP

As a student, I want a clear message if I already applied, so I do not submit the same application twice.

**Acceptance criteria**
- Given I already applied to a posting, when I apply to the same posting again, then the submission is rejected with "You have already applied to this internship".
- Exactly one application record exists for that student and posting.
- Applying to a different posting is still allowed.

### [IJB-21](https://modagemy.atlassian.net/browse/IJB-21) — Enforce Internship Application Deadline · 3 SP · MVP

As a recruiter, I want applications to close at the deadline, so late applications are excluded.

**Acceptance criteria**
- The deadline includes the whole deadline day (closes at 23:59 local time).
- Given the deadline has not passed, when a student submits a valid application, then it is accepted.
- Given the deadline has passed, when a student tries to apply, then the submission is rejected with "Applications for this internship are closed" and no application is created.

## 05 Manage Applications

### [IJB-22](https://modagemy.atlassian.net/browse/IJB-22) — Track My Applications · 5 SP · MVP

As a student, I want to see all my applications and their statuses in one place, so I know which companies to follow up with.

**Acceptance criteria**
- When I open "My Applications", then I see every application I submitted with the posting title, company and current status.
- I never see other students' applications.
- When a recruiter changes a status, then the new status appears on my list.

### [IJB-23](https://modagemy.atlassian.net/browse/IJB-23) — Recruiter Views Applicants · 3 SP · MVP

As a recruiter, I want to view applicants to my internship postings, so I can review their submissions.

**Acceptance criteria**
- When I open one of my postings, then I see its applicants with their CV links and current statuses.
- Given a posting created by another recruiter, then its applicant list is not accessible to me.

### [IJB-24](https://modagemy.atlassian.net/browse/IJB-24) — Update Application Status · 5 SP · MVP

As a recruiter, I want to shortlist, interview, offer or reject an applicant, so I can invite the best ones and the student sees the latest decision.

**Acceptance criteria**
- Given an application to my posting, when I choose a new allowed status and save, then the status is updated.
- The updated status appears in the student's application tracking (IJB-22).
- Given an application to another recruiter's posting, then I cannot change its status.

### [IJB-25](https://modagemy.atlassian.net/browse/IJB-25) — Validate Application Status Transitions · 5 SP · MVP

As a recruiter, I want invalid status changes to be blocked, so every application follows the hiring workflow.

**Acceptance criteria**
- Allowed forward moves: `applied → shortlisted`, `shortlisted → interview`, `interview → offer`.
- Any non-final status (`applied`, `shortlisted`, `interview`) can move to `rejected`.
- `offer` and `rejected` are final and cannot change.
- Given a disallowed change (e.g. `interview → applied`, `applied → offer`, `rejected → shortlisted`), when I save it, then it is rejected with a message and the previous status is kept.

*Note: IJB-25 is kept separate from IJB-24 so the key rule can be estimated, unit-tested (TDD) and described in Gherkin scenarios on its own.*

---

## Post-MVP (below the MVP line)

### [IJB-9](https://modagemy.atlassian.net/browse/IJB-9) — Search & Filter Internships · 5 SP · Post-MVP

As a student, I want to search and filter approved internships, so I can narrow my results.

**Acceptance criteria**
- When I search by keyword or filter by company or deadline, then only matching approved postings are shown.
- When no postings match, then a clear "No internships found" message is shown.
