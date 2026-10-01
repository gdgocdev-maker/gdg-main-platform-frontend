import Image from "next/image";

type SpeakerCardProps = {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
};

export function SpeakerCard({
  name,
  title,
  bio,
  imageSrc,
}: SpeakerCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div dir="rtl" className="min-w-0 flex-1 text-start">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>

        <p className="mt-1 text-xs text-foreground/80">{title}</p>

        <p className="mt-1 text-xs leading-5 text-foreground/80">{bio}</p>
      </div>
    </div>
  );
}