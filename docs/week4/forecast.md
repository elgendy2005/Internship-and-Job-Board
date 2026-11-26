# Week 4 — Sprint Delivery Forecast

**Project:** Internship & Job Board  
**Course:** Agile Software Engineering (SET 312)  
**Methodology:** Scrum  
**Team Size:** 5 Members  
**Sprint Duration:** 1 Week

## 1. Forecast Overview

The project backlog contains 15 user stories with a total estimated effort of 60 Story Points (SP).

- **MVP Scope:** 14 User Stories — 55 SP
- **Optional Enhancement:** 1 User Story — 5 SP
- **Implementation Sprints:** 4 one-week sprints
- **MVP Target:** End of Sprint 3
- **Final Release:** End of Sprint 4

The forecast is based on the preliminary story point estimates in `estimation.md` and the project requirements. If the estimates change after the team's Planning Poker review, this forecast will be updated to match.

Since the team has not yet established its actual velocity, the following plan represents a proposed delivery forecast rather than a guaranteed commitment.

## 2. Sprint Delivery Plan

| Sprint | Sprint Goal | Jira Stories | Story Points |
|---|---|---|---:|
| Sprint 0 | Project setup, backlog refinement, and planning | — | — |
| Sprint 1 | Implement authentication, internship creation, and career office approval | IJB-5, IJB-6, IJB-7, IJB-11, IJB-15 | 21 |
| Sprint 2 | Implement student browsing and internship applications with business rules | IJB-8, IJB-10, IJB-19, IJB-20, IJB-21 | 16 |
| Sprint 3 | Complete application tracking and recruitment status management | IJB-22, IJB-23, IJB-24, IJB-25 | 18 |
| Sprint 4 | Add search and filtering, resolve feedback, and prepare the final release | IJB-9 | 5 |
| **Total** | | **15 Stories** | **60 SP** |

## 3. Sprint Objectives

### Sprint 0 — Project Setup

- Define the product vision and MVP scope.
- Create the shared GitHub repository and Jira project.
- Prepare and prioritize the product backlog.
- Estimate user stories using story points.
- Establish the team's Definition of Done.

### Sprint 1 — Initial Working Increment

**Planned Capacity: 21 SP**

- Implement user registration and role-based login.
- Allow recruiters to create internship postings.
- Define internship requirements and deadlines.
- Allow the career office to review pending postings.
- Implement posting approval and rejection.

**Expected Outcome:** An initial working flow from internship creation to career office approval, with a CI pipeline running tests and linting.

### Sprint 2 — Internship Applications

**Planned Capacity: 16 SP**

- Display approved internship opportunities.
- Allow students to view internship details.
- Implement internship applications using CV links.
- Prevent duplicate applications.
- Reject applications submitted after the deadline.

**Expected Outcome:** Students can discover approved internships and apply successfully, while the system enforces the required application rules.

The application must be deployed or runnable using Docker, with at least five passing Gherkin scenarios.

### Sprint 3 — Complete MVP

**Planned Capacity: 18 SP**

- Implement student application tracking.
- Allow recruiters to view applicants.
- Enable recruiters to update application statuses.
- Validate application status transitions.
- Collect feedback from at least three real users using test data.

**Expected Outcome:** All 14 MVP user stories are completed, and the full recruitment workflow is available for testing and feedback.

The Product Owner and Scrum Master roles are rotated as required.

### Sprint 4 — Improvement and Final Release

**Planned Capacity: 5 SP + Quality Improvements**

- Implement internship search and filtering (IJB-9).
- Address usability issues identified during feedback.
- Fix remaining defects.
- Perform regression testing.
- Complete the final retrospective.
- Prepare and tag release `v1.0`.

**Expected Outcome:** A tested and improved version of the Internship & Job Board, ready for the Week 12 demonstration.

## 4. Velocity and Capacity Forecast

The proposed MVP requires 55 Story Points across the first three implementation sprints.

**Required Average Velocity:**

55 SP / 3 Sprints = **18.33 SP per Sprint**

The forecast assumes the team can deliver approximately 19 Story Points per week on average.

| Scenario | Average Velocity | Estimated Sprints for MVP |
|---|---:|---:|
| Conservative | 15 SP | 4 |
| Target | 19 SP | 3 |
| Optimistic | 22 SP | 3 |

The target velocity has not yet been validated using completed sprint data.

### Contingency if velocity is lower than planned

In the conservative scenario (15 SP per sprint), the team would complete about 45 SP by the end of Sprint 3, leaving about 10 SP of MVP work. In that case:

- The key-rule stories (IJB-19, IJB-20, IJB-21, IJB-24, IJB-25) stay at the top of each sprint, because the key rule must be enforced in the demo.
- The lower-risk MVP stories most likely to move into Sprint 4 are IJB-22 (Track My Applications, 5 SP) and IJB-23 (Recruiter Views Applicants, 3 SP).
- IJB-9 (Search & Filter) would be dropped from Sprint 4 so the remaining MVP stories are finished before the Week 12 demo.

In the optimistic scenario (22 SP per sprint), the spare capacity in Sprint 3 would be used to start IJB-9 early or to begin a stretch story from the brief (for example, interview scheduling).

### Non-story work included in capacity

Some sprint deliverables are not user stories but still take team time, so the planned story points leave room for them:

- **Sprint 1:** GitHub Actions CI pipeline running tests and the linter on every pull request.
- **Sprint 2:** Docker setup or deployment to a free host, plus at least five passing Gherkin scenarios.
- **Sprint 3:** feedback sessions with at least three users and `feedback.md`.
- **Sprint 4:** regression testing, final retrospective and the `v1.0` release tag.

This is one reason Sprint 2 is planned at 16 SP, below the 19 SP target.

The team will review its actual velocity after each sprint and update the forecast if necessary.

## 5. Risks and Mitigation Strategies

| Risk | Mitigation Strategy |
|---|---|
| Sprint 1 workload exceeds team capacity | Reassess story estimates and available capacity during Sprint Planning |
| Lower than expected velocity | Reprioritize work and protect mandatory MVP functionality |
| Integration issues | Use GitHub pull requests and continuous integration |
| Complex application business rules | Apply unit testing and BDD scenarios |
| Unexpected technical blockers | Discuss blockers during Scrum stand-ups |
| Delayed user feedback | Schedule MVP testing with at least three users during Sprint 3 |

## 6. Forecast Monitoring

The team will monitor progress using:

- Jira Sprint Board
- Sprint Burndown Chart
- Completed Story Points
- Actual Team Velocity
- Sprint Review Results
- Sprint Retrospective Action Items

At the end of each sprint, the forecast will be updated based on completed work, remaining backlog items, and team capacity.

## 7. Conclusion

The team plans to deliver the 55 Story Point MVP by the end of Sprint 3 and complete the optional 5 Story Point enhancement during Sprint 4.

This forecast follows the four one-week implementation sprints specified in the project brief.

The plan is subject to revision based on actual team velocity and Sprint Review feedback, with mandatory MVP functionality taking priority over optional improvements.