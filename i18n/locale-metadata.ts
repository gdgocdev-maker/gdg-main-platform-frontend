import type { Locale } from "./routing";

// Central place to add per-locale display info (used by the language switcher).
export const localeMetadata: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
};
