# Frontend Development Workflow

## Before implementation

1. Read the approved Notion task, its linked decision, and the intended user outcome.
2. Confirm the published Swagger/OpenAPI contract, including endpoint, request DTO, response DTO, auth requirement, and failure cases.
3. Mark missing design, API, or product decisions as `TBD`; do not infer them from a mockup or a similarly named feature.
4. Check related UI states and existing conventions in the repository once source code exists.

## During implementation

- Keep TypeScript types aligned with the published backend contract.
- Make loading, successful, empty, error, and unauthorized states intentional for API-backed experiences.
- Keep server-owned rules on the server. Frontend checks improve UX but never replace backend RBAC.
- Use Tailwind CSS for styling. Use Framer Motion or GSAP only where motion meaningfully supports the experience.
- Keep public configuration in `.env.local`; never add secrets to frontend variables or commits.

## Before handoff

1. Run the relevant checks exposed by the actual repository (for example lint, type-check, test, or build). The final command list is **TBD** until the project configuration exists.
2. Manually verify changed UI paths where practical, including narrow and wide viewports and relevant API states.
3. Update documentation if the approved setup, interface contract, or architecture changed.
4. Report the change, checks actually run, and any unresolved `TBD` item.

## Collaboration with backend

The backend team publishes the executable API contract. If a frontend requirement needs a new endpoint or a change to a DTO, record the needed behavior and coordinate the contract change before relying on it. Do not create a temporary invented endpoint in production-facing code.

Branch naming, pull-request template, commit conventions, task tracker, release process, and review ownership are **TBD** and deliberately not prescribed here.
