"use client";

import { motion } from "framer-motion";

export type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

export function Tabs({ tabs, activeId, onChange, className = "" }: TabsProps) {
  return (
    <div role="tablist" className={`flex gap-6 sm:gap-8 md:gap-10 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative pb-1 text-base font-medium transition-colors sm:text-lg md:text-xl ${
              isActive ? "text-accent-blue" : "text-gray-500"
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="tab-underline"
                className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent-blue"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
