"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const [counts, setCounts] = useState({
    members: 0,
    events: 0,
    projects: 0,
    communities: 0,
  });

  const stats = [
    { key: "members", target: 500 },
    { key: "events", target: 30 },
    { key: "projects", target: 20 },
    { key: "communities", target: 10 },
  ] as const;

  const statsRef = useRef(null);
  const isInView = useInView(statsRef, {
    once: true,
    amount: 0.3,
  });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const startTime = performance.now();

    const animateCounts = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts({
        members: Math.floor(500 * easedProgress),
        events: Math.floor(30 * easedProgress),
        projects: Math.floor(20 * easedProgress),
        communities: Math.floor(10 * easedProgress),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    requestAnimationFrame(animateCounts);
  }, [isInView]);

  return (
    <section id="about" className="p-8 lg:p-10">
      <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-5">
        <div className="max-w-xl">
          <motion.h2
            className="text-3xl font-bold leading-snug"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            About Our Community
          </motion.h2>

          <motion.p
            className="mt-6 text-lg font-normal leading-normal"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: "easeOut",
            }}
          >
            We are a diverse community of people passionate about technology,
            creativity, and learning. We bring together developers, technology
            enthusiasts, creatives, and aspiring professionals to learn,
            exchange ideas, collaborate on projects, and build meaningful
            connections.
          </motion.p>
        </div>

        <div className="relative h-[360px] w-full lg:h-[400px]">
          <motion.img
            src="/images/about-community-1.png"
            alt="About Community Image 1"
            className="absolute top-0 end-0 h-[100px] w-full rounded-xl object-cover lg:h-1/3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />

          <motion.img
            src="/images/about-community-2.png"
            alt="About Community Image 2"
            className="absolute top-[110px] end-0 h-[170px] w-full rounded-xl object-cover lg:top-[140px] lg:h-[200px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: "easeOut",
            }}
          />

          <motion.img
            src="/images/about-community-3.png"
            alt="About Community Image 3"
            className="absolute start-[-10px] top-[190px] h-[130px] w-[42%] rounded-xl border-t-10 border-r-10 border-white object-cover lg:start-[-30px] lg:top-[200px] lg:h-[170px] lg:w-[160px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: 0.24,
              ease: "easeOut",
            }}
          />
        </div>
      </div>

      <div
        ref={statsRef}
        className="mt-10 grid grid-cols-2 gap-4 text-center lg:grid-cols-4"
      >
        <div>
          <h3 className="text-2xl font-bold text-[#EA4335] lg:text-4xl">
            +{counts.members}
          </h3>
          <p className="mt-1 text-lg font-medium leading-normal">Members</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#FFD327] lg:text-4xl">
            +{counts.events}
          </h3>
          <p className="mt-1 text-lg font-medium leading-normal">Events</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#4285F4] lg:text-4xl">
            +{counts.projects}
          </h3>
          <p className="mt-1 text-lg font-medium leading-normal">Projects</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#34A852] lg:text-4xl">
            +{counts.communities}
          </h3>
          <p className="mt-1 text-lg font-medium leading-normal">Communities</p>
        </div>
      </div>
    </section>
  );
}