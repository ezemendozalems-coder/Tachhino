import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Calendar,
  Building2,
  Compass,
  ChevronLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PropertyCard } from '@/components/properties/property-card'
import { PropertyGallery } from '@/components/properties/property-gallery'
import { PropertyContactForm } from '@/components/properties/property-contact-form'
import { PropertyShareButton } from '@/components/properties/property-share-button'
import { PropertyFavoriteButton } from '@/components/properties/property-favorite-button'
import { PropertyStickyMobileCTA } from '@/components/properties/property-sticky-mobile-cta'
import { RecentlyViewedTracker } from '@/components/properties/recently-viewed-tracker'
import { RecentlyViewedSection } from '@/components/properties/recently-viewed-section'
import { PropertyMap } from '@/components/properties/property-map'
import { properties } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

// Placeholder — reemplazar por el número real de WhatsApp de Tacchino Propiedades.
const WHATSAPP_NUMBER = '5491144510000'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = properties.find((p) => p.slug === slug)

  if (!property) {
    return { title: 'Propiedad no encontrada' }
  }

  const url = `https://tacchinopropiedades.com.ar/propiedades/${property.slug}`

  return {
    title: property.title,
    description: property.shortDescription,
    openGraph: {
      title: property.title,
      description: property.shortDescription,
      url,
      type: 'website',
      images: property.images[0] ? [{ url: property.images[0] }] : undefined,
    },
    alternates: { canonical: url },
  }
}

const operationLabels: Record<string, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  temporal: 'Temporal',
}

const propertyTypeLabels: Record<string, string> = {
  casa: 'Chalet',
  departamento: 'Departamento',
  duplex: 'Dúplex',
  ph: 'PH',
  lote: 'Lote',
  oficina: 'Oficina',
  local: 'Local',
  cochera: 'Cochera',
  galpon: 'Galpón',
}

const conditionLabels: Record<string, string> = {
  nuevo: 'A estrenar',
  excelente: 'Excelente',
  'muy-bueno': 'Muy bueno',
  bueno: 'Bueno',
  regular: 'Regular',
  'a-reciclar': 'A reciclar',
}

const featureLabels: Record<string, string> = {
  balcon: 'Balcón',
  terraza: 'Terraza',
  patio: 'Patio',
  jardin: 'Jardín',
  parrilla: 'Parrilla',
  pileta: 'Pileta',
  lavadero: 'Lavadero',
  'cocina-separada': 'Cocina separada',
  dependencia: 'Dependencia',
  seguridad: 'Seguridad',
  'aire-acondicionado': 'Aire acondicionado',
  calefaccion: 'Calefacción',
  gimnasio: 'Gimnasio',
  quincho: 'Quincho',
  ascensor: 'Ascensor',
  'club-house': 'Club House',
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const property = properties.find((p) => p.slug === slug)

  if (!property) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price)

  const relatedProperties = properties
    .filter((p) => p.id !== property.id && p.neighborhood === property.neighborhood)
    .slice(0, 3)

  const whatsappMessage = `Hola, me interesa la propiedad: ${property.title} (Código: ${property.propertyCode}). Me gustaría recibir más información.`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  const visitMessage = `Hola, quiero coordinar una visita para la propiedad: ${property.title} (Código: ${property.propertyCode}).`
  const visitUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(visitMessage)}`

  const financingMessage = `Hola, quiero consultar por financiación / apto crédito para la propiedad: ${property.title} (Código: ${property.propertyCode}).`
  const financingUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(financingMessage)}`

  const indicators = [
    { value: property.coveredArea || property.totalArea, label: 'm² Superficie', show: true },
    { value: property.rooms, label: 'Ambientes', show: property.rooms > 0 },
    { value: property.bedrooms, label: 'Dormitorios', show: property.bedrooms > 0 },
    { value: property.bathrooms, label: 'Baños', show: property.bathrooms > 0 },
    { value: property.garages, label: 'Cochera', show: property.garages > 0 },
  ].filter((i) => i.show)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.shortDescription,
    url: `https://tacchinopropiedades.com.ar/propiedades/${property.slug}`,
    image: property.images,
    datePosted: property.createdAt,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.neighborhood,
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency,
      availability: property.reserved
        ? 'https://schema.org/Reserved'
        : 'https://schema.org/InStock',
    },
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecentlyViewedTracker propertyId={property.id} />

      {/* Breadcrumb */}
      <div className="bg-secondary/40 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/propiedades?operacion=${property.operationType}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {operationLabels[property.operationType]}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{property.neighborhood}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">
              {propertyTypeLabels[property.propertyType]}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/propiedades"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a propiedades
        </Link>

        {/* Property Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={cn(
                  'px-2.5 py-1 text-xs font-semibold uppercase tracking-wide rounded-sm',
                  property.operationType === 'venta' ? 'bg-[var(--color-ink)] text-white' : 'bg-secondary text-foreground'
                )}
              >
                {operationLabels[property.operationType]}
              </span>
              {property.creditReady && (
                <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wide rounded-sm bg-primary text-white">
                  ✓ Apto crédito
                </span>
              )}
              {property.reserved && (
                <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wide rounded-sm bg-secondary text-foreground border border-border">
                  Reservada
                </span>
              )}
              {property.isNew && (
                <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wide rounded-sm bg-[var(--color-gold)] text-[var(--color-ink)]">
                  Nueva
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                Código: {property.propertyCode}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{property.address}, {property.neighborhood}, {property.city}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-semibold text-foreground">
                {formattedPrice}
              </div>
              {property.operationType === 'alquiler' && (
                <span className="text-muted-foreground text-sm">/mes</span>
              )}
            </div>
            <div className="flex gap-2">
              <PropertyFavoriteButton propertyId={property.id} />
              <PropertyShareButton title={property.title} />
            </div>
          </div>
        </div>

        {property.reserved && (
          <div className="mb-6 px-4 py-3 rounded-sm bg-secondary border border-border text-sm text-muted-foreground">
            Esta propiedad se encuentra <strong className="text-foreground">reservada</strong> actualmente.
            Podés consultarnos por propiedades similares.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery property={property} />

            {/* Indicadores */}
            <div className={cn('grid gap-4', indicators.length >= 4 ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4')}>
              {indicators.map((indicator) => (
                <div key={indicator.label} className="bg-card rounded-lg p-4 border border-border/60 text-center">
                  <div className="text-2xl font-serif text-foreground">{indicator.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{indicator.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-card rounded-lg p-6 border border-border/60">
              <h2 className="text-xl font-medium text-foreground mb-4">Sobre esta propiedad</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.longDescription}
              </p>
            </div>

            {/* Details */}
            <div className="bg-card rounded-lg p-6 border border-border/60">
              <h2 className="text-xl font-medium text-foreground mb-4">Detalles</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Tipo</div>
                    <div className="text-foreground font-medium">
                      {propertyTypeLabels[property.propertyType]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Maximize className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Ambientes</div>
                    <div className="text-foreground font-medium">{property.rooms}</div>
                  </div>
                </div>
                {property.garages > 0 && (
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Cocheras</div>
                      <div className="text-foreground font-medium">{property.garages}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Antigüedad</div>
                    <div className="text-foreground font-medium">
                      {property.age === 0 ? 'A estrenar' : `${property.age} años`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Estado</div>
                    <div className="text-foreground font-medium">
                      {conditionLabels[property.condition]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-card rounded-lg p-6 border border-border/60">
                <h2 className="text-xl font-medium text-foreground mb-4">Características</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground text-sm">{featureLabels[feature] || feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-card rounded-lg p-6 border border-border/60">
              <h2 className="text-xl font-medium text-foreground mb-4">Ubicación</h2>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <PropertyMap properties={[property]} activeId={property.id} />
              </div>
              <p className="text-muted-foreground">
                Excelente ubicación en {property.neighborhood}, con fácil acceso a transporte
                público, comercios y los principales accesos de la zona.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border/60 lg:sticky lg:top-24">
              <div className="mb-4">
                <div className="text-2xl font-semibold text-foreground">{formattedPrice}</div>
                {property.operationType === 'alquiler' && (
                  <span className="text-muted-foreground text-sm">/mes</span>
                )}
              </div>
              <h3 className="text-base font-medium text-foreground mb-4">
                Quiero conocer esta propiedad
              </h3>

              <div className="space-y-3 mb-6">
                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm" size="lg" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full gap-2 rounded-sm" size="lg" asChild>
                  <a href={visitUrl} target="_blank" rel="noopener noreferrer">
                    <CalendarCheck className="w-5 h-5" />
                    Coordinar una visita
                  </a>
                </Button>
                {property.creditReady && (
                  <Button variant="outline" className="w-full gap-2 rounded-sm" size="lg" asChild>
                    <a href={financingUrl} target="_blank" rel="noopener noreferrer">
                      <ShieldCheck className="w-5 h-5" />
                      Consultar financiación
                    </a>
                  </Button>
                )}
              </div>

              <Separator className="my-6" />

              <PropertyContactForm propertyCode={property.propertyCode} propertyTitle={property.title} />
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl text-foreground mb-8">
              Propiedades similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

        <RecentlyViewedSection excludeId={property.id} />
      </div>

      <PropertyStickyMobileCTA
        formattedPrice={formattedPrice}
        isRental={property.operationType === 'alquiler'}
        whatsappUrl={whatsappUrl}
      />
    </div>
  )
}
