# Performance and smoothness report

Tested 2026-11-14 on macOS with installed Chrome, production Next.js 16.3.4. Baseline: `origin/main` at `77646e3`; branch: `perf/smoother-site`. The existing auth worktree and backend were not modified.

## Live site and coverage

`https://gdguj.org` was opened in the shared browser and failed to load (`chrome-error://chromewebdata/`). Repository README, setup, hosting references, GitHub homepage and deployment records did not identify a confirmed replacement frontend URL. Render examples are placeholders, not verified deployments. After opening PR #136, Netlify hosting checks revealed `https://jazzy-dieffenbachia-4188da.netlify.app`. Opening that hostname redirects to Netlify Team Protection and displays “This site is private” / “Sign in with an invited Netlify account to view it.” The host is reachable but the application is access-restricted; live application performance remains TBD. All measurements below use `http://localhost:3100`, built with `npm run build` and served with `npm run start -- --port 3100`.

Both baseline and candidate production builds pass. API integration was left at the checkout default (demo mode); no environment files or credentials were copied. The backend is unavailable on port 3001. Authenticated dashboard, real event/announcement detail records, QR camera access and an authenticated three.js badge session could not be exercised. Protected routes were checked as signed-out navigation/redirects, not as signed-in content.

## Method

- Lighthouse: one cold run per locale/device before and after, default simulated mobile throttling and desktop preset; performance category. These are directional lab results, not field Core Web Vitals or a statistically stable median.
- Playwright + CDP: 1440×900 desktop; 390×844 mobile, 4× CPU, 150 ms latency, 200,000 bytes/s download and 93,750 bytes/s upload. Fresh context per route; 16 main routes × 2 languages × 2 device profiles = 64 observations per revision.
- Mobile route observations use an 8-second home / 3-second other-page window after DOMContentLoaded. Some routes have not hydrated by that deadline; zero LCP/JS/task values are incomplete observations, not fast results. Desktop baseline waited for load; candidate used DOMContentLoaded plus the same settling delay, so use Lighthouse for LCP comparisons.
- Scroll: three seconds of requestAnimationFrame-driven 18 px steps, reporting frame rate, p95 interval and frames over 50 ms. Headless synthetic scroll does not prove real-device compositor smoothness. Chrome timeline traces cover that interval.
- Separate settled interaction probe counts mutations on the actual ribbon SVG for one second, then scrolls offscreen and back; also clicks both language-switch directions, and repeats with reduced motion. Observed interaction duration is a lab event timing sample, not field INP; Lighthouse TBT is the blocking proxy.
- The image sampling pass requests repeated scroll positions at both viewport widths and sums completed image resource body bytes. CSS smooth scrolling may coalesce those positions, so this is a sampled traversal, not a complete lazy-asset inventory. Lighthouse total-transfer results provide the standardized startup comparison. Route JS bytes are completed compressed body transfers for `.js` resources, including route prefetch; they are not an analyzer estimate of exclusive module size. Next 16 build output lists routes but does not print bundle sizes.

## Lighthouse before / after

| Locale / device | Performance | LCP | CLS | TBT | Long tasks | Total transferred |
|---|---:|---:|---:|---:|---:|---:|
| EN / desktop | 88 → 94 | 2.27 s → 1.68 s | 0.0005 → 0.0005 | 0 ms → 0 ms | 0 → 0 | 20.77 MiB → 3.09 MiB |
| EN / mobile | 62 → 75 | 13.08 s → 9.48 s | 0.0000 → 0.0000 | 202 ms → 20 ms | 3 → 3 | 20.70 MiB → 3.03 MiB |
| AR / desktop | 92 → 94 | 1.86 s → 1.67 s | 0.0005 → 0.0005 | 0 ms → 0 ms | 0 → 0 | 20.83 MiB → 3.16 MiB |
| AR / mobile | 75 → 75 | 12.71 s → 9.79 s | 0.0000 → 0.0000 | 14 ms → 16 ms | 2 → 2 | 20.76 MiB → 3.09 MiB |

## Image weight and offscreen work

| Measurement | Before | After |
|---|---:|---:|
| Sampled-scroll images, 1440 px | 20.10 MiB | 2.43 MiB (87.9% less) |
| Sampled-scroll images, 390 px | 17.39 MiB | 2.35 MiB (86.5% less) |
| EN offscreen ribbon writes/s | 1920 | 0 |
| AR offscreen ribbon writes/s | 1920 | 0 |

Normal-motion ribbons still animate onscreen and resume after scrolling back. Reduced-motion ribbons make zero geometry writes in both revisions. Candidate assertions enforce those behaviors. Language switching had zero measured CLS in both directions; no horizontal overflow. Event timing samples are recorded in the interaction JSON; full-page navigation can reset entries, so they do not establish INP.

## Main-route JS transfers (desktop, KiB)

| Route | EN before → after | AR before → after |
|---|---:|---:|
| / | 284.3 → 285.8 | 284.3 → 285.8 |
| /announcements | 386.9 → 388.5 | 386.9 → 388.5 |
| /event-registration | 152.7 → 153.0 | 152.7 → 153.0 |
| /login | 391.5 → 393.1 | 391.5 → 393.1 |
| /signup | 391.5 → 393.1 | 391.5 → 393.1 |
| /signup/pending | 316.7 → 318.3 | 316.7 → 318.3 |
| /signup/verify | 318.4 → 320.0 | 318.4 → 320.0 |
| /signup/complete | 382.0 → 383.5 | 382.0 → 383.5 |
| /forgot-password | 384.3 → 385.9 | 384.3 → 385.9 |
| /forgot-password/verify | 318.3 → 319.8 | 318.3 → 319.8 |
| /reset-password | 321.3 → 322.8 | 321.3 → 322.8 |
| /activate | 228.5 → 228.6 | 228.5 → 228.6 |
| /profile | 312.2 → 313.8 | 312.2 → 313.8 |
| /registrations | 319.4 → 320.9 | 264.2 → 264.3 |
| /create-event | 418.6 → 420.0 | 418.6 → 420.0 |
| /dashboard | 416.1 → 417.5 | 416.1 → 417.5 |

There is no substantial JS reduction: three.js and html5-qrcode already load dynamically at the badge/scanner, and GSAP has no active imports. The added motion preference provider and lifecycle handling add a small amount of JS. No heavy dependency was moved into the homepage. Font transfers did not improve in these samples: Roboto already reused variable resources; its declaration now explicitly uses the variable font and both fonts explicitly use `display: swap`.

## Scroll traces

| Locale / device | FPS before → after | p95 frame ms | Frames >50 ms |
|---|---:|---:|---:|
| EN / desktop | 59.3 → 60.3 | 16.8 → 16.7 | 1 → 0 |
| AR / desktop | 60.3 → 60.3 | 16.8 → 16.8 | 0 → 0 |
| EN / mobile | 60.3 → 58.7 | 16.7 → 16.8 | 0 → 1 |
| AR / mobile | 60.3 → 58.7 | 16.7 → 16.8 | 0 → 0 |

The fixed-window mobile traces include incomplete hydration; their near-60 FPS does not mean the interactive animation ran smoothly. The settled SVG mutation probe is the evidence for eliminating offscreen animation work. Traces are gzip-compressed in `docs/perf/*-trace.json.gz`; decompress and load into Chrome Performance. FPS was already near 60 on the test desktop, so no broad FPS improvement is claimed.

## Remaining limits

Mobile LCP remains about 9.5–9.8 seconds under Lighthouse simulation, so mobile loading needs further improvement. These gains do not establish good field Core Web Vitals.

Announcements and registrations already show CLS above 0.1 in some loading/state-transition samples (baseline registrations up to 0.552). Their raw route observations remain in the report; this patch does not establish that those flows meet Core Web Vitals. Fonts still transfer roughly 172–229 KiB depending on locale; portraits loaded on scrolling remain a source of image weight. Production API/CDN behavior, signed-in badge rendering and camera scanning need a live/session-backed follow-up.

## Changes

- About photos and leadership images use `next/image`, intrinsic dimensions and responsive `sizes`; their existing positioning, crops and motion are retained.
- Hidden mobile committee portraits load lazily and decode asynchronously. SVG portrait hrefs are assigned only within 400 px of the viewport, keeping hidden desktop layouts out of mobile startup downloads.
- Ribbon geometry callbacks stop when the SVG is offscreen or the document is hidden, with observer/listener cleanup. Decorative looping hero motion settles offscreen and for reduced motion.
- Mobile offer selection batches scroll work into one frame and skips layout reads on desktop/offscreen.
- About counters cancel pending animation frames on unmount and resolve directly to their final count with reduced motion.
- Shared Framer Motion preferences respect the OS setting; reduced-motion CSS also disables smooth scrolling. The badge engine sleeps while the document is hidden and wakes when visible.

## Coverage and checks

- Before: 192 concrete AR/EN page URLs; 0 browser-exception cases; 0 horizontal-overflow cases. Dynamic identifiers require real data and are excluded. See [before route sweep](perf/before-routes.json).
- After: 192 concrete AR/EN page URLs; 0 browser-exception cases; 0 horizontal-overflow cases. Dynamic identifiers require real data and are excluded. See [after route sweep](perf/after-routes.json).
- No hydration exceptions in the main-route probes. Both revisions record eight unavailable-backend network-error observations on protected flows and two existing announcement-page 404 resource observations. No new console-error class was introduced; see raw observations.
- `npm run build`: passes before and after (Turbopack, no font workaround required).
- `npm run typecheck`: passes.
- `node scripts/check-theme-toggle.mjs`: passes. No `test` script is defined on main.
- Changed-file ESLint: zero errors, one existing unused `CX` warning. Full `npm run lint`: same six existing errors, warnings reduced from 15 to 12. Errors remain in profile, blacklist and shared dashboard state-reset effects; changing their behavior is outside this performance patch.
- `git diff --check`: passes.
- Interaction assertions: offscreen stop, onscreen resume, reduced-motion behavior, RTL/LTR direction and overflow.

## Screenshots and raw data

| Locale / viewport | Before | After |
|---|---|---|
| EN / desktop | [PNG](perf/before-en-desktop.png) | [PNG](perf/after-en-desktop.png) |
| EN / mobile | [PNG](perf/before-en-mobile.png) | [PNG](perf/after-en-mobile.png) |
| AR / desktop | [PNG](perf/before-ar-desktop.png) | [PNG](perf/after-ar-desktop.png) |
| AR / mobile | [PNG](perf/before-ar-mobile.png) | [PNG](perf/after-ar-mobile.png) |

Screenshots show the same homepage layout at the observation deadline. Ribbon phase and loading progress naturally differ; mobile screenshots can show pre-hydration content. Raw Lighthouse files, build output, route observations, interaction samples, sampled image-resource inventories and compressed traces are in [perf/](perf/).

## Reproduction

Recorded tooling: Node 26.13.0, Playwright 1.65.0; Lighthouse/Chrome versions are in each raw report.

Install Playwright outside the repository, then point `PERF_PLAYWRIGHT_MODULE` at its `index.mjs`, or install it locally without changing the manifest/lockfile. Set `CHROME_PATH` if Chrome is not at the default macOS location. With the production server on port 3100:

```sh
PERF_PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/perf/audit.mjs after
PERF_PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/perf/interactions.mjs after
PERF_PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/perf/images.mjs after
PERF_PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/perf/routes.mjs after
npx lighthouse http://localhost:3100/en --only-categories=performance --output=json --output-path=mobile.json --chrome-flags="--headless --no-sandbox"
npx lighthouse http://localhost:3100/en --preset=desktop --only-categories=performance --output=json --output-path=desktop.json --chrome-flags="--headless --no-sandbox"
```

Repeat Lighthouse for `/ar`; use `before` on the baseline revision. The original desktop route probe used the load event; the checked-in script standardizes on DOMContentLoaded. The raw Lighthouse JSON records Chrome/Lighthouse versions, exact viewport and throttle settings. Dependency installation used the existing pnpm 12.4.1 JS entrypoint because the shell did not have pnpm on PATH; the manifest and lockfile are unchanged.

The final SVG deferment was also checked by scrolling directly to the committee section: all eight desktop SVG portraits received hrefs and retained nonzero dimensions.
