"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { MapPin, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { EASE, staggerParent } from "@/lib/motion";
import { ZONAS } from "@/data/zonas";
import { cn } from "@/lib/utils";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000";

export function Cobertura() {
  const reduce = useReducedMotion();
  const chip = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <section className="section-pad bg-(--bg-soft)" id="cobertura" aria-label="Zonas de cobertura">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-20 items-center">
          {/* ─── Izq: texto + mapa premium ─── */}
          <div className="flex flex-col gap-6">
            <EyebrowTag>Dónde llegamos</EyebrowTag>
            <motion.h2
              className="section-title text-[clamp(2.35rem,4.6vw,3.85rem)]"
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              Estamos en toda
              <br />
              la zona oeste
            </motion.h2>
            <motion.p
              className="text-(--slate-600) text-body-lg max-w-md"
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              Base en Morón y salida a todo el oeste. Si tu barrio no está en la
              lista, escribinos: casi siempre llegamos igual.
            </motion.p>

            {/* Mapa enmarcado — doble bisel premium */}
            <motion.div
              className="rounded-[1.9rem] p-1.5 bg-(--bg) ring-1 ring-(--line) shadow-[var(--shadow-md)] mt-2"
              initial={reduce ? {} : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            >
              <div className="relative rounded-[1.5rem] overflow-hidden aspect-[16/10]">
                <Image
                  src="/images/textura/ruta-oeste.webp"
                  alt="Mapa de la zona oeste del GBA — área de cobertura de MaxiFletes"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-(--brand-950)/70 via-(--brand-950)/10 to-transparent pointer-events-none" />
                {/* Pin base pulsante */}
                <div className="absolute left-5 bottom-5 flex items-center gap-2.5">
                  <span className="relative grid place-items-center w-9 h-9 rounded-full bg-(--accent-500) shadow-[0_8px_22px_rgba(231,122,9,0.5)]">
                    <MapPin weight="fill" size={16} className="text-(--ink)" />
                    {!reduce && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-(--accent-500)/40" />
                    )}
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">Base en Morón</p>
                    <p className="text-white/70 text-xs">Salida a todo el oeste</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Der: zonas premium ─── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            {...(reduce ? {} : staggerParent)}
          >
            {ZONAS.map((zona) => {
              const core = zona.zona === 1;
              return (
                <motion.div key={zona.slug} variants={chip}>
                  <Link
                    href={`/fletes/${zona.slug}`}
                    className={cn(
                      "group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300",
                      "border hover:-translate-y-0.5",
                      core
                        ? "bg-(--brand-500) border-(--brand-500) text-white shadow-[0_10px_28px_-10px_rgba(46,91,224,0.65)] hover:shadow-[0_16px_34px_-10px_rgba(46,91,224,0.7)]"
                        : "bg-(--bg) border-(--line) hover:border-(--brand-300) hover:shadow-[var(--shadow-md)]"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={cn(
                          "grid place-items-center w-8 h-8 rounded-full shrink-0",
                          core ? "bg-white/20" : "bg-(--brand-50)"
                        )}
                      >
                        <MapPin weight="fill" size={14} className={core ? "text-white" : "text-(--brand-500)"} />
                      </span>
                      <div className="min-w-0">
                        <p className={cn("font-semibold text-sm truncate", core ? "text-white" : "text-(--ink)")}>
                          {zona.nombre}
                        </p>
                        <p className={cn("text-[0.7rem]", core ? "text-white/70" : "text-(--slate-400)")}>
                          {core ? "Zona core" : "Zona oeste"}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={15}
                      weight="bold"
                      className={cn(
                        "shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        core ? "text-white/80" : "text-(--slate-400) group-hover:text-(--brand-500)"
                      )}
                    />
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA — no ves tu zona */}
            <motion.div variants={chip} className="sm:col-span-2">
              <Link
                href={`https://wa.me/${WA}?text=Quiero%20consultar%20si%20llegan%20a%20mi%20zona`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl px-5 py-4 bg-(--ink) text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-(--safe-500)/15">
                    <WhatsappLogo weight="fill" size={18} className="text-(--safe-500)" />
                  </span>
                  <p className="font-semibold text-sm">¿No ves tu zona? Consultanos por WhatsApp</p>
                </div>
                <ArrowUpRight size={16} weight="bold" className="text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
