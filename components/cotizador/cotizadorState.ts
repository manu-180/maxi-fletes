"use client";

import type { TipoServicio, TamanoMudanza, TamanoFlete, PisoLabel, FranjaHoraria, CuandoOpcion } from "@/lib/cotizador/types";

export type CotizadorStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface CotizadorState {
  step: CotizadorStep;
  direction: 1 | -1;
  modo: "detallado" | "rapido";
  // Step 1
  tipo?: TipoServicio;
  // Step 2
  origen?: string;
  zona_origen?: 1 | 2 | 3 | 4;
  destino?: string;
  zona_destino?: 1 | 2 | 3 | 4;
  // Step 3
  tamano_mudanza?: TamanoMudanza;
  tamano_flete?: TamanoFlete;
  detalle_items?: string;
  // Step 4
  piso_origen: PisoLabel;
  ascensor_origen: boolean;
  piso_destino: PisoLabel;
  ascensor_destino: boolean;
  // Step 5
  ayudantes: number;
  armado: boolean;
  embalaje: boolean;
  especiales: string[];
  // Step 6
  cuando?: CuandoOpcion;
  fecha_deseada?: string;
  franja: FranjaHoraria;
  urgente: boolean;
  finde_o_finmes: boolean;
  // Step 7 — contact
  nombre?: string;
  whatsapp?: string;
  whatsapp_raw?: string;
  consent_wpp: boolean;
  prefiere_llamada: boolean;
  // Result (step 8)
  estimado?: { min: number; max: number; central: number };
  lead_enviado: boolean;
}

export type CotizadorAction =
  | { type: "NEXT"; payload?: Partial<CotizadorState> }
  | { type: "BACK" }
  | { type: "UPDATE"; payload: Partial<CotizadorState> }
  | { type: "SET_RESULTADO"; estimado: { min: number; max: number; central: number } }
  | { type: "LEAD_ENVIADO" }
  | { type: "RESET" };

export const INITIAL_STATE: CotizadorState = {
  step: 1,
  direction: 1,
  modo: "detallado",
  piso_origen: "PB",
  ascensor_origen: false,
  piso_destino: "PB",
  ascensor_destino: false,
  ayudantes: 0,
  armado: false,
  embalaje: false,
  especiales: [],
  franja: "indistinto",
  urgente: false,
  finde_o_finmes: false,
  consent_wpp: false,
  prefiere_llamada: false,
  lead_enviado: false,
};

export function cotizadorReducer(
  state: CotizadorState,
  action: CotizadorAction
): CotizadorState {
  switch (action.type) {
    case "NEXT":
      return {
        ...state,
        ...(action.payload ?? {}),
        step: Math.min(state.step + 1, 8) as CotizadorStep,
        direction: 1,
      };
    case "BACK":
      return {
        ...state,
        step: Math.max(state.step - 1, 1) as CotizadorStep,
        direction: -1,
      };
    case "UPDATE":
      return { ...state, ...action.payload };
    case "SET_RESULTADO":
      return { ...state, estimado: action.estimado, step: 8, direction: 1 };
    case "LEAD_ENVIADO":
      return { ...state, lead_enviado: true };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const LS_KEY = "maxifletes_cotizador_v1";
