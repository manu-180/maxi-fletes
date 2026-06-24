"use client";

import { Minus, Plus } from "@phosphor-icons/react";
import { StepHeader } from "./StepHeader";
import { StepCTA } from "./StepCTA";
import { cn } from "@/lib/utils";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";

const ESPECIALES_OPTS = [
  { value: "piano", label: "Piano" },
  { value: "caja_fuerte", label: "Caja fuerte" },
  { value: "obra_arte", label: "Obra de arte / cuadro grande" },
  { value: "otro_pesado", label: "Otro objeto +100 kg" },
];

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Step5Extras({ state, dispatch }: Props) {
  const isMudanza = state.tipo === "mudanza";
  const isSingleItem = state.tipo === "single_item";

  const toggleEspecial = (value: string) => {
    const current = state.especiales;
    const next = current.includes(value)
      ? current.filter((e) => e !== value)
      : [...current, value];
    dispatch({ type: "UPDATE", payload: { especiales: next } });
  };

  const toggleArmado = () =>
    dispatch({ type: "UPDATE", payload: { armado: !state.armado } });

  const toggleEmbalaje = () =>
    dispatch({ type: "UPDATE", payload: { embalaje: !state.embalaje } });

  const setAyudantes = (n: number) =>
    dispatch({ type: "UPDATE", payload: { ayudantes: Math.max(0, Math.min(6, n)) } });

  return (
    <div>
      <StepHeader
        eyebrow="Paso 5"
        title="¿Necesitás ayuda extra?"
        subtitle="Podés agregar ayudantes, armado de muebles y embalaje."
      />

      {/* Ayudantes */}
      <div className="mb-4 rounded-[1.25rem] bg-black/[0.025] ring-1 ring-black/5 p-4">
        <p className="text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-3">
          Ayudantes adicionales
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setAyudantes(state.ayudantes - 1)}
            disabled={state.ayudantes === 0}
            className={cn(
              "w-10 h-10 rounded-full grid place-items-center border transition-all duration-200",
              state.ayudantes === 0
                ? "border-black/10 text-(--slate-300) cursor-not-allowed"
                : "border-(--brand-400) text-(--brand-500) hover:bg-(--brand-50)"
            )}
            aria-label="Quitar ayudante"
          >
            <Minus size={16} weight="regular" />
          </button>
          <span className="text-(--ink) font-semibold text-lg w-8 text-center tabular-nums">
            {state.ayudantes}
          </span>
          <button
            type="button"
            onClick={() => setAyudantes(state.ayudantes + 1)}
            disabled={state.ayudantes >= 6}
            className="w-10 h-10 rounded-full grid place-items-center border border-(--brand-400) text-(--brand-500) hover:bg-(--brand-50) transition-all duration-200"
            aria-label="Agregar ayudante"
          >
            <Plus size={16} weight="regular" />
          </button>
          {state.ayudantes > 0 && (
            <span className="text-xs text-(--slate-600)">
              {state.ayudantes === 1 ? "1 persona extra" : `${state.ayudantes} personas extra`}
            </span>
          )}
        </div>
      </div>

      {/* Armado/desarmado */}
      {!isSingleItem && (
        <button
          type="button"
          onClick={toggleArmado}
          className={cn(
            "w-full rounded-[1.25rem] ring-1 p-4 flex items-center justify-between mb-3 text-left transition-all duration-200",
            state.armado
              ? "bg-(--brand-50) ring-(--brand-200)"
              : "bg-black/[0.025] ring-black/5 hover:ring-(--brand-200)"
          )}
        >
          <div>
            <p className={cn("font-semibold text-sm", state.armado ? "text-(--brand-700)" : "text-(--ink)")}>
              Armado/desarmado de muebles
            </p>
            <p className="text-xs text-(--slate-600) mt-0.5">Camas, placard, mesa...</p>
          </div>
          <span
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
              state.armado
                ? "bg-(--brand-500) border-(--brand-500)"
                : "bg-white border-(--slate-300)"
            )}
          >
            {state.armado && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </button>
      )}

      {/* Embalaje (solo mudanza) */}
      {isMudanza && (
        <button
          type="button"
          onClick={toggleEmbalaje}
          className={cn(
            "w-full rounded-[1.25rem] ring-1 p-4 flex items-center justify-between mb-3 text-left transition-all duration-200",
            state.embalaje
              ? "bg-(--brand-50) ring-(--brand-200)"
              : "bg-black/[0.025] ring-black/5 hover:ring-(--brand-200)"
          )}
        >
          <div>
            <p className={cn("font-semibold text-sm", state.embalaje ? "text-(--brand-700)" : "text-(--ink)")}>
              Embalaje profesional
            </p>
            <p className="text-xs text-(--slate-600) mt-0.5">Cajas, film protector, papel...</p>
          </div>
          <span
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
              state.embalaje
                ? "bg-(--brand-500) border-(--brand-500)"
                : "bg-white border-(--slate-300)"
            )}
          >
            {state.embalaje && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </button>
      )}

      {/* Especiales */}
      <div className="rounded-[1.25rem] bg-black/[0.025] ring-1 ring-black/5 p-4 mb-6">
        <p className="text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-3">
          Objetos especiales <span className="font-normal lowercase tracking-normal">(opcional)</span>
        </p>
        <div className="flex flex-col gap-2">
          {ESPECIALES_OPTS.map((op) => {
            const sel = state.especiales.includes(op.value);
            return (
              <button
                key={op.value}
                type="button"
                onClick={() => toggleEspecial(op.value)}
                className={cn(
                  "flex items-center gap-2 text-sm px-3 py-2 rounded-xl text-left transition-all duration-200",
                  sel
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-white border border-black/8 text-(--slate-600) hover:border-(--brand-200)"
                )}
              >
                <span
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
                    sel ? "bg-amber-500 border-amber-500" : "border-(--slate-300)"
                  )}
                >
                  {sel && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {op.label}
              </button>
            );
          })}
        </div>
        {state.especiales.length > 0 && (
          <p className="text-xs text-amber-700 mt-2.5 bg-amber-50 rounded-lg px-3 py-2">
            Los objetos especiales pueden requerir coordinación previa.
          </p>
        )}
      </div>

      <StepCTA onClick={() => dispatch({ type: "NEXT" })} />
    </div>
  );
}
