import type { MetadataRoute } from 'next'
import { properties } from '@/lib/data'

const BASE_URL = 'https://tacchinopropiedades.com.ar'

const staticRoutes = [
  '',
  '/propiedades',
  '/comprar',
  '/alquilar',
  '/apto-credito',
  '/tasaciones',
  '/servicios',
  '/nosotros',
  '/contacto',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))

  const propertyEntries: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${BASE_URL}/propiedades/${property.slug}`,
    lastModified: new Date(property.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticEntries, ...propertyEntries]
}
