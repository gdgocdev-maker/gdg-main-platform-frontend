type BadgeProps = {
  label: string;
  className?: string;
};

export function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-chip border border-foreground px-3 py-1.5 text-xs font-medium sm:text-sm ${className}`}
    >
      {label}
    </span>
  );
}
