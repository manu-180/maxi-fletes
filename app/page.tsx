import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValueProps } from "@/components/sections/ValueProps";
import { Servicios } from "@/components/sections/Servicios";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { CotizadorTeaser } from "@/components/sections/CotizadorTeaser";
import { Stats } from "@/components/sections/Stats";
import { Testimonios } from "@/components/sections/Testimonios";
import { Cobertura } from "@/components/sections/Cobertura";
import { FaqSection } from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ValueProps />
      <Servicios />
      <ComoFunciona />
      <CotizadorTeaser />
      <Stats />
      <Testimonios />
      <Cobertura />
      <FaqSection />
    </>
  );
}
