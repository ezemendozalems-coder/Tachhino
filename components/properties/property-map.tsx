'use client'

import { cn } from '@/lib/utils'
import type { Property } from '@/lib/types'

interface PropertyMapProps {
  properties: Property[]
  activeId: string | null
  /** Opcional: si no se pasa (p. ej. desde un Server Component), el mapa se muestra sin interacción de selección. */
  onSelect?: (id: string) => void
}

/**
 * Mapa esquemático de referencia (posiciona cada propiedad por lat/lng
 * normalizada dentro del panel). No sustituye una integración real de
 * Google Maps / Mapbox — para producción, conectar con una API key y
 * reemplazar este componente por el proveedor elegido.
 */
export function PropertyMap({ properties, activeId, onSelect }: PropertyMapProps) {
  const withLocation = properties.filter((p) => p.location)

  if (withLocation.length === 0) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center bg-secondary/60 rounded-lg text-muted-foreground text-sm">
        No hay propiedades con ubicación para mostrar en el mapa.
      </div>
    )
  }

  const lats = withLocation.map((p) => p.location!.lat)
  const lngs = withLocation.map((p) => p.location!.lng)
  const latMin = Math.min(...lats)
  const latMax = Math.max(...lats)
  const lngMin = Math.min(...lngs)
  const lngMax = Math.max(...lngs)
  const latSpan = latMax - latMin || 1
  const lngSpan = lngMax - lngMin || 1
  const pad = 12 // % de margen para que los pines no queden pegados al borde

  return (
    <div
      className="relative h-full min-h-[420px] rounded-lg overflow-hidden bg-[var(--color-mist)] border border-border"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(11,13,15,0.08) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-wider text-muted-foreground bg-white/80 backdrop-blur-sm px-2 py-1 rounded-sm">
        Mapa esquemático de referencia
      </span>

      {withLocation.map((property) => {
        const top = pad + (1 - (property.location!.lat - latMin) / latSpan) * (100 - pad * 2)
        const left = pad + ((property.location!.lng - lngMin) / lngSpan) * (100 - pad * 2)
        const isActive = activeId === property.id
        const priceLabel = new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: property.currency,
          notation: 'compact',
          maximumFractionDigits: 0,
        }).format(property.price)

        return (
          <button
            key={property.id}
            type="button"
            onClick={() => onSelect?.(property.id)}
            disabled={!onSelect}
            style={{ top: `${top}%`, left: `${left}%` }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center transition-transform',
              onSelect && 'cursor-pointer',
              isActive && 'z-20 scale-110'
            )}
          >
            <span
              className={cn(
                'px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-lg whitespace-nowrap transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-[var(--color-ink)] text-white hover:bg-primary'
              )}
            >
              {priceLabel}
            </span>
            <span
              className={cn(
                'w-2.5 h-2.5 rotate-45 -mt-[5px]',
                isActive ? 'bg-primary' : 'bg-[var(--color-ink)]'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
