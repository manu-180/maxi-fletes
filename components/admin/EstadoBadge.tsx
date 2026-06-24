const CONFIG = {
  nuevo: {
    label: "Nuevo",
    className: "bg-(--brand-50) text-(--brand-600) ring-(--brand-100)",
    dot: "bg-(--brand-500)",
  },
  contactado: {
    label: "Contactado",
    className: "bg-orange-50 text-orange-600 ring-orange-100",
    dot: "bg-orange-500",
  },
  ganado: {
    label: "Ganado",
    className: "bg-(--safe-50) text-(--safe-500) ring-green-100",
    dot: "bg-(--safe-500)",
  },
  perdido: {
    label: "Perdido",
    className: "bg-(--bg-soft) text-(--slate-400) ring-(--line)",
    dot: "bg-(--slate-400)",
  },
} as const;

type Estado = keyof typeof CONFIG;

export function EstadoBadge({ estado }: { estado: string }) {
  const cfg = CONFIG[estado as Estado] ?? CONFIG.nuevo;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${cfg.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} aria-hidden />
      {cfg.label}
    </span>
  );
}
