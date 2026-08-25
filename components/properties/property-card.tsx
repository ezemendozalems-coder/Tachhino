'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Maximize, Car, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/hooks/use-favorites'
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

export function PropertyCard({ property, className }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(property.id)

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <article className={cn(
      'group relative bg-card rounded-lg overflow-hidden border border-border/60',
      'shadow-sm hover:shadow-xl transition-all duration-500',
      'hover:-translate-y-1',
      className
    )}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={property.images[0] ?? '/placeholder.jpg'}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            'object-cover transition-transform duration-700 group-hover:scale-105',
            property.reserved && 'grayscale-[35%] brightness-[0.85]'
          )}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={cn(
              'px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-sm shadow',
              property.operationType === 'venta' ? 'bg-[var(--color-ink)] text-white' : 'bg-white text-[var(--color-ink)]'
            )}
          >
            {operationLabels[property.operationType]}
          </span>
          {property.isNew && (
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-sm shadow bg-[var(--color-gold)] text-[var(--color-ink)]">
              Nueva
            </span>
          )}
          {property.creditReady && (
            <span className="group/credit relative px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-sm shadow bg-primary text-white flex items-center gap-1">
              ✓ Apto crédito
              <span className="pointer-events-none absolute left-0 top-full mt-1 whitespace-nowrap rounded-sm bg-[var(--color-ink)] text-white text-[11px] px-2 py-1 opacity-0 group-hover/credit:opacity-100 transition-opacity">
                Consultá financiación →
              </span>
            </span>
          )}
        </div>

        {property.reserved && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm bg-[var(--color-ink)]/85 text-white">
              Reservada
            </span>
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(property.id)
          }}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow flex items-center justify-center transition-opacity duration-300',
            favorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
          aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart className={cn('w-4 h-4 transition-colors', favorite ? 'fill-primary text-primary' : 'text-[var(--color-ink)]')} />
        </button>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-sm bg-white/90 backdrop-blur-sm text-[var(--color-ink)] text-[11px] shadow">
            {propertyTypeLabels[property.propertyType]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-semibold text-foreground">
            {formattedPrice}
          </span>
          {property.operationType === 'alquiler' && (
            <span className="text-sm text-muted-foreground">/mes</span>
          )}
        </div>

        <h3 className="text-base font-medium text-foreground mb-1.5 line-clamp-1">
          <Link href={`/propiedades/${property.slug}`} className="hover:text-primary transition-colors">
            {property.title}
          </Link>
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="text-sm truncate">{property.neighborhood}, {property.city}</span>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border text-muted-foreground">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
          )}
          {property.garages > 0 && (
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              <span className="text-sm">{property.garages}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" />
            <span className="text-sm">{property.coveredArea || property.totalArea} m²</span>
          </div>
        </div>
      </div>

      <Link
        href={`/propiedades/${property.slug}`}
        className="absolute inset-0"
        aria-label={`Ver detalles de ${property.title}`}
      />
    </article>
  )
}
