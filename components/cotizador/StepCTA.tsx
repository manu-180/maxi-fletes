"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface StepCTAProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Premium primary CTA — button-in-button trailing icon + magnetic hover physics.
 * Mirrors the site-wide Button language (cubic-bezier 0.32,0.72,0,1).
 */
export function StepCTA({
  onClick,
  disabled,
  loading,
  children = "Continuar",
  className,
}: StepCTAProps) {
  const enabled = !disabled && !loading;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      whileTap={enabled ? { scale: 0.98 } : undefined}
      className={cn(
        "group w-full rounded-full pl-7 pr-2.5 py-2.5 inline-flex items-center justify-between gap-3",
        "font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        enabled
          ? "bg-[--brand-500] text-white shadow-lg shadow-[--brand-500]/25 hover:bg-[--brand-600] hover:shadow-xl hover:shadow-[--brand-500]/30"
          : "bg-black/[0.06] text-[--slate-400] cursor-not-allowed",
        className
      )}
    >
      <span className="flex-1 text-center pl-9">
        {loading ? "Un momento…" : children}
      </span>
      <span
        className={cn(
          "grid place-items-center w-9 h-9 rounded-full shrink-0",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          enabled
            ? "bg-white/15 group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105"
            : "bg-black/[0.04]"
        )}
        aria-hidden
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
          />
        ) : (
          <ArrowRight size={16} weight="bold" />
        )}
      </span>
    </motion.button>
  );
}
