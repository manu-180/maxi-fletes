import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo MaxiFletes cuida y usa tus datos cuando pedís un presupuesto o nos contactás.",
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
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
          Política de privacidad
        </h1>
        <p className="text-(--slate-400) text-sm mt-3">Última actualización: junio 2026</p>

        <div className="prose-blog mt-10">
          <p>
            En MaxiFletes cuidamos tus datos igual que cuidamos tus cosas. Acá te
            contamos, en criollo, qué información pedimos, para qué la usamos y qué
            podés hacer con ella.
          </p>

          <h2>Qué información recopilamos</h2>
          <ul>
            <li>
              Los datos que nos dejás al pedir un presupuesto o escribirnos: tu
              nombre, tu WhatsApp o teléfono y los detalles de la mudanza o el flete.
            </li>
            <li>
              Datos de navegación anónimos (páginas que visitás, tipo de dispositivo)
              a través de Google Analytics, con la IP anonimizada.
            </li>
          </ul>

          <h2>Para qué la usamos</h2>
          <ul>
            <li>Armar tu presupuesto y coordinar el servicio con vos.</li>
            <li>Responderte por WhatsApp o teléfono.</li>
            <li>Entender qué se usa del sitio para mejorarlo.</li>
          </ul>

          <h2>Dónde se guarda y con quién se comparte</h2>
          <p>
            Tus datos se guardan en una base de datos segura (Supabase) a la que solo
            accede el equipo de MaxiFletes. <strong>No vendemos ni cedemos tus datos</strong>{" "}
            a terceros con fines comerciales.
          </p>

          <h2>Cookies y analítica</h2>
          <p>
            Usamos Google Analytics para medir el uso del sitio de forma agregada.
            Podés bloquear las cookies desde tu navegador sin que eso afecte tu
            presupuesto.
          </p>

          <h2>Tus derechos</h2>
          <p>
            Podés pedirnos acceder, corregir o eliminar tus datos cuando quieras.
            Escribinos por WhatsApp y lo resolvemos.
          </p>

          <h2>Contacto</h2>
          <p>
            ¿Dudas sobre tus datos? Escribinos por WhatsApp y te respondemos a la
            brevedad.
          </p>
        </div>
      </div>
    </section>
  );
}
