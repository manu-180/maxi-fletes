import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";
import { FilterPills } from "@/components/admin/FilterPills";
import { LeadCard } from "@/components/admin/LeadCard";
import { LogoutButton } from "@/components/admin/LogoutButton";
// Inline SVG icon helpers (avoids client-context issues in Server Components)
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-10.6-3.84,80,80,0,0,0-84-41.32,8,8,0,1,1-2.86-15.75,96,96,0,0,1,100.74,49.51A8,8,0,0,1,250.14,206.7ZM192,88a44,44,0,1,1,44,44A44,44,0,0,1,192,88Z" />
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
  </svg>
);
const IconTruck = () => (
  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A8,8,0,0,0,247.42,117ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm112,0a16,16,0,1,1,16-16A16,16,0,0,1,184,208ZM24,88H168V184H105a32,32,0,0,0-62,0H24ZM232,184H215a32,32,0,0,0-62,0H184V128h30.58l17.42,43.5Z" />
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
  </svg>
);

type SearchParams = Promise<{ estado?: string; urgente?: string }>;

async function fetchStats(supabase: ReturnType<typeof createServerClient>) {
  const [total, nuevo, contactado, ganado] = await Promise.all([
    supabase.from("presupuestos").select("*", { count: "exact", head: true }),
    supabase.from("presupuestos").select("*", { count: "exact", head: true }).eq("estado", "nuevo"),
    supabase.from("presupuestos").select("*", { count: "exact", head: true }).eq("estado", "contactado"),
    supabase.from("presupuestos").select("*", { count: "exact", head: true }).eq("estado", "ganado"),
  ]);
  return {
    total: total.count ?? 0,
    nuevo: nuevo.count ?? 0,
    contactado: contactado.count ?? 0,
    ganado: ganado.count ?? 0,
  };
}

export default async function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const { estado, urgente } = await searchParams;

  const supabase = createServerClient();

  // Fetch leads + stats in parallel
  let query = supabase
    .from("presupuestos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (estado) query = query.eq("estado", estado);
  if (urgente === "true") query = query.eq("urgente", true);

  const [{ data: leads }, stats] = await Promise.all([
    query,
    fetchStats(supabase),
  ]);

  const displayLeads = leads ?? [];

  return (
    <div className="min-h-[100dvh] bg-(--bg-soft)">
      {/* Top header bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-(--line)">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg grid place-items-center text-white text-xs font-bold shrink-0"
              style={{ background: "var(--brand-500)" }}
            >
              M
            </div>
            <div>
              <span
                className="text-(--ink) text-sm font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                MaxiFletes
              </span>
              <span className="text-(--slate-400) text-xs ml-2">/ Panel</span>
            </div>
          </div>

          <LogoutButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Page title */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-(--brand-600) mb-1">
            Dashboard
          </p>
          <h1
            className="text-2xl font-semibold text-(--ink)"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Leads de presupuestos
          </h1>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Total leads"
            value={stats.total}
            icon={<IconUsers />}
            color="text-(--brand-500)"
          />
          <StatCard
            label="Sin contactar"
            value={stats.nuevo}
            icon={<IconClock />}
            color="text-orange-500"
            highlight={stats.nuevo > 0}
          />
          <StatCard
            label="Contactados"
            value={stats.contactado}
            icon={<IconTruck />}
            color="text-(--accent-500)"
          />
          <StatCard
            label="Ganados"
            value={stats.ganado}
            icon={<IconCheck />}
            color="text-(--safe-500)"
          />
        </div>

        {/* Filter bar */}
        <Suspense fallback={null}>
          <FilterPills />
        </Suspense>

        {/* Leads list */}
        {displayLeads.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-(--slate-400)">
              {displayLeads.length} lead{displayLeads.length !== 1 ? "s" : ""}
              {estado ? ` · ${estado}` : ""}
              {urgente === "true" ? " · urgentes" : ""}
            </p>
            {displayLeads.map((lead) => (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <LeadCard key={lead.id} lead={lead as any} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  highlight = false,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] p-1 ring-1 ${highlight ? "ring-orange-200 bg-orange-50/60" : "ring-black/5 bg-black/[0.02]"}`}
    >
      <div
        className="rounded-[calc(1.5rem-0.25rem)] bg-white px-4 py-4"
        style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)" }}
      >
        <div className={`mb-2 ${color}`}>{icon}</div>
        <p
          className="text-2xl font-semibold text-(--ink) tabular"
          style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </p>
        <p className="text-[11px] text-(--slate-400) mt-0.5 font-medium uppercase tracking-wide">
          {label}
        </p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[1.75rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5">
      <div
        className="rounded-[calc(1.75rem-0.375rem)] bg-white px-8 py-16 text-center"
        style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)" }}
      >
        <div className="text-4xl mb-4">📭</div>
        <p className="text-(--ink) font-semibold">Sin leads</p>
        <p className="text-sm text-(--slate-400) mt-1">
          Cuando alguien complete el cotizador, aparecerá acá.
        </p>
      </div>
    </div>
  );
}
