/**
 * Base de datos de artículos del Blog de VerificaYa
 * Optimizados para posicionamiento SEO en búsquedas de estafas en Perú
 */
export const BLOG_POSTS = [
  {
    slug: 'como-identificar-mensaje-falso-whatsapp-peru',
    titulo: 'Cómo identificar un mensaje falso de WhatsApp en Perú (Guía 2025)',
    resumen: 'Aprende a detectar mensajes de estafa en WhatsApp con esta guía completa: señales de alerta, ejemplos reales y qué hacer si ya caíste.',
    categoria: 'Phishing',
    tiempo_lectura: '7 min',
    fecha: '2025-09-15',
    keywords: ['mensaje falso whatsapp peru', 'estafa whatsapp 2025', 'como detectar phishing whatsapp'],
    imagen_alt: 'Cómo detectar mensajes falsos en WhatsApp en Perú',
    contenido: [
      {
        tipo: 'intro',
        texto: 'WhatsApp se ha convertido en el canal preferido de los ciberdelincuentes en el Perú. Según la División de Investigación de Delitos de Alta Tecnología (Divindat PNP), más del 70% de las denuncias por fraude digital en el país involucran un mensaje inicial enviado por esta plataforma. En esta guía te enseñamos a reconocer los patrones que usan los estafadores para que nunca más caigas en la trampa.'
      },
      {
        tipo: 'h2',
        texto: '¿Por qué WhatsApp es el canal favorito de los estafadores en Perú?'
      },
      {
        tipo: 'parrafo',
        texto: 'WhatsApp tiene más de 28 millones de usuarios activos en el Perú, lo que lo convierte en el medio de comunicación más masivo del país. Los ciberdelincuentes explotan tres características de la plataforma: la facilidad para crear números temporales con SIM internacionales, la confianza que genera un mensaje directo vs. un correo, y la posibilidad de enviar mensajes masivos con bots. El resultado: miles de peruanos reciben cada día mensajes de desconocidos ofreciendo trabajos, bonos del Estado o alertas bancarias falsas.'
      },
      {
        tipo: 'h2',
        texto: '8 señales que delatan un mensaje falso en WhatsApp'
      },
      {
        tipo: 'lista',
        items: [
          '**Número desconocido con código de país extranjero** (+62 Indonesia, +234 Nigeria, +44 UK, +84 Vietnam): Ninguna empresa peruana formal te contactará desde un número internacional para ofrecerte trabajo o bonos.',
          '**Sentido de urgencia exagerado**: Frases como "tienes 2 horas", "oferta limitada" o "tu cuenta será bloqueada en 15 minutos" son señales clásicas de ingeniería social.',
          '**Enlace acortado o dominio sospechoso**: Los links del tipo bit.ly, tinyurl.com o dominios con .xyz, .top, .site, .online son señales de alerta. Los bancos y entidades del Estado usan solo sus dominios oficiales.',
          '**Solicitud de clave, token o datos bancarios**: Ningún banco en el Perú (BCP, Interbank, BBVA, Banco de la Nación) te pedirá tu clave de 6 dígitos, Token Digital ni CVV por WhatsApp o SMS.',
          '**Premios no solicitados**: Si no participaste en ningún sorteo, no puedes haber ganado nada. Es simple.',
          '**Pedido de transferencia para acceder a un beneficio**: El clásico "paga S/ 50 de gastos de envío para recibir tu premio de S/ 5,000" es 100% estafa.',
          '**Fotos de perfil con logos de empresas conocidas**: TikTok, Amazon, BCP, SUNAT son usados para generar confianza falsa.',
          '**Migración urgente a Telegram o grupos cerrados**: Los estafadores usan esto para operar fuera del alcance de reportes de WhatsApp.',
        ]
      },
      {
        tipo: 'h2',
        texto: '¿Qué debo hacer si recibo un mensaje sospechoso?'
      },
      {
        tipo: 'lista',
        items: [
          'No respondas ni hagas clic en ningún enlace del mensaje.',
          'Copia el texto del mensaje y pégalo en el analizador de VerificaYa para obtener un diagnóstico inmediato.',
          'Bloquea y reporta el número directamente desde WhatsApp (tres puntos → Reportar).',
          'Alerta a tu familia, especialmente a personas mayores que puedan ser más vulnerables.',
          'Si ya hiciste clic en un enlace, cambia de inmediato las claves de tu banca móvil y revisa movimientos recientes.'
        ]
      },
      {
        tipo: 'h2',
        texto: '¿Qué hacer si ya fui víctima?'
      },
      {
        tipo: 'parrafo',
        texto: 'Si ya transferiste dinero o entregaste tus datos bancarios, actúa en los próximos minutos: (1) Llama al número de emergencias de tu banco para bloquear tus canales digitales. BCP: 311-9898, Interbank: 311-9000, BBVA: 924-600-180, Yape: desde la app. (2) Dirígete a la comisaría más cercana para sentar la denuncia. (3) Acude a la Divindat PNP en Av. España 323, Lima, con capturas de pantalla del mensaje como evidencia.'
      },
    ]
  },
  {
    slug: 'phishing-bancario-bcp-interbank-bbva-peru',
    titulo: 'Phishing Bancario en Perú: Cómo Clonan el BCP, Interbank y BBVA',
    resumen: 'Los ciberdelincuentes crean páginas web idénticas a las de los bancos peruanos. Aprende a detectar un sitio falso y proteger tu dinero.',
    categoria: 'Phishing',
    tiempo_lectura: '8 min',
    fecha: '2025-09-22',
    keywords: ['phishing bcp peru', 'pagina falsa interbank', 'correo falso bbva peru', 'como detectar phishing bancario'],
    imagen_alt: 'Cómo detectar phishing bancario del BCP, Interbank y BBVA en Perú',
    contenido: [
      {
        tipo: 'intro',
        texto: 'El phishing bancario es el ciberdelito con mayor volumen de denuncias en el Perú. Los atacantes clonan con precisión quirúrgica las páginas web del BCP, Interbank, BBVA y Banco de la Nación para robar credenciales de acceso y vaciar cuentas bancarias en minutos. Esta guía te muestra exactamente cómo funcionan estos ataques y cómo identificarlos.'
      },
      {
        tipo: 'h2',
        texto: '¿Cómo funciona el phishing bancario paso a paso?'
      },
      {
        tipo: 'parrafo',
        texto: 'El ataque tiene tres etapas: (1) El ciberdelincuente envía un SMS o correo electrónico que parece provenir de tu banco, indicando que tu cuenta fue bloqueada o que hay actividad sospechosa. (2) El enlace incluido te lleva a una página web que visualmente es idéntica al portal oficial del banco, pero que corre en un dominio completamente diferente. (3) Al ingresar tu usuario y contraseña, el atacante accede en tiempo real a tu cuenta real y realiza transferencias a terceros antes de que notes el fraude.'
      },
      {
        tipo: 'h2',
        texto: 'Cómo verificar si un enlace bancario es falso'
      },
      {
        tipo: 'lista',
        items: [
          '**BCP:** El único dominio oficial es viabcp.com. Cualquier variante como bcp-seguridad.com, bcpbanca.pe o bcp-alerta.net es falsa.',
          '**Interbank:** El dominio oficial es interbank.pe. Desconfía de interbank-seguridad.com o interbankperu.net.',
          '**BBVA:** El dominio oficial es bbva.pe. Variantes como bbva-peru.com o bbvadigital.pe son fraudulentas.',
          '**Banco de la Nación:** Solo opera desde bn.com.pe. No tiene apps de pago directo.',
          '**Revisa el candado SSL:** Aunque el sitio falso pueda tener HTTPS, verifica que el nombre del dominio sea exactamente el oficial.',
          '**Nunca ingreses desde un enlace en SMS o correo:** Escribe siempre la dirección del banco directamente en tu navegador.',
        ]
      },
      {
        tipo: 'h2',
        texto: 'Regla de oro: lo que tu banco NUNCA te pedirá'
      },
      {
        tipo: 'lista',
        items: [
          'Tu clave de 6 dígitos de internet banking.',
          'Tu Token Digital o código de verificación SMS.',
          'El número completo de tu tarjeta + fecha de vencimiento + CVV.',
          'Que transfieras dinero para "proteger tu cuenta".',
          'Que descargues una app externa para "recuperar acceso".',
        ]
      },
    ]
  },
  {
    slug: 'trabajos-falsos-tiktok-amazon-estafa-peru',
    titulo: 'Trabajos Falsos en TikTok y Amazon: La Estafa de las "Tareas Digitales" en Perú',
    resumen: '¿Te ofrecieron ganar S/ 300 al día por dar likes en TikTok? Es una estafa masiva. Conoce cómo funciona y por qué miles de peruanos caen.',
    categoria: 'Laboral',
    tiempo_lectura: '9 min',
    fecha: '2025-10-01',
    keywords: ['trabajo falso tiktok peru', 'estafa tareas digitales', 'fraude laboral whatsapp peru', 'amazon trabajo falso'],
    imagen_alt: 'Estafa de trabajos falsos en TikTok y Amazon en Perú',
    contenido: [
      {
        tipo: 'intro',
        texto: 'Es la estafa laboral más extendida del Perú en 2024 y 2025. Miles de personas reciben mensajes por WhatsApp ofreciéndoles "trabajo remoto a tiempo parcial" para dar likes, seguir cuentas o calificar productos en TikTok, Amazon o Mercado Libre. El esquema comienza con pequeños pagos reales para ganar confianza y termina con la víctima perdiendo cientos o miles de soles de su propio bolsillo.'
      },
      {
        tipo: 'h2',
        texto: 'Cómo funciona la estafa de las tareas digitales paso a paso'
      },
      {
        tipo: 'lista',
        items: [
          '**Día 1 — El contacto inicial:** Recibes un mensaje de un número desconocido (generalmente con código +62, +1 o +44) que dice ser "reclutadora de RRHH" de TikTok, Amazon o una empresa ficticia.',
          '**Día 1-2 — La prueba de confianza:** Te asignan tareas simples (dar likes, seguir cuentas) y te pagan S/ 5 a S/ 20 por Yape o Plin. Esto es real y planificado para ganarse tu confianza.',
          '**Día 2-3 — El grupo de Telegram:** Te migran a un grupo privado de Telegram con otros supuestos trabajadores y un "supervisor". Aquí comienza la trampa real.',
          '**Día 3 en adelante — El sistema de recarga:** Para "acceder a tareas VIP" con comisiones de S/ 500-S/ 2,000, te dicen que debes "recargar" o depositar dinero en una cuenta. Prometen devolverte el capital más las comisiones.',
          '**El bloqueo:** Cuando intentas retirar tu dinero, inventan problemas técnicos, impuestos, "descongelamiento de cuenta" o simplemente te bloquean.',
        ]
      },
      {
        tipo: 'h2',
        texto: '¿Por qué tanta gente cae en esta estafa?'
      },
      {
        tipo: 'parrafo',
        texto: 'Los psicólogos lo llaman "sesgo de consistencia": una vez que una persona ha recibido pagos reales y dedicado tiempo a las tareas, tiene dificultad para aceptar que todo era una trampa. El primer pago real es precisamente la inversión del estafador para "enganchar" a la víctima. Además, el entorno de grupo en Telegram muestra a otros "trabajadores" publicando sus supuestas ganancias, lo cual es completamente fabricado con cuentas falsas.'
      },
      {
        tipo: 'h2',
        texto: 'Señales de alerta definitivas'
      },
      {
        tipo: 'lista',
        items: [
          'Nadie contacta a alguien para ofrecerle trabajo sin que haya postulado previamente.',
          'TikTok, Amazon y Mercado Libre no contratan personal por WhatsApp desde números personales.',
          'Ninguna empresa legítima te pide depositar tu propio dinero para acceder a comisiones.',
          'Los pagos "reales" iniciales son una inversión calculada del estafador, no señal de legitimidad.',
          'Si el grupo de Telegram muestra capturas de "ganancias" de otros, son fabricadas.',
        ]
      },
    ]
  },
  {
    slug: 'gota-a-gota-digital-apps-prestamos-ilegales-peru',
    titulo: 'Gota a Gota Digital: Apps de Préstamos Ilegales que Extorsionan en Perú',
    resumen: 'Las aplicaciones de préstamos rápidos no autorizadas por la SBS acceden a tus contactos y fotos para extorsionarte. Cómo identificarlas y protegerte.',
    categoria: 'Financiera',
    tiempo_lectura: '8 min',
    fecha: '2025-10-06',
    keywords: ['gota a gota peru apps', 'prestamos ilegales peru', 'app extorsion prestamo', 'prestamo rapido estafa peru sbs'],
    imagen_alt: 'Apps de préstamos ilegales Gota a Gota digital en Perú',
    contenido: [
      {
        tipo: 'intro',
        texto: 'El "Gota a gota" es un sistema de usura que en el Perú ha migrado de las calles a las tiendas de aplicaciones digitales. Estas apps prometen desembolsar dinero en minutos, sin revisar Infocorp ni pedir garantías, pero con un precio devastador: acceso a todos tus contactos, galería y mensajes. Si no pagas, comienza el terror: mensajes amenazantes a tu familia, jefe y amigos.'
      },
      {
        tipo: 'h2',
        texto: '¿Cómo funcionan estas apps de préstamos ilegales?'
      },
      {
        tipo: 'lista',
        items: [
          '**La descarga:** Se publicitan en Facebook Ads, TikTok o incluso en la Play Store con nombres inofensivos.',
          '**Los permisos:** Al instalarla, solicitan acceso a contactos, galería, cámara, micrófono y ubicación GPS. Esto es lo que usan para extorsionarte.',
          '**El desembolso trampa:** Te aprueban S/ 1,000 pero te depositan solo S/ 600 o S/ 700 (el resto son "gastos"). El plazo real es 7 días, no los 90 que prometían.',
          '**Los intereses usureros:** La tasa real anualizada puede superar el 500%. Al cuarto día ya empiezan a cobrar.',
          '**La extorsión:** Si no pagas, envían fotos manipuladas y mensajes amenazantes a todos tus contactos diciendo que eres un "deudor moroso" o cosas peores.',
        ]
      },
      {
        tipo: 'h2',
        texto: 'Cómo verificar si una entidad financiera es legal en Perú'
      },
      {
        tipo: 'parrafo',
        texto: 'Toda entidad que ofrece préstamos en el Perú debe estar registrada y autorizada por la Superintendencia de Banca, Seguros y AFP (SBS). Puedes verificar cualquier empresa en el portal oficial sbs.gob.pe. Si la entidad no aparece en ese registro, operar con ella es ilegal y peligroso.'
      },
      {
        tipo: 'h2',
        texto: '¿Qué hacer si ya instalé una de estas apps?'
      },
      {
        tipo: 'lista',
        items: [
          'Desinstala la aplicación de inmediato.',
          'Cambia las contraseñas de todas tus cuentas importantes.',
          'Alerta a tus contactos más cercanos de que pueden recibir mensajes falsos en tu nombre.',
          'Denuncia ante el Ministerio Público o la PNP. Guarda capturas de todos los mensajes amenazantes como evidencia.',
          'Si la app sigue amenazándote, consulta con INDECOPI o la Defensoría del Pueblo.',
        ]
      },
    ]
  },
];
