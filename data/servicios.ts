export const SERVICIOS = [
  {
    id: "mudanzas",
    title: "Mudanzas completas",
    desc: "Casa o departamento, de punta a punta. Embalaje, carga, traslado, descarga y armado. Vos no tocás nada.",
    cta: "Ver mudanzas",
    href: "/mudanzas",
    highlight: true, // card grande en el bento
  },
  {
    id: "fletes",
    title: "Fletes",
    desc: "Pocas cosas o muchas, vos decís. Lo llevamos rápido y seguro por toda la zona.",
    cta: "Pedir flete",
    href: "/cotizar",
    highlight: false,
  },
  {
    id: "mini-fletes",
    title: "Mini fletes",
    desc: "¿Un mueble, una heladera, una compra grande? Lo movemos en el día sin camión de más.",
    cta: "Cotizar",
    href: "/cotizar",
    highlight: false,
  },
  {
    id: "embalaje",
    title: "Embalaje y armado",
    desc: "Cajas, protección y armado/desarmado de muebles. Para que no toques nada.",
    cta: "Sumar al presupuesto",
    href: "/cotizar",
    highlight: false,
  },
] as const;
