import Link from "next/link";

export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden px-4 py-32 bg-(--bg-soft)"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 30%, rgba(46,91,224,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-lg text-center flex flex-col items-center gap-6">
        <span className="text-eyebrow text-(--brand-600) inline-flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-(--accent-500)" aria-hidden />
          Error 404
        </span>
        <h1
          className="text-h2 text-(--ink)"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Esta página se mudó… o nunca existió.
        </h1>
        <p className="text-body-lg text-(--slate-600)">
          No encontramos lo que buscabas. Volvé al inicio y seguimos desde ahí, o
          pedinos un presupuesto en un minuto.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-(--accent-500) px-6 py-3 font-semibold text-(--ink) transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Volver al inicio
          </Link>
          <Link
            href="/cotizar"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-(--brand-500) px-6 py-3 font-semibold text-(--brand-600) transition-colors duration-300 hover:bg-(--brand-50)"
          >
            Pedir presupuesto
          </Link>
        </div>
      </div>
    </section>
  );
}
