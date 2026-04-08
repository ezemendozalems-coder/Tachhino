'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Maximize, Heart, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
  className?: string
}

const operationLabels: Record<string, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  temporal: 'Temporal',
}

const propertyTypeLabels: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Depto',
  ph: 'PH',
  lote: 'Lote',
  oficina: 'Oficina',
  local: 'Local',
  cochera: 'Cochera',
  galpon: 'Galpón',
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <article className={cn(
      'group bg-card rounded-2xl overflow-hidden border border-border/50',
      'shadow-sm hover:shadow-xl transition-all duration-500',
      'hover:-translate-y-1',
      className
    )}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop`}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge 
            variant="secondary" 
            className={cn(
              'text-xs font-semibold shadow-lg',
              property.operationType === 'venta' && 'bg-primary text-primary-foreground',
              property.operationType === 'alquiler' && 'bg-accent text-accent-foreground'
            )}
          >
            {operationLabels[property.operationType]}
          </Badge>
          {property.featured && (
            <Badge variant="secondary" className="text-xs font-semibold bg-amber-500 text-white shadow-lg">
              Destacada
            </Badge>
          )}
          {property.creditReady && (
            <Badge variant="secondary" className="text-xs font-semibold bg-emerald-500 text-white shadow-lg">
              Apto Crédito
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg"
          >
            <Heart className="w-4 h-4" />
            <span className="sr-only">Guardar</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            <span className="sr-only">Compartir</span>
          </Button>
        </div>

        {/* Property Type Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground text-xs shadow-lg">
            {propertyTypeLabels[property.propertyType]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-foreground">
            {formattedPrice}
          </span>
          {property.operationType === 'alquiler' && (
            <span className="text-sm text-muted-foreground">/mes</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          <Link href={`/propiedades/${property.slug}`} className="hover:underline">
            {property.title}
          </Link>
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">{property.neighborhood}, {property.city}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize className="w-4 h-4" />
            <span className="text-sm">{property.coveredArea || property.totalArea} m²</span>
          </div>
        </div>
      </div>

      {/* Full Card Link Overlay */}
      <Link 
        href={`/propiedades/${property.slug}`} 
        className="absolute inset-0"
        aria-label={`Ver detalles de ${property.title}`}
      />
    </article>
  )
}
