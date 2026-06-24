"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin } from "@phosphor-icons/react";
import { StepHeader } from "./StepHeader";
import { StepCTA } from "./StepCTA";
import { cn } from "@/lib/utils";
import { LOCALIDADES } from "@/lib/cotizador/localidades";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";

interface LocalidadComboProps {
  label: string;
  value: string;
  onChange: (nombre: string, zona: 1 | 2 | 3 | 4) => void;
  placeholder?: string;
  id: string;
}

function LocalidadCombo({ label, value, onChange, placeholder, id }: LocalidadComboProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length >= 2
    ? LOCALIDADES.filter((l) =>
        l.nombre.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSelect = (nombre: string, zona: 1 | 2 | 3 | 4) => {
    setQuery(nombre);
    setOpen(false);
    onChange(nombre, zona);
  };

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-xs font-semibold text-[--slate-600] uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        <MapPin
          size={16}
          weight="light"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[--brand-500] pointer-events-none"
        />
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder ?? "Escribí el barrio o localidad..."}
          className={cn(
            "w-full pl-9 pr-4 py-3 rounded-[0.875rem] text-sm text-[--ink] bg-white",
            "border border-black/10 focus:border-[--brand-400] focus:ring-2 focus:ring-[--brand-100]",
            "outline-none transition-all duration-200 placeholder:text-[--slate-400]"
          )}
          autoComplete="off"
          inputMode="text"
        />
      </div>
      {open && filtered.length > 0 && (
        <ul
          className="absolute z-10 w-full mt-1 rounded-[0.875rem] bg-white border border-black/10 shadow-lg overflow-hidden"
          role="listbox"
        >
          {filtered.map((l) => (
            <li key={l.nombre}>
              <button
                type="button"
                className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[--brand-50] transition-colors duration-150"
                onMouseDown={() => handleSelect(l.nombre, l.zona)}
                role="option"
                aria-selected={query === l.nombre}
              >
                <span className="text-sm text-[--ink]">{l.nombre}</span>
                {l.zona === 4 && (
                  <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                    Zona lejana
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface Props {
  state: CotizadorState;
  dispatch: React.Dispatch<CotizadorAction>;
}

export function Step2Origen({ state, dispatch }: Props) {
  const [origen, setOrigen] = useState(state.origen ?? "");
  const [zonaO, setZonaO] = useState(state.zona_origen);
  const [destino, setDestino] = useState(state.destino ?? "");
  const [zonaD, setZonaD] = useState(state.zona_destino);

  const canContinue = origen.length >= 2 && destino.length >= 2 && zonaO && zonaD;

  const handleNext = () => {
    if (!canContinue) return;
    dispatch({
      type: "NEXT",
      payload: {
        origen,
        zona_origen: zonaO,
        destino,
        zona_destino: zonaD,
      },
    });
  };

  return (
    <div>
      <StepHeader
        eyebrow="Paso 2"
        title="¿Desde dónde y hasta dónde?"
        subtitle="Escribí la localidad o barrio. Usamos esto para estimar la distancia."
      />
      <div className="flex flex-col gap-4 mb-6">
        <LocalidadCombo
          id="origen"
          label="Retiro (origen)"
          value={origen}
          onChange={(n, z) => { setOrigen(n); setZonaO(z); }}
          placeholder="Ej: Morón, Castelar, Liniers..."
        />
        <LocalidadCombo
          id="destino"
          label="Entrega (destino)"
          value={destino}
          onChange={(n, z) => { setDestino(n); setZonaD(z); }}
          placeholder="Ej: Moreno, Merlo, Flores..."
        />
      </div>

      {zonaD === 4 && (
        <div className="mb-4 rounded-[0.875rem] bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Zona un poco lejos de nuestra base.</strong> Igualmente hacemos el presupuesto
            — puede tener un adicional por distancia.
          </p>
        </div>
      )}

      <StepCTA onClick={handleNext} disabled={!canContinue} />
    </div>
  );
}
