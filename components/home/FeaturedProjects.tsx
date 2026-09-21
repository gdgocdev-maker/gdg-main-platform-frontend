"use client";
import { projects } from "@/data/home";
import { GrNext, GrPrevious } from "react-icons/gr";
import { motion, useAnimationControls } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useLayoutEffect, useRef, useState } from "react";

export default function FeaturedProjects() {
  
  const carouselProjects = [
    ...projects,
    ...projects,
    ...projects,
  ];

  const [activeProject, setActiveProject] = useState(projects.length);

  const controls = useAnimationControls();

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skipAnimation = useRef(false);

  const firstRender = useRef(true);


  useLayoutEffect(() => {
    const activeCard = cardRefs.current[activeProject];

    if (!activeCard) {
      return;
    }

    const targetX = -activeCard.offsetLeft;

    // Initial positioning — no animation.
    if (firstRender.current) {
      controls.set({ x: targetX });
      firstRender.current = false;
      return;
    }

    if (skipAnimation.current) {
      controls.set({ x: targetX });
      skipAnimation.current = false;
      return;
    }

    controls.start({
        x: targetX,
        transition: {
        duration: 0.35,
        ease: "easeOut",
  },
});
  }, [activeProject, controls]);


  const handleNext = () => {
    setActiveProject((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveProject((prev) => prev - 1);
  };

  const selectProject = (projectIndex: number) => {
    const possibleIndexes = [
      projectIndex,
      projects.length + projectIndex,
      projects.length * 2 + projectIndex,
    ];

    const closestIndex = possibleIndexes.reduce((closest, current) => {
      const currentDistance = Math.abs(current - activeProject);
      const closestDistance = Math.abs(closest - activeProject);

      return currentDistance < closestDistance ? current : closest;
    });

    setActiveProject(closestIndex);
  };

  const handleAnimationComplete = () => {
    if (activeProject >= projects.length * 2) {
      skipAnimation.current = true;

      setActiveProject((prev) => prev - projects.length);

      return;
    }

    if (activeProject < projects.length) {
      skipAnimation.current = true;

      setActiveProject((prev) => prev + projects.length);
    }
  };

  return (
    <section id="projects" className="px-8 py-16 lg:px-10 lg:py-20">
      <h2 className="text-3xl font-bold leading-snug">
        Featured Projects
      </h2>

      <div className="mt-10 flex flex-col items-center gap-4">
        {/* Visible carousel area */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex w-max items-center gap-4"
            animate={controls}
            onAnimationComplete={handleAnimationComplete}
          >
            {carouselProjects.map((project, index) => {
              const projectIndex = index % projects.length;

              return (
                <div
                  key={`${project.id}-${index}`}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                >
                  <ProjectCard
                    project={project}
                    isActive={index === activeProject}
                    onSelect={() => selectProject(projectIndex)}
                  />
                </div>
              );
            })}
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