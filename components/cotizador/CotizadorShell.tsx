"use client";

import { useReducer, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";
import { cotizadorReducer, INITIAL_STATE, LS_KEY } from "./cotizadorState";
import { ProgressBar } from "./ProgressBar";
import { Step1Tipo } from "./Step1Tipo";
import { Step2Origen } from "./Step2Origen";
import { Step3Tamano } from "./Step3Tamano";
import { Step4Pisos } from "./Step4Pisos";
import { Step5Extras } from "./Step5Extras";
import { Step6Cuando } from "./Step6Cuando";
import { Step7Contacto } from "./Step7Contacto";
import { Resultado } from "./Resultado";
import { EASE_OUT } from "@/lib/motion";
import type { CotizadorState } from "./cotizadorState";

function loadFromLS(): CotizadorState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CotizadorState;
  } catch {
    return null;
  }
}

export function CotizadorShell() {
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(cotizadorReducer, INITIAL_STATE);
  const initialized = useRef(false);

  // Restore from localStorage on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = loadFromLS();
    if (saved && saved.step > 1 && saved.step < 8) {
      dispatch({ type: "UPDATE", payload: { ...saved } });
    }
  }, []);

  // Persist to localStorage on state change
  useEffect(() => {
    if (state.step === 8) {
      localStorage.removeItem(LS_KEY);
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    }
  }, [state]);

  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir * 48,
      filter: reduce ? "none" : "blur(4px)",
    }),
    animate: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir * -48,
      filter: reduce ? "none" : "blur(4px)",
    }),
  };

  const isResult = state.step === 8;
  const showBack = state.step > 1 && !isResult;

  const renderStep = () => {
    switch (state.step) {
      case 1: return <Step1Tipo state={state} dispatch={dispatch} />;
      case 2: return <Step2Origen state={state} dispatch={dispatch} />;
      case 3: return <Step3Tamano state={state} dispatch={dispatch} />;
      case 4: return <Step4Pisos state={state} dispatch={dispatch} />;
      case 5: return <Step5Extras state={state} dispatch={dispatch} />;
      case 6: return <Step6Cuando state={state} dispatch={dispatch} />;
      case 7: return <Step7Contacto state={state} dispatch={dispatch} />;
      case 8: return <Resultado state={state} dispatch={dispatch} />;
      default: return null;
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Ambient glow halo behind the card */}
      <div
        aria-hidden
        className="absolute -inset-x-6 -top-6 -bottom-10 -z-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--brand-100), transparent 70%)",
        }}
      />

      {/* Card shell — machined doble bisel */}
      <div className="rounded-[2rem] p-[2px] bg-gradient-to-b from-black/[0.07] to-black/[0.02] ring-1 ring-black/[0.06] shadow-[0_30px_80px_-24px_rgba(12,18,34,0.28)]">
        <div className="rounded-[calc(2rem-2px)] bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
          {/* Progress bar */}
          {!isResult && (
            <div className="px-6 pt-6 pb-0">
              <ProgressBar current={state.step} total={7} />
            </div>
          )}

          {/* Back button */}
          {showBack && (
            <div className="px-6 pt-3.5 pb-0">
              <button
                type="button"
                onClick={() => dispatch({ type: "BACK" })}
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-(--slate-600) hover:text-(--brand-600) transition-colors duration-200"
                aria-label="Paso anterior"
              >
                <span className="grid place-items-center w-6 h-6 rounded-full bg-(--bg-soft) group-hover:bg-(--brand-50) transition-colors duration-200">
                  <ArrowLeft
                    size={13}
                    weight="bold"
                    className="group-hover:-translate-x-0.5 transition-transform duration-200"
                  />
                </span>
                Volver
              </button>
            </div>
          )}

          {/* Step content */}
          <div className="px-6 py-6 min-h-[360px]">
            <AnimatePresence mode="wait" custom={state.direction}>
              <motion.div
                key={state.step}
                custom={state.direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Microcopy below */}
      {!isResult && (
        <p className="text-center text-xs text-(--slate-400) mt-5">
          🔒 Sin compromiso · Presupuesto sin cargo
        </p>
      )}
    </div>
  );
}
