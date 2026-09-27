"use client";

import { useLocale } from "next-intl";
import type { Locale } from "./routing";
import { localeMetadata } from "./locale-metadata";

// Layout must stay fixed across locales; only leaf text nodes should flip
// reading direction, so use this on text elements only (never on layout containers).
export function useTextDirection(): "ltr" | "rtl" {
  const locale = useLocale() as Locale;
  return localeMetadata[locale].dir;
}
