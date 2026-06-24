"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface StepHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function StepHeader({ eyebrow, title, subtitle }: StepHeaderProps) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="inline-flex items-center rounded-full px-2.5 py-1 mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[--brand-600] bg-[--brand-50] border border-[--brand-100]"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className="text-[1.45rem] font-semibold text-[--ink] leading-[1.15] tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-sm text-[--slate-600] mt-2 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
