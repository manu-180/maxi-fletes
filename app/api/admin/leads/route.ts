import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const VALID_ESTADOS = ["nuevo", "contactado", "ganado", "perdido"] as const;
const PAGE_SIZE = 50;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const estado = searchParams.get("estado");
  const urgente = searchParams.get("urgente");
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const supabase = createServerClient();
  let query = supabase
    .from("presupuestos")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (estado && VALID_ESTADOS.includes(estado as (typeof VALID_ESTADOS)[number])) {
    query = query.eq("estado", estado);
  }
  if (urgente === "true") {
    query = query.eq("urgente", true);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[admin/leads] Supabase error:", error);
    return NextResponse.json({ error: "Error al leer leads" }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [], total: count ?? 0, page, pageSize: PAGE_SIZE });
}
