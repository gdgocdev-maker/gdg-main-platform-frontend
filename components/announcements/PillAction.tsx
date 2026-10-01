import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

// The design's rounded CTA with an arrow disc at the inline end
// (View Details, Apply Now, Join Our Community, empty-state actions).
const variants = {
  dark: {
    pill: "bg-gdg-dark text-[var(--white)] hover:bg-gdg-dark/90",
    disc: "bg-[var(--white)] text-gdg-dark",
  },
  blue: {
    pill: "bg-gdg-blue text-[var(--white)] hover:bg-gdg-blue/90",
    disc: "bg-[var(--white)] text-gdg-blue",
  },
  light: {
    pill: "border border-border bg-[var(--white)] text-gdg-dark hover:bg-gdg-gray-light",
    disc: "bg-gdg-dark text-[var(--white)]",
  },
} as const;

type PillActionProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
} & (
  | { href: ComponentProps<typeof Link>["href"]; external?: false }
  | { href: string; external: true }
  | { onClick: () => void; href?: never; external?: never }
);

export function PillAction(props: PillActionProps) {
  const { children, variant = "dark", className = "" } = props;
  const tone = variants[variant];
  const classes = `inline-flex min-h-10 items-center justify-between gap-3 rounded-full py-1 ps-5 pe-1 text-sm font-medium leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue ${tone.pill} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${tone.disc}`}
      >
        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
      </span>
    </>
  );

  if ("onClick" in props && props.onClick) {
    return (
      <button type="button" onClick={props.onClick} className={classes}>
        {content}
      </button>
    );
  }

  if (props.external) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={props.href!} className={classes}>
      {content}
    </Link>
  );
}
