"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { ArrowUpRight, Truck, Armchair, Package, Warehouse } from "@phosphor-icons/react";
import { EASE, staggerParent, staggerChild } from "@/lib/motion";
import { SERVICIOS } from "@/data/servicios";
import { cn } from "@/lib/utils";

const ICONS = {
  mudanzas: Warehouse,
  fletes: Truck,
  "mini-fletes": Armchair,
  embalaje: Package,
};

const COLORS = {
  mudanzas: { bg: "bg-[--brand-500]", text: "text-white" },
  fletes: { bg: "bg-[--brand-50]", text: "text-[--brand-500]" },
  "mini-fletes": { bg: "bg-orange-50", text: "text-orange-500" },
  embalaje: { bg: "bg-[--safe-50]", text: "text-[--safe-500]" },
};

export function Servicios() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-32 px-4 bg-[--bg]"
      id="servicios"
      aria-label="Nuestros servicios"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <EyebrowTag>Qué hacemos</EyebrowTag>
          <motion.h2
            className="text-h2 text-[--ink]"
            style={{ fontFamily: "var(--font-display)" }}
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Para mover una cosa
            <br />o toda la casa
          </motion.h2>
        </div>

        {/* ─── Asymmetrical Bento ─── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
          {...(reduce ? {} : staggerParent)}
        >
          {SERVICIOS.map((servicio) => {
            const Icon = ICONS[servicio.id];
            const colors = COLORS[servicio.id];

            return (
              <motion.div
                key={servicio.id}
                {...(reduce ? {} : staggerChild)}
                className={cn(
                  servicio.highlight && "md:col-span-2 lg:col-span-2"
                )}
              >
                {/* Doble bisel */}
                <motion.div
                  whileHover={reduce ? {} : { y: -5 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="h-full rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5 group"
                >
                  <div
                    className={cn(
                      "h-full rounded-[calc(2rem-0.375rem)] bg-white p-8 flex flex-col justify-between gap-8",
                      "shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_8px_rgba(12,18,34,0.04)]",
                      servicio.highlight && "min-h-[260px]"
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Ícono */}
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl grid place-items-center shrink-0",
                          colors.bg,
                          colors.text
                        )}
                      >
                        <Icon weight="duotone" size={24} />
                      </div>
                      {/* Título + desc */}
                      <div className="flex flex-col gap-2">
                        <h3
                          className={cn(
                            "text-[--ink]",
                            servicio.highlight ? "text-h3 text-2xl" : "text-h3"
                          )}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {servicio.title}
                        </h3>
                        <p className="text-[--slate-600] leading-relaxed text-[0.95rem]">
                          {servicio.desc}
                        </p>
                      </div>
                    </div>

                    {/* CTA link */}
                    <Link
                      href={servicio.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-sm font-semibold",
                        "text-[--brand-600] hover:text-[--brand-500]",
                        "transition-colors duration-200 group/link"
                      )}
                    >
                      {servicio.cta}
                      <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        <ArrowUpRight weight="bold" size={14} />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
