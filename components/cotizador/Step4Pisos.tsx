"use client";

import { StepHeader } from "./StepHeader";
import { StepCTA } from "./StepCTA";
import { cn } from "@/lib/utils";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";
import type { PisoLabel } from "@/lib/cotizador/types";

const PISOS: { value: PisoLabel; label: string }[] = [
  { value: "PB", label: "PB" },
  { value: "1-3", label: "1° – 3°" },
  { value: "4-6", label: "4° – 6°" },
  { value: "7+", label: "7° o más" },
];

interface PisoSelectorProps {
  label: string;
  value: PisoLabel;
  ascensor: boolean;
  onPiso: (v: PisoLabel) => void;
  onAscensor: (v: boolean) => void;
}

function PisoSelector({ label, value, ascensor, onPiso, onAscensor }: PisoSelectorProps) {
  return (
    <div className="rounded-[1.25rem] bg-black/[0.025] ring-1 ring-black/5 p-4">
      <p className="text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-3">{label}</p>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {PISOS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => onPiso(p.value)}
            className={cn(
              "rounded-[0.75rem] py-2 text-xs font-semibold transition-all duration-200",
              value === p.value
                ? "bg-(--brand-500) text-white shadow-sm"
                : "bg-white border border-black/10 text-(--slate-600) hover:border-(--brand-300)"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      {value !== "PB" && (
        <button
          type="button"
          onClick={() => onAscensor(!ascensor)}
          className={cn(
            "flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1.5 transition-all duration-200",
            ascensor
              ? "bg-(--safe-50) text-(--safe-500) border border-(--safe-500)/30"
              : "bg-white border border-black/10 text-(--slate-600) hover:border-(--brand-300)"
          )}
        >
          <span
            className={cn(
              "w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center transition-colors",
              ascensor ? "bg-(--safe-500) border-(--safe-500)" : "border-(--slate-400)"
            )}
          >
            {ascensor && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          Hay ascensor
        </button>
      )}
    </div>
  );
}

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Step4Pisos({ state, dispatch }: Props) {
  const handleNext = () => {
    dispatch({ type: "NEXT" });
  };

  return (
    <div>
      <StepHeader
        eyebrow="Paso 4"
        title="¿En qué piso es la carga y la descarga?"
        subtitle="Esto afecta el tiempo de trabajo y el presupuesto final."
      />

      <div className="flex flex-col gap-3 mb-6">
        <PisoSelector
          label="Origen (retiro)"
          value={state.piso_origen}
          ascensor={state.ascensor_origen}
          onPiso={(v) => dispatch({ type: "UPDATE", payload: { piso_origen: v } })}
          onAscensor={(v) => dispatch({ type: "UPDATE", payload: { ascensor_origen: v } })}
        />
        <PisoSelector
          label="Destino (entrega)"
          value={state.piso_destino}
          ascensor={state.ascensor_destino}
          onPiso={(v) => dispatch({ type: "UPDATE", payload: { piso_destino: v } })}
          onAscensor={(v) => dispatch({ type: "UPDATE", payload: { ascensor_destino: v } })}
        />
      </div>

      <StepCTA onClick={handleNext} />
    </div>
  );
}
