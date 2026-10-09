import Link from 'next/link';
import { ShieldCheck, Heart, Users, Target, Lock, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

export const metadata = {
  title: 'Sobre Nosotros — Misión y Tecnología | VerificaYa Perú',
  description: 'Conoce la misión y tecnología detrás de VerificaYa: democratizar la ciberseguridad y proteger a los peruanos del fraude digital con Inteligencia Artificial, sin almacenar datos.',
  keywords: [
    'verificaya nosotros',
    'antifraude peru mision',
    'ciberseguridad peru ia',
    'proteccion ciudadana peru estafas',
    'zero logs privacidad peru'
  ],
  alternates: {
    canonical: `${siteUrl}/nosotros`,
  },
  openGraph: {
    title: 'Sobre Nosotros — Misión y Tecnología | VerificaYa Perú',
    description: 'Conoce la misión y tecnología detrás de VerificaYa: IA al servicio del ciudadano para frenar las estafas digitales en Perú.',
    url: `${siteUrl}/nosotros`,
    siteName: 'VerificaYa',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Users className="w-3.5 h-3.5" />
            Nuestra Misión
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Cuidando la seguridad digital de las familias peruanas
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Nacimos con un objetivo claro: poner la potencia de la Inteligencia Artificial al servicio del ciudadano de a pie para frenar la ola de estafas que azota al país.
          </p>
        </div>

        {/* Bloque de Contexto y Realidad Nacional */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md shadow-slate-200/40 space-y-8 mb-10">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <Target className="w-6 h-6 text-blue-600" />
              El problema que resolvemos en Perú
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              En los últimos años, el cibercrimen en el Perú ha evolucionado drásticamente. Mensajes falsos de supuestos familiares, suplantaciones de identidades bancarias (BCP, BBVA, Interbank), fraudes masivos de falsas ofertas laborales en redes sociales y aplicaciones de préstamos usureros conocidos como <em>&quot;Gota a gota digital&quot;</em> han generado pérdidas millonarias a miles de hogares y pequeños emprendedores.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              La mayoría de personas no cuenta con conocimientos avanzados en ciberseguridad para identificar un link falso o un dominio clonado. <strong>VerificaYa</strong> cierra esa brecha: entregando un diagnóstico inmediato, comprensible y sin tecnicismos en menos de 5 segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100">
              <span className="text-2xl font-black text-blue-700 block mb-1">+75%</span>
              <p className="text-xs text-slate-700 font-medium">Incremento de denuncias por ciberfraude en el Perú durante el último periodo según la PNP.</p>
            </div>
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <span className="text-2xl font-black text-indigo-700 block mb-1">9 de cada 10</span>
              <p className="text-xs text-slate-700 font-medium">Estafas se inician a través de un mensaje directo por WhatsApp o SMS no solicitado.</p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-2xl font-black text-emerald-700 block mb-1">100%</span>
              <p className="text-xs text-slate-700 font-medium">Acceso libre y anónimo para todos los ciudadanos en el territorio nacional.</p>
            </div>
          </div>

        </div>

        {/* Cómo funciona nuestra tecnología */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-10 space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            Nuestra Tecnología y Filosofía de Privacidad
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Utilizamos los modelos de lenguaje de última generación provistos por Groq, entrenados con heurísticas y patrones criminales detectados en el Perú.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-sm text-emerald-400 mb-1">Cero Almacenamiento</h3>
              <p className="text-xs text-slate-300">
                No guardamos copias de tus mensajes, capturas ni números. El análisis es 100% efímero en memoria volátil.
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-sm text-blue-400 mb-1">Sin Cuentas ni Registros</h3>
              <p className="text-xs text-slate-300">
                No necesitas crear cuenta ni dejar tu correo para verificar mensajes de estafa con nuestra IA.
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-sm text-purple-400 mb-1">Cero Comercialización</h3>
              <p className="text-xs text-slate-300">
                Jamás vendemos, compartimos ni monetizamos con historiales de búsqueda de nuestros usuarios.
              </p>
            </div>
          </div>
        </div>

        {/* Descargo Legal y Canales Oficiales */}
        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 space-y-4 mb-10">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Descargo de Responsabilidad y Asesoría Legal</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            <strong>Importante:</strong> VerificaYa es una herramienta orientativa basada en Inteligencia Artificial y no constituye un peritaje legal o policial vinculante. Si has sido víctima de una estafa consumada o extorsión, debes formalizar tu denuncia ante las entidades competentes del Estado Peruano:
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://www.gob.pe/policia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl text-xs font-bold text-slate-800 border border-amber-300 hover:bg-amber-100/50 shadow-xs"
            >
              <span>Divindat PNP (Delitos Tecnológicos)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <a
              href="https://www.sbs.gob.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl text-xs font-bold text-slate-800 border border-amber-300 hover:bg-amber-100/50 shadow-xs"
            >
              <span>SBS (Superintendencia de Banca y Seguros)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            <ShieldCheck className="w-5 h-5" />
            Probar el Analizador de Estafas Gratis
          </Link>
        </div>

      </div>
    </div>
  );
}
