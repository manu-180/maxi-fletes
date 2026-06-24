"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowUpRight } from "@phosphor-icons/react";
import { EASE, staggerParent, staggerChild } from "@/lib/motion";
import { SERVICIOS } from "@/data/servicios";
import { cn } from "@/lib/utils";

const IMAGES: Record<string, string> = {
  mudanzas: "/images/servicios/mudanzas.webp",
  fletes: "/images/servicios/fletes.webp",
  "mini-fletes": "/images/servicios/mini-fletes.webp",
  embalaje: "/images/servicios/embalaje.webp",
};

// Bento asimétrico (lg:grid-cols-6) — sin tres columnas iguales
const SPANS: Record<string, string> = {
  mudanzas: "lg:col-span-4",
  fletes: "lg:col-span-2",
  "mini-fletes": "lg:col-span-3",
  embalaje: "lg:col-span-3",
};

function CtaLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-(--brand-600) hover:text-(--brand-500) transition-colors duration-300"
    >
      {label}
      <span className="grid place-items-center h-6 w-6 rounded-full bg-(--brand-50) text-(--brand-600) transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
        <ArrowUpRight weight="bold" size={13} />
      </span>
    </Link>
  );
}

export function Servicios() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad bg-(--bg)" id="servicios" aria-label="Nuestros servicios">
      <div className="shell">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-18 flex flex-col gap-5">
          <EyebrowTag>Qué hacemos</EyebrowTag>
          <motion.h2
            className="section-title text-[clamp(2.35rem,4.6vw,3.85rem)]"
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Para mover una cosa,
            <br />o toda la <span className="ink-underline">casa</span>
          </motion.h2>
          <motion.p
            className="text-(--slate-600) text-body-lg max-w-xl"
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            Desde una heladera sola hasta una mudanza de tres ambientes con
            embalaje y armado. Vos elegís cuánto hacemos nosotros.
          </motion.p>
        </div>

        {/* Bento */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5"
          {...(reduce ? {} : staggerParent)}
        >
          {SERVICIOS.map((s) => {
            const img = IMAGES[s.id];
            const isBig = s.highlight;

            return (
              <motion.div
                key={s.id}
                {...(reduce ? {} : staggerChild)}
                className={cn("sm:col-span-2", SPANS[s.id])}
              >
                <SpotlightCard className="group h-full overflow-hidden flex flex-col">
                  <div
                    className={cn(
                      "flex flex-col h-full",
                      isBig && "lg:flex-row"
                    )}
                  >
                    {/* Imagen */}
                    <div
                      className={cn(
                        "relative overflow-hidden shrink-0",
                        isBig
                          ? "aspect-[16/10] lg:aspect-auto lg:w-[46%] lg:min-h-[320px]"
                          : "aspect-[16/10]"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${s.title} — MaxiFletes`}
                        fill
                        className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        sizes={isBig ? "(max-width: 1024px) 100vw, 46vw" : "(max-width: 1024px) 100vw, 33vw"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-(--ink)/20 via-transparent to-transparent pointer-events-none" />
                      {isBig && (
                        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-(--bg)/90 backdrop-blur-sm px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-(--brand-700) shadow-[var(--shadow-sm)]">
                          Lo más pedido
                        </span>
                      )}
                    </div>

                    {/* Contenido */}
                    <div
                      className={cn(
                        "flex flex-col gap-3.5 p-7 flex-1",
                        isBig && "lg:justify-center lg:p-10 lg:gap-5"
                      )}
                    >
                      <h3
                        className={cn(
                          "text-(--ink)",
                          isBig ? "text-[clamp(1.7rem,2.4vw,2.4rem)] font-display font-semibold tracking-[-0.02em] leading-[1.05]" : "text-h3"
                        )}
                      >
                        {s.title}
                      </h3>
                      <p className={cn("text-(--slate-600) leading-relaxed flex-1", isBig ? "text-body-lg max-w-md" : "text-[0.95rem]")}>
                        {s.desc}
                      </p>
                      <div className="pt-1">
                        <CtaLink label={s.cta} href={s.href} />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
