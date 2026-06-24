import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, WhatsappLogo, InstagramLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";

const SERVICIOS = [
  { label: "Mudanzas completas", href: "/mudanzas" },
  { label: "Fletes locales", href: "/fletes/moron" },
  { label: "Mini fletes", href: "/#servicios" },
  { label: "Embalaje y armado", href: "/#servicios" },
];

const ZONAS = [
  { label: "Morón", href: "/fletes/moron" },
  { label: "Castelar", href: "/fletes/castelar" },
  { label: "Haedo", href: "/fletes/haedo" },
  { label: "El Palomar", href: "/fletes/el-palomar" },
  { label: "Ramos Mejía", href: "/fletes/ramos-mejia" },
  { label: "Ituzaingó", href: "/fletes/ituzaingo" },
  { label: "Hurlingham", href: "/fletes/hurlingham" },
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491126948110";

// Formatea 549 11 XXXXXXXX → +54 11 XXXX-XXXX (GBA / CABA, área 11)
function formatWhatsApp(num: string): string {
  const d = num.replace(/\D/g, "");
  const rest = d.startsWith("549") ? d.slice(3) : d.startsWith("54") ? d.slice(2) : d;
  if (rest.length < 10) return "+54 11 0000-0000";
  const area = rest.slice(0, 2);
  const local = rest.slice(2);
  return `+54 ${area} ${local.slice(0, 4)}-${local.slice(4)}`;
}

export function Footer() {
  return (
    <footer>
      {/* ─── Pre-footer CTA — banda premium ─── */}
      <div className="relative overflow-hidden bg-dark-band">
        {/* Tipografía marca de agua, sutil */}
        <span
          className="pointer-events-none select-none absolute -right-6 -bottom-10 text-[12rem] md:text-[18rem] leading-none font-display font-semibold text-white/[0.025]"
          aria-hidden
        >
          oeste
        </span>

        <div className="shell py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-5">
              <span className="kicker kicker-light">¿Listo para mudarte?</span>
              <h2 className="text-white text-[clamp(2.25rem,4.6vw,3.75rem)] font-display font-semibold tracking-[-0.025em] leading-[1.02]">
                Tu próxima mudanza,
                <br />
                sin dolores de cabeza.
              </h2>
              <p className="text-[#c3cdee] text-body-lg max-w-md">
                Presupuesto al instante y un equipo que cuida tus cosas como
                propias. Empezá hoy mismo.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 lg:items-end">
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                <Button href="/cotizar" size="md" icon={<ArrowUpRight weight="bold" size={15} />} className="justify-center">
                  Cotizar gratis
                </Button>
                <Button
                  href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20consultar%20por%20un%20flete`}
                  size="md"
                  variant="secondary"
                  icon={<WhatsappLogo weight="fill" size={15} />}
                  className="justify-center"
                >
                  WhatsApp
                </Button>
              </div>
              <p className="text-white/45 text-xs">Respondemos rápido · Lun a Sáb, 8 a 20 h</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Cuerpo del footer ─── */}
      <div className="bg-(--brand-950) border-t border-white/8 py-16 md:py-20">
        <div className="shell grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-x-8 gap-y-12">
          {/* Marca */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-white font-semibold text-2xl tracking-tight inline-block mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Maxi<span className="text-(--brand-300)">Fletes</span>
            </Link>
            <p className="text-[#9fa9c8] text-sm leading-relaxed mb-6 max-w-xs">
              Tus cosas, en buenas manos. 18 años moviendo casas y oficinas por
              todo el oeste del GBA.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: InstagramLogo, label: "Instagram", href: "#" },
                { Icon: FacebookLogo, label: "Facebook", href: "#" },
                { Icon: WhatsappLogo, label: "WhatsApp", href: `https://wa.me/${WA_NUMBER}` },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label} de MaxiFletes`}
                  className="grid place-items-center w-9 h-9 rounded-full bg-white/[0.04] ring-1 ring-white/10 text-[#9fa9c8] transition-all duration-300 hover:text-white hover:bg-white/10 hover:ring-white/25 hover:-translate-y-0.5"
                >
                  <Icon weight="fill" size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <FooterCol title="Servicios" links={SERVICIOS} />
          {/* Zonas */}
          <FooterCol title="Zonas" links={ZONAS} />

          {/* Contacto */}
          <div>
            <h3 className="text-white/45 text-[0.7rem] font-semibold uppercase tracking-[0.18em] mb-5">
              Contacto
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex flex-col gap-1">
                <span className="text-white/35 text-[0.7rem] uppercase tracking-[0.14em]">WhatsApp</span>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  className="group inline-flex items-center gap-2 text-white font-medium transition-colors duration-300 hover:text-(--brand-300)"
                >
                  <WhatsappLogo weight="fill" size={15} className="text-(--safe-500)" />
                  {formatWhatsApp(WA_NUMBER)}
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/35 text-[0.7rem] uppercase tracking-[0.14em]">Zona</span>
                <span className="text-[#cdd4e8]">Morón y GBA Oeste</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/35 text-[0.7rem] uppercase tracking-[0.14em]">Horarios</span>
                <span className="text-[#cdd4e8]">Lun a Sáb · 8 a 20 h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="shell mt-14 pt-7 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#7f88a6] text-xs">
            © {new Date().getFullYear()} MaxiFletes · Hecho en Morón
          </p>
          <div className="flex items-center gap-1">
            <Link href="/privacidad" className="text-[#7f88a6] hover:text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-300">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-[#7f88a6] hover:text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-300">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-white/45 text-[0.7rem] font-semibold uppercase tracking-[0.18em] mb-3">
        {title}
      </h3>
      <ul className="flex flex-col gap-0.5">
        {links.map((l) => (
          <li key={l.label}>
            {/* Zona de hover generosa: -mx-3/px-3/py-2 agranda el área clickeable
                sin mover el layout, con superficie sutil al pasar el mouse. */}
            <Link
              href={l.href}
              className="group -mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#aab2cf] transition-colors duration-300 hover:text-white hover:bg-white/[0.04]"
            >
              <span className="h-px w-0 bg-(--brand-300) transition-all duration-300 group-hover:w-3.5" aria-hidden />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
