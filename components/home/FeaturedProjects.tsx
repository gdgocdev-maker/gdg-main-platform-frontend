"use client";

import { projects } from "@/data/home";
import { useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  // Mobile / Tablet
  const [activeProject, setActiveProject] = useState(0);

  // Desktop
  const [desktopStart, setDesktopStart] = useState(0);

  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Desktop: show 4 projects without repeating
  const visibleProjects = projects.slice(
    desktopStart,
    desktopStart + 4
  );

  // Mobile / Tablet
  const handleMobileNext = () => {
    if (activeProject >= projects.length - 1) return;

    const nextIndex = activeProject + 1;

    setActiveProject(nextIndex);

    projectRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleMobilePrevious = () => {
    if (activeProject <= 0) return;

    const previousIndex = activeProject - 1;

    setActiveProject(previousIndex);

    projectRefs.current[previousIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  // Desktop
  const handleDesktopNext = () => {
    if (desktopStart >= projects.length - 4) return;

    setDesktopStart((prev) => prev + 1);
  };

  const handleDesktopPrevious = () => {
    if (desktopStart <= 0) return;

    setDesktopStart((prev) => prev - 1);
  };

  return (
    <section id="projects" className="px-6 py-16 lg:px-10 lg:py-20">
      <h2 className="text-3xl font-bold leading-snug">
        Featured Projects
      </h2>

      {/* Mobile / Tablet */}
      <div className="mt-10 overflow-hidden lg:hidden">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(element) => {
                projectRefs.current[index] = element;
              }}
              className="shrink-0 snap-center"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Mobile / Tablet arrows */}
        {projects.length > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={handleMobilePrevious}
              disabled={activeProject === 0}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white disabled:cursor-default disabled:opacity-50"
            >
              <GrPrevious />
            </button>

            <button
              type="button"
              aria-label="Next project"
              onClick={handleMobileNext}
              disabled={activeProject === projects.length - 1}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black text-white disabled:cursor-default disabled:opacity-50"
            >
              <GrNext />
            </button>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="mt-10 hidden lg:block">
        <div className="flex gap-4">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        {/* Desktop arrows */}
        {projects.length > 4 && (
          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={handleDesktopPrevious}
              disabled={desktopStart === 0}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white disabled:cursor-default disabled:opacity-50"
            >
              <GrPrevious />
            </button>

            <button
              type="button"
              aria-label="Next project"
              onClick={handleDesktopNext}
              disabled={desktopStart >= projects.length - 4}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white disabled:cursor-default disabled:opacity-50"
            >
              <GrNext />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}