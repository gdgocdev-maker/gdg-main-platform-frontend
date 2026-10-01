"use client";

import { useState } from "react";
import { useLeaderDashboard } from "./LeaderDashboardContext";
import { Check, Shield, Bell, Save } from "lucide-react";

export function SettingsSection() {
  const { canManageSettings } = useLeaderDashboard();

  const [committeeName, setCommitteeName] = useState("Data Analysis Committee");
  const [description, setDescription] = useState(
    "Focuses on data science, AI workflows, predictive models, database administration, and analytics for GDG on Campus UJ activities."
  );
  const [notifyOnSubmission, setNotifyOnSubmission] = useState(true);
  const [autoApproveMembers, setAutoApproveMembers] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [touched, setTouched] = useState<{ name?: boolean; description?: boolean }>({});
  const [generalError, setGeneralError] = useState("");

  const validateName = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Committee name is required.";
    if (trimmed.length < 3) return "Committee name must be at least 3 characters.";
    if (trimmed.length > 100) return "Committee name cannot exceed 100 characters.";
    return "";
  };

  const validateDesc = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Description is required.";
    if (trimmed.length < 10) return "Description must be at least 10 characters.";
    if (trimmed.length > 500) return "Description cannot exceed 500 characters.";
    return "";
  };

  const nameError = touched.name ? validateName(committeeName) : "";
  const descError = touched.description ? validateDesc(description) : "";

  const handleSave = () => {
    setTouched({ name: true, description: true });
    const nErr = validateName(committeeName);
    const dErr = validateDesc(description);

    if (nErr || dErr) {
      setGeneralError("Please fix the validation errors before saving settings.");
      return;
    }

    setGeneralError("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
          <Check className="size-4 text-emerald-600" />
          <span>Committee configuration saved successfully.</span>
        </div>
      )}

      {generalError && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-50/20 p-4 text-xs text-rose-600 dark:bg-rose-950/20 dark:text-rose-400">
          {generalError}
        </div>
      )}

      {/* Committee Profile */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xs">
        <h3 className="text-base font-bold text-foreground">
          Committee Information
        </h3>
        <p className="text-xs text-muted">
          Update the profile and primary focus of the Data Analysis workspace.
        </p>

        <div className="mt-5 space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-foreground">
                Committee Name *
              </label>
              <span className="text-[10px] text-muted">
                {committeeName.length}/100
              </span>
            </div>
            <input
              type="text"
              value={committeeName}
              maxLength={100}
              onChange={(e) => {
                setCommitteeName(e.target.value);
                if (generalError) setGeneralError("");
              }}
              onBlur={() => setTouched((p) => ({ ...p, name: true }))}
              disabled={!canManageSettings}
              className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition disabled:opacity-60 ${
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

          <div>
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-foreground">
                Description *
              </label>
              <span className="text-[10px] text-muted">
                {description.length}/500
              </span>
            </div>
            <textarea
              rows={3}
              value={description}
              maxLength={500}
              onChange={(e) => {
                setDescription(e.target.value);
                if (generalError) setGeneralError("");
              }}
              onBlur={() => setTouched((p) => ({ ...p, description: true }))}
              disabled={!canManageSettings}
              className={`mt-1 w-full rounded-xl border p-3 text-sm text-foreground outline-none transition disabled:opacity-60 ${
                descError
                  ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                  : "border-border bg-surface-muted/30 focus:border-blue-500"
              }`}
            />
            {descError && (
              <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {descError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Leadership & Permissions */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-blue-500" />
          <h3 className="text-base font-bold text-foreground">
            Leadership & Access Policy
          </h3>
        </div>
        <p className="text-xs text-muted">
          Review who holds permanent and temporary administrative privileges.
        </p>

        <div className="mt-4 space-y-3 text-xs">
          <div className="flex items-center justify-between rounded-xl border border-border/80 p-3">
            <div>
              <span className="font-bold text-foreground block">Shahad</span>
              <span className="text-muted block text-[11px]">Primary Committee Leader</span>
            </div>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Leader
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border/80 p-3">
            <div>
              <span className="font-bold text-foreground block">Lina Saleh</span>
              <span className="text-muted block text-[11px]">Co-Leader & Database Administrator</span>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Co-Leader
            </span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-blue-500" />
          <h3 className="text-base font-bold text-foreground">
            Notification & Approval Preferences
          </h3>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="font-semibold text-foreground block">
                Notify on new event submissions
              </span>
              <span className="text-muted text-[11px]">
                Receive instant dashboard alerts when committee members submit drafts.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyOnSubmission}
              onChange={(e) => setNotifyOnSubmission(e.target.checked)}
              disabled={!canManageSettings}
              className="size-4 accent-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer border-t border-border/60 pt-3">
            <div>
              <span className="font-semibold text-foreground block">
                Allow self-assignment of committee tasks
              </span>
              <span className="text-muted text-[11px]">
                Members can claim open tasks from the Notion task board.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoApproveMembers}
              onChange={(e) => setAutoApproveMembers(e.target.checked)}
              disabled={!canManageSettings}
              className="size-4 accent-blue-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      {canManageSettings && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <Save className="size-4" />
            <span>Save Settings</span>
          </button>
        </div>
      )}
    </div>
  );
}
