"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Plus, Minus } from "@phosphor-icons/react";
import { EASE } from "@/lib/motion";
import { FAQ_ITEMS } from "@/data/faq";
import { cn } from "@/lib/utils";

function FaqItem({
  pregunta,
  respuesta,
  isOpen,
  onToggle,
  index,
}: {
  pregunta: string;
  respuesta: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
    >
      {/* Outer shell */}
      <div
        className={cn(
          "rounded-[1.25rem] p-[1px] transition-all duration-300",
          isOpen
            ? "bg-(--brand-50) ring-1 ring-(--brand-100)"
            : "bg-black/[0.03] ring-1 ring-black/5"
        )}
      >
        {/* Inner core */}
        <div className={cn("rounded-[calc(1.25rem-1px)] overflow-hidden", isOpen ? "bg-white" : "bg-white")}>
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
            aria-expanded={isOpen}
          >
            <span
              className={cn(
                "font-semibold text-[0.95rem] leading-snug transition-colors duration-200",
                isOpen ? "text-(--brand-600)" : "text-(--ink) group-hover:text-(--brand-600)"
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pregunta}
            </span>
            <span
              className={cn(
                "w-8 h-8 rounded-full grid place-items-center shrink-0 transition-all duration-300",
                isOpen
                  ? "bg-(--brand-500) text-white rotate-0"
                  : "bg-(--bg-soft) text-(--slate-600) group-hover:bg-(--brand-50) group-hover:text-(--brand-500)"
              )}
            >
              {isOpen ? <Minus weight="bold" size={14} /> : <Plus weight="bold" size={14} />}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={reduce ? {} : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? {} : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-(--slate-600) text-[0.9rem] leading-relaxed">
                  {respuesta}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-pad bg-(--bg)" id="faq" aria-label="Preguntas frecuentes">
      <div className="shell">
        <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <EyebrowTag center>FAQ</EyebrowTag>
          <motion.h2
            className="section-title text-[clamp(2.35rem,4.6vw,3.85rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Todo claro, sin letra chica
          </motion.h2>
        </div>

        {/* Acordeón */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={item.pregunta}
              pregunta={item.pregunta}
              respuesta={item.respuesta}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              index={i}
            />
          ))}
        </div>

        {/* Link a FAQ completo */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
        >
          <Link
            href="/faq"
            className="text-sm text-(--brand-600) hover:text-(--brand-500) font-medium underline underline-offset-4 transition-colors duration-200"
          >
            Ver todas las preguntas frecuentes →
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
