export type TipoServicio = "single_item" | "flete_chico" | "flete_grande" | "mudanza";
export type TamanoMudanza = "mono" | "2amb" | "3amb" | "4amb" | "casa";
export type TamanoFlete = "poco" | "medio" | "lleno" | "mas_vuelta";
export type PisoLabel = "PB" | "1-3" | "4-6" | "7+";
export type FranjaHoraria = "mañana" | "tarde" | "indistinto";
export type CuandoOpcion = "antes_posible" | "esta_semana" | "fecha" | "no_se";
export type ZonaTarifaria = 1 | 2 | 3 | 4;
export type Modo = "detallado" | "rapido";

export interface CotizadorInput {
  tipo: TipoServicio;
  origen: string;
  zona_origen: ZonaTarifaria;
  destino: string;
  zona_destino: ZonaTarifaria;
  tamano_mudanza?: TamanoMudanza;
  tamano_flete?: TamanoFlete;
  detalle_items?: string;
  piso_origen: PisoLabel;
  ascensor_origen: boolean;
  piso_destino: PisoLabel;
  ascensor_destino: boolean;
  ayudantes: number;
  armado: boolean;
  embalaje: boolean;
  especiales: string[];
  cuando?: CuandoOpcion;
  fecha_deseada?: string;
  franja: FranjaHoraria;
  urgente: boolean;
  finde_o_finmes: boolean;
  nombre: string;
  whatsapp: string;
  whatsapp_raw: string;
  consent_wpp: boolean;
  prefiere_llamada: boolean;
}

export interface EstimadoResult {
  min: number;
  max: number;
  central: number;
  tarifas_version: string;
}
