"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Plus, Minus, ArrowUpRight, ChatCircle } from "@phosphor-icons/react";
import { EASE } from "@/lib/motion";
import { FAQ_EXTENDED } from "@/data/faq";
import { cn } from "@/lib/utils";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FAQ_EXTENDED].map((item) => ({
    "@type": "Question",
    name: item.pregunta,
    acceptedAnswer: { "@type": "Answer", text: item.respuesta },
  })),
};

type FaqItemType = { pregunta: string; respuesta: string };

function FaqItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItemType;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: Math.min(index * 0.035, 0.28) }}
    >
      <div
        className={cn(
          "rounded-[1.25rem] p-[1px] transition-all duration-300",
          isOpen
            ? "bg-[--brand-50] ring-1 ring-[--brand-200]"
            : "bg-black/[0.03] ring-1 ring-black/5 hover:ring-black/10"
        )}
      >
        <div className="rounded-[calc(1.25rem-1px)] bg-white overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
            aria-expanded={isOpen}
          >
            <span
              className={cn(
                "font-semibold text-[0.95rem] leading-snug transition-colors duration-200",
                isOpen
                  ? "text-[--brand-600]"
                  : "text-[--ink] group-hover:text-[--brand-600]"
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.pregunta}
            </span>
            <span
              className={cn(
                "w-8 h-8 rounded-full grid place-items-center shrink-0 transition-all duration-300",
                isOpen
                  ? "bg-[--brand-500] text-white"
                  : "bg-[--bg-soft] text-[--slate-600] group-hover:bg-[--brand-50] group-hover:text-[--brand-500]"
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
                <p className="px-6 pb-5 text-[--slate-600] text-[0.9rem] leading-relaxed">
                  {item.respuesta}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function FaqFullPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = [...FAQ_EXTENDED] as FaqItemType[];

  return (
    <main className="min-h-[100dvh] bg-[--bg] pt-28 pb-24 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ── Header ─────────────────────────────────── */}
      <div className="max-w-2xl mx-auto text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex justify-center mb-4"
        >
          <EyebrowTag>Preguntas frecuentes</EyebrowTag>
        </motion.div>

        <motion.h1
          className="text-[2.25rem] md:text-[3rem] font-display font-bold text-[--ink] leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
        >
          Todo claro,{" "}
          <span className="text-[--brand-500]">sin letra chica</span>
        </motion.h1>

        <motion.p
          className="text-[--slate-600] text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
        >
          Fletes y mudanzas sin vueltas. Todo lo que necesitás saber antes de
          cotizar, en un solo lugar.
        </motion.p>
      </div>

      {/* ── Accordion ──────────────────────────────── */}
      <div className="max-w-2xl mx-auto flex flex-col gap-3 mb-20">
        {items.map((item, i) => (
          <FaqItem
            key={item.pregunta}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            index={i}
          />
        ))}
      </div>

      {/* ── CTA Card ───────────────────────────────── */}
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {/* Double-bezel CTA */}
        <div className="rounded-[2rem] p-[2px] bg-gradient-to-br from-[--brand-100] to-[--brand-200] shadow-xl shadow-[--brand-500]/10">
          <div className="rounded-[calc(2rem-2px)] bg-white px-8 py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-[--brand-50] grid place-items-center mx-auto mb-5">
              <ChatCircle size={22} weight="light" className="text-[--brand-500]" />
            </div>
            <h2
              className="text-xl font-display font-semibold text-[--ink] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ¿Tenés otra pregunta?
            </h2>
            <p className="text-[--slate-600] text-sm mb-7 leading-relaxed">
              Escribinos directo por WhatsApp y te respondemos en minutos. Sin
              intermediarios, sin esperas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20tengo%20una%20consulta%20sobre%20fletes`}
                size="md"
                icon={<ArrowUpRight weight="regular" size={16} />}
              >
                Escribinos por WhatsApp
              </Button>
              <Button href="/cotizar" size="md" variant="secondary">
                Cotizar ahora
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-[--slate-500] hover:text-[--brand-500] transition-colors duration-200 underline underline-offset-4"
          >
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
