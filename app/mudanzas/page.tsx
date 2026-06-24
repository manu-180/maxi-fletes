import type { Metadata } from "next";
import { MudanzasContent } from "./MudanzasContent";

export const metadata: Metadata = {
  title: "Mudanzas completas en Morón y GBA Oeste",
  description:
    "Servicio de mudanzas completas en Morón, Castelar, Haedo, El Palomar y todo GBA Oeste. Precio cerrado, embalaje, armado y desarmado. 18 años de experiencia.",
  openGraph: {
    title: "Mudanzas en GBA Oeste — MaxiFletes Morón",
    description:
      "Mudanzas completas con precio cerrado, embalaje profesional y 18 años en GBA Oeste. Presupuesto gratis al instante.",
    type: "website",
    locale: "es_AR",
  },
  alternates: {
    canonical: "https://maxifletes.com.ar/mudanzas",
  },
};

export default function MudanzasPage() {
  return <MudanzasContent />;
}
