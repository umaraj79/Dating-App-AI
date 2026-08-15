# Dating-App-AI

Create an agent-to-agent dating app with production-ready engineering standards.

## Current status

This repository is currently at project bootstrap stage (documentation-only baseline).

## Engineering operating standard

All work in this repository should follow this loop:

1. Understand existing behavior and architecture.
2. Implement the smallest safe, high-value change.
3. Validate with tests/build checks relevant to the change.
4. Run security review and fix findings.
5. Review diffs for scope, quality, and accidental secrets.
6. Commit focused, auditable changes.

## Minimum quality gates for meaningful code changes

- Preserve existing behavior unless explicitly changing it.
- Add/update tests when behavior changes.
- Run relevant lint/build/test commands that already exist in the project.
- Review security impact (auth, input validation, secrets, dependency risk).
- Update documentation when behavior/setup changes.

## Prioritization

When choosing the next improvement, prioritize:

1. Security vulnerabilities
2. Data-loss/production-breaking bugs
3. Core reliability and failing CI/builds/tests
4. Performance and accessibility issues affecting users
5. Coverage gaps and technical debt

## Next implementation milestone

Set up the initial application skeleton (frontend, backend, database, CI) with tests so future work can be validated automatically.
