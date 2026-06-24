"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { gtagEvent } from "@/lib/gtag";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20consultar%20por%20un%20flete`;

const SPRING = [0.32, 0.72, 0, 1] as const;

export function FloatingActions() {
  // Abierto (pill) arriba de todo; se achica a círculo al scrollear hacia abajo.
  // Vuelve a abrirse al pasar el mouse por encima.
  const [collapsed, setCollapsed] = useState(false);
  const [hover, setHover] = useState(false);
  const open = !collapsed || hover;

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── FAB WhatsApp premium — desktop ─── */}
      <motion.div
        className="fixed bottom-7 right-7 z-30 hidden md:block"
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: SPRING, delay: 0.4 }}
      >
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribinos por WhatsApp"
          onClick={() => gtagEvent("whatsapp_click", { source: "fab_desktop" })}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={cn(
            "group relative flex items-center p-2 rounded-full",
            "bg-[linear-gradient(135deg,#25d366_0%,#16a34a_100%)] text-white",
            "ring-1 ring-white/25",
            "shadow-[0_12px_36px_-8px_rgba(22,163,74,0.65)]",
            "transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-8px_rgba(22,163,74,0.75)]"
          )}
        >
          {/* Brillo superior sutil — superficie premium */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent_45%)]"
          />

          {/* Ícono en su círculo — button-in-button, lenguaje del sitio */}
          <span className="relative grid place-items-center w-11 h-11 rounded-full bg-white/20 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
            <WhatsappLogo weight="fill" size={24} />
          </span>

          {/* Etiqueta — se despliega arriba de todo / al hover */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.span
                key="label"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.42, ease: SPRING }}
                className="relative overflow-hidden whitespace-nowrap"
              >
                <span className="flex flex-col leading-tight pl-3 pr-3">
                  <span className="text-[0.95rem] font-semibold tracking-[-0.01em]">
                    Escribinos
                  </span>
                  <span className="text-[0.72rem] font-medium text-white/85">
                    Respondemos al toque
                  </span>
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </a>
      </motion.div>

      {/* ─── Barra sticky móvil — siempre visible ─── */}
      <div
        className="fixed bottom-0 inset-x-0 z-30 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center gap-2.5 p-3 bg-white/95 backdrop-blur-xl border-t border-(--line) shadow-[0_-4px_24px_rgba(12,18,34,0.08)]">
          <Button
            href="/cotizar"
            size="md"
            icon={<ArrowUpRight weight="regular" size={14} />}
            className="flex-1 justify-center"
          >
            Cotizar gratis
          </Button>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribinos por WhatsApp"
            onClick={() => gtagEvent("whatsapp_click", { source: "sticky_mobile" })}
            className="grid place-items-center w-12 h-12 rounded-full shrink-0 text-white bg-[linear-gradient(135deg,#25d366_0%,#16a34a_100%)] ring-1 ring-white/25 shadow-[0_8px_22px_-6px_rgba(22,163,74,0.6)] transition-transform duration-200 active:scale-95"
          >
            <WhatsappLogo weight="fill" size={22} />
          </a>
        </div>
      </div>
    </>
  );
}
