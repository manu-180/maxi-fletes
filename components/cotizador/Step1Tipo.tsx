"use client";

import { Package, Truck, Warehouse, ArrowsLeftRight } from "@phosphor-icons/react";
import { OptionCard } from "./OptionCard";
import { StepHeader } from "./StepHeader";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";
import type { TipoServicio } from "@/lib/cotizador/types";

const OPCIONES: { value: TipoServicio; label: string; description: string; icon: React.ReactNode; highlight?: boolean }[] = [
  {
    value: "single_item",
    label: "Un mueble / objeto",
    description: "Sillón, heladera, lavarropas...",
    icon: <Package size={18} weight="light" />,
  },
  {
    value: "flete_chico",
    label: "Flete chico",
    description: "Poco volumen, pocas cajas",
    icon: <ArrowsLeftRight size={18} weight="light" />,
  },
  {
    value: "flete_grande",
    label: "Flete grande",
    description: "Varios muebles, más carga",
    icon: <Truck size={18} weight="light" />,
  },
  {
    value: "mudanza",
    label: "Mudanza completa",
    description: "Todo el contenido de un hogar",
    icon: <Warehouse size={18} weight="light" />,
    highlight: true,
  },
];

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Step1Tipo({ state, dispatch }: Props) {
  const handleSelect = (value: TipoServicio) => {
    dispatch({ type: "UPDATE", payload: { tipo: value } });
    // Auto-advance after brief feedback delay
    setTimeout(() => dispatch({ type: "NEXT" }), 250);
  };

  return (
    <div>
      <StepHeader
        eyebrow="Paso 1"
        title="¿Qué necesitás mover?"
        subtitle="Elegí el tipo de servicio que mejor describe lo que tenés."
      />
      <div className="flex flex-col gap-3">
        {OPCIONES.map((op) => (
          <OptionCard
            key={op.value}
            selected={state.tipo === op.value}
            onSelect={() => handleSelect(op.value)}
            icon={op.icon}
            label={op.label}
            description={op.description}
            highlight={op.highlight ?? false}
          />
        ))}
      </div>
    </div>
  );
}
