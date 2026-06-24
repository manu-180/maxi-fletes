"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "@phosphor-icons/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (res.ok) {
          router.replace("/admin/dashboard");
        } else {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? "Contraseña incorrecta");
        }
      } catch {
        setError("Error de conexión. Intentá de nuevo.");
      }
    });
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 bg-(--bg-soft)">
      {/* Glow ambient */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(46,91,224,0.06), transparent)",
        }}
      />

      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl grid place-items-center text-white text-sm font-bold"
              style={{ background: "var(--brand-500)" }}
            >
              M
            </div>
            <span
              className="text-(--ink) font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MaxiFletes
            </span>
          </div>
        </div>

        {/* Card with double-bezel */}
        <div className="rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5">
          <div
            className="rounded-[calc(2rem-0.375rem)] bg-white p-8"
            style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)" }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-medium bg-(--brand-50) text-(--brand-600) mb-4">
                <Lock size={10} weight="fill" />
                Acceso restringido
              </div>
              <h1
                className="text-2xl font-semibold text-(--ink) leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Panel del dueño
              </h1>
              <p className="text-sm text-(--slate-400) mt-1.5">
                Ingresá tu contraseña para ver los leads
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-(--slate-600) mb-1.5 uppercase tracking-wide"
                >
                  Contraseña
                </label>
                {/* Input double-bezel */}
                <div className="rounded-xl p-px bg-black/[0.06] ring-1 ring-black/[0.07]">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full rounded-[calc(0.75rem-1px)] bg-white px-4 py-3 text-(--ink) text-sm placeholder:text-(--slate-400) focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending || !password}
                className="group mt-2 inline-flex items-center justify-between gap-3 rounded-full bg-(--brand-500) px-6 py-3 font-semibold text-white text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-(--brand-600) active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Ingresando…" : "Entrar al panel"}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-(--slate-400) mt-6">
          Acceso privado — MaxiFletes © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
