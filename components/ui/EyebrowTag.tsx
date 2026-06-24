"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EyebrowTagProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function EyebrowTag({ children, className, animate = true }: EyebrowTagProps) {
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
    <Comp
      {...motionProps}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1",
        "text-eyebrow text-[--brand-600] bg-[--brand-50]",
        "border border-[--brand-100]",
        className
      )}
    >
      {children}
    </Comp>
  );
}
