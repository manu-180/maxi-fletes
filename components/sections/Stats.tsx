"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { EASE, staggerParent } from "@/lib/motion";

const STATS = [
  { end: 18, suffix: " años", label: "en el rubro", big: true },
  { end: 2000, suffix: "+", label: "mudanzas realizadas", big: false },
  { end: 4.8, suffix: "★", label: "promedio en reseñas", big: false, decimals: 1 },
  { end: 7, suffix: " zonas", label: "de cobertura GBA", big: false },
];

export function Stats() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-dark-band py-24 px-4"
      aria-label="Números que nos avalan"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          {...(reduce ? {} : staggerParent)}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center flex flex-col items-center gap-1"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
            >
              {/* Separador vertical — solo entre items en desktop */}
              <div className="relative w-full flex flex-col items-center gap-1">
                <p
                  className="text-4xl md:text-5xl font-semibold text-white leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {reduce ? (
                    <span className="tabular">{stat.end}{stat.suffix}</span>
                  ) : (
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={1800}
                      className="text-4xl md:text-5xl"
                    />
                  )}
                </p>
                <p className="text-[--brand-300] text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-[--brand-900]/60 text-xs mt-10"
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
        >
          ⚠️ Números a confirmar con Maximiliano antes del lanzamiento
        </motion.p>
      </div>
    </section>
  );
}
