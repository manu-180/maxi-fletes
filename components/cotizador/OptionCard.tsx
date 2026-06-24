"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import type { ReactNode } from "react";

interface OptionCardProps {
  selected: boolean;
  onSelect: () => void;
  icon?: ReactNode;
  label: string;
  description?: string;
  highlight?: boolean;
  className?: string;
}

export function OptionCard({
  selected,
  onSelect,
  icon,
  label,
  description,
  highlight,
  className,
}: OptionCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className={cn(
        "group w-full text-left rounded-[1.4rem] p-[1.5px] outline-none transition-shadow duration-300",
        selected
          ? "bg-gradient-to-br from-(--brand-400) to-(--brand-600) shadow-lg shadow-(--brand-500)/20"
          : "bg-black/[0.04] ring-1 ring-black/[0.06] hover:shadow-md hover:shadow-black/5",
        highlight && !selected && "ring-(--accent-500)/25",
        className
      )}
      aria-pressed={selected}
    >
      <div className="rounded-[calc(1.4rem-1.5px)] bg-white px-4 py-3.5 flex items-center gap-3.5 min-h-[60px]">
        {icon && (
          <span
            className={cn(
              "w-11 h-11 rounded-[0.9rem] grid place-items-center shrink-0 transition-all duration-300",
              selected
                ? "bg-gradient-to-br from-(--brand-500) to-(--brand-600) text-white shadow-md shadow-(--brand-500)/25"
                : "bg-(--bg-soft) text-(--slate-600) group-hover:bg-(--brand-50) group-hover:text-(--brand-500)"
            )}
          >
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-semibold text-[0.95rem] leading-snug transition-colors duration-200",
              selected ? "text-(--brand-700)" : "text-(--ink)"
            )}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {label}
          </p>
          {description && (
            <p className="text-xs text-(--slate-600) mt-0.5 leading-snug">{description}</p>
          )}
        </div>

        {/* Trailing indicator — check when selected, magnetic arrow on hover */}
        <span className="shrink-0 w-6 h-6 grid place-items-center">
          {selected ? (
            <motion.span
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-(--brand-500) to-(--brand-600) grid place-items-center shadow-sm"
            >
              <Check size={13} weight="bold" className="text-white" />
            </motion.span>
          ) : (
            <span className="w-6 h-6 rounded-full bg-(--bg-soft) grid place-items-center opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight size={12} weight="bold" className="text-(--brand-500)" />
            </span>
          )}
        </span>
      </div>
    </motion.button>
  );
}
