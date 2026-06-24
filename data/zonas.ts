export type ZonaTarifaria = 1 | 2 | 3 | 4;

export interface Zona {
  slug: string;
  nombre: string;
  zona: ZonaTarifaria;
  descripcion: string;
  keywords: string[];
}

export const ZONAS: Zona[] = [
  {
    slug: "moron",
    nombre: "Morón",
    zona: 1,
    descripcion: "Fletes y mudanzas en Morón. Zona core, cobertura completa.",
    keywords: ["fletes morón", "mudanzas morón", "flete morón"],
  },
  {
    slug: "castelar",
    nombre: "Castelar",
    zona: 1,
    descripcion: "Fletes y mudanzas en Castelar, zona oeste.",
    keywords: ["fletes castelar", "mudanzas castelar"],
  },
  {
    slug: "haedo",
    nombre: "Haedo",
    zona: 1,
    descripcion: "Fletes y mudanzas en Haedo y alrededores.",
    keywords: ["fletes haedo", "mudanzas haedo"],
  },
  {
    slug: "el-palomar",
    nombre: "El Palomar",
    zona: 2,
    descripcion: "Fletes y mudanzas en El Palomar.",
    keywords: ["fletes el palomar", "mudanzas el palomar"],
  },
  {
    slug: "ramos-mejia",
    nombre: "Ramos Mejía",
    zona: 2,
    descripcion: "Fletes y mudanzas en Ramos Mejía.",
    keywords: ["fletes ramos mejia", "mudanzas ramos mejia"],
  },
  {
    slug: "ituzaingo",
    nombre: "Ituzaingó",
    zona: 2,
    descripcion: "Fletes y mudanzas en Ituzaingó.",
    keywords: ["fletes ituzaingo", "mudanzas ituzaingo"],
  },
  {
    slug: "hurlingham",
    nombre: "Hurlingham",
    zona: 2,
    descripcion: "Fletes y mudanzas en Hurlingham.",
    keywords: ["fletes hurlingham", "mudanzas hurlingham"],
  },
  {
    slug: "ciudadela",
    nombre: "Ciudadela",
    zona: 2,
    descripcion: "Fletes y mudanzas en Ciudadela, límite con Capital.",
    keywords: ["fletes ciudadela", "mudanzas ciudadela"],
  },
  {
    slug: "lomas-del-mirador",
    nombre: "Lomas del Mirador",
    zona: 2,
    descripcion: "Fletes y mudanzas en Lomas del Mirador.",
    keywords: ["fletes lomas del mirador", "mudanzas lomas del mirador"],
  },
  {
    slug: "merlo",
    nombre: "Merlo",
    zona: 3,
    descripcion: "Fletes y mudanzas en Merlo, GBA Oeste.",
    keywords: ["fletes merlo", "mudanzas merlo"],
  },
  {
    slug: "moreno",
    nombre: "Moreno",
    zona: 3,
    descripcion: "Fletes y mudanzas en Moreno y alrededores.",
    keywords: ["fletes moreno", "mudanzas moreno"],
  },
  {
    slug: "san-antonio-de-padua",
    nombre: "San Antonio de Padua",
    zona: 3,
    descripcion: "Fletes y mudanzas en San Antonio de Padua.",
    keywords: ["fletes san antonio de padua", "mudanzas san antonio de padua"],
  },
];
