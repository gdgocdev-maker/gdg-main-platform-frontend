# UI Standards

## Foundation

Use Next.js, React, TypeScript, and Tailwind CSS as the approved frontend foundation. Framer Motion and GSAP are approved animation tools, not requirements for every interaction.

## Required UX states

Where applicable, every API-backed view should define:

- loading state;
- success/content state;
- empty state;
- recoverable error state;
- unauthorized or forbidden state when access is restricted.

The exact visual system, component library, tokens, brand assets, accessibility target, supported browsers, and responsive breakpoints are **TBD**. Do not create a parallel design system before they are approved.

## Internationalization and direction

- All user-facing text comes from `messages/{en,ar}/<namespace>.json` via `next-intl` (`useTranslations` in components, `getTranslations` on the server). Register new namespaces in `i18n/request.ts`.
- Arabic uses a full RTL layout: the locale layout sets `dir` on `<html>` (see `docs/decision-governance.md`).
- Use logical Tailwind utilities (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`, `text-start`, `rounded-s-`/`rounded-e-`) instead of `ml-`/`pl-`/`left-`/`text-left` so components mirror automatically.
- Framer Motion/GSAP `x` offsets are physical; flip them with `useTextDirection()` where direction matters.
- Use `Link`/`useRouter` from `@/i18n/navigation` so navigation keeps the current locale.

## Accessibility baseline

- Use semantic HTML before adding ARIA.
- Ensure keyboard access and visible focus behavior for interactive elements.
- Provide accessible names for controls and meaningful text alternatives for non-decorative images.
- Do not communicate meaning only through color or motion.
- Respect reduced-motion preferences when animation is implemented.

These are implementation safeguards, not a substitute for a formal accessibility standard, which remains **TBD**.

## Motion

Use Framer Motion for component-level transitions and GSAP for more complex or scroll-based sequences only when there is a clear interaction purpose. Motion must not block tasks, hide state changes, or make content inaccessible.
