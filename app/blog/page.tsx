import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Fletes y Mudanzas — Morón y GBA Oeste",
  description:
    "Guías, consejos y precios reales sobre fletes y mudanzas en Morón, Castelar, Haedo y todo el GBA Oeste. Del equipo de MaxiFletes — 18 años en el rubro.",
  openGraph: {
    title: "Blog de Fletes y Mudanzas | MaxiFletes Morón",
    description:
      "Guías y consejos sobre fletes y mudanzas en GBA Oeste. Precios, tips y todo lo que necesitás saber antes de contratar.",
    type: "website",
  },
  alternates: { canonical: "https://maxifletes.com.ar/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-[100dvh] bg-(--bg-soft)">
      {/* ─── Hero ─── */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <EyebrowTag animate={false}>Blog</EyebrowTag>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-h2 mt-5 max-w-2xl">
              Guías y consejos sobre{" "}
              <span className="text-(--brand-500)">fletes y mudanzas</span>{" "}
              en el GBA Oeste
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-body-lg text-(--slate-600) mt-4 max-w-xl">
              Del equipo de MaxiFletes — 18 años moviendo el oeste.
            </p>
          </Reveal>

          {/* Divider */}
          <Reveal delay={0.22}>
            <div className="mt-12 h-px bg-gradient-to-r from-(--brand-500)/30 via-(--line) to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* ─── Posts ─── */}
      <section className="pb-32 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Featured post — ocupa todo el ancho */}
          {featured && (
            <Reveal>
              <BlogCard post={featured} featured />
            </Reveal>
          )}

          {/* Resto en grid de 2 columnas */}
          {rest.length > 0 && (
            <RevealGroup className="grid sm:grid-cols-2 gap-6">
              {rest.map((post) => (
                <RevealItem key={post.slug}>
                  <BlogCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>
    </main>
  );
}
