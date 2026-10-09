import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blogData';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${post.titulo} | VerificaYa`;
  return {
    title,
    description: post.resumen,
    keywords: post.keywords,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.resumen,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: 'VerificaYa',
      locale: 'es_PE',
      type: 'article',
      publishedTime: post.fecha,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.resumen,
    },
  };
}

// Renderiza los bloques de contenido del artículo
function RenderContenido({ bloques }) {
  return (
    <div className="prose prose-slate max-w-none space-y-5">
      {bloques.map((bloque, idx) => {
        if (bloque.tipo === 'intro') {
          return (
            <p key={idx} className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 pr-4 rounded-r-xl">
              {bloque.texto}
            </p>
          );
        }
        if (bloque.tipo === 'h2') {
          return (
            <h2 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-2">
              {bloque.texto}
            </h2>
          );
        }
        if (bloque.tipo === 'parrafo') {
          return (
            <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {bloque.texto}
            </p>
          );
        }
        if (bloque.tipo === 'lista') {
          return (
            <ul key={idx} className="space-y-3 mt-2">
              {bloque.items.map((item, i) => {
                // Render bold markdown-style **texto**
                const parts = item.split(/\*\*(.*?)\*\*/g);
                return (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>
                      {parts.map((part, pi) =>
                        pi % 2 === 1 ? <strong key={pi}>{part}</strong> : part
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const postIdx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const anterior = BLOG_POSTS[postIdx - 1] || null;
  const siguiente = BLOG_POSTS[postIdx + 1] || null;

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titulo,
    description: post.resumen,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.fecha,
    dateModified: post.fecha,
    inLanguage: 'es-PE',
    author: { '@type': 'Organization', name: 'VerificaYa', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'VerificaYa',
      url: siteUrl,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
    keywords: post.keywords.join(', '),
    articleSection: post.categoria,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <div className="min-h-screen bg-slate-50">

        {/* Breadcrumb SEO */}
        <nav className="bg-white border-b border-slate-200" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
              <li><Link href="/" className="hover:text-blue-600 font-medium transition-colors">VerificaYa</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li><Link href="/blog" className="hover:text-blue-600 font-medium transition-colors">Blog</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li className="text-slate-700 font-semibold truncate max-w-[180px] sm:max-w-xs">{post.titulo}</li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* Header */}
          <div className="space-y-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                <BookOpen className="w-3.5 h-3.5" />
                {post.categoria}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {post.tiempo_lectura} de lectura
              </span>
              <time dateTime={post.fecha} className="text-xs text-slate-400">
                {new Date(post.fecha).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {post.titulo}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {post.resumen}
            </p>
          </div>

          {/* Contenido del artículo */}
          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <RenderContenido bloques={post.contenido} />
          </article>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 text-center text-white space-y-4">
            <h2 className="text-xl sm:text-2xl font-black">
              ¿Recibiste un mensaje similar?
            </h2>
            <p className="text-blue-200 text-sm max-w-md mx-auto">
              Analízalo gratis con IA en VerificaYa y obtén un diagnóstico en segundos.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-blue-50 shadow-md transition-all hover:scale-105"
            >
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Analizar mensaje ahora — Es gratis
            </Link>
          </section>

          {/* Navegación entre posts */}
          <nav className="flex items-center justify-between pt-2 border-t border-slate-200" aria-label="Navegación entre artículos">
            {anterior ? (
              <Link href={`/blog/${anterior.slug}`} className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="max-w-[150px] sm:max-w-xs truncate">{anterior.titulo}</span>
              </Link>
            ) : <div />}
            {siguiente ? (
              <Link href={`/blog/${siguiente.slug}`} className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors group text-right">
                <span className="max-w-[150px] sm:max-w-xs truncate">{siguiente.titulo}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </nav>

          <div className="text-center pb-4">
            <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Ver todos los artículos del blog →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
