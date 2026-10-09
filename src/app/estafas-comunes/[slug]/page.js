import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ESTAFAS_COMUNES } from '@/lib/estafasData';
import {
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  CreditCard,
  ShoppingBag,
  Lock,
  MessageSquareWarning,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

// Genera todas las rutas estáticas en build time
export async function generateStaticParams() {
  return ESTAFAS_COMUNES.map((estafa) => ({ slug: estafa.id }));
}

// Metadata dinámica por estafa — crítico para SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const estafa = ESTAFAS_COMUNES.find((e) => e.id === slug);
  if (!estafa) return {};

  const title = `${estafa.titulo} | VerificaYa Perú`;
  const description = `${estafa.resumen} Aprende a identificar las señales de alerta y cómo protegerte. Analiza mensajes sospechosos gratis con IA.`;

  return {
    title,
    description,
    keywords: [
      estafa.titulo.toLowerCase(),
      `${estafa.categoria.toLowerCase()} peru`,
      'estafa ' + estafa.canal.toLowerCase(),
      'como detectar estafa peru',
      'verificaya',
    ],
    alternates: {
      canonical: `${siteUrl}/estafas-comunes/${estafa.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/estafas-comunes/${estafa.id}`,
      siteName: 'VerificaYa',
      locale: 'es_PE',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const getCategoriaColor = (cat) => {
  switch (cat) {
    case 'Laboral':    return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', icon: Briefcase, badge: 'bg-amber-500' };
    case 'Phishing':   return { bg: 'bg-blue-100',  text: 'text-blue-800',  border: 'border-blue-200',  icon: Lock,     badge: 'bg-blue-600'  };
    case 'Financiera': return { bg: 'bg-red-100',   text: 'text-red-800',   border: 'border-red-200',   icon: CreditCard, badge: 'bg-red-600' };
    case 'Venta':      return { bg: 'bg-purple-100',text: 'text-purple-800',border: 'border-purple-200',icon: ShoppingBag,badge:'bg-purple-600'};
    default:           return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', icon: AlertTriangle, badge: 'bg-slate-600' };
  }
};

export default async function EstafaDetallePage({ params }) {
  const { slug } = await params;
  const estafa = ESTAFAS_COMUNES.find((e) => e.id === slug);

  if (!estafa) notFound();

  const estafaIdx = ESTAFAS_COMUNES.findIndex((e) => e.id === slug);
  const anterior = ESTAFAS_COMUNES[estafaIdx - 1] || null;
  const siguiente = ESTAFAS_COMUNES[estafaIdx + 1] || null;
  const colores = getCategoriaColor(estafa.categoria);
  const IconoCat = colores.icon;

  // Schema.org Article para esta estafa específica
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: estafa.titulo,
    description: estafa.resumen,
    url: `${siteUrl}/estafas-comunes/${estafa.id}`,
    inLanguage: 'es-PE',
    author: { '@type': 'Organization', name: 'VerificaYa', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'VerificaYa', url: siteUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/estafas-comunes/${estafa.id}` },
  };

  // Schema.org HowTo para las señales de alerta
  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Cómo detectar la estafa: ${estafa.titulo}`,
    description: estafa.modus_operandi,
    step: estafa.senales_alerta.map((senal, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: `Señal de alerta ${idx + 1}`,
      text: senal,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />

      <div className="min-h-screen bg-slate-50">

        {/* Breadcrumb SEO */}
        <nav className="bg-white border-b border-slate-200" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
              <li><Link href="/" className="hover:text-blue-600 font-medium transition-colors">VerificaYa</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li><Link href="/estafas-comunes" className="hover:text-blue-600 font-medium transition-colors">Estafas Comunes</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li className="text-slate-700 font-semibold truncate max-w-[200px] sm:max-w-xs">{estafa.titulo}</li>
            </ol>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* Encabezado */}
          <div className="space-y-4">
            <Link
              href="/estafas-comunes"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al directorio de estafas
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${colores.bg} ${colores.text} border ${colores.border}`}>
                <IconoCat className="w-3.5 h-3.5" />
                {estafa.categoria}
              </span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200">
                🚨 Riesgo: {estafa.nivel_riesgo}
              </span>
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                Canal: {estafa.canal}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {estafa.titulo}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {estafa.resumen}
            </p>
          </div>

          {/* Mensaje ejemplo */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <MessageSquareWarning className="w-4 h-4 text-amber-500" />
              Ejemplo real de mensaje trampa
            </h2>
            <blockquote className="bg-slate-50 border-l-4 border-amber-400 p-4 rounded-xl text-sm text-slate-700 font-mono leading-relaxed">
              &ldquo;{estafa.mensaje_ejemplo}&rdquo;
            </blockquote>
            <p className="text-xs text-slate-400 italic">
              * Mensaje anonimizado y adaptado con fines educativos.
            </p>
          </section>

          {/* Modus operandi */}
          <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
              ¿Cómo operan los estafadores?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {estafa.modus_operandi}
            </p>
          </section>

          {/* Señales de alerta */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Señales de Alerta Clave
            </h2>
            <ul className="space-y-3">
              {estafa.senales_alerta.map((senal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-800">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{senal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Consejo oficial */}
          <section className="bg-blue-700 text-white rounded-3xl p-6 sm:p-8 space-y-2">
            <h2 className="text-sm font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Recomendación Oficial VerificaYa
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              {estafa.consejo_accion}
            </p>
          </section>

          {/* CTA Analizador */}
          <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 text-center text-white space-y-4">
            <h2 className="text-xl sm:text-2xl font-black">
              ¿Recibiste un mensaje similar?
            </h2>
            <p className="text-blue-200 text-sm max-w-md mx-auto">
              Pégalo en el analizador de VerificaYa y recibe un diagnóstico con IA en segundos.
            </p>
            <Link
              href="/#analizador"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-blue-50 shadow-md transition-all hover:scale-105"
            >
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Analizar mensaje ahora — Es gratis
            </Link>
          </section>

          {/* Navegación entre estafas */}
          <nav className="flex items-center justify-between pt-2 border-t border-slate-200" aria-label="Navegación entre estafas">
            {anterior ? (
              <Link
                href={`/estafas-comunes/${anterior.id}`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="max-w-[150px] sm:max-w-xs truncate">{anterior.titulo}</span>
              </Link>
            ) : <div />}

            {siguiente ? (
              <Link
                href={`/estafas-comunes/${siguiente.id}`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors group text-right"
              >
                <span className="max-w-[150px] sm:max-w-xs truncate">{siguiente.titulo}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </nav>

          {/* Link de regreso */}
          <div className="text-center pb-4">
            <Link
              href="/estafas-comunes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Ver todas las estafas comunes en Perú →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
