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
  isActive: boolean;
  onSelect: () => void;
};

export default function ProjectCard({
  project,
  isActive,
  onSelect,
}: ProjectCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isActive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <motion.div
      onClick={!isActive ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      role={!isActive ? "button" : undefined}
      tabIndex={!isActive ? 0 : undefined}
      className={`shrink-0 overflow-hidden rounded-[28px] border border-black bg-gradient-to-b from-[#DE8B8B] to-[#6D95C0] ${
        isActive
          ? "flex h-[340px] w-[240px] flex-col md:h-[360px] md:w-[320px] xl:h-[280px] xl:w-[600px] xl:flex-row"
          : "h-[320px] w-[70px] md:h-[360px] md:w-[90px] xl:h-[280px] xl:w-[150px]"
      }`}
    >
      {/* Image */}
      <div
        className={`shrink-0 ${
          isActive
            ? "h-[160px] w-full p-3 pb-0 md:h-[190px] xl:h-[280px] xl:w-[280px] xl:p-0"
            : "h-[320px] w-[70px] md:h-[360px] md:w-[90px] xl:h-[280px] xl:w-[150px]"
        }`}
      >
        <div className="h-full w-full overflow-hidden rounded-[20px]">
          <img
            src={project.img}
            alt={project.projectName}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      {isActive && (
        <div className="flex flex-1 flex-col justify-center gap-3 px-3 pb-4 pt-2 md:gap-4 md:px-4 xl:gap-7 xl:px-8 xl:py-8">
          <h2 className="text-2xl font-semibold leading-snug text-white">
            {project.projectName}
          </h2>

          <p className="text-base font-normal leading-normal text-white">
            {project.description}
          </p>

          <p className="text-sm font-normal leading-normal text-white">
            Made By {project.madeBy}
          </p>

          <div>
            <button
              type="button"
              className="flex h-8 w-[115px] cursor-pointer items-center justify-between rounded-full bg-white px-1 pl-3 text-sm font-medium leading-none text-black md:h-9 md:w-[125px] xl:h-[52px] xl:w-[180px] xl:px-2 xl:pl-6"
            >
              <span>view project</span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black md:h-7 md:w-7 xl:h-10 xl:w-10">
                <svg
                  className="h-4 w-4 md:h-5 md:w-5 xl:h-8 xl:w-8"
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
      )}
    </motion.div>
  );
}