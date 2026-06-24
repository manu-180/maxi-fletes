"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Tag, Lightning, Package } from "@phosphor-icons/react";
import { EASE, staggerParent, staggerChild } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PILARES = [
  {
    icon: Tag,
    title: "Sin sorpresas en el precio",
    desc: "Te decimos cuánto sale antes de mover un solo mueble. El presupuesto que ves es el que pagás.",
    accentClass: "bg-[--brand-50] text-[--brand-500]",
  },
  {
    icon: Lightning,
    title: "Cuando lo necesitás",
    desc: "Coordinamos rápido y nos adaptamos a tu fecha. ¿Es urgente? Escribinos — casi siempre llegamos.",
    accentClass: "bg-[--safe-50] text-[--safe-500]",
  },
  {
    icon: Package,
    title: "Cuidamos cada cosa",
    desc: "Embalamos, cargamos y trasladamos con cuidado profesional. Tus muebles llegan como salieron.",
    accentClass: "bg-orange-50 text-orange-500",
  },
] as const;

export function ValueProps() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-32 px-4 bg-[--bg-soft]"
      id="propuesta"
      aria-label="Por qué elegirnos"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <EyebrowTag>Por qué elegirnos</EyebrowTag>
          <motion.h2
            className="text-h2 text-[--ink]"
            style={{ fontFamily: "var(--font-display)" }}
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

        {/* Grid de pilares */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          {...(reduce ? {} : staggerParent)}
        >
          {PILARES.map(({ icon: Icon, title, desc, accentClass }) => (
            <motion.div
              key={title}
              {...(reduce ? {} : staggerChild)}
              whileHover={reduce ? {} : { y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5 cursor-default"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 h-full flex flex-col gap-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_8px_rgba(12,18,34,0.04)]">
                {/* Ícono */}
                <div className={cn("w-12 h-12 rounded-2xl grid place-items-center", accentClass)}>
                  <Icon weight="duotone" size={24} />
                </div>
                {/* Texto */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-h3 text-[--ink]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[--slate-600] leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
