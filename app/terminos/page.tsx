import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones del servicio de fletes y mudanzas de MaxiFletes en Morón y GBA Oeste.",
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <section className="px-4 pt-32 pb-24 bg-(--bg)">
      <div className="max-w-3xl mx-auto">
        <span className="text-eyebrow text-(--brand-600) inline-flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-(--accent-500)" aria-hidden />
          Legal
        </span>
        <h1
          className="text-h2 text-(--ink) mt-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Términos y condiciones
        </h1>
        <p className="text-(--slate-400) text-sm mt-3">Última actualización: junio 2026</p>

        <div className="prose-blog mt-10">
          <p>
            Estos términos explican cómo trabajamos en MaxiFletes. Al pedir un
            presupuesto o contratar un servicio, estás de acuerdo con lo siguiente.
          </p>

          <h2>El servicio</h2>
          <p>
            MaxiFletes ofrece fletes y mudanzas en Morón y la zona oeste del GBA. La
            coordinación de fechas, horarios y detalles se hace por WhatsApp o teléfono.
          </p>

          <h2>Presupuestos y precios</h2>
          <ul>
            <li>
              El precio que muestra el cotizador es un <strong>estimado</strong> en base
              a los datos que cargás, y se confirma antes de realizar el servicio.
            </li>
            <li>
              Si las condiciones reales difieren de lo informado (volumen, accesos,
              pisos sin ascensor, distancia), el precio final puede ajustarse, siempre
              avisándote antes.
            </li>
            <li>El presupuesto confirmado es el precio final: sin sorpresas.</li>
          </ul>

          <h2>Coordinación y responsabilidades</h2>
          <p>
            Trasladamos tus pertenencias con cuidado profesional. Te pedimos que la
            información que nos pases sea correcta para poder cumplir con la fecha, el
            horario y el precio acordados.
          </p>

          <h2>Seguro de carga</h2>
          <p>
            Los traslados cuentan con cobertura de carga. Ante cualquier eventualidad,
            nos hacemos responsables según las condiciones acordadas al momento de
            contratar.
          </p>

          <h2>Cancelaciones</h2>
          <p>
            Si necesitás reprogramar o cancelar, avisanos con la mayor anticipación
            posible por WhatsApp y lo reacomodamos sin problema.
          </p>

          <h2>Cambios en estos términos</h2>
          <p>
            Podemos actualizar estos términos cuando sea necesario. La versión vigente
            es siempre la publicada en esta página.
          </p>

          <h2>Contacto</h2>
          <p>¿Alguna duda? Escribinos por WhatsApp y te explicamos todo.</p>
        </div>
      </div>
    </section>
  );
}
