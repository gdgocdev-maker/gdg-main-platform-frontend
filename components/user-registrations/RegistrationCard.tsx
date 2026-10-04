"use client";

import { useFormatter, useTranslations } from "next-intl";
import { RegistrationStatusBadge } from "./RegistrationStatusBadge";
import type { UserRegistration } from "@/lib/user-registrations/types";

type RegistrationCardProps = {
  registration: UserRegistration;
  dateAccent: number;
  onConfirm: () => void;
  onCancel: () => void;
  actionFeedback?: "confirm" | "cancel" | null;
};

export function RegistrationCard({
  registration,
  dateAccent,
  onConfirm,
  onCancel,
  actionFeedback = null,
}: RegistrationCardProps) {
  const t = useTranslations("userRegistrations");
  const format = useFormatter();
  const startsAt = new Date(registration.startsAt);
  const dateAccentClasses = [
    "bg-blue/10 text-blue ring-blue/15",
    "bg-gdg-red/10 text-gdg-red ring-gdg-red/15",
    "bg-gdg-yellow/15 text-amber-700 ring-gdg-yellow/20 dark:text-amber-300",
    "bg-gdg-green/10 text-gdg-green ring-gdg-green/15",
  ];
  const deadline = registration.confirmationDeadline
    ? new Date(registration.confirmationDeadline)
    : null;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-1 items-start gap-4">
        <div className={`flex h-[76px] w-[68px] shrink-0 flex-col items-center justify-center rounded-xl text-current ring-1 ${dateAccentClasses[dateAccent]}`}>
          <span className="text-xs font-medium">
            {format.dateTime(startsAt, { month: "short" })}
          </span>
          <span className="mt-0.5 text-2xl font-semibold leading-none">
            {format.dateTime(startsAt, { day: "2-digit" })}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted">
              {t(`kind.${registration.kind}`)}
            </span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-foreground/25" />
            <RegistrationStatusBadge status={registration.status} />
          </div>
          <h3 className="text-base font-bold leading-6 text-foreground sm:text-lg">
            {registration.title}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {format.dateTime(startsAt, { timeStyle: "short" })}
            <span aria-hidden="true" className="mx-2">·</span>
            {registration.location}
          </p>
        </div>
      </div>

      {registration.status === "need-confirmation" && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-sm leading-6 text-muted">
            {deadline && !Number.isNaN(deadline.getTime())
              ? t("confirmBefore", {
                  date: format.dateTime(deadline, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }),
                })
              : t("confirmPrompt")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-lg bg-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue/90"
            >
              {t("confirmAction")}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground/75 transition hover:bg-foreground/5"
            >
              {t("cancelAction")}
            </button>
          </div>
          {actionFeedback && (
            <p role="status" className="mt-3 text-xs text-muted">
              {t(
                actionFeedback === "confirm"
                  ? "confirmationUnavailable"
                  : "cancellationUnavailable",
              )}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
