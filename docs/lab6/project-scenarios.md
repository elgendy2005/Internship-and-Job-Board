# Part D: Gherkin scenarios for our team story

**Project:** Internship & Job Board (Group 2)

**Story:** As a student, I want to apply to an approved internship with my CV link, so that the recruiter can review my application.

| | Scenario |
|---|---|
| Scenario 1 (happy path) | Student applies before the deadline |
| Scenario 2 (refused) | Student cannot apply twice to the same posting |
| Scenario 3 (edge / outline) | Deadline boundary: day before, on the deadline, day after |

```gherkin
Feature: Apply to an internship
  As a student
  I want to apply to an approved internship with my CV link
  So that the recruiter can review my application

  Background:
    Given an approved internship "Frontend Intern" with deadline "2026-12-10"
    And a student "Sara" is logged in

  Scenario: Student applies before the deadline
    When Sara applies to "Frontend Intern" on "2026-12-01"
    Then the application is saved with status "applied"

  Scenario: Student cannot apply twice to the same posting
    Given Sara has already applied to "Frontend Intern"
    When Sara applies to "Frontend Intern" on "2026-12-02"
    Then the application is refused with "already applied"

  Scenario Outline: Deadline boundary
    When Sara applies to "Frontend Intern" on "<date>"
    Then the result is "<result>"

    Examples:
      | date       | result   |
      | 2026-12-09 | accepted |
      | 2026-12-10 | accepted |
      | 2026-12-11 | refused  |
```