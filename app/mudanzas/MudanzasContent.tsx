"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Warehouse,
  CheckCircle,
  ArrowUpRight,
  Package,
  Wrench,
  Shield,
  Clock,
  CurrencyCircleDollar,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { FaqSection } from "@/components/sections/FaqSection";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491126948110";

const INCLUYE = [
  "Carga y descarga con equipo propio",
  "Traslado en camión del tamaño adecuado",
  "Protección de muebles con frazadas y film",
  "Coordinación de horario y acceso",
  "Precio cerrado desde el primer presupuesto",
];

const SERVICIOS_EXTRA = [
  {
    icon: <Package size={20} weight="light" />,
    label: "Embalaje profesional",
    desc: "Cajas, papel burbuja y film stretch. Tu vajilla, cuadros y objetos frágiles protegidos.",
  },
  {
    icon: <Wrench size={20} weight="light" />,
    label: "Armado y desarmado",
    desc: "Placares, camas, cocinas modulares. Los armamos y desarmamos para que entren sin golpes.",
  },
  {
    icon: <Shield size={20} weight="light" />,
    label: "Carga asegurada",
    desc: "Tus cosas van protegidas en todo el traslado. Preguntanos por los detalles de cobertura.",
  },
];

const SIZES = [
  {
    label: "Monoambiente",
    desc: "Cama, placard, living, cocina pequeña.",
    duration: "3–5 horas",
    highlight: false,
  },
  {
    label: "2 ambientes",
    desc: "Dormitorio completo + living + cocina.",
    duration: "4–6 horas",
    highlight: true,
  },
  {
    label: "3 ambientes",
    desc: "2 dormitorios + living + comedor + cocina.",
    duration: "6–8 horas",
    highlight: false,
  },
  {
    label: "Casa / PH",
    desc: "Casa completa, más de un piso o mucho volumen.",
    duration: "8+ horas",
    highlight: false,
  },
];

const PROCESO = [
  {
    n: "01",
    title: "Cotizá en la web",
    desc: "7 preguntas, 1 minuto. Te mostramos un estimado al instante, sin cargo.",
  },
  {
    n: "02",
    title: "Confirmamos juntos",
    desc: "Revisamos los detalles por WhatsApp y cerramos el precio final. Sin sorpresas.",
  },
  {
    n: "03",
    title: "El día de la mudanza",
    desc: "Llegamos en horario, con el equipo y el camión justos. Vos no tocás nada.",
  },
];

export function MudanzasContent() {
  return (
    <main className="bg-(--bg)">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="min-h-[62dvh] flex flex-col justify-center pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-center mb-5"
          >
            <EyebrowTag>Mudanzas completas</EyebrowTag>
          </motion.div>

          <motion.h1
            className="text-[2.5rem] md:text-[3.75rem] font-display font-bold text-(--ink) leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.07 }}
          >
            Mudanzas en GBA Oeste{" "}
            <span className="text-(--brand-500)">sin vueltas</span>
          </motion.h1>

          <motion.p
            className="text-(--slate-600) text-lg leading-relaxed mb-9 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
          >
            18 años moviendo hogares en Morón y toda la zona oeste. Precio
            cerrado, equipo propio y trato cuidadoso. Vos coordinás, nosotros
            hacemos el resto.
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
              Cotizar mi mudanza
            </Button>
            <Button
              href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20cotizar%20una%20mudanza`}
              size="lg"
              variant="secondary"
            >
              Hablar por WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Qué incluye ──────────────────────────────── */}
      <section className="py-24 px-4 bg-(--bg-soft)">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <EyebrowTag>Servicio estándar</EyebrowTag>
            <h2
              className="mt-4 text-[2rem] md:text-[2.5rem] font-display font-bold text-(--ink) leading-tight mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Todo lo que incluye
              <br />
              una mudanza
            </h2>
            <p className="text-(--slate-600) leading-relaxed mb-8">
              El servicio base incluye carga, traslado y descarga. Sin cargos
              ocultos. Lo que acordamos en el presupuesto es lo que pagás.
            </p>
            <ul className="flex flex-col gap-3">
              {INCLUYE.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                >
                  <CheckCircle
                    size={18}
                    weight="fill"
                    className="text-(--brand-500) shrink-0 mt-0.5"
                  />
                  <span className="text-(--slate-700) text-sm leading-snug">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tarjeta feature */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            {/* Double-bezel hero card */}
            <div className="rounded-[2rem] p-[2px] bg-(--brand-500) shadow-2xl shadow-(--brand-500)/30">
              <div className="rounded-[calc(2rem-2px)] bg-white p-8">
                <div className="w-14 h-14 rounded-2xl bg-(--brand-50) grid place-items-center mb-6">
                  <Warehouse size={28} weight="light" className="text-(--brand-500)" />
                </div>
                <h3
                  className="text-xl font-display font-bold text-(--ink) mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Precio cerrado siempre
                </h3>
                <p className="text-(--slate-600) text-sm leading-relaxed mb-6">
                  Una vez que revisamos todos los detalles, el precio es fijo.
                  No aparecen adicionales el día de la mudanza.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Clock size={16} weight="light" />, label: "Puntualidad" },
                    { icon: <Shield size={16} weight="light" />, label: "Carga asegurada" },
                    { icon: <CurrencyCircleDollar size={16} weight="light" />, label: "Sin sobrecostos" },
                    { icon: <CheckCircle size={16} weight="light" />, label: "Equipo propio" },
                  ].map((feat) => (
                    <div
                      key={feat.label}
                      className="flex items-center gap-2 bg-(--bg-soft) rounded-xl px-3 py-2.5"
                    >
                      <span className="text-(--brand-500)">{feat.icon}</span>
                      <span className="text-xs font-medium text-(--slate-700)">
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Servicios extra ──────────────────────────── */}
      <section className="py-24 px-4 bg-(--bg)">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <EyebrowTag>Servicios adicionales</EyebrowTag>
            <motion.h2
              className="mt-4 text-[2rem] md:text-[2.5rem] font-display font-bold text-(--ink)"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Sumá lo que necesitás
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {SERVICIOS_EXTRA.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.09 }}
              >
                <div className="rounded-[1.5rem] p-[1.5px] bg-black/[0.04] ring-1 ring-black/6 h-full">
                  <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 flex flex-col gap-3 h-full">
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-(--slate-500) mt-6">
            Sumás estos servicios al cotizar.{" "}
            <Link
              href="/cotizar"
              className="text-(--brand-600) font-medium hover:text-(--brand-500) transition-colors duration-200 underline underline-offset-4"
            >
              Ir al cotizador →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Tamaños ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-(--bg-soft)">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <EyebrowTag>Guía de tamaños</EyebrowTag>
            <motion.h2
              className="mt-4 text-[2rem] font-display font-bold text-(--ink)"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              ¿Cuánto tarda una mudanza?
            </motion.h2>
            <p className="mt-3 text-(--slate-600) text-sm">
              Tiempos estimados. El precio lo calculás en el cotizador.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {SIZES.map((size, i) => (
              <motion.div
                key={size.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              >
                <div
                  className={cn(
                    "rounded-[1.5rem] p-[1.5px] h-full",
                    size.highlight
                      ? "bg-(--brand-500) shadow-lg shadow-(--brand-500)/25"
                      : "bg-black/[0.04] ring-1 ring-black/6"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-[calc(1.5rem-1.5px)] p-6 h-full flex flex-col gap-2",
                      size.highlight ? "bg-white" : "bg-white"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={cn(
                          "font-semibold text-base",
                          size.highlight ? "text-(--brand-600)" : "text-(--ink)"
                        )}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {size.label}
                      </h3>
                      {size.highlight && (
                        <span className="text-[10px] font-semibold uppercase tracking-widest bg-(--brand-500) text-white rounded-full px-2.5 py-0.5 shrink-0">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-(--slate-600) leading-relaxed">
                      {size.desc}
                    </p>
                    <p className="text-xs text-(--slate-500) font-medium mt-auto pt-2 border-t border-black/5">
                      ⏱ Estimado: {size.duration}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proceso ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-(--bg)">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <EyebrowTag>Cómo funciona</EyebrowTag>
            <motion.h2
              className="mt-4 text-[2rem] font-display font-bold text-(--ink)"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              3 pasos, sin complicaciones
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PROCESO.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                className="flex flex-col gap-4"
              >
                <span
                  className="text-[3rem] font-display font-bold text-(--brand-100) leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                  aria-hidden
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="font-semibold text-(--ink) mb-1.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-(--slate-600) leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
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
          <EyebrowTag>Presupuesto gratis</EyebrowTag>
          <h2
            className="mt-4 text-[2rem] md:text-[2.5rem] font-display font-bold text-(--ink) mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Cuánto sale
            <br />
            tu mudanza?
          </h2>
          <p className="text-(--slate-600) mb-9 leading-relaxed">
            7 preguntas, 1 minuto, estimado al instante. Sin cargo y sin
            compromiso. El precio final lo cerramos juntos.
          </p>

          {/* Double-bezel CTA */}
          <div className="rounded-[2rem] p-[2px] bg-gradient-to-br from-(--brand-400) to-(--brand-600) shadow-2xl shadow-(--brand-500)/20 mb-6">
            <div className="rounded-[calc(2rem-2px)] bg-white px-8 py-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                href="/cotizar"
                size="lg"
                icon={<ArrowUpRight weight="regular" size={16} />}
              >
                Cotizar mi mudanza
              </Button>
              <Button
                href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20cotizar%20una%20mudanza`}
                size="lg"
                variant="secondary"
              >
                Hablar por WhatsApp
              </Button>
            </div>
          </div>

          <p className="text-xs text-(--slate-400)">
            🔒 Tus datos se usan solo para cotizarte. Sin spam.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
