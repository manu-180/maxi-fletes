"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

const ESTADOS = [
  { value: "nuevo", label: "Nuevo" },
  { value: "contactado", label: "Contactado" },
  { value: "ganado", label: "Ganado" },
  { value: "perdido", label: "Perdido" },
] as const;

type Estado = (typeof ESTADOS)[number]["value"];

const COLORS: Record<Estado, string> = {
  nuevo: "bg-[--brand-50] text-[--brand-600] hover:bg-[--brand-100] ring-[--brand-100]",
  contactado: "bg-orange-50 text-orange-600 hover:bg-orange-100 ring-orange-100",
  ganado: "bg-[--safe-50] text-[--safe-500] hover:bg-green-100 ring-green-100",
  perdido: "bg-[--bg-soft] text-[--slate-400] hover:bg-[--line] ring-[--line]",
};

const ACTIVE: Record<Estado, string> = {
  nuevo: "bg-[--brand-500] text-white ring-[--brand-600]",
  contactado: "bg-orange-500 text-white ring-orange-600",
  ganado: "bg-[--safe-500] text-white ring-green-600",
  perdido: "bg-[--slate-400] text-white ring-[--slate-600]",
};

interface Props {
  leadId: string;
  currentEstado: string;
}

export function UpdateEstado({ leadId, currentEstado }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function update(estado: Estado) {
    if (estado === currentEstado) return;
    startTransition(async () => {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Cambiar estado">
      {ESTADOS.map(({ value, label }) => {
        const isActive = value === currentEstado;
        return (
          <button
            key={value}
            onClick={() => update(value)}
            disabled={isPending}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-60 ${
              isActive ? ACTIVE[value] : COLORS[value]
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
