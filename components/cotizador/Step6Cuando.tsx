"use client";

import { CalendarBlank } from "@phosphor-icons/react";
import { OptionCard } from "./OptionCard";
import { StepHeader } from "./StepHeader";
import { StepCTA } from "./StepCTA";
import { cn } from "@/lib/utils";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";
import type { CuandoOpcion, FranjaHoraria } from "@/lib/cotizador/types";

const CUANDO_OPTS: { value: CuandoOpcion; label: string; description: string }[] = [
  { value: "antes_posible", label: "Lo antes posible", description: "Necesito que sea urgente" },
  { value: "esta_semana", label: "Esta semana", description: "En los próximos días" },
  { value: "fecha", label: "Fecha puntual", description: "Tengo un día en mente" },
  { value: "no_se", label: "No sé todavía", description: "Estoy viendo opciones" },
];

const FRANJA_OPTS: { value: FranjaHoraria; label: string }[] = [
  { value: "mañana", label: "Mañana" },
  { value: "tarde", label: "Tarde" },
  { value: "indistinto", label: "Indistinto" },
];

function isFinDeSemana(dateStr: string): boolean {
  const day = new Date(dateStr + "T12:00:00").getDay();
  return day === 0 || day === 6;
}

function isUltimosDiasDelMes(dateStr: string): boolean {
  const date = new Date(dateStr + "T12:00:00");
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return date.getDate() >= lastDay - 2;
}

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Step6Cuando({ state, dispatch }: Props) {
  const canContinue = !!state.cuando && (state.cuando !== "fecha" || !!state.fecha_deseada);

  const handleCuando = (v: CuandoOpcion) => {
    const isUrgente = v === "antes_posible";
    dispatch({ type: "UPDATE", payload: { cuando: v, urgente: isUrgente } });
    if (v !== "fecha") {
      setTimeout(() => dispatch({ type: "NEXT", payload: { cuando: v, urgente: isUrgente } }), 250);
    }
  };

  const handleFecha = (dateStr: string) => {
    const finde = isFinDeSemana(dateStr) || isUltimosDiasDelMes(dateStr);
    dispatch({
      type: "UPDATE",
      payload: { fecha_deseada: dateStr, finde_o_finmes: finde },
    });
  };

  return (
    <div>
      <StepHeader
        eyebrow="Paso 6"
        title="¿Para cuándo necesitás el servicio?"
        subtitle="Elegí una opción para que podamos preparar la disponibilidad."
      />

      <div className="flex flex-col gap-3 mb-4">
        {CUANDO_OPTS.map((op) => (
          <OptionCard
            key={op.value}
            selected={state.cuando === op.value}
            onSelect={() => handleCuando(op.value)}
            label={op.label}
            description={op.description}
          />
        ))}
      </div>

      {state.cuando === "fecha" && (
        <div className="mb-4 rounded-[1.25rem] bg-black/[0.025] ring-1 ring-black/5 p-4">
          <label className="block text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-2">
            Fecha deseada
          </label>
          <div className="relative">
            <CalendarBlank
              size={16}
              weight="light"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--brand-500) pointer-events-none"
            />
            <input
              type="date"
              value={state.fecha_deseada ?? ""}
              onChange={(e) => handleFecha(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full pl-9 pr-4 py-3 rounded-[0.875rem] border border-black/10 focus:border-(--brand-400) focus:ring-2 focus:ring-(--brand-100) outline-none text-sm text-(--ink) transition-all duration-200"
            />
          </div>
          {state.finde_o_finmes && state.fecha_deseada && (
            <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mt-2">
              Fin de semana / fin de mes: puede tener un adicional del 25%.
            </p>
          )}
        </div>
      )}

      {/* Franja horaria */}
      <div className="rounded-[1.25rem] bg-black/[0.025] ring-1 ring-black/5 p-4 mb-6">
        <p className="text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-3">
          Franja horaria preferida
        </p>
        <div className="grid grid-cols-3 gap-2">
          {FRANJA_OPTS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => dispatch({ type: "UPDATE", payload: { franja: f.value } })}
              className={cn(
                "rounded-xl py-2 text-xs font-semibold transition-all duration-200",
                state.franja === f.value
                  ? "bg-(--brand-500) text-white"
                  : "bg-white border border-black/10 text-(--slate-600) hover:border-(--brand-300)"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {state.cuando === "fecha" && (
        <StepCTA
          onClick={() => canContinue && dispatch({ type: "NEXT" })}
          disabled={!canContinue}
        />
      )}
    </div>
  );
}
