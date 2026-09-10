# GDG Main Platform Frontend

The frontend for the Google Developer Groups on Campus - University of Jeddah Unified Community Platform.

This repository is intentionally separate from the backend. It owns the user interface and consumes the backend API; it does not own database access, authentication authority, authorization decisions, or domain business logic.

## Status

This is an initial documentation package. Application source code, repository URL, deployment configuration, CI, design system, API base URL for each environment, and the published API contract are **TBD**.

## Approved technical direction

| Area | Direction |
| --- | --- |
| Frontend framework | Next.js with React and TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion and GSAP, when justified |
| Backend relationship | Consume the separate NestJS API only |
| API contract | Consume the backend's published Swagger/OpenAPI contract |
| Local frontend address in the technical guide | `http://localhost:3000` |
| Node.js | LTS, version 20 or newer per the technical guide |

The explicit project decision is that **Next.js is frontend only**. NestJS in the separate backend repository is the authoritative backend.

## Documentation

- [Architecture](docs/architecture.md)
- [Decision and source governance](docs/decision-governance.md)
- [Development workflow](docs/development-workflow.md)
- [API integration](docs/api-integration.md)
- [UI standards](docs/ui-standards.md)
- [Testing](docs/testing.md)

## Getting started

The technical guide describes this expected local workflow once application code and `package.json` exist:

1. Install Node.js LTS (20+), Git, and a code editor.
2. Clone this repository and run `npm install`.
3. Create `.env.local` from the approved environment-variable template when it is supplied. The expected public API variable is `NEXT_PUBLIC_API_URL`; its environment-specific value is **TBD**.
4. Run the repository's confirmed development command. The technical guide uses `npm run dev` and expects the frontend at `http://localhost:3000`.

Do not add or assume scripts until `package.json` is created and reviewed.

## Product scope at a glance

The platform is intended to bring community membership, applications, events and registrations, teams, tasks, announcements, recommendations, attendance, organizational information, and approved member communication into one platform. Product detail and priority remain subject to approved requirements; see the backend contract for executable behavior.

## Sources

- [Unified Community Platform proposal](../../sources/GDG_منصة_موحدة.pdf) - product vision, user roles, and proposed capabilities.
- [Web Doc Final](../../sources/Web%20Doc%20Final.pdf) - approved technical stack and initial local setup guidance.
- Approved Notion tasks - task-scoped requirements and acceptance criteria; link the exact task in the relevant issue, PR, or decision record.

The paths above are reference links for the documentation package. Copy the two source files to the organization’s agreed documentation location, or replace these links, when this package is placed in its final repository.
