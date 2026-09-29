# Decision and Source Governance

## Purpose

This document prevents product, technical, and task sources from being silently mixed or overridden. It applies to all frontend changes.

## Source Authority by Domain

- **Approved decisions** define the current accepted direction only when they explicitly supersede an older decision or document. Record material architecture and product decisions here.
- **Notion tasks** define the requirements and Definition of Done for the assigned task. They do not define unrelated architecture or current implementation details unless explicitly approved as a decision.
- **Swagger/OpenAPI** defines the current frontend-backend API contract: routes, methods, request and response schemas, authentication requirements, documented errors, and compatibility expectations. The frontend must not invent or silently diverge from this contract.
- **Repository code, tests, and configuration** define current implemented frontend behavior. If implementation materially differs from documentation, report the discrepancy; do not silently reconcile it.
- **Unified Platform Proposal** defines original product intent, platform goals, major product domains, and high-level user journeys. It is not a source for current low-level implementation details.
- **Web Doc Final** defines the approved technical baseline unless a later approved decision explicitly supersedes it. The current baseline is Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and GSAP for frontend; NestJS, Node.js, and TypeScript for backend; MySQL and Prisma for persistence; NestJS Auth, JWT, Google OAuth, and RBAC for authentication and authorization; and Swagger/OpenAPI for the API contract.

## Conflict handling

Do not silently choose one source when sources conflict. First identify the conflict's domain, then apply the authority for that domain. If documented authority cannot resolve it, mark it `TBD` and request team clarification. Record material architecture or product decisions here. Do not change product behavior merely to make sources appear consistent.

## Current binding decisions

| Decision | Status |
| --- | --- |
| Frontend and backend are separate repositories | Approved |
| Next.js is frontend only | Approved |
| NestJS is the authoritative backend | Approved |
| Persistence uses MySQL and Prisma | Approved |
| Authentication uses NestJS Auth, JWT, Google OAuth, and backend-enforced RBAC | Approved direction |
| Swagger/OpenAPI is the authoritative frontend-backend contract | Approved |
| Arabic uses a full RTL layout (`dir="rtl"` on `<html>`), not text-only direction | Proposed (2026-09-28) |

### 2026-09-28: Full RTL layout for Arabic

- **Owner:** Reman (i18n task); approver: team lead, pending PR review.
- **Context:** The i18n foundation (PR #12) kept `dir="ltr"` on `<html>` for every locale and flipped only text nodes. The i18n Notion task requires "RTL (Right-to-Left) layout for Arabic" and checking navigation, icons and alignment in both directions.
- **Decision:** The locale layout sets `dir` from `i18n/locale-metadata.ts`, so Arabic pages mirror entirely. Components use logical utilities and flip physical animation offsets via `useTextDirection()`.
- **Affected:** frontend only.
- **Migration:** Pages built with physical classes (`left-`, `pl-`, `text-left`, …) must be reviewed in Arabic. Rollback is restoring `dir="ltr"` in `app/[locale]/layout.tsx`.

## Decision record minimum

Each new decision should record: date, owner/approver, status, context, decision, affected repositories, source links, and migration or rollback implications. Link the exact Notion task for task-scoped work.

## Legacy-source clarification

Web Doc Final describes some Next.js full-stack capabilities, including Server Actions. For this platform's backend responsibilities, that guidance is superseded by the approved separate-repository architecture: Next.js is frontend only and NestJS is authoritative.
