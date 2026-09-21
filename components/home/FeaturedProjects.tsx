"use client";
import { projects } from "@/data/home";
import { GrNext, GrPrevious } from "react-icons/gr";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(0);
  const visibleProjects = Array.from({ length: 4 }, (_, index) => ({
    project: projects[(activeProject + index) % projects.length],
    index,
  }));

  const handleNext = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const handlePrevious = () => {
    setActiveProject(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  return (
    <section id="projects" className="px-8 py-16 lg:px-10 lg:py-20">
      <h2 className="text-3xl font-bold leading-snug">
        Featured Projects
      </h2>

      <div className="mt-10 flex flex-col items-center gap-4">
        {/* Visible project cards */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            key={activeProject}
            className="contents"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {visibleProjects.map(({ project }) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive
                compact
                onSelect={() => undefined}
              />
            ))}
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <div className="flex shrink-0 gap-4">
          <button
            type="button"
            aria-label="Previous project"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white"
            onClick={handlePrevious}
          >
            <GrPrevious />
          </button>

          <button
            type="button"
            aria-label="Next project"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white"
            onClick={handleNext}
          >
            <GrNext />
          </button>
        </div>
      </div>
    </section>
  );
}