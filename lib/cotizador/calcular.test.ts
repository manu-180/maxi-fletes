import { calcularEstimado } from "./calcular";
import type { CotizadorInput } from "./types";

const BASE_INPUT: CotizadorInput = {
  tipo: "mudanza",
  origen: "Castelar",
  zona_origen: 1,
  destino: "Moreno",
  zona_destino: 3,
  tamano_mudanza: "3amb",
  piso_origen: "1-3",
  ascensor_origen: false,
  piso_destino: "PB",
  ascensor_destino: false,
  ayudantes: 2,
  armado: true,
  embalaje: false,
  especiales: [],
  cuando: "esta_semana",
  franja: "indistinto",
  urgente: false,
  finde_o_finmes: true,
  nombre: "",
  whatsapp: "",
  whatsapp_raw: "",
  consent_wpp: true,
  prefiere_llamada: false,
};

describe("calcularEstimado", () => {
  test("ejemplo del spec: mudanza 3amb Castelar→Moreno, sábado", () => {
    // 280k + 40k + 12k + 50k + 30k = 412k × 1.25 = 515k → min 420k / max 610k
    const result = calcularEstimado(BASE_INPUT, "detallado");
    expect(result.min).toBe(420_000);
    expect(result.max).toBe(610_000);
    expect(result.central).toBe(515_000);
  });

  test("single_item intrazona sin extras", () => {
    const input: CotizadorInput = {
      ...BASE_INPUT,
      tipo: "single_item",
      zona_origen: 1,
      zona_destino: 1,
      tamano_mudanza: undefined,
      piso_origen: "PB",
      piso_destino: "PB",
      ayudantes: 0,
      armado: false,
      embalaje: false,
      especiales: [],
      urgente: false,
      finde_o_finmes: false,
    };
    // base 35k, spread 0.18: min round(28.7k)=30k, max round(41.3k)=40k
    const result = calcularEstimado(input, "detallado");
    expect(result.min).toBe(30_000);
    expect(result.max).toBe(40_000);
    expect(result.central).toBe(35_000);
  });

  test("flete_grande con zona 4 → adicional fuera", () => {
    const input: CotizadorInput = {
      ...BASE_INPUT,
      tipo: "flete_grande",
      zona_origen: 1,
      zona_destino: 4,
      tamano_mudanza: undefined,
      piso_origen: "PB",
      piso_destino: "PB",
      ayudantes: 0,
      armado: false,
      embalaje: false,
      especiales: [],
      urgente: false,
      finde_o_finmes: false,
    };
    // base 110k + fuera 70k = 180k; min round(147.6k)=150k, max round(212.4k)=210k
    const result = calcularEstimado(input, "detallado");
    expect(result.min).toBe(150_000);
    expect(result.max).toBe(210_000);
    expect(result.central).toBe(180_000);
  });

  test("recargo piso 4-6 sin ascensor vs con ascensor", () => {
    const base: CotizadorInput = {
      ...BASE_INPUT,
      tipo: "flete_chico",
      zona_origen: 1,
      zona_destino: 1,
      tamano_mudanza: undefined,
      piso_origen: "4-6",
      piso_destino: "PB",
      ayudantes: 0,
      armado: false,
      embalaje: false,
      especiales: [],
      urgente: false,
      finde_o_finmes: false,
    };
    // sin: 60k + 28k = 88k; con: 60k + 5k = 65k
    expect(calcularEstimado({ ...base, ascensor_origen: false }, "detallado").central).toBe(88_000);
    expect(calcularEstimado({ ...base, ascensor_origen: true }, "detallado").central).toBe(65_000);
  });

  test("factores urgencia y finde se acumulan", () => {
    const input: CotizadorInput = {
      ...BASE_INPUT,
      tipo: "flete_chico",
      zona_origen: 1,
      zona_destino: 1,
      tamano_mudanza: undefined,
      piso_origen: "PB",
      piso_destino: "PB",
      ayudantes: 0,
      armado: false,
      embalaje: false,
      especiales: [],
      urgente: true,
      finde_o_finmes: true,
    };
    // 60k × 1.25 × 1.15 = 86,250
    expect(calcularEstimado(input, "detallado").central).toBe(86_250);
  });

  test("spread rapido vs detallado", () => {
    const input: CotizadorInput = {
      ...BASE_INPUT,
      tipo: "flete_chico",
      zona_origen: 1,
      zona_destino: 1,
      tamano_mudanza: undefined,
      piso_origen: "PB",
      piso_destino: "PB",
      ayudantes: 0,
      armado: false,
      embalaje: false,
      especiales: [],
      urgente: false,
      finde_o_finmes: false,
    };
    const det = calcularEstimado(input, "detallado");
    const rap = calcularEstimado(input, "rapido");
    // detallado: min round(49.2k)=50k, max round(70.8k)=70k
    expect(det.min).toBe(50_000);
    expect(det.max).toBe(70_000);
    // rapido: min round(45k)=50k, max round(75k)=80k
    expect(rap.min).toBe(50_000);
    expect(rap.max).toBe(80_000);
  });

  test("embalaje solo aplica en mudanza", () => {
    const mudanza: CotizadorInput = {
      ...BASE_INPUT,
      tipo: "mudanza",
      tamano_mudanza: "mono",
      zona_origen: 1,
      zona_destino: 1,
      piso_origen: "PB",
      piso_destino: "PB",
      ayudantes: 0,
      armado: false,
      embalaje: true,
      especiales: [],
      urgente: false,
      finde_o_finmes: false,
    };
    const flete: CotizadorInput = { ...mudanza, tipo: "flete_chico", tamano_mudanza: undefined };
    // mudanza mono 110k + embalaje 20k = 130k; flete solo 60k
    expect(calcularEstimado(mudanza, "detallado").central).toBe(130_000);
    expect(calcularEstimado(flete, "detallado").central).toBe(60_000);
  });

  test("especiales suman correctamente", () => {
    const input: CotizadorInput = {
      ...BASE_INPUT,
      tipo: "mudanza",
      tamano_mudanza: "3amb",
      zona_origen: 1,
      zona_destino: 1,
      piso_origen: "PB",
      piso_destino: "PB",
      ayudantes: 0,
      armado: false,
      embalaje: false,
      especiales: ["piano", "caja_fuerte"],
      urgente: false,
      finde_o_finmes: false,
    };
    // 280k + 40k(piano) + 35k(caja) = 355k
    expect(calcularEstimado(input, "detallado").central).toBe(355_000);
  });
});
