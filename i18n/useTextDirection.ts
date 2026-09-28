"use client";

import { useLocale } from "next-intl";
import type { Locale } from "./routing";
import { localeMetadata } from "./locale-metadata";

// The document direction is already set on <html> by the locale layout, so CSS
// flips on its own. Use this hook only where JS needs the direction, e.g. to
// mirror Framer Motion x-offsets, which are physical and don't follow `dir`.
export function useTextDirection(): "ltr" | "rtl" {
  const locale = useLocale() as Locale;
  return localeMetadata[locale].dir;
}
