"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { EASE, staggerParent, staggerChild } from "@/lib/motion";

const PILARES = [
  {
    num: "01",
    title: "Sin sorpresas en el precio",
    desc: "Te decimos cuánto sale antes de mover un solo mueble. El presupuesto que ves es el que pagás.",
    foot: "Precio cerrado",
  },
  {
    num: "02",
    title: "Cuando lo necesitás",
    desc: "Coordinamos rápido y nos adaptamos a tu fecha. ¿Es urgente? Escribinos: casi siempre llegamos.",
    foot: "Coordinación ágil",
  },
  {
    num: "03",
    title: "Cuidamos cada cosa",
    desc: "Embalamos, cargamos y trasladamos con criterio profesional. Tus muebles llegan como salieron.",
    foot: "Embalaje incluido",
  },
] as const;

export function ValueProps() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad bg-(--bg-soft)" id="propuesta" aria-label="Por qué elegirnos">
      <div className="shell">
        {/* Header editorial — asimétrico, alineado a la izquierda */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-x-12 gap-y-6 items-end mb-14 md:mb-20">
          <div className="flex flex-col gap-5">
            <EyebrowTag>Por qué elegirnos</EyebrowTag>
            <motion.h2
              className="section-title text-[clamp(2.35rem,4.6vw,3.85rem)]"
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              Tres razones que nos
              <br />
              diferencian del resto
            </motion.h2>
          </div>
          <motion.p
            className="text-(--slate-600) text-body-lg max-w-md lg:pb-2"
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            Mudás con un equipo que hace esto desde 2008. Sin sustos, sin
            improvisar y sin esa sensación de estar entregando tus cosas a
            cualquiera.
          </motion.p>
        </div>

        {/* Grid de pilares — cards spotlight sin ícono */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
          {...(reduce ? {} : staggerParent)}
        >
          {PILARES.map(({ num, title, desc, foot }) => (
            <motion.div key={num} {...(reduce ? {} : staggerChild)} className="h-full">
              <SpotlightCard className="h-full p-8 lg:p-9 flex flex-col gap-7">
                <span className="card-index">{num}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-h3 text-(--ink)">{title}</h3>
                  <p className="text-(--slate-600) leading-relaxed">{desc}</p>
                </div>
                <div className="mt-auto pt-6 flex items-center gap-2.5 border-t border-(--line)">
                  <span className="h-1.5 w-1.5 rounded-full bg-(--accent-500)" aria-hidden />
                  <span className="text-eyebrow text-(--slate-400)">{foot}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
