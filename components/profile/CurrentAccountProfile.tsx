"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays, ChevronRight, LoaderCircle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { TopNav } from "@/components/dashboard/TopNav";
import Footer from "@/components/Footer";
import { Avatar } from "@/components/ui/Avatar";
import { ProfileChips } from "@/components/profile/ProfileChips";
import { Link } from "@/i18n/navigation";
import { API_ENABLED, apiRequest } from "@/lib/api/client";

type CurrentAccount = {
  fullName: string;
  email: string | null;
  committees: { code: string; name: string; position: string }[];
  roles: string[];
};

type LoadState = "loading" | "ready" | "error" | "unavailable";

export default function CurrentAccountProfile() {
  const t = useTranslations("profile");
  const router = useRouter();
  const [account, setAccount] = useState<CurrentAccount | null>(null);
  const [loadState, setLoadState] = useState<LoadState>(API_ENABLED ? "loading" : "unavailable");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!API_ENABLED) return;

    let active = true;
    setLoadState("loading");
    void apiRequest<CurrentAccount>("/me").then((result) => {
      if (!active) return;
      if (!result.ok) {
        if (result.status === 401) {
          router.replace("/login?returnTo=%2Fprofile");
          return;
        }
        setLoadState("error");
        return;
      }
      setAccount(result.data);
      setLoadState("ready");
    });

    return () => { active = false; };
  }, [attempt, router]);

  const committeeChips = account?.committees.map(
    (committee) => `${committee.name} · ${committee.position}`,
  ) ?? [];

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <TopNav />

      {loadState === "loading" && (
        <main className="mx-auto flex min-h-[55vh] w-full max-w-6xl flex-1 items-center justify-center px-4 py-12 sm:px-6">
          <p role="status" className="flex items-center gap-3 text-sm text-muted">
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            {t("account.loading")}
          </p>
        </main>
      )}

      {(loadState === "error" || loadState === "unavailable") && (
        <main className="mx-auto flex min-h-[55vh] w-full max-w-6xl flex-1 items-center justify-center px-4 py-12 sm:px-6">
          <div role="alert" className="flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
            <AlertCircle className="size-7 text-gdg-red" aria-hidden="true" />
            <p className="text-sm text-muted">
              {loadState === "error" ? t("account.loadFailed") : t("account.unavailable")}
            </p>
            {loadState === "error" && (
              <button
                type="button"
                onClick={() => setAttempt((value) => value + 1)}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                {t("account.retry")}
              </button>
            )}
          </div>
        </main>
      )}

      {loadState === "ready" && account && (
        <>
          <section className="relative">
            <div className="h-32 bg-gradient-to-r from-[#4285F4] via-[#C3ECF6] via-[#FFE7A5] to-[#EA4335] dark:bg-[linear-gradient(90deg,#356FC4_0%,#6FAFC4_35%,#D4B76B_65%,#D9786D_100%)] sm:h-36 md:h-40" />
            <div className="mx-auto -mt-10 w-full max-w-6xl px-4 sm:-mt-12 sm:px-6 md:px-10 lg:px-16">
              <div className="flex flex-col items-center text-center md:items-start md:text-start">
                <Avatar initials={account.fullName.trim().slice(0, 1) || "?"} size="lg" />
                <div className="mt-3 w-full">
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#243b64] dark:text-slate-100 md:text-4xl">
                    {account.fullName}
                  </h1>
                  {account.email && <p dir="ltr" className="mt-1 text-base text-foreground/75">{account.email}</p>}
                </div>
                {(committeeChips.length > 0 || account.roles.length > 0) && (
                  <div className="mt-4 flex w-full flex-col gap-3">
                    {committeeChips.length > 0 && (
                      <section aria-label={t("account.committees")}>
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{t("account.committees")}</h2>
                        <ProfileChips chips={committeeChips} />
                      </section>
                    )}
                    {account.roles.length > 0 && (
                      <section aria-label={t("account.roles")}>
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{t("account.roles")}</h2>
                        <ProfileChips chips={account.roles} />
                      </section>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 md:px-10 lg:px-16">
            <Link
              href="/registrations"
              className="group flex w-full items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-[#4285f4]/50 hover:shadow-md dark:border-[#243b64]/70 dark:bg-surface sm:px-6"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff] text-[#325fa6] dark:bg-[#243b64] dark:text-[#8ab4f8]">
                <CalendarDays className="size-6" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-start text-base font-semibold text-[#243b64] dark:text-white">
                {t("registrationsLink")}
              </span>
              <ChevronRight className="size-5 shrink-0 text-[#325fa6] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 dark:text-[#8ab4f8]" aria-hidden="true" />
            </Link>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
