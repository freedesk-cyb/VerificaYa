'use client';

import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Share2,
  RotateCcw,
  Copy,
  Check,
  MessageCircle,
  Info,
  Lightbulb,
  ExternalLink,
  Shield,
  Brain,
  Sparkles,
  FlaskConical,
  Microscope,
  ChevronDown,
  ChevronUp,
  Flame,
  Cpu,
  Zap,
} from 'lucide-react';

const NIVEL_CONFIG = {
  Alto: {
    color: 'red',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700 border-red-200',
    icon: ShieldAlert,
    iconColor: 'text-red-600',
    gaugeBg: 'bg-red-500',
    titulo: 'Alto Riesgo de Estafa',
    descripcion: 'Este mensaje presenta multiples senales de alerta caracteristicas de estafas en Peru.',
    dot: 'bg-red-500',
  },
  Medio: {
    color: 'amber',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    gaugeBg: 'bg-amber-500',
    titulo: 'Riesgo Moderado',
    descripcion: 'Detectamos algunos elementos sospechosos. Procede con mucha precaucion.',
    dot: 'bg-amber-500',
  },
  Bajo: {
    color: 'emerald',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: ShieldCheck,
    iconColor: 'text-emerald-600',
    gaugeBg: 'bg-emerald-500',
    titulo: 'Riesgo Bajo',
    descripcion: 'No se detectaron senales claras de estafa, pero mantente siempre alerta.',
    dot: 'bg-emerald-500',
  },
};

function NivelBadge({ nivel }) {
  const cfg = NIVEL_CONFIG[nivel] || NIVEL_CONFIG['Bajo'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {nivel}
    </span>
  );
}

function RiskGauge({ porcentaje, nivel }) {
  const cfg = NIVEL_CONFIG[nivel] || NIVEL_CONFIG['Bajo'];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`text-3xl font-black ${
        nivel === 'Alto' ? 'text-red-600' : nivel === 'Medio' ? 'text-amber-600' : 'text-emerald-600'
      }`}>
        {porcentaje}%
      </div>
      <div className="text-[11px] text-slate-500 font-medium">Prob. estafa</div>
      <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${cfg.gaugeBg}`} style={{ width: porcentaje + '%' }} />
      </div>
    </div>
  );
}

// Panel 1: Groq — Analisis forense detallado
function PanelGroq({ groq, error }) {
  const [expandido, setExpandido] = useState(true);
  if (!groq) return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-2.5 opacity-60">
        <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
          <Brain className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-700">Motor Groq — No disponible</div>
          <div className="text-xs text-slate-500 mt-0.5">{error || 'El motor Groq no pudo procesar este análisis.'}</div>
        </div>
      </div>
    </div>
  );

  const cfg = NIVEL_CONFIG[groq.nivel_riesgo] || NIVEL_CONFIG['Bajo'];
  const IconComp = cfg.icon;

  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-orange-200/60">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-slate-900">Analisis Forense — Groq</span>
                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase tracking-wider border border-orange-200">
                  Detallado
                </span>
                <NivelBadge nivel={groq.nivel_riesgo} />
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">{groq.modelo_usado}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RiskGauge porcentaje={groq.porcentaje} nivel={groq.nivel_riesgo} />
            <button
              onClick={() => setExpandido(!expandido)}
              className="p-1.5 rounded-lg hover:bg-orange-100 text-slate-500 transition-colors"
              aria-label="Expandir/Colapsar"
            >
              {expandido ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {expandido && (
        <div className="p-5 space-y-4">
          {/* Badge categoria */}
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.badge}`}>
              Categoria: {groq.categoria}
            </span>
          </div>

          {/* Senales */}
          {groq.senales && groq.senales.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Senales detectadas ({groq.senales.length}):
              </div>
              <ul className="space-y-1.5">
                {groq.senales.map((senal, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${cfg.gaugeBg}`}>
                      {i + 1}
                    </span>
                    {senal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Explicacion */}
          {groq.explicacion && (
            <div className="p-4 rounded-xl bg-white/80 border border-orange-200/60">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                Explicacion:
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{groq.explicacion}</p>
            </div>
          )}

          {/* Analisis tecnico */}
          {groq.analisis_tecnico && (
            <div className="p-4 rounded-xl bg-slate-900/5 border border-slate-200">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <Microscope className="w-3.5 h-3.5 text-slate-600" />
                Analisis tecnico-forense:
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">{groq.analisis_tecnico}</p>
            </div>
          )}

          {/* Contexto Peru */}
          {groq.contexto_peru && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <div className="text-xs font-bold text-blue-800 flex items-center gap-1.5 mb-1">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                Contexto Peru:
              </div>
              <p className="text-xs text-blue-700 leading-relaxed">{groq.contexto_peru}</p>
            </div>
          )}

          {/* Recomendacion */}
          {groq.recomendacion && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Que debes hacer:
              </div>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">{groq.recomendacion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Panel 2: OpenCode — Dictamen conciso
function PanelOpencode({ opencode, error }) {
  if (!opencode) return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-2.5 opacity-60">
        <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-700">Motor OpenCode — No disponible</div>
          <div className="text-xs text-slate-500 mt-0.5">{error || 'El motor OpenCode no pudo procesar este análisis.'}</div>
        </div>
      </div>
    </div>
  );

  const cfg = NIVEL_CONFIG[opencode.nivel_riesgo] || NIVEL_CONFIG['Bajo'];

  return (
    <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden shadow-sm">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-slate-900">Dictamen OpenCode</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider border border-blue-200">
                  Conciso
                </span>
                <NivelBadge nivel={opencode.nivel_riesgo} />
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">{opencode.modelo_usado}</div>
            </div>
          </div>
          <RiskGauge porcentaje={opencode.porcentaje} nivel={opencode.nivel_riesgo} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Senales rapidas */}
          {opencode.senales && opencode.senales.length > 0 && (
            <div className="p-3 rounded-xl bg-white/80 border border-blue-200/60 space-y-1">
              <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Senales clave:
              </div>
              {opencode.senales.map((senal, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${cfg.gaugeBg}`}>
                    {i + 1}
                  </span>
                  {senal}
                </div>
              ))}
            </div>
          )}

          {/* Explicacion y recomendacion */}
          <div className="space-y-2">
            {opencode.explicacion && (
              <div className="p-3 rounded-xl bg-white/80 border border-blue-200/60">
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-blue-500" />
                  Dictamen:
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{opencode.explicacion}</p>
              </div>
            )}
            {opencode.recomendacion && (
              <div className="p-3 rounded-xl bg-blue-600 text-white">
                <div className="text-[10px] font-bold mb-0.5 opacity-80">Accion inmediata:</div>
                <p className="text-xs font-medium leading-relaxed">{opencode.recomendacion}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Panel 3: Mistral AI — Auditoria de Seguridad Europea
function PanelMistral({ mistral, error }) {
  if (!mistral) return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-2.5 opacity-60">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center font-black text-amber-700 text-sm shrink-0">
          M
        </div>
        <div>
          <div className="text-sm font-bold text-slate-700">Motor Mistral AI — No disponible</div>
          <div className="text-xs text-slate-500 mt-0.5">{error || 'El motor Mistral no pudo procesar este análisis.'}</div>
        </div>
      </div>
    </div>
  );

  const cfg = NIVEL_CONFIG[mistral.nivel_riesgo] || NIVEL_CONFIG['Bajo'];

  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/50 overflow-hidden shadow-sm">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 via-amber-600 to-red-600 text-white flex items-center justify-center shadow-md shadow-orange-600/20 font-black text-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-slate-900">Auditoría Mistral AI</span>
                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase tracking-wider border border-orange-200">
                  Nemo 12B
                </span>
                <NivelBadge nivel={mistral.nivel_riesgo} />
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">{mistral.modelo_usado || 'open-mistral-nemo'}</div>
            </div>
          </div>
          <RiskGauge porcentaje={mistral.porcentaje} nivel={mistral.nivel_riesgo} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Señales detectadas */}
          {mistral.senales && mistral.senales.length > 0 && (
            <div className="p-3 rounded-xl bg-white/80 border border-orange-200/60 space-y-1">
              <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Señales detectadas por Mistral:
              </div>
              {mistral.senales.map((senal, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${cfg.gaugeBg}`}>
                    {i + 1}
                  </span>
                  {senal}
                </div>
              ))}
            </div>
          )}

          {/* Explicación y recomendación */}
          <div className="space-y-2">
            {mistral.explicacion && (
              <div className="p-3 rounded-xl bg-white/80 border border-orange-200/60">
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-orange-500" />
                  Evaluación de Riesgo:
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{mistral.explicacion}</p>
              </div>
            )}
            {mistral.recomendacion && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs">
                <div className="text-[10px] font-bold mb-0.5 opacity-90">Consejo preventivo:</div>
                <p className="text-xs font-medium leading-relaxed">{mistral.recomendacion}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Panel 4: NVIDIA Nemotron — Diagnóstico de riesgo
function PanelNvidia({ nvidia, error }) {
  if (!nvidia) return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-2.5 opacity-60">
        <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
          <Cpu className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-700">Motor NVIDIA Nemotron — No disponible</div>
          <div className="text-xs text-slate-500 mt-0.5">{error || 'El motor NVIDIA no pudo procesar este análisis.'}</div>
        </div>
      </div>
    </div>
  );

  const cfg = NIVEL_CONFIG[nvidia.nivel_riesgo] || NIVEL_CONFIG['Bajo'];

  return (
    <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-lime-50/50 overflow-hidden shadow-sm">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 via-emerald-600 to-lime-600 text-white flex items-center justify-center shadow-md shadow-green-600/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-slate-900">Diagnóstico NVIDIA Nemotron</span>
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-extrabold uppercase tracking-wider border border-green-200">
                  Lightning 30B
                </span>
                <NivelBadge nivel={nvidia.nivel_riesgo} />
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">{nvidia.modelo_usado || 'nvidia/nemotron-3.5-lightning-30b-a3b'}</div>
            </div>
          </div>
          <RiskGauge porcentaje={nvidia.porcentaje} nivel={nvidia.nivel_riesgo} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Señales detectadas */}
          {nvidia.senales && nvidia.senales.length > 0 && (
            <div className="p-3 rounded-xl bg-white/80 border border-green-200/60 space-y-1">
              <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Señales detectadas por NVIDIA:
              </div>
              {nvidia.senales.map((senal, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${cfg.gaugeBg}`}>
                    {i + 1}
                  </span>
                  {senal}
                </div>
              ))}
            </div>
          )}

          {/* Explicación y recomendación */}
          <div className="space-y-2">
            {nvidia.explicacion && (
              <div className="p-3 rounded-xl bg-white/80 border border-green-200/60">
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-green-500" />
                  Diagnóstico:
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{nvidia.explicacion}</p>
              </div>
            )}
            {nvidia.recomendacion && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xs">
                <div className="text-[10px] font-bold mb-0.5 opacity-90">Acción recomendada:</div>
                <p className="text-xs font-medium leading-relaxed">{nvidia.recomendacion}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Panel 5: xKiro — Razonamiento Lógico Profundo (Qwen 3.8 Max)
function PanelXKiro({ xkiro, error }) {
  if (!xkiro) return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-2.5 opacity-60">
        <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-700">Motor xKiro (Qwen 3.8 Max) — No disponible</div>
          <div className="text-xs text-slate-500 mt-0.5">{error || 'El motor de razonamiento xKiro no pudo procesar este análisis.'}</div>
        </div>
      </div>
    </div>
  );

  const cfg = NIVEL_CONFIG[xkiro.nivel_riesgo] || NIVEL_CONFIG['Bajo'];

  return (
    <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-violet-50/50 overflow-hidden shadow-sm">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-slate-900">Razonamiento xKiro</span>
                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase tracking-wider border border-purple-200">
Qwen 3.8 Max
                </span>
                <NivelBadge nivel={xkiro.nivel_riesgo} />
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">{xkiro.modelo_usado || 'qwen/qwen3.8-max:free'}</div>
            </div>
          </div>
          <RiskGauge porcentaje={xkiro.porcentaje} nivel={xkiro.nivel_riesgo} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Señales lógicas detectadas */}
          {xkiro.senales && xkiro.senales.length > 0 && (
            <div className="p-3 rounded-xl bg-white/80 border border-purple-200/60 space-y-1">
              <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Deducciones clave:
              </div>
              {xkiro.senales.map((senal, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${cfg.gaugeBg}`}>
                    {i + 1}
                  </span>
                  {senal}
                </div>
              ))}
            </div>
          )}

          {/* Razonamiento deductivo y recomendación */}
          <div className="space-y-2">
            {xkiro.razonamiento_logico ? (
              <div className="p-3 rounded-xl bg-white/80 border border-purple-200/60">
                <div className="text-xs font-bold text-purple-900 mb-1 flex items-center gap-1">
                  <Brain className="w-3 h-3 text-purple-600" />
                  Razonamiento Deductivo:
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{xkiro.razonamiento_logico}</p>
              </div>
            ) : xkiro.explicacion && (
              <div className="p-3 rounded-xl bg-white/80 border border-purple-200/60">
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Info className="w-3 h-3 text-purple-500" />
                  Dictamen:
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{xkiro.explicacion}</p>
              </div>
            )}
            {xkiro.recomendacion && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs">
                <div className="text-[10px] font-bold mb-0.5 opacity-90">Acción recomendada:</div>
                <p className="text-xs font-medium leading-relaxed">{xkiro.recomendacion}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Panel 6: VirusTotal (existente, adaptado)
function PanelVirusTotal({ virustotal }) {
  if (!virustotal) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
            VT
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Auditoria Multimotor VirusTotal</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider">
                70+ Motores
              </span>
            </h4>
            <p className="text-xs text-slate-500 font-mono truncate max-w-xs sm:max-w-md">{virustotal.url}</p>
          </div>
        </div>
        {virustotal.permalink && (
          <a href={virustotal.permalink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline">
            Ver reporte
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {virustotal.consultado && virustotal.stats ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className={`p-2.5 rounded-xl border text-center ${virustotal.stats.malicious > 0 ? 'bg-red-50 border-red-200 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
              <div className="text-xl font-black">{virustotal.stats.malicious}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider">Maliciosos</div>
            </div>
            <div className={`p-2.5 rounded-xl border text-center ${virustotal.stats.suspicious > 0 ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
              <div className="text-xl font-black">{virustotal.stats.suspicious}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider">Sospechosos</div>
            </div>
            <div className="p-2.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-700 text-center">
              <div className="text-xl font-black">{virustotal.stats.harmless}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider">Limpios</div>
            </div>
            <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 text-slate-700 text-center">
              <div className="text-xl font-black">{virustotal.stats.total}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider">Total Motores</div>
            </div>
          </div>
          {virustotal.motores_detectores && virustotal.motores_detectores.length > 0 ? (
            <div className="p-3 rounded-xl bg-red-50/80 border border-red-200">
              <div className="text-xs font-bold text-red-800 mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                Firmas que alertaron:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {virustotal.motores_detectores.map((m, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-red-200 text-[11px] font-semibold text-red-700">
                    {m.motor}: <span className="font-normal">{m.resultado}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-800 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Ningun motor de la red VirusTotal ha reportado este dominio como malicioso.
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Conector VirusTotal v3 activo: </span>
              {virustotal.mensaje || virustotal.error || 'Inspeccion de enlace lista.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Panel 4: Hybrid Analysis (existente, adaptado)
function PanelHybridAnalysis({ hybridanalysis }) {
  if (!hybridanalysis) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-700 to-purple-800 text-white flex items-center justify-center font-black text-xs shadow-xs">
            HA
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>CrowdStrike Falcon Sandbox</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase tracking-wider">
                Detonacion Forense
              </span>
            </h4>
            <p className="text-xs text-slate-500 font-mono truncate max-w-xs sm:max-w-md">
              SHA-256: {hybridanalysis.sha256}
            </p>
          </div>
        </div>
        {hybridanalysis.permalink && (
          <a href={hybridanalysis.permalink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-semibold hover:underline">
            Ver reporte
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {hybridanalysis.consultado ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className={`p-2.5 rounded-xl border text-center ${
              hybridanalysis.veredicto === 'malicioso' ? 'bg-red-50 border-red-200 text-red-700' :
              hybridanalysis.veredicto === 'sospechoso' ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <div className="text-lg font-black capitalize">{hybridanalysis.veredicto || 'Limpio'}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider">Veredicto Sandbox</div>
            </div>
            <div className={`p-2.5 rounded-xl border text-center ${
              (hybridanalysis.threat_score || 0) > 60 ? 'bg-red-50 border-red-200 text-red-700' :
              (hybridanalysis.threat_score || 0) > 20 ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="text-lg font-black">{hybridanalysis.threat_score ?? 0}/100</div>
              <div className="text-[11px] font-medium uppercase tracking-wider">Threat Score</div>
            </div>
            <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 text-slate-700 text-center col-span-2 sm:col-span-1">
              <div className="text-lg font-black">{hybridanalysis.multiscan_result ?? 0}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider">Detecciones AV</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-700 text-xs">
            <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              {hybridanalysis.encontrado
                ? 'Muestra analizada en entornos virtuales de CrowdStrike Falcon Sandbox. Veredicto: ' + (hybridanalysis.veredicto_original || hybridanalysis.veredicto) + '.'
                : 'Indicador sin detecciones previas de comportamiento anomalo ni payloads en Falcon Sandbox.'}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Conector Falcon Sandbox activo: </span>
          {hybridanalysis.mensaje || hybridanalysis.error || 'Inspeccion de enlace lista.'}
        </div>
      )}
    </div>
  );
}

// Componente principal
export default function ResultadoAnalisis({ resultado, mensajeAnalizado, onReset }) {
  const [copiado, setCopiado] = useState(false);
  const [porcentajeMostrado, setPorcentajeMostrado] = useState(0);

  const nivel = resultado?.nivel_riesgo || 'Bajo';
  const porcentaje = resultado?.porcentaje || 0;
  const config = NIVEL_CONFIG[nivel] || NIVEL_CONFIG['Bajo'];
  const IconComponent = config.icon;

  // Animacion del medidor de riesgo
  useEffect(() => {
    const target = porcentaje;
    const duration = 800;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setPorcentajeMostrado(target);
        clearInterval(timer);
      } else {
        setPorcentajeMostrado(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [resultado, porcentaje]);

  const copiarResultado = async () => {
    const groq = resultado?.groq;
    const mistral = resultado?.mistral;
    const xkiro = resultado?.xkiro;
    const opencode = resultado?.opencode;
    const nvidia = resultado?.nvidia;
    const texto = '---VERIFICAYA ANALISIS COMPLETO---\n\n' +
      '== GROQ (Analisis Detallado) ==\n' +
      'Nivel: ' + (groq?.nivel_riesgo || 'N/A') + ' (' + (groq?.porcentaje || 0) + '%)\n' +
      'Senales:\n' + (groq?.senales || []).map(function(s) { return '- ' + s; }).join('\n') + '\n' +
      'Explicacion: ' + (groq?.explicacion || 'N/A') + '\n\n' +
      '== MISTRAL AI (Auditoria de Seguridad) ==\n' +
      'Nivel: ' + (mistral?.nivel_riesgo || 'N/A') + ' (' + (mistral?.porcentaje || 0) + '%)\n' +
      'Evaluacion: ' + (mistral?.explicacion || 'N/A') + '\n\n' +
      '== XKIRO (Razonamiento Qwen 3.8 Max) ==\n' +
      'Nivel: ' + (xkiro?.nivel_riesgo || 'N/A') + ' (' + (xkiro?.porcentaje || 0) + '%)\n' +
      'Razonamiento: ' + (xkiro?.razonamiento_logico || xkiro?.explicacion || 'N/A') + '\n\n' +
      '== OPENCODE (Dictamen Conciso) ==\n' +
      'Nivel: ' + (opencode?.nivel_riesgo || 'N/A') + ' (' + (opencode?.porcentaje || 0) + '%)\n' +
      'Dictamen: ' + (opencode?.explicacion || 'N/A') + '\n\n' +
      '== NVIDIA NEMOTRON (Diagnostico) ==\n' +
      'Nivel: ' + (nvidia?.nivel_riesgo || 'N/A') + ' (' + (nvidia?.porcentaje || 0) + '%)\n' +
      'Diagnostico: ' + (nvidia?.explicacion || 'N/A') + '\n\n' +
      'Verificado en VerificaYa.pe';
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // silencioso
    }
  };

  const compartirWhatsApp = () => {
    const texto = encodeURIComponent(
      'Verificaya detecto: *' + nivel + ' riesgo* de estafa (' + porcentaje + '%). ' +
      (resultado?.groq?.recomendacion || resultado?.xkiro?.recomendacion || resultado?.opencode?.recomendacion || '') +
      ' Analiza gratis en VerificaYa.pe'
    );
    window.open('https://wa.me/?text=' + texto, '_blank');
  };

  if (!resultado) return null;

  return (
    <div className="mt-6 space-y-4">

      {/* Header principal con nivel de riesgo global */}
      <div className={`rounded-3xl border-2 ${config.border} ${config.bg} overflow-hidden shadow-xl`}>
        <div className={`p-5 sm:p-7 border-b-2 ${config.border}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                nivel === 'Alto' ? 'bg-red-100' : nivel === 'Medio' ? 'bg-amber-100' : 'bg-emerald-100'
              }`}>
                <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {nivel === 'Alto' ? '⚠️' : nivel === 'Medio' ? '⚡' : '✅'} {config.titulo}
                </h2>
                <p className="text-sm text-slate-600 mt-0.5">{config.descripcion}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`text-4xl font-black ${
                nivel === 'Alto' ? 'text-red-600' : nivel === 'Medio' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {porcentajeMostrado}%
              </div>
              <div className="text-xs text-slate-500 font-medium">Probabilidad de estafa</div>
              <div className="w-24 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${config.gaugeBg}`} style={{ width: porcentajeMostrado + '%' }} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.badge}`}>
              Categoria: {resultado.categoria}
            </span>
            {resultado.groq && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                <Brain className="w-3 h-3" /> Groq activo
              </span>
            )}
            {resultado.mistral && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                <Flame className="w-3 h-3 text-orange-600" /> Mistral AI activo
              </span>
            )}
            {resultado.xkiro && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <Zap className="w-3 h-3 text-purple-600" /> xKiro Qwen 3.8 Max
              </span>
            )}
            {resultado.opencode && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                <Sparkles className="w-3 h-3" /> OpenCode activo
              </span>
            )}
            {resultado.nvidia && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                <Cpu className="w-3 h-3" /> NVIDIA activo
              </span>
            )}
          </div>
        </div>

        {/* Botones de accion */}
        <div className="px-5 sm:px-7 py-4 flex flex-wrap gap-3">
          <button onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md">
            <RotateCcw className="w-4 h-4" />
            Analizar otro
          </button>
          <button onClick={copiarResultado}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-all border border-slate-200">
            {copiado ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copiado ? 'Copiado!' : 'Copiar resultado'}
          </button>
          <button onClick={compartirWhatsApp}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md">
            <MessageCircle className="w-4 h-4" />
            Compartir en WhatsApp
          </button>
        </div>
      </div>

      {/* Panel 1: Groq — Analisis forense detallado */}
      <PanelGroq groq={resultado.groq} error={resultado.errores_ia?.groq} />

      {/* Panel 2: Mistral AI — Auditoria de seguridad */}
      <PanelMistral mistral={resultado.mistral} error={resultado.errores_ia?.mistral} />

      {/* Panel 3: xKiro — Razonamiento Lógico Profundo (Qwen 3.8 Max) */}
      <PanelXKiro xkiro={resultado.xkiro} error={resultado.errores_ia?.xkiro} />

      {/* Panel 4: OpenCode — Dictamen conciso */}
      <PanelOpencode opencode={resultado.opencode} error={resultado.errores_ia?.opencode} />

      {/* Panel 5: NVIDIA Nemotron — Diagnóstico de riesgo */}
      <PanelNvidia nvidia={resultado.nvidia} error={resultado.errores_ia?.nvidia} />

      {/* Panel 6: VirusTotal */}
      <PanelVirusTotal virustotal={resultado.virustotal} />

      {/* Panel 7: Hybrid Analysis */}
      <PanelHybridAnalysis hybridanalysis={resultado.hybridanalysis} />

    </div>
  );
}