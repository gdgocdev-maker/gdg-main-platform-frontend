"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeMetadata } from "@/i18n/locale-metadata";
import type { Locale } from "@/i18n/routing";

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const t = useTranslations("common.language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const nextLocale: Locale = locale === "en" ? "ar" : "en";

  const handleClick = () => {
    startTransition(() => {
      // next-intl's pathname is locale-free and already includes concrete dynamic segments.
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-busy={isPending}
      aria-label={t("switchTo", { language: localeMetadata[nextLocale].label })}
      className={`flex h-9 w-[70px] shrink-0 items-center justify-center rounded-full border-2 border-current px-2 text-xs font-bold uppercase leading-none tracking-tight transition-colors hover:bg-current/10 disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      EN / AR
    </button>
  );
}
