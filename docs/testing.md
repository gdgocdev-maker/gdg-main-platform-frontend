# Frontend Testing

## Current status

No test runner, lint command, type-check command, build command, coverage target, browser support matrix, or CI workflow has been confirmed for this separate repository. They are **TBD**.

## Minimum verification expectation

For every change, use the checks available in the actual repository and report only those actually run. When relevant, verify:

- type safety and linting;
- affected rendering and interaction paths;
- loading, empty, error, and access-denied states;
- API request/response handling against the published contract;
- responsive behavior for changed UI;
- the production build when its command is confirmed.

## API-dependent testing

Prefer the backend’s published Swagger/OpenAPI contract or an agreed test environment over fabricated fixtures. Verify that changed API-backed flows match documented operations, schemas, and access outcomes. Mocking strategy, contract-test tooling, end-to-end tooling, and test-data ownership are **TBD**.
