"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function formatARS(n: number) {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

interface PriceCountUpProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function PriceCountUp({
  value,
  duration = 1100,
  delay = 0,
  className,
  style,
}: PriceCountUpProps) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : Math.round(value * 0.45));
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    if (started.current) return;
    started.current = true;

    const from = Math.round(value * 0.45);
    const t0 = performance.now() + delay;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(Math.max((now - t0) / duration, 0), 1);
      setN(Math.round(from + (value - from) * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, delay, reduce]);

  return (
    <span className={className} style={style}>
      {formatARS(n)}
    </span>
  );
}
