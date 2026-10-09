import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blogData';
import { BookOpen, Clock, ChevronRight, Shield } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

export const metadata = {
  title: 'Blog Antifraude — Guías de Ciberseguridad para Peruanos | VerificaYa',
  description:
    'Guías y artículos para detectar estafas digitales en Perú: phishing bancario, trabajos falsos en TikTok, apps gota a gota, QR fraudulentos y más. Actualizado 2025.',
  keywords: [
    'blog estafas peru',
    'guia ciberseguridad peru',
    'como detectar fraude digital peru',
    'articulos antifraude peru',
    'seguridad digital peru 2025',
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Blog Antifraude — Guías de Ciberseguridad para Peruanos | VerificaYa',
    description: 'Aprende a detectar y evitar estafas digitales en Perú con nuestras guías especializadas.',
    url: `${siteUrl}/blog`,
    siteName: 'VerificaYa',
    locale: 'es_PE',
    type: 'website',
  },
};

const CATEGORIA_COLORES = {
  Phishing:   'bg-blue-100 text-blue-800 border-blue-200',
  Laboral:    'bg-amber-100 text-amber-800 border-amber-200',
  Financiera: 'bg-red-100 text-red-800 border-red-200',
  Venta:      'bg-purple-100 text-purple-800 border-purple-200',
};

export default function BlogPage() {
  // Schema.org para el Blog (lista de artículos)
  const jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Antifraude VerificaYa',
    description: 'Guías y artículos de ciberseguridad para detectar estafas digitales en Perú.',
    url: `${siteUrl}/blog`,
    inLanguage: 'es-PE',
    publisher: { '@type': 'Organization', name: 'VerificaYa', url: siteUrl },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.titulo,
      description: post.resumen,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.fecha,
      author: { '@type': 'Organization', name: 'VerificaYa' },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Encabezado */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
              <BookOpen className="w-3.5 h-3.5" />
              Educación Digital Antifraude
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Guías de Ciberseguridad para Peruanos
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Artículos escritos por expertos en seguridad digital para que tú y tu familia identifiquen y eviten las estafas más frecuentes en el Perú.
            </p>
          </div>

          {/* Grid de artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
              >
                <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${CATEGORIA_COLORES[post.categoria] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {post.categoria}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {post.tiempo_lectura} de lectura
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug group-hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.titulo}
                    </Link>
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {post.resumen}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <time dateTime={post.fecha} className="text-xs text-slate-400">
                      {new Date(post.fecha).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label={`Leer artículo: ${post.titulo}`}
                    >
                      Leer guía completa
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-10 text-center text-white shadow-xl">
            <Shield className="w-10 h-10 text-blue-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              ¿Tienes un mensaje sospechoso ahora mismo?
            </h2>
            <p className="text-blue-200 text-sm sm:text-base max-w-xl mx-auto mb-6">
              No leas artículos sobre estafas, ¡analiza el mensaje directamente con nuestra IA en 5 segundos!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-blue-50 shadow-md transition-all hover:scale-105"
            >
              <Shield className="w-5 h-5 text-blue-600" />
              Ir al Analizador Gratis
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
