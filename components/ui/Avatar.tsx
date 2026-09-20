const sizeClasses = {
  sm: "size-16 text-xl border-4",
  md: "size-28 text-4xl border-6",
  lg: "size-18 sm:size-22 md:size-26 lg:size-30 text-2xl sm:text-3xl md:text-3xl lg:text-4xl border-4 sm:border-4 md:border-4 lg:border-6",
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
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-white bg-avatar-bg font-semibold text-white ${sizeClasses[size]} ${className}`}
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
