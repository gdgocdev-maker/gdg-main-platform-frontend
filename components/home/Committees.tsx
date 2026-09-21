import CommitteeCard from "./CommitteeCard";
import { committees } from "@/data/home";

export default function Committees() {
  return (
    <section id="committees" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      {/* Section Title */}
      <div className="sticky top-0 z-[100] bg-white py-4 sm:py-6">
        <h2 className="text-start text-3xl font-bold leading-snug text-black">
          Our Committees
        </h2>
      </div>

      {/* Committee Cards */}
      <div className="mx-auto max-w-[915px]">
        {committees.map((committee, index) => (
          <div
            key={committee.id}
            className="sticky top-[92px] mb-6 sm:top-[110px] sm:mb-8 lg:top-[130px]"
            style={{ zIndex: index + 1 }}
          >
            <CommitteeCard committee={committee} />
          </div>
        ))}
      </div>
    </section>
  );
}