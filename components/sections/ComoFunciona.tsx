"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { ArrowUpRight, ChatTeardropText, CurrencyCircleDollar, CheckCircle } from "@phosphor-icons/react";
import { EASE } from "@/lib/motion";

const PASOS = [
  {
    num: "01",
    icon: ChatTeardropText,
    title: "Contanos qué mudás",
    desc: "Usá el cotizador o mandanos un WhatsApp con lo que tenés que mover. Sin papeles, sin turnos.",
    color: "text-[--brand-500]",
    bg: "bg-[--brand-50]",
  },
  {
    num: "02",
    icon: CurrencyCircleDollar,
    title: "Te pasamos el precio",
    desc: "Recibís un estimado al instante, sin compromiso. Si te cierra, coordinamos la fecha y el horario.",
    color: "text-[--safe-500]",
    bg: "bg-[--safe-50]",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "Coordinamos y listo",
    desc: "Vamos en el día y horario que elijas. Cargamos, llevamos y entregamos. Vos, tranquilo.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
] as const;

export function ComoFunciona() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
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

        {/* Steps con línea de progreso vertical */}
        <div className="relative max-w-2xl mx-auto">
          {/* Línea de fondo (gris) */}
          <div
            className="absolute left-[27px] top-10 bottom-10 w-px bg-[--line] hidden sm:block"
            aria-hidden
          />
          {/* Línea de progreso animada */}
          {!reduce && (
            <motion.div
              className="absolute left-[27px] top-10 bottom-10 w-px bg-[--brand-500] hidden sm:block origin-top"
              style={{ scaleY: lineHeight }}
              aria-hidden
            />
          )}

          <ol className="flex flex-col gap-12">
            {PASOS.map(({ num, icon: Icon, title, desc, color, bg }, i) => (
              <motion.li
                key={num}
                className="flex gap-6 sm:gap-8"
                initial={reduce ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              >
                {/* Número + ícono */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className={`w-14 h-14 rounded-2xl grid place-items-center shrink-0 ${bg} ${color} relative z-10`}>
                    <Icon weight="duotone" size={26} />
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-col gap-2 pt-3">
                  <span
                    className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[--slate-400]"
                  >
                    Paso {num}
                  </span>
                  <h3
                    className="text-h3 text-[--ink]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[--slate-600] leading-relaxed">{desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

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
