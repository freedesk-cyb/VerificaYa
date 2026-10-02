/**
 * Integración con xKiro AI Gateway (modelo Qwen 3.8 Max en tier gratuito).
 * Endpoint OpenAI-compatible con alta capacidad de razonamiento lógico.
 */

import { extraerJson } from './extraerJson';
import { sanitizarParaPrompt, ANCLA_ANTI_INYECCION } from './seguridad';

const XKIRO_API_KEY = process.env.XKIRO_API_KEY || '';
const BASE_URL = process.env.XKIRO_BASE_URL || 'https://api.xkiro.com/v1';

// Modelos de razonamiento disponibles en el plan gratuito de xKiro.
// MiniMax M3 quedó fuera: 'minimax/minimax-m3:free' devuelve 404 y la variante
// de pago devuelve 403 en cuentas Free. Ver /v1/models para la lista vigente.
const MODELOS = [
  'qwen/qwen3.8-max:free',
  'qwen/qwen3.7-max:free',
  'qwen/qwen3.6-27b:free',
];

/**
 * Prompt del sistema para Qwen 3.8 Max: Razonamiento lógico y análisis forense antifraude
 */
export const SYSTEM_PROMPT_XKIRO = `Eres un auditor de ciberseguridad y motor de razonamiento antifraude de élite especializado en Perú (BCP, Interbank, BBVA, Yape, Plin, estafas "gota a gota", falsas ofertas laborales en TikTok/Telegram, suplantación de SUNAT, Reniec y familiares).

Tu objetivo es analizar profundamente el mensaje y aplicar razonamiento lógico deductivo para determinar si es un intento de estafa o fraude.

RESPONDE ÚNICAMENTE un objeto JSON válido con EXACTAMENTE esta estructura:
{
  "nivel_riesgo": "Alto" | "Medio" | "Bajo",
  "porcentaje": numero entero entre 0 y 100,
  "categoria": "Laboral" | "Financiera" | "Venta" | "Phishing" | "Otro",
  "senales": [
    "Señal lógica 1 con contexto específico",
    "Señal lógica 2 con contexto específico",
    "Señal lógica 3 con contexto específico"
  ],
  "razonamiento_logico": "Párrafo de 2 a 3 oraciones deduciendo la intención del atacante, inconsistencias detectadas y patrón de ingeniería social.",
  "explicacion": "Explicación clara y directa de 2 oraciones para el ciudadano.",
  "recomendacion": "Acción preventiva inmediata y concreta."
}

CRITERIOS:
- Si el mensaje es legítimo institucional o personal seguro, usa nivel_riesgo "Bajo" y porcentaje 0-20.
- Si hay urgencia artificial, solicitudes de códigos OTP/token, enlaces sospechosos o promesas irreales de dinero fácil, clasifica como "Medio" o "Alto".
- No incluyas ningún texto fuera del bloque JSON.`;

/**
 * Analiza un mensaje utilizando xKiro (Qwen 3.8 Max)
 * @param {string} mensaje
 * @param {object|null} telemetriaVT
 * @param {object|null} telemetriaHA
 * @param {string|null} imagenBase64
 * @returns {Promise<object>}
 */
export async function analizarMensajeConXKiro(mensaje, telemetriaVT = null, telemetriaHA = null, imagenBase64 = null) {
  if (!XKIRO_API_KEY) {
    throw new Error('La variable de entorno XKIRO_API_KEY no está configurada.');
  }

  const hayImagen = typeof imagenBase64 === 'string' && imagenBase64.startsWith('data:image/');

  let userPrompt = hayImagen
    ? `Analiza la imagen adjunta (captura de pantalla). Texto extraído por OCR:\n\n<<<INICIO_MENSAJE_CIUDADANO>>>\n${sanitizarParaPrompt(mensaje)}\n<<<FIN_MENSAJE_CIUDADANO>>>\n\nAplica razonamiento deductivo para evaluar los indicios de fraude.`
    : `Analiza mediante razonamiento deductivo el siguiente mensaje:\n\n<<<INICIO_MENSAJE_CIUDADANO>>>\n${sanitizarParaPrompt(mensaje)}\n<<<FIN_MENSAJE_CIUDADANO>>>`;

  if (telemetriaVT && telemetriaVT.consultado && telemetriaVT.stats) {
    const { malicious, suspicious, total } = telemetriaVT.stats;
    userPrompt += `\n\n[EVIDENCIA VIRUSTOTAL]: ${malicious} de ${total} motores marcaron la URL como maliciosa (${suspicious} sospechosa).`;
  }

  if (telemetriaHA && telemetriaHA.consultado) {
    userPrompt += `\n\n[EVIDENCIA FALCON SANDBOX]: Threat Score ${telemetriaHA.threat_score}/100, Veredicto: ${telemetriaHA.veredicto}.`;
  }

  // Ancla anti-inyección
  userPrompt += ANCLA_ANTI_INYECCION;

  let ultimoError = null;

  for (const modelo of MODELOS) {
    try {
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${XKIRO_API_KEY}`,
        },
        body: JSON.stringify({
          model: modelo,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT_XKIRO },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.1,
          max_tokens: 1024,
        }),
        signal: AbortSignal.timeout(25000),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detalle = errorBody.error?.message || errorBody.message || `xKiro respondió con código ${response.status}`;
        throw new Error(detalle);
      }

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content;

      if (!rawText) throw new Error('Respuesta vacía de xKiro');

      const parsed = extraerJson(rawText);
      if (!parsed) {
        const finish = data.choices?.[0]?.finish_reason;
        throw new Error(finish === 'length'
          ? 'xKiro truncó la respuesta por límite de tokens.'
          : 'No se pudo parsear el JSON de xKiro (Qwen 3.8 Max).');
      }

      const nivelValido = ['Alto', 'Medio', 'Bajo'].includes(parsed.nivel_riesgo)
        ? parsed.nivel_riesgo
        : (parsed.porcentaje >= 70 ? 'Alto' : (parsed.porcentaje >= 35 ? 'Medio' : 'Bajo'));

      const categoriaValida = ['Laboral', 'Financiera', 'Venta', 'Phishing', 'Otro'].includes(parsed.categoria)
        ? parsed.categoria
        : 'Otro';

      return {
        nivel_riesgo: nivelValido,
        porcentaje: typeof parsed.porcentaje === 'number' ? Math.min(100, Math.max(0, Math.round(parsed.porcentaje))) : 85,
        categoria: categoriaValida,
        senales: Array.isArray(parsed.senales) && parsed.senales.length > 0
          ? parsed.senales
          : ['Indicios sospechosos detectados por Qwen 3.8 Max'],
        razonamiento_logico: parsed.razonamiento_logico || null,
        explicacion: parsed.explicacion || 'Se detectaron patrones de riesgo mediante razonamiento analítico.',
        recomendacion: parsed.recomendacion || 'No compartas datos confidenciales ni realices transferencias.',
        modelo_usado: modelo,
      };
    } catch (err) {
      const msg = err?.message || '';
      console.warn(`Intento con modelo xKiro ${modelo} falló:`, msg.slice(0, 160));
      ultimoError = err;
    }
  }

  throw new Error(`xKiro Qwen 3.8 Max: ${ultimoError?.message || 'Fallo de conexión'}`);
}
