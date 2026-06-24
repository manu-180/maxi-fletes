import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZONAS } from "@/data/zonas";
import { ZonaPageContent } from "@/components/sections/ZonaPageContent";

export function generateStaticParams() {
  return ZONAS.map((z) => ({ zona: z.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zona: string }>;
}): Promise<Metadata> {
  const { zona: slug } = await params;
  const zona = ZONAS.find((z) => z.slug === slug);
  if (!zona) return {};

  const title = `Fletes y Mudanzas en ${zona.nombre} — MaxiFletes GBA Oeste`;
  const description = `Fletes y mudanzas en ${zona.nombre} con 18 años de experiencia. Precio cerrado, sin sorpresas. Presupuesto gratuito al instante, sin compromiso.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_AR",
    },
    keywords: zona.keywords,
    alternates: {
      canonical: `https://maxifletes.com.ar/fletes/${slug}`,
    },
  };
}

export default async function ZonaPage({
  params,
}: {
  params: Promise<{ zona: string }>;
}) {
  const { zona: slug } = await params;
  const zona = ZONAS.find((z) => z.slug === slug);
  if (!zona) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MaxiFletes",
    description: `Fletes y mudanzas en ${zona.nombre}. ${zona.descripcion} 18 años de experiencia en GBA Oeste.`,
    url: `https://maxifletes.com.ar/fletes/${zona.slug}`,
    telephone: process.env.NEXT_PUBLIC_TELEFONO_DUENO ?? "",
    areaServed: [zona.nombre, "GBA Oeste", "Buenos Aires"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Morón",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    sameAs: ["https://maxifletes.com.ar"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ZonaPageContent zona={zona} allZonas={ZONAS} />
    </>
  );
}
