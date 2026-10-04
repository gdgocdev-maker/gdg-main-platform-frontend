"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLeaderDashboard } from "./LeaderDashboardContext";
import { leaderCommitteeConfig } from "./committee-config";
import type { MemberRole, MemberStatus } from "./types";
import { X, UserPlus } from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const t = useTranslations("dashboard.leader");
  const { addMember, members, canManageMembers, committee } = useLeaderDashboard();
  const committeeConfig = leaderCommitteeConfig[committee];
  const roleOptions = committeeConfig.memberRoleOptions;
  const roleLabels: Record<MemberRole, string> = {
    Leader: t("members.roles.leader"),
    "Data Analyst": t("members.roles.dataAnalyst"),
    "Data Coordinator": t("members.roles.dataCoordinator"),
    "Event Data Member": t("members.roles.eventDataMember"),
    "Database Member": t("members.roles.databaseMember"),
    "Research Member": t("members.roles.researchMember"),
    "Database Co-Lead": t("members.roles.databaseCoLead"),
    "Public Relations Co-Lead": t("members.roles.publicRelationsCoLead"),
    "Outreach Coordinator": t("members.roles.outreachCoordinator"),
    "Communications Member": t("members.roles.communicationsMember"),
    "Partnerships Member": t("members.roles.partnershipsMember"),
    Member: t("members.roles.member"),
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberRole>(committeeConfig.defaultMemberRole);
  const [status, setStatus] = useState<MemberStatus>("Active");

  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});
  const [generalError, setGeneralError] = useState("");

  const validateNameField = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return t("members.requiredName");
    if (trimmed.length < 3) return t("members.nameMin");
    if (trimmed.length > 100) return t("members.nameMax");
    if (!/^[\p{L}\s.'-]+$/u.test(trimmed)) {
      return t("members.nameFormat");
    }
    return "";
  };

  const validateEmailField = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return t("members.requiredEmail");
    if (trimmed.length > 254) return t("members.emailMax");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return t("members.emailInvalid");
    }
    const isDuplicate = members.some(
      (m) => m.email.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      return t("members.duplicateEmail");
    }
    return "";
  };

  const nameError = touched.name ? validateNameField(name) : "";
  const emailError = touched.email ? validateEmailField(email) : "";

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });

    const nErr = validateNameField(name);
    const eErr = validateEmailField(email);

    if (nErr || eErr) {
      setGeneralError(t("members.formError"));
      return;
    }

    addMember({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      status,
    });

    setName("");
    setEmail("");
    setTouched({});
    setGeneralError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <UserPlus className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{t("members.modalTitle")}</h2>
              <p className="text-xs text-muted">
                {t("members.addDescription", { committee: committeeConfig.name })}
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

        {!canManageMembers && (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
            {t("members.permission")}
          </div>
        )}

        {generalError && (
          <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-foreground">
                {t("members.fullName")} *
              </label>
              <span className="text-[10px] text-muted">
                {name.length}/100
              </span>
            </div>
            <input
              type="text"
              value={name}
              maxLength={100}
              onChange={(e) => {
                setName(e.target.value);
                if (generalError) setGeneralError("");
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              placeholder={t("members.namePlaceholder")}
              className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition ${
                nameError
                  ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                  : "border-border bg-surface-muted/30 focus:border-blue-500"
              }`}
            />
            {nameError && (
              <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {nameError}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-foreground">
                {t("members.universityEmail")}
              </label>
              <span className="text-[10px] text-muted">
                {email.length}/254
              </span>
            </div>
            <input
              type="email"
              value={email}
              maxLength={254}
              onChange={(e) => {
                setEmail(e.target.value);
                if (generalError) setGeneralError("");
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              placeholder={t("members.emailPlaceholder")}
              className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition ${
                emailError
                  ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                  : "border-border bg-surface-muted/30 focus:border-blue-500"
              }`}
            />
            {emailError && (
              <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {emailError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground">
                {t("members.roleLabel")}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as MemberRole)}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-3 text-xs text-foreground outline-none focus:border-blue-500 cursor-pointer"
              >
                {roleOptions.map((memberRole) => (
                  <option key={memberRole} value={memberRole}>{roleLabels[memberRole]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground">
                {t("members.statusLabel")}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MemberStatus)}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-3 text-xs text-foreground outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Active">{t("members.active")}</option>
                <option value="Away">{t("members.away")}</option>
              </select>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-muted transition"
            >
              {t("members.cancel")}
            </button>
            <button
              type="submit"
              disabled={!canManageMembers}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
            >
              {t("members.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
