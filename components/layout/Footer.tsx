import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const SERVICIOS = [
  { label: "Fletes locales", href: "/fletes-moron" },
  { label: "Mudanzas completas", href: "/mudanzas" },
  { label: "Mini fletes", href: "/#servicios" },
  { label: "Embalaje", href: "/#servicios" },
];

const ZONAS = [
  { label: "Morón", href: "/fletes-moron" },
  { label: "Castelar", href: "/fletes-castelar" },
  { label: "Haedo", href: "/fletes-haedo" },
  { label: "El Palomar", href: "/fletes-el-palomar" },
  { label: "Ramos Mejía", href: "/fletes-ramos-mejia" },
  { label: "Ituzaingó", href: "/fletes-ituzaingo" },
  { label: "Hurlingham", href: "/fletes-hurlingham" },
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000";

export function Footer() {
  return (
    <footer>
      {/* ─── CTA Band ─── */}
      <div className="bg-dark-band py-24 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[--brand-300] text-eyebrow mb-3">
              ¿Listo para mudarte?
            </p>
            <h2
              className="text-h2 text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sin dolores de cabeza.
              <br />
              Con presupuesto al instante.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              href="/cotizar"
              size="lg"
              icon={<ArrowUpRight weight="regular" size={16} />}
            >
              Cotizar gratis
            </Button>
            <Button
              href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20consultar%20por%20un%20flete`}
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 border border-white/20"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Cuerpo del footer ─── */}
      <div className="bg-[--brand-950] border-t border-white/5 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Marca */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-white font-semibold text-xl tracking-tight mb-3 inline-block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Maxi<span className="text-[--brand-300]">Fletes</span>
            </Link>
            <p className="text-[--slate-400] text-sm leading-relaxed mb-4">
              Tus cosas, en buenas manos.
              <br />
              18 años moviendo el oeste.
            </p>
            {/* Redes — placeholder */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram de MaxiFletes"
                className="w-8 h-8 rounded-full border border-white/10 grid place-items-center text-[--slate-400] hover:text-white hover:border-white/30 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                aria-label="Facebook de MaxiFletes"
                className="w-8 h-8 rounded-full border border-white/10 grid place-items-center text-[--slate-400] hover:text-white hover:border-white/30 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Servicios */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Servicios
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICIOS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-[--slate-400] hover:text-white text-sm transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Zonas */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Zonas que cubrimos
            </h3>
            <ul className="flex flex-col gap-2.5">
              {ZONAS.map((z) => (
                <li key={z.href}>
                  <Link
                    href={z.href}
                    className="text-[--slate-400] hover:text-white text-sm transition-colors duration-200"
                  >
                    {z.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto (NAP) */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[--slate-400]">
              <li>
                <span className="block text-[--slate-400] text-xs uppercase tracking-widest mb-1">
                  WhatsApp
                </span>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  className="text-white hover:text-[--brand-300] transition-colors duration-200 font-medium"
                >
                  {/* Placeholder — reemplazar con número real */}
                  +54 11 0000-0000
                </a>
              </li>
              <li>
                <span className="block text-[--slate-400] text-xs uppercase tracking-widest mb-1">
                  Zona
                </span>
                <span className="text-white">Morón y GBA Oeste</span>
              </li>
              <li>
                <span className="block text-[--slate-400] text-xs uppercase tracking-widest mb-1">
                  Horarios
                </span>
                <span className="text-white">Lun–Sáb 8:00–20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[--slate-400] text-xs">
            © {new Date().getFullYear()} MaxiFletes. Hecho en Morón.
          </p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="text-[--slate-400] hover:text-white text-xs transition-colors duration-200">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-[--slate-400] hover:text-white text-xs transition-colors duration-200">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
