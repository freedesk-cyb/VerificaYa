'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Filter, 
  AlertTriangle, 
  ShieldCheck, 
  Briefcase,
  CreditCard,
  ShoppingBag,
  Lock,
  ChevronRight
} from 'lucide-react';
import { ESTAFAS_COMUNES } from '@/lib/estafasData';

export default function EstafasComunesClient() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const categorias = ['Todas', 'Laboral', 'Phishing', 'Financiera', 'Venta'];

  const estafasFiltradas = ESTAFAS_COMUNES.filter((item) => {
    const coincideCategoria = categoriaSeleccionada === 'Todas' || item.categoria === categoriaSeleccionada;
    const coincideBusqueda = 
      item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.resumen.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.modus_operandi.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const getCategoriaIcono = (cat) => {
    switch (cat) {
      case 'Laboral': return Briefcase;
      case 'Phishing': return Lock;
      case 'Financiera': return CreditCard;
      case 'Venta': return ShoppingBag;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <BookOpen className="w-3.5 h-3.5" />
            Directorio Educativo Antifraude Perú
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Estafas Digitales Más Comunes en Perú
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Conoce el modus operandi real de los ciberdelincuentes para que tú y tu familia nunca caigan en la trampa. Casos reales anonimizados y clasificados.
          </p>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-md shadow-slate-200/40 mb-10 space-y-4">
          
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por palabra clave (ej. TikTok, Yape, BCP, Préstamo, Aduanas...)"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-sm sm:text-base text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtrar:
            </span>
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  categoriaSeleccionada === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Listado de Estafas en Grid */}
        {estafasFiltradas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No se encontraron casos con ese criterio</h3>
            <p className="text-sm text-slate-500 mt-1">Prueba con otra palabra clave o limpia el filtro de búsqueda.</p>
            <button
              onClick={() => { setBusqueda(''); setCategoriaSeleccionada('Todas'); }}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100"
            >
              Restablecer búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {estafasFiltradas.map((estafa) => {
              const IconoCat = getCategoriaIcono(estafa.categoria);
              return (
                <article
                  key={estafa.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        <IconoCat className="w-3.5 h-3.5" />
                        {estafa.categoria}
                      </span>
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        Riesgo: {estafa.nivel_riesgo}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {estafa.titulo}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {estafa.resumen}
                    </p>

                    {/* Muestra del mensaje trampa */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700 font-mono italic">
                      &ldquo;{estafa.mensaje_ejemplo.substring(0, 120)}...&rdquo;
                    </div>

                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Canal: {estafa.canal}
                    </span>
                    {/* Link a la página individual indexable */}
                    <Link
                      href={`/estafas-comunes/${estafa.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Ver Modus Operandi
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* CTA bottom */}
        <div className="mt-14 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-10 text-center text-white shadow-xl shadow-blue-900/20">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            ¿Recibiste un mensaje sospechoso?
          </h2>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Verifícalo gratis en 5 segundos y protege tus ahorros y los de tu familia.
          </p>
          <Link
            href="/#analizador"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-blue-50 shadow-md transition-all hover:scale-105"
          >
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Ir al Analizador Gratis
          </Link>
        </div>

      </div>
    </div>
  );
}
