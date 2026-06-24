"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_REVEAL = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  once?: boolean;
}

const directionMap = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { y: 0, x: 24 },
  right: { y: 0, x: -24 },
  fade: { y: 0, x: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealProps) {
  const offset = directionMap[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: offset.y, x: offset.x, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: EASE_REVEAL }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container para listas de items */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Item individual para usar dentro de RevealGroup */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE_REVEAL },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
