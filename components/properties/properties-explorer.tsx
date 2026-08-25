'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LayoutGrid, List, Map as MapIcon, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PropertyCard } from '@/components/properties/property-card'
import { PropertyCardSkeleton } from '@/components/properties/property-card-skeleton'
import { PropertyMap } from '@/components/properties/property-map'
import { PropertyFilters, FilterState, defaultFilters } from '@/components/properties/property-filters'
import { properties } from '@/lib/data'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'superficie-desc', label: 'Mayor superficie' },
]

interface PropertiesExplorerProps {
  /** Bloquea la operación (Venta/Alquiler) y oculta el control — para /comprar y /alquilar */
  lockOperation?: 'venta' | 'alquiler'
  /** Bloquea "Apto crédito" en true y oculta el control — para /apto-credito */
  lockCreditReady?: boolean
}

export function PropertiesExplorer({ lockOperation, lockCreditReady }: PropertiesExplorerProps) {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid')
  const [activeMapId, setActiveMapId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    operation: lockOperation ?? searchParams.get('operacion') ?? 'todos',
    propertyType: searchParams.get('tipo') || 'todos',
    neighborhood: searchParams.get('zona') || 'todos',
    rooms: searchParams.get('ambientes') || 'todos',
    priceMin: searchParams.get('precioMin') || '',
    priceMax: searchParams.get('precioMax') || '',
    creditReady: lockCreditReady ?? searchParams.get('aptoCredito') === 'true',
  })

  // Skeleton breve al cambiar filtros — sensación fluida, sin refresh brusco.
  const handleFilterChange = (next: FilterState) => {
    setIsLoading(true)
    setFilters(next)
    window.setTimeout(() => setIsLoading(false), 350)
  }

  useEffect(() => {
    setIsLoading(true)
    const t = window.setTimeout(() => setIsLoading(false), 350)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredProperties = useMemo(() => {
    let result = [...properties]

    if (filters.operation !== 'todos') {
      result = result.filter((p) => p.operationType === filters.operation)
    }

    if (filters.propertyType !== 'todos') {
      result = result.filter((p) => p.propertyType === filters.propertyType)
    }

    if (filters.neighborhood !== 'todos') {
      const neighborhoodMap: Record<string, string> = {
        'ciudad-jardin': 'ciudad jardín',
        'el-palomar': 'el palomar',
        caseros: 'caseros',
        'villa-bosch': 'villa bosch',
        'martin-coronado': 'martín coronado',
        hurlingham: 'hurlingham',
        'san-martin': 'san martín',
      }
      const needle = neighborhoodMap[filters.neighborhood] || filters.neighborhood
      result = result.filter((p) => p.neighborhood.toLowerCase().includes(needle))
    }

    if (filters.priceMin) {
      result = result.filter((p) => p.price >= parseInt(filters.priceMin, 10))
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= parseInt(filters.priceMax, 10))
    }

    if (filters.areaMin) {
      result = result.filter((p) => (p.coveredArea || p.totalArea) >= parseInt(filters.areaMin, 10))
    }
    if (filters.areaMax) {
      result = result.filter((p) => (p.coveredArea || p.totalArea) <= parseInt(filters.areaMax, 10))
    }

    if (filters.rooms !== 'todos') {
      const rooms = parseInt(filters.rooms, 10)
      result = result.filter((p) => (rooms === 4 ? p.rooms >= 4 : p.rooms === rooms))
    }

    if (filters.bedrooms !== 'todos') {
      const bedrooms = parseInt(filters.bedrooms, 10)
      result = result.filter((p) => (bedrooms === 4 ? p.bedrooms >= 4 : p.bedrooms === bedrooms))
    }

    if (filters.bathrooms !== 'todos') {
      const bathrooms = parseInt(filters.bathrooms, 10)
      result = result.filter((p) => (bathrooms === 3 ? p.bathrooms >= 3 : p.bathrooms === bathrooms))
    }

    if (filters.garages !== 'todos') {
      result = result.filter((p) => (filters.garages === 'si' ? p.garages > 0 : p.garages === 0))
    }

    if (filters.creditReady) {
      result = result.filter((p) => p.creditReady)
    }

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.neighborhood.toLowerCase().includes(search) ||
          p.address.toLowerCase().includes(search)
      )
    }

    if (filters.features.length > 0) {
      result = result.filter((p) => filters.features.every((f) => p.features.includes(f)))
    }

    switch (filters.sortBy) {
      case 'precio-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'precio-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'superficie-desc':
        result.sort((a, b) => (b.coveredArea || b.totalArea) - (a.coveredArea || a.totalArea))
        break
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  }, [filters])

  return (
    <div className="flex gap-8">
      <PropertyFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resultsCount={filteredProperties.length}
        hideOperation={Boolean(lockOperation)}
        hideCreditReady={Boolean(lockCreditReady)}
        renderMode="sidebar"
      />

      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="lg:hidden">
            <PropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              resultsCount={filteredProperties.length}
              hideOperation={Boolean(lockOperation)}
              hideCreditReady={Boolean(lockCreditReady)}
              renderMode="trigger"
            />
          </div>

          <div className="hidden lg:block text-sm text-muted-foreground">
            {filteredProperties.length} propiedades encontradas
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={filters.sortBy}
              onValueChange={(v) => handleFilterChange({ ...filters, sortBy: v })}
            >
              <SelectTrigger className="w-44 rounded-sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-sm">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center border border-border rounded-sm p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-sm"
                onClick={() => setViewMode('grid')}
                aria-label="Vista en grilla"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-sm"
                onClick={() => setViewMode('list')}
                aria-label="Vista en lista"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-sm"
                onClick={() => setViewMode('map')}
                aria-label="Ver en mapa"
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Skeletons */}
        {isLoading ? (
          <div
            className={cn(
              'grid gap-6',
              viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            )}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No encontramos propiedades
            </h3>
            <p className="text-muted-foreground mb-4">
              Probá ajustando los filtros para ver más resultados
            </p>
            <Button variant="outline" onClick={() => handleFilterChange(defaultFilters)}>
              Limpiar filtros
            </Button>
          </div>
        ) : viewMode === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[calc(100vh-14rem)] lg:min-h-[500px]">
            <div className="h-[45vh] lg:h-full">
              <PropertyMap
                properties={filteredProperties}
                activeId={activeMapId}
                onSelect={setActiveMapId}
              />
            </div>
            <div className="lg:h-full lg:overflow-y-auto pr-1 space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  onMouseEnter={() => setActiveMapId(property.id)}
                  className={cn(
                    'rounded-lg transition-shadow',
                    activeMapId === property.id && 'ring-2 ring-primary'
                  )}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'grid gap-6 animate-fade-in',
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
            )}
          >
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
