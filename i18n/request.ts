import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Namespaces are split per page/feature so new pages only load what they need.
const namespaces = ["common", "home", "auth", "validation", "profile", "dashboard", "announcements", "eventRegistration"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (namespace) => [
        namespace,
        (await import(`../messages/${locale}/${namespace}.json`)).default,
      ])
    )
  );

  return {
    locale,
    messages,
  };
});
