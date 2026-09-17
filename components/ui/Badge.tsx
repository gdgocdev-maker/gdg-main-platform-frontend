type BadgeProps = {
  label: string;
  className?: string;
};

export function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-chip border border-foreground px-4 py-2.5 text-sm font-medium sm:text-base md:text-lg ${className}`}
    >
      {label}
    </span>
  );
}
