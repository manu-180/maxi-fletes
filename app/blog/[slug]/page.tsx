import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareBar } from "@/components/blog/ShareBar";
import { mdxComponents } from "@/components/blog/mdxComponents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    alternates: { canonical: `https://maxifletes.com.ar/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Maximiliano Rodríguez" },
    publisher: {
      "@type": "Organization",
      name: "MaxiFletes",
      url: "https://maxifletes.com.ar",
    },
    url: `https://maxifletes.com.ar/blog/${slug}`,
    inLanguage: "es-AR",
  };

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Barra de progreso de lectura */}
      <ReadingProgress />

      <main className="min-h-[100dvh]">
        {/* ─── Header del artículo ─── */}
        <header className="bg-(--bg-soft) pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb + categoría */}
            <div className="flex items-center gap-3 mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-(--slate-400) hover:text-(--brand-600) transition-colors duration-200 group"
              >
                <ArrowLeft
                  size={14}
                  weight="light"
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Blog
              </Link>
              <span className="text-(--line)">/</span>
              <EyebrowTag animate={false}>{post.category}</EyebrowTag>
            </div>

            {/* Título */}
            <h1 className="text-h2">{post.title}</h1>

            {/* Descripción */}
            <p className="text-body-lg text-(--slate-600) mt-4 max-w-2xl">
              {post.description}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-3 mt-6 text-sm text-(--slate-400)">
              <span>{formatDate(post.date)}</span>
              <span className="w-1 h-1 rounded-full bg-(--slate-400)" />
              <span>{post.readTime} min de lectura</span>
            </div>

            {/* Divider */}
            <div className="mt-10 h-px bg-gradient-to-r from-(--brand-500)/40 via-(--line) to-transparent" />
          </div>
        </header>

        {/* ─── Cuerpo del artículo ─── */}
        <article className="py-16 px-4">
          <div className="max-w-3xl mx-auto prose-blog">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        {/* ─── Footer del artículo: share + CTA ─── */}
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Divider */}
            <div className="h-px bg-(--line)" />

            {/* Share */}
            <ShareBar title={post.title} />

            {/* CTA card — double-bezel dark */}
            <div className="rounded-[2rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5">
              <div className="rounded-[calc(2rem-0.375rem)] bg-dark-band px-8 py-10 text-center">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/10 text-(--brand-300) mb-4">
                  ¿Necesitás un flete?
                </span>
                <h2
                  className="text-h3 text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Pedí tu presupuesto gratis
                </h2>
                <p className="text-(--brand-300) text-sm mb-8">
                  En menos de 3 minutos. Sin compromiso.
                </p>
                <Link
                  href="/cotizar"
                  className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 bg-(--accent-500) text-(--ink) font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-(--accent-600) active:scale-[0.98]"
                >
                  Cotizar ahora
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <ArrowUpRight size={16} weight="light" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Volver al blog */}
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-(--slate-400) hover:text-(--brand-600) transition-colors duration-200 group"
              >
                <ArrowLeft
                  size={14}
                  weight="light"
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Ver todos los artículos
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
