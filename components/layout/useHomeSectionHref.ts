"use client";

import { useLocale } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";

// The shared Navbar/Footer link to homepage sections by hash (#about, #events, ...).
// On the homepage the bare hash is kept; on any other page (e.g. /announcements)
// it points back to the localized homepage so the link still works.
export function useHomeSectionHref() {
  const pathname = usePathname();
  const locale = useLocale();

  return (hash: `#${string}`) =>
    pathname === "/" ? hash : `${getPathname({ href: "/", locale })}${hash}`;
}
