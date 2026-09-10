<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# GDG Main Platform Frontend - Operating Rules

## Purpose and authority

This repository owns the **Next.js frontend only** for the GDG Main Platform. The authoritative backend is the separate NestJS repository. Do not implement an alternative backend, database access, authentication authority, or business-decision logic here.

## Source Authority by Domain

- Approved decisions define the current accepted direction when they explicitly supersede an older decision or document; record material architecture and product decisions in `docs/decision-governance.md`.
- An approved Notion task defines the assigned task's requirements and Definition of Done, not unrelated architecture or current implementation details unless it is explicitly approved as a decision.
- The backend's published Swagger/OpenAPI defines the current frontend-backend API contract.
- Repository code, tests, and configuration define current implemented frontend behavior.
- The Unified Platform Proposal defines original product intent, major domains, and high-level user journeys; it does not define current low-level implementation details.
- Web Doc Final defines the approved technical baseline unless a later approved decision supersedes it.

Do not silently choose one source when two sources conflict. Identify the conflict's domain, apply the authority for that domain, and record the discrepancy. If documented authority cannot resolve it, mark it `TBD` and request team clarification. Do not change product behavior merely to make sources appear consistent.

## Scope boundaries

- Build user-facing pages, components, client-side interaction, and API consumption.
- Treat the backend as the authority for authentication, authorization, validation, persistence, and domain rules.
- Never expose secrets in browser code. Only intentionally public configuration may use the `NEXT_PUBLIC_` prefix.
- Do not call the database directly from the frontend.
- Keep the games platform out of this repository unless an approved integration requirement says otherwise.

## Implementation rules

- Use TypeScript and the approved frontend stack: Next.js, React, Tailwind CSS, Framer Motion, and GSAP where appropriate.
- Match request and response shapes to the published Swagger/OpenAPI contract; never fabricate routes or DTOs to unblock UI work.
- Provide deliberate loading, error, empty, and unauthorized states where a page relies on asynchronous or restricted data.
- Use animation only when it supports comprehension or feedback; respect reduced-motion preferences when implementation begins.
- Keep changes focused on the assigned task. Do not refactor unrelated code or alter product behavior without an approved requirement.

## Quality and safety

- Validate changed code with the repository's available checks before handing work off. Record only checks actually run.
- Keep environment files and credentials out of version control. Commit an `.env.example` only when it contains names and safe example values, never real secrets.
- Update the relevant documentation when an approved interface, setup requirement, or architectural decision changes.
- In final handoff, state: what changed, any `TBD` items, documentation updated, and checks run.
