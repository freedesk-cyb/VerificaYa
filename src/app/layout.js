import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Canonical y Open Graph: siempre el dominio de producción.
// En Vercel, definir NEXT_PUBLIC_SITE_URL (ej. https://verificaya.pe) para evitar
// que los deploys de preview generen URLs distintas por VERCEL_URL.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

export const metadata = {
  title: 'VerificaYa | Detector de Phishing, Estafas y QR Maliciosos',
  description: 'Analiza enlaces, códigos QR e imágenes sospechosas para detectar estafas, phishing y amenazas digitales con IA. ¡Verifica antes de hacer clic!',
  keywords: [
    'detector de phishing',
    'estafas digitales',
    'verificar qr malicioso',
    'quishing qr falso',
    'detectar estafa whatsapp',
    'phishing bcp interbank yape',
    'antifraude inteligencia artificial',
    'analizar enlace sospechoso',
    'verificaya'
  ],
  authors: [{ name: 'VerificaYa' }],
  creator: 'VerificaYa',
  publisher: 'VerificaYa',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'VerificaYa | Detector de Phishing, Estafas y QR Maliciosos',
    description: 'Analiza enlaces, códigos QR e imágenes sospechosas para detectar estafas, phishing y amenazas digitales con IA. ¡Verifica antes de hacer clic!',
    url: siteUrl,
    siteName: 'VerificaYa',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VerificaYa | Detector de Phishing, Estafas y QR Maliciosos',
    description: 'Analiza enlaces, códigos QR e imágenes sospechosas para detectar estafas, phishing y amenazas digitales con IA.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '9zy-wCKRv9bVyqMpLrQpGvUWIs3n146pk4RCFG0uS6o',
  }
};

export default function RootLayout({ children }) {
  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VerificaYa',
    alternateName: ['VerificaYa Perú', 'Verifica Ya'],
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'VerificaYa — Detector de Estafas con IA',
    url: siteUrl,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    description: 'Analiza mensajes de WhatsApp, SMS, correos y capturas para detectar estafas digitales en Perú con Inteligencia Artificial. 100% gratis y confidencial.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PEN',
    },
    inLanguage: 'es-PE',
    creator: {
      '@type': 'Organization',
      name: 'VerificaYa',
      url: siteUrl,
    },
    keywords: 'estafas peru, phishing, whatsapp estafa, verificar mensaje sospechoso, antifraude ia',
  };

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Guardan mis mensajes o capturas de pantalla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. VerificaYa implementa una política estricta de Cero Almacenamiento y Cero Registros (Zero-Logs). No guardamos copias de tus textos, capturas, números de celular ni historiales de análisis.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo detecta VerificaYa si un mensaje es una estafa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usamos modelos de Inteligencia Artificial entrenados con heurísticas y vectores de ataque cibernético propios del Perú: phishing bancario (BCP, Interbank, BBVA), trabajos falsos en TikTok, préstamos gota a gota y quishing con códigos QR.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué hago si ya caí en una estafa en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Contacta de inmediato a tu banco o billetera (Yape/Plin) para solicitar el bloqueo. Luego denuncia ante la División de Investigación de Delitos de Alta Tecnología (Divindat PNP) en Av. España 323, Lima.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es gratis usar VerificaYa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. VerificaYa es completamente gratuito para todos los ciudadanos peruanos. No requieres crear cuenta ni registrarte.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo identificar un mensaje de phishing bancario del BCP o Interbank?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los bancos en el Perú NUNCA envían enlaces por SMS para actualizar claves ni solicitan tu Token Digital por mensaje. Verifica que el enlace termine en el dominio oficial: .viabcp.com, .interbank.pe, .bbva.pe. Si tienes dudas, pega el mensaje en VerificaYa.',
        },
      },
    ],
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

