"use client";

import { useState } from "react";
import { OptionCard } from "./OptionCard";
import { StepHeader } from "./StepHeader";
import { StepCTA } from "./StepCTA";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";
import type { TamanoMudanza, TamanoFlete } from "@/lib/cotizador/types";

const MUDANZA_OPCIONES: { value: TamanoMudanza; label: string; description: string }[] = [
  { value: "mono", label: "Monoambiente", description: "1 cuarto, cocina y baño" },
  { value: "2amb", label: "2 ambientes", description: "Living + dormitorio + cocina" },
  { value: "3amb", label: "3 ambientes", description: "2 dormitorios + living + cocina" },
  { value: "4amb", label: "4 ambientes", description: "3 dormitorios o más" },
  { value: "casa", label: "Casa completa", description: "Casa de 2 plantas o más" },
];

const FLETE_OPCIONES: { value: TamanoFlete; label: string; description: string }[] = [
  { value: "poco", label: "Pocas cosas", description: "Algunas cajas, objetos chicos" },
  { value: "medio", label: "Carga media", description: "Media camioneta aproximadamente" },
  { value: "lleno", label: "Lleno", description: "Una camioneta completa" },
  { value: "mas_vuelta", label: "Más de una vuelta", description: "Necesitamos más de un viaje" },
];

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Step3Tamano({ state, dispatch }: Props) {
  const [detalleLibre, setDetalleLibre] = useState(state.detalle_items ?? "");

  const isMudanza = state.tipo === "mudanza";
  const isSingleItem = state.tipo === "single_item";
  const isFlete = state.tipo === "flete_chico" || state.tipo === "flete_grande";

  const tamanoMudanza = state.tamano_mudanza;
  const tamanoFlete = state.tamano_flete;

  const canContinue = isSingleItem
    ? detalleLibre.length >= 3
    : isMudanza
      ? !!tamanoMudanza
      : !!tamanoFlete;

  const handleNext = () => {
    if (!canContinue) return;
    dispatch({
      type: "NEXT",
      payload: { detalle_items: detalleLibre || undefined },
    });
  };

  const handleMudanzaSelect = (value: TamanoMudanza) => {
    dispatch({ type: "UPDATE", payload: { tamano_mudanza: value } });
    setTimeout(() => dispatch({ type: "NEXT" }), 250);
  };

  const handleFleteSelect = (value: TamanoFlete) => {
    dispatch({ type: "UPDATE", payload: { tamano_flete: value } });
    setTimeout(() => dispatch({ type: "NEXT" }), 250);
  };

  return (
    <div>
      <StepHeader
        eyebrow="Paso 3"
        title={
          isMudanza
            ? "¿Cuántos ambientes tiene el hogar?"
            : isSingleItem
              ? "¿Qué necesitás mover?"
              : "¿Cuánta carga tenés?"
        }
      />

      {isMudanza && (
        <div className="flex flex-col gap-3">
          {MUDANZA_OPCIONES.map((op) => (
            <OptionCard
              key={op.value}
              selected={tamanoMudanza === op.value}
              onSelect={() => handleMudanzaSelect(op.value)}
              label={op.label}
              description={op.description}
            />
          ))}
        </div>
      )}

      {isFlete && (
        <>
          <div className="flex flex-col gap-3 mb-4">
            {FLETE_OPCIONES.map((op) => (
              <OptionCard
                key={op.value}
                selected={tamanoFlete === op.value}
                onSelect={() => handleFleteSelect(op.value)}
                label={op.label}
                description={op.description}
              />
            ))}
          </div>
          <label className="block text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-1.5">
            ¿Qué cosas son? <span className="font-normal lowercase tracking-normal">(opcional)</span>
          </label>
          <textarea
            value={detalleLibre}
            onChange={(e) => setDetalleLibre(e.target.value)}
            rows={2}
            placeholder="Ej: 2 sillones, mesa de vidrio, 10 cajas..."
            className="w-full rounded-[0.875rem] border border-black/10 focus:border-(--brand-400) focus:ring-2 focus:ring-(--brand-100) px-4 py-3 text-sm text-(--ink) outline-none resize-none placeholder:text-(--slate-400) transition-all duration-200"
          />
        </>
      )}

      {isSingleItem && (
        <div>
          <label className="block text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-1.5">
            ¿Qué objeto es?
          </label>
          <input
            type="text"
            value={detalleLibre}
            onChange={(e) => setDetalleLibre(e.target.value)}
            placeholder="Ej: Heladera no frost, sillón 3 cuerpos, lavarropas..."
            className="w-full rounded-[0.875rem] border border-black/10 focus:border-(--brand-400) focus:ring-2 focus:ring-(--brand-100) px-4 py-3 text-sm text-(--ink) outline-none placeholder:text-(--slate-400) transition-all duration-200 mb-6"
          />
          <StepCTA onClick={handleNext} disabled={!canContinue} />
        </div>
      )}
    </div>
  );
}
