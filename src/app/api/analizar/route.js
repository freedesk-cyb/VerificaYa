import { NextResponse } from 'next/server';
import { analizarMensajeConGroq } from '@/lib/groq';
import { analizarMensajeConOpencode } from '@/lib/opencode';
import { analizarMensajeConMistral } from '@/lib/mistral';
import { analizarMensajeConNvidia } from '@/lib/nvidia';
import { analizarMensajeConXKiro } from '@/lib/xkiro';
import { guardarAnalisis } from '@/lib/supabase';
import { extraerUrlsDeTexto, consultarUrlEnVirusTotal } from '@/lib/virustotal';
import { consultarUrlEnHybridAnalysis } from '@/lib/hybridanalysis';
import { verificarLimiteServidor } from '@/lib/rateLimit';
import { validarOrigen } from '@/lib/seguridad';
// Duración máxima de ejecución para Vercel Serverless Functions (hasta 60s)
export const maxDuration = 60;

// Limita el tiempo de un motor para que no bloquee la respuesta global
function conTiempoLimite(promesa, ms, nombre) {
  let timer;
  const limite = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${nombre} superó el tiempo límite de respuesta.`)), ms);
  });
  return Promise.race([promesa, limite]).finally(() => clearTimeout(timer));
}

export async function POST(request) {
  try {
    // V-06: Validar origen para prevenir abuso cross-origin
    if (!validarOrigen(request)) {
      return NextResponse.json(
        { error: 'Origen no autorizado.' },
        { status: 403 }
      );
    }

    // V-03: Rechazar tempranamente requests con Content-Length excesivo
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'El contenido excede el límite máximo permitido (2MB).' },
        { status: 413 }
      );
    }

    // 0. Obtener IP y validar cuotas de uso justo (12h)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               '127.0.0.1';

    const body = await request.json();
    const { mensaje, imagen, modalidad = 'mensaje' } = body;

    // Validación de límites por modalidad (Texto: 2, Imagen: 2, Link: 1, QR: 1 cada 12h)
    const checkLimite = verificarLimiteServidor(ip, modalidad);
    if (!checkLimite.permitido) {
      return NextResponse.json(
        { 
          error: checkLimite.error,
          limiteAlcanzado: true,
          modalidad,
          restableceEnMs: checkLimite.restableceEnMs,
          max: checkLimite.max
        },
        { status: 429 }
      );
    }

    // Validacion basica del mensaje
    if (!mensaje || typeof mensaje !== 'string' || mensaje.trim().length === 0) {
      return NextResponse.json(
        { error: 'Por favor proporciona un mensaje o texto sospechoso para analizar.' },
        { status: 400 }
      );
    }

    // Imagen opcional (data URL base64) para analisis visual multimodal
    const imagenBase64 = typeof imagen === 'string' && imagen.startsWith('data:image/') && imagen.length < 5_500_000
      ? imagen
      : null;

    const textoLimpio = mensaje.trim();

    if (textoLimpio.length > 2500) {
      return NextResponse.json(
        { error: 'El mensaje supera el limite maximo permitido de 2,500 caracteres.' },
        { status: 400 }
      );
    }

    // 1. Detectar URLs para VirusTotal y Hybrid Analysis
    const urlsDetectadas = extraerUrlsDeTexto(textoLimpio);
    let telemetriaVT = null;
    let telemetriaHA = null;

    if (urlsDetectadas.length > 0) {
      const urlPrincipal = urlsDetectadas[0];
      const resultadosTelemetria = await Promise.allSettled([
        conTiempoLimite(consultarUrlEnVirusTotal(urlPrincipal), 8000, 'VirusTotal'),
        conTiempoLimite(consultarUrlEnHybridAnalysis(urlPrincipal), 8000, 'Hybrid Analysis'),
      ]);

      if (resultadosTelemetria[0]?.status === 'fulfilled') {
        telemetriaVT = resultadosTelemetria[0].value;
      }
      if (resultadosTelemetria[1]?.status === 'fulfilled') {
        telemetriaHA = resultadosTelemetria[1].value;
      }
    }

    // 2. Ejecutar Groq, Mistral, OpenCode, NVIDIA y xKiro (Qwen 3.8 Max) EN PARALELO INMEDIATO
    // Nota: OpenCode space-bunny y xKiro reciben null en imagen para ahorrar RAM y evitar timeouts
    const [resGroq, resMistral, resOpencode, resNvidia, resXKiro] = await Promise.allSettled([
      conTiempoLimite(analizarMensajeConGroq(textoLimpio, telemetriaVT, telemetriaHA, imagenBase64), 20000, 'Groq'),
      conTiempoLimite(analizarMensajeConMistral(textoLimpio, telemetriaVT, telemetriaHA, imagenBase64), 20000, 'Mistral'),
      conTiempoLimite(analizarMensajeConOpencode(textoLimpio, telemetriaVT, telemetriaHA, null), 35000, 'OpenCode'),
      conTiempoLimite(analizarMensajeConNvidia(textoLimpio, telemetriaVT, telemetriaHA, imagenBase64), 65000, 'NVIDIA'),
      conTiempoLimite(analizarMensajeConXKiro(textoLimpio, telemetriaVT, telemetriaHA, null), 30000, 'xKiro Qwen 3.8 Max'),
    ]);

    const resultadoGroq = resGroq.status === 'fulfilled' ? resGroq.value : null;
    const resultadoMistral = resMistral.status === 'fulfilled' ? resMistral.value : null;
    const resultadoOpencode = resOpencode.status === 'fulfilled' ? resOpencode.value : null;
    const resultadoNvidia = resNvidia.status === 'fulfilled' ? resNvidia.value : null;
    const resultadoXKiro = resXKiro.status === 'fulfilled' ? resXKiro.value : null;

    if (resGroq.status === 'rejected') {
      console.warn('Groq fallo:', resGroq.reason?.message);
    }
    if (resMistral.status === 'rejected') {
      console.warn('Mistral fallo:', resMistral.reason?.message);
    }
    if (resOpencode.status === 'rejected') {
      console.warn('OpenCode fallo:', resOpencode.reason?.message);
    }
    if (resNvidia.status === 'rejected') {
      console.warn('NVIDIA fallo:', resNvidia.reason?.message);
    }
    if (resXKiro.status === 'rejected') {
      console.warn('xKiro fallo:', resXKiro.reason?.message);
    }

    // Si los 5 motores fallaron, error total
    if (!resultadoGroq && !resultadoMistral && !resultadoOpencode && !resultadoNvidia && !resultadoXKiro) {
      return NextResponse.json(
        {
          error: 'Los motores de IA no pudieron procesar el mensaje.',
          detalle: `${resGroq.reason?.message || ''} | ${resMistral.reason?.message || ''} | ${resOpencode.reason?.message || ''} | ${resNvidia.reason?.message || ''} | ${resXKiro.reason?.message || ''}`,
        },
        { status: 500 }
      );
    }

    // Motor principal (Groq -> Mistral -> xKiro -> OpenCode -> NVIDIA)
    const motorPrincipal = resultadoGroq || resultadoMistral || resultadoXKiro || resultadoOpencode || resultadoNvidia;

    // 3. Guardar analisis anonimo
    try {
      await guardarAnalisis({
        mensajeOriginal: textoLimpio,
        nivel_riesgo: motorPrincipal.nivel_riesgo,
        porcentaje: motorPrincipal.porcentaje,
        categoria: motorPrincipal.categoria,
      });
    } catch (saveError) {
      console.warn('No se pudo persistir el analisis:', saveError.message);
    }

    return NextResponse.json({
      success: true,
      data: {
        // Resumen principal
        nivel_riesgo: motorPrincipal.nivel_riesgo,
        porcentaje: motorPrincipal.porcentaje,
        categoria: motorPrincipal.categoria,

        // Motor 1: Groq — Analisis forense detallado
        groq: resultadoGroq,

        // Motor 2: Mistral AI — Auditoria de seguridad europea
        mistral: resultadoMistral,

        // Motor 3: xKiro — Razonamiento Lógico Profundo (Qwen 3.8 Max)
        xkiro: resultadoXKiro,

        // Motor 4: OpenCode — Dictamen conciso
        opencode: resultadoOpencode,

        // Motor 5: NVIDIA — Diagnóstico de riesgo con Nemotron
        nvidia: resultadoNvidia,

        // Telemetria de URLs y Sandbox
        virustotal: telemetriaVT,
        hybridanalysis: telemetriaHA,

        // Detalle de errores por motor (null si tuvo exito)
        errores_ia: {
          groq: resGroq.status === 'rejected' ? resGroq.reason?.message : null,
          mistral: resMistral.status === 'rejected' ? resMistral.reason?.message : null,
          xkiro: resXKiro.status === 'rejected' ? resXKiro.reason?.message : null,
          opencode: resOpencode.status === 'rejected' ? resOpencode.reason?.message : null,
          nvidia: resNvidia.status === 'rejected' ? resNvidia.reason?.message : null,
        },

        // Información de cuota de uso justo
        cuota: {
          modalidad,
          restante: checkLimite.restante,
          max: checkLimite.max,
          restableceEnMs: checkLimite.restableceEnMs,
        },

        timestamp: new Date().toISOString(),
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error en /api/analizar:', error);

    return NextResponse.json(
      {
        error: 'Ocurrio un error al procesar el mensaje.',
        detalle: error.message || 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}