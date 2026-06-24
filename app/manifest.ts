import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MaxiFletes — Fletes y Mudanzas Morón",
    short_name: "MaxiFletes",
    description: "Fletes y mudanzas en Morón y GBA Oeste. 18 años de experiencia. Presupuesto gratis al instante.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1B4D",
    theme_color: "#2E5BE0",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
