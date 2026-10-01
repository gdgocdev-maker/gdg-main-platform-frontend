import Image from "next/image";
import { SpeakerCard } from "./SpeakerCard";

export type EventInfoData = {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  speaker: {
    name: string;
    title: string;
    bio: string;
    imageSrc: string;
  };
};

type EventInfoProps = {
  event: EventInfoData;
};

export function EventInfo({ event }: EventInfoProps) {
  return (
    <section className="bg-surface-muted px-2 py-3 sm:px-4 lg:px-5 lg:py-7">
      <div className="mx-auto flex w-full max-w-xl flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={event.imageSrc}
            alt={event.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </div>

        <div dir="rtl" className="mt-4 text-start">
          <h1 className="text-xl font-semibold leading-[1.5] text-foreground sm:text-2xl">
            {event.name}
          </h1>

          <p className="mt-3 text-sm leading-6 text-foreground/80">
            {event.description}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-surface sm:grid-cols-3">
          <div className="px-3 py-3 text-start">
            <p className="font-semibold text-foreground">Date</p>
            <p className="mt-1 whitespace-nowrap text-xs text-foreground/80">
              {event.date}
            </p>
          </div>

          <div className="border-border px-3 py-3 text-start sm:border-s">
            <p className="font-semibold text-foreground">Time</p>
            <p className="mt-1 whitespace-nowrap text-xs text-foreground/80">
              {event.time}
            </p>
          </div>

          <div className="border-border px-3 py-3 text-start sm:border-s">
            <p className="font-semibold text-foreground">Location</p>
            <p className="mt-1 whitespace-nowrap text-xs text-foreground/80">
              {event.location}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-start text-sm font-semibold text-foreground">
            Speaker
          </p>

          <SpeakerCard
            name={event.speaker.name}
            title={event.speaker.title}
            bio={event.speaker.bio}
            imageSrc={event.speaker.imageSrc}
          />
        </div>
      </div>
    </section>
  );
}