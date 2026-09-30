import { ArrowRight } from "lucide-react";
import type { Announcement, AnnouncementBlock, RichText } from "@/lib/announcements/types";
import { PillAction } from "./PillAction";

const bulletColors = ["bg-gdg-blue", "bg-gdg-red", "bg-gdg-yellow", "bg-gdg-green"];

function renderRichText(text: RichText) {
  if (typeof text === "string") return text;

  return text.map((run, index) =>
    run.strong ? (
      <strong key={index} className="font-semibold text-foreground">
        {run.text}
      </strong>
    ) : (
      <span key={index}>{run.text}</span>
    ),
  );
}

function Block({ block }: { block: AnnouncementBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-4 text-2xl font-semibold leading-snug text-foreground">{block.text}</h2>
      );
    case "paragraph":
      return <p>{renderRichText(block.text)}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex gap-3">
              <span
                aria-hidden="true"
                className={`mt-2 h-2 w-2 shrink-0 rounded-full ${bulletColors[index % bulletColors.length]}`}
              />
              <span>
                {item.label && (
                  <strong className="font-semibold text-foreground">{item.label}</strong>
                )}
                {item.label && " — "}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="rounded-xl border border-border border-s-4 border-s-gdg-blue bg-surface-muted/60 px-5 py-4">
          <p className="text-sm font-semibold text-foreground">{block.title}</p>
          <p className="mt-1 text-sm">{block.text}</p>
        </aside>
      );
  }
}

// Article body. Falls back to the excerpt when the announcement has no structured body.
export function AnnouncementArticle({ announcement }: { announcement: Announcement }) {
  const { body, excerpt, primaryAction } = announcement;

  return (
    <article className="flex min-w-0 flex-col gap-4 text-base text-gray-500">
      {body?.length ? body.map((block, index) => <Block key={index} block={block} />) : <p>{excerpt}</p>}

      {primaryAction && (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6">
          <PillAction href={primaryAction.href} external>
            {primaryAction.label}
          </PillAction>
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 break-all rounded-sm text-sm font-medium text-gdg-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue"
          >
            {primaryAction.href.replace(/^https?:\/\//, "")}
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
          </a>
        </div>
      )}
    </article>
  );
}
