// Server Component — exporta metadata y delega el render al componente cliente
import EstafasComunesClient from './EstafasComunesClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

export const metadata = {
  title: 'Estafas Digitales Más Comunes en Perú 2025 | VerificaYa',
  description:
    'Directorio educativo de las estafas más frecuentes en Perú: phishing BCP e Interbank, trabajos falsos en TikTok, préstamos gota a gota, QR falsos y más. Aprende a identificarlas.',
  keywords: [
    'estafas digitales peru 2025',
    'phishing bancario peru',
    'trabajos falsos tiktok peru',
    'gota a gota apps peru',
    'quishing qr peru',
    'fraude whatsapp peru',
    'tipos de estafas peru',
    'cibercrimen peru',
    'como detectar estafa peru',
  ],
  alternates: {
    canonical: `${siteUrl}/estafas-comunes`,
  },
  openGraph: {
    title: 'Estafas Digitales Más Comunes en Perú 2025 | VerificaYa',
    description:
      'Conoce el modus operandi real de los ciberdelincuentes peruanos: phishing, trabajos falsos en TikTok, préstamos abusivos y más. Aprende a protegerte.',
    url: `${siteUrl}/estafas-comunes`,
    siteName: 'VerificaYa',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estafas Digitales Más Comunes en Perú | VerificaYa',
    description: 'Directorio educativo antifraude: phishing, TikTok jobs, gota a gota y más.',
  },
};

export default function EstafasComunesPage() {
  return <EstafasComunesClient />;
}
