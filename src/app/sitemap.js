import { ESTAFAS_COMUNES } from '@/lib/estafasData';
import { BLOG_POSTS } from '@/lib/blogData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verificaya.pe';

export default function sitemap() {
  const now = new Date().toISOString();

  // Páginas estáticas principales
  const staticRoutes = [
    { url: siteUrl,                           lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${siteUrl}/estafas-comunes`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/blog`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/nosotros`,             lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/precios`,              lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/privacidad`,           lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Páginas individuales de cada tipo de estafa
  const estafasRoutes = ESTAFAS_COMUNES.map((estafa) => ({
    url: `${siteUrl}/estafas-comunes/${estafa.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Artículos individuales del blog
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.fecha,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...estafasRoutes, ...blogRoutes];
}
