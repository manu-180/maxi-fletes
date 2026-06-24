"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Calculator, CheckCircle } from "@phosphor-icons/react";
import { EASE } from "@/lib/motion";

const CHECKPOINTS = [
  "Sabés el precio antes de decidir",
  "Sin llamadas, sin esperas",
  "El estimado llega por WhatsApp",
];

export function CotizadorTeaser() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-32 px-4 bg-dark-band"
      id="cotizador"
      aria-label="Cotizador de presupuesto"
    >
      <div className="max-w-6xl mx-auto">
        {/* Card glass doble bisel sobre dark band */}
        <motion.div
          className="rounded-[2rem] p-[1px] border border-white/10 bg-white/5"
          initial={reduce ? {} : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="rounded-[calc(2rem-1px)] bg-white/[0.03] backdrop-blur-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            {/* Izq — texto */}
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <p className="text-eyebrow text-[--brand-300] mb-3">
                  Calculá sin compromiso
                </p>
                <h2
                  className="text-h2 text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ¿Cuánto te sale
                  <br />
                  tu mudanza?
                </h2>
              </div>

              <p className="text-[--brand-300] text-body-lg max-w-md">
                Armá tu presupuesto en 1 minuto. Sin llamar, sin esperar. Te
                damos un estimado al toque y, si te gusta, lo cerramos por
                WhatsApp.
              </p>

              <ul className="flex flex-col gap-3">
                {CHECKPOINTS.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-white text-sm">
                    <CheckCircle weight="fill" size={18} className="text-[--safe-500] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  href="/cotizar"
                  size="lg"
                  icon={<ArrowUpRight weight="regular" size={16} />}
                >
                  Calcular mi presupuesto
                </Button>
              </div>
              <p className="text-[--brand-900]/40 text-xs text-white/40">
                Gratis y sin compromiso. Tardás menos de lo que pensás.
              </p>
            </div>

            {/* Der — preview visual del cotizador */}
            <div className="w-full md:w-80 shrink-0">
              <div className="rounded-2xl p-[1px] border border-white/10 bg-white/5">
                <div className="rounded-[calc(1rem-1px)] bg-white/[0.04] p-6 flex flex-col gap-5">
                  {/* Barra de progreso simulada */}
                  <div>
                    <div className="flex justify-between text-xs text-white/50 mb-2">
                      <span>Tipo de servicio</span>
                      <span>Paso 1 de 4</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div className="h-full w-1/4 rounded-full bg-[--accent-500]" />
                    </div>
                  </div>

                  {/* Preview de opciones */}
                  <p className="text-white text-sm font-medium">¿Qué necesitás mover?</p>
                  <div className="flex flex-col gap-2">
                    {["Mudanza completa", "Flete", "Mini flete"].map((opt, i) => (
                      <div
                        key={opt}
                        className={`rounded-xl px-4 py-3 border text-sm font-medium transition-colors ${
                          i === 0
                            ? "bg-[--brand-500] border-[--brand-500] text-white"
                            : "bg-white/5 border-white/10 text-white/60"
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>

                  {/* Ícono */}
                  <div className="flex items-center gap-2 mt-2">
                    <Calculator weight="duotone" size={16} className="text-[--accent-500]" />
                    <p className="text-white/40 text-xs">Estimado en segundos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
