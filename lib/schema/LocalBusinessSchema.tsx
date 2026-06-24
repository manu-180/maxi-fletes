const WA = process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491126948110";

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MovingCompany"],
  name: "MaxiFletes",
  description:
    "Fletes y mudanzas en Morón y GBA Oeste. 18 años de experiencia. Presupuesto gratis al instante.",
  url: "https://maxifletes.com.ar",
  telephone: `+${WA}`,
  image: "https://maxifletes.com.ar/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Morón",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
    postalCode: "1708",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.6508,
    longitude: -58.6197,
  },
  areaServed: [
    "Morón", "Castelar", "Haedo", "El Palomar",
    "Ramos Mejía", "Ituzaingó", "Hurlingham",
  ].map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "ARS",
  paymentAccepted: "Efectivo, Transferencia bancaria",
  sameAs: [
    "https://www.facebook.com/maxifletes",
    "https://www.instagram.com/maxifletes",
  ],
};

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
