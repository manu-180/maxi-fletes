"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Star } from "@phosphor-icons/react";
import { EASE, staggerParent } from "@/lib/motion";
import { TESTIMONIOS } from "@/data/testimonios";
import { cn } from "@/lib/utils";

function Estrellas({ cantidad }: { cantidad: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${cantidad} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} weight={i < cantidad ? "fill" : "regular"} size={15} className={i < cantidad ? "text-(--accent-500)" : "text-(--line-strong)"} />
      ))}
    </div>
  );
}

function Avatar({ nombre }: { nombre: string }) {
  const inicial = nombre[0].toUpperCase();
  return (
    <div
      className="w-11 h-11 rounded-2xl grid place-items-center font-semibold text-[0.95rem] shrink-0 bg-(--brand-50) text-(--brand-700) ring-1 ring-(--brand-100)"
      aria-hidden
    >
      {inicial}
    </div>
  );
}

export function Testimonios() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad bg-(--bg)" id="testimonios" aria-label="Testimonios de clientes">
      <div className="shell">
        {/* Header */}
        <div className="flex flex-col gap-5 mb-14 md:mb-18 max-w-2xl">
          <EyebrowTag>Lo que dicen</EyebrowTag>
          <motion.h2
            className="section-title text-[clamp(2.35rem,4.6vw,3.85rem)]"
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Vecinos que ya se
            <br />
            mudaron con nosotros
          </motion.h2>
          <motion.div
            className="flex items-center gap-3 text-(--slate-600)"
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <Estrellas cantidad={5} />
            <span className="text-sm font-medium">4.8 promedio · cientos de mudanzas en el oeste</span>
          </motion.div>
        </div>

        {/* Muro escalonado de reseñas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start"
          {...(reduce ? {} : staggerParent)}
        >
          {TESTIMONIOS.map((t, i) => (
            <motion.div
              key={t.id}
              className={cn(i % 2 === 1 && "lg:mt-10")}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
              }}
            >
              <SpotlightCard className="relative h-full p-7 flex flex-col gap-5 overflow-hidden">
                {/* Comilla decorativa */}
                <span
                  className="absolute -top-3 right-4 text-[5.5rem] leading-none font-display text-(--brand-500)/[0.08] select-none pointer-events-none"
                  aria-hidden
                >
                  &rdquo;
                </span>

                <Estrellas cantidad={t.estrellas} />

                <p className="text-(--ink) text-[1.02rem] leading-[1.6] flex-1 relative z-10">
                  {t.texto}
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-(--line)">
                  <Avatar nombre={t.nombre} />
                  <div>
                    <p className="text-sm font-semibold text-(--ink)">{t.nombre}</p>
                    <p className="text-xs text-(--slate-400)">{t.zona}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
