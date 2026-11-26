
# Week 4 — Story Point Estimation

**Project:** Internship & Job Board (Project 8)  
**Course:** Agile Software Engineering (SET 312)  
**Estimation Method:** Preliminary Relative Estimation using the Fibonacci Scale  
**Date:** 13 November 2026  
**Team Size:** 5 Members  
**Estimation Status:** Preliminary — Pending Team Review

---

## 1. Team Members

| Name | Scrum Role |
|---|---|
| Ahmed ElGendy | Product Owner |
| Ahmed Elbarazany | Scrum Master |
| Abdelaziz Amir | Developer |
| Mohamed Alaa | Developer |
| Mohamed Amr | Developer |

The Product Owner is responsible for defining and prioritizing user stories and clarifying acceptance criteria. The Scrum Master facilitates Scrum activities, while all team members contribute to development and testing.

---

## 2. Estimation Approach

The product backlog contains 15 user stories covering the essential functionality of the Internship & Job Board platform.

Preliminary story point estimates were prepared using relative estimation and the Fibonacci sequence:

**1, 2, 3, 5, 8, 13**

Story points represent the relative size and complexity of a user story rather than the exact number of hours required to implement it.

The preliminary estimates consider the following factors:

1. **Technical Complexity:** The difficulty of implementing the required functionality.
2. **Implementation Effort:** The relative amount of development work involved.
3. **Uncertainty:** Unknown technical challenges or requirements.
4. **Dependencies:** Relationships between stories and other system components.
5. **Testing Requirements:** The complexity of validating the functionality and business rules.

### Estimation Reference

**IJB-10 — View Internship Details: 2 Story Points**

This story was selected as a reference because it primarily involves displaying internship information through a read-only interface with relatively limited business logic.

More complex stories were estimated relative to this reference.

### Estimation Status

A formal Planning Poker session has not yet been conducted.

The estimates documented below are preliminary values prepared for initial backlog planning. They will be reviewed and refined with the development team during backlog refinement or Sprint Planning.

---

## 3. Product Backlog Estimation Results

| Jira Issue | User Story | Release | Preliminary Estimate (SP) |
|---|---|---|---:|
| IJB-5 | User Registration & Login | MVP | 5 |
| IJB-6 | Create Internship Posting | MVP | 5 |
| IJB-7 | Set Internship Requirements & Deadline | MVP | 3 |
| IJB-11 | Review Pending Internship Postings | MVP | 3 |
| IJB-15 | Approve or Reject Internship Postings | MVP | 5 |
| IJB-8 | View Approved Internships | MVP | 3 |
| IJB-10 | View Internship Details | MVP | 2 |
| IJB-19 | Apply for Internship Using CV Link | MVP | 5 |
| IJB-20 | Prevent Duplicate Applications | MVP | 3 |
| IJB-21 | Enforce Internship Application Deadline | MVP | 3 |
| IJB-22 | Track My Applications | MVP | 5 |
| IJB-23 | Recruiter Views Applicants | MVP | 3 |
| IJB-24 | Update Application Status | MVP | 5 |
| IJB-25 | Validate Application Status Transitions | MVP | 5 |
| IJB-9 | Search & Filter Internships | Post-MVP | 5 |
| | **MVP Subtotal (14 Stories)** | | **55** |
| | **Post-MVP Subtotal (1 Story)** | | **5** |
| | **Total Product Backlog (15 Stories)** | | **60** |

---

## 4. Estimation Summary

| Category | User Stories | Story Points |
|---|---:|---:|
| MVP Features | 14 | 55 |
| Post-MVP Enhancement | 1 | 5 |
| **Total** | **15** | **60** |

The MVP represents the minimum functionality required to support the internship recruitment process.

The post-MVP enhancement, **IJB-9 — Search & Filter Internships**, can be implemented after the essential recruitment workflow is completed.

The estimated MVP workload is 55 Story Points, representing approximately 91.7% of the total estimated backlog.

---

## 5. Technical Considerations for Key Business Rules

The project includes three critical business rules that require additional validation and testing.

### IJB-20 — Prevent Duplicate Applications

**Preliminary Estimate: 3 SP**

This story ensures that a student cannot submit more than one application for the same internship posting.

Technical considerations:

- Validate existing applications before accepting a new submission.
- Enforce uniqueness at the database level.
- Handle duplicate submission attempts.
- Display appropriate validation messages.
- Write unit tests for duplicate application scenarios.

### IJB-21 — Enforce Internship Application Deadline

**Preliminary Estimate: 3 SP**

This story prevents applications from being submitted after the internship deadline.

Technical considerations:

- Validate application deadlines on the server.
- Compare submission timestamps with the configured deadline.
- Handle time zones and deadline boundary conditions.
- Reject expired applications.
- Write unit tests for valid and expired submission scenarios.

### IJB-25 — Validate Application Status Transitions

**Preliminary Estimate: 5 SP**

This story enforces valid application status transitions throughout the recruitment process.

The normal application workflow is:

**Applied → Shortlisted → Interview → Offer**

An application may also transition to **Rejected** from an eligible non-terminal state.

Technical considerations:

- Implement permitted status transitions.
- Prevent backward transitions.
- Prevent skipping required stages.
- Reject changes from terminal states.
- Validate transitions on the server.
- Create unit tests for valid and invalid transitions.
- Describe the application state machine using Gherkin scenarios.

IJB-25 was separated from IJB-24 so that status transition validation can be developed and tested independently from the application status update interface.

---

## 6. Sprint Forecast Alignment

The estimated product backlog is aligned with the proposed delivery plan documented in `forecast.md`.

| Sprint | Planned Story Points | Objective |
|---|---:|---|
| Sprint 0 | — | Project setup and backlog preparation |
| Sprint 1 | 21 | Authentication, internship posting, and approval |
| Sprint 2 | 16 | Internship discovery and application submission |
| Sprint 3 | 18 | Application tracking and status management |
| Sprint 4 | 5 | Search, filtering, and product improvements |
| **Total** | **60** | |

The required MVP functionality is planned for completion by the end of Sprint 3.

Sprint 4 focuses on optional functionality, improvements based on user feedback, testing, and release preparation.

These sprint allocations are planning assumptions and will be adjusted according to team capacity and actual progress.

---

## 7. Estimation Review and Refinement

The preliminary estimates will be reviewed with the development team before they are treated as finalized sprint commitments.

The review process will include:

1. The Product Owner explains each user story and its acceptance criteria.
2. Team members discuss technical requirements, dependencies, and uncertainties.
3. The Scrum Master facilitates a Planning Poker session.
4. Team members independently estimate the relative complexity of each story.
5. Differences in estimates are discussed before reaching team consensus.
6. Final estimates are updated in Jira.
7. Any resulting changes are reflected in `forecast.md`.

The team will also compare its estimated capacity with actual velocity after each completed sprint.

---

## 8. Risks and Estimation Assumptions

| Risk or Assumption | Impact | Mitigation |
|---|---|---|
| Team velocity is not yet established | Sprint capacity may be inaccurate | Review actual velocity after Sprint 1 |
| Authentication and authorization may require additional effort | Core functionality may take longer | Review requirements and technical design early |
| Integration between system modules | Potential delays and defects | Use incremental integration and pull requests |
| Application business rules require careful validation | Additional testing effort | Apply unit testing and BDD scenarios |
| Unexpected technical complexity | Story estimates may change | Re-estimate stories during backlog refinement |

---

## 9. Conclusion

The Internship & Job Board product backlog consists of **15 user stories with a preliminary total of 60 Story Points**.

The proposed Minimum Viable Product (MVP) includes **14 stories totaling 55 Story Points**, while one optional enhancement represents the remaining **5 Story Points**.

The estimates provide an initial foundation for sprint planning, prioritization, and workload forecasting.

Since formal Planning Poker has not yet been conducted, these estimates remain preliminary and will be reviewed with the team before final sprint commitments are established.

Any revisions will be documented consistently across the Jira backlog, `stories.md`, and `forecast.md`.