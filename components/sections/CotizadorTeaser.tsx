"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowUpRight, CheckCircle, WhatsappLogo, Check } from "@phosphor-icons/react";
import { EASE } from "@/lib/motion";

const CHECKPOINTS = [
  "Sabés el precio antes de decidir",
  "Sin llamadas, sin esperas",
  "El estimado llega por WhatsApp",
];

const OPCIONES = ["Mudanza completa", "Flete", "Mini flete"];

export function CotizadorTeaser() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad bg-dark-band" id="cotizador" aria-label="Cotizador de presupuesto">
      <div className="shell">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <SpotlightCard dark className="p-8 md:p-14 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Izq — texto */}
              <div className="flex-1 flex flex-col gap-6 w-full">
                <EyebrowTag className="kicker-light">Calculá sin compromiso</EyebrowTag>
                <h2
                  className="text-white text-[clamp(2.25rem,4.4vw,3.6rem)] font-display font-semibold tracking-[-0.025em] leading-[1.02]"
                >
                  ¿Cuánto te sale
                  <br />
                  tu mudanza?
                </h2>

                <p className="text-[#c3cdee] text-body-lg max-w-md">
                  Armá tu presupuesto en 1 minuto. Sin llamar, sin esperar. Te
                  damos un estimado al toque y, si te gusta, lo cerramos por
                  WhatsApp.
                </p>

                <ul className="flex flex-col gap-3 mt-1">
                  {CHECKPOINTS.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/90 text-[0.97rem]">
                      <CheckCircle weight="fill" size={20} className="text-(--safe-500) shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <Button href="/cotizar" size="lg" icon={<ArrowUpRight weight="bold" size={16} />}>
                    Calcular mi presupuesto
                  </Button>
                </div>
              </div>

              {/* Der — mock premium del cotizador */}
              <div className="w-full lg:w-[22rem] shrink-0">
                <div className="rounded-[1.6rem] bg-white/[0.06] border border-white/10 p-5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]">
                  {/* Top */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-(--safe-500) shadow-[0_0_0_3px_rgba(24,169,87,0.18)]" aria-hidden />
                      <span className="text-white/70 text-xs font-medium tracking-wide">Tu presupuesto · en vivo</span>
                    </div>
                    <span className="text-white/40 text-[0.7rem] tabular">Paso 1 de 4</span>
                  </div>

                  {/* Progreso */}
                  <div className="h-1.5 rounded-full bg-white/10 mb-6 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-(--accent-400) to-(--accent-500)"
                      initial={reduce ? { width: "25%" } : { width: 0 }}
                      whileInView={{ width: "25%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                    />
                  </div>

                  <p className="text-white text-sm font-medium mb-3">¿Qué necesitás mover?</p>
                  <div className="flex flex-col gap-2.5">
                    {OPCIONES.map((opt, i) => (
                      <div
                        key={opt}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium border transition-colors ${
                          i === 0
                            ? "bg-(--brand-500) border-(--brand-400) text-white shadow-[0_8px_24px_-6px_rgba(46,91,224,0.6)]"
                            : "bg-white/[0.04] border-white/10 text-white/55"
                        }`}
                      >
                        {opt}
                        {i === 0 && (
                          <span className="grid place-items-center h-5 w-5 rounded-full bg-white/20">
                            <Check weight="bold" size={12} className="text-white" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Resultado teaser */}
                  <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3">
                    <WhatsappLogo weight="fill" size={18} className="text-(--safe-500) shrink-0" />
                    <span className="text-white/75 text-[0.8rem] leading-tight">
                      Estimado al instante, directo a tu WhatsApp
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
