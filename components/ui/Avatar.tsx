const sizeClasses = {
  sm: "size-16 text-xl border-4",
  md: "size-28 text-4xl border-6",
  lg: "size-32 sm:size-40 md:size-48 lg:size-[212px] text-4xl sm:text-5xl md:text-6xl lg:text-[96px] border-4 sm:border-6 md:border-8 lg:border-[12px]",
} as const;

type AvatarProps = {
  initials: string;
  imageUrl?: string | null;
  size?: keyof typeof sizeClasses;
  className?: string;
};

export function Avatar({
  initials,
  imageUrl,
  size = "md",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-white bg-avatar-bg font-[family-name:var(--font-heading)] font-semibold text-white ${sizeClasses[size]} ${className}`}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="size-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}
