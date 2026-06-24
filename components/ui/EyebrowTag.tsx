"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EyebrowTagProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  /** Centra el kicker (rule + label) en headers centrados */
  center?: boolean;
}

/**
 * Kicker premium — etiqueta de sección con regla degradé.
 * Reemplaza el viejo pill delineado (se veía barato).
 */
export function EyebrowTag({ children, className, animate = true, center = false }: EyebrowTagProps) {
  const Comp = animate ? motion.span : "span";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }
    : {};

  return (
    <Comp {...motionProps} className={cn("kicker", center && "kicker-center", className)}>
      {children}
    </Comp>
  );
}
