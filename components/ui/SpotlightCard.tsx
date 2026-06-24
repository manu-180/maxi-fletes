"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Variante sobre banda oscura (brand-950) */
  dark?: boolean;
  /** Etiqueta semántica del contenedor */
  as?: "div" | "li" | "article";
}

/**
 * Card premium con borde-luz que sigue el cursor (técnica "spotlight border").
 * Solo actualiza CSS vars (--mx/--my) en mousemove → sin reflows, GPU-friendly.
 * El estilo vive en .card-premium / .card-premium-dark (globals.css).
 */
export function SpotlightCard({
  children,
  className,
  dark = false,
  as = "div",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  const Comp = as as "div";

  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={handleMove}
      className={cn(dark ? "card-premium-dark" : "card-premium", className)}
    >
      {children}
    </Comp>
  );
}
