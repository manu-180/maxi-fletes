"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface ProgressBarProps {
  current: number; // 1–7
  total?: number;
}

export function ProgressBar({ current, total = 7 }: ProgressBarProps) {
  const pct = Math.min(((current - 1) / (total - 1)) * 100, 100);

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <div className="flex justify-between items-baseline mb-2.5">
        <span className="text-[0.68rem] font-semibold text-[--brand-600] uppercase tracking-[0.16em]">
          Paso {current} <span className="text-[--slate-400]">de {total}</span>
        </span>
        <span className="text-[0.68rem] font-semibold text-[--slate-400] tabular">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-[--bg-soft] overflow-visible">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[--brand-600] via-[--brand-500] to-[--brand-400]"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
        </div>
        {/* Glowing tip dot */}
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-[--brand-500] shadow-[0_0_8px_rgba(46,91,224,0.5)]"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: `${pct}%`, opacity: pct > 0 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}
