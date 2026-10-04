"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLeaderDashboard } from "./LeaderDashboardContext";
import type { CommitteeMember } from "./types";
import { X, Clock, ShieldCheck, AlertCircle } from "lucide-react";

interface TemporaryAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: CommitteeMember | null;
}

export function TemporaryAccessModal({
  isOpen,
  onClose,
  member,
}: TemporaryAccessModalProps) {
  const t = useTranslations("dashboard.leader");
  const { grantTemporaryAccess, revokeTemporaryAccess, canManageMembers } =
    useLeaderDashboard();

  const [selectedDuration, setSelectedDuration] = useState<number>(120); // 120 minutes default
  const [customMinutes, setCustomMinutes] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [customError, setCustomError] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !member) return null;

  const validateCustom = (val: string) => {
    if (!val.trim()) return t("temporaryAccess.durationRequired");
    const num = Number(val);
    if (isNaN(num) || !Number.isInteger(num)) return t("temporaryAccess.durationInteger");
    if (num < 5) return t("temporaryAccess.durationMin");
    if (num > 10080) return t("temporaryAccess.durationMax");
    return "";
  };

  const handleGrant = () => {
    if (isCustom) {
      const err = validateCustom(customMinutes);
      if (err) {
        setCustomError(err);
        return;
      }
      grantTemporaryAccess(member.id, Number(customMinutes));
    } else {
      grantTemporaryAccess(member.id, selectedDuration);
    }
    onClose();
  };

  const handleRevoke = () => {
    revokeTemporaryAccess(member.id);
    onClose();
  };

  const isAccessActive =
    member.isElevated && member.accessExpiresAt && member.accessExpiresAt > currentTime;

  const remainingMinutes = isAccessActive && member.accessExpiresAt
    ? Math.max(1, Math.round((member.accessExpiresAt - currentTime) / (1000 * 60)))
    : 0;

  const expirationDateString = isAccessActive && member.accessExpiresAt
    ? new Date(member.accessExpiresAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {t("temporaryAccess.title")}
              </h2>
              <p className="text-xs text-muted">
                {member.name} ({member.role})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Current status display */}
        <div className="mt-4">
          {isAccessActive ? (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-200">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  ● Access Active
                </span>
                <span className="text-xs font-semibold">
                  {t("temporaryAccess.expiresIn", { minutes: remainingMinutes })}
                </span>
              </div>
              <div className="mt-2 text-xs space-y-1">
                <p>
                  <strong>{t("temporaryAccess.expirationTime")}:</strong> {t("temporaryAccess.todayAt", { time: expirationDateString ?? "" })}
                </p>
                <p className="text-emerald-700 dark:text-emerald-300">
                  {t("temporaryAccess.activeDescription")}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface-muted/40 p-4">
              <div className="flex items-start gap-2 text-xs text-muted">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-blue-500" />
                <span>
                  {t("temporaryAccess.grantDescription")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Duration Selection (if granting or extending) */}
        <div className="mt-5 space-y-3">
          <label className="block text-xs font-semibold text-foreground">
            {isAccessActive ? t("temporaryAccess.extendDuration") : t("temporaryAccess.selectDuration")}
          </label>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: t("temporaryAccess.mins60"), mins: 60 },
              { label: t("temporaryAccess.mins120"), mins: 120 },
              { label: t("temporaryAccess.hours24"), mins: 1440 },
            ].map((option) => (
              <button
                key={option.mins}
                type="button"
                onClick={() => {
                  setSelectedDuration(option.mins);
                  setIsCustom(false);
                }}
                className={`rounded-xl border py-2.5 text-xs font-semibold transition ${
                  !isCustom && selectedDuration === option.mins
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                    : "border-border bg-surface text-foreground hover:bg-surface-muted"
                }`}
              >
                {option.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className={`rounded-xl border py-2.5 text-xs font-semibold transition ${
                isCustom
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-border bg-surface text-foreground hover:bg-surface-muted"
              }`}
            >
              Custom
            </button>
          </div>

          {isCustom && (
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-medium text-muted">
                  {t("temporaryAccess.durationLabel")}:
                </label>
                <span className="text-[10px] text-muted">{t("temporaryAccess.maxDays")}</span>
              </div>
              <div className="relative mt-1">
                <Clock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="number"
                  min="5"
                  max="10080"
                  value={customMinutes}
                  onChange={(e) => {
                    setCustomMinutes(e.target.value);
                    if (customError) setCustomError("");
                  }}
                  placeholder={t("temporaryAccess.placeholder")}
                  className={`h-10 w-full rounded-xl border ps-9 pe-3 text-sm text-foreground outline-none transition ${
                    customError
                      ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                      : "border-border bg-surface-muted/30 focus:border-blue-500"
                  }`}
                />
              </div>
              {customError && (
                <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  {customError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          {isAccessActive ? (
            <button
              type="button"
              disabled={!canManageMembers}
              onClick={handleRevoke}
              className="rounded-xl border border-red-500/30 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 disabled:opacity-50"
            >
              {t("temporaryAccess.revoke")}
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-muted"
            >
              {t("temporaryAccess.cancel")}
            </button>
            <button
              type="button"
              disabled={!canManageMembers}
              onClick={handleGrant}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isAccessActive ? t("temporaryAccess.updateDuration") : t("temporaryAccess.grant")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
