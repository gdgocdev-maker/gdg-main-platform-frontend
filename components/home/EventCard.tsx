"use client";

import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { motion } from "framer-motion";

type Event = {
  id: string;
  image: string;
  name: string;
  date: string;
  time: string;
  location: string;
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="flex h-[415px] w-[310px] shrink-0 flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C4486] to-black p-3 text-white md:h-[430px] md:w-[310px]"
    >
      {/* Event Image */}
      <div className="h-[212px] w-full overflow-hidden rounded-xl">
        <img
          src={event.image}
          alt={event.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Event Info */}
      <div className="flex flex-1 flex-col px-2 pt-4">
        <h3 className="text-2xl font-semibold leading-snug">{event.name}</h3>

        <div className="mt-3 flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm font-normal leading-normal">
            <CiCalendarDate className="h-5 w-5 shrink-0" />
            {event.date}
          </p>

          <p className="flex items-center gap-2 text-sm font-normal leading-normal">
            <IoTimeOutline className="h-5 w-5 shrink-0" />
            {event.time}
          </p>

          <p className="flex items-center gap-2 text-sm font-normal leading-normal">
            <CiLocationOn className="h-5 w-5 shrink-0" />
            {event.location}
          </p>
        </div>

        {/* Register Button */}
        <div className="mt-auto flex justify-end">
          <button
            type="button"
            className="flex h-9 w-[108px] cursor-pointer items-center justify-between rounded-full bg-white px-1 pl-4 text-sm font-medium leading-none text-black"
          >
            <span>Register</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}