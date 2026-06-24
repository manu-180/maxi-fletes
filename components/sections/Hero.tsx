"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Star, ShieldCheck, Clock } from "@phosphor-icons/react";
import { EASE, EASE_OUT } from "@/lib/motion";

const WA_HREF = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000"}?text=Hola%2C%20quiero%20consultar%20por%20un%20flete`;

const HEADLINE_WORDS = ["Tus", "cosas,", "en", "buenas", "manos."];

export function Hero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  // Parallax del visual al scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[--bg-soft]"
      aria-label="Inicio"
    >
      {/* Gradiente de fondo sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(46,91,224,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ─── Columna izquierda — texto ─── */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {/* Eyebrow */}
          <motion.p
            className="text-eyebrow text-[--brand-600]"
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            Fletes y mudanzas · Morón y zona oeste
          </motion.p>

          {/* Headline con word mask reveal */}
          <h1 className="text-display-xl text-[--ink] leading-[1.02]" style={{ fontFamily: "var(--font-display)" }}>
            {HEADLINE_WORDS.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={reduce ? {} : { y: "1.1em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + i * 0.07,
                    duration: 0.7,
                    ease: EASE,
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            className="text-body-lg text-[--slate-600] max-w-lg"
            initial={reduce ? {} : { opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
          >
            Fletes y mudanzas en Morón y toda la zona oeste. 18 años moviendo
            casas y oficinas con cuidado, puntualidad y precio claro.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-2"
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.82 }}
          >
            <Button
              href="/cotizar"
              size="lg"
              icon={<ArrowUpRight weight="regular" size={16} />}
            >
              Calculá tu presupuesto
            </Button>
            <Button
              href={WA_HREF}
              variant="secondary"
              size="lg"
            >
              Hablar por WhatsApp
            </Button>
          </motion.div>

          {/* Fila de confianza */}
          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.0 }}
          >
            {[
              { icon: Star, text: "4.8 en reseñas", weight: "fill" as const, color: "#F7951D" },
              { icon: Clock, text: "18 años en el rubro", weight: "regular" as const, color: "#2E5BE0" },
              { icon: ShieldCheck, text: "Seguro incluido", weight: "regular" as const, color: "#18A957" },
            ].map(({ icon: Icon, text, weight, color }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-[--slate-600]">
                <Icon weight={weight} size={16} style={{ color }} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── Columna derecha — visual ─── */}
        <div className="order-1 lg:order-2 relative">
          <motion.div
            style={{ y: reduce ? 0 : visualY }}
            className="relative"
          >
            {/* Doble bisel alrededor de la imagen */}
            <div className="rounded-[2.5rem] p-1.5 bg-black/[0.04] ring-1 ring-black/6 shadow-[0_2px_8px_rgba(12,18,34,0.04),0_24px_64px_rgba(12,18,34,0.08)]">
              <div className="rounded-[calc(2.5rem-0.375rem)] overflow-hidden bg-[--brand-50] aspect-[4/3] relative">
                {/* Placeholder premium hasta tener foto real */}
                <div className="absolute inset-0 bg-gradient-to-br from-[--brand-100] via-[--brand-50] to-white" />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  aria-hidden
                >
                  {/* Truck SVG lineal decorativo */}
                  <svg
                    viewBox="0 0 120 72"
                    fill="none"
                    className="w-32 opacity-30"
                    stroke="var(--brand-500)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="16" width="72" height="44" rx="4" />
                    <path d="M74 30h24l12 16v14H74V30z" />
                    <circle cx="22" cy="62" r="8" />
                    <circle cx="58" cy="62" r="8" />
                    <circle cx="98" cy="62" r="8" />
                    <path d="M2 36h72" />
                  </svg>
                  <p className="text-[--brand-400] text-sm font-medium tracking-wide">
                    Foto del equipo próximamente
                  </p>
                </div>

                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none"
                  animate={{ opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Badge flotante "Presupuesto en 1 minuto" */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:-left-8"
              initial={reduce ? {} : { opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 1.1 }}
            >
              <div className="rounded-2xl p-[1px] bg-white ring-1 ring-black/8 shadow-[0_8px_24px_rgba(12,18,34,0.12)]">
                <div className="rounded-[calc(1rem-1px)] bg-white px-4 py-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[--safe-50] grid place-items-center shrink-0">
                    <Clock weight="fill" size={16} color="var(--safe-500)" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[--ink]">Presupuesto en 1 minuto</p>
                    <p className="text-[11px] text-[--slate-400]">Gratis y sin compromiso</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Badge zona oeste */}
            <motion.div
              className="absolute -top-4 -right-4 md:-right-8"
              initial={reduce ? {} : { opacity: 0, scale: 0.8, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 1.2 }}
            >
              <div className="rounded-full px-3 py-1.5 bg-[--brand-500] text-white text-xs font-semibold shadow-[0_4px_16px_rgba(46,91,224,0.35)]">
                📍 Morón y zona oeste
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hairline bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[--line]"
        initial={reduce ? {} : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        style={{ originX: 0 }}
      />
    </section>
  );
}
