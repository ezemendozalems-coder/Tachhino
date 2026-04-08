'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { LayoutGrid, List, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PropertyCard } from '@/components/properties/property-card'
import { PropertyFilters, FilterState } from '@/components/properties/property-filters'
import { properties } from '@/lib/data'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'destacadas', label: 'Destacadas' },
]

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const [filters, setFilters] = useState<FilterState>({
    operation: searchParams.get('operacion') || 'todos',
    propertyType: searchParams.get('tipo') || 'todos',
    neighborhood: searchParams.get('zona') || 'todos',
    priceMin: searchParams.get('precioMin') || '',
    priceMax: searchParams.get('precioMax') || '',
    currency: 'USD',
    rooms: 'todos',
    bedrooms: 'todos',
    bathrooms: 'todos',
    search: '',
    features: [],
    sortBy: 'recientes',
  })

  const filteredProperties = useMemo(() => {
    let result = [...properties]

    // Filter by operation
    if (filters.operation !== 'todos') {
      result = result.filter(p => p.operationType === filters.operation)
    }

    // Filter by property type
    if (filters.propertyType !== 'todos') {
      result = result.filter(p => p.propertyType === filters.propertyType)
    }

    // Filter by neighborhood
    if (filters.neighborhood !== 'todos') {
      const neighborhoodMap: Record<string, string> = {
        'el-palomar': 'El Palomar',
        'ciudad-jardin': 'Ciudad Jardín',
        'zona-oeste': 'Zona Oeste',
      }
      result = result.filter(p => 
        p.neighborhood.toLowerCase().includes(neighborhoodMap[filters.neighborhood]?.toLowerCase() || filters.neighborhood)
      )
    }

    // Filter by price
    if (filters.priceMin) {
      result = result.filter(p => p.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      result = result.filter(p => p.price <= parseInt(filters.priceMax))
    }

    // Filter by rooms
    if (filters.rooms !== 'todos') {
      const rooms = parseInt(filters.rooms)
      if (rooms === 4) {
        result = result.filter(p => p.rooms >= 4)
      } else {
        result = result.filter(p => p.rooms === rooms)
      }
    }

    // Filter by bedrooms
    if (filters.bedrooms !== 'todos') {
      const bedrooms = parseInt(filters.bedrooms)
      if (bedrooms === 4) {
        result = result.filter(p => p.bedrooms >= 4)
      } else {
        result = result.filter(p => p.bedrooms === bedrooms)
      }
    }

    // Filter by bathrooms
    if (filters.bathrooms !== 'todos') {
      const bathrooms = parseInt(filters.bathrooms)
      if (bathrooms === 3) {
        result = result.filter(p => p.bathrooms >= 3)
      } else {
        result = result.filter(p => p.bathrooms === bathrooms)
      }
    }

    // Filter by search
    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(search) ||
        p.neighborhood.toLowerCase().includes(search) ||
        p.address.toLowerCase().includes(search)
      )
    }

    // Filter by features
    if (filters.features.length > 0) {
      result = result.filter(p => 
        filters.features.every(f => p.features.includes(f))
      )
    }

    // Sort
    switch (filters.sortBy) {
      case 'precio-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'precio-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'destacadas':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  }, [filters])

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-2">
            Propiedades
          </h1>
          <p className="text-muted-foreground">
            Encontrá tu próximo hogar entre nuestra selección de propiedades en Zona Oeste
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <PropertyFilters
            filters={filters}
            onFilterChange={setFilters}
            resultsCount={filteredProperties.length}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              {/* Mobile Filters */}
              <div className="lg:hidden flex-1">
                <PropertyFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  resultsCount={filteredProperties.length}
                />
              </div>

              {/* Results count (desktop) */}
              <div className="hidden lg:block text-sm text-muted-foreground">
                {filteredProperties.length} propiedades encontradas
              </div>

              {/* Sort & View */}
              <div className="flex items-center gap-3">
                <Select
                  value={filters.sortBy}
                  onValueChange={(v) => setFilters({ ...filters, sortBy: v })}
                >
                  <SelectTrigger className="w-44">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                    aria-label="Vista en grilla"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                    aria-label="Vista en lista"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              )}>
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
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
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    operation: 'todos',
                    propertyType: 'todos',
                    neighborhood: 'todos',
                    priceMin: '',
                    priceMax: '',
                    currency: 'USD',
                    rooms: 'todos',
                    bedrooms: 'todos',
                    bathrooms: 'todos',
                    search: '',
                    features: [],
                    sortBy: 'recientes',
                  })}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
