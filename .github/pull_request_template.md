## Jira story

<!-- PR title must start with the Jira key, e.g. "IJB-19 Apply for internship using CV link" -->
Jira: [IJB-xx](https://modagemy.atlassian.net/browse/IJB-xx)

## What changed

<!-- Short summary of the change and why. -->

-

## How to test

<!-- Steps a reviewer can follow on a clean checkout. -->

1. `npm ci`
2. `npm run seed`
3. `npm run dev` and ...

## Definition of Done

- [ ] Acceptance criteria of the story are met
- [ ] Unit tests written and passing (`npm test`)
- [ ] Gherkin scenario added/updated for any business-rule change (`npm run bdd`)
- [ ] Lint clean (`npm run lint`)
- [ ] Clear error messages for invalid input
- [ ] Test data only: no real names, emails, companies or CV links
- [ ] Runs from the README instructions
- [ ] CI is green
- [ ] Reviewed and approved by at least 1 teammate
