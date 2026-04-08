import { notFound } from 'next/navigation'
import Image from 'next/image'
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
  Share2,
  Heart,
  ChevronLeft,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PropertyCard } from '@/components/properties/property-card'
import { PropertyGallery } from '@/components/properties/property-gallery'
import { PropertyContactForm } from '@/components/properties/property-contact-form'
import { properties } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = properties.find(p => p.slug === slug)
  
  if (!property) {
    return {
      title: 'Propiedad no encontrada',
    }
  }

  return {
    title: property.title,
    description: property.shortDescription,
  }
}

const operationLabels: Record<string, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  temporal: 'Temporal',
}

const propertyTypeLabels: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
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
  const property = properties.find(p => p.slug === slug)

  if (!property) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price)

  const relatedProperties = properties
    .filter(p => p.id !== property.id && p.neighborhood === property.neighborhood)
    .slice(0, 3)

  const whatsappMessage = `Hola, me interesa la propiedad: ${property.title} (Código: ${property.propertyCode}). Me gustaría recibir más información.`
  const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/propiedades" className="text-muted-foreground hover:text-foreground transition-colors">
              Propiedades
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium truncate">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/propiedades"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a propiedades
        </Link>

        {/* Property Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={cn(
                'text-sm',
                property.operationType === 'venta' && 'bg-primary text-primary-foreground',
                property.operationType === 'alquiler' && 'bg-accent text-accent-foreground'
              )}>
                {operationLabels[property.operationType]}
              </Badge>
              <Badge variant="secondary">
                {propertyTypeLabels[property.propertyType]}
              </Badge>
              {property.featured && (
                <Badge className="bg-amber-500 text-white">Destacada</Badge>
              )}
              {property.creditReady && (
                <Badge className="bg-emerald-500 text-white">Apto Crédito</Badge>
              )}
              <span className="text-sm text-muted-foreground">
                Código: {property.propertyCode}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>{property.address}, {property.neighborhood}, {property.city}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">
                {formattedPrice}
              </div>
              {property.operationType === 'alquiler' && (
                <span className="text-muted-foreground">/mes</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="w-5 h-5" />
                <span className="sr-only">Guardar</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-5 h-5" />
                <span className="sr-only">Compartir</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery property={property} />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.coveredArea > 0 && (
                <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
                  <Maximize className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-foreground">{property.coveredArea} m²</div>
                  <div className="text-sm text-muted-foreground">Cubiertos</div>
                </div>
              )}
              {property.totalArea > 0 && (
                <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
                  <Maximize className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-foreground">{property.totalArea} m²</div>
                  <div className="text-sm text-muted-foreground">Totales</div>
                </div>
              )}
              {property.bedrooms > 0 && (
                <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
                  <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-foreground">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Dormitorios</div>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
                  <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-lg font-semibold text-foreground">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Baños</div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.longDescription}
              </p>
            </div>

            {/* Details */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">Detalles</h2>
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
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="text-xl font-semibold text-foreground mb-4">Características</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-foreground">{featureLabels[feature] || feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">Ubicación</h2>
              <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Mapa de ubicación</p>
                  <p className="text-sm text-muted-foreground">{property.neighborhood}, {property.city}</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Excelente ubicación en {property.neighborhood}, con fácil acceso a transporte público, 
                comercios, colegios y todos los servicios. Zona residencial consolidada con calles 
                tranquilas y arboladas.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                ¿Te interesa esta propiedad?
              </h3>
              
              {/* Quick Contact Buttons */}
              <div className="space-y-3 mb-6">
                <Button className="w-full gap-2" size="lg" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full gap-2" size="lg" asChild>
                  <a href="tel:+5491112345678">
                    <Phone className="w-5 h-5" />
                    Llamar ahora
                  </a>
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Contact Form */}
              <PropertyContactForm propertyCode={property.propertyCode} propertyTitle={property.title} />
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
              Propiedades similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
