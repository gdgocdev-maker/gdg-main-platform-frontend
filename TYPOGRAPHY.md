# Typography Reference — GDG on Campus Platform

Quick reference for every text size used across the frontend. Built on Tailwind
CSS's default type scale so class names, pixels, and rems always match what's
actually configured — no custom sizes outside this list without updating this
file first.

Applies to both Arabic and English content. Swap font-family per locale (see
Fonts section), but keep the same size scale for both — do not make Arabic text
a different step on the scale just because it's Arabic.

---

## Fonts

| Locale | Font family | Notes |
| ------ | ----------- | ----- |
| English (LTR) | Inter | Loaded via Google Fonts, fallback: `system-ui, sans-serif` |
| Arabic (RTL) | IBM Plex Sans Arabic | Loaded via Google Fonts, fallback: `Tahoma, sans-serif` |

Set the font family at the root layout level based on the active locale — never
per component.

---

## Type Scale

| Role | Tailwind class | Size (px) | Size (rem) | Line height | Weight |
| ---- | --------------- | --------- | ---------- | ----------- | ------ |
| Hero / H1 | `text-5xl` | 40px | 2.5rem | `leading-tight` (1.1) | `font-bold` (700) |
| H1 (mobile) | `text-4xl` | 32px | 2rem | `leading-tight` (1.1) | `font-bold` (700) |
| H2 (section title) | `text-3xl` | 28px | 1.75rem | `leading-snug` (1.25) | `font-bold` (700) |
| H3 (card / subsection title) | `text-2xl` | 22px | 1.375rem | `leading-snug` (1.25) | `font-semibold` (600) |
| H4 (widget title) | `text-xl` | 18px | 1.125rem | `leading-normal` (1.5) | `font-semibold` (600) |
| H5 (minor heading) | `text-lg` | 16px | 1rem | `leading-normal` (1.5) | `font-medium` (500) |
| Body (default) | `text-base` | 15px | 0.9375rem | `leading-normal` (1.5) | `font-normal` (400) |
| Body (large / intro paragraph) | `text-lg` | 16px | 1rem | `leading-normal` (1.5) | `font-normal` (400) |
| Body (small / secondary text) | `text-sm` | 13px | 0.8125rem | `leading-normal` (1.5) | `font-normal` (400) |
| Caption / helper text | `text-xs` | 11px | 0.6875rem | `leading-normal` (1.5) | `font-normal` (400) |
| Button text | `text-sm` | 13px | 0.8125rem | `leading-none` (1) | `font-medium` (500) |
| Form label | `text-sm` | 13px | 0.8125rem | `leading-normal` (1.5) | `font-medium` (500) |
| Form input text | `text-base` | 15px | 0.9375rem | `leading-normal` (1.5) | `font-normal` (400) |
| Nav link | `text-sm` | 13px | 0.8125rem | `leading-none` (1) | `font-medium` (500) |
| Badge / tag / status pill | `text-xs` | 11px | 0.6875rem | `leading-none` (1) | `font-medium` (500) |
| Table header | `text-xs` | 11px | 0.6875rem | `leading-normal` (1.5) | `font-semibold` (600) |
| Table cell | `text-sm` | 13px | 0.8125rem | `leading-normal` (1.5) | `font-normal` (400) |

---

## Where each one is used

- **Hero / H1** — Homepage hero title only.
- **H2** — Top-level section titles inside a page (e.g. "Upcoming Events", "My Tasks").
- **H3** — Card titles, modal titles, dashboard widget group titles.
- **H4** — Titles inside a widget/card (e.g. a single event card's name).
- **H5** — Rarely used; small grouped-list headers only.
- **Body (default)** — All normal paragraph and descriptive text.
- **Body (large)** — Landing/intro paragraphs under a hero or section title.
- **Body (small)** — Secondary/supporting text under a primary line (timestamps, sub-labels).
- **Caption** — Field hints, image credits, footnotes, error messages under inputs.
- **Button text** — All buttons, at every size (`sm`, `md`, `lg` button variants still use this text size; only padding changes).
- **Form label / input** — All form fields platform-wide.
- **Nav link** — Header nav, sidebar nav, tab bars.
- **Badge/tag** — Role badges, event status, task status.
- **Table header/cell** — Any admin data table.

---

## Rules

1. Never hardcode a `px` or `rem` font size in a component. Always use the
   Tailwind class from this table.
2. Never introduce a new text size without adding it to this file first.
3. Headings always use the weight listed here — don't mix, e.g., `text-2xl
   font-normal` for an H3.
4. This scale is the same for Arabic and English. Only the font-family swaps per
   locale, not the size.
5. If a design from Figma uses a size not listed here, flag it — don't silently
   invent a new Tailwind class to match a pixel value.
