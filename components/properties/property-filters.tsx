'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { propertyTypes, operationTypes, neighborhoods, features } from '@/lib/data'

export interface FilterState {
  operation: string
  propertyType: string
  neighborhood: string
  priceMin: string
  priceMax: string
  currency: string
  rooms: string
  bedrooms: string
  bathrooms: string
  areaMin: string
  areaMax: string
  garages: string
  creditReady: boolean
  search: string
  features: string[]
  sortBy: string
}

export const defaultFilters: FilterState = {
  operation: 'todos',
  propertyType: 'todos',
  neighborhood: 'todos',
  priceMin: '',
  priceMax: '',
  currency: 'USD',
  rooms: 'todos',
  bedrooms: 'todos',
  bathrooms: 'todos',
  areaMin: '',
  areaMax: '',
  garages: 'todos',
  creditReady: false,
  search: '',
  features: [],
  sortBy: 'recientes',
}

interface PropertyFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  resultsCount: number
  /** Oculta el control de Operación (usado en /comprar, /alquilar) */
  hideOperation?: boolean
  /** Oculta el control de Apto crédito (usado en /apto-credito) */
  hideCreditReady?: boolean
  /** 'both' (default) renderiza el sidebar desktop y el botón mobile juntos.
   * Usar 'sidebar' o 'trigger' cuando cada uno se coloca en un punto distinto
   * del layout, para no duplicar el control mobile en el DOM. */
  renderMode?: 'both' | 'sidebar' | 'trigger'
}

export function PropertyFilters({
  filters,
  onFilterChange,
  resultsCount,
  hideOperation,
  hideCreditReady,
  renderMode = 'both',
}: PropertyFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature]
    updateFilter('features', newFeatures)
  }

  const clearFilters = () => {
    onFilterChange({
      ...defaultFilters,
      operation: hideOperation ? filters.operation : defaultFilters.operation,
      creditReady: hideCreditReady ? filters.creditReady : defaultFilters.creditReady,
    })
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'sortBy') return false
    if (hideOperation && key === 'operation') return false
    if (hideCreditReady && key === 'creditReady') return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'boolean') return value
    return value !== 'todos' && value !== '' && value !== 'USD'
  })

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Search */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Buscar</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o dirección..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 h-11 rounded-sm"
          />
        </div>
      </div>

      {/* Operation Type */}
      {!hideOperation && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground block">Operación</Label>
          <div className="flex gap-2">
            <Button
              variant={filters.operation === 'todos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('operation', 'todos')}
              className={cn('flex-1 h-10 rounded-sm text-xs sm:text-sm', filters.operation === 'todos' && 'bg-primary text-primary-foreground hover:bg-primary/90')}
            >
              Todas
            </Button>
            {operationTypes.map((op) => (
              <Button
                key={op.value}
                variant={filters.operation === op.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('operation', op.value)}
                className={cn('flex-1 h-10 rounded-sm text-xs sm:text-sm', filters.operation === op.value && 'bg-primary text-primary-foreground hover:bg-primary/90')}
              >
                {op.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Property Type */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Tipo de propiedad</Label>
        <Select value={filters.propertyType} onValueChange={(v) => updateFilter('propertyType', v)}>
          <SelectTrigger className="h-11 rounded-sm">
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectItem value="todos">Todos los tipos</SelectItem>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Ubicación</Label>
        <Select value={filters.neighborhood} onValueChange={(v) => updateFilter('neighborhood', v)}>
          <SelectTrigger className="h-11 rounded-sm">
            <SelectValue placeholder="Seleccionar zona" />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectItem value="todos">Todas las zonas</SelectItem>
            {neighborhoods.map((n) => (
              <SelectItem key={n.value} value={n.value}>
                {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Precio</Label>
        <div className="flex items-center gap-2">
          <Select value={filters.currency} onValueChange={(v) => updateFilter('currency', v)}>
            <SelectTrigger className="w-20 h-11 rounded-sm text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-sm">
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="ARS">ARS</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Mín"
            value={filters.priceMin}
            onChange={(e) => updateFilter('priceMin', e.target.value)}
            className="flex-1 h-11 rounded-sm text-xs"
          />
          <span className="text-muted-foreground text-sm">-</span>
          <Input
            type="number"
            placeholder="Máx"
            value={filters.priceMax}
            onChange={(e) => updateFilter('priceMax', e.target.value)}
            className="flex-1 h-11 rounded-sm text-xs"
          />
        </div>
      </div>

      {/* Rooms */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground block">Ambientes</Label>
          <Select value={filters.rooms} onValueChange={(v) => updateFilter('rooms', v)}>
            <SelectTrigger className="h-11 rounded-sm">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="rounded-sm">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground block">Dormitorios</Label>
          <Select value={filters.bedrooms} onValueChange={(v) => updateFilter('bedrooms', v)}>
            <SelectTrigger className="h-11 rounded-sm">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="rounded-sm">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Superficie */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Superficie (m²)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Mín"
            value={filters.areaMin}
            onChange={(e) => updateFilter('areaMin', e.target.value)}
            className="flex-1 h-11 rounded-sm text-xs"
          />
          <span className="text-muted-foreground text-sm">-</span>
          <Input
            type="number"
            placeholder="Máx"
            value={filters.areaMax}
            onChange={(e) => updateFilter('areaMax', e.target.value)}
            className="flex-1 h-11 rounded-sm text-xs"
          />
        </div>
      </div>

      {/* Cochera */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground block">Cochera</Label>
        <Select value={filters.garages} onValueChange={(v) => updateFilter('garages', v)}>
          <SelectTrigger className="h-11 rounded-sm">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="si">Con cochera</SelectItem>
            <SelectItem value="no">Sin cochera</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apto crédito */}
      {!hideCreditReady && (
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Checkbox
            checked={filters.creditReady}
            onCheckedChange={(v) => updateFilter('creditReady', v === true)}
          />
          <span className="text-sm font-medium text-foreground">Apto crédito</span>
        </label>
      )}

      {/* Advanced Filters */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between rounded-sm">
            Características
            {isAdvancedOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <label
                key={feature.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={filters.features.includes(feature.value)}
                  onCheckedChange={() => toggleFeature(feature.value)}
                />
                <span className="text-sm text-foreground">{feature.label}</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full h-11 rounded-sm mt-4" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )

  const showSidebar = renderMode === 'both' || renderMode === 'sidebar'
  const showTrigger = renderMode === 'both' || renderMode === 'trigger'

  return (
    <>
      {/* Desktop Filters */}
      {showSidebar && (
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 bg-card rounded-lg border border-border/60 p-6 shadow-sm max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-foreground">Filtros</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {resultsCount}
              </span>
            </div>
            <FilterContent />
          </div>
        </aside>
      )}

      {/* Mobile Filters */}
      {showTrigger && (
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2 h-11 rounded-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle>Filtrar propiedades</SheetTitle>
            </SheetHeader>
            <FilterContent />
            <div className="mt-6">
              <SheetClose asChild>
                <Button className="w-full h-11 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                  Ver {resultsCount} resultados
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      )}
    </>
  )
}
