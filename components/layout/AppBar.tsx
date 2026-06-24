"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Zonas", href: "/#cobertura" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Reseñas", href: "/#testimonios" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export function AppBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Cerrar menú con Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── AppBar desktop: pastilla flotante ─── */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center pt-5 px-4 pointer-events-none">
        <motion.nav
          className={cn(
            "pointer-events-auto flex items-center gap-8 rounded-full px-4 py-2.5",
            "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            scrolled
              ? "bg-white/85 backdrop-blur-xl ring-1 ring-black/8 shadow-[0_8px_32px_rgba(12,18,34,0.12)]"
              : "bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-[0_4px_16px_rgba(12,18,34,0.06)]"
          )}
          style={{ transform: scrolled ? "scale(0.99)" : "scale(1)" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-[--brand-900] font-display font-semibold text-[17px] tracking-tight whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Maxi<span className="text-[--brand-500]">Fletes</span>
          </Link>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-full",
                    "text-[--slate-600] hover:text-[--ink]",
                    "transition-colors duration-300",
                    "group"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  {/* Underline animado */}
                  <span
                    className={cn(
                      "absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-[--brand-500]",
                      "origin-center scale-x-0 group-hover:scale-x-100",
                      "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      pathname === link.href && "scale-x-100"
                    )}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <Button href="/cotizar" size="sm" icon={<ArrowUpRight weight="regular" size={14} />}>
              Cotizar ahora
            </Button>
          </div>

          {/* Hamburguesa mobile */}
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-full hover:bg-black/5 transition-colors duration-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span
              className={cn(
                "block w-5 h-[1.5px] bg-[--ink] rounded-full origin-center",
                "transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]",
                menuOpen && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block w-5 h-[1.5px] bg-[--ink] rounded-full origin-center",
                "transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]",
                menuOpen && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </button>
        </motion.nav>
      </header>

      {/* ─── Menú mobile: overlay glass ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-center px-6 bg-white/90 backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={() => setMenuOpen(false)}
          >
            {/* Links con staggered mask reveal */}
            <nav aria-label="Menú principal" onClick={(e) => e.stopPropagation()}>
              <ul className="flex flex-col gap-2 mt-16">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block py-4 text-[2rem] font-display font-semibold text-[--ink] hover:text-[--brand-500] transition-colors duration-200 border-b border-[--line]"
                      style={{ fontFamily: "var(--font-display)" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* CTAs en el overlay */}
              <motion.div
                className="flex flex-col gap-3 mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: NAV_LINKS.length * 0.06 + 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  href="/cotizar"
                  size="lg"
                  icon={<ArrowUpRight weight="regular" size={16} />}
                  className="justify-center w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Cotizar gratis
                </Button>
                <Button
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DUENO}?text=Hola%2C%20quiero%20consultar%20por%20un%20flete`}
                  size="lg"
                  variant="secondary"
                  className="justify-center w-full border-[--safe-500] text-[--safe-500] hover:bg-[--safe-50]"
                  onClick={() => setMenuOpen(false)}
                >
                  WhatsApp
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
