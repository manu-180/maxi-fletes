import type { Metadata } from "next";
import { CotizadorShell } from "@/components/cotizador/CotizadorShell";
import { Star, ShieldCheck, Clock } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Cotizador gratuito — MaxiFletes Morón",
  description:
    "Obtené un estimado de precio para tu flete o mudanza en Morón y GBA Oeste en menos de 2 minutos. Sin compromiso.",
  robots: { index: true, follow: true },
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const TRUST = [
  { icon: <Star size={16} weight="fill" className="text-[--accent-500]" />, label: "+18 años en el oeste" },
  { icon: <Clock size={16} weight="light" className="text-[--brand-500]" />, label: "Estimado en 2 minutos" },
  { icon: <ShieldCheck size={16} weight="light" className="text-[--safe-500]" />, label: "Sin compromiso" },
];

export default function CotizarPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[--bg-soft] pt-28 pb-24 px-4">
      {/* ── Ambient mesh background ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-100), transparent 62%)" }}
        />
        <div
          className="absolute top-1/3 -right-48 w-[560px] h-[560px] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, #fff1dd, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[480px] h-[480px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-50), transparent 68%)" }}
        />
        {/* film grain */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{ backgroundImage: GRAIN }}
        />
      </div>

      {/* ── Header ── */}
      <div className="max-w-lg mx-auto text-center mb-9">
        <span className="inline-flex items-center rounded-full px-3 py-1 mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[--brand-600] bg-white/70 backdrop-blur-sm border border-[--brand-100] shadow-sm">
          Cotizador gratuito
        </span>
        <h1
          className="text-[2.1rem] md:text-[2.6rem] font-semibold text-[--ink] leading-[1.08] tracking-[-0.02em] mb-3.5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ¿Cuánto sale tu flete?
        </h1>
        <p className="text-[--slate-600] text-[0.97rem] leading-relaxed max-w-md mx-auto">
          Respondé unas preguntas y te mostramos un rango de precio al instante.
          El presupuesto final lo cerramos por WhatsApp.
        </p>
      </div>

      {/* ── Cotizador ── */}
      <CotizadorShell />

      {/* ── Trust strip ── */}
      <div className="max-w-lg mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {TRUST.map((t) => (
          <div key={t.label} className="inline-flex items-center gap-2">
            {t.icon}
            <span className="text-xs font-medium text-[--slate-600]">{t.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
