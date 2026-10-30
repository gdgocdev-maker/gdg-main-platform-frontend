// Run: node scripts/check-theme-toggle.mjs
// Exercise the real component and shared theme helpers without an added test dependency.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
const moduleRequire = createRequire(import.meta.url);
const compile = file => ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const source = compile("../components/ui/ThemeToggle.tsx");
const helperSource = compile("../lib/theme.ts");

async function check({ initial = "light", systemDark = false, reduced = false, supported = true, storageBlocked = false, startThrows = false } = {}) {
  const root = { dataset: {} };
  const cleanups = [];
  const events = new EventTarget();
  let stored = initial === "system" ? null : initial;
  let state, persisted, calls = 0, release;
  const finished = new Promise(resolve => { release = resolve; });
  const helpers = {};
  const context = {
    exports: {},
    Event,
    document: {
      documentElement: root,
      ...(supported && { startViewTransition(update) {
        calls++;
        if (startThrows) throw new Error("Transition unavailable");
        update();
        return { ready: Promise.reject(new Error("Snapshot skipped")), finished, skipTransition: release };
      } }),
    },
    window: {
      matchMedia: query => ({
        matches: query.includes("reduced-motion") ? reduced : systemDark,
        addEventListener() {}, removeEventListener() {},
      }),
      requestAnimationFrame: callback => { callback(); return 1; },
      cancelAnimationFrame() {},
      addEventListener: events.addEventListener.bind(events),
      removeEventListener: events.removeEventListener.bind(events),
      dispatchEvent: events.dispatchEvent.bind(events),
      localStorage: {
        getItem: () => { if (storageBlocked) throw new Error("Storage blocked"); return stored; },
        setItem: (_, value) => { if (storageBlocked) throw new Error("Storage blocked"); stored = persisted = value; },
        removeItem: () => { if (storageBlocked) throw new Error("Storage blocked"); stored = null; },
      },
    },
    require: name => {
      if (name === "@/lib/theme") return helpers;
      if (name === "react") return {
        useState: () => ["light", value => { state = value; }],
        useRef: () => ({ current: null }),
        useEffect: effect => { cleanups.push(effect()); },
      };
      if (name === "react-dom") return { flushSync: callback => callback() };
      if (name === "next-intl") return { useTranslations: () => key => key };
      return moduleRequire(name);
    },
  };
  vm.runInNewContext(helperSource, { ...context, exports: helpers });
  vm.runInNewContext(source, context);
  const button = context.exports.default();
  const initialVisible = initial === "system" || storageBlocked ? (systemDark ? "dark" : "light") : initial;
  assert.equal(root.dataset.theme, initial === "system" || storageBlocked ? undefined : initial);
  assert.equal(state, initialVisible);
  const first = button.props.onClick();
  const expected = initialVisible === "light" ? "dark" : "light";
  assert.equal(root.dataset.theme, expected);
  assert.equal(state, expected);
  assert.equal(persisted, storageBlocked ? undefined : expected);
  if (supported && !reduced && !startThrows) {
    assert.equal(root.dataset.themeTransition, "logo");
    await button.props.onClick();
    assert.equal(calls, 1, "Repeated clicks must not overlap transitions");
  } else {
    assert.equal(calls, supported && !reduced ? 1 : 0);
    release();
  }
  if (!storageBlocked) {
    helpers.applyThemeChoice(initialVisible);
    assert.equal(state, initialVisible, "The toggle must stay in sync with appearance settings");
  }
  for (const cleanup of cleanups) cleanup?.(); // Leaving a page skips its pending animation and unsubscribes.
  await first;
  assert.equal(root.dataset.themeTransition, undefined);
}

(async () => {
  await check();
  await check({ initial: "dark" });
  await check({ initial: "system" });
  await check({ initial: "system", systemDark: true });
  await check({ reduced: true });
  await check({ supported: false });
  await check({ storageBlocked: true });
  await check({ startThrows: true });
  console.log("Theme toggle: both directions, system themes, settings synchronization, reduced motion, unsupported browsers, blocked storage, overlapping clicks and cleanup passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });
