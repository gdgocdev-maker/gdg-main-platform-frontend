"use client";

import { motion } from "framer-motion";

type Project = {
  id: string;
  img: string;
  projectName: string;
  description: string;
  madeBy: string;
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="flex h-[415px] w-[310px] shrink-0 flex-col overflow-hidden rounded-4xl bg-gradient-to-b from-[#DE8B8B] to-[#6D95C0] p-3 text-white md:h-[430px] md:w-[310px]"
    >
      {/* Project Image */}
      <div className="h-[212px] w-full overflow-hidden rounded-4xl">
        <img
          src={project.img}
          alt={project.projectName}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Project Info */}
      <div className="flex flex-1 flex-col px-2 pt-4">
        <h3 className="text-2xl font-semibold leading-snug">
          {project.projectName}
        </h3>

        <p className="mt-3 line-clamp-3 text-justify text-base font-normal leading-normal">
          {project.description}
        </p>

        <p className="mt-2 text-sm font-normal leading-normal">
          Made By {project.madeBy}
        </p>

        {/* View Project Button */}
        <div className="mt-auto flex justify-end">
          <button
            type="button"
            className="flex h-9 w-[135px] cursor-pointer items-center justify-between rounded-full bg-white px-1 pl-4 text-sm font-medium leading-none text-black"
          >
            <span>View Project</span>

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