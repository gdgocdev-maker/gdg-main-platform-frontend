"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "gdg-member-since";

// There's no auth/database yet, so this simulates an account-creation date by
// recording it in localStorage the first time the profile loads in this browser,
// then reusing that same date on every later visit. Swap for a real "createdAt"
// field from the user's account once auth exists.
function formatNow(): string {
  return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getSnapshot(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    const formatted = formatNow();
    localStorage.setItem(STORAGE_KEY, formatted);
    return formatted;
  } catch {
    return formatNow();
  }
}

function getServerSnapshot(): string {
  return "";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useMemberSince(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
