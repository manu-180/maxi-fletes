"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20consultar%20por%20un%20flete`;

// Ícono de WhatsApp (línea fina, consistente con Phosphor)
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  );
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const handler = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.6;
      if (shouldShow && !visible) {
        setVisible(true);
        setPulseActive(true);
        // El pulse para después de 3 ciclos (~6s)
        setTimeout(() => setPulseActive(false), 6000);
      } else if (!shouldShow) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [visible]);

  return (
    <>
      {/* ─── FAB WhatsApp — desktop ─── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-6 right-6 z-30 hidden md:block"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="relative group">
              {/* Tooltip */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium text-white bg-[--ink] px-3 py-1.5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ¿Dudas? Escribinos por WhatsApp
              </span>

              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                className={cn(
                  "grid place-items-center w-14 h-14 rounded-full",
                  "bg-[--safe-500] text-white",
                  "shadow-[0_4px_20px_rgba(24,169,87,0.35)]",
                  "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  "hover:scale-105 hover:shadow-[0_6px_28px_rgba(24,169,87,0.45)]",
                  pulseActive && "animate-pulse-ring"
                )}
              >
                <WhatsAppIcon size={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Barra sticky móvil — siempre visible ─── */}
      <div
        className="fixed bottom-0 inset-x-0 z-30 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center gap-2 p-3 bg-white/95 backdrop-blur-xl border-t border-[--line] shadow-[0_-4px_24px_rgba(12,18,34,0.08)]">
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
            aria-label="WhatsApp"
            className="flex items-center justify-center gap-2 px-4 h-11 rounded-full border border-[--safe-500] text-[--safe-500] font-semibold text-sm transition-colors duration-200 hover:bg-[--safe-50] shrink-0"
          >
            <WhatsAppIcon size={18} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
