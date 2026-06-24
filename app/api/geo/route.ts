import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// Autocompletado de direcciones — proxy a Georef (API oficial argentina,
// gratuita y sin API key). Encuentra localidades, calles y alturas en todo el
// país, y deriva la "zona" de precio (1-4) por distancia a la base de Morón.
// Doc: https://apis.datos.gob.ar/georef
// ─────────────────────────────────────────────────────────────────────────────

const GEOREF = "https://apis.datos.gob.ar/georef/api";

// Base de operaciones — Morón centro
const BASE = { lat: -34.6534, lon: -58.6198 };

export type GeoResult = {
  label: string;
  zona: 1 | 2 | 3 | 4;
  km: number;
};

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Bandas calibradas contra el GBA Oeste real (Morón=1 … fuera de zona=4)
function zonaFromKm(km: number): 1 | 2 | 3 | 4 {
  if (km <= 6) return 1;
  if (km <= 13) return 2;
  if (km <= 28) return 3;
  return 4;
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b([a-záéíóúñ])/g, (m) => m.toUpperCase())
    .replace(/\bDe\b|\bDel\b|\bLa\b|\bLas\b|\bLos\b|\bY\b/g, (m) => m.toLowerCase());
}

async function fetchGeoref(path: string, signal: AbortSignal) {
  const res = await fetch(`${GEOREF}${path}`, {
    signal,
    headers: { Accept: "application/json" },
    // Cachea en el edge de Vercel: las búsquedas repetidas no re-pegan a Georef
    next: { revalidate: 86_400 },
  });
  if (!res.ok) throw new Error(`Georef ${res.status}`);
  return res.json();
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (q.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const encoded = encodeURIComponent(q);
  const hasNumber = /\d/.test(q);

  try {
    const tasks: Promise<GeoResult[]>[] = [];

    // 1) Localidades / barrios — siempre
    tasks.push(
      fetchGeoref(
        `/localidades?nombre=${encoded}&max=6&aplanar=true&campos=estandar`,
        controller.signal
      ).then((data) =>
        (data.localidades ?? [])
          .filter((l: Record<string, number | string>) => l.centroide_lat != null)
          .map((l: Record<string, string | number>): GeoResult => {
            const lat = Number(l.centroide_lat);
            const lon = Number(l.centroide_lon);
            const km = haversineKm(BASE.lat, BASE.lon, lat, lon);
            const ctx =
              l.municipio_nombre && l.municipio_nombre !== l.nombre
                ? l.municipio_nombre
                : l.provincia_nombre;
            return {
              label: `${l.nombre}${ctx ? `, ${ctx}` : ""}`,
              zona: zonaFromKm(km),
              km,
            };
          })
      )
    );

    // 2) Direcciones exactas (calle + altura) — solo si el texto tiene un número
    if (hasNumber) {
      tasks.push(
        fetchGeoref(
          `/direcciones?direccion=${encoded}&max=6&aplanar=true&campos=estandar`,
          controller.signal
        ).then((data) =>
          (data.direcciones ?? [])
            .filter((d: Record<string, number | string>) => d.ubicacion_lat != null)
            .map((d: Record<string, string | number>): GeoResult => {
              const lat = Number(d.ubicacion_lat);
              const lon = Number(d.ubicacion_lon);
              const km = haversineKm(BASE.lat, BASE.lon, lat, lon);
              const calle = titleCase(String(d.calle_nombre ?? ""));
              const altura = d.altura_valor ?? "";
              const loc = d.localidad_censal_nombre ?? d.departamento_nombre ?? "";
              return {
                label: `${calle} ${altura}${loc ? `, ${loc}` : ""}`.trim(),
                zona: zonaFromKm(km),
                km,
              };
            })
        )
      );
    }

    const settled = await Promise.allSettled(tasks);
    const localidades = settled[0]?.status === "fulfilled" ? settled[0].value : [];
    const direcciones =
      hasNumber && settled[1]?.status === "fulfilled" ? settled[1].value : [];

    // Direcciones exactas primero; cada grupo ordenado por cercanía a Morón.
    // Tope de 150 km: cubre todo GBA + La Plata/Zárate/Luján y descarta ruido
    // lejano (un flete desde Morón no va a Misiones).
    const byKm = (a: GeoResult, b: GeoResult) => a.km - b.km;
    const merged = [...direcciones.sort(byKm), ...localidades.sort(byKm)].filter(
      (r) => r.km <= 150
    );

    // Dedupe por label
    const seen = new Set<string>();
    const results = merged
      .filter((r) => {
        const key = r.label.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 8);

    return NextResponse.json(
      { results },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } }
    );
  } catch {
    return NextResponse.json({ results: [] }, { status: 200 });
  } finally {
    clearTimeout(timeout);
  }
}
