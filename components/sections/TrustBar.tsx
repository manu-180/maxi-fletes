"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ShieldCheck, Users, MapPin, CreditCard } from "@phosphor-icons/react";
import { EASE } from "@/lib/motion";

const ITEMS = [
  { icon: ShieldCheck, text: "Seguro de carga incluido" },
  { icon: Users, text: "Choferes y ayudantes propios" },
  { icon: MapPin, text: "Cobertura en toda la zona oeste" },
  { icon: CreditCard, text: "Pagás recién al confirmar" },
];

export function TrustBar() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-6 border-y border-(--line) bg-white overflow-hidden"
      aria-label="Señales de confianza"
    >
      <div className="shell">
        <motion.div
          className="flex flex-wrap justify-center gap-x-8 gap-y-3"
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {ITEMS.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              className="flex items-center gap-2 text-sm text-(--slate-600)"
              initial={reduce ? {} : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            >
              <Icon weight="duotone" size={16} className="text-(--brand-500) shrink-0" />
              <span className="font-medium">{text}</span>
              {i < ITEMS.length - 1 && (
                <span className="hidden sm:inline ml-4 w-px h-4 bg-(--line)" aria-hidden />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
