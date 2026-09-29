"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
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
  const params = useParams();
  const nextLocale: Locale = locale === "en" ? "ar" : "en";

  const handleClick = () => {
    router.replace(
      // @ts-expect-error -- pathname/params are validated by next-intl's typed navigation
      { pathname, params },
      { locale: nextLocale }
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("switchTo", { language: localeMetadata[nextLocale].label })}
      className={`flex h-9 w-[70px] shrink-0 items-center justify-center rounded-full border-2 border-current px-2 text-xs font-bold uppercase leading-none tracking-tight transition-colors hover:bg-current/10 ${className}`}
    >
      EN / AR
    </button>
  );
}
