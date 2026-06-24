import sharp from "sharp";
import fs from "fs";

// Convierte las fotos pesadas (PNG ~1MB de nanobanana) a WebP optimizado.
// Mantiene los PNG originales por las dudas; las referencias se apuntan al .webp.
const jobs = [
  ["public/images/hero/hero-main.png", 1280, 82],
  ["public/images/servicios/mudanzas.png", 960, 80],
  ["public/images/servicios/fletes.png", 960, 80],
  ["public/images/servicios/mini-fletes.png", 960, 80],
  ["public/images/servicios/embalaje.png", 960, 80],
  ["public/images/textura/ruta-oeste.png", 1600, 82],
  ["public/images/og/og-image.png", 1200, 82],
];

for (const [src, width, quality] of jobs) {
  if (!fs.existsSync(src)) {
    console.log("SKIP (no existe):", src);
    continue;
  }
  const out = src.replace(/\.png$/, ".webp");
  const before = fs.statSync(src).size;
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out);
  const after = fs.statSync(out).size;
  console.log(
    `${out}  ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB`
  );
}
console.log("Listo.");
