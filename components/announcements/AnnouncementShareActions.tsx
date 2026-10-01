"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LinkedInGlyph, XMark } from "@/components/layout/BrandMarks";

const iconButton =
  "flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue";

// Share targets are built from the current URL at click time, so the page stays static.
export function AnnouncementShareActions({ title }: { title: string }) {
  const t = useTranslations("announcements.details");
  const [copied, setCopied] = useState(false);

  const openShareWindow = (buildUrl: (pageUrl: string) => string) => {
    window.open(buildUrl(window.location.href), "_blank", "noopener,noreferrer");
  };

  const shareLink = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // The user closed the share sheet; nothing to do.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); leave the UI unchanged.
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{copied ? t("linkCopied") : t("share")}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? t("linkCopied") : ""}
      </span>

      <button
        type="button"
        aria-label={t("shareOnX")}
        className={iconButton}
        onClick={() =>
          openShareWindow(
            (url) =>
              `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          )
        }
      >
        <XMark className="h-3 w-3" />
      </button>

      <button
        type="button"
        aria-label={t("shareOnLinkedIn")}
        className={iconButton}
        onClick={() =>
          openShareWindow(
            (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          )
        }
      >
        <LinkedInGlyph className="h-3 w-3" />
      </button>

      <button type="button" aria-label={t("shareLink")} className={iconButton} onClick={shareLink}>
        <Share2 aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
