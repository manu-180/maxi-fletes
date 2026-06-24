"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, CircleNotch } from "@phosphor-icons/react";
import { StepHeader } from "./StepHeader";
import { StepCTA } from "./StepCTA";
import { cn } from "@/lib/utils";
import { LOCALIDADES } from "@/lib/cotizador/localidades";
import type { CotizadorState, CotizadorAction } from "./cotizadorState";

type Suggestion = { label: string; zona: 1 | 2 | 3 | 4 };

// Fallback local si la API de direcciones no responde (offline / error)
function localFallback(q: string): Suggestion[] {
  const s = q.toLowerCase();
  return LOCALIDADES.filter((l) => l.nombre.toLowerCase().includes(s))
    .slice(0, 8)
    .map((l) => ({ label: l.nombre, zona: l.zona }));
}

interface LocalidadComboProps {
  label: string;
  value: string;
  onChange: (nombre: string, zona: 1 | 2 | 3 | 4) => void;
  placeholder?: string;
  id: string;
}

function LocalidadCombo({ label, value, onChange, placeholder, id }: LocalidadComboProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);

  const abortRef = useRef<AbortController | null>(null);
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const runSearch = useCallback((text: string) => {
    if (text.trim().length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    fetch(`/api/geo?q=${encodeURIComponent(text)}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data) => {
        const res: Suggestion[] = Array.isArray(data?.results) ? data.results : [];
        setResults(res.length ? res : localFallback(text));
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setResults(localFallback(text));
        setLoading(false);
      });
  }, []);

  const onInput = (text: string) => {
    setQuery(text);
    setOpen(true);
    setActive(-1);
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(() => runSearch(text), 300);
  };

  const select = (s: Suggestion) => {
    setQuery(s.label);
    setOpen(false);
    setResults([]);
    onChange(s.label, s.zona);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      select(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (debRef.current) clearTimeout(debRef.current);
    };
  }, []);

  const longEnough = query.trim().length >= 3;
  const showList = open && (loading || results.length > 0 || longEnough);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-xs font-semibold text-(--slate-600) uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        <MapPin
          size={16}
          weight="light"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--brand-500) pointer-events-none"
        />
        <input
          id={id}
          type="text"
          value={query}
          onChange={(e) => onInput(e.target.value)}
          onFocus={() => {
            if (results.length || longEnough) setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          placeholder={placeholder ?? "Calle y altura, o localidad…"}
          className={cn(
            "w-full pl-9 pr-10 py-3 rounded-[0.875rem] text-sm text-(--ink) bg-white",
            "border border-black/10 focus:border-(--brand-400) focus:ring-2 focus:ring-(--brand-100)",
            "outline-none transition-all duration-200 placeholder:text-(--slate-400)"
          )}
          role="combobox"
          aria-expanded={showList}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          autoComplete="off"
          inputMode="text"
        />
        {loading && (
          <CircleNotch
            size={16}
            weight="bold"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--brand-400) animate-spin pointer-events-none"
          />
        )}
      </div>

      {showList && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-20 w-full mt-1.5 rounded-[0.875rem] bg-white border border-black/10 shadow-[var(--shadow-lg)] overflow-hidden max-h-72 overflow-y-auto"
        >
          {loading && results.length === 0 && (
            <li className="px-4 py-3 text-sm text-(--slate-400)">Buscando direcciones…</li>
          )}
          {!loading && results.length === 0 && longEnough && (
            <li className="px-4 py-3 text-sm text-(--slate-400)">
              No encontramos esa dirección. Probá con la calle y altura, o la localidad.
            </li>
          )}
          {results.map((s, i) => (
            <li key={`${s.label}-${i}`} role="option" aria-selected={active === i}>
              <button
                type="button"
                className={cn(
                  "w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors duration-150",
                  active === i ? "bg-(--brand-50)" : "hover:bg-(--brand-50)"
                )}
                onMouseDown={() => select(s)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="text-sm text-(--ink) flex items-center gap-2 min-w-0">
                  <MapPin size={14} weight="fill" className="text-(--brand-400) shrink-0" />
                  <span className="truncate">{s.label}</span>
                </span>
                {s.zona === 4 && (
                  <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
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

  const canContinue = origen.length >= 2 && destino.length >= 2 && !!zonaO && !!zonaD;

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
        subtitle="Escribí la calle y altura, o la localidad. Te sugerimos la dirección exacta."
      />
      <div className="flex flex-col gap-4 mb-6">
        <LocalidadCombo
          id="origen"
          label="Retiro (origen)"
          value={origen}
          onChange={(n, z) => { setOrigen(n); setZonaO(z); }}
          placeholder="Ej: Av. Rivadavia 18000, Morón…"
        />
        <LocalidadCombo
          id="destino"
          label="Entrega (destino)"
          value={destino}
          onChange={(n, z) => { setDestino(n); setZonaD(z); }}
          placeholder="Ej: Belgrano 1200, Castelar…"
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
