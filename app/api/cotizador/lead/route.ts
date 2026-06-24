import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { calcularEstimado } from "@/lib/cotizador/calcular";
import type { CotizadorInput } from "@/lib/cotizador/types";

// ── Zod schema (server-side validation) ──────────────────────────────────────

const LeadSchema = z.object({
  // Honeypot — must be empty
  _hp: z.string().max(0, "bot"),
  // Contact
  nombre: z.string().min(2).max(100),
  whatsapp: z.string().regex(/^549\d{10}$/, "WhatsApp inválido (formato: 549XXXXXXXXXX)"),
  whatsapp_raw: z.string().max(20),
  consent_wpp: z.literal(true, { error: "Debés aceptar para continuar" }),
  prefiere_llamada: z.boolean().default(false),
  // Service inputs
  tipo_servicio: z.enum(["single_item", "flete_chico", "flete_grande", "mudanza"]),
  origen: z.string().min(2).max(100),
  destino: z.string().min(2).max(100),
  zona_origen: z.number().int().min(1).max(4),
  zona_destino: z.number().int().min(1).max(4),
  tamano: z.string().max(20).optional(),
  detalle_items: z.string().max(500).optional(),
  piso_origen: z.enum(["PB", "1-3", "4-6", "7+"]).default("PB"),
  ascensor_origen: z.boolean().default(false),
  piso_destino: z.enum(["PB", "1-3", "4-6", "7+"]).default("PB"),
  ascensor_destino: z.boolean().default(false),
  ayudantes: z.number().int().min(0).max(10).default(0),
  armado: z.boolean().default(false),
  embalaje: z.boolean().default(false),
  cuando: z.enum(["antes_posible", "esta_semana", "fecha", "no_se"]).optional(),
  fecha_deseada: z.string().max(10).optional(),
  franja: z.enum(["mañana", "tarde", "indistinto"]).default("indistinto"),
  urgente: z.boolean().default(false),
  finde_o_finmes: z.boolean().default(false),
  especiales: z.array(z.string().max(30)).max(10).default([]),
  // Modo
  modo: z.enum(["detallado", "rapido"]).default("detallado"),
  // Attribution
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  referrer: z.string().max(500).optional(),
});

// ── Simple in-memory rate limiter (resets on cold start — good enough for v1) ─

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Esperá un minuto." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Re-calculate server-side to prevent manipulation
  const calcInput: CotizadorInput = {
    tipo: data.tipo_servicio,
    origen: data.origen,
    zona_origen: data.zona_origen as 1 | 2 | 3 | 4,
    destino: data.destino,
    zona_destino: data.zona_destino as 1 | 2 | 3 | 4,
    tamano_mudanza: data.tamano as CotizadorInput["tamano_mudanza"],
    piso_origen: data.piso_origen,
    ascensor_origen: data.ascensor_origen,
    piso_destino: data.piso_destino,
    ascensor_destino: data.ascensor_destino,
    ayudantes: data.ayudantes,
    armado: data.armado,
    embalaje: data.embalaje,
    especiales: data.especiales,
    franja: data.franja,
    urgente: data.urgente,
    finde_o_finmes: data.finde_o_finmes,
    nombre: data.nombre,
    whatsapp: data.whatsapp,
    whatsapp_raw: data.whatsapp_raw,
    consent_wpp: true,
    prefiere_llamada: data.prefiere_llamada,
  };
  const estimado = calcularEstimado(calcInput, data.modo);

  try {
    const supabase = createServerClient();
    await supabase.from("presupuestos").insert({
      nombre: data.nombre,
      whatsapp: data.whatsapp,
      whatsapp_raw: data.whatsapp_raw,
      consent_wpp: true,
      prefiere_llamada: data.prefiere_llamada,
      tipo_servicio: data.tipo_servicio,
      origen: data.origen,
      destino: data.destino,
      zona_origen: data.zona_origen,
      zona_destino: data.zona_destino,
      tamano: data.tamano,
      detalle_items: data.detalle_items,
      piso_origen: data.piso_origen,
      ascensor_origen: data.ascensor_origen,
      piso_destino: data.piso_destino,
      ascensor_destino: data.ascensor_destino,
      ayudantes: data.ayudantes,
      armado: data.armado,
      embalaje: data.embalaje,
      cuando: data.cuando,
      fecha_deseada: data.fecha_deseada ?? null,
      franja: data.franja,
      urgente: data.urgente,
      finde_o_finmes: data.finde_o_finmes,
      especiales: data.especiales,
      estimado_min: estimado.min,
      estimado_max: estimado.max,
      estimado_central: estimado.central,
      tarifas_version: estimado.tarifas_version,
      estado: "nuevo",
      modo: data.modo,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      referrer: data.referrer,
      user_agent: req.headers.get("user-agent") ?? undefined,
    });
  } catch (err) {
    console.error("[cotizador/lead] Supabase insert error:", err);
    // Still return success to user — don't block the CTA
  }

  return NextResponse.json({ ok: true, estimado });
}
