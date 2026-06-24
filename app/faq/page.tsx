import type { Metadata } from "next";
import { FaqFullPage } from "./FaqFullPage";

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre fletes y mudanzas",
  description:
    "Todo lo que necesitás saber antes de contratar un flete o mudanza en Morón y GBA Oeste. Precios, qué incluye, seguros, horarios y más.",
  openGraph: {
    title: "FAQ — MaxiFletes | Todo sobre fletes y mudanzas en GBA Oeste",
    description:
      "Respondemos todo: precios, qué incluye una mudanza, si suben a pisos, urgencias, formas de pago y más.",
    type: "website",
    locale: "es_AR",
  },
  alternates: {
    canonical: "https://maxifletes.com.ar/faq",
  },
};

export default function FaqPage() {
  return <FaqFullPage />;
}
