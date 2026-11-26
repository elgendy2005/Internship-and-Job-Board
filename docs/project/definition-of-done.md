# Definition of Done

A user story is **Done** only when **every** item below is true. The PR template repeats
this checklist; reviewers check it before approving.

- [ ] **Acceptance criteria met.** Every acceptance criterion of the story in
      [stories.md](../week4/stories.md) / Jira works as written.
- [ ] **Unit tests written.** New logic is covered by Vitest tests (domain rules and API
      routes), and `npm test` passes.
- [ ] **Gherkin scenario for any business-rule change.** Any change to a business rule
      (deadline, one application per posting, status transitions, approval visibility)
      has a scenario in `features/`, and `npm run bdd` passes.
- [ ] **Lint clean.** `npm run lint` reports zero errors and zero warnings.
- [ ] **PR reviewed by 1 teammate.** The pull request (title starts with the Jira key)
      is approved by at least one other team member before merge.
- [ ] **CI green on main.** The `ci` workflow passes on the PR and again on `main`
      after merge.
- [ ] **Runs from the README.** A teammate can install, seed and run the feature on a
      clean checkout by following the README only.
- [ ] **Clear error messages.** Invalid input and rule violations return a
      user-understandable message (`{ "error": "..." }` from the API and shown in the UI).
- [ ] **Test data only.** No real names, emails, companies or CV links in code, tests,
      seed data or screenshots.
- [ ] **Accepted by the PO in Sprint Review.** The Product Owner has seen the story
      working and accepted it; the Jira issue is moved to Done.
