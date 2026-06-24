"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkle, Lock, ArrowRight } from "@phosphor-icons/react";
import { StepHeader } from "./StepHeader";
import { cn } from "@/lib/utils";
import { calcularEstimado } from "@/lib/cotizador/calcular";
import type { CotizadorInput } from "@/lib/cotizador/types";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";
import { EASE } from "@/lib/motion";
import { gtagEvent } from "@/lib/gtag";

function normalizeWA(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  // 11XXXXXXXX (10 digits starting with 11)
  if (digits.length === 10 && digits.startsWith("11")) return "549" + digits;
  // 9 + 11XXXXXXXX (11 digits starting with 9)
  if (digits.length === 11 && digits.startsWith("9")) return "54" + digits;
  // 011XXXXXXXX
  if (digits.length === 11 && digits.startsWith("011")) return "549" + digits.slice(1);
  // Already normalized 5491XXXXXXXX
  if (digits.length === 13 && digits.startsWith("549")) return digits;
  return null;
}

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Step7Contacto({ state, dispatch }: Props) {
  const reduce = useReducedMotion();
  const [nombre, setNombre] = useState(state.nombre ?? "");
  const [waRaw, setWaRaw] = useState(state.whatsapp_raw ?? "");
  const [consent, setConsent] = useState(state.consent_wpp);
  const [waError, setWaError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [loading, setLoading] = useState(false);

  const normalized = normalizeWA(waRaw);
  const waValid = !!normalized;

  const validate = () => {
    let valid = true;
    if (nombre.trim().length < 2) { setNombreError("Ingresá tu nombre"); valid = false; }
    else setNombreError("");
    if (!waValid) { setWaError("WhatsApp inválido. Ej: 11 4444-5555"); valid = false; }
    else setWaError("");
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate() || !consent || loading) return;
    setLoading(true);

    const wa = normalized!;
    const calcInput: CotizadorInput = {
      tipo: state.tipo!,
      origen: state.origen!,
      zona_origen: state.zona_origen!,
      destino: state.destino!,
      zona_destino: state.zona_destino!,
      tamano_mudanza: state.tamano_mudanza,
      tamano_flete: state.tamano_flete,
      detalle_items: state.detalle_items,
      piso_origen: state.piso_origen,
      ascensor_origen: state.ascensor_origen,
      piso_destino: state.piso_destino,
      ascensor_destino: state.ascensor_destino,
      ayudantes: state.ayudantes,
      armado: state.armado,
      embalaje: state.embalaje,
      especiales: state.especiales,
      cuando: state.cuando,
      fecha_deseada: state.fecha_deseada,
      franja: state.franja,
      urgente: state.urgente,
      finde_o_finmes: state.finde_o_finmes,
      nombre: nombre.trim(),
      whatsapp: wa,
      whatsapp_raw: waRaw,
      consent_wpp: true,
      prefiere_llamada: false,
    };

    // Calculate client-side (instant)
    const estimado = calcularEstimado(calcInput, state.modo);

    // Show result immediately
    dispatch({
      type: "SET_RESULTADO",
      estimado: { min: estimado.min, max: estimado.max, central: estimado.central },
    });

    // GA4 event
    gtagEvent("cotizador_lead_creado", {
      tipo_servicio: state.tipo ?? "desconocido",
      origen: state.zona_origen ?? "desconocido",
      destino: state.zona_destino ?? "desconocido",
      estimado_central: estimado.central,
      modo: state.modo ?? "rapido",
    });

    // Persist to Supabase async (fire-and-forget)
    const utm = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;

    fetch("/api/cotizador/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _hp: "", // honeypot must be empty
        nombre: nombre.trim(),
        whatsapp: wa,
        whatsapp_raw: waRaw,
        consent_wpp: true,
        prefiere_llamada: false,
        tipo_servicio: state.tipo,
        origen: state.origen,
        destino: state.destino,
        zona_origen: state.zona_origen,
        zona_destino: state.zona_destino,
        tamano: state.tamano_mudanza ?? state.tamano_flete,
        detalle_items: state.detalle_items,
        piso_origen: state.piso_origen,
        ascensor_origen: state.ascensor_origen,
        piso_destino: state.piso_destino,
        ascensor_destino: state.ascensor_destino,
        ayudantes: state.ayudantes,
        armado: state.armado,
        embalaje: state.embalaje,
        cuando: state.cuando,
        fecha_deseada: state.fecha_deseada,
        franja: state.franja,
        urgente: state.urgente,
        finde_o_finmes: state.finde_o_finmes,
        especiales: state.especiales,
        modo: state.modo,
        utm_source: utm?.get("utm_source") ?? undefined,
        utm_medium: utm?.get("utm_medium") ?? undefined,
        utm_campaign: utm?.get("utm_campaign") ?? undefined,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
      }),
    })
      .then(() => dispatch({ type: "LEAD_ENVIADO" }))
      .catch((e) => console.error("[cotizador] lead error:", e));
  };

  return (
    <div>
      <StepHeader
        eyebrow="Último paso"
        title="Tu estimado te espera"
        subtitle="Dejanos tu nombre y WhatsApp para revelarte el rango de precio."
      />

      {/* Blurred teaser */}
      <div className="relative mb-6 rounded-[1.5rem] bg-gradient-to-br from-(--brand-50) to-(--brand-100)/50 border border-(--brand-100) p-6 overflow-hidden select-none pointer-events-none">
        <div className="blur-md">
          <p className="text-[0.66rem] text-(--brand-600) font-semibold uppercase tracking-[0.18em] mb-1.5">Tu estimado</p>
          <p className="text-[2.4rem] leading-none font-bold text-(--ink)" style={{ fontFamily: "var(--font-display)" }}>$XXX.000</p>
          <p className="text-[2.4rem] leading-none font-bold text-(--ink) mt-1" style={{ fontFamily: "var(--font-display)" }}>$YYY.000</p>
        </div>
        {/* shimmer sweep */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
            initial={{ x: "-150%" }}
            animate={{ x: "350%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.7 }}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md shadow-black/5">
            <Lock size={14} weight="fill" className="text-(--brand-500)" />
            <span className="text-xs font-semibold text-(--brand-700)">Completá tus datos para verlo</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-1.5">
            Tu nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => { setNombre(e.target.value); setNombreError(""); }}
            onBlur={() => nombre.length < 2 && setNombreError("Ingresá tu nombre")}
            placeholder="Ej: Carlos, María..."
            autoComplete="given-name"
            className={cn(
              "w-full px-4 py-3 rounded-[0.875rem] border text-sm text-(--ink) outline-none transition-all duration-200 placeholder:text-(--slate-400)",
              nombreError ? "border-red-400 focus:ring-2 focus:ring-red-100" : "border-black/10 focus:border-(--brand-400) focus:ring-2 focus:ring-(--brand-100)"
            )}
          />
          {nombreError && <p className="text-xs text-red-500 mt-1">{nombreError}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="whatsapp" className="block text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-1.5">
            Tu WhatsApp
          </label>
          <input
            id="whatsapp"
            type="tel"
            value={waRaw}
            onChange={(e) => { setWaRaw(e.target.value); setWaError(""); }}
            onBlur={() => waRaw.length > 0 && !waValid && setWaError("WhatsApp inválido. Ej: 11 4444-5555")}
            placeholder="Ej: 11 4444-5555"
            inputMode="tel"
            autoComplete="tel"
            className={cn(
              "w-full px-4 py-3 rounded-[0.875rem] border text-sm text-(--ink) outline-none transition-all duration-200 placeholder:text-(--slate-400)",
              waError ? "border-red-400 focus:ring-2 focus:ring-red-100" : "border-black/10 focus:border-(--brand-400) focus:ring-2 focus:ring-(--brand-100)"
            )}
          />
          {waError && <p className="text-xs text-red-500 mt-1">{waError}</p>}
          <p className="text-xs text-(--slate-400) mt-1">Solo para que Maximiliano te contacte y confirme.</p>
        </div>
      </div>

      {/* Consent */}
      <button
        type="button"
        onClick={() => setConsent((v) => !v)}
        className="flex items-start gap-3 mb-6 text-left w-full"
      >
        <span
          className={cn(
            "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
            consent ? "bg-(--brand-500) border-(--brand-500)" : "bg-white border-(--slate-300)"
          )}
        >
          {consent && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="text-xs text-(--slate-600) leading-relaxed">
          Acepto que MaxiFletes me contacte por WhatsApp para coordinar el servicio. No spam, nunca.
        </span>
      </button>

      {/* Submit — button-in-button */}
      {(() => {
        const ready = !loading && consent && nombre.length >= 2 && waValid;
        return (
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!ready}
            whileTap={ready ? { scale: 0.98 } : undefined}
            transition={{ duration: 0.15, ease: EASE }}
            className={cn(
              "group w-full rounded-full pl-7 pr-2.5 py-2.5 inline-flex items-center justify-between gap-3 font-semibold text-sm",
              "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              ready
                ? "bg-(--brand-500) text-white hover:bg-(--brand-600) shadow-lg shadow-(--brand-500)/25 hover:shadow-xl hover:shadow-(--brand-500)/30"
                : "bg-black/[0.06] text-(--slate-400) cursor-not-allowed"
            )}
          >
            <span className="flex-1 text-center inline-flex items-center justify-center gap-2 pl-9">
              {!loading && <Sparkle size={17} weight="fill" />}
              {loading ? "Calculando tu estimado…" : "Ver mi estimado gratis"}
            </span>
            <span
              className={cn(
                "grid place-items-center w-9 h-9 rounded-full shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                ready ? "bg-white/15 group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105" : "bg-black/[0.04]"
              )}
              aria-hidden
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
                />
              ) : (
                <ArrowRight size={16} weight="bold" />
              )}
            </span>
          </motion.button>
        );
      })()}

      <p className="text-center text-xs text-(--slate-400) mt-3">
        🔒 Tus datos se usan solo para cotizarte. No spam.
      </p>
    </div>
  );
}
