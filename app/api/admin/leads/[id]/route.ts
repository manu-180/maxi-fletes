import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const VALID_ESTADOS = ["nuevo", "contactado", "ganado", "perdido"] as const;

const PatchSchema = z.object({
  estado: z.enum(VALID_ESTADOS),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 422 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from("presupuestos")
    .update({ estado: parsed.data.estado })
    .eq("id", id);

  if (error) {
    console.error("[admin/leads/id] Supabase update error:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
