"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { EASE, staggerParent } from "@/lib/motion";

const STATS = [
  { end: 18, suffix: " años", label: "moviendo el oeste", decimals: 0 },
  { end: 2000, suffix: "+", label: "mudanzas hechas", decimals: 0 },
  { end: 4.8, suffix: "★", label: "promedio en reseñas", decimals: 1 },
  { end: 7, suffix: " zonas", label: "de cobertura GBA", decimals: 0 },
];

export function Stats() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-(--brand-950) border-t border-white/5 py-20 md:py-24"
      aria-label="Números que nos respaldan"
    >
      <div className="shell">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10"
          {...(reduce ? {} : staggerParent)}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative flex flex-col items-center text-center gap-1.5 px-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
            >
              {/* Divisor vertical (desktop) */}
              {i > 0 && (
                <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" aria-hidden />
              )}
              <p
                className="text-[2.75rem] md:text-[3.4rem] font-semibold text-white leading-none tabular"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                {reduce ? (
                  <span>
                    {stat.decimals ? stat.end.toFixed(stat.decimals) : stat.end}
                    {stat.suffix}
                  </span>
                ) : (
                  <CountUp end={stat.end} suffix={stat.suffix} duration={1800} decimals={stat.decimals} />
                )}
              </p>
              <p className="text-[#aebbe6] text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
