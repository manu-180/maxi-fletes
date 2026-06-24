"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Star } from "@phosphor-icons/react";
import { EASE, staggerParent } from "@/lib/motion";
import { TESTIMONIOS } from "@/data/testimonios";

function Estrellas({ cantidad }: { cantidad: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${cantidad} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          weight={i < cantidad ? "fill" : "regular"}
          size={14}
          className={i < cantidad ? "text-[--accent-500]" : "text-[--line]"}
        />
      ))}
    </div>
  );
}

function AvatarPlaceholder({ nombre }: { nombre: string }) {
  const inicial = nombre[0].toUpperCase();
  const colors = [
    "bg-[--brand-100] text-[--brand-600]",
    "bg-[--safe-50] text-[--safe-500]",
    "bg-orange-50 text-orange-500",
    "bg-purple-50 text-purple-500",
  ];
  const idx = nombre.charCodeAt(0) % colors.length;
  return (
    <div
      className={`w-10 h-10 rounded-full grid place-items-center font-semibold text-sm shrink-0 ${colors[idx]}`}
      aria-hidden
    >
      {inicial}
    </div>
  );
}

export function Testimonios() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-32 px-4 bg-[--bg]"
      id="testimonios"
      aria-label="Testimonios de clientes"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <EyebrowTag>Lo que dicen</EyebrowTag>
          <motion.h2
            className="text-h2 text-[--ink]"
            style={{ fontFamily: "var(--font-display)" }}
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Vecinos que ya se mudaron
            <br />
            con nosotros
          </motion.h2>
          <motion.p
            className="text-[--slate-400] text-sm max-w-xs"
            initial={reduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          >
            ⚠️ Reemplazar con reseñas reales de Maximiliano
          </motion.p>
        </div>

        {/* Grid de testimonios */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          {...(reduce ? {} : staggerParent)}
        >
          {TESTIMONIOS.map((t) => (
            <motion.div
              key={t.id}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
              whileHover={reduce ? {} : { y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {/* Doble bisel */}
              <div className="h-full rounded-[1.75rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5">
                <div className="h-full rounded-[calc(1.75rem-0.375rem)] bg-white p-6 flex flex-col gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  <Estrellas cantidad={t.estrellas} />
                  <p className="text-[--ink] text-[0.9rem] leading-relaxed flex-1">
                    &ldquo;{t.texto}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-[--line]">
                    <AvatarPlaceholder nombre={t.nombre} />
                    <div>
                      <p className="text-sm font-semibold text-[--ink]">{t.nombre}</p>
                      <p className="text-xs text-[--slate-400]">{t.zona}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Link a Google */}
        <motion.div
          className="flex justify-center mt-10"
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-[--slate-600] hover:text-[--brand-500] transition-colors duration-200 border border-[--line] rounded-full px-5 py-2.5 hover:border-[--brand-300]"
          >
            <Star weight="fill" size={14} className="text-[--accent-500]" />
            Ver todas las reseñas en Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
