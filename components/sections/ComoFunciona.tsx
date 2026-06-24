"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { ArrowUpRight } from "@phosphor-icons/react";
import { EASE, staggerParent, staggerChild } from "@/lib/motion";

const PASOS = [
  {
    num: "01",
    img: "/images/pasos/paso-1.png",
    title: "Contanos qué mudás",
    desc: "Usá el cotizador o mandanos un WhatsApp con lo que tenés que mover. Sin papeles, sin turnos.",
  },
  {
    num: "02",
    img: "/images/pasos/paso-2.png",
    title: "Te pasamos el precio",
    desc: "Recibís un estimado al instante, sin compromiso. Si te cierra, coordinamos la fecha y el horario.",
  },
  {
    num: "03",
    img: "/images/pasos/paso-3.png",
    title: "Coordinamos y listo",
    desc: "Vamos en el día y horario que elijas. Cargamos, llevamos y entregamos. Vos, tranquilo.",
  },
] as const;

export function ComoFunciona() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden section-pad bg-(--bg-soft)" id="como-funciona" aria-label="Cómo funciona">
      <div className="shell">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20 flex flex-col gap-5">
          <EyebrowTag>Así de fácil</EyebrowTag>
          <motion.h2
            className="section-title text-[clamp(2.35rem,4.6vw,3.85rem)]"
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Tu mudanza en 3 pasos
          </motion.h2>
          <motion.p
            className="text-(--slate-600) text-body-lg max-w-xl"
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            Sin vueltas ni letra chica. Tres pasos y tu mudanza queda
            coordinada.
          </motion.p>
        </div>

        {/* Línea conectora sutil (desktop) */}
        <div className="relative">
          <div
            className="hidden lg:block absolute left-[16.66%] right-[16.66%] top-[120px] h-px pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--line-strong) 0 6px, transparent 6px 14px)",
            }}
            aria-hidden
          />

          <motion.ol
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
            {...(reduce ? {} : staggerParent)}
          >
            {PASOS.map(({ num, img, title, desc }) => (
              <motion.li key={num} {...(reduce ? {} : staggerChild)} className="h-full">
                <SpotlightCard className="group h-full p-5 flex flex-col gap-6">
                  {/* Imagen clay sobre crema (se funde con el render) */}
                  <div className="relative aspect-[4/3] rounded-[1.4rem] overflow-hidden bg-(--bg-warm)">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span
                      className="absolute top-3.5 left-3.5 grid place-items-center h-9 w-9 rounded-full bg-(--ink) text-white text-[0.8rem] font-semibold tabular"
                      style={{ boxShadow: "var(--shadow-md)" }}
                    >
                      {num}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 px-2 pb-2">
                    <h3 className="text-h3 text-(--ink)">{title}</h3>
                    <p className="text-(--slate-600) leading-relaxed text-[0.96rem]">{desc}</p>
                  </div>
                </SpotlightCard>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-16"
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          <Button href="/cotizar" size="lg" icon={<ArrowUpRight weight="bold" size={16} />}>
            Empezá ahora
          </Button>
          <p className="text-sm text-(--slate-400)">Gratis y sin compromiso · Tardás menos de 1 minuto</p>
        </motion.div>
      </div>
    </section>
  );
}
