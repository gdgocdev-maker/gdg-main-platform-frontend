"use client";

import { events } from "@/data/home";
import { useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import EventCard from "./EventCard";

export default function UpcomingEvents() {
  const [activeEvent, setActiveEvent] = useState(0);

  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = () => {
    if (activeEvent >= events.length - 1) return;

    const nextIndex = activeEvent + 1;

    setActiveEvent(nextIndex);

    eventRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handlePrevious = () => {
    if (activeEvent <= 0) return;

    const previousIndex = activeEvent - 1;

    setActiveEvent(previousIndex);

    eventRefs.current[previousIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <section id="events" className="px-6 py-16 lg:px-10 lg:py-20">
      <h2 className="text-3xl font-bold leading-snug">
        Upcoming Events
      </h2>

      <div className="mt-10 overflow-hidden">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:overflow-x-hidden">
          {events.map((event, index) => (
            <div
              key={event.id}
              ref={(element) => {
                eventRefs.current[index] = element;
              }}
              className="shrink-0 snap-center"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {events.length > 1 && (
        <div className="mt-8 flex justify-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label="Previous event"
            onClick={handlePrevious}
            disabled={activeEvent === 0}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white disabled:cursor-default disabled:opacity-50"
          >
            <GrPrevious />
          </button>

          <button
            type="button"
            aria-label="Next event"
            onClick={handleNext}
            disabled={activeEvent === events.length - 1}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black text-white disabled:cursor-default disabled:opacity-50"
          >
            <GrNext />
          </button>
        </div>
      )}
    </section>
  );
}