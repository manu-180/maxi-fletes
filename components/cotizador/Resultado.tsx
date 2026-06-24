"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WhatsappLogo, ArrowClockwise, CheckCircle, ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE, EASE_OUT } from "@/lib/motion";
import { PriceCountUp } from "./PriceCountUp";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491126948110";

function formatPrice(n: number) {
  return n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}

function buildWAMessage(state: CotizadorState): string {
  const tipoLabels: Record<string, string> = {
    single_item: "Un mueble / objeto",
    flete_chico: "Flete chico",
    flete_grande: "Flete grande",
    mudanza: "Mudanza completa",
  };
  const tamanoLabel =
    state.tamano_mudanza
      ? { mono: "Monoambiente", "2amb": "2 ambientes", "3amb": "3 ambientes", "4amb": "4 ambientes", casa: "Casa completa" }[state.tamano_mudanza]
      : state.tamano_flete
        ? { poco: "Pocas cosas", medio: "Carga media", lleno: "Lleno", mas_vuelta: "Más de una vuelta" }[state.tamano_flete]
        : "—";
  const pisoOrigenLabel = state.piso_origen === "PB" ? "Planta baja" : `Piso ${state.piso_origen}${state.ascensor_origen ? " con ascensor" : " sin ascensor"}`;
  const pisoDestinoLabel = state.piso_destino === "PB" ? "Planta baja" : `Piso ${state.piso_destino}${state.ascensor_destino ? " con ascensor" : " sin ascensor"}`;
  const especiales = state.especiales.length > 0 ? `\n⚠️ Objetos especiales: ${state.especiales.join(", ")}` : "";
  const cuandoMap: Record<string, string> = {
    antes_posible: "Lo antes posible",
    esta_semana: "Esta semana",
    fecha: state.fecha_deseada ?? "Fecha puntual",
    no_se: "Por definir",
  };
  const cuando = state.cuando ? cuandoMap[state.cuando] : "Por definir";

  const lines = [
    `Hola! Acabo de cotizar en la web y quiero confirmar 👇`,
    ``,
    `🧰 Servicio: ${tipoLabels[state.tipo ?? "flete_chico"]}`,
    `📍 Retiro: ${state.origen ?? "—"}`,
    `📍 Entrega: ${state.destino ?? "—"}`,
    `📦 Tamaño: ${tamanoLabel}${state.detalle_items ? ` — ${state.detalle_items}` : ""}`,
    `🏢 Origen: ${pisoOrigenLabel}`,
    `🏢 Destino: ${pisoDestinoLabel}`,
    `👷 Ayudantes: ${state.ayudantes === 0 ? "Sin ayudantes extra" : `${state.ayudantes} ayudante${state.ayudantes > 1 ? "s" : ""}`}`,
    `🔧 Armado/desarmado: ${state.armado ? "Sí" : "No"}`,
    state.embalaje ? `📦 Embalaje: Sí` : "",
    `📅 Cuándo: ${cuando} (${state.franja})`,
    especiales,
    ``,
    `💰 Estimado web: ${formatPrice(state.estimado?.min ?? 0)} – ${formatPrice(state.estimado?.max ?? 0)}`,
    ``,
    `Mi nombre: ${state.nombre ?? "—"}`,
    `Quedo a la espera para coordinar. ¡Gracias!`,
  ].filter(Boolean);

  return encodeURIComponent(lines.join("\n"));
}

const TRUST_ITEMS = [
  "Más de 18 años de experiencia en GBA Oeste",
  "Presupuesto final a confirmar en el relevamiento",
  "Equipo profesional, trato cuidadoso",
];

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Resultado({ state, dispatch }: Props) {
  const reduce = useReducedMotion();
  const { estimado, nombre } = state;
  if (!estimado) return null;

  const waMsg = buildWAMessage(state);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={reduce ? false : { scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 18, delay: 0.1 }}
          className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--brand-500) to-(--brand-600) grid place-items-center shadow-lg shadow-(--brand-500)/30"
        >
          {/* pulse ring */}
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full ring-2 ring-(--brand-400)"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.3 }}
            />
          )}
          <CheckCircle size={30} weight="fill" className="text-white" />
        </motion.div>
        <p className="text-[0.68rem] text-(--brand-600) font-semibold uppercase tracking-[0.18em] mb-1.5">
          Tu estimado está listo
        </p>
        <h2
          className="text-2xl font-bold text-(--ink) leading-tight tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {nombre ? `Listo, ${nombre.split(" ")[0]} 👇` : "¡Listo! 👇"}
        </h2>
      </div>

      {/* Price card */}
      <div className="relative rounded-[1.85rem] p-[2px] bg-gradient-to-br from-(--brand-400) via-(--brand-500) to-(--brand-600) shadow-[0_24px_60px_-14px_rgba(46,91,224,0.5)] mb-4 overflow-hidden">
        {/* glow burst */}
        {!reduce && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
            className="absolute -inset-12 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.55), transparent 60%)",
            }}
          />
        )}
        <div className="relative rounded-[calc(1.85rem-2px)] bg-white px-6 py-8 text-center">
          <p className="text-[0.66rem] text-(--slate-600) mb-3 uppercase tracking-[0.18em] font-semibold">
            Rango estimado · ARS 2026
          </p>
          <div className="flex flex-col items-center gap-1.5">
            <PriceCountUp
              value={estimado.min}
              delay={180}
              className="text-[2.5rem] leading-none font-bold text-(--ink) tabular"
              style={{ fontFamily: "var(--font-display)" }}
            />
            <span className="h-px w-8 bg-(--line)" />
            <PriceCountUp
              value={estimado.max}
              delay={360}
              className="text-[2.5rem] leading-none font-bold text-(--ink) tabular"
              style={{ fontFamily: "var(--font-display)" }}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-center text-(--slate-400) leading-relaxed mb-5 px-2">
        Valores estimados 2026. A confirmar según el relevamiento final. Puede variar por volumen real,
        accesos y distancia exacta.
      </p>

      {/* Trust items */}
      <div className="rounded-[1.25rem] bg-(--bg-soft) p-4 flex flex-col gap-2.5 mb-6">
        {TRUST_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <CheckCircle size={15} weight="fill" className="text-(--safe-500) shrink-0" />
            <span className="text-xs text-(--slate-600)">{item}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "group w-full rounded-full pl-7 pr-2.5 py-2.5 inline-flex items-center justify-between gap-3",
            "bg-[#25D366] text-white font-semibold text-sm",
            "hover:bg-[#1db954] shadow-lg shadow-[#25D366]/30 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          )}
        >
          <span className="flex-1 text-center inline-flex items-center justify-center gap-2 pl-9">
            <WhatsappLogo size={19} weight="fill" />
            Confirmar por WhatsApp
          </span>
          <span className="grid place-items-center w-9 h-9 rounded-full bg-black/10 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
            <ArrowUpRight size={15} weight="bold" />
          </span>
        </motion.a>

        <button
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
          className="group w-full rounded-full py-3 inline-flex items-center justify-center gap-2 text-sm text-(--slate-600) hover:text-(--brand-600) transition-colors duration-200 border border-black/[0.08] hover:border-(--brand-200)"
        >
          <ArrowClockwise
            size={14}
            weight="bold"
            className="group-hover:-rotate-90 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          />
          Hacer otra cotización
        </button>
      </div>

      {/* Summary collapsible — simplified */}
      <details className="mt-5 rounded-[1.25rem] border border-black/8 overflow-hidden">
        <summary className="px-4 py-3 text-xs font-semibold text-(--slate-600) cursor-pointer hover:bg-(--bg-soft) transition-colors list-none flex items-center justify-between">
          Ver resumen del pedido
          <span className="text-(--slate-400)">↓</span>
        </summary>
        <div className="px-4 pb-4 pt-2 text-xs text-(--slate-600) space-y-1.5">
          <p><strong>Origen:</strong> {state.origen}</p>
          <p><strong>Destino:</strong> {state.destino}</p>
          {state.tamano_mudanza && <p><strong>Tamaño:</strong> {state.tamano_mudanza}</p>}
          {state.detalle_items && <p><strong>Detalle:</strong> {state.detalle_items}</p>}
          <p><strong>Piso origen:</strong> {state.piso_origen} {state.ascensor_origen ? "(con ascensor)" : ""}</p>
          <p><strong>Piso destino:</strong> {state.piso_destino} {state.ascensor_destino ? "(con ascensor)" : ""}</p>
          {state.ayudantes > 0 && <p><strong>Ayudantes:</strong> {state.ayudantes}</p>}
          {state.armado && <p>✓ Armado/desarmado</p>}
          {state.embalaje && <p>✓ Embalaje</p>}
          {state.cuando && <p><strong>Cuándo:</strong> {state.cuando}</p>}
        </div>
      </details>
    </motion.div>
  );
}
