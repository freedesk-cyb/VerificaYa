import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileText, 
  CheckCircle2, 
  Server, 
  Clock, 
  UserCheck, 
  Cpu, 
  ExternalLink, 
  Database,
  Mail,
  Scale,
  Shield
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

export const metadata = {
  title: 'Política de Privacidad y Cero Almacenamiento | VerificaYa Perú',
  description: 'Política de privacidad de VerificaYa: cero almacenamiento de mensajes, cumplimiento de la Ley N° 29733 de Perú, derechos ARCO y arquitectura Zero-Logs.',
  keywords: [
    'politica privacidad peru',
    'ley 29733 peru datos personales',
    'zero logs antifraude',
    'verificaya privacidad',
  ],
  alternates: {
    canonical: `${siteUrl}/privacidad`,
  },
  openGraph: {
    title: 'Política de Privacidad | VerificaYa Perú',
    description: 'Cero almacenamiento de datos. Cumplimos la Ley N° 29733 de Protección de Datos Personales del Perú.',
    url: `${siteUrl}/privacidad`,
    siteName: 'VerificaYa',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            Transparencia y Protección Ciudadana
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto">
            Última actualización: Septiembre 2026 • Elaborada en estricto cumplimiento de la <strong>Ley N° 29733</strong> (Ley de Protección de Datos Personales del Perú) y su Reglamento (D.S. 003-2013-JUS).
          </p>
        </div>

        {/* Resumen de Compromiso Rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <EyeOff className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cero Datos Personales</h4>
              <p className="text-xs text-slate-600 mt-0.5">Enmascaramos DNI, teléfonos, tarjetas y correos antes de persistir cualquier registro.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Retención Efímera</h4>
              <p className="text-xs text-slate-600 mt-0.5">Imágenes y mensajes crudos se procesan en memoria volátil y no se guardan en disco.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Derechos ARCO</h4>
              <p className="text-xs text-slate-600 mt-0.5">Canal formal y atención garantizada en un plazo legal máximo de 10 días hábiles.</p>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          {/* 1. Responsable y Marco Legal */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Scale className="w-5 h-5 text-blue-600" />
              1. Responsable del Tratamiento y Marco Legal
            </h2>
            <p>
              <strong>VerificaYa</strong> es una iniciativa tecnológica ciudadana de prevención de delitos informáticos orientada al público peruano. El tratamiento de cualquier información remitida a través de esta plataforma se rige por la <strong>Ley N° 29733 (Ley de Protección de Datos Personales de la República del Perú)</strong>, su Reglamento aprobado mediante <strong>Decreto Supremo N° 003-2013-JUS</strong> y las directivas emitidas por la <strong>Autoridad Nacional de Protección de Datos Personales (ANPPD)</strong>.
            </p>
          </section>

          {/* 2. Qué datos recopilamos y cuáles NO */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Database className="w-5 h-5 text-emerald-600" />
              2. ¿Qué datos procesamos y qué datos NO recopilamos?
            </h2>
            <p>
              Nos regimos por el <strong>principio de proporcionalidad y calidad de datos</strong>. Solo procesamos la información estrictamente necesaria para determinar si un mensaje o enlace constituye una estafa digital:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-800 font-bold">
                  <tr>
                    <th className="py-2.5 px-3 text-left border-b border-slate-200">Tipo de Información</th>
                    <th className="py-2.5 px-3 text-left border-b border-slate-200">Finalidad de Uso</th>
                    <th className="py-2.5 px-3 text-left border-b border-slate-200">Base Legal / Mecanismo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Texto del mensaje sospechoso</td>
                    <td className="py-2.5 px-3">Análisis semántico forense para identificar patrones de fraude (phishing, premios falsos, préstamos gota a gota).</td>
                    <td className="py-2.5 px-3">Consentimiento voluntario del usuario al enviar la consulta.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Enlaces web (URLs) y Códigos QR</td>
                    <td className="py-2.5 px-3">Consulta de reputación y descarte de trampas Quishing o dominios maliciosos.</td>
                    <td className="py-2.5 px-3">Interés legítimo en ciberseguridad y prevención de incidentes.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Capturas de pantalla (Imágenes)</td>
                    <td className="py-2.5 px-3">Extracción OCR en navegador/memoria para transcribir el texto. La imagen original se descarta de inmediato.</td>
                    <td className="py-2.5 px-3">Consentimiento explícito al cargar el archivo de imagen.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Metadatos de seguridad técnica</td>
                    <td className="py-2.5 px-3">Prevención de abusos y ataques DDoS mediante limitación de frecuencia de solicitudes (Rate Limiting).</td>
                    <td className="py-2.5 px-3">Seguridad del sistema (no se vincula con identidades personales).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-amber-800">
                <EyeOff className="w-4 h-4 text-amber-700" />
                Lo que NUNCA recopilamos ni almacenamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-amber-900">
                <li><strong>No solicitamos registro ni cuentas de usuario:</strong> No pedimos nombres, correos personales, números de celular ni contraseñas para analizar mensajes.</li>
                <li><strong>No usamos cookies de rastreo publicitario:</strong> No hay cookies de terceros, píxeles de Meta (Facebook), ni herramientas de seguimiento comercial.</li>
                <li><strong>No almacenamos datos financieros ni bancarios:</strong> Si un mensaje incluye un número de tarjeta o cuenta CCI, es purgado automáticamente mediante algoritmos de sanitización.</li>
              </ul>
            </div>
          </section>

          {/* 3. Finalidades del tratamiento */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              3. ¿Para qué finalidades utilizamos la información?
            </h2>
            <p>Los datos son tratados exclusivamente para los siguientes propósitos delimitados:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>Finalidad Principal — Diagnóstico Antifraude Inmediato:</strong> Analizar las características del mensaje, la redacción, las ofertas o las URLs ingresadas para emitir un informe orientativo en tiempo real sobre el nivel de riesgo de estafa.
              </li>
              <li>
                <strong>Finalidad Secundaria — Estadísticas Agregadas de Concientización Ciudadana:</strong> Consolidar métricas despersonalizadas (ej. porcentaje de estafas detectadas en la categoría &quot;Empleo Falso&quot; vs. &quot;Bancos Peruanos&quot;) con fines de educación pública, investigación técnica y difusión preventiva.
              </li>
              <li>
                <strong>Finalidad Operativa — Integridad de la Infraestructura:</strong> Detectar intentos de saturación o denegación de servicio (DDoS) para garantizar la disponibilidad continua y gratuita del servicio.
              </li>
            </ul>
          </section>

          {/* 4. Política de Retención de Datos */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              4. ¿Cuánto tiempo conservamos la información?
            </h2>
            <p>
              Aplicamos una política rigurosa de <strong>ciclo de vida de datos y descarte programado</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">0 Segundos (Memoria Volátil)</span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Imágenes de capturas y texto crudo</h4>
                <p className="text-xs text-slate-600">
                  Las imágenes de capturas de pantalla y el contenido íntegro sin sanitizar se procesan únicamente en la memoria RAM del servidor o navegador durante la sesión de análisis y <strong>se eliminan de inmediato</strong> al emitir el veredicto.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">Hasta 12 Meses</span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Registros estadísticos anonimizados</h4>
                <p className="text-xs text-slate-600">
                  Los datos estadísticos agregados (categoría de fraude, nivel de riesgo, huella criptográfica SHA-256 no reversible y resumen sanitizado sin datos de contacto) se conservan por un plazo máximo de <strong>12 meses</strong> para estudios de tendencias de ciberseguridad nacional, procediéndose luego a su purga automática.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Proveedores de Inteligencia Artificial y Sub-procesadores */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Cpu className="w-5 h-5 text-purple-600" />
              5. Transmisión a Proveedores de Inteligencia Artificial y Servicios Externos
            </h2>
            <p>
              Para brindar un veredicto de máxima precisión técnica, VerificaYa hace uso de sub-procesadores tecnológicos especializados de primer nivel internacional. Declaramos de manera transparente su identidad y función:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    <span>Groq Cloud Inc. (Estados Unidos) — Motor de Inferencia IA</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">LLM Llama 3 70B</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  <strong>Datos transmitidos:</strong> El texto redactado en la consulta es enviado a través de canales cifrados HTTPS/TLS hacia los centros de datos de ultra-baja latencia de Groq para su clasificación semántica y generación de advertencias.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>Política de retención:</strong> Groq procesa las solicitudes como proveedor de infraestructura en la nube; conforme a sus términos empresariales, las entradas procesadas vía API no se utilizan para reentrenar modelos fundacionales públicos de terceros.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>Google Gemini (Google LLC, EE.UU.) — Modelo Multimodal de Inteligencia Artificial</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Gemini Pro / Flash</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  <strong>Datos transmitidos:</strong> El texto sanitizado y la evidencia técnica son procesados de forma paralela por Google Gemini para emitir un dictamen conciso y contrastar la evaluación de riesgo.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>Política de privacidad:</strong> Las solicitudes de API se procesan con salvaguardas de confidencialidad y no se asocian a cuentas de usuario ni se destinan a publicidad.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                    <Server className="w-4 h-4 text-blue-600" />
                    <span>VirusTotal (Chronicle Security / Google LLC) — Auditoría Reputacional de URLs</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">API v3 Multimotor</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  <strong>Datos transmitidos:</strong> Exclusivamente las direcciones web (URLs) o nombres de dominio extraídos del mensaje o código QR. <strong>En ningún caso se transmiten mensajes privados ni nombres de usuarios a VirusTotal</strong>.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>Propósito:</strong> Contrastar la URL contra más de 70 motores globales de antivirus y listas negras de phishing reconocidas por la industria de ciberseguridad.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>Hybrid Analysis / Falcon Sandbox (CrowdStrike) — Análisis Dinámico Forense</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">API v2 Sandbox</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  <strong>Datos transmitidos:</strong> Huellas criptográficas (SHA-256) de indicadores o enlaces sospechosos para verificar si coinciden con muestras de malware o campañas de phishing detonadas previamente.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>Propósito:</strong> Obtener Threat Scores y veredictos de comportamiento en entornos de ejecución seguros (Sandbox).
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Tesseract OCR (Motor Local) — Reconocimiento Óptico de Texto</span>
                  </div>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Procesamiento Local</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  El procesamiento de imágenes de capturas de pantalla para extraer el texto sospechoso se realiza directamente en el entorno de la aplicación mediante librerías OCR locales, <strong>sin subir tus imágenes personales a plataformas externas de visión por computadora</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Medidas de Seguridad */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Lock className="w-5 h-5 text-indigo-600" />
              6. Medidas de Seguridad Técnicas y Organizativas
            </h2>
            <p>
              Hemos implementado salvaguardas técnicas acordes al estado de la tecnología para proteger la confidencialidad e integridad de las consultas:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>Cifrado TLS 1.3 / HTTPS:</strong> Toda comunicación entre tu navegador y nuestra plataforma viaja encriptada de punto a punto con certificados SSL/TLS modernos.
              </li>
              <li>
                <strong>Sanitización Automatizada de PII:</strong> Antes de cualquier persistencia estadística, nuestro software escanea y sustituye mediante expresiones regulares cualquier número de documento (DNI de 8 dígitos), teléfono móvil peruano (+51 o 9 dígitos), número de tarjeta de crédito/débito y dirección de correo electrónico por etiquetas genéricas (`[DNI_ENMASCARADO]`, `[NUMERO_ENMASCARADO]`, etc.).
              </li>
              <li>
                <strong>Huella Criptográfica SHA-256 Unidireccional:</strong> Los mensajes evaluados se convierten en un hash criptográfico de longitud fija. Esta huella permite detectar si una misma campaña de estafa se está repitiendo masivamente, sin que sea matemáticamente posible revertir la huella para recuperar el mensaje original.
              </li>
              <li>
                <strong>Límite de Longitud y Aislamiento de Credenciales:</strong> Se aplican validaciones estrictas de tamaño de carga (máx. 2,500 caracteres) y las llaves de acceso a las APIs residen protegidas en el backend sin exposición al cliente.
              </li>
            </ul>
          </section>

          {/* 7. Ejercicio de Derechos ARCO */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              7. Mecanismos para Ejercer los Derechos del Usuario (Derechos ARCO)
            </h2>
            <p>
              Conforme a la <strong>Ley N° 29733</strong>, todo ciudadano tiene derecho a ejercer sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> respecto de sus datos personales:
            </p>

            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
              <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-700" />
                Procedimiento para Solicitar el Ejercicio de Derechos ARCO:
              </h4>
              <p className="text-xs sm:text-sm text-blue-950">
                Puedes remitir tu solicitud escribiéndonos directamente a nuestro correo oficial de privacidad:
              </p>
              <div className="p-3 bg-white rounded-xl border border-blue-200 text-sm font-mono font-bold text-blue-700 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                <span>privacidad@verificaya.pe</span>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="text-slate-800">verificayacyber@gmail.com</span>
              </div>
              <ul className="text-xs text-blue-900 space-y-1 list-disc pl-5">
                <li><strong>Asunto del correo:</strong> Especificar <code>[Solicitud ARCO] - Nombre o Asunto</code>.</li>
                <li><strong>Información a incluir:</strong> Descripción clara del derecho que deseas ejercer (ej. cancelación/supresión de una muestra estadística) y cualquier elemento que permita localizar la consulta (como la fecha/hora exacta del análisis o el hash generado).</li>
                <li><strong>Plazo de Respuesta Legal:</strong> Nos comprometemos a responder tu solicitud en un plazo máximo de <strong>diez (10) días hábiles</strong> para solicitudes de rectificación, cancelación u oposición, y de <strong>veinte (20) días hábiles</strong> para el derecho de acceso, conforme a los plazos estipulados por el Reglamento de la Ley N° 29733.</li>
              </ul>
              <p className="text-[11px] text-blue-800 italic">
                * Nota aclaratoria: Debido a que VerificaYa no solicita nombres ni asocia cuentas a los análisis, la inmensa mayoría de las transacciones son anónimas. Si un análisis no contiene datos vinculables a tu persona, se te informará oportunamente que no existe registro personal pasible de modificación.
              </p>
            </div>
          </section>

          {/* 8. Principio de Minimización de Datos */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              8. Principio de Minimización y Privacidad por Defecto
            </h2>
            <p>
              En VerificaYa aplicamos el principio internacional de <strong>&quot;Data Minimization&quot;</strong>: no recolectamos datos &quot;por si acaso&quot;. Si una funcionalidad puede ejecutarse sin un dato, dicho dato no se solicita ni se registra. Tampoco comercializamos, alquilamos ni transferimos registros a empresas de publicidad, corredores de datos ni instituciones comerciales.
            </p>
          </section>

          {/* 9. Modificaciones a esta Política */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-5 h-5 text-slate-600" />
              9. Modificaciones a la Presente Política
            </h2>
            <p>
              VerificaYa se reserva el derecho de actualizar esta Política de Privacidad para adecuarla a nuevas disposiciones legislativas, mejoras tecnológicas o inclusión de nuevas herramientas de protección al usuario. Cualquier modificación sustancial será reflejada con la fecha de &quot;Última actualización&quot; en la parte superior de esta página.
            </p>
          </section>

          {/* Botones de acción inferior */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              ¿Tienes alguna duda sobre tus datos? Escríbenos a{' '}
              <a href="mailto:verificayacyber@gmail.com" className="text-blue-600 font-bold underline">
                verificayacyber@gmail.com
              </a>
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 text-center w-full sm:w-auto"
            >
              Volver al Analizador
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
