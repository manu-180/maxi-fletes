"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { ArrowUpRight } from "@phosphor-icons/react";
import { EASE, staggerParent, staggerChild } from "@/lib/motion";

const PASOS = [
  {
    num: "01",
    img: "/images/como-funciona/paso1-cotiza.png",
    alt: "Calculá tu presupuesto de flete online",
    title: "Contanos qué mudás",
    desc: "Usá el cotizador o mandanos un WhatsApp con lo que tenés que mover. Sin papeles, sin turnos.",
  },
  {
    num: "02",
    img: "/images/como-funciona/paso2-confirma.png",
    alt: "Confirmá el precio del flete al instante",
    title: "Te pasamos el precio",
    desc: "Recibís un estimado al instante, sin compromiso. Si te cierra, coordinamos la fecha y el horario.",
  },
  {
    num: "03",
    img: "/images/como-funciona/paso3-mudanza.png",
    alt: "El camión llega y realiza la mudanza",
    title: "Coordinamos y listo",
    desc: "Vamos en el día y horario que elijas. Cargamos, llevamos y entregamos. Vos, tranquilo.",
  },
] as const;

export function ComoFunciona() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-32 px-4 bg-[--bg-soft]"
      id="como-funciona"
      aria-label="Cómo funciona"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <EyebrowTag>Así de fácil</EyebrowTag>
          <motion.h2
            className="text-h2 text-[--ink]"
            style={{ fontFamily: "var(--font-display)" }}
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Tu mudanza en 3 pasos
          </motion.h2>
        </div>

        {/* Cards con ilustración */}
        <motion.ol
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          {...(reduce ? {} : staggerParent)}
        >
          {/* Línea conectora entre cards — solo desktop */}
          <div
            className="absolute hidden md:block top-[88px] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-[--line]"
            aria-hidden
          />

          {PASOS.map(({ num, img, alt, title, desc }) => (
            <motion.li
              key={num}
              {...(reduce ? {} : staggerChild)}
              className="flex flex-col gap-0"
            >
              {/* Card con doble bisel */}
              <div className="rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5 h-full">
                <div className="rounded-[calc(2rem-0.375rem)] bg-white overflow-hidden flex flex-col h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_8px_rgba(12,18,34,0.04)]">
                  {/* Ilustración */}
                  <div className="relative aspect-square bg-[--bg-soft] overflow-hidden">
                    <Image
                      src={img}
                      alt={alt}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Badge número */}
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[--brand-500] text-white text-sm font-bold grid place-items-center shadow-[0_4px_12px_rgba(46,91,224,0.35)]">
                      {num}
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="p-6 flex flex-col gap-2">
                    <h3
                      className="text-h3 text-[--ink]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-[--slate-600] leading-relaxed text-[0.95rem]">{desc}</p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-16"
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          <Button
            href="/cotizar"
            size="lg"
            icon={<ArrowUpRight weight="regular" size={16} />}
          >
            Empezá ahora
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
