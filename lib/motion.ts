// Tokens de movimiento — una sola "voz" de animación en todo el sitio
export const EASE = [0.32, 0.72, 0, 1] as const;
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_REVEAL = [0.16, 1, 0.3, 1] as const;

export const DUR = { fast: 0.2, base: 0.5, slow: 0.8 } as const;

export const reveal = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: DUR.slow, ease: EASE },
} as const;

export const staggerParent = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
} as const;

export const staggerChild = {
  variants: {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DUR.base, ease: EASE },
    },
  },
} as const;

export const cardHover = {
  whileHover: { y: -6, boxShadow: "0 20px 50px rgba(12,18,34,0.12)" },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.3, ease: EASE_OUT },
} as const;
