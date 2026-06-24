"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const FILTERS = [
  { label: "Todos", value: "" },
  { label: "Nuevos", value: "nuevo" },
  { label: "Contactados", value: "contactado" },
  { label: "Ganados", value: "ganado" },
  { label: "Perdidos", value: "perdido" },
] as const;

export function FilterPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const current = searchParams.get("estado") ?? "";
  const urgente = searchParams.get("urgente") === "true";

  function setFilter(estado: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (estado) {
      params.set("estado", estado);
    } else {
      params.delete("estado");
    }
    startTransition(() => router.push(`/admin/dashboard?${params}`));
  }

  function toggleUrgente() {
    const params = new URLSearchParams(searchParams.toString());
    if (urgente) {
      params.delete("urgente");
    } else {
      params.set("urgente", "true");
    }
    startTransition(() => router.push(`/admin/dashboard?${params}`));
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map(({ label, value }) => {
        const isActive = current === value;
        return (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              isActive
                ? "bg-[--ink] text-white shadow-sm"
                : "bg-white text-[--slate-600] ring-1 ring-[--line] hover:ring-[--brand-300] hover:text-[--brand-600]"
            }`}
          >
            {label}
          </button>
        );
      })}

      <div className="w-px h-5 bg-[--line] mx-1" aria-hidden />

      <button
        onClick={toggleUrgente}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          urgente
            ? "bg-red-500 text-white shadow-sm"
            : "bg-white text-[--slate-600] ring-1 ring-[--line] hover:ring-red-200 hover:text-red-500"
        }`}
      >
        🔴 Urgentes
      </button>
    </div>
  );
}
