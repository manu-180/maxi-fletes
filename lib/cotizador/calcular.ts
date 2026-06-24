import {
  BASE,
  BASE_MUDANZA,
  DISTANCIA,
  PISO_SIN_ASC,
  PISO_CON_ASC,
  AYUDANTE,
  ARMADO,
  EMBALAJE,
  ESPECIALES,
  FACTOR_DIA,
  FACTOR_URGENCIA,
  SPREAD,
  TARIFAS_VERSION,
} from "./tarifas";
import type { CotizadorInput, EstimadoResult, PisoLabel } from "./types";

function roundDecenaMil(n: number): number {
  return Math.round(n / 10_000) * 10_000;
}

function getDistanciaKey(zo: number, zd: number): keyof typeof DISTANCIA {
  if (zo === 4 || zd === 4) return "fuera";
  const diff = Math.abs(zo - zd);
  if (diff === 0) return "intrazona";
  if (diff === 1) return "salto1";
  if (diff === 2) return "salto2";
  return "fuera";
}

function getPisoAdicion(piso: PisoLabel, ascensor: boolean): number {
  if (piso === "PB") return 0;
  const table = ascensor ? PISO_CON_ASC : PISO_SIN_ASC;
  return table[piso as keyof typeof table] ?? 0;
}

export function calcularEstimado(
  input: CotizadorInput,
  modo: "detallado" | "rapido" = "detallado"
): EstimadoResult {
  const {
    tipo,
    zona_origen,
    zona_destino,
    tamano_mudanza,
    piso_origen,
    ascensor_origen,
    piso_destino,
    ascensor_destino,
    ayudantes,
    armado,
    embalaje,
    especiales = [],
    urgente,
    finde_o_finmes,
  } = input;

  const base =
    tipo === "mudanza"
      ? BASE_MUDANZA[tamano_mudanza ?? "mono"]
      : BASE[tipo as keyof typeof BASE];

  const distancia = DISTANCIA[getDistanciaKey(zona_origen, zona_destino)];

  const pisos =
    getPisoAdicion(piso_origen, ascensor_origen) +
    getPisoAdicion(piso_destino, ascensor_destino);

  const ayudantesTotal = ayudantes * AYUDANTE;

  let armadoTotal = 0;
  if (armado) {
    if (tipo === "mudanza" && tamano_mudanza) {
      armadoTotal = ARMADO[tamano_mudanza];
    } else if (tipo !== "single_item") {
      armadoTotal = ARMADO.flete;
    }
  }

  let embalajeTotal = 0;
  if (embalaje && tipo === "mudanza" && tamano_mudanza) {
    const key = tamano_mudanza as keyof typeof EMBALAJE;
    embalajeTotal = EMBALAJE[key] ?? 0;
  }

  const especialesTotal = especiales.reduce(
    (sum, e) => sum + (ESPECIALES[e] ?? 0),
    0
  );

  const subtotal =
    base + distancia + pisos + ayudantesTotal + armadoTotal + embalajeTotal + especialesTotal;

  const factorDia = finde_o_finmes ? FACTOR_DIA.finde_o_finmes : FACTOR_DIA.normal;
  const factorUrgencia = urgente ? FACTOR_URGENCIA.urgente : FACTOR_URGENCIA.normal;

  const central = subtotal * factorDia * factorUrgencia;
  const spread = SPREAD[modo];

  return {
    min: roundDecenaMil(central * (1 - spread)),
    max: roundDecenaMil(central * (1 + spread)),
    central: Math.round(central),
    tarifas_version: TARIFAS_VERSION,
  };
}
