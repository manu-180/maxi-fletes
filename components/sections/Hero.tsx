"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, ArrowRight, Star, ShieldCheck, Clock, MapPin } from "@phosphor-icons/react";
import { EASE, EASE_OUT } from "@/lib/motion";

const SPRING = "cubic-bezier(0.32,0.72,0,1)";

const WA_HREF = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000"}?text=Hola%2C%20quiero%20consultar%20por%20un%20flete`;

// Última palabra ("manos.") va enmascarada con la foto — firma "type meets road"
const HEADLINE: { word: string; mask?: boolean }[] = [
  { word: "Tus" },
  { word: "cosas," },
  { word: "en" },
  { word: "buenas" },
  { word: "manos.", mask: true },
];

/** Motivo de ruta del Oeste — firma de marca, se dibuja al cargar (pathLength). */
function RouteMotif({ reduce }: { reduce: boolean }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <motion.path
        d="M70 510 C 250 510, 320 380, 500 380 S 800 280, 1040 180"
        stroke="var(--accent-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 11"
        opacity="0.45"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.4 }}
      />
      <circle cx="70" cy="510" r="6" fill="none" stroke="var(--accent-500)" strokeWidth="2" opacity="0.55" />
      <motion.circle
        cx="1040"
        cy="180"
        r="5"
        fill="var(--accent-500)"
        initial={reduce ? { opacity: 0.7 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.4, ease: EASE_OUT }}
      />
    </svg>
  );
}

/** Arrancador de cotización (desktop) — "Origen → Destino" que lleva al cotizador. */
function QuoteStarter() {
  return (
    <Link
      href="/cotizar"
      aria-label="Empezá tu cotización: elegí origen y destino"
      className="group inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-xl ring-1 ring-black/[0.06] p-1.5 pl-2.5 transition-all duration-500 hover:ring-black/10"
      style={{ boxShadow: "var(--shadow-md)", transitionTimingFunction: SPRING }}
    >
      <span className="flex items-center gap-2 px-3 py-2">
        <MapPin weight="fill" size={16} className="text-(--brand-500)" />
        <span className="text-sm font-medium text-(--slate-600)">Origen</span>
      </span>
      <ArrowRight size={15} weight="bold" className="shrink-0 text-(--slate-400)" />
      <span className="flex items-center gap-2 px-3 py-2">
        <MapPin weight="fill" size={16} className="text-(--accent-500)" />
        <span className="text-sm font-medium text-(--slate-600)">Destino</span>
      </span>
      <span
        className="grid h-11 w-11 place-items-center rounded-full bg-(--accent-500) text-(--ink) transition-transform duration-500 group-hover:translate-x-0.5 group-hover:scale-105"
        style={{ boxShadow: "var(--shadow-amber)", transitionTimingFunction: SPRING }}
      >
        <ArrowUpRight weight="bold" size={18} />
      </span>
    </Link>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] overflow-hidden bg-(--bg-soft)"
      aria-label="Inicio"
    >
      {/* Glows ambientales tintados (no el gradiente AI) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 78% 32%, rgba(46,91,224,0.07) 0%, transparent 70%), radial-gradient(ellipse 55% 50% at 12% 85%, rgba(247,149,29,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Motivo de ruta del Oeste */}
      <RouteMotif reduce={!!reduce} />

      <div className="relative shell pt-32 pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* ─── Izquierda — texto ─── */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {/* Eyebrow */}
          <motion.p
            className="text-eyebrow text-(--brand-600) inline-flex items-center gap-2"
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <span className="inline-block h-px w-6 bg-(--accent-500)" aria-hidden />
            Fletes y mudanzas · Morón y zona oeste
          </motion.p>

          {/* Headline con word reveal + "manos" enmascarada con la foto */}
          <h1 className="text-display-2xl text-(--ink)">
            {HEADLINE.map((item, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className={item.mask ? "inline-block text-mask-photo" : "inline-block"}
                  style={
                    item.mask
                      ? {
                          backgroundImage: "url('/images/hero/hero-main.webp')",
                          backgroundPosition: "50% 62%",
                        }
                      : undefined
                  }
                  initial={reduce ? {} : { y: "1.05em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: EASE }}
                >
                  {item.word}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            className="text-body-lg text-(--slate-600) max-w-lg"
            initial={reduce ? {} : { opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            Fletes y mudanzas en Morón y toda la zona oeste. 18 años moviendo
            casas y oficinas con cuidado, puntualidad y precio claro.
          </motion.p>

          {/* Arrancador de cotización (desktop) */}
          <motion.div
            className="hidden sm:block pt-1"
            initial={reduce ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.82 }}
          >
            <QuoteStarter />
          </motion.div>

          {/* CTAs (mobile: presupuesto + WhatsApp / desktop: solo WhatsApp) */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-1"
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
          >
            <Button
              href="/cotizar"
              size="lg"
              icon={<ArrowUpRight weight="bold" size={16} />}
              className="sm:hidden justify-center"
            >
              Calculá tu presupuesto
            </Button>
            <Button href={WA_HREF} variant="secondary" size="lg" className="justify-center sm:justify-start">
              Hablar por WhatsApp
            </Button>
          </motion.div>

          {/* Fila de confianza */}
          <motion.div
            className="flex flex-wrap gap-x-5 gap-y-2 pt-2"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.05 }}
          >
            {[
              { icon: Star, text: "4.8 en reseñas", weight: "fill" as const, color: "#F7951D" },
              { icon: Clock, text: "18 años en el rubro", weight: "regular" as const, color: "#2E5BE0" },
              { icon: ShieldCheck, text: "Seguro incluido", weight: "regular" as const, color: "#18A957" },
            ].map(({ icon: Icon, text, weight, color }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-(--slate-600)">
                <Icon weight={weight} size={16} style={{ color }} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── Derecha — visual ─── */}
        <div className="order-1 lg:order-2 relative">
          <motion.div style={{ y: reduce ? 0 : visualY }} className="relative">
            {/* Doble bisel alrededor de la imagen */}
            <div
              className="rounded-[2.5rem] p-1.5 bg-black/[0.04] ring-1 ring-black/[0.06]"
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <div className="rounded-[calc(2.5rem-0.375rem)] overflow-hidden bg-(--brand-50) aspect-[4/5] relative">
                <Image
                  src="/images/hero/hero-main.webp"
                  alt="Equipo de MaxiFletes cargando un sofá envuelto hacia el camión, calle del oeste del GBA"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-(--brand-950)/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Badge "Presupuesto en 1 minuto" */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:-left-8"
              initial={reduce ? {} : { opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 1.15 }}
            >
              <div className="rounded-2xl p-[1px] bg-white ring-1 ring-black/[0.08]" style={{ boxShadow: "var(--shadow-md)" }}>
                <div className="rounded-[calc(1rem-1px)] bg-white px-4 py-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-(--safe-50) grid place-items-center shrink-0">
                    <Clock weight="fill" size={16} color="var(--safe-500)" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-(--ink)">Presupuesto en 1 minuto</p>
                    <p className="text-[11px] text-(--slate-400)">Gratis y sin compromiso</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Badge zona oeste */}
            <motion.div
              className="absolute -top-4 -right-4 md:-right-8"
              initial={reduce ? {} : { opacity: 0, scale: 0.8, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 1.25 }}
            >
              <div
                className="rounded-full px-3.5 py-1.5 bg-(--brand-500) text-white text-xs font-semibold inline-flex items-center gap-1.5"
                style={{ boxShadow: "0 8px 24px rgba(46,91,224,0.35)" }}
              >
                <MapPin weight="fill" size={13} />
                Morón y zona oeste
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hairline bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-(--line)"
        initial={reduce ? {} : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        style={{ originX: 0 }}
      />
    </section>
  );
}
