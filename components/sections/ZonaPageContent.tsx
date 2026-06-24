"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  Truck,
  Warehouse,
  ArrowsLeftRight,
  CheckCircle,
  ArrowUpRight,
  MapPin,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { FaqSection } from "@/components/sections/FaqSection";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Zona } from "@/data/zonas";

const SERVICIOS = [
  {
    icon: <Package size={20} weight="light" />,
    label: "Mini fletes",
    desc: "Un mueble, una heladera, una compra grande. Lo movemos en el día.",
  },
  {
    icon: <Truck size={20} weight="light" />,
    label: "Fletes",
    desc: "Pocas o muchas cosas. Camión al tamaño justo, precio cerrado.",
  },
  {
    icon: <ArrowsLeftRight size={20} weight="light" />,
    label: "Flete grande",
    desc: "Carga pesada, varios muebles, más volumen. Sin problema.",
  },
  {
    icon: <Warehouse size={20} weight="light" />,
    label: "Mudanzas completas",
    desc: "Todo el contenido de un hogar. Embalaje, carga, traslado, descarga.",
  },
];

const TRUST = [
  "18 años de experiencia en GBA Oeste",
  "Precio cerrado, sin sorpresas",
  "Carga asegurada en el traslado",
  "Equipo propio y trato cuidadoso",
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000";

interface Props {
  zona: Zona;
  allZonas: Zona[];
}

export function ZonaPageContent({ zona, allZonas }: Props) {
  const nearbyZonas = allZonas.filter((z) => z.slug !== zona.slug).slice(0, 6);

  const waText = encodeURIComponent(
    `Hola! Quiero cotizar un flete en ${zona.nombre}.`
  );

  return (
    <main className="bg-(--bg)">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="min-h-[60dvh] flex flex-col justify-center pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-center mb-5"
          >
            <EyebrowTag>Zona cubierta · GBA Oeste</EyebrowTag>
          </motion.div>

          <motion.h1
            className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-display font-bold text-(--ink) leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.07 }}
          >
            Fletes y Mudanzas
            <br />
            <span className="text-(--brand-500)">en {zona.nombre}</span>
          </motion.h1>

          <motion.p
            className="text-(--slate-600) text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.13 }}
          >
            {zona.descripcion} Precio cerrado, equipo propio y 18 años
            trabajando en GBA Oeste.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          >
            <Button
              href="/cotizar"
              size="lg"
              icon={<ArrowUpRight weight="regular" size={16} />}
            >
              Cotizar gratis
            </Button>
            <Button
              href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
              size="lg"
              variant="secondary"
            >
              Hablar por WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────── */}
      <section className="py-12 px-4 bg-(--brand-500)">
        <ul className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
          {TRUST.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-start gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
            >
              <CheckCircle
                size={15}
                weight="fill"
                className="text-white/60 shrink-0 mt-0.5"
              />
              <span className="text-white text-sm font-medium leading-snug">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ── Servicios ────────────────────────────────── */}
      <section className="py-24 px-4 bg-(--bg)">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <EyebrowTag>Qué hacemos en {zona.nombre}</EyebrowTag>
            <motion.h2
              className="mt-4 text-[2rem] md:text-[2.5rem] font-display font-bold text-(--ink)"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              ¿Qué necesitás mover?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICIOS.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              >
                {/* Double-bezel card */}
                <div className="rounded-[1.5rem] p-[1.5px] bg-black/[0.04] ring-1 ring-black/6 h-full">
                  <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 h-full flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-(--brand-50) grid place-items-center text-(--brand-500)">
                      {svc.icon}
                    </div>
                    <h3
                      className="font-semibold text-(--ink)"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {svc.label}
                    </h3>
                    <p className="text-sm text-(--slate-600) leading-relaxed">
                      {svc.desc}
                    </p>
                    <Link
                      href="/cotizar"
                      className="mt-auto text-sm text-(--brand-600) font-medium hover:text-(--brand-500) transition-colors duration-200 flex items-center gap-1 group"
                    >
                      Cotizar en {zona.nombre}
                      <ArrowUpRight
                        size={13}
                        weight="regular"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Zonas cercanas ───────────────────────────── */}
      <section className="py-16 px-4 bg-(--bg-soft)">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 mb-6">
            <MapPin size={18} weight="light" className="text-(--brand-500)" />
            <h2
              className="text-lg font-display font-semibold text-(--ink)"
              style={{ fontFamily: "var(--font-display)" }}
            >
              También cubrimos
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {nearbyZonas.map((z) => (
              <Link
                key={z.slug}
                href={`/fletes/${z.slug}`}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium",
                  "bg-white ring-1 ring-black/8 text-(--slate-600)",
                  "hover:ring-(--brand-300) hover:text-(--brand-600)",
                  "transition-all duration-200"
                )}
              >
                {z.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <FaqSection />

      {/* ── CTA final ────────────────────────────────── */}
      <section className="py-24 px-4 bg-(--bg-soft)">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <EyebrowTag>Pedí tu presupuesto</EyebrowTag>
          <h2
            className="mt-4 text-[2rem] md:text-[2.5rem] font-display font-bold text-(--ink) mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Necesitás un flete
            <br />
            en {zona.nombre}?
          </h2>
          <p className="text-(--slate-600) mb-9 leading-relaxed">
            Respondé 7 preguntas y en 1 minuto te damos un estimado. Sin
            compromiso, sin cargo.
          </p>
          <Button
            href="/cotizar"
            size="lg"
            icon={<ArrowUpRight weight="regular" size={16} />}
          >
            Cotizar gratis en {zona.nombre}
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
