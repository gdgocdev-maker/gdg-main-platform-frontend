"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SelectProps = {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
};

export function Select({
  value,
  options,
  onChange,
  placeholder = "Select…",
  error,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 border-0 border-b border-dashed bg-transparent py-0.5 text-sm font-semibold outline-none sm:text-base ${
          error ? "border-brand-red" : "border-gray-350"
        } ${value ? "text-foreground" : "font-normal text-gray-300"}`}
      >
        <span className="max-w-56 truncate text-left sm:max-w-64">
          {value || placeholder}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute right-0 z-20 mt-2 max-h-64 w-72 overflow-y-auto rounded-xl border border-gray-350 bg-white p-1.5 shadow-lg"
          >
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-cream/60 ${
                      isSelected
                        ? "font-semibold text-accent-blue"
                        : "text-foreground"
                    }`}
                  >
                    <span className="truncate">{option}</span>
                    {isSelected && <Check className="size-4 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
