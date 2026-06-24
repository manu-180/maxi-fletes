export const TARIFAS_VERSION = "2026-01";

export const BASE = {
  single_item: 35_000,
  flete_chico: 60_000,
  flete_grande: 110_000,
} as const;

export const BASE_MUDANZA = {
  mono: 110_000,
  "2amb": 180_000,
  "3amb": 280_000,
  "4amb": 400_000,
  casa: 460_000,
} as const;

export const DISTANCIA = {
  intrazona: 0,
  salto1: 18_000,
  salto2: 40_000,
  fuera: 70_000,
} as const;

export const PISO_SIN_ASC = {
  "1-3": 12_000,
  "4-6": 28_000,
  "7+": 45_000,
} as const;

export const PISO_CON_ASC = {
  "1-3": 0,
  "4-6": 5_000,
  "7+": 10_000,
} as const;

export const AYUDANTE = 25_000;

export const ARMADO = {
  mono: 15_000,
  "2amb": 22_000,
  "3amb": 30_000,
  "4amb": 40_000,
  casa: 45_000,
  flete: 18_000,
} as const;

export const EMBALAJE = {
  mono: 20_000,
  "2amb": 35_000,
  "3amb": 50_000,
  "4amb": 70_000,
  casa: 80_000,
} as const;

export const ESPECIALES: Record<string, number> = {
  piano: 40_000,
  caja_fuerte: 35_000,
  obra_arte: 25_000,
  otro_pesado: 20_000,
};

export const FACTOR_DIA = { normal: 1.0, finde_o_finmes: 1.25 } as const;
export const FACTOR_URGENCIA = { normal: 1.0, urgente: 1.15 } as const;

export const SPREAD = { detallado: 0.18, rapido: 0.25 } as const;
